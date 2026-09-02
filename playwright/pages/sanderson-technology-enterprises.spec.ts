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

    await expect(
      page.getByRole("heading", { level: 1, name: "Sanderson Technology Enterprises" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Open website navigation" }).click();
    const websiteDialog = page.getByRole("dialog", { name: "Website Navigation" });
    await expect(websiteDialog).toBeVisible();
    await expect(
      websiteDialog.getByRole("navigation", { name: /primary navigation/i })
    ).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("renders the in-flow section navigation and drawer entries", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto(toUrl(STE_ROUTE));
    await page.waitForLoadState("networkidle");
    await stabilizePage(page, { theme: "dark" });

    await page.getByRole("button", { name: /open section navigation/i }).click();

    const sectionDialog = page.getByRole("dialog");
    await expect(sectionDialog.getByRole("navigation", { name: /on this page/i })).toBeVisible();
    await expect(
      sectionDialog.getByRole("button", { name: "Interface System", exact: true })
    ).toBeVisible();
    await expect(
      sectionDialog.getByRole("button", { name: "Salvage Yard", exact: true })
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
    ).toHaveAttribute(
      "href",
      "https://sanderson-technology-enterprises.github.io/interface-systems-lab/"
    );
    await expect(
      page.getByRole("link", { name: /view interface systems lab source/i })
    ).toHaveAttribute(
      "href",
      "https://github.com/Sanderson-Technology-Enterprises/interface-systems-lab"
    );
    await expect(
      page.getByRole("link", { name: /content creator platform product page/i })
    ).toHaveAttribute(
      "href",
      "https://sandersontechnologyenterprises.com/content-creator-platform.html"
    );
    await expect(
      page.getByRole("link", { name: /salvage yard system product page/i })
    ).toHaveAttribute("href", "https://sandersontechnologyenterprises.com/scrap-yard-system.html");

    const pageText = await page.locator("body").innerText();
    expect(pageText).toContain("Content Creator Platform");
    expect(pageText).toContain("Salvage Yard System");
    expect(pageText).toContain("practical white-label architecture");
    expect(pageText).toContain("internal inventory management system");
    expect(pageText).toContain("client-facing e-commerce platform");
    expect(pageText).toContain("complete v1");
    expect(pageText).toContain("first managed client");
    expect(pageText).toContain("September 5, 2026");
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
      "Salvage Yard System product demonstration",
    ]) {
      const video = page.getByLabel(label);
      await expect(video).toBeVisible();
      await expect(video).toHaveAttribute("controls", "");
      await expect(video).not.toHaveAttribute("autoplay", "");
      await expect(video.locator("source")).toHaveAttribute("src", /\.mp4$/u);
    }
  });

  test("keeps the STE logo inside a bounded native button surface", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await preparePageForStableTests(page, { theme: "dark" });

    await page.goto(toUrl(STE_ROUTE));
    await page.waitForLoadState("networkidle");
    await stabilizePage(page, { theme: "dark" });

    const trigger = page.getByRole("button", {
      name: "Sanderson Technology Enterprises logo preview",
    });
    const thumbnail = trigger.getByRole("img");
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveClass(/interactive-surface/u);

    const geometry = await thumbnail.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {
        tagName: element.tagName,
        width: rect.width,
        hasButtonAncestor: Boolean(element.closest("button")),
      };
    });

    expect(geometry.tagName).toBe("IMG");
    expect(geometry.hasButtonAncestor).toBe(true);
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
