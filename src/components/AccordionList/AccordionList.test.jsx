/**
 * AccordionList.test.jsx
 * ------------------------------------------------------------------
 * Unit tests for the AccordionList component.
 *
 * Covers:
 * - Rendering of items
 * - Accordion expand / collapse behavior
 * - Keyboard interaction (Enter / Space)
 * - Scroll-link behavior for isScroller items
 * - Accessibility roles and live region updates
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AccordionList from "./index";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

// Mock scrollIntoView to avoid JSDOM errors
beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

/* ------------------------------------------------------------------
 * Test data
 * ------------------------------------------------------------------ */

const ITEMS = [
  {
    id: "section-1",
    title: "Section One",
    text: "Details for section one",
    isScroller: true,
  },
  {
    id: "section-2",
    title: "Section Two",
    text: "Details for section two",
    isScroller: false,
  },
];

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------ */

const renderAccordion = (props = {}) => {
  return render(<AccordionList title="Test Sections" items={ITEMS} accordion {...props} />);
};

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("AccordionList", () => {
  /* ------------------------------------------------------------
   * Rendering
   * ------------------------------------------------------------ */

  it("renders the panel title", () => {
    renderAccordion();
    expect(screen.getByText("Test Sections")).toBeInTheDocument();
  });

  it("renders all item titles", () => {
    renderAccordion();

    ITEMS.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  /* ------------------------------------------------------------
   * Accordion behavior
   * ------------------------------------------------------------ */

  it("expands and collapses an item when clicked", async () => {
    renderAccordion();

    const header = screen.getByText("Section One");

    // Expand
    await userEvent.click(header);
    expect(screen.getByText("Details for section one")).toBeInTheDocument();

    // Collapse
    await userEvent.click(header);
    expect(screen.queryByText("Details for section one")).not.toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Keyboard interaction
   * ------------------------------------------------------------ */

  it("toggles accordion item with Enter key", async () => {
    renderAccordion();

    const header = screen.getByText("Section One");
    header.focus();

    await userEvent.keyboard("{Enter}");
    expect(screen.getByText("Details for section one")).toBeInTheDocument();
  });

  it("toggles accordion item with Space key", async () => {
    renderAccordion();

    const header = screen.getByText("Section Two");
    header.focus();

    await userEvent.keyboard(" ");
    expect(screen.getByText("Details for section two")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Scroll-link behavior
   * ------------------------------------------------------------ */

  it("calls scrollIntoView when an isScroller item is activated", async () => {
    // Create a fake target section in the DOM
    const target = document.createElement("div");
    target.id = "section-1";
    document.body.appendChild(target);

    renderAccordion();

    const header = screen.getByText("Section One");
    header.focus();

    await userEvent.keyboard("{Enter}");

    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();

    document.body.removeChild(target);
  });

  /* ------------------------------------------------------------
   * Accessibility
   * ------------------------------------------------------------ */

  it("renders the accordion container with role='tree'", () => {
    renderAccordion();
    expect(screen.getByRole("tree")).toBeInTheDocument();
  });

  it("updates screen reader live region on interaction", async () => {
    renderAccordion();

    const header = screen.getByText("Section One");
    await userEvent.click(header);

    const liveRegion = screen.getByText(/Expanded section/i);
    expect(liveRegion).toBeInTheDocument();
  });
});
