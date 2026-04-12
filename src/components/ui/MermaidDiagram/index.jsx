/**
 * @file src\components\ui\MermaidDiagram\index.jsx
 * @description src\components\ui\MermaidDiagram\index module.
 * @module src\components\ui\MermaidDiagram\index
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Modal, Panel } from "rsuite";
import { faExpand, faEye, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { Size, Theme, Variant } from "types/ui.types";
import { RichText } from "components/renderers";
import { Btn } from "components/ui";
import "./Mermaid.css";
import { useResponsive } from "assets/context/responsive/ResponsiveContext";
import { useTheme } from "assets/context/ThemeContext.jsx";
import { applyPaletteToDiagramSource } from "./paletteTransform";

let mermaidInstancePromise;
let mermaidInitialized = false;
const EXPORT_PADDING_PX = 24;
const EXPORT_PIXEL_RATIO = 2;

function getMermaidInstance() {
  if (!mermaidInstancePromise) {
    mermaidInstancePromise = import("mermaid").then((mod) => mod.default || mod);
  }

  return mermaidInstancePromise;
}

function parseNumericDimension(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;

  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getSvgIntrinsicSize(svg) {
  if (!svg) {
    return { width: 0, height: 0 };
  }

  const viewBox = svg.viewBox?.baseVal;
  if (viewBox && viewBox.width > 0 && viewBox.height > 0) {
    return { width: viewBox.width, height: viewBox.height };
  }

  const widthAttr = parseNumericDimension(svg.getAttribute("width"));
  const heightAttr = parseNumericDimension(svg.getAttribute("height"));
  if (widthAttr && heightAttr) {
    return { width: widthAttr, height: heightAttr };
  }

  const bounds = svg.getBoundingClientRect();
  return {
    width: bounds.width || 0,
    height: bounds.height || 0,
  };
}

function normalizeRenderedSvg(host) {
  if (!host) return;

  const svg = host.querySelector("svg");
  if (!svg) return;

  svg.removeAttribute("height");
  svg.style.width = "100%";
  svg.style.maxWidth = "100%";
  svg.style.height = "auto";
  svg.style.maxHeight = "none";
  svg.style.display = "block";
  svg.style.overflow = "visible";
}

function buildExportNode(svg, theme) {
  const { width: intrinsicWidth, height: intrinsicHeight } = getSvgIntrinsicSize(svg);
  const exportWidth = Math.max(1, Math.ceil(intrinsicWidth + EXPORT_PADDING_PX * 2));
  const exportHeight = Math.max(1, Math.ceil(intrinsicHeight + EXPORT_PADDING_PX * 2));
  const rootStyles =
    typeof window !== "undefined" ? window.getComputedStyle(document.documentElement) : null;
  const exportBackground =
    rootStyles?.getPropertyValue(theme === Theme.LIGHT ? "--bg-bright" : "--bg-primary")?.trim() ||
    (theme === Theme.LIGHT ? "#f4f6fb" : "#0f0f12");
  const exportSvg = svg.cloneNode(true);
  const viewBox = svg.getAttribute("viewBox");
  const svgWidth = Math.max(1, Math.ceil(intrinsicWidth));
  const svgHeight = Math.max(1, Math.ceil(intrinsicHeight));

  exportSvg.setAttribute("width", String(svgWidth));
  exportSvg.setAttribute("height", String(svgHeight));
  if (!viewBox) {
    exportSvg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
  }
  exportSvg.style.width = `${svgWidth}px`;
  exportSvg.style.height = `${svgHeight}px`;
  exportSvg.style.maxWidth = "none";
  exportSvg.style.maxHeight = "none";
  exportSvg.style.display = "block";
  exportSvg.style.overflow = "visible";

  const exportNode = document.createElement("div");
  exportNode.style.position = "fixed";
  exportNode.style.left = "-10000px";
  exportNode.style.top = "0";
  exportNode.style.width = `${exportWidth}px`;
  exportNode.style.height = `${exportHeight}px`;
  exportNode.style.padding = `${EXPORT_PADDING_PX}px`;
  exportNode.style.margin = "0";
  exportNode.style.boxSizing = "border-box";
  exportNode.style.backgroundColor = exportBackground;
  exportNode.style.overflow = "visible";
  exportNode.appendChild(exportSvg);

  return { exportNode, exportWidth, exportHeight, exportBackground };
}

/**
 * @file index.jsx
 * @fileoverview Fully featured Mermaid diagram renderer with dark/light theme support, responsive SVG layout, accessible container, optional description, and PNG export capability. The component normalizes props to support both legacy and new diagram configurations, allowing for flexible integration while maintaining a consistent internal state structure for rendering.
 * @module components/MermaidDiagram
 * @see https://mermaid.js.org/ for Mermaid documentation and syntax reference.
 */

