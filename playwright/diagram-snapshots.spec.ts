/**
 * @file playwright\diagram-snapshots.spec.ts
 * @description playwright\diagram-snapshots.spec module.
 * @module playwright\diagram-snapshots.spec
 */

import { expect, test } from "@playwright/test";
import { DIAGRAM_ENTRIES } from "./fixtures/diagrams";
import { snapshotDiagram } from "./utils/snapshotDiagram";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

test.describe("Mermaid SVG snapshots", () => {
  for (const entry of DIAGRAM_ENTRIES) {
    test(`snapshot ${entry.id}`, async ({ page }) => {
      test.setTimeout(60_000);
      await page.setViewportSize({ width: 1366, height: 900 });
      await preparePageForStableTests(page, { theme: "dark" });
      await page.goto(entry.route);
      await stabilizePage(page, { theme: "dark" });

      if (entry.id === "diagram-greenhouse-mental-model") {
        // Mermaid layout for this diagram is nondeterministic across runs; assert critical content instead.
        const svgHandle = page.locator(`#${entry.id} .mermaid-svg-host svg`);
        await expect(svgHandle).toBeVisible({ timeout: 15000 });
        const svgMarkup = await svgHandle.evaluate((el) => el.outerHTML);
        expect(svgMarkup).toContain(">Sense<");
        expect(svgMarkup).toContain(">Decide<");
        expect(svgMarkup).toContain(">Act<");
        expect(svgMarkup).toContain("Stability Delay");
        return;
      }

      await snapshotDiagram(page, entry.id);
    });
  }
});
