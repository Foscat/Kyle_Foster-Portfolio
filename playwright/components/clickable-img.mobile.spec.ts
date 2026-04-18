/**
 * @file playwright\components\clickable-img.mobile.spec.ts
 * @description playwright\components\clickable-img.mobile.spec module.
 * @module playwright\components\clickable-img.mobile.spec
 */

import { expect, test, type Page } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "../utils/stabilizePage";

const MOBILE_VIEWPORT = { width: 390, height: 844 };
const WIDE_IMAGE_ID = "d20_dashboard_img";

async function openImageModal(page: Page, imageId: string) {
  const thumbnail = page.locator(`#${imageId} .clickable-thumb`).first();
  await thumbnail.scrollIntoViewIfNeeded();
  await expect(thumbnail).toBeVisible();
  await thumbnail.click();
  await expect(page.getByRole("dialog")).toBeVisible();
}

test.describe("ClickableImg mobile behavior", () => {
  test("supports zoom metadata toggle for wide screenshots on mobile", async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto("/side-projects");
    await stabilizePage(page, { theme: "dark" });

    await openImageModal(page, WIDE_IMAGE_ID);

    const meta = page.locator(".modal-meta");
    const zoomIn = page.getByRole("button", { name: /zoom in image/i });
    const resetZoom = page.getByRole("button", { name: /reset image zoom/i });
    const zoomHint = page.locator(".modal-zoom-hint");

    await expect(meta).toBeVisible();
    await expect(resetZoom).toHaveText("100%");

    await zoomIn.click();

    await expect(resetZoom).toHaveText("125%");
    await expect(zoomHint).toBeVisible();
    await expect(meta).not.toBeVisible();

    await resetZoom.click();

    await expect(resetZoom).toHaveText("100%");
    await expect(meta).toBeVisible();
    await expect(zoomHint).not.toBeVisible();
  });
});