/**
 * @private
 * @function normalizeProps
 * @description Normalize incoming props to support both legacy and new diagram configurations, while providing defaults for missing fields. This function ensures that the MermaidDiagram component can handle various input shapes gracefully, making it easier to integrate with different data sources and maintain backward compatibility while supporting new features.
 *
 * @param {Object} props - Component props, which may include a `block` property containing the diagram configuration or direct props for backward compatibility.
 * @returns {Object} Normalized props with consistent fields for rendering.
 * The normalization process includes:
 * - Extracting the source object from either `props.block` or `props` directly.
 * - Providing default values for missing fields such as `id`, `title`, `description`, `theme`, and diagram sources.
 * - Supporting both legacy `diagram` prop and new `mobileDiagram` / `desktopDiagram` configurations, with appropriate fallbacks to ensure a valid diagram source is always available for rendering.
 * This function enables the MermaidDiagram component to handle various input shapes gracefully, making it easier to integrate with different data sources and maintain backward compatibility while supporting new features.
 */
function normalizeProps(props) {
  const source = props.block || props;

  return {
    id: source.id || `mermaid-${Math.random().toString(36).slice(2)}`,
    title: source.title || "",
    description: source.description || "",
    diagram: source.diagram || "",
    mobileDiagram: source.mobileDiagram || source.mobile || null,
    desktopDiagram: source.desktopDiagram || source.desktop || null,
    theme: source.theme || Theme.AUTO,
    className: source.className || "",
  };
}

/**
 * @public
 * @component
 * @name MermaidDiagram
 * @description Fully featured Mermaid diagram renderer with dark/light theme support, responsive SVG layout, accessible container, optional description, and PNG export capability. The component normalizes props to support both legacy and new diagram configurations, allowing for flexible integration while maintaining a consistent internal state structure for rendering.
 * Core responsibilities:
 * - Render Mermaid diagrams based on provided source strings, with support for separate mobile and desktop configurations.
 * - Apply visual themes (dark/light) to the rendered diagrams for consistent styling.
 * - Ensure the diagram container is accessible, using appropriate ARIA roles and labels.
 * - Include an optional description rendered beneath the diagram for additional context.
 * - Provide a button to export the rendered diagram as a PNG image, using `html-to-image` for conversion.
 * - Normalize incoming props to support both legacy and new diagram configurations, ensuring backward compatibility while enabling new features.
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
 *
 * @example
 * ```js
 * <MermaidDiagram
 * id="example-diagram"
 * title="Example Mermaid Diagram"
 * description="This is an example of a Mermaid diagram rendered within the MermaidDiagram component."
 * diagram="graph TD; A-->B; A-->C; B-->D; C-->D;"
 * theme="dark"
 * />
 * // In this example, the `MermaidDiagram` component renders a simple flowchart defined by the Mermaid syntax in the `diagram` prop. The component applies the "dark" theme to the rendered SVG and includes a title and description for context. The diagram is rendered within a styled panel that is accessible and includes functionality for exporting the diagram as a PNG image.
 * ```
 */
