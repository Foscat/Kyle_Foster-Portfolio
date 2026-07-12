/**
 * @file seo.routes.spec.ts
 * @description Rendered route checks for metadata parity at desktop and mobile widths.
 * @module playwright/seo.routes.spec
 */

import { expect, test } from "@playwright/test";
import { SEO_ROUTE_REGISTRY } from "../src/assets/data/seoRouteRegistry.js";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const SITE_ORIGIN = new URL(BASE_URL).origin;
const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
] as const;

for (const viewport of VIEWPORTS) {
  test(`keeps rendered SEO metadata synchronized across public routes at ${viewport.name} width`, async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await page.setViewportSize(viewport);

    for (const route of Object.values(SEO_ROUTE_REGISTRY)) {
      const pageErrors: string[] = [];
      const onPageError = (error: Error) => pageErrors.push(String(error));
      page.on("pageerror", onPageError);

      await page.goto(new URL(route.path, BASE_URL).toString(), { waitUntil: "networkidle" });

      await expect(page.locator("#root > *").first()).toBeVisible();
      await expect(page).toHaveTitle(route.title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${SITE_ORIGIN}${route.path}`
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        route.indexable ? /^index, follow/u : /^noindex, nofollow/u
      );
      await expect(page.locator("vite-error-overlay")).toHaveCount(0);

      const structuredData = JSON.parse(
        (await page.locator('script[type="application/ld+json"]').textContent()) || "{}"
      );
      expect(JSON.stringify(structuredData)).toContain(`${SITE_ORIGIN}${route.path}`);
      expect(pageErrors, `${route.path} page errors`).toEqual([]);
      page.off("pageerror", onPageError);
    }
  });
}

test("isolates externally opened content links from the portfolio window", async ({ page }) => {
  await page.goto(new URL("/side-projects", BASE_URL).toString(), { waitUntil: "networkidle" });

  const externalLinks = page.locator('.links-block-list a[href^="http"]');
  expect(await externalLinks.count()).toBeGreaterThan(0);

  for (const link of await externalLinks.all()) {
    if ((await link.getAttribute("target")) === "_self") continue;
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /\bnoopener\b.*\bnoreferrer\b/u);
  }
});

test("updates metadata during client-side navigation", async ({ page }) => {
  await page.goto(new URL("/", BASE_URL).toString(), { waitUntil: "networkidle" });
  await page.evaluate(() => {
    (window as typeof window & { __seoSpaMarker?: boolean }).__seoSpaMarker = true;
  });

  await page.locator('a[href="/contact"]:visible').first().click();

  await expect(page).toHaveURL(/\/contact$/u);
  await expect(page).toHaveTitle(SEO_ROUTE_REGISTRY["/contact"].title);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${SITE_ORIGIN}/contact`
  );
  expect(
    await page.evaluate(
      () => (window as typeof window & { __seoSpaMarker?: boolean }).__seoSpaMarker
    )
  ).toBe(true);
});
