import { test } from "@playwright/test";
import { DIAGRAM_IDS } from "./utils/diagrams";
import { waitForMermaidRender } from "./utils/waitForMermaid";

test.describe("Mermaid Diagrams – Theme Safety", () => {
  for (const theme of ["light", "dark"]) {
    test(`diagrams render in ${theme} theme`, async ({ page }) => {
      await page.goto(`/?theme=${theme}`);

      for (const diagramId of DIAGRAM_IDS) {
        await waitForMermaidRender(page, diagramId);
      }
    });
  }
});
