/**
 * @file playwright\pages\docs.spec.ts
 * @description playwright\pages\docs.spec module.
 * @module playwright\pages\docs.spec
 */

import { expect, test } from "@playwright/test";

import { createPageTestSuite } from "../utils/pageTestTemplate.ts";
import { preparePageForStableTests, stabilizePage } from "../utils/stabilizePage";

const DOCS_ROUTE = "/docs";

function parseRgb(value: string) {
  const match = value.match(/rgba?\(([^)]+)\)/u);
  if (!match) return null;

  const [r, g, b] = match[1]
    .replace(/\//gu, " ")
    .split(/[,\s]+/u)
    .filter(Boolean)
    .map(Number.parseFloat);

  if (![r, g, b].every(Number.isFinite)) return null;
  return { r, g, b };
}

function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  const channels = [r, g, b].map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

createPageTestSuite({
  name: "Docs page",
  route: DOCS_ROUTE,
});

test.describe("Docs active cards", () => {
  test("keeps the selected documentation jump-card heading readable", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto(DOCS_ROUTE);
    await page.waitForLoadState("networkidle");
    await stabilizePage(page, { theme: "dark" });

    const block = page.locator("#docs-reference-components");
    await block.scrollIntoViewIfNeeded();

    const activeCard = block.locator('.markdown-docs-block__jump-button[aria-pressed="true"]');
    await expect(activeCard.first()).toBeVisible();
    await expect(activeCard.first()).toHaveAttribute("data-surface-variant", "primary");

    // Luminance guards against the screenshot regression where the active title resolved to black.
    const activeTitleColor = await activeCard
      .first()
      .locator("span")
      .first()
      .evaluate((element) => {
        return window.getComputedStyle(element).color;
      });
    const activeTitleRgb = parseRgb(activeTitleColor);

    expect(activeTitleRgb).not.toBeNull();
    expect(relativeLuminance(activeTitleRgb!)).toBeGreaterThan(0.45);
  });
});
