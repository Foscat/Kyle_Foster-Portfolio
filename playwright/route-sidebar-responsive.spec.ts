/**
 * @file playwright/route-sidebar-responsive.spec.ts
 * @description Responsive route-sidebar regressions for overflow-safe section navigation.
 * @module playwright/route-sidebar-responsive
 */

import { expect, test, type Page } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

const MOBILE_WIDTHS = [320, 390, 768, 1023, 1100, 1199];
const DESKTOP_WIDTHS = [1200, 1280, 1440];
const ROUTE_LAYOUT_STYLES = [
  "retro-glass",
  "maximalist",
  "bauhaus",
  "minimal-saas",
  "retrofuturism",
  "mondrian",
];

async function prepareRoute(page: Page, width: number, layoutStyle = "retro-glass", route = "/") {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(toUrl(route));
  await stabilizePage(page, { theme: "dark" });
  await setLayoutStyle(page, layoutStyle);
}

async function setLayoutStyle(page: Page, layoutStyle: string) {
  await page.evaluate((nextLayoutStyle) => {
    document.documentElement.dataset.layout = nextLayoutStyle;
    document.documentElement.dataset.lyLayout = nextLayoutStyle;
    document.documentElement.setAttribute("layout-style", nextLayoutStyle);
    document.body.classList.add("ly-root");
    document.body.dataset.layout = nextLayoutStyle;
    document.body.dataset.lyLayout = nextLayoutStyle;
    document.body.setAttribute("layout-style", nextLayoutStyle);
    window.localStorage.setItem("portfolio-layout-style", nextLayoutStyle);
  }, layoutStyle);

  await expect
    .poll(() => page.evaluate(() => document.body.getAttribute("layout-style") || ""))
    .toBe(layoutStyle);
}

async function getRouteLayoutMeasurement(page: Page) {
  return page.evaluate(() => {
    // Count top-level grid tracks without splitting spaces inside minmax()/calc().
    const countGridTracks = (value: string) => {
      let depth = 0;
      let trackCount = 0;
      let hasTrackContent = false;

      for (const character of value.trim()) {
        if (character === "(") depth += 1;
        if (character === ")") depth = Math.max(0, depth - 1);

        if (/\s/u.test(character) && depth === 0) {
          if (hasTrackContent) trackCount += 1;
          hasTrackContent = false;
          continue;
        }

        hasTrackContent = true;
      }

      return trackCount + Number(hasTrackContent);
    };

    const box = (selector: string) => {
      const element = document.querySelector(selector);
      if (!element) return null;

      const rect = element.getBoundingClientRect();
      return {
        height: Math.round(rect.height),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
      };
    };

    const root = document.documentElement;
    const body = document.body;
    const layout = document.querySelector(".page-layout");
    const layoutStyles = layout ? window.getComputedStyle(layout) : null;
    const gridTrackCount = layoutStyles ? countGridTracks(layoutStyles.gridTemplateColumns) : 0;
    const sectionList = document.querySelector(".section-nav-list");

    return {
      horizontalOverflow: Math.max(
        root.scrollWidth - root.clientWidth,
        body.scrollWidth - body.clientWidth
      ),
      gridTrackCount,
      layoutPaddingStart: Number.parseFloat(layoutStyles?.paddingInlineStart || "0") || 0,
      layout: box(".page-layout"),
      main: box(".page-content"),
      sidebar: box(".page-sidebar"),
      desktopNav: box(".sticky-section-nav"),
      mobileTrigger: box("[data-testid='mobile-sect-nav-trigger-wrapper']"),
      navListOverflow: sectionList ? sectionList.scrollWidth - sectionList.clientWidth : 0,
    };
  });
}

