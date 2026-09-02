/**
 * @file src/tests/renderWithAppProviders.jsx
 * @description Render helper for components that already own the router (e.g. App).
 * @module src/tests/renderWithAppProviders
 */

import React from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

import { ThemeProvider } from "assets/context/ThemeContext";
import { ResponsiveProvider } from "assets/context/responsive/ResponsiveProvider";

/**
 * Renders a component tree with app-level providers, excluding router wrappers.
 *
 * @param {React.ReactElement} ui - Component under test.
 * @returns {object} Testing Library render result.
 */
export default function renderWithAppProviders(ui) {
  return render(
    <HelmetProvider>
      <ResponsiveProvider>
        <ThemeProvider>
          {ui}
        </ThemeProvider>
      </ResponsiveProvider>
    </HelmetProvider>
  );
}
