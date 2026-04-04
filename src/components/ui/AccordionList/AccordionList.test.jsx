/**
 * @file AccordionList.test.jsx
 * @description Unit tests for the AccordionList component.
 *
 * Test coverage:
 * - Basic rendering of panel and item titles
 * - Accordion expand / collapse behavior
 * - Keyboard interaction (Enter / Space)
 * - Scroll-to-section behavior for `isScroller` items
 * - Accessibility roles and screen-reader live region updates
 *
 * Testing strategy:
 * - Uses `renderWithProviders` to ensure context parity with the app
 * - Uses `@testing-library/user-event` for realistic interaction simulation
 * - Avoids testing implementation details; focuses on observable behavior
 *
 * @module tests/components/AccordionList
 */

import { act, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AccordionList from "./index";
import renderWithProviders from "tests/renderWithProviders";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------
 * JSDOM does not implement `scrollIntoView`, so this is mocked to
 * prevent runtime errors during scroll-related tests.
 */

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
    content: "Details for section one",
    isScroller: true,
  },
  {
    id: "section-2",
    title: "Section Two",
    content: "Details for section two",
    isScroller: false,
  },
];

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------
 * Shared render helper to keep test cases concise and consistent.
 */

const renderAccordion = (props = {}) => {
  return renderWithProviders(
    <AccordionList title="Test Sections" items={ITEMS} accordion {...props} />
  );
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
   * Keyboard interaction
   * ------------------------------------------------------------ */

  it("toggles accordion item with Enter key", async () => {
    renderAccordion();

    const header = screen.getByRole("button", { name: /Section One/i });
    header.focus();

    await userEvent.keyboard("{Enter}");
    expect(await screen.findByText("Details for section one")).toBeInTheDocument();
  });

  it("toggles accordion item with Space key", async () => {
    renderAccordion();

    const header = screen.getByRole("button", { name: /Section Two/i });
    header.focus();

    await userEvent.keyboard(" ");
    expect(await screen.findByText("Details for section two")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Scroll-link behavior
   * ------------------------------------------------------------ */

  it("calls scrollIntoView when an isScroller item is activated", async () => {
    // Create a fake target section in the DOM and spy on its scrollIntoView.
    // jsdom does not implement scrollIntoView; we spy on the instance directly
    // because prototype-level mocks are not reliably picked up by jsdom elements.
    const target = document.createElement("div");
    target.id = "section-1";
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    renderAccordion();

    const header = screen.getByRole("button", { name: /Section one/i });

    fireEvent.keyDown(header, { key: "Enter", code: "Enter" });

    expect(target.scrollIntoView).toHaveBeenCalled();

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

    const header = screen.getByRole("button", { name: /section one/i });
    await userEvent.click(header);

    const liveRegion = screen.getByText(/section 1 of 2/i);
    expect(liveRegion).toBeInTheDocument();
  });

  it("opens targeted accordion item from section-nav event", async () => {
    renderAccordion({ id: "accordion-block" });

    act(() => {
      window.dispatchEvent(
        new CustomEvent("section-nav:navigate", {
          detail: { id: "section-2" },
        })
      );
    });

    expect(await screen.findByText(/Expanded section 2 of 2/i)).toBeInTheDocument();
  });

  it("opens first accordion item when section-nav targets the accordion block", async () => {
    renderAccordion({ id: "accordion-block" });

    // Move away from first item.
    const secondHeader = screen.getByRole("button", { name: /Section Two/i });
    secondHeader.focus();
    await userEvent.keyboard(" ");

    act(() => {
      window.dispatchEvent(
        new CustomEvent("section-nav:navigate", {
          detail: { id: "accordion-block" },
        })
      );
    });

    expect(await screen.findByText(/Expanded section 1 of 2/i)).toBeInTheDocument();
  });
});
