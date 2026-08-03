/**
 * @file diagram-content-quality.test.js
 * @description Guards the product-story information density of every portfolio diagram.
 * @module components/__tests__/diagram-content-quality.test
 */

import { describe, expect, it } from "vitest";
import allDiagrams from "assets/data/content/diagrams.js";
import { diagramValues as homeDiagrams } from "assets/data/content/home/diagrams.js";
import { diagramValues as hackathonDiagrams } from "assets/data/content/hackathon/diagrams.js";
import { diagramValues as codestreamDiagrams } from "assets/data/content/codestream/diagrams.js";
import { diagramValues as smuDiagrams } from "assets/data/content/smu/diagrams.js";
import { diagramValues as steDiagrams } from "assets/data/content/sanderson-technology-enterprises/diagrams.js";
import { diagramValues as sideProjectDiagrams } from "assets/data/content/side-projects/diagrams.js";
import { DIAGRAM_ENTRIES } from "../../../playwright/fixtures/diagrams.js";

const DIAGRAM_REGISTRIES = [
  ["home", homeDiagrams],
  ["hackathon", hackathonDiagrams],
  ["codestream", codestreamDiagrams],
  ["smu", smuDiagrams],
  ["ste", steDiagrams],
  ["side-projects", sideProjectDiagrams],
];

const diagramEntries = DIAGRAM_REGISTRIES.flatMap(([route, diagrams]) =>
  diagrams.map((diagramBlock) => ({ route, diagramBlock }))
);

const stripInitBlock = (source) => source.replace(/^%%\{init:[\s\S]*?\}%%\s*/u, "").trim();

const extractVariants = (diagramBlock) => {
  const variants = [];

  if (typeof diagramBlock.diagram === "string") {
    variants.push(["default", diagramBlock.diagram]);
  } else if (typeof diagramBlock.diagram?.diagram === "string") {
    variants.push(["default", diagramBlock.diagram.diagram]);
  }

  for (const variant of ["desktop", "mobile"]) {
    const value = diagramBlock[variant];
    if (typeof value === "string") variants.push([variant, value]);
    else if (typeof value?.diagram === "string") variants.push([variant, value.diagram]);
  }

  return variants;
};

const countFlowchartNodes = (source) => {
  const body = source
    .split("\n")
    .filter((line) => !/^\s*subgraph\b/u.test(line))
    .join("\n");
  const nodeIds = new Set();
  const nodePattern = /(?:^|[\s;])([A-Za-z][A-Za-z0-9_]*)\s*(?=[[({>])/gmu;

  for (const match of body.matchAll(nodePattern)) nodeIds.add(match[1]);
  return nodeIds.size;
};

const getFlowchartSignals = (source) =>
  [
    ["ownership boundary", /^\s*subgraph\b/mu.test(source)],
    ["decision", /\b[A-Za-z][A-Za-z0-9_]*\s*\{\{?/u.test(source)],
    ["labeled branch", /[=-]+>\|[^|]+\|/u.test(source)],
    ["feedback or recovery", /-\.(?:[^\n]*?\.)?->/u.test(source)],
  ]
    .filter(([, present]) => present)
    .map(([name]) => name);

const variantEntries = diagramEntries.flatMap(({ route, diagramBlock }) =>
  extractVariants(diagramBlock).map(([variant, source]) => ({
    route,
    id: diagramBlock.id,
    variant,
    source: stripInitBlock(source),
  }))
);

describe("Portfolio diagram product-story quality", () => {
  it("inventories all 24 stable diagram IDs", () => {
    const ids = diagramEntries.map(({ diagramBlock }) => diagramBlock.id);

    expect(ids).toHaveLength(24);
    expect(new Set(ids).size).toBe(24);
  });

  it("maps every diagram into rendered browser coverage", () => {
    const registryIds = diagramEntries.map(({ diagramBlock }) => diagramBlock.id).sort();
    const browserCoverageIds = DIAGRAM_ENTRIES.map(({ id }) => id).sort();

    expect(browserCoverageIds).toEqual(registryIds);
  });

  it("exposes every diagram through the generated-asset registry", () => {
    const registryIds = diagramEntries.map(({ diagramBlock }) => diagramBlock.id).sort();
    const assetIds = allDiagrams.map(({ id }) => id).sort();

    expect(assetIds).toEqual(registryIds);
  });

  it.each(variantEntries)("keeps $route/$id ($variant) meaningfully detailed", ({ source }) => {
    if (/^sequenceDiagram\b/u.test(source)) {
      const participantCount = source.match(/^\s*participant\b/gmu)?.length ?? 0;
      const controlBlocks = source.match(/^\s*(?:alt|opt|loop)\b/gmu)?.length ?? 0;

      expect(
        participantCount,
        "sequence diagrams need at least four participating roles"
      ).toBeGreaterThanOrEqual(4);
      expect(
        controlBlocks,
        "sequence diagrams need a meaningful alternate or optional path"
      ).toBeGreaterThanOrEqual(1);
      return;
    }

    expect(source).toMatch(/^flowchart\b/u);
    expect(
      countFlowchartNodes(source),
      "flowcharts need at least seven meaningful nodes"
    ).toBeGreaterThanOrEqual(7);
    expect(
      getFlowchartSignals(source).length,
      "flowcharts need at least two boundaries, decisions, labeled branches, or feedback paths"
    ).toBeGreaterThanOrEqual(2);
  });
});
