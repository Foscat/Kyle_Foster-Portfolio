/**
 * @file playwright\diagrams.theme.spec.ts
 * @description Minimal Mermaid theme smoke coverage.
 * @module playwright\diagrams.theme.spec
 */

import { expect, test } from "@playwright/test";
import { DIAGRAM_ENTRIES } from "./fixtures/diagrams";
import { waitForMermaidRender } from "./utils/waitForMermaid";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

const DIAGRAM_ROUTES = [...new Set(DIAGRAM_ENTRIES.map(({ route }) => route))];

test.describe("Mermaid diagram theme smoke", () => {
  for (const theme of ["dark", "light"] as const) {
    test(`all diagrams and concise descriptions render in ${theme} theme`, async ({ page }) => {
      test.setTimeout(120_000);

      await page.setViewportSize({ width: 1366, height: 900 });
      await preparePageForStableTests(page, { theme });

      for (const route of DIAGRAM_ROUTES) {
        await page.goto(route);
        await stabilizePage(page, { theme });

        for (const entry of DIAGRAM_ENTRIES.filter((diagram) => diagram.route === route)) {
          await waitForMermaidRender(page, entry.id);
          const description = page.locator(`#${entry.id} .mermaid-description`);
          await expect(description).toBeVisible();

          const wordCount = ((await description.textContent()) || "")
            .trim()
            .split(/\s+/u)
            .filter(Boolean).length;
          expect(wordCount, `${entry.id} description word count`).toBeGreaterThanOrEqual(30);
          expect(wordCount, `${entry.id} description word count`).toBeLessThanOrEqual(80);
        }
      }
    });
  }
});
