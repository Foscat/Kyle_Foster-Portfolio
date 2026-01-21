import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import ErrorBoundary from "components/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "assets/theme/ThemeContext";
import App from "./App.jsx";
import "./index.css";
import "rsuite/dist/rsuite.min.css";
import "components/MermaidDiagram/Mermaid.css";

console.log("🧠 Bootstrapping React app");

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container #root not found");
}

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
