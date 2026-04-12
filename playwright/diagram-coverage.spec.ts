/**
 * @file playwright\diagram-coverage.spec.ts
 * @description playwright\diagram-coverage.spec module.
 * @module playwright\diagram-coverage.spec
 */

import { test, expect } from "@playwright/test";
import { DIAGRAM_ENTRIES } from "./fixtures/diagrams";
import { collectDiagramCoverage } from "./utils/diagramCoverage";

test("diagram coverage is 100%", async ({ page }) => {
  test.setTimeout(120_000);

  // Group diagram IDs by their page route
  const routeMap = new Map<string, string[]>();
  for (const entry of DIAGRAM_ENTRIES) {
    if (!routeMap.has(entry.route)) routeMap.set(entry.route, []);
    routeMap.get(entry.route)!.push(entry.id);
  }

  const allRendered: string[] = [];
  const allMissing: string[] = [];

  for (const [route, ids] of routeMap) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    const { rendered, missing } = await collectDiagramCoverage(page, ids);
    allRendered.push(...rendered);
    allMissing.push(...missing);
  }

  expect(allMissing, `Missing diagrams:\n${allMissing.join("\n")}`).toEqual([]);
  expect(allRendered.length).toBe(DIAGRAM_ENTRIES.length);
});
