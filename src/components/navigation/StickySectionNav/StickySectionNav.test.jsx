import React from "react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "tests/renderWithProviders";
import StickySectionNav from "./index";
import { BlockType } from "types/ui.types";

/**
 * @file StickySectionNav.test.js
 * @description Unit tests for the StickySectionNav component.
 *
 * Test coverage:
 * - Rendering of section navigation links
 * - Active section highlighting via `aria-current="location"`
 * - History hash updates on navigation
 * - Programmatic scroll coordination with scroll-spy logic
 *
 * Testing strategy:
 * - Mocks `useScrollSpyWithHistory` to control active section state
 * - Mocks `window.scrollTo` to prevent actual scrolling
 * - Uses real DOM nodes to simulate anchor targets
 *
 * Architectural intent:
 * StickySectionNav is an **intra-page navigation controller**.
 * Tests focus on:
 * - Accessibility semantics
 * - Navigation side effects (history + scroll)
 * - Integration boundaries with the scroll-spy hook
 *
 * @module tests/components/StickySectionNav
 */

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

/**
 * Mock scroll-spy hook to control active section state
 * and observe programmatic scroll suppression behavior.
 */
const markProgrammaticScroll = vi.fn(() => Promise.resolve(true));
const scrollSpyState = {
  activeLeafId: "section-1",
  activeChain: ["section-1"],
};

vi.mock("assets/hooks/useScrollSpy", () => ({
  buildSectionTree: (sections) => ({
    nodes: sections.map((section) => ({
      id: section.id,
      title: section.title,
      children: [],
      level: section.level ?? 1,
    })),
    byId: Object.fromEntries(
      sections.map((section) => [
        section.id,
        {
          id: section.id,
          title: section.title,
          children: [],
          level: section.level ?? 1,
        },
      ])
    ),
  }),
  useScrollSpyWithHistory: () => ({
    activeLeafId: scrollSpyState.activeLeafId,
    activeChain: scrollSpyState.activeChain,
    markProgrammaticScroll,
  }),
}));

/* ------------------------------------------------------------------
 * Fixtures
 * ------------------------------------------------------------------ */

const sections = [
  { id: "section-1", title: "Introduction" },
  { id: "section-2", title: "Details" },
];

const sectionsWithBlocks = [
  {
    id: "section-1",
    title: "Introduction",
    blocks: [{ id: "section-1-block", title: "Overview" }],
  },
  {
    id: "section-2",
    title: "Details",
    blocks: [{ id: "section-2-block", title: "Deep Dive" }],
  },
];

const sectionsWithNonNavigableChild = [
  {
    id: "section-1",
    title: "Introduction",
    blocks: [
      { id: "section-1-block", title: "Overview" },
      { id: "section-1-links", title: "Resource Links", type: BlockType.LINKS },
    ],
  },
];

