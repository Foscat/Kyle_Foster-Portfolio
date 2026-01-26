import { test, expect } from "@playwright/test";
import { DIAGRAM_IDS } from "./fixtures/diagrams";
import { collectDiagramCoverage } from "./utils/diagramCoverage";

test("diagram coverage is 100%", async ({ page }) => {
  await page.goto("/");

  const { rendered, missing } = await collectDiagramCoverage(page, DIAGRAM_IDS);

  expect(missing, `Missing diagrams:\n${missing.join("\n")}`).toEqual([]);

  expect(rendered.length).toBe(DIAGRAM_IDS.length);
});
