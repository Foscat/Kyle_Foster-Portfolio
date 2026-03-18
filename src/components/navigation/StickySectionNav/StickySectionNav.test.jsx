import React from "react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "tests/renderWithProviders";
import StickySectionNav from "./index";

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

vi.mock("assets/hooks/useScrollSpy", () => ({
  useScrollSpyWithHistory: () => ({
    activeId: "section-1",
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

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("StickySectionNav", () => {
  beforeEach(() => {
    markProgrammaticScroll.mockClear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    /**
     * Ensure target section elements exist in the DOM so
     * scroll and offset calculations can resolve correctly.
     */
    const s1 = document.createElement("div");
    s1.id = "section-1";
    document.body.appendChild(s1);

    const s2 = document.createElement("div");
    s2.id = "section-2";
    document.body.appendChild(s2);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  /* ------------------------------------------------------------
   * Rendering
   * ------------------------------------------------------------ */

  it("renders a list of section links", () => {
    renderWithProviders(<StickySectionNav sections={sections} pageUrl="/page" />);

    expect(screen.getByRole("navigation", { name: /section navigation/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Introduction" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Details" })).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Active section state
   * ------------------------------------------------------------ */

  it("marks the active section via aria-current", () => {
    renderWithProviders(<StickySectionNav sections={sections} pageUrl="/page" />);

    expect(screen.getByRole("link", { name: "Introduction" })).toHaveAttribute(
      "aria-current",
      "location"
    );

    expect(screen.getByRole("link", { name: "Details" })).not.toHaveAttribute("aria-current");
  });

  /* ------------------------------------------------------------
   * Navigation behavior
   * ------------------------------------------------------------ */

  it("updates history and performs a programmatic scroll on link click", async () => {
    renderWithProviders(<StickySectionNav sections={sections} pageUrl="/page" />);

    const details = screen.getByRole("link", { name: "Details" });

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
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
