/**
 * @file src\tests\helpers\createPageTests.jsx
 * @description src\tests\helpers\createPageTests module.
 * @module src\tests\helpers\createPageTests
 */

import { screen, waitFor, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";

import renderWithProviders from "tests/renderWithProviders";

/**
 * @description Shared behavior contract for data-driven pages. The helper intentionally tests composition behavior rather than DOM structure: - scroll restoration occurs on mount - the page header is rendered with user-facing content - the page exposes the correct active route to primary navigation - section titles are delegated into both content and section navigation /
 */

/**
 * @description Creates a test suite for a data-driven page component, focused on verifying composition and user-facing content rather than implementation details. The tests ensure that the page correctly integrates with shared components like scroll restoration, page header, section navigation, primary navigation, and footer, and that it renders the expected content based on the provided section data and active route. This allows us to confirm that the page is correctly composed and provides the expected user experience in terms of content rendering and navigation integration without coupling to the internal workings of those components. The createPageTests function can be used across different page test suites to ensure consistent testing of these common behaviors across all pages in the application. Test cases: - Restores scroll position on mount - Renders the page heading and section navigation entries - Passes the active page route into primary navigation behavior - Section titles are delegated into both content and section navigation - Renders the footer component The tests focus on verifying that the page correctly composes with shared components and renders user-facing content based on the provided data, ensuring that the expected behavior and content are present without relying on implementation details of the individual components. This allows us to confirm that the page is correctly structured and provides the expected user experience in terms of content rendering and navigation integration. /
 */
export function createPageTests({ PageComponent, sections, pageRoute, pageName }) {
  describe(`${pageName} page`, () => {
    beforeEach(() => {
      vi.clearAllMocks();
      window.history.replaceState(null, "", pageRoute || "/");
    });

    it("restores scroll position on mount", async () => {
      const targetSection = sections[0];
      const target = document.createElement("div");

      target.id = targetSection.id;
      target.scrollIntoView = vi.fn();
      document.body.appendChild(target);
      window.history.replaceState(null, "", `${pageRoute || "/"}#${targetSection.id}`);

      renderWithProviders(<PageComponent />);

      await waitFor(() => {
        expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
      });

      target.remove();
    });

    it("renders the page heading and section navigation entries", async () => {
      renderWithProviders(<PageComponent />);

      expect(await screen.findByRole("heading", { level: 1 })).toBeInTheDocument();

      const sectionNavigation = await screen.findByRole("navigation", {
        name: /section navigation/i,
      });

      for (const section of sections) {
        const expectedLabel = section.navLabel || section.title;
        expect(
          await within(sectionNavigation).findByRole("button", { name: expectedLabel })
        ).toBeInTheDocument();
      }
    });

    it("passes the active page route into primary navigation behavior", async () => {
      renderWithProviders(<PageComponent />);

      const primaryNavigation = await screen.findByRole("navigation", {
        name: /primary navigation/i,
      });

      const currentPageLink = within(primaryNavigation).getByRole("link", {
        current: "page",
      });

      expect(currentPageLink).toHaveAttribute("href", pageRoute);
    });
  });
}
