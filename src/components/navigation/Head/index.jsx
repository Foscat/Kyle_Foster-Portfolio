/**
 * @file index.jsx
 * @description Route-aware document metadata manager backed by the shared SEO registry.
 * @module components/navigation/Head
 */

import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import {
  SITE_AUTHOR,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_THEME_COLOR,
  buildStructuredData,
  resolveRouteSeo,
} from "assets/data/seoRouteRegistry.js";

/**
 * Render canonical, crawler, social, and structured metadata for the current route.
 * Static build tooling uses the same registry and structured-data builder so raw HTML
 * and hydrated React metadata remain identical.
 *
 * @returns {JSX.Element} Helmet-managed route metadata.
 */
export default function Head() {
  const location = useLocation();
  const configuredOrigin =
    typeof import.meta.env.VITE_SITE_URL === "string" ? import.meta.env.VITE_SITE_URL : "";
  const siteOrigin = configuredOrigin.trim() || window.location.origin;
  const routeSeo = resolveRouteSeo(location.pathname, siteOrigin);
  const structuredData = buildStructuredData(routeSeo);

  return (
    <Helmet>
      <html lang={SITE_LANGUAGE} />
      <title>{routeSeo.title}</title>

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={routeSeo.description} />
      <meta name="author" content={SITE_AUTHOR} />
      <meta name="theme-color" content={SITE_THEME_COLOR} />
      <meta name="robots" content={routeSeo.robots} />
      <meta name="googlebot" content={routeSeo.robots} />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no, address=no, email=no" />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />

      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={routeSeo.ogType} />
      <meta property="og:title" content={routeSeo.title} />
      <meta property="og:description" content={routeSeo.description} />
      <meta property="og:url" content={routeSeo.canonicalUrl} />
      <meta property="og:image" content={routeSeo.socialImageUrl} />
      <meta property="og:image:secure_url" content={routeSeo.socialImageUrl} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Kyle Foster portfolio social share card" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={routeSeo.title} />
      <meta name="twitter:description" content={routeSeo.description} />
      <meta name="twitter:image" content={routeSeo.socialImageUrl} />

      <link rel="canonical" href={routeSeo.canonicalUrl} />
      <link rel="alternate" hrefLang="en-US" href={routeSeo.canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={routeSeo.canonicalUrl} />
      <link rel="me" href="https://github.com/Foscat" />
      <link rel="me" href="https://www.linkedin.com/in/kylefoster-dev/" />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
