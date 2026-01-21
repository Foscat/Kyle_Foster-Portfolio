import { test, expect } from "@playwright/test";
import { DIAGRAM_IDS } from "./utils/diagrams";
import { waitForMermaidRender } from "./utils/waitForMermaid";

/**
 * Mermaid Diagrams – Playwright Integration Tests
 * ---------------------------------------------------------------------------
 * Validates that all Mermaid diagrams:
 * - Render without runtime or console errors
 * - Produce an SVG output
 * - Remain rendered during scroll/navigation
 *
 * This suite intentionally enforces:
 * - No console.error
 * - No uncaught page errors
 *
 * Any regression in diagram rendering or theme styles
 * will surface here.
 */

test.describe("Mermaid Diagrams", () => {
  test.beforeEach(async ({ page }) => {
    // Collect errors per test
    page.__consoleErrors = [];

    page.on("pageerror", (err) => {
      page.__consoleErrors.push(err.message);
    });

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        page.__consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");
  });

  test.afterEach(async ({ page }) => {
    if (page.__consoleErrors.length > 0) {
      throw new Error(
        `Console errors detected during Mermaid render:\n\n${page.__consoleErrors.join("\n\n")}`
      );
    }
  });

  for (const diagramId of DIAGRAM_IDS) {
    test(`renders Mermaid diagram: ${diagramId}`, async ({ page }) => {
      await waitForMermaidRender(page, diagramId);

      // Assert actual SVG exists
      const svg = page.locator(`#${diagramId} svg`);
      await expect(svg).toBeVisible();
    });
  }

  test("diagrams remain rendered after scroll navigation", async ({ page }) => {
    for (const diagramId of DIAGRAM_IDS) {
      const container = page.locator(`#${diagramId}`);

      await container.scrollIntoViewIfNeeded();
      await waitForMermaidRender(page, diagramId);

      const svg = container.locator("svg");
      await expect(svg).toBeVisible();
    }
  });
});
