import { render } from "@testing-library/react";
import renderWithProviders from "tests/renderWithProviders";
import { describe, it, expect, vi } from "vitest";

/**
 * @file createPageTests.js
 * @description Shared test factory for page-level components that follow
 * the SectionRenderer + StickySectionNav architecture.
 * @module tests/helpers/createPageTests
 */

/**
 * createPageTests
 * ---------------------------------------------------------------------------
 * Factory function that generates a standardized test suite for
 * data-driven pages.
 *
 * Pages using this helper are expected to:
 * - Render a PageHeader
 * - Render one or more SectionRenderer instances
 * - Include StickyNav and StickySectionNav
 * - Restore scroll position on mount
 *
 * This abstraction:
 * - Enforces consistent behavior across all pages
 * - Eliminates duplicated boilerplate in page test files
 * - Treats page tests as declarative configuration rather than imperative logic
 *
 * @param {Object} config - Page test configuration.
 *
 * @param {React.ComponentType} config.PageComponent
 *   The page component under test.
 *
 * @param {Array} config.sections
 *   Section configuration used to determine expected section count.
 *
 * @param {string} config.pageRoute
 *   Route constant expected to be passed to StickyNav as `activePage`.
 *
 * @param {string} config.pageName
 *   Human-readable page name used for test descriptions.
 *
 * @returns {void}
 */
export function createPageTests({ PageComponent, sections, pageRoute, pageName }) {
  describe(`${pageName} page`, () => {
    /**
     * Verifies that the page restores scroll position on mount.
     * This guards against regressions in navigation history behavior.
     */
    it("restores scroll position on mount", async () => {
      const restoreScrollPosition = await import("navigation/restoreScrollPosition");

      const spy = vi.spyOn(restoreScrollPosition, "restoreScrollPosition");

      renderWithProviders(<PageComponent />);
      expect(spy).toHaveBeenCalled();
    });

    /**
     * Verifies that the page renders the expected number of sections
     * based on the provided section configuration.
     */
    it("renders the correct number of sections", () => {
      const { container } = render(<PageComponent />);

      const renderedSections = container.querySelectorAll(sections);

      expect(renderedSections.length).toBe(sections.length);
    });

    /**
     * Verifies that the page passes the correct active route
     * to the StickyNav component.
     */
    it("passes correct activePage to StickyNav", () => {
      const StickyNav = require("components/StickyNav").default;
      const spy = vi.spyOn(StickyNav, "default" ?? StickyNav);

      render(<PageComponent />);

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ activePage: pageRoute }),
        expect.anything()
      );
    });
  });
}

/* ------------------------------------------------------------------
 * Global mocks
 * ------------------------------------------------------------------
 * These mocks ensure page tests focus on page-level behavior
 * rather than component internals.
 */

vi.mock("components/SectionRenderer", () => ({
  default: () => <div data-section-renderer />,
}));

vi.mock("components/StickySectionNav", () => ({
  default: () => <aside />,
}));

vi.mock("components/StickyNav", () => ({
  default: () => <nav />,
}));

vi.mock("components/PageHeader", () => ({
  default: () => <header />,
}));

vi.mock("components/Footer", () => ({
  default: () => <footer />,
}));
