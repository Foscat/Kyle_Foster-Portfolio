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

const RESPONSIVE_WIDTHS = [320, 390, 768, 899, 900, 1200, 1440];
const WIDE_WIDTHS = [1200, 1280, 1440];
const ORIENTATION_VIEWPORTS = [
  { label: "phone portrait", width: 390, height: 844 },
  { label: "phone landscape", width: 844, height: 390 },
  { label: "tablet portrait", width: 768, height: 1024 },
  { label: "tablet landscape", width: 1024, height: 768 },
  { label: "short desktop", width: 1280, height: 650 },
];
const ROUTE_LAYOUT_STYLES = [
  "retro-glass",
  "maximalist",
  "bauhaus",
  "minimal-saas",
  "retrofuturism",
  "mondrian",
];
const SECTIONED_ROUTES = [
  "/codestream",
  "/sanderson-technology-enterprises",
  "/interface-system",
  "/side-projects",
  "/hackathon",
  "/smu",
  "/docs",
];
const PERSISTENT_LAYER_VIEWPORTS = [
  { label: "phone portrait", width: 390, height: 844 },
  { label: "phone landscape", width: 844, height: 390 },
  { label: "compact boundary", width: 900, height: 650 },
  { label: "content-fit minus one", width: 939, height: 650 },
  { label: "content-fit desktop", width: 940, height: 650 },
  { label: "tablet landscape", width: 1024, height: 768 },
  { label: "short desktop", width: 1280, height: 500 },
];

type LayerBox = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};

const rectanglesOverlap = (first: LayerBox | null, second: LayerBox | null) =>
  Boolean(
    first &&
    second &&
    Math.max(first.left, second.left) < Math.min(first.right, second.right) &&
    Math.max(first.top, second.top) < Math.min(first.bottom, second.bottom)
  );

async function prepareRoute(
  page: Page,
  width: number,
  layoutStyle = "retro-glass",
  route = "/codestream"
) {
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
    const routeSectionNav = document.querySelector(".route-section-nav");

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
      routeSectionNav: box(".route-section-nav"),
      routeSectionNavPosition: routeSectionNav
        ? window.getComputedStyle(routeSectionNav).position
        : "",
    };
  });
}

async function scrollPersistentLayersIntoView(page: Page) {
  await page.evaluate(() => {
    const maximumScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const targetScroll = Math.min(maximumScroll, Math.max(700, maximumScroll * 0.35));
    window.scrollTo({ behavior: "instant", top: targetScroll });
  });

  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBeGreaterThan(300);
  await expect(page.locator(".back-to-top")).toHaveClass(/is-visible/u);
}

async function getPersistentLayerMeasurement(page: Page) {
  return page.evaluate(() => {
    const box = (element: Element | null) => {
      if (!element) return null;

      const styles = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      if (styles.display === "none" || rect.width <= 0 || rect.height <= 0) return null;

      return {
        bottom: Math.round(rect.bottom),
        height: Math.round(rect.height),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        top: Math.round(rect.top),
        width: Math.round(rect.width),
      };
    };

    const desktopNavigation = document.querySelector(".desktop-menu");
    const mobileNavigation = document.querySelector(".mobile-site-header");
    const desktopBox = box(desktopNavigation);
    const mobileBox = box(mobileNavigation);
    const primaryNavigation = desktopBox || mobileBox;
    const sectionNavigation = box(document.querySelector(".page-sidebar"));
    const backToTop = box(document.querySelector(".back-to-top.is-visible"));
    const mobileMenuTrigger = box(document.querySelector(".mobile-site-header button"));
    const mobileBrand = box(document.querySelector(".mobile-site-header__brand"));
    const routeCommand = document.querySelector(".route-section-nav");
    const routeCommandBackground = routeCommand
      ? window.getComputedStyle(routeCommand).backgroundColor
      : "";
    const alphaMatch = routeCommandBackground.match(
      /rgba?\([^)]*?[,/]\s*(0(?:\.\d+)?|1(?:\.0+)?)\s*\)$/u
    );
    const routeCommandBackgroundAlpha = routeCommandBackground.startsWith("rgba")
      ? Number.parseFloat(alphaMatch?.[1] || "0")
      : 1;
    const root = document.documentElement;
    const body = document.body;

    return {
      backToTop,
      backToTopBottomGap: backToTop ? Math.round(window.innerHeight - backToTop.bottom) : null,
      desktopNavigation: desktopBox,
      horizontalOverflow: Math.max(
        root.scrollWidth - root.clientWidth,
        body.scrollWidth - body.clientWidth
      ),
      mobileBrand,
      mobileMenuRightGap:
        mobileBox && mobileMenuTrigger
          ? Math.round(mobileBox.right - mobileMenuTrigger.right)
          : null,
      mobileMenuTrigger,
      mobileNavigation: mobileBox,
      primaryNavigation,
      routeCommandBackgroundAlpha,
      sectionNavigation,
    };
  });
}

