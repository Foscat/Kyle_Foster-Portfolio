/**
 * Head.test.jsx
 * ------------------------------------------------------------------
 * Unit tests for the Head component.
 *
 * Covers:
 * - Page metadata selection by URL path
 * - Document title updates
 * - Meta description updates
 * - Open Graph metadata injection
 *
 * Notes:
 * - Uses HelmetProvider (required for react-helmet-async)
 * - Mocks PageMetas to avoid coupling to real content
 */

import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Head from "./index";

/* ------------------------------------------------------------------
 * Mock PageMetas
 * ------------------------------------------------------------------ */

vi.mock("assets/data/pageMetas", () => ({
  default: {
    Home: {
      title: "Home Page",
      description: "Home description",
    },
    Hackathon: {
      title: "Hackathon Page",
      description: "Hackathon description",
    },
    Smu: {
      title: "SMU Page",
      description: "SMU description",
    },
    SideProjects: {
      title: "Side Projects Page",
      description: "Side projects description",
    },
    FreelanceWork: {
      title: "Freelance Page",
      description: "Freelance description",
    },
    Codestream: {
      title: "Codestream Page",
      description: "Codestream description",
    },
    Contact: {
      title: "Contact Page",
      description: "Contact description",
    },
  },
}));

/* ------------------------------------------------------------------
 * Helper
 * ------------------------------------------------------------------ */

const renderWithHelmet = (path = "/") => {
  window.history.pushState({}, "", path);

  return render(
    <HelmetProvider>
      <Head />
    </HelmetProvider>
  );
};

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("Head", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  /* ------------------------------------------------------------
   * Default route
   * ------------------------------------------------------------ */

  it("uses Home metadata by default", () => {
    renderWithHelmet("/");

    expect(document.title).toBe("Home Page");

    const meta = document.querySelector('meta[name="description"]');
    expect(meta).not.toBeNull();
    expect(meta.content).toBe("Home description");
  });

  /* ------------------------------------------------------------
   * Route-based metadata
   * ------------------------------------------------------------ */

  it("uses Hackathon metadata for /hackathon route", () => {
    renderWithHelmet("/hackathon");

    expect(document.title).toBe("Hackathon Page");

    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle.content).toBe("Hackathon Page");
  });

  it("uses SMU metadata for /smu route", () => {
    renderWithHelmet("/smu");

    expect(document.title).toBe("SMU Page");
  });

  it("uses SideProjects metadata for /sideProjects route", () => {
    renderWithHelmet("/sideProjects");

    expect(document.title).toBe("Side Projects Page");
  });

  it("uses Contact metadata for /contact route", () => {
    renderWithHelmet("/contact");

    expect(document.title).toBe("Contact Page");
  });

  /* ------------------------------------------------------------
   * Static meta tags
   * ------------------------------------------------------------ */

  it("injects viewport and author meta tags", () => {
    renderWithHelmet("/");

    const viewport = document.querySelector('meta[name="viewport"]');
    const author = document.querySelector('meta[name="author"]');

    expect(viewport).not.toBeNull();
    expect(author).not.toBeNull();
    expect(author.content).toBe("Kyle Foster");
  });

  it("injects Open Graph site metadata", () => {
    renderWithHelmet("/");

    expect(document.querySelector('meta[property="og:site_name"]')).not.toBeNull();

    expect(document.querySelector('meta[property="og:type"]')).not.toBeNull();
  });
});
