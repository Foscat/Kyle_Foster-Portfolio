/**
 * @file contentQuality.test.js
 * @description Cross-route contracts for concise copy, diagrams, and internal links.
 * @module assets/data/content/contentQuality.test
 */

import { describe, expect, it } from "vitest";
import { BlockType } from "types/ui.types.js";
import pageSummaryMetas from "../pageSummaryMetas.js";
import projectMetas from "../projectMetas.js";
import resumeData from "./resumeData.js";
import {
  codestreamSections,
  contactSections,
  docsSections,
  hackathonSections,
  homeSections,
  sandersonTechnologyEnterprisesSections,
  sideProjectsSections,
  smuSections,
} from "./index.js";

const ROUTE_CONTENT = Object.freeze({
  "/": homeSections,
  "/codestream": codestreamSections,
  "/contact": contactSections,
  "/docs": docsSections,
  "/hackathon": hackathonSections,
  "/sanderson-technology-enterprises": sandersonTechnologyEnterprisesSections,
  "/side-projects": sideProjectsSections,
  "/smu": smuSections,
});

const PROSE_KEYS = new Set(["caption", "description", "subtitle", "text"]);

const visit = (value, callback, key = "") => {
  if (value == null) return;
  if (typeof value !== "object") {
    callback(value, key);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry) => visit(entry, callback, key));
    return;
  }
  Object.entries(value).forEach(([entryKey, entryValue]) => visit(entryValue, callback, entryKey));
};

const collectValues = (value, targetKey) => {
  const values = [];
  visit(value, (entry, key) => {
    if (key === targetKey && typeof entry === "string") values.push(entry);
  });
  return values;
};

const collectRenderableIds = (value) => {
  const ids = [];
  const walk = (entry, key = "") => {
    if (!entry || typeof entry !== "object" || key === "navItems") return;
    if (Array.isArray(entry)) {
      entry.forEach((item) => walk(item, key));
      return;
    }
    if (typeof entry.id === "string") ids.push(entry.id);
    Object.entries(entry).forEach(([entryKey, entryValue]) => walk(entryValue, entryKey));
  };

  walk(value);
  return ids;
};

const collectProse = (value) => {
  const values = [];
  visit(value, (entry, key) => {
    if (PROSE_KEYS.has(key) && typeof entry === "string") values.push(entry.trim());
  });
  return values.filter(Boolean);
};

const normalizeProse = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, " ")
    .trim();

const diagramDescriptionText = (diagram) =>
  collectValues(diagram?.description, "text").join(" ") || String(diagram?.description || "");

describe("portfolio content quality", () => {
  it("keeps every content identifier unique within its route", () => {
    for (const [route, sections] of Object.entries(ROUTE_CONTENT)) {
      const ids = collectRenderableIds(sections);
      expect(new Set(ids).size, route).toBe(ids.length);
    }
  });

  it("does not repeat long-form prose within the same route", () => {
    for (const [route, sections] of Object.entries(ROUTE_CONTENT)) {
      const normalized = collectProse(sections)
        .filter((entry) => entry.split(/\s+/u).length >= 8)
        .map(normalizeProse);
      const duplicates = normalized.filter((entry, index) => normalized.indexOf(entry) !== index);

      expect(duplicates, route).toEqual([]);
    }
  });

  it("keeps diagram descriptions between 30 and 80 words", () => {
    for (const [route, sections] of Object.entries(ROUTE_CONTENT)) {
      const diagrams = [];
      const collectDiagrams = (value) => {
        if (!value || typeof value !== "object") return;
        if (!Array.isArray(value) && value.type === BlockType.DIAGRAM) diagrams.push(value);
        if (Array.isArray(value)) value.forEach(collectDiagrams);
        else Object.values(value).forEach(collectDiagrams);
      };
      collectDiagrams(sections);

      for (const diagram of diagrams) {
        const wordCount = diagramDescriptionText(diagram)
          .trim()
          .split(/\s+/u)
          .filter(Boolean).length;
        expect(wordCount, `${route}#${diagram.id}`).toBeGreaterThanOrEqual(30);
        expect(wordCount, `${route}#${diagram.id}`).toBeLessThanOrEqual(80);
      }
    }
  });

  it("rejects known sentence fragments and punctuation spacing defects", () => {
    const defects = Object.entries(ROUTE_CONTENT).flatMap(([route, sections]) =>
      collectProse(sections)
        .filter((entry) => /\bWhich in turn\b|\s+[,;:]|\bexponentially harder\b/iu.test(entry))
        .map((entry) => `${route}: ${entry}`)
    );

    expect(defects).toEqual([]);
  });

  it("keeps every internal route and anchor destination valid", () => {
    const routeIds = new Map(
      Object.entries(ROUTE_CONTENT).map(([route, sections]) => [
        route,
        new Set(collectValues(sections, "id")),
      ])
    );
    const invalidLinks = [];

    for (const [sourceRoute, sections] of Object.entries(ROUTE_CONTENT)) {
      for (const href of [...collectValues(sections, "url"), ...collectValues(sections, "href")]) {
        if (!href.startsWith("/") && !href.startsWith("#")) continue;
        const [rawPath, anchor] = href.split("#");
        const normalizedPath = (rawPath || sourceRoute).replace(/\/+$/u, "") || "/";
        const ids = routeIds.get(normalizedPath);

        if (!ids || (anchor && !ids.has(anchor))) invalidLinks.push(`${sourceRoute}: ${href}`);
      }
    }

    expect(invalidLinks).toEqual([]);
  });

  it("keeps link destinations nonempty and external URLs normalized", () => {
    const invalidLinks = [];

    for (const [route, sections] of Object.entries(ROUTE_CONTENT)) {
      const destinations = [...collectValues(sections, "url"), ...collectValues(sections, "href")];
      for (const destination of destinations) {
        if (!destination || destination !== destination.trim()) {
          invalidLinks.push(`${route}: ${JSON.stringify(destination)}`);
          continue;
        }
        if (/^https?:\/\//u.test(destination)) {
          try {
            const parsed = new URL(destination);
            if (!new Set(["http:", "https:"]).has(parsed.protocol)) {
              invalidLinks.push(`${route}: ${destination}`);
            }
          } catch {
            invalidLinks.push(`${route}: ${destination}`);
          }
        }
      }
    }

    expect(invalidLinks).toEqual([]);

    const metadataDestinations = Object.values(projectMetas).flatMap(({ repo, url }) => [
      repo,
      url,
    ]);
    expect(
      metadataDestinations
        .filter((destination) => /^https?:\/\//u.test(destination || ""))
        .every((destination) => new Set(["http:", "https:"]).has(new URL(destination).protocol))
    ).toBe(true);
  });

  it("uses evergreen experience language and consistent contact labels", () => {
    const publicCopy = JSON.stringify({ pageSummaryMetas, resumeData, contactSections });

    expect(publicCopy).not.toContain("7+ years");
    expect(publicCopy).toContain("since 2018");
    expect(publicCopy).toContain("Primary email:");
    expect(publicCopy).toContain("Alternate email:");
  });

  it("keeps one authoritative greenhouse control-loop diagram", () => {
    const greenhouse = sideProjectsSections.find((section) => section.id === "greenhouse");
    const diagrams = (greenhouse?.blocks || []).filter((block) => block.type === BlockType.DIAGRAM);

    expect(diagrams).toHaveLength(1);
    expect(diagrams[0]?.id).toBe("diagram-greenhouse-mental-model");
  });

  it("does not describe the unfinished hackathon continuation as production-ready", () => {
    expect(JSON.stringify(hackathonSections)).not.toContain("production-ready mobile application");
  });
});
