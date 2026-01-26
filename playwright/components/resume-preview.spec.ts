import { test, expect } from "@playwright/test";
import { stabilizePage } from "../utils/stabilizePage";

test.describe("ResumePreview", () => {
  test("opens modal and displays resume iframe", async ({ page }) => {
    await page.goto("/");
    await stabilizePage(page);

    // Prefer aria-label because Btn may render as <a> or <button> depending on props.
    await page.getByLabel("Preview resume").click();

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByTitle("Resume preview")).toBeVisible();
  });

  test("closes modal via Close button", async ({ page }) => {
    await page.goto("/");
    await stabilizePage(page);

    await page.getByLabel("Preview resume").click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByLabel("Close resume preview").click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});
