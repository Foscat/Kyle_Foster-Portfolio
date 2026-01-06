import { createRoot } from "react-dom/client";
import "./index.css";
import "./rsuite-no-reset.css";
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
