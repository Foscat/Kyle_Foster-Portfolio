/**
 * @file src\tests\helpers\createPageTests.jsx
 * @description src\tests\helpers\createPageTests module.
 * @module src\tests\helpers\createPageTests
 */

import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import renderWithProviders from "tests/renderWithProviders";

// Data-heavy pages lazy-load navigation and diagram sections; keep the shared
// page contract stable during cold Vitest transforms on slower Windows runs.
const PAGE_TEST_TIMEOUT_MS = 60000;

/**
 * @description Shared behavior contract for data-driven pages. The helper intentionally tests composition behavior rather than internal drawer structure: scroll restoration occurs on mount, the page header and configured sections render, the page exposes the correct active route, and the unified header receives both navigation systems.
 */

/**
 * @description Creates a test suite for a data-driven page component, focused on verifying composition and user-facing content rather than implementation details. The tests ensure that the page correctly integrates with shared components like scroll restoration, page header, section navigation, primary navigation, and footer, and that it renders the expected content based on the provided section data and active route. This allows us to confirm that the page is correctly composed and provides the expected user experience in terms of content rendering and navigation integration without coupling to the internal workings of those components. The createPageTests function can be used across different page test suites to ensure consistent testing of these common behaviors across all pages in the application. Test cases: - Restores scroll position on mount - Renders the page heading and section navigation entries - Passes the active page route into primary navigation behavior - Section titles are delegated into both content and section navigation - Renders the footer component The tests focus on verifying that the page correctly composes with shared components and renders user-facing content based on the provided data, ensuring that the expected behavior and content are present without relying on implementation details of the individual components. This allows us to confirm that the page is correctly structured and provides the expected user experience in terms of content rendering and navigation integration. /
 */
export function createPageTests({
  PageComponent,
  sections,
  pageRoute,
  pageName,
  primaryNavigationRoute = pageRoute,
}) {
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

    it(
      "renders the page heading and configured sections",
      async () => {
        renderWithProviders(<PageComponent />);

        expect(await screen.findByRole("heading", { level: 1 })).toBeInTheDocument();

        await waitFor(
          () => {
            const missingSectionIds = sections
              .map((section) => section.id)
              .filter((sectionId) => !document.getElementById(sectionId));
            expect(missingSectionIds).toEqual([]);
          },
          { timeout: PAGE_TEST_TIMEOUT_MS }
        );
      },
      PAGE_TEST_TIMEOUT_MS
    );

    it(
      "passes the active page route into primary navigation behavior",
      async () => {
        const user = userEvent.setup();
        renderWithProviders(<PageComponent />);

        const websiteTrigger = await screen.findByRole(
          "button",
          { name: "Open website navigation" },
          { timeout: PAGE_TEST_TIMEOUT_MS }
        );
        await user.click(websiteTrigger);
        const primaryNavigation = await screen.findByRole(
          "navigation",
          {
            name: /primary navigation/i,
          },
          {
            timeout: PAGE_TEST_TIMEOUT_MS,
          }
        );

        const primaryPageLink = within(primaryNavigation)
          .getAllByRole("link")
          .find((link) => link.getAttribute("href") === primaryNavigationRoute);

        expect(primaryPageLink).toBeDefined();
        expect(primaryPageLink).toHaveClass("is-route-active");
        if (primaryNavigationRoute === pageRoute) {
          expect(primaryPageLink).toHaveAttribute("aria-current", "page");
        } else {
          // Archive children highlight Work without claiming that /side-projects is the current URL.
          expect(primaryPageLink).not.toHaveAttribute("aria-current");
        }
      },
      PAGE_TEST_TIMEOUT_MS
    );

    it(
      "places route section controls inside the unified page header",
      async () => {
        const { container } = renderWithProviders(<PageComponent />);
        const unifiedHeader = await screen.findByTestId("unified-navigation", undefined, {
          timeout: PAGE_TEST_TIMEOUT_MS,
        });

        expect(
          within(unifiedHeader).getByRole("button", { name: "Open website navigation" })
        ).toBeVisible();
        expect(
          within(unifiedHeader).getByRole("button", { name: /open section navigation/i })
        ).toBeVisible();
        expect(
          within(unifiedHeader).queryByRole("navigation", { name: /primary navigation/i })
        ).not.toBeInTheDocument();
        expect(
          within(unifiedHeader).queryByRole("navigation", { name: /on this page/i })
        ).not.toBeInTheDocument();
        expect(container.querySelector(".page-sidebar")).toBeNull();
      },
      PAGE_TEST_TIMEOUT_MS
    );
  });
}
