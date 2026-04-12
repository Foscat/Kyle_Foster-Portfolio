/**
 * @file playwright\interactive-surface-example.spec.ts
 * @description playwright\interactive-surface-example.spec module.
 * @module playwright\interactive-surface-example.spec
 */

import { expect, test } from "@playwright/test";

const DEMO_URL = "/node_modules/interactive-surface-css/index.html";

test.describe("interactive surface example page", () => {
  test("renders core demo sections and interactive controls", async ({ page }) => {
    await page.goto(DEMO_URL);

    await expect(page.getByRole("heading", { name: "Interactive Surface Library" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Buttons and states" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Card surfaces" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Icon micro controls" })).toBeVisible();

    const controls = page.locator(".interactive-surface");
    const controlCount = await controls.count();
    expect(controlCount).toBeGreaterThanOrEqual(13);
  });

  test("keyboard navigation shows a visible focus ring", async ({ page }) => {
    await page.goto(DEMO_URL);
    await page.keyboard.press("Tab");

    const firstControl = page.locator(".interactive-surface").first();
    await expect(firstControl).toBeFocused();

    const outlineStyle = await firstControl.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        style: computed.outlineStyle,
        width: computed.outlineWidth,
      };
    });

    expect(outlineStyle.style).toBe("solid");
    expect(outlineStyle.width).toBe("2px");
  });

  test("reduced motion removes movement transforms", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(DEMO_URL);

    const firstControl = page.locator(".interactive-surface").first();
    await firstControl.hover();

    const transform = await firstControl.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    expect(transform).toBe("none");
  });
});