test.describe("route sidebar responsive behavior", () => {
  test("mobile widths use the gutter trigger without horizontal overflow", async ({ page }) => {
    await preparePageForStableTests(page, { theme: "dark" });

    for (const width of MOBILE_WIDTHS) {
      await prepareRoute(page, width);
      const measurement = await getRouteLayoutMeasurement(page);

      expect(measurement.horizontalOverflow, `viewport ${width}`).toBeLessThanOrEqual(1);
      expect(measurement.gridTrackCount, `viewport ${width}`).toBe(1);
      expect(measurement.desktopNav, `viewport ${width}`).toBeNull();
      expect(measurement.mobileTrigger?.width, `viewport ${width}`).toBeGreaterThan(0);
      expect(measurement.layoutPaddingStart, `viewport ${width}`).toBeGreaterThan(40);
    }
  });

  test("desktop layout styles keep a readable right sidebar without nav overflow", async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await preparePageForStableTests(page, { theme: "dark" });

    for (const layoutStyle of ROUTE_LAYOUT_STYLES) {
      for (const width of DESKTOP_WIDTHS) {
        await prepareRoute(page, width, layoutStyle);
        const measurement = await getRouteLayoutMeasurement(page);
        const label = `${layoutStyle} at ${width}px`;

        expect(measurement.horizontalOverflow, label).toBeLessThanOrEqual(1);
        expect(measurement.gridTrackCount, label).toBe(2);
        expect(measurement.layoutPaddingStart, label).toBe(0);
        expect(measurement.desktopNav?.width, label).toBeGreaterThanOrEqual(220);
        expect(measurement.sidebar?.width, label).toBeGreaterThanOrEqual(232);
        expect(measurement.sidebar?.left, label).toBeGreaterThan(measurement.main?.left || 0);
        expect(measurement.main?.width, label).toBeGreaterThan(measurement.sidebar?.width || 0);
        expect(measurement.navListOverflow, label).toBeLessThanOrEqual(1);
      }
    }
  });

  test("desktop section labels keep a consistent regular font weight", async ({ page }) => {
    await preparePageForStableTests(page, { theme: "dark" });
    await prepareRoute(page, 1280, "retro-glass", "/sanderson-technology-enterprises");

    const sectionLabels = page.locator(".section-nav-link");
    const subsectionLabels = page.locator(".sub-section-nav-block");
    await expect(sectionLabels.first()).toBeVisible();
    await expect(subsectionLabels.first()).toBeAttached();

    const fontWeights = await sectionLabels
      .or(subsectionLabels)
      .evaluateAll((labels) => labels.map((label) => window.getComputedStyle(label).fontWeight));

    expect(new Set(fontWeights)).toEqual(new Set(["500"]));
  });

  test("mobile section drawer overlays within the viewport and closes cleanly", async ({
    page,
  }) => {
    await preparePageForStableTests(page, { theme: "dark" });
    await prepareRoute(page, 390);

    await page.getByRole("button", { name: /open section navigation/i }).click();
    const drawer = page.locator(".mobile-section-nav-drawer .rs-drawer-dialog");
    await expect(drawer).toBeVisible();

    const openState = await page.evaluate(() => {
      const root = document.documentElement;
      const body = document.body;
      const drawerElement = document.querySelector(".mobile-section-nav-drawer .rs-drawer-dialog");
      const rect = drawerElement?.getBoundingClientRect();

      return {
        horizontalOverflow: Math.max(
          root.scrollWidth - root.clientWidth,
          body.scrollWidth - body.clientWidth
        ),
        drawerLeft: Math.round(rect?.left ?? 0),
        drawerRight: Math.round(rect?.right ?? 0),
        drawerWidth: Math.round(rect?.width ?? 0),
        viewportWidth: window.innerWidth,
      };
    });

    expect(openState.horizontalOverflow).toBeLessThanOrEqual(1);
    expect(openState.drawerLeft).toBeGreaterThanOrEqual(0);
    expect(openState.drawerRight).toBeLessThanOrEqual(openState.viewportWidth);
    expect(openState.drawerWidth).toBeGreaterThan(0);

    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    expect((await getRouteLayoutMeasurement(page)).horizontalOverflow).toBeLessThanOrEqual(1);
  });
});
