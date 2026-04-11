/**
 * @file playwright\diagram-snapshots.spec.ts
 * @description playwright\diagram-snapshots.spec module.
 * @module playwright\diagram-snapshots.spec
 */

import { test } from "@playwright/test";
import { DIAGRAM_ENTRIES } from "./fixtures/diagrams";
import { snapshotDiagram } from "./utils/snapshotDiagram";

test.describe("Mermaid SVG snapshots", () => {
  for (const entry of DIAGRAM_ENTRIES) {
    test(`snapshot ${entry.id}`, async ({ page }) => {
      test.setTimeout(60_000);
      await page.goto(entry.route);
      await snapshotDiagram(page, entry.id);
    });
  }
});
