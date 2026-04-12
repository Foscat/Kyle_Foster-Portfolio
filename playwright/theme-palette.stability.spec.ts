/**
 * @file playwright\theme-palette.stability.spec.ts
 * @description Regressions for repeated theme + palette switching.
 * @module playwright/theme-palette-stability
 */

import { test, expect } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

const PALETTE_VALUES = ["primary", "alt", "forest", "ocean", "sunset"] as const;

test.describe("Theme and Palette Stability", () => {
  test("does not crash while repeatedly switching theme and palette", async ({ page }) => {
    test.setTimeout(120000);

    const runtimeErrors: string[] = [];
    page.on("pageerror", (err) => runtimeErrors.push(String(err)));

    await page.setViewportSize({ width: 1280, height: 720 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto(toUrl("/"));
    await stabilizePage(page, { theme: "dark" });

    const accessibilityTrigger = page
      .getByRole("button", { name: /open accessibility settings/i })
      .first();
    await expect(accessibilityTrigger).toBeVisible();
    await accessibilityTrigger.click();

    const a11yModal = page.getByRole("dialog", { name: /accessibility settings/i });
    await expect(a11yModal).toBeVisible();

    const lightThemeButton = a11yModal.getByRole("button", { name: /light theme/i }).first();
    const darkThemeButton = a11yModal.getByRole("button", { name: /dark theme/i }).first();
    const paletteSelect = a11yModal.getByRole("combobox", { name: /color palette/i });

    await expect(lightThemeButton).toBeVisible();
    await expect(darkThemeButton).toBeVisible();
    await expect(paletteSelect).toBeVisible();

    for (let round = 0; round < 3; round += 1) {
      await lightThemeButton.click();
      await expect
        .poll(() => page.evaluate(() => document.documentElement.dataset.theme || ""))
        .toBe("light");

      await darkThemeButton.click();
      await expect
        .poll(() => page.evaluate(() => document.documentElement.dataset.theme || ""))
        .toBe("dark");

      for (const palette of PALETTE_VALUES) {
        await paletteSelect.selectOption(palette);
        await expect
          .poll(() => page.evaluate(() => document.documentElement.dataset.palette || ""))
          .toBe(palette);
      }
    }

    await expect(page.locator("main")).toBeVisible();
    expect(runtimeErrors, runtimeErrors.join("\n\n")).toHaveLength(0);
  });
});