const sectionsWithNavItems = [
  {
    id: "docs",
    title: "Docs",
    navItems: [{ id: "doc-components", title: "Components" }],
    blocks: [{ id: "docs-block", title: "Legacy Block" }],
  },
];

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("StickySectionNav", () => {
  let s1;
  let s2;

  beforeEach(() => {
    markProgrammaticScroll.mockClear();
    scrollSpyState.activeLeafId = "section-1";
    scrollSpyState.activeChain = ["section-1"];
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
      configurable: true,
    });

    /**
     * Ensure target section elements exist in the DOM so
     * scroll and offset calculations can resolve correctly.
     */
    s1 = document.createElement("div");
    s1.id = "section-1";
    document.body.appendChild(s1);

    s2 = document.createElement("div");
    s2.id = "section-2";
    document.body.appendChild(s2);
  });

  afterEach(() => {
    s1?.remove();
    s2?.remove();
    vi.restoreAllMocks();
  });

  /* ------------------------------------------------------------
   * Rendering
   * ------------------------------------------------------------ */

  it("renders a list of section buttons", () => {
    renderWithProviders(<StickySectionNav sections={sections} pageUrl="/page" />);

    expect(screen.getByRole("navigation", { name: /section navigation/i })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Introduction" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Details" })).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Active section state
   * ------------------------------------------------------------ */

  it("marks the active section via aria-current", () => {
    renderWithProviders(<StickySectionNav sections={sections} pageUrl="/page" />);

    expect(screen.getByRole("button", { name: "Introduction" })).toHaveAttribute(
      "aria-current",
      "location"
    );

    expect(screen.getByRole("button", { name: "Details" })).not.toHaveAttribute("aria-current");
  });

  /* ------------------------------------------------------------
   * Navigation behavior
   * ------------------------------------------------------------ */

  it("updates history and performs a programmatic scroll on button click", async () => {
    renderWithProviders(<StickySectionNav sections={sections} pageUrl="/page" />);

    const details = screen.getByRole("button", { name: "Details" });

    fireEvent.click(details);

    /**
     * Ensures the scroll-spy hook is informed that the upcoming
     * scroll is programmatic (not user-driven).
     */
    expect(markProgrammaticScroll).toHaveBeenCalledTimes(1);

    /**
     * Verifies that the URL hash is updated without a full navigation.
     */
    expect(window.location.hash).toBe("#section-2");

    /**
     * Confirms that smooth scrolling was triggered.
     */
    await waitFor(() => {
      expect(window.scrollTo).toHaveBeenCalled();
    });
  });

  it("keeps subsection lists collapsed by default when only a parent section is active", () => {
    renderWithProviders(<StickySectionNav sections={sectionsWithBlocks} pageUrl="/page" />);

    expect(screen.queryByRole("button", { name: "Overview" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Deep Dive" })).not.toBeInTheDocument();
  });

  it("keeps subsection lists closed by default even when an active descendant exists", () => {
    scrollSpyState.activeLeafId = "section-1-block";
    scrollSpyState.activeChain = ["section-1", "section-1-block"];

    renderWithProviders(<StickySectionNav sections={sectionsWithBlocks} pageUrl="/page" />);

    expect(
      screen.queryByRole("button", { name: /navigate to subsection overview/i })
    ).not.toBeInTheDocument();
  });

  it("stays collapsed on initial render even when page starts scrolled", () => {
    scrollSpyState.activeLeafId = "section-1-block";
    scrollSpyState.activeChain = ["section-1", "section-1-block"];

    Object.defineProperty(window, "scrollY", {
      value: 240,
      writable: true,
      configurable: true,
    });

    renderWithProviders(<StickySectionNav sections={sectionsWithBlocks} pageUrl="/page" />);

    expect(
      screen.queryByRole("button", { name: /navigate to subsection overview/i })
    ).not.toBeInTheDocument();
  });

  it("opens the section on scroll updates when an active descendant exists", async () => {
    scrollSpyState.activeLeafId = "section-1-block";
    scrollSpyState.activeChain = ["section-1", "section-1-block"];

    renderWithProviders(<StickySectionNav sections={sectionsWithBlocks} pageUrl="/page" />);

    expect(
      screen.queryByRole("button", { name: /navigate to subsection overview/i })
    ).not.toBeInTheDocument();

    act(() => {
      window.scrollY = 120;
      fireEvent.scroll(window);
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /navigate to subsection overview/i })
      ).toBeInTheDocument();
    });
  });

  it("keeps scroll-driven section expansion when active leaf is a non-navigable descendant", async () => {
    scrollSpyState.activeLeafId = "section-1-links";
    scrollSpyState.activeChain = ["section-1", "section-1-links"];

    renderWithProviders(
      <StickySectionNav sections={sectionsWithNonNavigableChild} pageUrl="/page" />
    );

    expect(
      screen.queryByRole("button", { name: /navigate to subsection overview/i })
    ).not.toBeInTheDocument();

    act(() => {
      window.scrollY = 120;
      fireEvent.scroll(window);
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /navigate to subsection overview/i })
      ).toBeInTheDocument();
    });
  });

  it("renders subsection items from navItems when provided", () => {
    const docs = document.createElement("div");
    docs.id = "docs";
    document.body.appendChild(docs);

    const docComponents = document.createElement("div");
    docComponents.id = "doc-components";
    document.body.appendChild(docComponents);

    renderWithProviders(<StickySectionNav sections={sectionsWithNavItems} pageUrl="/docs" />);

    expect(
      screen.getByRole("button", { name: /navigate to subsection components/i, hidden: true })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: /navigate to subsection legacy block/i,
        hidden: true,
      })
    ).not.toBeInTheDocument();

    docs.remove();
    docComponents.remove();
  });
});
