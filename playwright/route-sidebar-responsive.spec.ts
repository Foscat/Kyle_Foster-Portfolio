/**
 * @file playwright/route-sidebar-responsive.spec.ts
 * @description Responsive regressions for the unified primary and section navigation shell.
 * @module playwright/unified-navigation-responsive
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
const UNIFIED_NAVIGATION_VIEWPORTS = [
  { label: "narrow phone portrait", width: 320, height: 568 },
  { label: "phone portrait", width: 390, height: 844 },
  { label: "phone landscape", width: 844, height: 390 },
  { label: "compact tablet", width: 900, height: 650 },
  { label: "final compact width", width: 939, height: 650 },
  { label: "desktop content-fit boundary", width: 940, height: 650 },
  { label: "tablet landscape", width: 1024, height: 768 },
  { label: "short desktop", width: 1280, height: 500 },
  { label: "wide desktop", width: 1440, height: 900 },
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

const rectangleContains = (outer: LayerBox | null, inner: LayerBox | null, tolerance = 1) =>
  Boolean(
    outer &&
    inner &&
    inner.left >= outer.left - tolerance &&
    inner.right <= outer.right + tolerance &&
    inner.top >= outer.top - tolerance &&
    inner.bottom <= outer.bottom + tolerance
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
        bottom: Math.round(rect.bottom),
        height: Math.round(rect.height),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        top: Math.round(rect.top),
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
      navigationShell: box('[data-testid="unified-navigation"]'),
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

    const navigationShell = box(document.querySelector('[data-testid="unified-navigation"]'));
    const desktopNavigation = box(document.querySelector(".sticky-nav-pages-group"));
    const websiteTrigger = box(document.querySelector(".unified-navigation__site-trigger button"));
    const brand = box(document.querySelector(".unified-navigation__brand"));
    const sectionNavigation = box(document.querySelector(".route-section-nav"));
    const backToTop = box(document.querySelector(".back-to-top.is-visible"));
    const navigationElement = document.querySelector('[data-testid="unified-navigation"]');
    const navigationBackground = navigationElement
      ? window.getComputedStyle(navigationElement).backgroundColor
      : "";
    const alphaMatch = navigationBackground.match(
      /rgba?\([^)]*?[,/]\s*(0(?:\.\d+)?|1(?:\.0+)?)\s*\)$/u
    );
    const navigationBackgroundAlpha = navigationBackground.startsWith("rgba")
      ? Number.parseFloat(alphaMatch?.[1] || "0")
      : 1;
    const root = document.documentElement;
    const body = document.body;

    return {
      backToTop,
      backToTopBottomGap: backToTop ? Math.round(window.innerHeight - backToTop.bottom) : null,
      brand,
      brandCenter: brand ? Math.round(brand.left + brand.width / 2) : null,
      desktopNavigation,
      horizontalOverflow: Math.max(
        root.scrollWidth - root.clientWidth,
        body.scrollWidth - body.clientWidth
      ),
      navigationBackgroundAlpha,
      navigationShell,
      sectionNavigation,
      shellCenter: navigationShell
        ? Math.round(navigationShell.left + navigationShell.width / 2)
        : null,
      websiteTrigger,
    };
  });
}

test.describe("route section navigation responsive behavior", () => {
  test("unified navigation spans the viewport and keeps every visible control on one row", async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await preparePageForStableTests(page, { theme: "dark" });

    for (const viewport of UNIFIED_NAVIGATION_VIEWPORTS) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(toUrl("/interface-system"));
      await stabilizePage(page, { theme: "dark" });

      const measurement = await page.evaluate(() => {
        const box = (element: Element | null) => {
          if (!element) return null;

          const styles = window.getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          if (styles.display === "none" || rect.width <= 0 || rect.height <= 0) return null;

          return {
            bottom: Math.round(rect.bottom),
            centerY: Math.round(rect.top + rect.height / 2),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            top: Math.round(rect.top),
          };
        };

        const root = document.documentElement;
        const body = document.body;
        const shellElement = document.querySelector('[data-testid="unified-navigation"]');
        const shell = box(shellElement);
        const controlSelectors = [
          ".unified-navigation__site-trigger button",
          ".unified-navigation__brand",
          ".route-section-nav__trigger",
        ];
        const controls = controlSelectors
          .map((selector) => box(document.querySelector(selector)))
          .filter((control): control is NonNullable<typeof control> => Boolean(control));

        return {
          controls,
          horizontalOverflow: Math.max(
            root.scrollWidth - root.clientWidth,
            body.scrollWidth - body.clientWidth
          ),
          brand: box(document.querySelector(".unified-navigation__brand")),
          desktopNavigation: box(document.querySelector(".sticky-nav-pages-group")),
          pageSidebarCount: document.querySelectorAll(".page-sidebar").length,
          sectionNavigation: box(document.querySelector(".route-section-nav")),
          shell,
          shellCount: document.querySelectorAll('[data-testid="unified-navigation"]').length,
          shellPosition: shellElement ? window.getComputedStyle(shellElement).position : "",
          layoutViewportRight: Math.round(body.getBoundingClientRect().right),
        };
      });
      const label = `${viewport.label} at ${viewport.width}x${viewport.height}`;
      const centerValues = measurement.controls.map((control) => control.centerY);

      expect(measurement.shellCount, label).toBe(1);
      expect(measurement.pageSidebarCount, label).toBe(0);
      expect(measurement.shellPosition, label).toBe("sticky");
      expect(Math.abs(measurement.shell?.left || 0), label).toBeLessThanOrEqual(1);
      expect(
        Math.abs((measurement.shell?.right || 0) - measurement.layoutViewportRight),
        label
      ).toBeLessThanOrEqual(1);
      expect(measurement.shell?.top, label).toBe(0);
      expect(measurement.horizontalOverflow, label).toBeLessThanOrEqual(1);
      expect(measurement.desktopNavigation, label).toBeNull();
      expect(measurement.sectionNavigation, label).not.toBeNull();
      expect(measurement.sectionNavigation?.top || 0, label).toBeGreaterThanOrEqual(
        (measurement.shell?.top || 0) - 1
      );
      expect(measurement.sectionNavigation?.bottom || 0, label).toBeLessThanOrEqual(
        (measurement.shell?.bottom || 0) + 1
      );
      expect(Math.max(...centerValues) - Math.min(...centerValues), label).toBeLessThanOrEqual(2);
      const shellCenter = ((measurement.shell?.left || 0) + (measurement.shell?.right || 0)) / 2;
      const brandCenter = ((measurement.brand?.left || 0) + (measurement.brand?.right || 0)) / 2;
      expect(Math.abs(brandCenter - shellCenter), `${label}: centered brand`).toBeLessThanOrEqual(
        1
      );
    }
  });

  test("keeps the home brand centered when a route has no sections", async ({ page }) => {
    await preparePageForStableTests(page, { theme: "dark" });

    for (const viewport of [
      { width: 390, height: 844 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto(toUrl("/"));
      await stabilizePage(page, { theme: "dark" });

      await expect(page.getByRole("button", { name: "Open website navigation" })).toBeVisible();
      await expect(page.getByRole("button", { name: /open section navigation/i })).toHaveCount(0);

      const centerDelta = await page.evaluate(() => {
        const shell = document
          .querySelector('[data-testid="unified-navigation"]')
          ?.getBoundingClientRect();
        const brand = document.querySelector(".unified-navigation__brand")?.getBoundingClientRect();
        if (!shell || !brand) return Number.POSITIVE_INFINITY;
        return Math.abs(brand.left + brand.width / 2 - (shell.left + shell.width / 2));
      });

      expect(centerDelta, `centered home brand at ${viewport.width}px`).toBeLessThanOrEqual(1);
    }
  });

  test.describe("persistent unified navigation", () => {
    test("contains the section command through the complete responsive boundary matrix", async ({
      page,
    }) => {
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
        expect(measurement.navigationShell, label).not.toBeNull();
        expect(measurement.sectionNavigation, label).not.toBeNull();
        expect(measurement.backToTop, label).not.toBeNull();
        expect(
          rectangleContains(measurement.navigationShell, measurement.sectionNavigation),
          `${label}: section command belongs to the unified shell`
        ).toBe(true);
        expect(
          rectanglesOverlap(measurement.navigationShell, measurement.backToTop),
          `${label}: unified navigation and back to top`
        ).toBe(false);
        expect(
          rectanglesOverlap(measurement.sectionNavigation, measurement.backToTop),
          `${label}: section navigation and back to top`
        ).toBe(false);
        expect(measurement.backToTopBottomGap, label).toBeGreaterThanOrEqual(8);
        expect(measurement.backToTopBottomGap, label).toBeLessThanOrEqual(32);
        expect(measurement.navigationBackgroundAlpha, label).toBeGreaterThanOrEqual(0.98);
      }
    });

    test("keeps opposed icon triggers and the centered brand at every width", async ({ page }) => {
      await preparePageForStableTests(page, { theme: "dark" });

      for (const width of [390, 844, 900, 939, 940, 1024]) {
        await page.setViewportSize({ width, height: 650 });
        await page.goto(toUrl("/interface-system"));
        await stabilizePage(page, { theme: "dark" });

        const measurement = await getPersistentLayerMeasurement(page);
        expect(measurement.websiteTrigger, `website trigger at ${width}px`).not.toBeNull();
        expect(measurement.desktopNavigation, `exposed destinations at ${width}px`).toBeNull();
        expect(measurement.websiteTrigger?.right, `website trigger at ${width}px`).toBeLessThan(
          measurement.brand?.left || 0
        );
        expect(
          measurement.sectionNavigation?.left,
          `section trigger at ${width}px`
        ).toBeGreaterThan(measurement.brand?.right || 0);
        expect(
          Math.abs((measurement.brandCenter || 0) - (measurement.shellCenter || 0)),
          `centered brand at ${width}px`
        ).toBeLessThanOrEqual(1);
        expect(measurement.navigationShell?.height, `header row at ${width}px`).toBeLessThanOrEqual(
          104
        );
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
            rectangleContains(measurement.navigationShell, measurement.sectionNavigation),
            `${label}: section command belongs to the unified shell`
          ).toBe(true);
          expect(
            rectanglesOverlap(measurement.navigationShell, measurement.backToTop),
            `${label}: unified navigation and back to top`
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

  test("the section trigger remains in flow without horizontal overflow", async ({ page }) => {
    test.setTimeout(60_000);
    await preparePageForStableTests(page, { theme: "dark" });

    for (const width of RESPONSIVE_WIDTHS) {
      await prepareRoute(page, width);
      const measurement = await getRouteLayoutMeasurement(page);

      expect(measurement.horizontalOverflow, `viewport ${width}`).toBeLessThanOrEqual(1);
      expect(measurement.gridTrackCount, `viewport ${width}`).toBe(1);
      expect(measurement.routeSectionNav?.width, `viewport ${width}`).toBeGreaterThan(0);
      expect(measurement.layoutPaddingStart, `viewport ${width}`).toBe(0);
      expect(measurement.navigationShell?.width, `viewport ${width}`).toBeGreaterThan(
        measurement.main?.width || 0
      );
    }
  });

  test("wide layout styles keep the section command inside the unified shell", async ({ page }) => {
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
        expect(measurement.navigationShell, label).not.toBeNull();
        expect(measurement.routeSectionNav, label).not.toBeNull();
        expect(
          rectangleContains(measurement.navigationShell, measurement.routeSectionNav),
          label
        ).toBe(true);
      }
    }
  });

  test("section selection lands below the measured unified header", async ({ page }) => {
    await preparePageForStableTests(page, { theme: "dark" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(toUrl("/interface-system"));
    await stabilizePage(page, { theme: "dark" });

    await page.getByRole("button", { name: /open section navigation/i }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Published packages" }).click();

    await expect(page).toHaveURL(/#published-packages$/u);
    await expect
      .poll(() =>
        page.evaluate(() => {
          const shell = document
            .querySelector('[data-testid="unified-navigation"]')
            ?.getBoundingClientRect();
          const target = document.querySelector("#published-packages")?.getBoundingClientRect();

          return Math.abs(Math.round((target?.top || 0) - (shell?.bottom || 0)));
        })
      )
      .toBeLessThanOrEqual(2);

    const settledOffset = await page.evaluate(() => {
      const shell = document
        .querySelector('[data-testid="unified-navigation"]')
        ?.getBoundingClientRect();
      const target = document.querySelector("#published-packages")?.getBoundingClientRect();
      return Math.round((target?.top || 0) - (shell?.bottom || 0));
    });
    expect(settledOffset).toBeGreaterThanOrEqual(-1);
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

  test("section drawer overlays within the viewport and closes cleanly", async ({ page }) => {
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

  test("website and section drawers open from opposed viewport edges", async ({ page }) => {
    await preparePageForStableTests(page, { theme: "dark" });

    for (const viewport of [
      { width: 390, height: 844 },
      { width: 1280, height: 650 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto(toUrl("/interface-system"));
      await stabilizePage(page, { theme: "dark" });

      await page.getByRole("button", { name: "Open website navigation" }).click();
      const websiteDrawer = page.locator(
        ".mobile-nav-drawer:not(.mobile-section-nav-drawer) .rs-drawer-dialog"
      );
      await expect(websiteDrawer).toBeVisible();
      const websiteBox = await websiteDrawer.boundingBox();
      expect(Math.round(websiteBox?.x || 0), `website drawer at ${viewport.width}px`).toBe(0);
      await page.getByRole("button", { name: "Close website navigation" }).click();
      await expect(websiteDrawer).toBeHidden();

      await page.getByRole("button", { name: /open section navigation/i }).click();
      const sectionDrawer = page.locator(".mobile-section-nav-drawer .rs-drawer-dialog");
      await expect(sectionDrawer).toBeVisible();
      const sectionBox = await sectionDrawer.boundingBox();
      const viewportBounds = await page.evaluate(() => ({
        layoutRight: Math.round(document.body.getBoundingClientRect().right),
        windowRight: Math.round(window.innerWidth),
      }));
      const sectionRight = Math.round((sectionBox?.x || 0) + (sectionBox?.width || 0));
      expect(sectionRight, `section drawer at ${viewport.width}px`).toBeGreaterThanOrEqual(
        viewportBounds.layoutRight
      );
      expect(sectionRight, `section drawer at ${viewport.width}px`).toBeLessThanOrEqual(
        viewportBounds.windowRight
      );
      await page.keyboard.press("Escape");
      await expect(sectionDrawer).toBeHidden();
    }
  });
});
