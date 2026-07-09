/**
 * @file index.jsx
 * @description Route-aware document metadata manager for SEO and social previews.
 * @module components/navigation/Head
 */

import pageSummaryMetas from "assets/data/pageSummaryMetas";
import { Helmet } from "react-helmet-async";
import { PageRoute } from "types/navigation.types";

const SITE_NAME = "Kyle Foster Portfolio";
const SITE_AUTHOR = "Kyle Foster";
const SITE_LANGUAGE = "en-US";
const SITE_LOCALE = "en_US";
const SITE_THEME_COLOR = "#1f2793";
const SOCIAL_IMAGE_PATH = "/social-share-card.png";
const PROFILE_IMAGE_PATH = "/portfolio-icon.jpg";
const HEALTH_ROUTE = PageRoute.HEALTH;

const INDEXABLE_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const NOINDEX_ROBOTS = "noindex, nofollow, noarchive, nosnippet, noimageindex";

const BASE_KEYWORDS = Object.freeze([
  "Kyle Foster",
  "Senior React engineer",
  "Frontend engineer",
  "JavaScript",
  "React portfolio",
  "UI engineering",
]);

const SOCIAL_PROFILES = Object.freeze([
  "https://www.linkedin.com/in/kylefoster-dev",
  "https://github.com/Foscat",
]);

const ROUTE_SEO_CONFIG = Object.freeze({
  [PageRoute.HOME]: {
    meta: pageSummaryMetas.Home,
    pageType: "ProfilePage",
    ogType: "profile",
    indexable: true,
    breadcrumbLabel: "Home",
  },
  [PageRoute.PROFESSIONAL]: {
    meta: pageSummaryMetas.Codestream,
    pageType: "WebPage",
    ogType: "article",
    indexable: true,
    breadcrumbLabel: "CodeStream",
  },
  [PageRoute.HACKATHON]: {
    meta: pageSummaryMetas.Hackathon,
    pageType: "WebPage",
    ogType: "article",
    indexable: true,
    breadcrumbLabel: "Hackathon",
  },
  [PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES]: {
    meta: pageSummaryMetas.SandersonTechnologyEnterprises,
    pageType: "WebPage",
    ogType: "article",
    indexable: true,
    breadcrumbLabel: "Sanderson Technology Enterprises",
  },
  [PageRoute.SIDE_PROJECTS]: {
    meta: pageSummaryMetas.SideProjects,
    pageType: "CollectionPage",
    ogType: "website",
    indexable: true,
    breadcrumbLabel: "Side Projects",
  },
  [PageRoute.EDUCATION]: {
    meta: pageSummaryMetas.Smu,
    pageType: "AboutPage",
    ogType: "article",
    indexable: true,
    breadcrumbLabel: "SMU Bootcamp",
  },
  [PageRoute.CONTACT]: {
    meta: pageSummaryMetas.Contact,
    pageType: "ContactPage",
    ogType: "website",
    indexable: true,
    breadcrumbLabel: "Contact",
  },
  [PageRoute.DOCS]: {
    meta: pageSummaryMetas.Docs,
    pageType: "CollectionPage",
    ogType: "article",
    indexable: true,
    breadcrumbLabel: "Docs",
  },
  [HEALTH_ROUTE]: {
    meta: {
      url: HEALTH_ROUTE,
      title: "System Health",
      seoTitle: "System Health | Kyle Foster Portfolio",
      description: "Internal runtime diagnostics page for this portfolio application.",
      keywords: ["system health", "diagnostics", "internal route", "portfolio runtime"],
    },
    pageType: "WebPage",
    ogType: "website",
    indexable: false,
    breadcrumbLabel: "System Health",
  },
});

const NOT_FOUND_META = Object.freeze({
  url: "",
  title: "Page Not Found",
  seoTitle: "Page Not Found | Kyle Foster Portfolio",
  description: "The requested page could not be found on this portfolio website.",
  keywords: ["404", "page not found", "Kyle Foster portfolio"],
});

/**
 * Normalizes a pathname to avoid canonical duplicates caused by trailing slashes.
 *
 * @param {string} pathname
 * @returns {string}
 */
