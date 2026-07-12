/**
 * @file static-seo.mjs
 * @description Generates and validates route-specific static SEO shells for the Vite build.
 * @module scripts/seo/static-seo
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  SEO_ROUTE_REGISTRY,
  SITE_AUTHOR,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_THEME_COLOR,
  buildStructuredData,
  resolveRouteSeo,
} from "../../src/assets/data/seoRouteRegistry.js";

const SEO_START_MARKER = "<!-- seo:managed-start -->";
const SEO_END_MARKER = "<!-- seo:managed-end -->";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const serializeJsonLd = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");

/**
 * Build the complete managed head fragment for one resolved route.
 *
 * @param {object} routeSeo - Metadata returned by resolveRouteSeo.
 * @returns {string} HTML fragment enclosed by stable replacement markers.
 */
export function renderManagedSeoHead(routeSeo) {
  const structuredData = serializeJsonLd(buildStructuredData(routeSeo));
  const title = escapeHtml(routeSeo.title);
  const description = escapeHtml(routeSeo.description);
  const canonicalUrl = escapeHtml(routeSeo.canonicalUrl);
  const socialImageUrl = escapeHtml(routeSeo.socialImageUrl);

  return `${SEO_START_MARKER}
    <title data-rh="true">${title}</title>
    <meta name="description" content="${description}" data-rh="true" />
    <meta name="author" content="${escapeHtml(SITE_AUTHOR)}" data-rh="true" />
    <meta name="theme-color" content="${SITE_THEME_COLOR}" data-rh="true" />
    <meta name="robots" content="${escapeHtml(routeSeo.robots)}" data-rh="true" />
    <meta name="googlebot" content="${escapeHtml(routeSeo.robots)}" data-rh="true" />
    <meta name="referrer" content="strict-origin-when-cross-origin" data-rh="true" />
    <meta name="application-name" content="${escapeHtml(SITE_NAME)}" data-rh="true" />
    <meta property="og:locale" content="${SITE_LOCALE}" data-rh="true" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" data-rh="true" />
    <meta property="og:type" content="${escapeHtml(routeSeo.ogType)}" data-rh="true" />
    <meta property="og:title" content="${title}" data-rh="true" />
    <meta property="og:description" content="${description}" data-rh="true" />
    <meta property="og:url" content="${canonicalUrl}" data-rh="true" />
    <meta property="og:image" content="${socialImageUrl}" data-rh="true" />
    <meta property="og:image:secure_url" content="${socialImageUrl}" data-rh="true" />
    <meta property="og:image:type" content="image/png" data-rh="true" />
    <meta property="og:image:width" content="1200" data-rh="true" />
    <meta property="og:image:height" content="630" data-rh="true" />
    <meta property="og:image:alt" content="Kyle Foster portfolio social share card" data-rh="true" />
    <meta name="twitter:card" content="summary_large_image" data-rh="true" />
    <meta name="twitter:title" content="${title}" data-rh="true" />
    <meta name="twitter:description" content="${description}" data-rh="true" />
    <meta name="twitter:image" content="${socialImageUrl}" data-rh="true" />
    <link rel="canonical" href="${canonicalUrl}" data-rh="true" />
    <link rel="alternate" hreflang="${SITE_LANGUAGE}" href="${canonicalUrl}" data-rh="true" />
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" data-rh="true" />
    <link rel="me" href="https://github.com/Foscat" data-rh="true" />
    <link rel="me" href="https://www.linkedin.com/in/kylefoster-dev/" data-rh="true" />
    <script type="application/ld+json" data-rh="true">${structuredData}</script>
    ${SEO_END_MARKER}`;
}

/**
 * Replace the managed SEO region in a built Vite HTML shell.
 *
 * @param {string} template - Built index HTML containing SEO markers.
 * @param {object} routeSeo - Resolved route metadata.
 * @returns {string} Route-specific HTML shell.
 */
export function renderRouteHtml(template, routeSeo) {
  const start = template.indexOf(SEO_START_MARKER);
  const end = template.indexOf(SEO_END_MARKER);

  if (start < 0 || end < start) {
    throw new Error("Static SEO template is missing the managed head markers.");
  }

  const afterMarker = end + SEO_END_MARKER.length;
  return `${template.slice(0, start)}${renderManagedSeoHead(routeSeo)}${template.slice(afterMarker)}`;
}

