/**
 * @file playwright\diagram-snapshots.spec.ts
 * @description Deterministic smoke checks for Mermaid diagrams.
 * @module playwright\diagram-snapshots.spec
 */

import { expect, test } from "@playwright/test";
import { DIAGRAM_ENTRIES } from "./fixtures/diagrams";
import { waitForMermaidRender } from "./utils/waitForMermaid";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

const DIAGRAM_ROUTES = [...new Set(DIAGRAM_ENTRIES.map((entry) => entry.route))];
const VIEWPORTS = [
  { name: "desktop", width: 1366, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

test.describe("Mermaid diagram smoke", () => {
  for (const route of DIAGRAM_ROUTES) {
    for (const viewport of VIEWPORTS) {
      test(`${route} renders its diagrams on ${viewport.name}`, async ({ page }) => {
        test.setTimeout(45_000);

        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await preparePageForStableTests(page, { theme: "dark" });
        await page.goto(route);
        await stabilizePage(page, { theme: "dark" });

        const entries = DIAGRAM_ENTRIES.filter((entry) => entry.route === route);
        expect(entries.length).toBeGreaterThan(0);

        for (const entry of entries) {
          await waitForMermaidRender(page, entry.id);
        }
      });
    }
  }
});
