/**
 * @file playwright/accessibility.routes.spec.ts
 * @description WCAG 2.2 AA regression coverage for every public portfolio route.
 * @module playwright/accessibility.routes.spec
 */

import AxeBuilder from "@axe-core/playwright";
import { test, expect, type Page } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

type RouteAccessibilityCase = {
  route: string;
  name: string;
};

type UndersizedTarget = {
  label: string;
  selector: string;
  width: number;
  height: number;
};

const ROUTE_CASES: RouteAccessibilityCase[] = [
  { route: "/", name: "Home" },
  { route: "/codestream", name: "CodeStream" },
  { route: "/sanderson-technology-enterprises", name: "STE Work" },
  { route: "/interface-system", name: "Interface System" },
  { route: "/side-projects", name: "Side Projects" },
  { route: "/hackathon", name: "Hackathon" },
  { route: "/smu", name: "Education" },
  { route: "/contact", name: "Contact" },
  { route: "/docs", name: "Docs" },
];

const formatViolations = (
  violations: Array<{ id: string; impact?: string | null; nodes: { target: string[] }[] }>
) =>
  violations
    .map((item) => `${item.id} [${item.impact ?? "unknown"}] nodes=${item.nodes.length}`)
    .join(", ");

async function runAxeScan(page: Page) {
  return new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
}

/**
 * Check WCAG 2.2 target dimensions for controls where the inline-text exception
 * does not apply. This complements axe while keeping prose links exempt.
 *
 * @param page - Active portfolio page to inspect.
 * @returns Controls that do not meet the minimum target dimensions.
 */
async function findUndersizedTargets(page: Page): Promise<UndersizedTarget[]> {
  return page
    .locator("button, input:not([type='hidden']), select, textarea, [role='button'], nav a, a.btn")
    .evaluateAll((elements) =>
      elements.flatMap((element) => {
        if (!(element instanceof HTMLElement)) return [];

        const style = window.getComputedStyle(element);
        const bounds = element.getBoundingClientRect();
        const isVisible =
          style.visibility !== "hidden" &&
          style.display !== "none" &&
          bounds.width > 0 &&
          bounds.height > 0;
        if (!isVisible || element.matches(":disabled, [aria-disabled='true']")) return [];
        if (bounds.width >= 24 && bounds.height >= 24) return [];

        return [
          {
            label:
              element.getAttribute("aria-label") ||
              element.textContent?.trim().slice(0, 80) ||
              element.tagName.toLowerCase(),
            selector: element.id
              ? `#${element.id}`
              : String(element.className || element.tagName.toLowerCase()),
            width: Math.round(bounds.width * 10) / 10,
            height: Math.round(bounds.height * 10) / 10,
          },
        ];
      })
    );
}

test.describe("Accessibility route scans @a11y", () => {
  for (const routeCase of ROUTE_CASES) {
    test(`${routeCase.name} route meets the WCAG 2.2 AA regression gate @a11y`, async ({
      page,
    }) => {
      test.setTimeout(45_000);

      await page.setViewportSize({ width: 1280, height: 720 });
      await preparePageForStableTests(page, { theme: "light" });
      await page.goto(routeCase.route);
      await stabilizePage(page, { theme: "light" });

      const results = await runAxeScan(page);
      const blockingViolations = results.violations.filter(
        (violation) => violation.impact === "critical" || violation.impact === "serious"
      );

      expect(
        blockingViolations,
        `Serious and critical axe violations must be zero on ${routeCase.route}. Found: ${formatViolations(blockingViolations)}`
      ).toEqual([]);

      await expect(
        page.locator("main"),
        `${routeCase.route} must expose exactly one main landmark.`
      ).toHaveCount(1);
      await expect(
        page.getByRole("heading", { level: 1 }),
        `${routeCase.route} must expose exactly one page heading.`
      ).toHaveCount(1);

      const undersizedTargets = await findUndersizedTargets(page);
      expect(
        undersizedTargets,
        `WCAG 2.2 target-size failures on ${routeCase.route}: ${JSON.stringify(undersizedTargets)}`
      ).toEqual([]);
    });
  }

  test("home mobile layout meets WCAG 2.2 AA without horizontal overflow @a11y", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 426, height: 923 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto("/");
    await stabilizePage(page, { theme: "dark" });

    const results = await runAxeScan(page);
    const blockingViolations = results.violations.filter(
      (violation) => violation.impact === "critical" || violation.impact === "serious"
    );

    expect(
      blockingViolations,
      `Serious and critical mobile axe violations must be zero. Found: ${formatViolations(blockingViolations)}`
    ).toEqual([]);
    expect(await findUndersizedTargets(page)).toEqual([]);

    const viewportMetrics = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(viewportMetrics.scrollWidth).toBeLessThanOrEqual(viewportMetrics.clientWidth);
  });

  test("keyboard users can skip persistent navigation and reach routed content @a11y", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto("/");
    await stabilizePage(page, { theme: "dark" });

    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await page.keyboard.press("Tab");
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
    await skipLink.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
  });
});
