import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

/**
 * Creates a standard unit test suite for data-driven pages
 * that follow the SectionRenderer + StickySectionNav pattern.
 *
 * @param {object} config
 * @param {React.ComponentType} config.PageComponent
 * @param {Array} config.sections
 * @param {string} config.pageRoute
 * @param {string} config.pageName
 */
export function createPageTests({ PageComponent, sections, pageRoute, pageName }) {
  describe(`${pageName} page`, () => {
    it("restores scroll position on mount", async () => {
      const restoreScrollPosition = await import("navigation/restoreScrollPosition");

      const spy = vi.spyOn(restoreScrollPosition, "restoreScrollPosition");

      render(<PageComponent />);
      expect(spy).toHaveBeenCalled();
    });

    it("renders the correct number of sections", () => {
      const { container } = render(<PageComponent />);

      const renderedSections = container.querySelectorAll("[data-section-renderer]");

      expect(renderedSections.length).toBe(sections.length);
    });

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
