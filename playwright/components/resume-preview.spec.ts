/**
 * @file playwright\components\resume-preview.spec.ts
 * @description playwright\components\resume-preview.spec module.
 * @module playwright\components\resume-preview.spec
 */

import { test, expect } from "@playwright/test";
import { stabilizePage } from "../utils/stabilizePage";

test.describe("ResumePreview", () => {
  test("opens modal and displays resume preview content", async ({ page }) => {
    await page.goto("/contact");
    await stabilizePage(page);

    await page.getByRole("button", { name: /preview resume/i }).click();

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator(".resume-preview__paper")).toBeVisible();
    await expect(page.getByRole("button", { name: /close/i })).toBeVisible();
  });

  test("closes modal via Close button", async ({ page }) => {
    await page.goto("/contact");
    await stabilizePage(page);

    await page.getByRole("button", { name: /preview resume/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByRole("button", { name: /close/i }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});
