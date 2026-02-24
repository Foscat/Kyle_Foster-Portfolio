import React, { useEffect, useRef, useMemo, useState } from "react";
import mermaid from "mermaid";
import * as htmlToImage from "html-to-image";
import { Panel } from "rsuite";
import "./Mermaid.css";
import { Size, Variant } from "types/ui.types";
import { faEye, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import Btn from "components/Btn";
import RichText from "components/RichText";
import userOnMobile from "assets/hooks/userOnMobile";

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
    "dark-mode": isDark,
    fontFamily: "Lexend Deca, system-ui, sans-serif",
    fontSize: "18px",
    background: "transparent",
    opacity: 1,
    primaryColor: isDark
      ? cssVar("--primary-light", "rgba(19,26,119,0.95)")
      : "rgba(245,245,247,0.95)",
    primaryBorderColor: cssVar("--accent", "#c9a227"),
    primaryTextColor: cssVar("--text-primary", "#ffffff"),

    secondaryColor: isDark ? cssVar("--dark", "rgb(15,15,15)") : "rgba(0,0,0,0.95)",
    secondaryBorderColor: cssVar("--text-secondary", "rgba(255,255,227,0.95)"),
    secondaryTextColor: cssVar("--text-primary", "#ffffff"),

    tertiaryColor: isDark ? cssVar("--primary-dark", "rgb(28,28,30)") : "#ffffff",
    tertiaryBorderColor: "transparent",
    tertiaryTextColor: cssVar("--text-primary", "rgba(255,255,255,0.85)"),

    noteBkgColor: isDark ? cssVar("--bg-gradient", "rgb(30,30,30)") : "#f9f9f9",
    noteBorderColor: cssVar("--accent-dark", "rgba(168,137,0,0.8)"),
    noteTextColor: cssVar("--text-primary", "rgba(255,255,255,0.85)"),
    lineColor: cssVar("--accent", "#c9a227"),
    textColor: cssVar("--text-primary", "rgba(0,0,0,0.85)"),

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
 * @param {string} props.id - DOM id assigned to the panel container, used as a scroll anchor and for accessibility.
 *
 * @param {string} props.diagram
 *   Mermaid diagram source string. Legacy property if `mobileDiagram` and/or `desktopDiagram` are not provided.
 *
 * @param {Object} props.mobileDiagram - Optional diagram configuration for mobile viewports.
 *
 * @param {Object} props.desktopDiagram - Optional diagram configuration for desktop viewports.
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
 * @param {string} [props.theme] - Visual theme for the diagram (e.g. "dark" or "light").
 *
 * @param {string} [props.icon]
 *
 * @param {string} [props.className]
 *   Additional CSS class names applied to the panel container.
 *
 * @returns {JSX.Element} Rendered Mermaid diagram panel.
 */
const MermaidDiagram = ({
  id,
  title = "",
  description = "",
  mobileDiagram = { diagram: "", description: "" },
  desktopDiagram = { diagram: "", description: "" },
  diagram = "",
  theme = "dark",
  className = "",
  icon,
}) => {
  const [forceAlt, setForceAlt] = useState(false);
  const hostRef = useRef(null);

  const themeVars = useMemo(() => buildMermaidThemeVariables(theme), [theme]);

  const isMobile = userOnMobile();
  const hasBoth = mobileDiagram?.diagram && desktopDiagram?.diagram;

  const baseDiagram = isMobile ? mobileDiagram : desktopDiagram;
  const altDiagram = isMobile ? desktopDiagram : mobileDiagram;

  const activeDiagram = forceAlt && hasBoth ? altDiagram : baseDiagram;

  const finalDiagram = activeDiagram?.diagram || diagram;
  const finalDescription = activeDiagram?.description || description;

  // console.log("Selected diagram based on viewport:", isMobile ? "mobile" : "desktop", {
  //   id,
  //   title,
  //   description,
  //   mobileDiagram,
  //   desktopDiagram,
  //   diagram,
  //   finalDiagram,
  //   finalDescription,
  // });

  function normalizeSvg(host) {
    const svgEl = host.querySelector("svg");
    if (!svgEl) return;

    svgEl.removeAttribute("height");
    svgEl.removeAttribute("width");
    svgEl.style.width = "100%";
    svgEl.style.height = "auto";
    svgEl.style.display = "block";
    svgEl.style.overflow = "visible";
  }

  /* ----------------------------------------------------------
     Initialize Mermaid
  ---------------------------------------------------------- */
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "base",
      themeVariables: themeVars,
      class: "my-diagram",
      altFontFamily: '"Heebo", sans-serif;',
      flowchart: {
        htmlLabels: false,
        curve: "natural",
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
    // console.log("FINAL DIAGRAM RAW >>>");
    // console.log(finalDiagram);
    // console.log("STRINGIFIED >>>");
    // console.log(JSON.stringify(finalDiagram));

    if (!finalDiagram || !hostRef.current) return;

    let cancelled = false;
    const host = hostRef.current;

    (async () => {
      try {
        const { svg } = await mermaid.render(
          `mermaid-${Math.random().toString(36).slice(2)}`,
          finalDiagram
        );

        if (cancelled) return;

        const existingSvg = host.querySelector("svg");

        // If no SVG exists yet, just inject
        if (!existingSvg) {
          host.innerHTML = svg;
          normalizeSvg(host);
          return;
        }

        // Fade out existing
        host.classList.add("fade-out");

        setTimeout(() => {
          if (cancelled) return;

          host.innerHTML = svg;
          normalizeSvg(host);

          // Fade in
          requestAnimationFrame(() => {
            host.classList.remove("fade-out");
          });
        }, 200); // match CSS duration
      } catch (err) {
        if (!cancelled) {
          console.error("Mermaid render failed:", err);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [finalDiagram, themeVars]);

  /* ----------------------------------------------------------
     Export PNG
  ---------------------------------------------------------- */
  const handleExport = async (downloadOther = false) => {
    if (!hostRef.current) return;

    try {
      if (downloadOther) {
        // Download the alternate diagram (mobile vs desktop)
      } else {
        const dataUrl = await htmlToImage.toPng(hostRef.current);
        const link = document.createElement("a");
        link.download = `${title || "diagram"}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error("Mermaid export failed:", err);
    }
  };

  return (
    <Panel
      defaultExpanded
      collapsible
      className={`frosted blue-tile block scroll-anchor mermaid-container ${theme} ${className}`}
      header={
        title && (
          <div className="flex-row">
            <span id={id} className="block-header">
              {title}
            </span>
          </div>
        )
      }
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
      </div>
      <div className="flex-row flex-se mt-2">
        <Btn
          size={Size.SM}
          icon={faFileDownload}
          onClick={handleExport}
          tooltip="Download diagram as PNG"
          aria-label="Export diagram as PNG"
          variant={Variant.ACCENT}
          text="Download diagram"
          className="mb-2 pl-4 pr-4"
        />
        {hasBoth && !isMobile ? (
          <Btn
            size={Size.SM}
            icon={faEye}
            onClick={() => setForceAlt((prev) => !prev)}
            tooltip="View alternate diagram version"
            aria-label={`View ${isMobile ? "desktop" : "mobile"} version`}
            variant={Variant.ACCENT}
            text={forceAlt ? `View desktop version` : "View mobile version"}
            className="mb-2 pl-4 pr-4"
          />
        ) : null}
      </div>
      {finalDescription && (
        <RichText className="mermaid-description" text={finalDescription} index={0} />
      )}
    </Panel>
  );
};

export default MermaidDiagram;