/**
 * Generate a sitemap from the indexable routes in the shared registry.
 *
 * @param {Record<string, object>} registry - SEO route registry.
 * @param {string} siteOrigin - Canonical deployment origin.
 * @returns {string} Sitemap XML.
 */
export function createSitemapXml(registry, siteOrigin) {
  const origin = String(siteOrigin).replace(/\/+$/u, "");
  const entries = Object.values(registry)
    .filter((route) => route.indexable)
    .map(
      (route) => `  <url>
    <loc>${escapeHtml(`${origin}${route.path}`)}</loc>
    <lastmod>${route.lastModified}</lastmod>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

const routeArtifactPath = (distDir, routePath) =>
  routePath === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, routePath.replace(/^\/+|\/+$/gu, ""), "index.html");

/**
 * Write route shells, the noindex fallback, and the generated sitemap into `dist`.
 *
 * @param {{distDir: string, siteOrigin: string}} options - Generation options.
 * @returns {Promise<void>}
 */
export async function generateSeoArtifacts({ distDir, siteOrigin }) {
  const templatePath = path.join(distDir, "index.html");
  const template = await readFile(templatePath, "utf8");

  for (const route of Object.values(SEO_ROUTE_REGISTRY)) {
    const outputPath = routeArtifactPath(distDir, route.path);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, renderRouteHtml(template, resolveRouteSeo(route.path, siteOrigin)));
  }

  const notFoundSeo = resolveRouteSeo("/404", siteOrigin);
  await writeFile(path.join(distDir, "404.html"), renderRouteHtml(template, notFoundSeo));
  await writeFile(
    path.join(distDir, "sitemap.xml"),
    createSitemapXml(SEO_ROUTE_REGISTRY, siteOrigin)
  );
}

/**
 * Validate generated route shells without making network requests.
 *
 * @param {{distDir: string, siteOrigin: string}} options - Validation options.
 * @returns {Promise<void>}
 */
export async function validateSeoArtifacts({ distDir, siteOrigin }) {
  const errors = [];

  for (const route of Object.values(SEO_ROUTE_REGISTRY)) {
    const routeSeo = resolveRouteSeo(route.path, siteOrigin);
    const outputPath = routeArtifactPath(distDir, route.path);
    const html = await readFile(outputPath, "utf8");

    if (!html.includes(`<title data-rh="true">${escapeHtml(routeSeo.title)}</title>`)) {
      errors.push(`${route.path}: missing route title`);
    }
    if (!html.includes(`rel="canonical" href="${escapeHtml(routeSeo.canonicalUrl)}"`)) {
      errors.push(`${route.path}: missing canonical URL`);
    }
    if (!html.includes(`name="description" content="${escapeHtml(routeSeo.description)}"`)) {
      errors.push(`${route.path}: incorrect description`);
    }
    if (!html.includes(`name="robots" content="${escapeHtml(routeSeo.robots)}"`)) {
      errors.push(`${route.path}: incorrect robots directive`);
    }
    if (!html.includes(`property="og:url" content="${escapeHtml(routeSeo.canonicalUrl)}"`)) {
      errors.push(`${route.path}: incorrect Open Graph URL`);
    }
    if (!html.includes(`"url":"${routeSeo.canonicalUrl}"`)) {
      errors.push(`${route.path}: incorrect structured-data URL`);
    }
  }

  const notFoundHtml = await readFile(path.join(distDir, "404.html"), "utf8");
  if (!notFoundHtml.includes("noindex, nofollow")) {
    errors.push("404.html: fallback must be noindex");
  }

  const sitemap = await readFile(path.join(distDir, "sitemap.xml"), "utf8");
  const actualSitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/gu)].map((match) => match[1]);
  const expectedSitemapUrls = Object.values(SEO_ROUTE_REGISTRY)
    .filter((entry) => entry.indexable)
    .map((entry) => `${siteOrigin}${entry.path}`);
  if (JSON.stringify(actualSitemapUrls) !== JSON.stringify(expectedSitemapUrls)) {
    errors.push("sitemap.xml: entries must exactly match indexable registry routes");
  }

  if (errors.length > 0) {
    throw new Error(`Static SEO validation failed:\n- ${errors.join("\n- ")}`);
  }
}
