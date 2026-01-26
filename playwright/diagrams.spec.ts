import { test, expect } from "@playwright/test";

/**
 * Mermaid diagram smoke test
 * ------------------------------------------------------------
 * Ensures the Mermaid diagram page loads and the primary diagram container is present.
 *
 * Notes:
 * - We use an absolute URL build function so these tests remain runnable even if the
 *   Playwright config is not picked up (e.g., when running from a nested directory).
 */

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

test("Mermaid diagram page loads without console errors", async ({ page }) => {
  const consoleErrors: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  await page.goto(toUrl("/"));
  await page.waitForLoadState("networkidle");

  // Adjust selectors based on your diagram component/container.
  await expect(page.locator(".mermaid").first()).toBeVisible();

  // Keep a clean signal: fail if the page emitted any console errors.
  expect(consoleErrors, `Console errors:\n${consoleErrors.join("\n")}`).toEqual([]);
});
