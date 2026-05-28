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

test.describe("Theme and Palette Stability", () => {
  test("does not crash while repeatedly switching theme and palette", async ({ page }) => {
    test.setTimeout(60_000);

    const runtimeErrors: string[] = [];
    page.on("pageerror", (err) => runtimeErrors.push(String(err)));

    await page.setViewportSize({ width: 1280, height: 720 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto(toUrl("/"));
    await stabilizePage(page, { theme: "dark" });

    const colorSettingsTrigger = page.getByRole("button", { name: /open color settings/i }).first();
    await expect(colorSettingsTrigger).toBeVisible();
    await colorSettingsTrigger.click();

    const colorSettingsModal = page.getByRole("dialog", { name: /color settings/i });
    await expect(colorSettingsModal).toBeVisible();

    const lightThemeButton = colorSettingsModal
      .getByRole("button", { name: /light theme/i })
      .first();
    const darkThemeButton = colorSettingsModal.getByRole("button", { name: /dark theme/i }).first();
    const paletteSelect = colorSettingsModal.getByRole("combobox", { name: /color palette/i });

    await expect(lightThemeButton).toBeVisible();
    await expect(darkThemeButton).toBeVisible();
    await expect(paletteSelect).toBeVisible();

    const paletteValues = await paletteSelect.locator("option").evaluateAll((options) =>
      options
        .map((option) => option.getAttribute("value") || "")
        .map((value) => value.trim())
        .filter(Boolean)
    );

    expect(paletteValues.length).toBeGreaterThan(0);

    await lightThemeButton.click();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.theme || ""))
      .toBe("light");

    for (const palette of paletteValues) {
      await paletteSelect.selectOption(palette);
      await expect
        .poll(() => page.evaluate(() => document.documentElement.dataset.palette || ""))
        .toBe(palette);
    }

    await darkThemeButton.click();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.theme || ""))
      .toBe("dark");

    await expect(page.locator("main")).toBeVisible();
    expect(runtimeErrors, runtimeErrors.join("\n\n")).toHaveLength(0);
  });
});
