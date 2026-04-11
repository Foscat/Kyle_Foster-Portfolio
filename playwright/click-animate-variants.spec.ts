/**
 * @file playwright\click-animate-variants.spec.ts
 * @description playwright\click-animate-variants.spec module.
 * @module playwright\click-animate-variants.spec
 */

import { test, expect } from "@playwright/test";

const THEMES = ["dark", "light"] as const;
const VARIANTS = [
  "variant-primary",
  "variant-secondary",
  "variant-accent",
  "variant-subtle",
  "variant-warning",
  "variant-danger",
] as const;

for (const theme of THEMES) {
  for (const variant of VARIANTS) {
    test.describe(`button ${variant} – ${theme}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto("/tests/fixtures/click-animate.fixture.html");

        await page.evaluate(
          ({ theme, variant }) => {
            const root = document.documentElement;
            root.setAttribute("data-theme", theme);

            const el = document.getElementById("target");
            el?.classList.add(variant);
          },
          { theme, variant }
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
        await expect(page.locator("#target")).toHaveScreenshot(`${theme}-${variant}-base.png`);
      });

      test("hover", async ({ page }) => {
        const target = page.locator("#target");
        await target.hover();

        await expect(target).toHaveScreenshot(`${theme}-${variant}-hover.png`);
      });
    });
  }
}