test.describe("route section navigation responsive behavior", () => {
  test.describe("persistent navigation layers", () => {
    test("remain disjoint through the complete responsive boundary matrix", async ({ page }) => {
      test.setTimeout(90_000);
      await preparePageForStableTests(page, { theme: "dark" });

      for (const viewport of PERSISTENT_LAYER_VIEWPORTS) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(toUrl("/interface-system"));
        await stabilizePage(page, { theme: "dark" });
        await scrollPersistentLayersIntoView(page);

        const measurement = await getPersistentLayerMeasurement(page);
        const label = `${viewport.label} at ${viewport.width}x${viewport.height}`;

        expect(measurement.horizontalOverflow, label).toBeLessThanOrEqual(1);
        expect(measurement.primaryNavigation, label).not.toBeNull();
        expect(measurement.sectionNavigation, label).not.toBeNull();
        expect(measurement.backToTop, label).not.toBeNull();
        expect(
          rectanglesOverlap(measurement.primaryNavigation, measurement.sectionNavigation),
          `${label}: primary and section navigation`
        ).toBe(false);
        expect(
          rectanglesOverlap(measurement.primaryNavigation, measurement.backToTop),
          `${label}: primary navigation and back to top`
        ).toBe(false);
        expect(
          rectanglesOverlap(measurement.sectionNavigation, measurement.backToTop),
          `${label}: section navigation and back to top`
        ).toBe(false);
        expect(measurement.backToTopBottomGap, label).toBeGreaterThanOrEqual(8);
        expect(measurement.backToTopBottomGap, label).toBeLessThanOrEqual(32);
        expect(measurement.routeCommandBackgroundAlpha, label).toBeGreaterThanOrEqual(0.98);
      }
    });

    test("uses edge-aligned mobile controls until the desktop command bar fits", async ({
      page,
    }) => {
      await preparePageForStableTests(page, { theme: "dark" });

      for (const width of [390, 844, 900, 939, 940, 1024]) {
        await page.setViewportSize({ width, height: 650 });
        await page.goto(toUrl("/interface-system"));
        await stabilizePage(page, { theme: "dark" });

        const measurement = await getPersistentLayerMeasurement(page);
        if (width < 940) {
          expect(measurement.mobileNavigation, `mobile navigation at ${width}px`).not.toBeNull();
          expect(measurement.desktopNavigation, `desktop navigation at ${width}px`).toBeNull();
          expect(measurement.mobileMenuRightGap, `menu edge gap at ${width}px`).toBeLessThanOrEqual(
            32
          );
          expect(measurement.mobileBrand?.right, `brand at ${width}px`).toBeLessThan(
            measurement.mobileMenuTrigger?.left || 0
          );
        } else {
          expect(measurement.desktopNavigation, `desktop navigation at ${width}px`).not.toBeNull();
          expect(measurement.mobileNavigation, `mobile navigation at ${width}px`).toBeNull();
          expect(
            measurement.desktopNavigation?.height,
            `desktop row at ${width}px`
          ).toBeLessThanOrEqual(72);
        }
      }
    });

    for (const route of SECTIONED_ROUTES) {
      test(`${route} keeps shared chrome separated after scrolling`, async ({ page }) => {
        test.setTimeout(60_000);
        await preparePageForStableTests(page, { theme: "dark" });

        for (const viewport of [
          { width: 844, height: 390 },
          { width: 900, height: 650 },
          { width: 1280, height: 500 },
        ]) {
          await page.setViewportSize(viewport);
          await page.goto(toUrl(route));
          await stabilizePage(page, { theme: "dark" });
          await scrollPersistentLayersIntoView(page);

          const measurement = await getPersistentLayerMeasurement(page);
          const label = `${route} at ${viewport.width}x${viewport.height}`;

          expect(
            rectanglesOverlap(measurement.primaryNavigation, measurement.sectionNavigation),
            `${label}: primary and section navigation`
          ).toBe(false);
          expect(
            rectanglesOverlap(measurement.primaryNavigation, measurement.backToTop),
            `${label}: primary navigation and back to top`
          ).toBe(false);
          expect(
            rectanglesOverlap(measurement.sectionNavigation, measurement.backToTop),
            `${label}: section navigation and back to top`
          ).toBe(false);
          expect(measurement.horizontalOverflow, label).toBeLessThanOrEqual(1);
        }
      });
    }
  });

  test("Interface System stays usable across orientation and short-height viewports", async ({
    page,
  }) => {
    await preparePageForStableTests(page, { theme: "dark" });

    for (const viewport of ORIENTATION_VIEWPORTS) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(toUrl("/interface-system"));
      await stabilizePage(page, { theme: "dark" });

      const measurement = await getRouteLayoutMeasurement(page);
      expect(measurement.horizontalOverflow, viewport.label).toBeLessThanOrEqual(1);
      expect(measurement.gridTrackCount, viewport.label).toBe(1);
      expect(measurement.routeSectionNav?.width, viewport.label).toBeGreaterThan(0);
      expect(measurement.main?.height, viewport.label).toBeGreaterThan(0);
    }
  });

  test("the command bar remains in flow without horizontal overflow", async ({ page }) => {
    test.setTimeout(60_000);
    await preparePageForStableTests(page, { theme: "dark" });

    for (const width of RESPONSIVE_WIDTHS) {
      await prepareRoute(page, width);
      const measurement = await getRouteLayoutMeasurement(page);

      expect(measurement.horizontalOverflow, `viewport ${width}`).toBeLessThanOrEqual(1);
      expect(measurement.gridTrackCount, `viewport ${width}`).toBe(1);
      expect(measurement.routeSectionNav?.width, `viewport ${width}`).toBeGreaterThan(0);
      expect(measurement.layoutPaddingStart, `viewport ${width}`).toBe(0);
      expect(measurement.sidebar?.width, `viewport ${width}`).toBe(measurement.main?.width);
    }
  });

  test("wide layout styles keep the section command bar aligned above content", async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await preparePageForStableTests(page, { theme: "dark" });

    for (const layoutStyle of ROUTE_LAYOUT_STYLES) {
      for (const width of WIDE_WIDTHS) {
        await prepareRoute(page, width, layoutStyle);
        const measurement = await getRouteLayoutMeasurement(page);
        const label = `${layoutStyle} at ${width}px`;

        expect(measurement.horizontalOverflow, label).toBeLessThanOrEqual(1);
        expect(measurement.gridTrackCount, label).toBe(1);
        expect(measurement.layoutPaddingStart, label).toBe(0);
        expect(
          Math.abs((measurement.routeSectionNav?.width || 0) - (measurement.sidebar?.width || 0)),
          label
        ).toBeLessThanOrEqual(2);
        expect(measurement.sidebar?.left, label).toBe(measurement.main?.left);
        expect(measurement.main?.width, label).toBe(measurement.sidebar?.width);
      }
    }
  });

  test("drawer section labels keep a consistent regular font weight", async ({ page }) => {
    await preparePageForStableTests(page, { theme: "dark" });
    await prepareRoute(page, 1280, "retro-glass", "/sanderson-technology-enterprises");

    await page.getByRole("button", { name: /open section navigation/i }).click();
    const sectionLabels = page.getByRole("dialog").locator(".mobile-section-title");
    await expect(sectionLabels.first()).toBeVisible();

    const fontWeights = await sectionLabels.evaluateAll((labels) =>
      labels.map((label) => window.getComputedStyle(label).fontWeight)
    );

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
