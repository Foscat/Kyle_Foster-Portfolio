import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import renderWithProviders from "tests/renderWithProviders";
import { useResponsive } from "./ResponsiveContext";

/**
 * @file ResponsiveProvider.test.jsx
 * @description Test suite for the ResponsiveProvider component, which provides responsive design context to the app. This test file includes unit tests that verify the correct behavior of the responsive context, including breakpoint detection, orientation changes, and syncing of CSS variables for spacing. The tests use a mock implementation of window.matchMedia to simulate different viewport sizes and orientations, allowing us to validate that the ResponsiveProvider correctly updates its context values and that consuming components receive the expected responsive information. By ensuring that the ResponsiveProvider functions correctly, we can maintain a consistent responsive design across the app and ensure that components can adapt their layout and styling based on the current viewport characteristics.
 * The test suite includes the following tests:
 * - Provides desktop responsive state by default: Verifies that the ResponsiveProvider correctly identifies the default breakpoint and orientation when rendered in a desktop viewport.
 * - Updates breakpoint state after a resize event: Simulates a window resize event and checks that the ResponsiveProvider updates its breakpoint state accordingly.
 * - Syncs spacing CSS variables for the active breakpoint tier: Ensures that when the breakpoint changes, the ResponsiveProvider updates the corresponding CSS variables for spacing based on the theme configuration. This test validates that the dynamic theming and responsive spacing functionality works as intended.
 * By covering these scenarios, we can have confidence that the ResponsiveProvider is correctly providing responsive context to the app and that components consuming this context will receive accurate information about the current viewport size and device characteristics. This is crucial for implementing responsive design patterns and ensuring a good user experience across different devices and screen sizes.
 * @note The tests in this suite rely on a mock implementation of window.matchMedia to simulate different viewport conditions. This allows us to test the responsive behavior of the provider without needing to run the tests in an actual browser environment with varying screen sizes. The mock implementation is set up in the beforeEach hook and restored after each test to ensure isolation between tests.
 *
 */

/**
 * @function ResponsiveProbe
 * @description A test component that consumes the ResponsiveContext and renders output elements for the breakpoint, orientation, and reduced motion values. This component is used in the test suite to verify that the ResponsiveProvider is correctly providing responsive context values to its consumers. By rendering the context values in output elements with specific aria-labels, we can easily query and assert their content in our tests to validate that the responsive state is being updated correctly based on simulated window events.
 * @returns {JSX.Element} The rendered output elements displaying the responsive context values.
 */
function ResponsiveProbe() {
  const responsive = useResponsive();

  return (
    <div>
      <output aria-label="breakpoint">{responsive.breakpoint}</output>
      <output aria-label="orientation">{responsive.orientation}</output>
      <output aria-label="reduced-motion">{String(responsive.reducedMotion)}</output>
    </div>
  );
}

// Mock implementation of window.matchMedia to simulate different viewport conditions in tests. This allows us to test the responsive behavior of the provider without needing to run the tests in an actual browser environment with varying screen sizes. The mock is set up in the beforeEach hook and restored after each test to ensure isolation between tests.
describe("ResponsiveProvider", () => {
  let matchMediaMock;
  let listenersByQuery;

  beforeEach(() => {
    listenersByQuery = new Map();
    window.innerWidth = 1440;

    matchMediaMock = vi.fn((query) => {
      const entry = {
        matches: false,
        media: query,
        onchange: null,
        addListener: (listener) => listenersByQuery.get(query).add(listener),
        removeListener: (listener) => listenersByQuery.get(query).delete(listener),
        addEventListener: (_event, listener) => listenersByQuery.get(query).add(listener),
        removeEventListener: (_event, listener) => listenersByQuery.get(query).delete(listener),
        dispatchEvent: () => true,
      };

      if (!listenersByQuery.has(query)) {
        listenersByQuery.set(query, new Set());
      }

      if (query === "(orientation: portrait)") {
        entry.matches = false;
      }

      if (query === "(prefers-reduced-motion: reduce)") {
        entry.matches = false;
      }

      return entry;
    });

    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("provides desktop responsive state by default", async () => {
    renderWithProviders(<ResponsiveProbe />);

    await waitFor(() => {
      expect(screen.getByLabelText(/breakpoint/i)).toHaveTextContent("desktop");
      expect(screen.getByLabelText(/orientation/i)).toHaveTextContent("landscape");
    });
  });

  it("updates breakpoint state after a resize event", async () => {
    renderWithProviders(<ResponsiveProbe />);

    window.innerWidth = 640;
    window.dispatchEvent(new Event("resize"));

    await waitFor(() => {
      expect(screen.getByLabelText(/breakpoint/i)).toHaveTextContent("mobile");
    });
  });

  it("syncs spacing CSS variables for the active breakpoint tier", async () => {
    renderWithProviders(<ResponsiveProbe />);

    window.innerWidth = 900;
    window.dispatchEvent(new Event("resize"));

    await waitFor(() => {
      expect(document.documentElement.style.getPropertyValue("--spacing-section")).toBe("2rem");
      expect(document.documentElement.style.getPropertyValue("--spacing-gutter")).toBe("1.5rem");
    });
  });
});
