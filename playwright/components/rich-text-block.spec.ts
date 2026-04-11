/**
 * @file playwright\components\rich-text-block.spec.ts
 * @description playwright\components\rich-text-block.spec module.
 * @module playwright\components\rich-text-block.spec
 */

import { test, expect } from "@playwright/test";

const THEMES = ["dark", "light"] as const;

for (const theme of THEMES) {
  test.describe(`RichTextBlock – ${theme} theme`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/tests/fixtures/rich-text-block.fixture.html");

      await page.evaluate((theme) => {
        document.documentElement.setAttribute("data-theme", theme);
      }, theme);

      // Freeze motion
      await page.addStyleTag({
        content: `
          *,
          *::before,
          *::after {
            transition: none !important;
            animation: none !important;
          }
        `,
      });
    });

    test("renders rich content correctly", async ({ page }) => {
      const block = page.locator("#rich-block");
      await expect(block).toHaveScreenshot(`${theme}-rich-text.png`);
    });
  });
}
