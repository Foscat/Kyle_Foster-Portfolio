/**
 * @file playwright\pages\health.spec.ts
 * @description playwright\pages\health.spec module.
 * @module playwright\pages\health.spec
 */

import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

test.describe("Health page", () => {
  test("renders runtime diagnostics panel", async ({ page }) => {
    await page.goto(toUrl("/health"));
    await page.waitForLoadState("networkidle");

    await expect(page.getByText(/system health/i)).toBeVisible();
    await expect(page.getByText(/react: 18\.2\.0/i)).toBeVisible();
  });
});
