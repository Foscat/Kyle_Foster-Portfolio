import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import * as htmlToImage from "html-to-image";
import { Panel } from "rsuite";
import Btn from "components/Btn";
import "./Mermaid.css";

/**
 * MermaidDiagram Component
 * ---------------------------------------------------------------------------
 * A reusable, UI-themed wrapper around Mermaid.js that renders diagrams with
 * full styling support for dark/light modes, mobile collapsible behavior, and
 * PNG export capabilities.
 *
 * FEATURES:
 * - Dark/Light theme variants matching the Midnight Gold UI.
 * - Fully responsive: collapses diagram on mobile for readability.
 * - Export to PNG using html-to-image (perfect for resumes & case studies).
 * - Frosted glass branding (glassBox wrapper).
 * - Keyboard accessible controls (export + expand/collapse).
 * - Screen reader-friendly with ARIA attributes.
 *
 * @component
 * @example
 * <MermaidDiagram
 *   title="Three-Panel Editor Flow"
 *   theme="dark"
 *   collapsible={true}
 *   chart={`
 *     flowchart LR
 *       A[Markdown] --> B[Editor]
 *       B --> C[Sandbox]
 *       C --> D[Output]
 *   `}
 * />
 *
 * @param {Object} props - Component properties.
 *
 * @param {string} props.chart
 *   Raw Mermaid code (flowchart, sequence diagram, class diagram, etc.).
 *   The component renders this string as a full SVG diagram.
 *
 * @param {string} [props.title]
 *   Optional title displayed above the diagram. Shown alongside control buttons.
 *
 * @param {"dark" | "light"} [props.theme="dark"]
 *   Color mode that applies the Midnight Gold UI theme.
 *   - "dark": golden highlights on frosted navy background
 *   - "light": softened navy outlines on frosted white
 *
 * @param {boolean} [props.collapsible=true]
 *   When true, the diagram can collapse/expand.
 *   Automatically collapses on mobile (<768px).
 *
 * @param {string} [props.className]
 *   Additional custom CSS classes appended to the wrapper.
 *
 * @returns {JSX.Element}
 *   A fully styled, interactive Mermaid diagram rendered inside a frosted
 *   glass UI wrapper with export and accessibility controls.
 */

/**
 *
 * @param {import("../../../types/ui.types".DiagramBlock)} props
 * @returns {React.Component}
 */
const MermaidDiagram = ({
  diagram = "",
  title = "",
  description = "",
  className = "",
  theme = "dark", // "dark" | "light"
  collapsible = true, // collapse on mobile
}) => {
  const ref = useRef(null);
  const containerRef = useRef(null);

  const [expanded, setExpanded] = useState(true);

  /** Mermaid rendering */
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "loose",
    });

    if (ref.current) {
      mermaid.contentLoaded();
    }
  }, [diagram]);

  /** Export diagram to PNG */
  const handleExport = async () => {
    if (!containerRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(containerRef.current);
      const link = document.createElement("a");
      link.download = `${title || "diagram"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  return (
    <Panel
      className={`glassBox mermaid-container ${theme} ${className}`}
      ref={containerRef}
      header={
        title && (
          <div className="mermaid-header text-center">
            <h3>{title}</h3>

            {/* Collapse toggle */}
            {collapsible && (
              <Btn
                className="mermaid-export-btn"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-label={expanded ? "Collapse diagram" : "Expand diagram"}
                icon={expanded ? "chevron-up" : "chevron-down"}
                size="lg"
                text={expanded ? "Collapse" : "Expand"}
              />
            )}

            {/* Export button */}
            <Btn
              className="mermaid-export-btn"
              onClick={handleExport}
              aria-label="Download diagram as PNG"
              icon="download"
              size="lg"
              text="Download PNG"
            />
          </div>
        )
      }
    >
      {/* Diagram Container */}
      <div
        className={`mermaid-diagram ${
          expanded ? "mermaid-expanded" : "mermaid-collapsed"
        }`}
      >
        <div
          className="mermaid"
          ref={ref}
        >
          {diagram}
        </div>
        {description && <p>{description}</p>}
      </div>
    </Panel>
  );
};

export default MermaidDiagram;
