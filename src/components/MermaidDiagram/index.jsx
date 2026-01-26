import React, { useEffect, useRef, useMemo } from "react";
import mermaid from "mermaid";
import * as htmlToImage from "html-to-image";
import { Panel } from "rsuite";
import "./Mermaid.css";

/**
 * @file index.jsx
 * @description Advanced Mermaid diagram renderer with theming, accessibility,
 * responsive layout, and PNG export support.
 * @module components/MermaidDiagram
 */

/* ------------------------------------------------------------
   Theme helpers
------------------------------------------------------------ */

/**
 * Resolves a CSS variable value from the document root with a fallback.
 *
 * @param {string} name - CSS variable name (e.g. "--accent").
 * @param {string} fallback - Fallback value if variable is unavailable.
 * @returns {string} Resolved CSS value.
 */
function cssVar(name, fallback) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name)?.trim();
  return v || fallback;
}

/**
 * Builds a Mermaid-compatible theme variable object based on the active UI theme.
 *
 * Design notes:
 * - Pulls from global CSS variables to stay visually in sync
 * - Avoids Mermaid auto-centering or transform overrides
 *
 * @param {"dark"|"light"} theme - Active theme mode.
 * @returns {Object} Mermaid themeVariables configuration.
 */
function buildMermaidThemeVariables(theme) {
  const isDark = theme === "dark";

  return {
    fontFamily: "Lexend Deca, system-ui, sans-serif",
    background: "transparent",

    primaryColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
    primaryBorderColor: cssVar("--accent", "#c9a227"),
    primaryTextColor: cssVar("--text-primary", "#ffffff"),

    secondaryColor: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.05)",
    secondaryBorderColor: cssVar("--accent-light", "#e6c767"),
    secondaryTextColor: cssVar("--text-primary", "#ffffff"),

    lineColor: cssVar("--accent-light", "#e6c767"),
    textColor: cssVar("--text-primary", "#ffffff"),

    nodeBorderRadius: 12,
  };
}

/**
 * MermaidDiagram
 * ---------------------------------------------------------------------------
 * Fully featured Mermaid diagram renderer with:
 * - Dark / light theme support
 * - Responsive SVG layout without forced transforms
 * - Accessible keyboard-focusable diagram container
 * - Optional description text
 * - PNG export capability
 *
 * Rendering strategy:
 * - Mermaid renders off-DOM into a controlled host element
 * - SVG dimensions are normalized for responsive scaling
 * - No automatic centering, zoom, or transforms are applied
 *
 * Accessibility:
 * - Diagram container uses `role="img"`
 * - Keyboard focus enabled via `tabIndex`
 * - ARIA label derived from title
 *
 * @public
 * @component
 *
 * @param {Object} props - Component props.
 *
 * @param {string} props.diagram
 *   Mermaid diagram source string.
 *
 * @param {string} [props.title]
 *   Optional title rendered in the panel header and used for accessibility.
 *
 * @param {string} [props.description]
 *   Optional descriptive text rendered beneath the diagram.
 *
 * @param {"dark"|"light"} [props.theme="dark"]
 *   Visual theme applied to Mermaid rendering.
 *
 * @param {string} [props.className]
 *   Additional CSS class names applied to the panel container.
 *
 * @returns {JSX.Element} Rendered Mermaid diagram panel.
 */
const MermaidDiagram = ({
  diagram = "",
  title = "",
  description = "",
  theme = "dark",
  className = "",
}) => {
  const hostRef = useRef(null);

  const themeVars = useMemo(() => buildMermaidThemeVariables(theme), [theme]);

  /* ----------------------------------------------------------
     Initialize Mermaid
  ---------------------------------------------------------- */
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "base",
      themeVariables: themeVars,
      flowchart: {
        htmlLabels: false,
      },
      sequence: {
        useMaxWidth: true,
      },
    });
  }, [themeVars]);

  /* ----------------------------------------------------------
     Off-DOM render (NO AUTO TRANSFORMS)
  ---------------------------------------------------------- */
  useEffect(() => {
    if (!diagram || !hostRef.current) return;

    let cancelled = false;
    const host = hostRef.current;

    // Cleanup
    host.innerHTML = "";

    (async () => {
      try {
        const { svg } = await mermaid.render(
          `mermaid-${Math.random().toString(36).slice(2)}`,
          diagram
        );

        if (cancelled) return;

        host.innerHTML = svg;

        const svgEl = host.querySelector("svg");
        if (!svgEl) return;

        // DO NOT touch transforms, fit, or center
        svgEl.removeAttribute("height");
        svgEl.removeAttribute("width");
        svgEl.style.width = "100%";
        svgEl.style.height = "auto";
        svgEl.style.display = "block";
        svgEl.style.overflow = "visible";
      } catch (err) {
        if (!cancelled) {
          console.error("Mermaid render failed:", err);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [diagram, themeVars]);

  /* ----------------------------------------------------------
     Export PNG
  ---------------------------------------------------------- */
  const handleExport = async () => {
    if (!hostRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(hostRef.current);
      const link = document.createElement("a");
      link.download = `${title || "diagram"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Mermaid export failed:", err);
    }
  };

  return (
    <Panel
      defaultExpanded
      collapsible
      className={`frosted mermaid-container ${theme} ${className}`}
      header={title && <span className="block-header">{title}</span>}
      role="region"
    >
      <div className="mermaid">
        <div
          ref={hostRef}
          className="mermaid-svg-host"
          tabIndex={0}
          role="img"
          aria-label={title || "Mermaid diagram"}
        />

        {description && <p className="text-center mermaid-description">{description}</p>}
      </div>
    </Panel>
  );
};

export default MermaidDiagram;
