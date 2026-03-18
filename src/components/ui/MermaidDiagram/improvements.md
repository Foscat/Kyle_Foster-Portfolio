1. Theme-aware Mermaid diagrams (auto / light / dark)

You already standardized DiagramBlocks and export-to-PNG logic, so we’ll extend that system cleanly.

A. Diagram theme resolution strategy

Rules:

theme: "auto" → follows UI theme

theme: "dark" → always dark

theme: "light" → always light

We resolve the diagram theme at render time.

B. Central Mermaid config (single source of truth)

Create:

src/diagrams/mermaidTheme.js
/\*\*

- Mermaid theme generator
- ***
- Keeps diagrams visually aligned with frosted UI + brand colors
  \*/

export const getMermaidTheme = (mode = "dark") => {
const isDark = mode === "dark";

return {
theme: "base",
themeVariables: {
background: "transparent",

      primaryColor: isDark
        ? "rgba(37, 99, 235, 0.35)"   // blue depth
        : "rgba(212, 175, 55, 0.35)", // gold emphasis

      primaryTextColor: isDark ? "#e5e7eb" : "#1f2933",
      lineColor: isDark ? "#93c5fd" : "#b45309",

      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "14px",

      nodeBorder: isDark
        ? "rgba(147,197,253,0.5)"
        : "rgba(212,175,55,0.5)",

      clusterBkg: isDark
        ? "rgba(30,58,138,0.25)"
        : "rgba(255,215,128,0.25)",

      clusterBorder: "transparent",
    },

};
};

This ensures:

No Mermaid default colors

Full brand alignment

Transparent backgrounds (glass-safe)

C. Theme-aware Diagram component
src/components/DiagramBlock/index.jsx
import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { Panel } from "rsuite";
import { useTheme } from "../../theme/ThemeContext";
import { getMermaidTheme } from "../../diagrams/mermaidTheme";
import "./styles.css";

/\*\*

- DiagramBlock
- ***
- Renders a Mermaid diagram with theme-aware styling
- Supports auto/light/dark and export-to-PNG
  \*/
  const DiagramBlock = ({ title, description, mermaid: code, theme = "auto" }) => {
  const ref = useRef(null);
  const { resolvedTheme } = useTheme();

const finalTheme = theme === "auto" ? resolvedTheme : theme;

useEffect(() => {
mermaid.initialize({
startOnLoad: false,
...getMermaidTheme(finalTheme),
});

    if (ref.current) {
      mermaid.render(
        `diagram-${Math.random().toString(36).slice(2)}`,
        code,
        (svg) => {
          ref.current.innerHTML = svg;
        }
      );
    }

}, [code, finalTheme]);

return (
<Panel bordered className="diagram-panel frosted">
{title && <h4 className="diagram-title">{title}</h4>}
{description && <p className="diagram-description">{description}</p>}

      <div ref={ref} className="diagram-canvas" />
    </Panel>

);
};

export default DiagramBlock;

D. Mobile expand / collapse (already planned)

Add this CSS (minimal):

.diagram-panel {
position: relative;
}

.diagram-canvas {
overflow-x: auto;
}

@media (max-width: 640px) {
.diagram-canvas {
max-height: 320px;
overflow-y: auto;
}
}

You already wired export-to-PNG → this continues to work because Mermaid outputs SVG.

2. Per-theme gradient tuning (gold in light, blue depth in dark)

You already did 90% of the work with tokens. We’re just refining them.

A. Extend your CSS tokens (no new classes)
src/styles/tokens.css
/_ ============================================================
Brand Color Tokens
============================================================ _/

:root {
--blue-500: 37, 99, 235;
--blue-700: 30, 58, 138;

--gold-400: 212, 175, 55;
--gold-500: 184, 134, 11;
}

B. Theme-specific gradient tuning
Dark mode → blue depth
html[data-theme="dark"] {
--glass-bg: linear-gradient(
135deg,
rgba(var(--blue-700), 0.45),
rgba(var(--blue-500), 0.18)
);

--glass-border: rgba(var(--blue-500), 0.35);
--glass-glow: rgba(var(--blue-500), 0.45);
}

Light mode → gold emphasis
html[data-theme="light"] {
--glass-bg: linear-gradient(
135deg,
rgba(var(--gold-400), 0.35),
rgba(255, 255, 255, 0.85)
);

--glass-border: rgba(var(--gold-500), 0.45);
--glass-glow: rgba(var(--gold-400), 0.55);
}

C. One frosted class, no duplication

Your existing frosted components should already use:

.frosted {
background: var(--glass-bg);
border: 1px solid var(--glass-border);
box-shadow: 0 8px 32px var(--glass-glow);
backdrop-filter: blur(14px);
}

This now automatically adapts across:

Panels

Diagrams

Buttons

Cards

Modals

Result (what hiring managers will notice)

Without consciously realizing it, they’ll see:

Visual polish without gimmicks

Consistent system thinking

Accessibility-safe diagrams

Responsive technical storytelling

A design system that scales

This is lead frontend / senior React engineer work, not portfolio fluff.

---

Add Mermaid syntax validation

Add diagram snapshot tests

Auto-generate PNGs for docs + GitHub Pages

Add a diagram linter so this never breaks again

Centralize Mermaid config across your app

Create a Mermaid style guide for contributors

Add Mermaid lint rules

Auto-generate PNG/SVG during builds

Add zoom + minimap for huge diagrams
