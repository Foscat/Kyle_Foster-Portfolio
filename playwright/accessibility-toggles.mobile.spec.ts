/**
 * @file playwright/accessibility-toggles.mobile.spec.ts
 * @description Verifies accessibility toggle application on mobile layout.
 * @module playwright/accessibility-toggles.mobile.spec
 */

import { expect, test } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

test.describe("Accessibility Toggles (mobile)", () => {
  test("applies reduced motion, reduced transparency, and high contrast from accessibility modal", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto(toUrl("/"));
    await stabilizePage(page, { theme: "dark" });

    const a11yTrigger = page.getByRole("button", { name: /open accessibility settings/i }).first();
    await expect(a11yTrigger).toBeVisible();
    await a11yTrigger.click();
    await expect(page.getByRole("dialog", { name: /accessibility settings/i })).toBeVisible();

    await page.getByRole("switch", { name: /reduce motion/i }).click();
    await page.getByRole("switch", { name: /reduce transparency/i }).click();
    await page.getByRole("switch", { name: /high contrast/i }).click();
    await page.getByRole("button", { name: /apply accessibility changes/i }).click();

    await expect
      .poll(async () =>
        page.evaluate(() => ({
          reducedMotion: document.documentElement.dataset.a11yReducedMotion,
          reducedTransparency: document.documentElement.dataset.a11yReducedTransparency,
          highContrast: document.documentElement.dataset.a11yHighContrast,
        }))
      )
      .toEqual({
        reducedMotion: "true",
        reducedTransparency: "true",
        highContrast: "true",
      });
  });
});
