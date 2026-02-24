import { test, expect } from "@playwright/test";

const THEMES = ["dark", "light"] as const;

for (const theme of THEMES) {
  test.describe(`click-animate icon – ${theme} theme`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/tests/fixtures/click-animate-icon.fixture.html");

      await page.evaluate(
        (theme) => document.documentElement.setAttribute("data-theme", theme),
        theme
      );

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
      await expect(page.locator("#icon-target")).toHaveScreenshot(`${theme}-icon-base.png`);
    });

    test("hover", async ({ page }) => {
      const target = page.locator("#icon-target");
      await target.hover();
      await expect(target).toHaveScreenshot(`${theme}-icon-hover.png`);
    });

    test("active", async ({ page }) => {
      const target = page.locator("#icon-target");
      await target.evaluate((el) => el.classList.add("is-active"));
      await expect(target).toHaveScreenshot(`${theme}-icon-active.png`);
    });

    test("press", async ({ page }) => {
      const target = page.locator("#icon-target");
      const box = await target.boundingBox();
      if (!box) throw new Error("Bounding box missing");

      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();

      await expect(target).toHaveScreenshot(`${theme}-icon-press.png`);

      await page.mouse.up();
    });

    test("disabled", async ({ page }) => {
      const target = page.locator("#icon-target");
      await target.evaluate((el) => el.classList.add("is-disabled"));
      await expect(target).toHaveScreenshot(`${theme}-icon-disabled.png`);
    });
  });
}
