/**
 * @file seoRouteRegistry.js
 * @description Pure route-level SEO registry shared by React and build tooling.
 * @module assets/data/seoRouteRegistry
 */

import { PageRoute } from "../../types/navigation.types.js";

export const SITE_NAME = "Kyle Foster Portfolio";
export const SITE_AUTHOR = "Kyle Foster";
export const SITE_LANGUAGE = "en-US";
export const SITE_LOCALE = "en_US";
export const SITE_THEME_COLOR = "#1f2793";
export const SOCIAL_IMAGE_PATH = "/social-share-card.png";
export const PROFILE_IMAGE_PATH = "/portfolio-icon.jpg";
export const INDEXABLE_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const NOINDEX_ROBOTS = "noindex, nofollow, noarchive, nosnippet, noimageindex";

const LAST_MODIFIED = "2026-07-12";

/**
 * @description Route metadata used by the runtime head manager, static HTML generator, and sitemap.
 * The pathname key and the entry's `path` must remain identical.
 */
export const SEO_ROUTE_REGISTRY = Object.freeze({
  [PageRoute.HOME]: Object.freeze({
    path: PageRoute.HOME,
    title: "Kyle Foster | Senior React Frontend Engineer",
    description:
      "Senior React / Frontend Engineer building clear, scalable interfaces for learning platforms, admin tools, and data-rich product workflows since 2018.",
    indexable: true,
    ogType: "profile",
    pageType: "ProfilePage",
    breadcrumbLabel: "Home",
    lastModified: LAST_MODIFIED,
  }),
  [PageRoute.PROFESSIONAL]: Object.freeze({
    path: PageRoute.PROFESSIONAL,
    title: "CodeStream Studios Case Study | Kyle Foster",
    description:
      "See how Kyle Foster built CodeStream Studios' browser-based education platform for students, instructors, and school administrators.",
    indexable: true,
    ogType: "article",
    pageType: "WebPage",
    breadcrumbLabel: "CodeStream Studios",
    lastModified: LAST_MODIFIED,
  }),
  [PageRoute.HACKATHON]: Object.freeze({
    path: PageRoute.HACKATHON,
    title: "Daimler Hackathon Winner Case Study | Kyle Foster",
    description:
      "Learn how Kyle Foster's team won Daimler's 2019 hackathon with a voice-driven repair assistant designed for hands-free technician workflows.",
    indexable: true,
    ogType: "article",
    pageType: "WebPage",
    breadcrumbLabel: "Daimler Hackathon",
    lastModified: LAST_MODIFIED,
  }),
  [PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES]: Object.freeze({
    path: PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES,
    title: "Sanderson Technology Enterprises | Kyle Foster",
    description:
      "Review Kyle Foster's public website, reusable MERN foundations, and three-package UI system work for Sanderson Technology Enterprises.",
    indexable: true,
    ogType: "article",
    pageType: "WebPage",
    breadcrumbLabel: "Sanderson Technology Enterprises",
    lastModified: LAST_MODIFIED,
  }),
  [PageRoute.SIDE_PROJECTS]: Object.freeze({
    path: PageRoute.SIDE_PROJECTS,
    title: "React, IoT, and CSS Side Projects | Kyle Foster",
    description:
      "Explore Kyle Foster's practical side projects in React, IoT automation, CSS systems, authentication tooling, and domain-focused software.",
    indexable: true,
    ogType: "website",
    pageType: "CollectionPage",
    breadcrumbLabel: "Side Projects",
    lastModified: LAST_MODIFIED,
  }),
  [PageRoute.EDUCATION]: Object.freeze({
    path: PageRoute.EDUCATION,
    title: "SMU Coding Bootcamp Projects | Kyle Foster",
    description:
      "Explore the early API, team, and full-stack projects Kyle Foster built at SMU while establishing his software development foundation.",
    indexable: true,
    ogType: "article",
    pageType: "AboutPage",
    breadcrumbLabel: "SMU Coding Bootcamp",
    lastModified: LAST_MODIFIED,
  }),
  [PageRoute.CONTACT]: Object.freeze({
    path: PageRoute.CONTACT,
    title: "Contact Kyle Foster | Senior Frontend Engineer",
    description:
      "Contact Kyle Foster about senior frontend roles, React architecture, consulting engagements, or technical collaboration opportunities.",
    indexable: true,
    ogType: "website",
    pageType: "ContactPage",
    breadcrumbLabel: "Contact",
    lastModified: LAST_MODIFIED,
  }),
  [PageRoute.DOCS]: Object.freeze({
    path: PageRoute.DOCS,
    title: "Technical Documentation | Kyle Foster Portfolio",
    description:
      "Browse architecture, component, testing, rendering, and automation documentation for Kyle Foster's React portfolio application.",
    indexable: true,
    ogType: "article",
    pageType: "CollectionPage",
    breadcrumbLabel: "Technical Documentation",
    lastModified: LAST_MODIFIED,
  }),
  [PageRoute.HEALTH]: Object.freeze({
    path: PageRoute.HEALTH,
    title: "System Health | Kyle Foster Portfolio",
    description: "Internal runtime diagnostics for the Kyle Foster portfolio application.",
    indexable: false,
    ogType: "website",
    pageType: "WebPage",
    breadcrumbLabel: "System Health",
    lastModified: LAST_MODIFIED,
  }),
});

