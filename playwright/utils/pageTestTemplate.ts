import { test, expect, Page } from "@playwright/test";
import { stabilizePage } from "./stabilizePage";

/**
 * Base URL resolution
 * ------------------------------------------------------------
 * Playwright can resolve relative routes when `use.baseURL` is set in the config.
 * However, developers often run tests from nested folders (e.g. `playwright/pages`),
 * which can cause Playwright to miss the root config and treat relative routes as
 * invalid URLs.
 *
 * This helper makes navigation robust by always converting a route into an absolute URL.
 */
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";

/**
 * Convert an app route to an absolute URL.
 *
 * @param path - A relative route like "/" or "/hackathon", or an absolute URL.
 */
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

export type PageTestConfig = {
  name: string;
  route: string;
  /** CSS selector used to validate the presence of a sticky section nav on the page. */
  stickyNavSelector: string;
};

/**
 * registerPageTests
 * ------------------------------------------------------------
 * Standard smoke tests for page components:
 * - Core layout regions exist
 * - Sticky section navigation exists (where applicable)
 * - Full-page visual snapshot (stabilized)
 */
export function registerPageTests(config: PageTestConfig) {
  test.describe(config.name, () => {
    test("renders core layout regions", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });

      await page.goto(toUrl(config.route));
      await page.waitForLoadState("networkidle");

      // Fail fast on console errors for the route under test.
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(String(err)));
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });

      await stabilizePage(page);

      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();

      expect(errors, errors.join("\n\n")).toHaveLength(0);
    });

    test("renders sticky section navigation", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });

      await page.goto(toUrl(config.route));
      await page.waitForLoadState("networkidle");

      await stabilizePage(page);

      const stickyNav = page.locator(config.stickyNavSelector);
      await expect(stickyNav).toBeVisible();
    });

    test("matches visual snapshot", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });

      await page.goto(toUrl(config.route));
      await page.waitForLoadState("networkidle");

      await stabilizePage(page);

      await expect(page).toHaveScreenshot({ fullPage: true });
    });
  });
}
