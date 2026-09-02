/**
 * @file src/tests/renderWithProviders.jsx
 * @description src/tests/renderWithProviders module.
 * @module src/tests/renderWithProviders
 */

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";

import { ThemeProvider } from "assets/context/ThemeContext";
import { ResponsiveProvider } from "assets/context/responsive/ResponsiveProvider";

/**
 * Render helper that mirrors the real app provider stack closely enough for
 * behavior-driven component tests.
 *
 * Why this exists:
 * - Many components depend on router context.
 * - Theme-aware components require ThemeProvider.
 * - Responsive logic depends on ResponsiveProvider being present.
 * - Helmet-managed document metadata requires HelmetProvider.
 *
 * Tests should prefer this helper over raw `render()` whenever the component
 * under test consumes application context.
 *
 * @param {React.ReactElement} ui - Component under test.
 * @param {object} [options]
 * @param {string[]} [options.initialEntries=["/"]] - Initial router entries.
 * @returns {RenderResult}
 */
export function renderWithProviders(ui, { initialEntries = ["/"] } = {}) {
  return render(
    <HelmetProvider>
      <ResponsiveProvider>
        <ThemeProvider>
          <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
        </ThemeProvider>
      </ResponsiveProvider>
    </HelmetProvider>
  );
}

export default renderWithProviders;
