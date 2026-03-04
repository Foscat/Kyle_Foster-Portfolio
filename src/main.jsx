import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import ErrorBoundary from "assets/context/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "assets/context/ThemeContext.jsx";
import App from "./App.jsx";
import "./index.css";
import "rsuite/dist/rsuite.min.css";
import "components/MermaidDiagram/Mermaid.css";
import { ResponsiveProvider } from "assets/context/responsive/ResponsiveProvider.jsx";

console.log("🧠 Bootstrapping React app");

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container #root not found");
}

/**
 * Render the React application
 * The app is wrapped in several providers:
 * - ErrorBoundary: Catches JavaScript errors anywhere in the child component tree and displays a fallback UI.
 * - HelmetProvider: Manages changes to the document head, allowing dynamic updates to title, meta tags, etc.
 * - ResponsiveProvider: Provides responsive design context (breakpoints, orientation) to the app.
 * - ThemeProvider: Manages theming (light/dark mode) across the app.
 * This setup ensures that the app is robust, SEO-friendly, and responsive to different screen sizes and orientations.
 * @returns {ReactNode} The root React component tree rendered into the DOM
 * @throws Will throw an error if the root container is not found in the DOM
 * @example
 * createRoot(document.getElementById("root")).render(
 *   <StrictMode>
 *     <ErrorBoundary>
 *      <HelmetProvider>
 *       <ResponsiveProvider>
 *        <ThemeProvider>
 *        <App />
 *       </ThemeProvider>
 *      </ResponsiveProvider>
 *     </HelmetProvider>
 *   </ErrorBoundary>
 * </StrictMode>
 *
 * Note: Ensure that the root container with id "root" exists in your HTML file for this to work correctly.
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
