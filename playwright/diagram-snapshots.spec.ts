import { test } from "@playwright/test";
import { DIAGRAM_IDS } from "./fixtures/diagrams";
import { snapshotDiagram } from "./utils/snapshotDiagram";

test.describe("Mermaid SVG snapshots", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  for (const diagramId of DIAGRAM_IDS) {
    test(`snapshot ${diagramId}`, async ({ page }) => {
      await snapshotDiagram(page, diagramId);
    });
  }
});
