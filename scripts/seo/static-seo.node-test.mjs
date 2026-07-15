/**
 * @file static-seo.node-test.mjs
 * @description Node-level tests for static route SEO artifact generation.
 * @module scripts/seo/static-seo.node-test
 */

import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { PageRoute } from "../../src/types/navigation.types.js";
import {
  SEO_ROUTE_REGISTRY,
  buildStructuredData,
  resolveRouteSeo,
} from "../../src/assets/data/seoRouteRegistry.js";
import {
  createSitemapXml,
  generateSeoArtifacts,
  renderRouteHtml,
  validateSeoArtifacts,
} from "./static-seo.mjs";

const SITE_ORIGIN = "https://kyle-foster.com";
const TEMPLATE = `<!doctype html>
<html lang="en">
  <head>
    <!-- seo:managed-start -->
    <title>Placeholder</title>
    <!-- seo:managed-end -->
  </head>
  <body><div id="root"></div><script type="module" src="/assets/app.js"></script></body>
</html>`;

test("renderRouteHtml writes route-specific canonical and crawler metadata", () => {
  const contact = resolveRouteSeo(PageRoute.CONTACT, SITE_ORIGIN);
  const html = renderRouteHtml(TEMPLATE, contact);

  assert.match(html, /<title[^>]*>Contact Kyle Foster/u);
  assert.match(html, /<link rel="canonical" href="https:\/\/kyle-foster\.com\/contact"/u);
  assert.match(html, /<meta property="og:url" content="https:\/\/kyle-foster\.com\/contact"/u);
  assert.match(html, /<script type="application\/ld\+json"[^>]*>/u);
  assert.doesNotMatch(html, /name="keywords"/u);
});

test("createSitemapXml includes only indexable registry routes", () => {
  const sitemap = createSitemapXml(SEO_ROUTE_REGISTRY, SITE_ORIGIN);

  assert.match(sitemap, /<loc>https:\/\/kyle-foster\.com\/side-projects<\/loc>/u);
  assert.match(sitemap, /<lastmod>2026-07-12<\/lastmod>/u);
  assert.doesNotMatch(sitemap, /\/health/u);
});

test("source home metadata stays synchronized with the registry", async () => {
  const sourceHtml = await readFile(path.resolve("index.html"), "utf8");
  const home = resolveRouteSeo(PageRoute.HOME, SITE_ORIGIN);

  assert.match(sourceHtml, new RegExp(`<title[^>]*>${home.title}</title>`, "u"));
  assert.ok(sourceHtml.includes(`content="${home.description}"`));
  assert.ok(sourceHtml.includes(`rel="canonical" href="${home.canonicalUrl}"`));
  assert.doesNotMatch(sourceHtml, /name="keywords"/u);

  const sourceJsonLd = sourceHtml.match(
    /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/u
  );
  assert.ok(sourceJsonLd);
  assert.deepEqual(JSON.parse(sourceJsonLd[1]), buildStructuredData(home));
});

test("Render routes known paths to static shells without rewriting unknown paths", async () => {
  const renderConfig = await readFile(path.resolve("render.yaml"), "utf8");

  assert.match(renderConfig, /source: \/\s+destination: \/index\.html/u);
  for (const route of Object.values(SEO_ROUTE_REGISTRY)) {
    if (route.path === PageRoute.HOME) continue;
    assert.ok(renderConfig.includes(`source: ${route.path}`));
    assert.ok(renderConfig.includes(`destination: ${route.path}/index.html`));
  }
  assert.doesNotMatch(renderConfig, /source: \/\*\s+destination: \/404\.html/u);
});

test("generateSeoArtifacts creates indexable, health, and noindex fallback shells", async () => {
  const distDir = await mkdtemp(path.join(os.tmpdir(), "portfolio-seo-"));

  try {
    await writeFile(path.join(distDir, "index.html"), TEMPLATE, "utf8");
    await generateSeoArtifacts({ distDir, siteOrigin: SITE_ORIGIN });

    const homeHtml = await readFile(path.join(distDir, "index.html"), "utf8");
    const contactHtml = await readFile(path.join(distDir, "contact", "index.html"), "utf8");
    const healthHtml = await readFile(path.join(distDir, "health", "index.html"), "utf8");
    const notFoundHtml = await readFile(path.join(distDir, "404.html"), "utf8");

    assert.match(homeHtml, /href="https:\/\/kyle-foster\.com\/"/u);
    assert.match(contactHtml, /href="https:\/\/kyle-foster\.com\/contact"/u);
    assert.match(contactHtml, /name="description"/u);
    assert.match(contactHtml, /"url":"https:\/\/kyle-foster\.com\/contact"/u);
    assert.match(healthHtml, /noindex, nofollow/u);
    assert.match(notFoundHtml, /Page Not Found/u);
    assert.match(notFoundHtml, /noindex, nofollow/u);
    await assert.doesNotReject(() => validateSeoArtifacts({ distDir, siteOrigin: SITE_ORIGIN }));
  } finally {
    await rm(distDir, { recursive: true, force: true });
  }
});