const NOT_FOUND_ROUTE = Object.freeze({
  title: "Page Not Found | Kyle Foster Portfolio",
  description: "The requested page could not be found on the Kyle Foster portfolio website.",
  indexable: false,
  ogType: "website",
  pageType: "WebPage",
  breadcrumbLabel: "Page Not Found",
  lastModified: LAST_MODIFIED,
});

/**
 * Normalize a route path so runtime and generated metadata use one canonical shape.
 *
 * @param {string} pathname - Route path, optionally including a query or hash.
 * @returns {string} Normalized absolute pathname.
 */
export function normalizePathname(pathname) {
  const rawPath = typeof pathname === "string" ? pathname.trim() : "";
  if (!rawPath) return PageRoute.HOME;

  const pathOnly = rawPath.split("#")[0].split("?")[0] || PageRoute.HOME;
  if (pathOnly === PageRoute.HOME) return PageRoute.HOME;

  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  return withLeadingSlash.replace(/\/+$/u, "") || PageRoute.HOME;
}

/**
 * Resolve complete metadata for a route and deployment origin.
 *
 * @param {string} pathname - Requested route pathname.
 * @param {string} origin - Canonical site origin.
 * @returns {object} Resolved metadata with canonical and asset URLs.
 */
export function resolveRouteSeo(pathname, origin) {
  const path = normalizePathname(pathname);
  const configuredRoute = SEO_ROUTE_REGISTRY[path];
  const route = configuredRoute || { ...NOT_FOUND_ROUTE, path };
  const siteOrigin = String(origin || "")
    .trim()
    .replace(/\/+$/u, "");
  const canonicalUrl = `${siteOrigin}${path}`;

  return {
    ...route,
    path,
    siteOrigin,
    canonicalUrl,
    homeUrl: `${siteOrigin}${PageRoute.HOME}`,
    socialImageUrl: `${siteOrigin}${SOCIAL_IMAGE_PATH}`,
    profileImageUrl: `${siteOrigin}${PROFILE_IMAGE_PATH}`,
    robots: route.indexable ? INDEXABLE_ROBOTS : NOINDEX_ROBOTS,
    isKnownRoute: Boolean(configuredRoute),
  };
}

/**
 * Build the JSON-LD graph shared by runtime and generated route shells.
 *
 * @param {object} routeSeo - Metadata returned by {@link resolveRouteSeo}.
 * @returns {object} Schema.org graph for the current route.
 */
export function buildStructuredData(routeSeo) {
  const websiteId = `${routeSeo.homeUrl}#website`;
  const personId = `${routeSeo.homeUrl}#person`;
  const webPageId = `${routeSeo.canonicalUrl}#webpage`;
  const homeDescription = SEO_ROUTE_REGISTRY[PageRoute.HOME].description;
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: routeSeo.homeUrl,
    },
  ];

  if (routeSeo.path !== PageRoute.HOME) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: routeSeo.breadcrumbLabel,
      item: routeSeo.canonicalUrl,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        url: routeSeo.homeUrl,
        inLanguage: SITE_LANGUAGE,
        description: homeDescription,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_AUTHOR,
        jobTitle: "Senior React / Frontend Engineer",
        url: routeSeo.homeUrl,
        image: routeSeo.profileImageUrl,
        description: homeDescription,
        email: "mailto:fosterkyle6456@gmail.com",
        sameAs: ["https://www.linkedin.com/in/kylefoster-dev", "https://github.com/Foscat"],
      },
      {
        "@type": routeSeo.pageType,
        "@id": webPageId,
        url: routeSeo.canonicalUrl,
        name: routeSeo.title,
        description: routeSeo.description,
        inLanguage: SITE_LANGUAGE,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: routeSeo.socialImageUrl,
          width: 1200,
          height: 630,
        },
        ...(routeSeo.pageType === "ProfilePage" ? { mainEntity: { "@id": personId } } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${routeSeo.canonicalUrl}#breadcrumbs`,
        itemListElement: breadcrumbItems,
      },
    ],
  };
}
