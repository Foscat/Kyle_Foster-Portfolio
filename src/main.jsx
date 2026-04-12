/**
 * @module src\main
 * @file main.jsx
 * @fileoverview Entry point for the React application. This file is responsible for bootstrapping the app, setting up global providers (such as Theme and Responsive contexts), and rendering the root component into the DOM. It also includes error handling via an ErrorBoundary and sets up HelmetProvider for managing document head changes.
 *
 * Key responsibilities:
 * - Importing necessary libraries and stylesheets
 * - Setting up global context providers for theme and responsiveness
 * - Wrapping the application in an ErrorBoundary to catch and display errors gracefully
 * - Rendering the root App component within the BrowserRouter for client-side routing
 * - Applying global CSS styles and a custom click animation library for enhanced interactivity
 *
 * @author Foscat
 */

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import ErrorBoundary from "assets/context/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "assets/context/ThemeContext.jsx";
import { ResponsiveProvider } from "assets/context/responsive/ResponsiveProvider.jsx";
import { installChunkLoadRecovery } from "assets/chunkLoadRecovery.js";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";
// Reset
import "./index.css";
// RSuite default styles
import "rsuite/dist/rsuite.min.css";

installChunkLoadRecovery();

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container #root not found");
}

/**
 * @description Renders the root component of the application into the DOM, wrapped with necessary context providers and error handling. This setup ensures that the entire app has access to theme and responsive contexts, while also providing a mechanism to catch and display errors gracefully without crashing the entire app.
 */
createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ResponsiveProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ResponsiveProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);

const endpointFromEnv = import.meta.env.VITE_WEB_VITALS_ENDPOINT;
const webVitalsEndpoint = typeof endpointFromEnv === "string" ? endpointFromEnv.trim() : "";
const shouldLogVitals = import.meta.env.DEV;
const shouldSendVitals = import.meta.env.PROD && webVitalsEndpoint.length > 0;
const shouldInitVitals = shouldLogVitals || shouldSendVitals;

if (shouldInitVitals) {
  reportWebVitals((metric) => {
    try {
      if (!metric || typeof metric !== "object") return;

      if (shouldLogVitals) {
        console.debug("[web-vitals]", metric.name, metric.value, metric);
      }

      if (!shouldSendVitals) return;

      const payload = JSON.stringify({
        ...metric,
        path: window.location.pathname,
        timestamp: Date.now(),
      });

      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon(webVitalsEndpoint, blob);
        return;
      }

      if (typeof fetch === "function") {
        fetch(webVitalsEndpoint, {
          method: "POST",
          body: payload,
          headers: { "Content-Type": "application/json" },
          keepalive: true,
        }).catch(() => {
          // Ignore reporting errors to avoid affecting app UX.
        });
      }
    } catch {
      // Never allow vitals reporting to break app execution.
    }
  });
}
