/**
 * @file seoRouteRegistry.test.js
 * @description Contract tests for route-level SEO metadata and structured data.
 * @module assets/data/seoRouteRegistry.test
 */

import { describe, expect, it } from "vitest";
import { PageRoute } from "types/navigation.types.js";
import {
  INDEXABLE_ROBOTS,
  NOINDEX_ROBOTS,
  SEO_ROUTE_REGISTRY,
  buildStructuredData,
  normalizePathname,
  resolveRouteSeo,
} from "./seoRouteRegistry.js";

const SITE_ORIGIN = "https://kyle-foster.com";

describe("SEO route registry", () => {
  it("normalizes hashes, queries, and trailing slashes without changing the root route", () => {
    expect(normalizePathname("/")).toBe("/");
    expect(normalizePathname("/contact/?source=portfolio#form")).toBe("/contact");
    expect(normalizePathname("/side-projects///")).toBe("/side-projects");
  });

  it("provides unique metadata for every indexable route", () => {
    const indexableRoutes = Object.values(SEO_ROUTE_REGISTRY).filter((route) => route.indexable);
    const titles = indexableRoutes.map((route) => route.title);
    const descriptions = indexableRoutes.map((route) => route.description);

    expect(indexableRoutes.map((route) => route.path)).toEqual(
      expect.arrayContaining([
        PageRoute.HOME,
        PageRoute.PROFESSIONAL,
        PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES,
        PageRoute.INTERFACE_SYSTEM,
        PageRoute.SIDE_PROJECTS,
        PageRoute.HACKATHON,
        PageRoute.EDUCATION,
        PageRoute.CONTACT,
        PageRoute.DOCS,
      ])
    );
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    expect(indexableRoutes.every((route) => route.title.length <= 60)).toBe(true);
    expect(
      indexableRoutes.every(
        (route) => route.description.length >= 110 && route.description.length <= 160
      )
    ).toBe(true);
    expect(indexableRoutes.every((route) => route.lastModified === "2026-09-02")).toBe(true);
    expect(SEO_ROUTE_REGISTRY[PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES].description).toContain(
      "Content Creator Platform"
    );
    expect(SEO_ROUTE_REGISTRY[PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES].description).toContain(
      "Salvage Yard System"
    );
    expect(SEO_ROUTE_REGISTRY[PageRoute.SIDE_PROJECTS].description).toContain(
      "Interface Systems Lab"
    );
    expect(SEO_ROUTE_REGISTRY[PageRoute.SIDE_PROJECTS].description).toContain("Enigma");
    expect(SEO_ROUTE_REGISTRY[PageRoute.HOME].title).toMatch(/^Kyle Foster \|/u);
    expect(SEO_ROUTE_REGISTRY[PageRoute.HOME].description).toContain("Kyle Foster");
    expect(SEO_ROUTE_REGISTRY[PageRoute.INTERFACE_SYSTEM].description).toContain(
      "layout-style-css"
    );
  });

  it("resolves canonical and robots metadata before React renders", () => {
    const contact = resolveRouteSeo("/contact/", SITE_ORIGIN);
    const health = resolveRouteSeo(PageRoute.HEALTH, SITE_ORIGIN);
    const missing = resolveRouteSeo("/missing-route", SITE_ORIGIN);

    expect(contact.canonicalUrl).toBe(`${SITE_ORIGIN}/contact`);
    expect(contact.robots).toBe(INDEXABLE_ROBOTS);
    expect(health.canonicalUrl).toBe(`${SITE_ORIGIN}/health`);
    expect(health.robots).toBe(NOINDEX_ROBOTS);
    expect(missing.path).toBe("/missing-route");
    expect(missing.canonicalUrl).toBe(`${SITE_ORIGIN}/missing-route`);
    expect(missing.robots).toBe(NOINDEX_ROBOTS);
  });

  it("builds page-specific structured data from resolved metadata", () => {
    const routeSeo = resolveRouteSeo(PageRoute.SIDE_PROJECTS, SITE_ORIGIN);
    const structuredData = buildStructuredData(routeSeo);
    const serialized = JSON.stringify(structuredData);

    expect(structuredData["@context"]).toBe("https://schema.org");
    expect(serialized).toContain(`${SITE_ORIGIN}/side-projects`);
    expect(serialized).toContain("CollectionPage");
    expect(serialized).toContain("BreadcrumbList");
    expect(serialized).toContain("Person");
    expect(serialized).toContain("Senior Frontend Engineer and Product Builder");
    expect(serialized).toContain("Sanderson Technology Enterprises");
  });
});
