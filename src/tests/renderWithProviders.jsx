import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CustomProvider } from "rsuite";

import { ThemeProvider } from "assets/context/ThemeContext";
import { ResponsiveProvider } from "assets/context/responsive/ResponsiveProvider";

/**
 * Render helper that mirrors the real app provider stack closely enough for
 * behavior-driven component tests.
 *
 * Why this exists:
 * - Many components depend on router context.
 * - Theme-aware components require ThemeProvider + RSuite CustomProvider.
 * - Responsive logic depends on ResponsiveProvider being present.
 * - Helmet-managed document metadata requires HelmetProvider.
 *
 * Tests should prefer this helper over raw `render()` whenever the component
 * under test consumes application context.
 *
 * @param {React.ReactElement} ui - Component under test.
 * @param {object} [options]
 * @param {string[]} [options.initialEntries=["/"]] - Initial router entries.
 * @param {"light"|"dark"} [options.rsuiteTheme="dark"] - RSuite theme.
 * @returns {RenderResult}
 */
export function renderWithProviders(ui, { initialEntries = ["/"], rsuiteTheme = "dark" } = {}) {
  return render(
    <HelmetProvider>
      <ThemeProvider>
        <ResponsiveProvider>
          <CustomProvider theme={rsuiteTheme}>
            <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
          </CustomProvider>
        </ResponsiveProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default renderWithProviders;
