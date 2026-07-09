/**
 * @file playwright/pages/sanderson-technology-enterprises.spec.ts
 * @description Browser coverage for the Sanderson Technology Enterprises page.
 * @module playwright/pages/sanderson-technology-enterprises.spec
 */

import { expect, test } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "../utils/stabilizePage";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const STE_ROUTE = "/sanderson-technology-enterprises";
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

test.describe("Sanderson Technology Enterprises content", () => {
  test("renders core layout regions", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto(toUrl(STE_ROUTE));
    await page.waitForLoadState("networkidle");
    await stabilizePage(page, { theme: "dark" });

    await expect(page.locator('[role="banner"]')).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("renders sticky section navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto(toUrl(STE_ROUTE));
    await page.waitForLoadState("networkidle");
    await stabilizePage(page, { theme: "dark" });

    await expect(page.locator('nav[aria-label="Section navigation"]')).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: /section navigation/i })
        .getByRole("button", { name: "Three-Package UI Bundle", exact: true })
    ).toBeVisible();
  });

  test("renders public links and does not expose private resources", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto(toUrl(STE_ROUTE));
    await page.waitForLoadState("networkidle");
    await stabilizePage(page, { theme: "dark" });

    await expect(
      page.getByRole("heading", { level: 1, name: "Sanderson Technology Enterprises" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /visit ste website/i })).toHaveAttribute(
      "href",
      "https://sandersontechnologyenterprises.com/"
    );
    await expect(page.getByRole("link", { name: /view layout style css/i })).toHaveAttribute(
      "href",
      "/side-projects#layout-style-css"
    );

    const pageText = await page.locator("body").innerText();
    expect(pageText).toContain("private/proprietary");
    expect(pageText).toContain('mode = "auto" || "dark"');
    expect(pageText).not.toMatch(/notion|docs\.notion|secret|token|private repo/iu);
    await expect(page.locator('a[href*="notion"]')).toHaveCount(0);
    await expect(page.locator('a[href*="Golden-Goose"]')).toHaveCount(0);
  });
});
