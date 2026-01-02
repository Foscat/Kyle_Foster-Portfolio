import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "components/ErrorBoundry";
import { ThemeProvider } from "assets/theme/ThemeContext";
import App from "./App";

import "./index.css";
import "./rsuite-no-reset.css";

console.log("🧠 Bootstrapping React app");

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container #root not found");
}

/**
 * Application entry point.
 *
 * Notes:
 * - We do not render <head> elements directly from React.
 * - Page metadata is managed via react-helmet-async in <Head />.
 */
createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);
