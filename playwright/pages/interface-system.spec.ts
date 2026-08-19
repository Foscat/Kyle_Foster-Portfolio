/**
 * @file playwright/pages/interface-system.spec.ts
 * @description Browser coverage for the published Interface System case study.
 * @module playwright/pages/interface-system.spec
 */

import { expect, test } from "@playwright/test";
import { createPageTestSuite } from "../utils/pageTestTemplate.ts";
import { preparePageForStableTests, stabilizePage } from "../utils/stabilizePage";

const INTERFACE_SYSTEM_ROUTE = "/interface-system";

createPageTestSuite({
  name: "Interface System page",
  route: INTERFACE_SYSTEM_ROUTE,
});

test.describe("Interface System package proof", () => {
  test("links all four published packages to npm", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto(INTERFACE_SYSTEM_ROUTE);
    await stabilizePage(page, { theme: "dark" });

    const packageLinks = page.getByRole("link", { name: /view on npm/i });
    await expect(packageLinks).toHaveCount(4);

    for (const packageName of [
      "layout-style-css",
      "ui-style-kit-css",
      "ui-style-kit-icons",
      "interactive-surface-css",
    ]) {
      await expect(page.locator(`a[href$="/${packageName}"]`)).toBeVisible();
    }
  });
});
