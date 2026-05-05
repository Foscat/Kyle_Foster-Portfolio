/**
 * @file index.jsx
 * @description Centralized document head manager responsible for injecting
 * SEO, metadata, and social sharing tags based on the current route.
 * @module components/Head
 */

import pageSummaryMetas from "assets/data/pageSummaryMetas";
import { Helmet } from "react-helmet-async";
import { PageRoute } from "types/navigation.types";

/**
 * Head
 * ---------------------------------------------------------------------------
 * Dynamically configures `<head>` metadata for each page in the application
 * using `react-helmet-async`.
 *
 * Responsibilities:
 * - Selects page-specific metadata based on the current URL path
 * - Injects SEO-relevant meta tags (title, description, keywords)
 * - Configures Open Graph metadata for social sharing
 * - Defines favicon, theme color, and canonical URL
 * - Adds performance-related tags (preconnect)
 *
 * Behavior:
 * - Determines the active page by inspecting `window.location.pathname`
 * - Falls back to the Home metadata when no route match is found
 *
 * Usage notes:
 * - Intended to be rendered once near the top of the app tree
 * - Requires `HelmetProvider` to be present higher in the component hierarchy
 *
 * @public
 * @component
 * @returns {JSX.Element} Injected document head metadata.
 */
export default function Head() {
  const currentPath = window.location.pathname;
  /**
   * Resolves page metadata based on the current URL path.
   *
   * @returns {Object} Page metadata object containing title and description.
   */
  const getMetaByPath = () => {
    switch (currentPath) {
      case PageRoute.HACKATHON:
        return pageSummaryMetas.Hackathon;
      case PageRoute.EDUCATION:
        return pageSummaryMetas.Smu;
      case PageRoute.SIDE_PROJECTS:
        return pageSummaryMetas.SideProjects;
      case PageRoute.PROFESSIONAL:
        return pageSummaryMetas.Codestream;
      case PageRoute.DOCS:
        return pageSummaryMetas.Docs;
      case PageRoute.CONTACT:
        return pageSummaryMetas.Contact;
      default:
        return pageSummaryMetas.Home;
    }
  };

  /**
   * @description Metadata for the currently active page. /
   */
  const currentPageMeta = getMetaByPath();
  const siteOrigin =
    (typeof import.meta.env.VITE_SITE_URL === "string" &&
      import.meta.env.VITE_SITE_URL.trim().replace(/\/$/, "")) ||
    window.location.origin;
  const canonicalUrl = `${siteOrigin}${currentPath}`;
  const socialImageUrl = `${siteOrigin}/social-share-card.png`;
  const homeUrl = `${siteOrigin}${PageRoute.HOME}`;
  const personId = `${siteOrigin}/#person`;
  const websiteId = `${siteOrigin}/#website`;
  const isHomePage = currentPath === PageRoute.HOME;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: homeUrl,
        name: "Kyle Foster Portfolio",
        description: pageSummaryMetas.Home.description,
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Kyle Foster",
        url: homeUrl,
        image: `${siteOrigin}/portfolio-icon.jpg`,
        jobTitle: "Senior React / Frontend Engineer",
        description: pageSummaryMetas.Home.description,
        email: "mailto:fosterkyle6456@gmail.com",
        sameAs: ["https://www.linkedin.com/in/kylefoster-dev", "https://github.com/Foscat"],
      },
      ...(isHomePage
        ? [
            {
              "@type": "ProfilePage",
              "@id": `${canonicalUrl}#profile-page`,
              url: canonicalUrl,
              name: "Kyle Foster",
              description: pageSummaryMetas.Home.description,
              isPartOf: {
                "@id": websiteId,
              },
              mainEntity: {
                "@id": personId,
              },
            },
          ]
        : []),
    ],
  };

  return (
    <Helmet>
      {/* ===========================================================
        🌐 META INFORMATION — Kyle Foster Portfolio
        Optimized for SEO, accessibility, and social sharing.
        =========================================================== */}
      {/* Character encoding */}
      <meta charSet="UTF-8" />
      {/* Mobile viewport optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Keywords (SEO hint, though less relevant for modern search) */}
      <meta
        name="keywords"
        content="Kyle Foster, Senior React / Frontend Engineer, React frontend architecture, UI systems engineering, JavaScript, Portfolio"
      />
      {/* Author information */}
      <meta name="author" content="Kyle Foster" />
      {/* Theme color for browsers (mobile + desktop UI accent) */}
      <meta name="theme-color" content="#1f2793" />

      {/* ===========================================================
        📱 SOCIAL SHARING (Open Graph)
        =========================================================== */}
      <title>{currentPageMeta.title}</title>
      <meta name="description" content={currentPageMeta.description} />
      <meta property="og:title" content={currentPageMeta.title} />
      <meta property="og:description" content={currentPageMeta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Kyle Foster Portfolio" />
      <meta property="og:image" content={socialImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Kyle Foster portfolio social share card" />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentPageMeta.title} />
      <meta name="twitter:description" content={currentPageMeta.description} />
      <meta name="twitter:image" content={socialImageUrl} />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      {/* ===========================================================
        ⚙️ PERFORMANCE & SEO EXTRAS
        =========================================================== */}
      {/* Preconnect to Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      {/* Robots directive */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}