function normalizePathname(pathname) {
  const rawPath = typeof pathname === "string" ? pathname.trim() : "";
  if (!rawPath) return PageRoute.HOME;

  const pathWithoutHash = rawPath.split("#")[0];
  const pathWithoutQuery = pathWithoutHash.split("?")[0];
  if (pathWithoutQuery === "/") return "/";

  const normalizedPath = pathWithoutQuery.replace(/\/+$/, "");
  return normalizedPath || "/";
}

/**
 * Ensures every metadata keyword collection is normalized and stable.
 *
 * @param {unknown} keywords
 * @returns {string[]}
 */
function normalizeKeywords(keywords) {
  const input = Array.isArray(keywords) ? keywords : [];
  const normalized = [...BASE_KEYWORDS, ...input]
    .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
    .filter(Boolean);

  return Array.from(new Set(normalized));
}

/**
 * @returns {JSX.Element}
 */
export default function Head() {
  const currentPath = normalizePathname(window.location.pathname);
  const routeConfig = ROUTE_SEO_CONFIG[currentPath];
  const isKnownRoute = Boolean(routeConfig);
  const pageMeta = routeConfig?.meta || NOT_FOUND_META;
  const pageTitle = pageMeta.seoTitle || pageMeta.title || SITE_NAME;
  const pageDescription = pageMeta.description || pageSummaryMetas.Home.description;
  const isIndexable = routeConfig?.indexable ?? false;
  const robotsContent = isIndexable ? INDEXABLE_ROBOTS : NOINDEX_ROBOTS;
  const ogType = routeConfig?.ogType || "website";
  const pageType = routeConfig?.pageType || "WebPage";

  const siteOrigin =
    (typeof import.meta.env.VITE_SITE_URL === "string" &&
      import.meta.env.VITE_SITE_URL.trim().replace(/\/$/, "")) ||
    window.location.origin;
  const canonicalPath = normalizePathname(pageMeta.url || currentPath);
  const canonicalUrl = `${siteOrigin}${canonicalPath}`;
  const homeUrl = `${siteOrigin}${PageRoute.HOME}`;
  const socialImageUrl = `${siteOrigin}${SOCIAL_IMAGE_PATH}`;
  const profileImageUrl = `${siteOrigin}${PROFILE_IMAGE_PATH}`;
  const websiteId = `${siteOrigin}/#website`;
  const personId = `${siteOrigin}/#person`;
  const webPageId = `${canonicalUrl}#webpage`;
  const breadcrumbLabel = routeConfig?.breadcrumbLabel || "Not Found";
  const keywords = normalizeKeywords(pageMeta.keywords).join(", ");

  const breadcrumbItems =
    canonicalPath === PageRoute.HOME
      ? [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: homeUrl,
          },
        ]
      : [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: breadcrumbLabel,
            item: canonicalUrl,
          },
        ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        url: homeUrl,
        inLanguage: SITE_LANGUAGE,
        description: pageSummaryMetas.Home.description,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_AUTHOR,
        jobTitle: "Senior React / Frontend Engineer",
        url: homeUrl,
        image: profileImageUrl,
        description: pageSummaryMetas.Home.description,
        email: "mailto:fosterkyle6456@gmail.com",
        sameAs: SOCIAL_PROFILES,
        mainEntityOfPage: {
          "@id": webPageId,
        },
      },
      {
        "@type": pageType,
        "@id": webPageId,
        url: canonicalUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: SITE_LANGUAGE,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": personId,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: socialImageUrl,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumbs`,
        itemListElement: breadcrumbItems,
      },
      ...(isKnownRoute && canonicalPath === PageRoute.HOME
        ? [
            {
              "@type": "ProfilePage",
              "@id": `${canonicalUrl}#profile-page`,
              url: canonicalUrl,
              name: SITE_AUTHOR,
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
      <html lang={SITE_LANGUAGE} />
      <title>{pageTitle}</title>

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={SITE_AUTHOR} />
      <meta name="theme-color" content={SITE_THEME_COLOR} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no, address=no, email=no" />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />

      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialImageUrl} />
      <meta property="og:image:secure_url" content={socialImageUrl} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Kyle Foster portfolio social share card" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={socialImageUrl} />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-US" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      <link rel="me" href="https://github.com/Foscat" />
      <link rel="me" href="https://www.linkedin.com/in/kylefoster-dev/" />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
