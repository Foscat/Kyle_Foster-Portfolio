/**
 * @file playwright\diagrams.theme.spec.ts
 * @description Minimal Mermaid theme smoke coverage.
 * @module playwright\diagrams.theme.spec
 */

import { expect, test } from "@playwright/test";
import { DIAGRAM_ENTRIES } from "./fixtures/diagrams";
import { waitForMermaidRender } from "./utils/waitForMermaid";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

const SAMPLE_ROUTES = ["/codestream", "/side-projects"] as const;

test.describe("Mermaid diagram theme smoke", () => {
  for (const theme of ["dark", "light"] as const) {
    test(`sample diagrams render in ${theme} theme`, async ({ page }) => {
      test.setTimeout(45_000);

      await page.setViewportSize({ width: 1366, height: 900 });
      await preparePageForStableTests(page, { theme });

      for (const route of SAMPLE_ROUTES) {
        const entry = DIAGRAM_ENTRIES.find((diagram) => diagram.route === route);
        expect(entry, `Expected a sample diagram on ${route}`).toBeTruthy();

        await page.goto(route);
        await stabilizePage(page, { theme });
        await waitForMermaidRender(page, entry!.id);
      }
    });
  }
});
