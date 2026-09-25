/**
 * @file playwright/internal-region-overflow.spec.ts
 * @description Browser regressions for internally scrollable and positioned mobile regions.
 * @module playwright/internal-region-overflow
 */

import { expect, test, type Locator, type Page } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

type RegionMetric = {
  label: string;
  left: number;
  right: number;
  clientWidth: number;
  scrollWidth: number;
  clientHeight: number;
  scrollHeight: number;
  overflowX: string;
  overflowY: string;
};

/**
 * Measure visible regions without confusing a deliberately scrollable child with
 * whole-page overflow.
 *
 * @param locator - Candidate internal regions.
 * @param label - Diagnostic category included in failure output.
 * @returns Geometry and overflow behavior for visible matching regions.
 */
async function measureVisibleRegions(locator: Locator, label: string): Promise<RegionMetric[]> {
  return locator.evaluateAll(
    (elements, regionLabel) =>
      elements.flatMap((element, index) => {
        if (!(element instanceof HTMLElement)) return [];

        const style = window.getComputedStyle(element);
        const bounds = element.getBoundingClientRect();
        const isVisible =
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          bounds.width > 0 &&
          bounds.height > 0;
        if (!isVisible) return [];

        return [
          {
            label: `${regionLabel}[${index}]`,
            left: bounds.left,
            right: bounds.right,
            clientWidth: element.clientWidth,
            scrollWidth: element.scrollWidth,
            clientHeight: element.clientHeight,
            scrollHeight: element.scrollHeight,
            overflowX: style.overflowX,
            overflowY: style.overflowY,
          },
        ];
      }),
    label
  );
}

/**
 * Assert that visible internal regions remain reachable and expose any clipped
 * content through a usable scroll axis.
 *
 * @param page - Active browser page.
 * @param selector - Selector for one internal-region category.
 * @param label - Human-readable category name.
 * @param options - Category-specific coverage requirements.
 * @param options.required - Require at least one visible match.
 * @param options.scrollable - Require overflowing content to use auto/scroll.
 * @returns Measured visible regions for follow-up assertions.
 */
async function expectUsableInternalRegions(
  page: Page,
  selector: string,
  label: string,
  options: { required?: boolean; scrollable?: boolean } = {}
): Promise<RegionMetric[]> {
  const metrics = await measureVisibleRegions(page.locator(selector), label);
  const viewportWidth = page.viewportSize()?.width ?? 0;

  if (options.required) {
    expect(metrics.length, `${label} must render at least one visible region`).toBeGreaterThan(0);
  }

  for (const metric of metrics) {
    expect(
      metric.left,
      `${metric.label} must not escape the viewport on the left`
    ).toBeGreaterThanOrEqual(-1);
    expect(
      metric.right,
      `${metric.label} must not escape the viewport on the right`
    ).toBeLessThanOrEqual(viewportWidth + 1);

    if (options.scrollable && metric.scrollWidth > metric.clientWidth + 1) {
      expect(
        metric.overflowX,
        `${metric.label} horizontally overflows but has no usable horizontal scroll axis`
      ).toMatch(/^(auto|scroll)$/u);
    }

    if (options.scrollable && metric.scrollHeight > metric.clientHeight + 1) {
      expect(
        metric.overflowY,
        `${metric.label} vertically overflows but has no usable vertical scroll axis`
      ).toMatch(/^(auto|scroll)$/u);
    }
  }

  return metrics;
}

test("426x923 internal regions stay reachable without leaking document overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 426, height: 923 });
  await preparePageForStableTests(page, { theme: "light" });
  await page.goto("/docs");
  await stabilizePage(page, { theme: "light" });

  await expectUsableInternalRegions(page, ".markdown-renderer__table-wrap", "bounded tables", {
    required: true,
    scrollable: true,
  });
  await expectUsableInternalRegions(
    page,
    "pre, .code-block, .markdown-renderer__code-block",
    "preformatted code",
    { required: true, scrollable: true }
  );
  await expectUsableInternalRegions(
    page,
    ".unified-navigation, .route-section-nav, .back-to-top",
    "positioned controls",
    { required: true }
  );
  // The current routes have no reel/carousel widget; any future instance is still
  // measured by this regression instead of silently relying on page scrollWidth.
  await expectUsableInternalRegions(
    page,
    "[class*='reel' i], [class*='carousel' i]",
    "reels and carousels",
    { scrollable: true }
  );

  const websiteTrigger = page.getByRole("button", { name: "Open website navigation" }).first();
  await websiteTrigger.click();
  const websiteDrawer = page.locator(".mobile-nav-drawer:not(.mobile-section-nav-drawer)");
  await expect(websiteDrawer).toBeVisible();
  await expectUsableInternalRegions(
    page,
    ".mobile-nav-drawer:not(.mobile-section-nav-drawer)",
    "website navigation drawer",
    { required: true }
  );
  await expectUsableInternalRegions(
    page,
    ".mobile-nav-drawer:not(.mobile-section-nav-drawer) .native-dialog__body",
    "website navigation scroll region",
    { required: true, scrollable: true }
  );

  await websiteDrawer.getByRole("button", { name: /open color settings/i }).click();
  const colorDialog = page.getByRole("dialog", { name: /color settings/i });
  await expect(colorDialog).toBeVisible();
  await expectUsableInternalRegions(page, ".color-modal", "settings dialog", { required: true });
  await expectUsableInternalRegions(
    page,
    ".color-modal .native-dialog__body",
    "settings dialog scroll region",
    { required: true, scrollable: true }
  );
  await page.keyboard.press("Escape");
  await expect(colorDialog).toBeHidden();

  const sectionTrigger = page.getByRole("button", { name: /open section navigation/i });
  await sectionTrigger.click();
  const sectionDrawer = page.locator(".mobile-section-nav-drawer");
  await expect(sectionDrawer).toBeVisible();
  await expectUsableInternalRegions(
    page,
    ".mobile-section-nav-drawer",
    "section navigation drawer",
    { required: true }
  );
  await expectUsableInternalRegions(
    page,
    ".mobile-section-nav-drawer .native-dialog__body",
    "section navigation scroll region",
    { required: true, scrollable: true }
  );
  await page.keyboard.press("Escape");

  await page.goto("/contact");
  await stabilizePage(page, { theme: "light" });
  await page.getByRole("button", { name: /preview resume/i }).click();
  await expect(page.locator(".resume-preview__viewport")).toBeVisible();
  await expectUsableInternalRegions(page, ".resume-preview-modal", "resume dialog", {
    required: true,
  });
  await expectUsableInternalRegions(
    page,
    ".resume-preview-modal .native-dialog__body, .resume-preview__viewport",
    "resume scroll regions",
    { required: true, scrollable: true }
  );
  await page.keyboard.press("Escape");

  const numberInput = page.locator("input[type='number']").first();
  await expect(numberInput).toBeVisible();
  const numberTarget = await numberInput.boundingBox();
  expect(numberTarget).not.toBeNull();
  expect(
    numberTarget!.width,
    "number stepper must retain a usable pointer target"
  ).toBeGreaterThanOrEqual(24);
  expect(
    numberTarget!.height,
    "number stepper must retain a usable pointer target"
  ).toBeGreaterThanOrEqual(24);

  const documentOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(documentOverflow).toBeLessThanOrEqual(1);
});
