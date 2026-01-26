import PageMetas from "assets/data/pageMetas";
import { Helmet } from "react-helmet-async";

/**
 * @file index.jsx
 * @description Centralized document head manager responsible for injecting
 * SEO, metadata, and social sharing tags based on the current route.
 * @module components/Head
 */

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
  /**
   * Resolves page metadata based on the current URL path.
   *
   * @returns {Object} Page metadata object containing title and description.
   */
  const getMetaByPath = () => {
    const currentURL = window.location.pathname;
    switch (currentURL.split("/")[currentURL.split("/").length - 1]) {
      case "hackathon":
        return PageMetas.Hackathon;
      case "smu":
        return PageMetas.Smu;
      case "sideProjects":
        return PageMetas.SideProjects;
      case "freelance":
        return PageMetas.FreelanceWork;
      case "codestream":
        return PageMetas.Codestream;
      case "contact":
        return PageMetas.Contact;
      default:
        return PageMetas.Home;
    }
  };

  /**
   * Metadata for the currently active page.
   */
  const currentPageMeta = getMetaByPath();

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
        content="Kyle Foster, Web Developer, React Developer, MERN Developer, JavaScript Engineer, Frontend Developer, Portfolio, UI Designer, UX Developer, Creative Technologist, Remote Developer"
      />
      {/* Author information */}
      <meta name="author" content="Kyle Foster" />
      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="portfolioIcon.svg" />
      {/* Optional PNG fallback */}
      <link rel="icon" type="image/jpg" href="portfolioIcon.jpg" />
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
      <meta property="og:image" content="./public/portfolioIcon.svg" />
      <meta property="og:url" content="./public/portfolio_2025" />

      {/* ===========================================================
        ⚙️ PERFORMANCE & SEO EXTRAS
        =========================================================== */}
      {/* Preconnect to Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      {/* Canonical URL */}
      <link rel="canonical" href="https://foscat.github.io/" />
      {/* Robots directive */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}
