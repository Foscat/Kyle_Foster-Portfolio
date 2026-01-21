/**
 * StickySectionNav.test.jsx
 * ------------------------------------------------------------------
 * Unit tests for the StickySectionNav component.
 *
 * Covers:
 * - Rendering navigation items
 * - Active section highlighting
 * - Click behavior and URL updates
 * - Integration with scroll spy hook (mocked)
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import StickySectionNav from "./index";

/* ------------------------------------------------------------------
 * Mock: useScrollSpyWithHistory
 * ------------------------------------------------------------------ */

const markProgrammaticScroll = vi.fn();

const pushStateSpy = vi.spyOn(window.history, "pushState");

vi.mock("assets/hooks/useScrollSpy", () => ({
  useScrollSpyWithHistory: () => ({
    activeId: "section-2",
    markProgrammaticScroll,
  }),
}));

/* ------------------------------------------------------------------
 * Test data
 * ------------------------------------------------------------------ */

const SECTIONS = [
  { id: "section-1", title: "Introduction" },
  { id: "section-2", title: "Details" },
  { id: "section-3", title: "Summary" },
];

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------ */

const renderNav = (props = {}) => {
  return render(<StickySectionNav sections={SECTIONS} pageUrl="/test-page" {...props} />);
};

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("StickySectionNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ------------------------------------------------------------
   * Rendering
   * ------------------------------------------------------------ */

  it("renders a navigation item for each section", () => {
    renderNav();

    SECTIONS.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  /* ------------------------------------------------------------
   * Active state
   * ------------------------------------------------------------ */

  it("marks the active section correctly", () => {
    renderNav();

    const activeItem = screen.getByText("Details").closest("li");
    expect(activeItem).toHaveClass("is-active");

    const inactiveItem = screen.getByText("Introduction").closest("li");
    expect(inactiveItem).toHaveClass("is-inactive");
  });

  it("sets aria-current on the active section link", () => {
    renderNav();

    const activeLink = screen.getByText("Details");
    expect(activeLink).toHaveAttribute("aria-current", "location");
  });

  /* ------------------------------------------------------------
   * Click behavior
   * ------------------------------------------------------------ */

  it("calls markProgrammaticScroll when a nav item is clicked", async () => {
    renderNav();

    await userEvent.click(screen.getByText("Introduction"));
    expect(markProgrammaticScroll).toHaveBeenCalledOnce();
  });

  it("updates the URL hash when navigating", async () => {
    renderNav();

    await userEvent.click(screen.getByText("Summary"));

    expect(window.location.hash).toBe("#section-3");
  });

  /* ------------------------------------------------------------
   * Accessibility
   * ------------------------------------------------------------ */

  it("renders navigation with appropriate ARIA roles", () => {
    renderNav();

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });
});
