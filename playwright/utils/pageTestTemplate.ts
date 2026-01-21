import { test, expect, Page } from "@playwright/test";
import { stabilizePage } from "./stabilizePage";

/**
 * CI-safe console enforcement
 * ---------------------------------------------------------------------------
 * You should treat console.error as a test failure.
 * Warnings are allowed unless you explicitly want to fail on them as well.
 */
function installConsoleGuards(page: Page) {
  const errors: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    errors.push(String(err));
  });

  return {
    assertNoConsoleErrors() {
      if (errors.length) {
        throw new Error(`Console errors detected:\n\n${errors.join("\n\n")}`);
      }
    },
  };
}

/**
 * createPageTestSuite
 * ---------------------------------------------------------------------------
 * Generates a consistent set of tests for data-driven pages.
 */
export function createPageTestSuite(config: { name: string; route: string; pageTitle?: RegExp }) {
  test.describe(`${config.name} page`, () => {
    test(`renders core layout regions`, async ({ page }) => {
      const guard = installConsoleGuards(page);

      await page.goto(config.route);
      await stabilizePage(page);

      // Keep these selectors generic and resilient
      await expect(page.getByRole("main")).toBeVisible();

      // If you know your PageHeader always renders an h1, assert it
      if (config.pageTitle) {
        await expect(page.getByRole("heading", { level: 1, name: config.pageTitle })).toBeVisible();
      }

      guard.assertNoConsoleErrors();
    });

    test(`renders sticky section navigation`, async ({ page }) => {
      const guard = installConsoleGuards(page);

      await page.goto(config.route);
      await stabilizePage(page);

      // This should match your StickySectionNav landmark/role.
      // If your component uses aria-label="Section navigation", this will hold.
      await expect(page.getByRole("navigation", { name: /section navigation/i })).toBeVisible();

      guard.assertNoConsoleErrors();
    });

    test(`matches visual snapshot`, async ({ page }) => {
      const guard = installConsoleGuards(page);

      await page.goto(config.route);
      await stabilizePage(page);

      await expect(page).toHaveScreenshot(`${config.name.toLowerCase().replace(/\s+/g, "-")}.png`, {
        fullPage: true,
      });

      guard.assertNoConsoleErrors();
    });
  });
}
