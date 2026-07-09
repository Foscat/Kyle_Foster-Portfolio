/**
 * @file Head.test.jsx
 * @fileoverview Tests for the Head component.
 * @description Tests for the Head component, ensuring it sets the document title and meta tags correctly based on the current route.
 * @module components/navigation/Head
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import Head from "../Head";
import renderWithProviders from "tests/renderWithProviders";
import { waitFor } from "@testing-library/react";

// Mock lightweight page metadata so Head tests remain isolated from route content payloads.
vi.mock("assets/data/pageSummaryMetas", () => ({
  default: {
    Home: { title: "Home Page", description: "Home description", url: "/" },
    Hackathon: { title: "Hackathon Page", description: "Hackathon description", url: "/hackathon" },
    SandersonTechnologyEnterprises: {
      title: "STE Page",
      description: "STE description",
      url: "/sanderson-technology-enterprises",
    },
    Smu: { title: "SMU Page", description: "SMU description", url: "/smu" },
    SideProjects: {
      title: "Side Projects Page",
      description: "Side projects description",
      url: "/side-projects",
    },
    Codestream: {
      title: "Codestream Page",
      description: "Codestream description",
      url: "/codestream",
    },
    Contact: { title: "Contact Page", description: "Contact description", url: "/contact" },
    Docs: { title: "Docs Page", description: "Docs description", url: "/docs" },
  },
}));

// Helper function to render the Head component with a specific route, allowing us to test how the component behaves when different paths are active by manipulating the browser's history state before rendering.
const renderHead = (path = "/") => {
  window.history.pushState({}, "", path);
  return renderWithProviders(<Head />);
};

// eslint-disable-next-line testing-library/no-node-access -- <head> meta/JSON-LD has no ARIA role; direct DOM access is the only option
const getMetaContent = (selector) => document.head.querySelector(selector)?.getAttribute("content");
const getJsonLdGraphTypes = () => {
  // eslint-disable-next-line testing-library/no-node-access -- querying <head> script tags for JSON-LD; no Testing Library equivalent
  const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
  const script = scripts[scripts.length - 1];
  if (!script?.textContent) return [];

  const parsed = JSON.parse(script.textContent);
  return Array.isArray(parsed?.["@graph"])
    ? parsed["@graph"].map((node) => node?.["@type"]).filter(Boolean)
    : [];
};

// The test suite for the Head component, which includes tests to verify that the component sets the document title and meta tags correctly based on the current route, ensuring that the appropriate metadata is applied for each page of the application.
describe("Head", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  // Test to ensure that when the Head component is rendered with the default route ("/"), it sets the document title and description meta tag according to the metadata defined for the Home page, verifying that the component correctly applies the expected metadata for the default route.
  it("uses Home metadata by default", async () => {
    renderHead("/");

    await waitFor(() => {
      expect(document.title).toBe("Home Page");
      expect(getMetaContent('meta[name="description"]')).toBe("Home description");
      expect(getMetaContent('meta[property="og:description"]')).toBe("Home description");
    });
  });
  // Test to verify that when the Head component is rendered with the "/hackathon" route, it sets the document title and Open Graph title meta tag according to the metadata defined for the Hackathon page, ensuring that the component correctly applies the expected metadata for this specific route.
  it("uses Hackathon metadata for /hackathon route", async () => {
    renderHead("/hackathon");
    await waitFor(() => {
      expect(document.title).toBe("Hackathon Page");
    });
  });

  it("uses Sanderson Technology Enterprises metadata for its route", async () => {
    renderHead("/sanderson-technology-enterprises");
    await waitFor(() => {
      expect(document.title).toBe("STE Page");
      expect(getMetaContent('meta[name="description"]')).toBe("STE description");
    });
  });

  // Test to ensure that when the Head component is rendered with the "/smu" route, it sets the document title according to the metadata defined for the SMU page, verifying that the component correctly applies the expected metadata for this route as well.
  it("uses SMU metadata for /smu route", async () => {
    renderHead("/smu");
    await waitFor(() => {
      expect(document.title).toBe("SMU Page");
    });
  });

  // Test to ensure that when the Head component is rendered with the "/side-projects" route, it sets the document title according to the metadata defined for the Side Projects page, verifying that the component correctly applies the expected metadata for this route as well.
  it("uses SideProjects metadata for /side-projects route", async () => {
    renderHead("/side-projects");
    await waitFor(() => {
      expect(document.title).toBe("Side Projects Page");
    });
  });

  // Test to ensure that when the Head component is rendered with the "/codestream" route, it sets the document title according to the metadata defined for the Codestream page, verifying that the component correctly applies the expected metadata for this route as well.
  it("uses Contact metadata for /contact route", async () => {
    renderHead("/contact");
    await waitFor(() => {
      expect(document.title).toBe("Contact Page");
    });
  });

  it("includes Person and WebSite JSON-LD schemas", async () => {
    renderHead("/");
    await waitFor(() => {
      const schemaTypes = getJsonLdGraphTypes();
      expect(schemaTypes).toContain("Person");
      expect(schemaTypes).toContain("WebSite");
    });
  });

  it("does not inject icon links managed by the theme favicon hook", async () => {
    renderHead("/");
    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access -- direct head query is required for favicon rel token validation
      const favicons = document.head.querySelectorAll('link[rel~="icon"]');
      expect(favicons).toHaveLength(0);
    });
  });

  it("includes ProfilePage only on the Home route", async () => {
    renderHead("/");
    await waitFor(() => {
      expect(getJsonLdGraphTypes()).toContain("ProfilePage");
    });

    renderHead("/contact");
    await waitFor(() => {
      expect(getJsonLdGraphTypes()).not.toContain("ProfilePage");
    });
  });

  it("marks /health as noindex for crawlers", async () => {
    renderHead("/health");
    await waitFor(() => {
      expect(getMetaContent('meta[name="robots"]')).toContain("noindex");
      expect(getMetaContent('meta[name="googlebot"]')).toContain("noindex");
    });
  });

  it("marks unknown routes as noindex and uses a not found title", async () => {
    renderHead("/missing-route");
    await waitFor(() => {
      expect(document.title).toBe("Page Not Found | Kyle Foster Portfolio");
      expect(getMetaContent('meta[name="robots"]')).toContain("noindex");
    });
  });

  it("normalizes canonical URLs by trimming trailing slashes on non-root pages", async () => {
    renderHead("/contact/");
    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access -- direct head query is required for canonical link assertions
      const canonical = document.head.querySelector('link[rel="canonical"]');
      expect(canonical?.getAttribute("href")).toBe("http://localhost:3000/contact");
    });
  });
});
