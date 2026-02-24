import { test, expect } from "@playwright/test";

const THEMES = ["dark", "light"] as const;
const VARIANTS = ["variant-primary", "variant-accent", "variant-subtle", "variant-danger"] as const;

for (const theme of THEMES) {
  for (const variant of VARIANTS) {
    test.describe(`icon ${variant} – ${theme}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto("/tests/fixtures/click-animate-icon.fixture.html");

        await page.evaluate(
          ({ theme, variant }) => {
            const root = document.documentElement;
            root.setAttribute("data-theme", theme);

            const el = document.getElementById("icon-target");
            el?.classList.add(variant);
          },
          { theme, variant }
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
        await expect(page.locator("#icon-target")).toHaveScreenshot(
          `${theme}-${variant}-icon-base.png`
        );
      });

      test("hover", async ({ page }) => {
        const target = page.locator("#icon-target");
        await target.hover();

        await expect(target).toHaveScreenshot(`${theme}-${variant}-icon-hover.png`);
      });
    });
  }
}
