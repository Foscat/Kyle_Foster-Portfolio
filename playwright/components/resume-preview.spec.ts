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

  test("keeps document entries readable against the paper surface", async ({ page }) => {
    await page.goto("/contact");
    await stabilizePage(page);

    await page.getByRole("button", { name: /preview resume/i }).click();

    const paper = page.locator(".resume-preview__paper");
    const entry = paper.locator(".resume-document__entry").first();
    const entryTitle = entry.locator(".resume-document__entry-title").first();

    await expect(paper).toBeVisible();
    await expect(paper).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(paper).toHaveCSS("color", "rgb(34, 34, 34)");
    await expect(entry).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(entry).toHaveCSS("background-image", "none");
    await expect(entry).toHaveCSS("box-shadow", "none");
    await expect(entry).toHaveCSS("border-radius", "0px");
    await expect(entry).toHaveCSS("padding-top", "0px");
    await expect(entryTitle).toHaveCSS("color", "rgb(31, 31, 31)");
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
