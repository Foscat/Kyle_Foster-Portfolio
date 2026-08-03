/**
 * @file playwright/pages/sanderson-technology-enterprises.spec.ts
 * @description Browser coverage for the Sanderson Technology Enterprises page.
 * @module playwright/pages/sanderson-technology-enterprises.spec
 */

import { expect, test } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "../utils/stabilizePage";
import { waitForMermaidRender } from "../utils/waitForMermaid";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const STE_ROUTE = "/sanderson-technology-enterprises";
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

test.describe("Sanderson Technology Enterprises content", () => {
  test("renders core layout regions", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto(toUrl(STE_ROUTE));
    await page.waitForLoadState("networkidle");
    await stabilizePage(page, { theme: "dark" });

    await expect(page.locator('[role="banner"]')).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("renders sticky section navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto(toUrl(STE_ROUTE));
    await page.waitForLoadState("networkidle");
    await stabilizePage(page, { theme: "dark" });

    await expect(page.locator('nav[aria-label="Section navigation"]')).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: /section navigation/i })
        .getByRole("button", { name: "Interface System", exact: true })
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: /section navigation/i })
        .getByRole("button", { name: "Scrap Yard", exact: true })
    ).toBeVisible();
  });

  test("renders public links and does not expose private resources", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto(toUrl(STE_ROUTE));
    await page.waitForLoadState("networkidle");
    await stabilizePage(page, { theme: "dark" });

    await expect(
      page.getByRole("heading", { level: 1, name: "Sanderson Technology Enterprises" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /visit ste website/i })).toHaveAttribute(
      "href",
      "https://sandersontechnologyenterprises.com/"
    );
    await expect(page.getByRole("link", { name: /view layout style css/i })).toHaveAttribute(
      "href",
      "/side-projects#layout-style-css"
    );
    await expect(
      page.getByRole("link", { name: "View Interface Systems Lab", exact: true })
    ).toHaveAttribute("href", "https://foscat.github.io/interface-systems-lab/");
    await expect(
      page.getByRole("link", { name: /content creator platform product page/i })
    ).toHaveAttribute(
      "href",
      "https://sandersontechnologyenterprises.com/content-creator-platform.html"
    );
    await expect(
      page.getByRole("link", { name: /scrap yard system product page/i })
    ).toHaveAttribute("href", "https://sandersontechnologyenterprises.com/scrap-yard-system.html");

    const pageText = await page.locator("body").innerText();
    expect(pageText).toContain("Content Creator Platform");
    expect(pageText).toContain("Scrap Yard System");
    expect(pageText).toContain("practical white-label architecture");
    expect(pageText).toContain("internal inventory management system");
    expect(pageText).toContain("client-facing e-commerce platform");
    expect(pageText).toContain("early-stage");
    expect(pageText).not.toMatch(/golden\s+goose|notion|docs\.notion|secret|token|private repo/iu);
    await expect(page.locator('a[href*="notion"]')).toHaveCount(0);
    await expect(page.locator('a[href*="Golden"]')).toHaveCount(0);
  });

  test("renders controlled local videos for both focused products", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto(toUrl(STE_ROUTE));
    await page.waitForLoadState("networkidle");
    await stabilizePage(page, { theme: "dark" });

    for (const label of [
      "Content Creator Platform product demonstration",
      "Scrap Yard System product demonstration",
    ]) {
      const video = page.getByLabel(label);
      await expect(video).toBeVisible();
      await expect(video).toHaveAttribute("controls", "");
      await expect(video).not.toHaveAttribute("autoplay", "");
      await expect(video.locator("source")).toHaveAttribute("src", /\.mp4$/u);
    }
  });

  test("keeps the STE logo as a bounded image trigger without a button surface", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto(toUrl(STE_ROUTE));
    await page.waitForLoadState("networkidle");
    await stabilizePage(page, { theme: "dark" });

    const thumbnail = page.getByLabel("Sanderson Technology Enterprises logo preview");
    await expect(thumbnail).toBeVisible();

    const geometry = await thumbnail.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {
        tagName: element.tagName,
        width: rect.width,
        hasButtonAncestor: Boolean(element.closest("button")),
      };
    });

    expect(geometry.tagName).toBe("IMG");
    expect(geometry.hasButtonAncestor).toBe(false);
    expect(geometry.width).toBeLessThanOrEqual(480);
  });

  test("renders the STE Mermaid diagrams on desktop and mobile", async ({ page }) => {
    test.setTimeout(120_000);

    const diagramIds = [
      "diagram-ste-public-site-journey",
      "diagram-ste-content-creator-platform-flow",
      "diagram-ste-scrapyard-commerce-loop",
      "diagram-ste-interface-system-flow",
    ];

    for (const viewport of [
      { width: 1280, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await preparePageForStableTests(page, { theme: "dark" });
      await page.goto(toUrl(STE_ROUTE));
      await page.waitForLoadState("networkidle");
      await stabilizePage(page, { theme: "dark" });

      for (const diagramId of diagramIds) {
        await waitForMermaidRender(page, diagramId);
      }
    }
  });
});
