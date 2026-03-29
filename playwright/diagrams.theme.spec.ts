import { test } from "@playwright/test";
import { DIAGRAM_ENTRIES } from "./fixtures/diagrams";
import { waitForMermaidRender } from "./utils/waitForMermaid";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

// Unique page routes that contain diagrams
const DIAGRAM_ROUTES = [...new Set(DIAGRAM_ENTRIES.map((e) => e.route))];

test.describe("Mermaid Diagrams - Theme Safety", () => {
  for (const theme of ["dark", "light"] as const) {
    test(`diagrams render in ${theme} theme`, async ({ page }) => {
      test.setTimeout(120_000);

      await preparePageForStableTests(page, { theme });

      for (const route of DIAGRAM_ROUTES) {
        const entries = DIAGRAM_ENTRIES.filter((e) => e.route === route);

        await page.goto(`${route}?theme=${theme}`);
        await stabilizePage(page, { theme });

        for (const entry of entries) {
          await waitForMermaidRender(page, entry.id);
        }
      }
    });
  }
});
