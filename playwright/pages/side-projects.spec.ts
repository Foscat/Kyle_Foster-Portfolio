/**
 * @file playwright\pages\side-projects.spec.ts
 * @description playwright\pages\side-projects.spec module.
 * @module playwright\pages\side-projects.spec
 */

import { createPageTestSuite } from "../utils/pageTestTemplate.ts";
import { expect, test } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "../utils/stabilizePage";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const SIDE_PROJECTS_ROUTE = "/side-projects";
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

createPageTestSuite({
  name: "Side Projects page",
  route: SIDE_PROJECTS_ROUTE,
});

test.describe("Side Projects links", () => {
  test("section navigation targets and Layout Style CSS links resolve to the right positions", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto(toUrl(SIDE_PROJECTS_ROUTE));
    await page.waitForLoadState("networkidle");
    await stabilizePage(page, { theme: "dark" });

    const missingTargets = await page
      .locator('nav[aria-label="Section navigation"] [data-nav-id]')
      .evaluateAll((items) => {
        const ids = [...new Set(items.map((item) => item.getAttribute("data-nav-id")))].filter(
          Boolean
        );

        return ids.filter((id) => !document.getElementById(id));
      });

    expect(missingTargets).toEqual([]);

    await page
      .getByRole("navigation", { name: /section navigation/i })
      .getByRole("button", {
        name: "Layout Style CSS",
        exact: true,
      })
      .click();

    await expect.poll(() => new URL(page.url()).hash).toBe("#layout-style-css");
    await expect(page.locator("#layout-style-css")).toBeVisible();

    const layoutSection = page.locator("#layout-style-css");
    await expect(
      layoutSection.locator(".info-title", { hasText: "Layout Style CSS" })
    ).toBeVisible();
    await expect(
      layoutSection.getByRole("link", { name: /repository on github/i })
    ).toHaveAttribute("href", "https://github.com/Foscat/layout-style-css");
    await expect(layoutSection.getByRole("link", { name: /package on npm/i })).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/layout-style-css"
    );
    await expect(layoutSection.getByRole("link", { name: /documentation site/i })).toHaveAttribute(
      "href",
      "https://foscat.github.io/Layout-Style-CSS/"
    );
    await expect(layoutSection.getByRole("link", { name: /demo site/i })).toHaveAttribute(
      "href",
      "https://foscat.github.io/Layout-Style-CSS/"
    );
  });

  test("centers the Layout Style CSS insight-card orphan in a two-column row", async ({ page }) => {
    await page.setViewportSize({ width: 1128, height: 960 });
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto(toUrl(SIDE_PROJECTS_ROUTE));
    await page.waitForLoadState("networkidle");
    await stabilizePage(page, { theme: "dark" });

    const takeaways = page.locator("#layout-style-takeaways");
    await takeaways.scrollIntoViewIfNeeded();

    const grid = takeaways.locator(".card-grid");
    await expect(grid).toHaveAttribute("data-card-count", "3");
    await expect(grid).toHaveClass(/card-grid--center-orphan/u);

    // Bounding boxes verify the visual row balance that CSS selectors alone cannot prove.
    const metrics = await grid.evaluate((element) => {
      const gridRect = element.getBoundingClientRect();
      const cards = Array.from(element.querySelectorAll(".insight-card")).map((card) => {
        const rect = card.getBoundingClientRect();
        return {
          centerX: rect.left + rect.width / 2,
          top: rect.top,
          width: rect.width,
        };
      });

      return {
        cards,
        gridCenterX: gridRect.left + gridRect.width / 2,
      };
    });

    expect(metrics.cards).toHaveLength(3);
    const [firstCard, secondCard, orphanCard] = metrics.cards;

    expect(Math.abs(firstCard.top - secondCard.top)).toBeLessThan(4);
    expect(orphanCard.top).toBeGreaterThan(firstCard.top + 20);
    expect(Math.abs(orphanCard.centerX - metrics.gridCenterX)).toBeLessThan(8);
    expect(Math.abs(orphanCard.width - firstCard.width)).toBeLessThan(8);
  });
});
