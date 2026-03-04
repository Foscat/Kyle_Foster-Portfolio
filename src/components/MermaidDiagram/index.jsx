import React, { useEffect, useRef, useMemo, useState } from "react";
import mermaid from "mermaid";
import { Panel } from "rsuite";
import "./Mermaid.css";
import { Size, Variant } from "types/ui.types";
import { faEye, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import Btn from "components/Btn";
import RichText from "components/RichText";
import { useResponsive } from "assets/context/responsive/ResponsiveContext";

/**
 * @file index.jsx
 * @description MermaidDiagram component - renders responsive Mermaid diagrams with theme support and export functionality.
 * Design goals:
 * - Breakpoint-aware
 * - Orientation-aware
 * - Reduced motion aware
 * - Reduced transparency aware
 * - High contrast aware
 * - Smooth fade transitions
 * - SVG export support
 * @module components/MermaidDiagram
 * @see https://mermaid.js.org/ for Mermaid documentation and syntax reference.
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
 * @param {boolean} reducedMotion - Whether reduced motion is enabled.
 * @param {boolean} reducedTransparency - Whether reduced transparency is enabled.
 * @param {boolean} highContrast - Whether high contrast is enabled.
 * @returns {Object} Mermaid themeVariables configuration.
 */
function buildMermaidThemeVariables({ theme, reducedTransparency, highContrast }) {
  const isDark = theme === "dark";

  return `themeVariables = { "dark-mode": ${isDark},
    fontFamily: "Lexend Deca, system-ui, sans-serif",
    fontSize: "18px",
    background: "transparent",
    opacity: 1,

    primaryColor: ${
      isDark ? cssVar("--primary-dark-bg", "rgba(10,16,92,0.5)") : "rgba(245,245,247,0.95)"
    },

    primaryBorderColor: cssVar("--accent", "#c9a227"),
    primaryTextColor: ${isDark ? cssVar("--text-primary", "#F5F7FF") : "rgb(15,15,10)"},

    secondaryColor: ${isDark ? cssVar("--primary", "#131A77") : "rgb(200,200,255)"},

    secondaryBorderColor: ${
      highContrast ? "#F5F7FF" : cssVar("--text-secondary", "rgba(245,247,255,0.95)")
    },

    secondaryTextColor: ${isDark ? cssVar("--text-primary", "#F5F7FF") : "rgb(10,10,18)"},
    tertiaryColor: ${
      reducedTransparency
        ? "rgb(10,16,92)"
        : isDark
          ? cssVar("--primary-dark", "rgb(28,28,30, 0.85)")
          : "rgb(245, 247, 255)"
    },

    tertiaryBorderColor: "transparent",
    tertiaryTextColor: ${
      isDark ? cssVar("--text-primary", "rgba(245,247,255,0.85)") : "rgb(15, 15, 18)"
    },


    noteBkgColor: ${
      reducedTransparency
        ? "#000000"
        : isDark
          ? cssVar("--primary-darkest", "rgb(10,16,92)")
          : "#f9f9f9"
    },

    noteBorderColor: ${cssVar("--accent-dark", "rgba(201,162,39,0.8)")},
    noteTextColor: ${isDark ? cssVar("--text-primary", "rgba(245,247,255,0.85)") : "rgb(10,16,92)"},
    lineColor: ${cssVar("--accent", "#c9a227")},
    textColor: ${
      isDark ? cssVar("--text-primary", "rgba(245,247,255, 0.85)") : "rgba(15, 15, 18, 0.85)"
    },

    nodeBorderRadius: 12,}`;
}

/* ------------------------------------------------------------
   Inject Responsive Init Block
------------------------------------------------------------ */
function buildResponsiveInit({ breakpoint, orientation, reducedMotion }) {
  const isMobile = breakpoint === "mobile";

  const direction = isMobile && orientation === "portrait" ? "TB" : "LR";

  const nodeSpacing = isMobile ? 24 : 44;
  const rankSpacing = isMobile ? 36 : 56;

  return {
    direction,
    flowchart: {
      htmlLabels: false,
      curve: "natural",
      nodeSpacing: reducedMotion ? nodeSpacing - 8 : nodeSpacing,
      rankSpacing,
    },
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
}) => {
  const hostRef = useRef(null);
  const [forceAlt, setForceAlt] = useState(false);

  // Responsive context provides current breakpoint, orientation, and accessibility settings to enable dynamic diagram adjustments.
  const { breakpoint, orientation, reducedMotion, reducedTransparency, highContrast, isMobile } =
    useResponsive();

  // Determine which diagram configuration to use based on current breakpoint and user override. The `forceAlt` state allows toggling between mobile and desktop versions when both are available, regardless of actual viewport size.
  const hasBoth = mobileDiagram?.diagram && desktopDiagram?.diagram;

  // Base diagram is selected by default based on breakpoint, but can be overridden by user toggle if both versions are provided.
  const baseDiagram = isMobile ? mobileDiagram : desktopDiagram;
  const altDiagram = isMobile ? desktopDiagram : mobileDiagram;
  // If both diagrams are provided, allow user to toggle between them. Otherwise, fall back to the base diagram or the legacy `diagram` prop.
  const activeDiagram = forceAlt && hasBoth ? altDiagram : baseDiagram;
  // Final diagram source and description are determined by the active configuration, with fallbacks to legacy props for backward compatibility.
  const finalDiagram = activeDiagram?.diagram || diagram;
  const finalDescription = activeDiagram?.description || description;

  // Memoize theme variables to avoid unnecessary Mermaid re-initializations on every render. They only need to be recalculated when relevant theme or accessibility settings change.
  const themeVars = useMemo(
    () =>
      buildMermaidThemeVariables({
        theme,
        reducedMotion,
        reducedTransparency,
        highContrast,
      }),
    [theme, reducedMotion, reducedTransparency, highContrast]
  );

  console.log({ themeVars });

  // Build responsive Mermaid init configuration based on current breakpoint and orientation
  const responsiveInit = useMemo(
    () =>
      buildResponsiveInit({
        breakpoint,
        orientation,
        reducedMotion,
      }),
    [breakpoint, orientation, reducedMotion]
  );

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

  /**
   * Initialize Mermaid with custom theme variables and responsive settings.
   * This runs once on mount and whenever theme or responsive settings change to ensure Mermaid is configured correctly before rendering diagrams.
   * The `startOnLoad: false` option prevents Mermaid from auto-rendering any diagrams before we're ready.
   */
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "base",
      themeVariables: themeVars,
      flowchart: responsiveInit.flowchart,
    });
  }, [themeVars, responsiveInit]);

  /**
   * Render Mermaid diagram into host element whenever the diagram source or relevant settings change.
   * Includes a fade-out / fade-in transition for smooth updates.
   * Cancellations are handled to prevent state updates on unmounted components or after rapid changes.
   */
  useEffect(() => {
    if (!finalDiagram || !hostRef.current) return;

    let cancelled = false;
    const host = hostRef.current;

    (async () => {
      try {
        // Render Mermaid diagram off-DOM and retrieve the generated SVG string. A unique ID is used for each render to ensure a fresh output.
        const { svg } = await mermaid.render(
          `mermaid-${Math.random().toString(36).slice(2)}`,
          finalDiagram
        );

        if (cancelled) return;

        // Check if an existing SVG is present to determine whether to apply a fade transition. If no SVG exists (initial render), insert the new diagram immediately without animation.
        const existingSvg = host.querySelector("svg");
        // If no existing SVG, insert the new diagram immediately without animation
        if (!existingSvg) {
          host.innerHTML = svg;
          return;
        }

        // Apply fade-out class to trigger CSS transition. The .fade-out class should be defined in Mermaid.css with a transition on opacity.
        host.classList.add("fade-out");

        // Wait for the fade-out transition to complete before updating the diagram. The timeout duration should match the CSS transition duration defined in Mermaid.css for the .fade-out class.
        setTimeout(() => {
          if (cancelled) return;
          host.innerHTML = svg;
          requestAnimationFrame(() => {
            host.classList.remove("fade-out");
          });
        }, 200);
      } catch (err) {
        if (!cancelled) {
          console.error("Mermaid render failed:", err);
        }
      }
    })();

    // Cleanup function to handle component unmounting or rapid updates. Sets a cancellation flag to prevent state updates after unmounting or if the diagram source changes before the previous render completes.
    return () => {
      cancelled = true;
    };
  }, [finalDiagram, breakpoint, orientation, reducedMotion, reducedTransparency, highContrast]);

  /**
   * Export the current diagram as an SVG file.
   * @returns {Promise<void>}
   */
  const handleExport = async () => {
    if (!hostRef.current) return;
    const svg = hostRef.current.querySelector("svg");
    if (!svg) return;

    // Serialize the SVG element to a string, create a Blob from it, and trigger a download using a temporary anchor element. The filename is derived from the title prop or defaults to "diagram.svg".
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${title || "diagram"}.svg`;
    link.click();

    URL.revokeObjectURL(url);
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
            aria-label={`View ${forceAlt ? "desktop" : "mobile"} version`}
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
