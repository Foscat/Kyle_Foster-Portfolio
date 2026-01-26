import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CustomProvider } from "rsuite";

import { ThemeProvider } from "assets/theme/ThemeContext";

/**
 * Render helper that wraps a component with the same app-level providers.
 *
 * @param {React.ReactElement} ui - Component under test.
 * @param {object} [options]
 * @param {string[]} [options.initialEntries=["/"]] - Initial router entries.
 * @param {"light"|"dark"} [options.rsuiteTheme="dark"] - RSuite theme for CustomProvider.
 * @returns {RenderResult}
 */
export function renderWithProviders(ui, { initialEntries = ["/"], rsuiteTheme = "dark" } = {}) {
  return render(
    <HelmetProvider>
      <ThemeProvider>
        <CustomProvider theme={rsuiteTheme}>
          <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
        </CustomProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default renderWithProviders;
