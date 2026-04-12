/**
 * @file playwright\click-animate.spec.ts
 * @description playwright\click-animate.spec module.
 * @module playwright\click-animate.spec
 */

import { test, expect } from "@playwright/test";

const THEMES = ["dark", "light"] as const;

for (const theme of THEMES) {
  test.describe(`click-animate button – ${theme} theme`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/tests/fixtures/click-animate.fixture.html");

      await page.evaluate(
        (theme) => document.documentElement.setAttribute("data-theme", theme),
        theme
      );

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

    test("base", async ({ page }) => {
      await expect(page.locator("#target")).toHaveScreenshot(`${theme}-base.png`);
    });

    test("hover", async ({ page }) => {
      const target = page.locator("#target");
      await target.hover();
      await expect(target).toHaveScreenshot(`${theme}-hover.png`);
    });

    test("active", async ({ page }) => {
      const target = page.locator("#target");
      await target.evaluate((el) => el.classList.add("is-active"));
      await expect(target).toHaveScreenshot(`${theme}-active.png`);
    });

    test("press", async ({ page }) => {
      const target = page.locator("#target");
      const box = await target.boundingBox();
      if (!box) throw new Error("Bounding box missing");

      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();

      await expect(target).toHaveScreenshot(`${theme}-press.png`);

      await page.mouse.up();
    });

    test("disabled", async ({ page }) => {
      const target = page.locator("#target");
      await target.evaluate((el) => el.setAttribute("disabled", "true"));
      await expect(target).toHaveScreenshot(`${theme}-disabled.png`);
    });
  });
}
