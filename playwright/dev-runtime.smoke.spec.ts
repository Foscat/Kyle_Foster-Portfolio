/**
 * @file playwright\dev-runtime.smoke.spec.ts
 * @description playwright\dev-runtime.smoke.spec module.
 * @module playwright\dev-runtime.smoke.spec
 */

import { test, expect, type Page } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

type DevSmokeRoute = {
  route: string;
  label: string;
};

const ROUTES: DevSmokeRoute[] = [
  { route: "/", label: "Home" },
  { route: "/codestream", label: "CodeStream" },
  { route: "/docs", label: "Docs" },
];

const MODULE_RESOLUTION_ERROR_PATTERN =
  /(does not provide an export named|failed to fetch dynamically imported module|cannot find module|failed to resolve module specifier)/i;

const collectRuntimeErrors = (page: Page) => {
  const errors: string[] = [];

  page.on("pageerror", (error) => {
    errors.push(String(error));
  });
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    errors.push(message.text());
  });

  return errors;
};

test.describe("Dev runtime smoke @dev-smoke", () => {
  for (const routeCase of ROUTES) {
    test(`${routeCase.label} route loads without module-resolution errors @dev-smoke`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await preparePageForStableTests(page, { theme: "dark" });

      const runtimeErrors = collectRuntimeErrors(page);

      await page.goto(routeCase.route);
      await stabilizePage(page, { theme: "dark" });
      await page.waitForLoadState("networkidle");

      const moduleResolutionErrors = runtimeErrors.filter((error) =>
        MODULE_RESOLUTION_ERROR_PATTERN.test(error)
      );

      expect(
        moduleResolutionErrors,
        `Runtime module-resolution errors on ${routeCase.route}: ${moduleResolutionErrors.join("; ")}`
      ).toEqual([]);
    });
  }
});