function MermaidDiagram(props) {
  // Refs and state for managing the diagram host element and toggling between mobile and desktop diagrams when both are available. The `forceAlt` state is used to allow users to manually switch between the mobile and desktop versions of the diagram, while the `isMobile` value from the responsive context determines which version is shown by default based on the current viewport size. The `hostRef` is used to directly manipulate the DOM element where Mermaid renders the SVG, enabling dynamic updates and export functionality.
  const hostRef = useRef(null);
  const fullscreenHostRef = useRef(null);
  const [forceAlt, setForceAlt] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const { isMobile } = useResponsive();
  const { theme: appTheme, palette } = useTheme();
  const { id, title, description, diagram, mobileDiagram, desktopDiagram, theme, className } =
    useMemo(() => normalizeProps(props), [props]);
  const hasBoth = Boolean(mobileDiagram?.diagram && desktopDiagram?.diagram);
  const baseDiagram = isMobile ? mobileDiagram : desktopDiagram;
  const altDiagram = isMobile ? desktopDiagram : mobileDiagram;
  const activeDiagram = forceAlt && hasBoth ? altDiagram : baseDiagram;
  const renderId = useMemo(() => {
    const sourceId = id || title || "mermaid-diagram";
    return sourceId.toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
  }, [id, title]);

  const finalDiagram = useMemo(
    () => applyPaletteToDiagramSource(activeDiagram?.diagram || diagram, palette),
    [activeDiagram?.diagram, diagram, palette]
  );
  const finalDescription = activeDiagram?.description || description;
  const resolvedTheme = theme === Theme.AUTO ? appTheme : theme;

  // Initialize Mermaid with appropriate configuration on component mount, ensuring that Mermaid is ready to render diagrams when the source changes. The configuration includes:
  // - `startOnLoad: false` to prevent Mermaid from automatically rendering diagrams on page load, allowing for controlled rendering within the component.
  // - `securityLevel: "loose"` to allow for more flexible diagram definitions, while being mindful of potential security implications in a real application.
  // - `theme: "base"` to provide a neutral starting point for styling, with the option to customize further via CSS or additional Mermaid themes as needed.
  useEffect(() => {
    let cancelled = false;

    async function initializeMermaid() {
      const mermaid = await getMermaidInstance();

      if (cancelled || mermaidInitialized) return;

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "base",
        look: "classic",
        handDrawnSeed: 0,
        deterministicIds: true,
        deterministicIDSeed: "portfolio-diagrams",
      });
      mermaidInitialized = true;
    }

    initializeMermaid();

    return () => {
      cancelled = true;
    };
  }, []);

  // Render the Mermaid diagram into the host element whenever the diagram source changes, while handling asynchronous rendering and potential errors gracefully. The effect includes a cancellation mechanism to prevent state updates on unmounted components, ensuring stability during rapid prop changes or component unmounting. The rendering process involves:
  // - Invoking `mermaid.render` with a unique id and the diagram source to generate the SVG.
  // - Updating the host element's innerHTML with the rendered SVG, applying a fade-out class for smooth transitions when updating an existing diagram.
  // - Catching and displaying any rendering errors within the host element, while logging them to the console for debugging purposes.
  useEffect(() => {
    let cancelled = false;
    const host = hostRef.current;

    if (!host || !finalDiagram) return undefined;

    // Render the Mermaid diagram asynchronously, allowing for smooth updates and error handling without blocking the main thread or causing jank in the UI. The rendering function is defined as an async function to accommodate Mermaid's rendering process, which may involve asynchronous operations such as parsing the diagram source and generating the SVG. This approach ensures that the component remains responsive and can handle rapid updates to the diagram source without freezing or crashing.
    async function renderDiagram() {
      try {
        const mermaid = await getMermaidInstance();
        const { svg } = await mermaid.render(`mermaid-${renderId}`, finalDiagram);

        if (cancelled) return;

        const existingSvg = host.querySelector("svg");

        if (!existingSvg) {
          host.innerHTML = svg;
          normalizeRenderedSvg(host);
          return;
        }

        host.classList.add("fade-out");

        window.setTimeout(() => {
          if (cancelled) return;
          host.innerHTML = svg;
          normalizeRenderedSvg(host);
          requestAnimationFrame(() => host.classList.remove("fade-out"));
        }, 180);
      } catch (error) {
        if (!cancelled) {
          console.error("Mermaid render failed:", error);
          const pre = document.createElement("pre");
          pre.className = "mermaid-error";
          pre.textContent = String(error.message || error);
          host.appendChild(pre);
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [finalDiagram, renderId]);

  useEffect(() => {
    let cancelled = false;
    const host = fullscreenHostRef.current;

    if (!isFullscreenOpen || !host || !finalDiagram) return undefined;

    async function renderFullscreenDiagram() {
      try {
        const mermaid = await getMermaidInstance();
        const { svg } = await mermaid.render(`mermaid-${renderId}-fullscreen`, finalDiagram);

        if (cancelled) return;

        host.innerHTML = svg;
        normalizeRenderedSvg(host);
      } catch (error) {
        if (!cancelled) {
          console.error("Mermaid fullscreen render failed:", error);
          const pre = document.createElement("pre");
          pre.className = "mermaid-error";
          pre.textContent = String(error.message || error);
          host.appendChild(pre);
        }
      }
    }

    renderFullscreenDiagram();

    return () => {
      cancelled = true;
    };
  }, [isFullscreenOpen, finalDiagram, renderId]);

  /**
   * @function handleExport
   * @async
   * @description Handle diagram export by converting the rendered SVG to a PNG image using `html-to-image`, while ensuring that the host element and SVG are present before attempting the export. The function includes error handling to catch and log any issues during the export process, providing feedback in case of failure. The exported file is named based on the provided title or defaults to "diagram.png" if no title is available, ensuring a user-friendly download experience.
   * The export process involves:
   * - Selecting the SVG element from the host container to ensure that the correct content is exported.
   * - Using `html-to-image`'s `toPng` function to convert the SVG to a PNG data URL, with options for cache busting and background color to ensure a clean export.
   * - Creating a temporary anchor element to trigger the download of the PNG file, setting the `href` to the generated data URL and the `download` attribute to specify the filename.
   * - Handling any errors that occur during the export process by logging them to the console, allowing for debugging and user feedback in case of issues.
   *
   * @returns {Promise<void>} A promise that resolves when the export process is complete, allowing for asynchronous handling of the export operation.
   */
  async function handleExport() {
    if (!hostRef.current) return;

    const svg = hostRef.current.querySelector("svg");
    if (!svg) return;
    let exportNode = null;

    try {
      await document.fonts?.ready;

      const {
        exportNode: nextExportNode,
        exportWidth,
        exportHeight,
        exportBackground,
      } = buildExportNode(svg, resolvedTheme);
      exportNode = nextExportNode;
      document.body.appendChild(exportNode);

      const dataUrl = await toPng(exportNode, {
        cacheBust: true,
        pixelRatio: EXPORT_PIXEL_RATIO,
        width: exportWidth,
        height: exportHeight,
        backgroundColor: exportBackground,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${title || "diagram"}.png`;
      link.click();
    } catch (error) {
      console.error("Diagram export failed:", error);
    } finally {
      exportNode?.remove();
    }
  }

  // Render the Mermaid diagram within a styled panel, including optional title and description, while providing buttons for exporting the diagram and toggling between mobile and desktop versions if both are available.
  return (
    <Panel
      id={id}
      defaultExpanded
      collapsible
      className={`frosted blue-tile block scroll-anchor mermaid-container ${resolvedTheme} ${className}`}
      header={
        title && (
          <div className="flex-row">
            <span className="block-header">{title}</span>
          </div>
        )
      }
      role="region"
      aria-label={title || "Mermaid diagram"}
    >
      <div className="mermaid">
        <div
          ref={hostRef}
          className={`mermaid-svg-host ${resolvedTheme}`}
          tabIndex={0}
          role="img"
          aria-label={title || "Mermaid diagram"}
        />
      </div>
      <div className="mermaid-actions mt-2" aria-label="Diagram actions">
        <Btn
          size={Size.XS}
          icon={faFileDownload}
          onClick={handleExport}
          tooltip="Download diagram as PNG"
          ariaLabel="Export diagram as PNG"
          variant={Variant.ACCENT}
          text="Download PNG"
          className="mermaid-action-btn"
        />
        <Btn
          size={Size.XS}
          icon={faExpand}
          onClick={() => setIsFullscreenOpen(true)}
          tooltip="View diagram full screen"
          ariaLabel="View diagram full screen"
          variant={Variant.ACCENT}
          text="Full screen"
          className="mermaid-action-btn"
        />
        {hasBoth && !isMobile ? (
          <Btn
            size={Size.XS}
            icon={faEye}
            onClick={() => setForceAlt((prev) => !prev)}
            tooltip="View alternate diagram version"
            ariaLabel={`View ${forceAlt ? "desktop" : "mobile"} version`}
            variant={Variant.ACCENT}
            text={forceAlt ? "Desktop view" : "Mobile view"}
            className="mermaid-action-btn"
          />
        ) : null}
      </div>
      <Modal
        open={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        overflow={false}
        backdrop="static"
        keyboard={true}
        className="mermaid-fullscreen-modal"
        size="full"
      >
        <Modal.Header className="mermaid-fullscreen-modal__header" />
        <Modal.Body className="mermaid-fullscreen-modal__body">
          <div className="mermaid-fullscreen-stage">
            <div className="mermaid mermaid-fullscreen-canvas">
              <div
                ref={fullscreenHostRef}
                className={`mermaid-svg-host mermaid-svg-host--fullscreen ${resolvedTheme}`}
                tabIndex={0}
                role="img"
                aria-label="Mermaid diagram fullscreen view"
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {finalDescription && (
        <RichText className="mermaid-description" text={finalDescription} index={0} />
      )}
    </Panel>
  );
}

export default MermaidDiagram;
