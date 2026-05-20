/**
 * @file src/tests/renderWithAppProviders.jsx
 * @description Render helper for components that already own the router (e.g. App).
 * @module src/tests/renderWithAppProviders
 */

import React from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { CustomProvider } from "rsuite";

import { ThemeProvider } from "assets/context/ThemeContext";
import { ResponsiveProvider } from "assets/context/responsive/ResponsiveProvider";

/**
 * Renders a component tree with app-level providers, excluding router wrappers.
 *
 * @param {React.ReactElement} ui - Component under test.
 * @param {object} [options]
 * @param {"light"|"dark"} [options.rsuiteTheme="dark"] - RSuite theme.
 * @returns {import("@testing-library/react").RenderResult}
 */
export default function renderWithAppProviders(ui, { rsuiteTheme = "dark" } = {}) {
  return render(
    <HelmetProvider>
      <ResponsiveProvider>
        <ThemeProvider>
          <CustomProvider theme={rsuiteTheme}>{ui}</CustomProvider>
        </ThemeProvider>
      </ResponsiveProvider>
    </HelmetProvider>
  );
}
