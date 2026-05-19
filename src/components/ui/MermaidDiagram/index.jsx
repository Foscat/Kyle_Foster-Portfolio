/**
 * @file src\components\ui\MermaidDiagram\index.jsx
 * @description src\components\ui\MermaidDiagram\index module.
 * @module src\components\ui\MermaidDiagram\index
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Modal, Panel } from "rsuite";
import { faExpand, faEye, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { toPng } from "html-to-image";
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
const EXPORT_PIXEL_RATIO = 3;
const EXPORT_EDGE_LABEL_FONT_SIZE = "14px";

function toExportFilename(title) {
  const cleanedTitle = String(title || "diagram")
    .trim()
    .replace(/[<>:"/\\|?*]+/g, "-")
    .replace(/\s+/g, " ")
    .slice(0, 120);
  const safeTitle = [...cleanedTitle].filter((char) => char.charCodeAt(0) >= 32).join("");
  return `${safeTitle || "diagram"}.png`;
}

function triggerDownload(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

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

function getExportBackground(theme) {
  const rootStyles =
    typeof window !== "undefined" ? window.getComputedStyle(document.documentElement) : null;

  return (
    rootStyles?.getPropertyValue(theme === Theme.LIGHT ? "--bg-bright" : "--bg-primary")?.trim() ||
    (theme === Theme.LIGHT ? "#f4f6fb" : "#0f0f12")
  );
}

function buildExportNodeFromSvg(svg, theme) {
  const renderedBounds = svg.getBoundingClientRect();
  const { width: intrinsicWidth, height: intrinsicHeight } = getSvgIntrinsicSize(svg);
  const svgWidth = Math.max(
    1,
    Math.ceil(
      renderedBounds.width ||
        intrinsicWidth ||
        parseNumericDimension(svg.getAttribute("width")) ||
        0
    )
  );
  const svgHeight = Math.max(
    1,
    Math.ceil(
      renderedBounds.height ||
        intrinsicHeight ||
        parseNumericDimension(svg.getAttribute("height")) ||
        0
    )
  );
  const exportWidth = svgWidth + EXPORT_PADDING_PX * 2;
  const exportHeight = svgHeight + EXPORT_PADDING_PX * 2;

  const exportSvg = svg.cloneNode(true);
  snapshotComputedColors(svg, exportSvg);
  applyExportLabelStyles(exportSvg, theme);
  exportSvg.setAttribute("width", String(svgWidth));
  exportSvg.setAttribute("height", String(svgHeight));
  if (!svg.getAttribute("viewBox")) {
    exportSvg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
  }
  exportSvg.style.cssText = [
    `width:${svgWidth}px`,
    `height:${svgHeight}px`,
    "max-width:none",
    "max-height:none",
    "min-width:0",
    "min-height:0",
    "display:block",
    "overflow:visible",
  ].join(";");

  const exportNode = document.createElement("div");
  exportNode.style.position = "fixed";
  exportNode.style.left = "-10000px";
  exportNode.style.top = "0";
  exportNode.style.width = `${exportWidth}px`;
  exportNode.style.height = `${exportHeight}px`;
  exportNode.style.padding = `${EXPORT_PADDING_PX}px`;
  exportNode.style.margin = "0";
  exportNode.style.boxSizing = "border-box";
  exportNode.style.backgroundColor = getExportBackground(theme);
  exportNode.style.overflow = "visible";
  exportNode.style.display = "flex";
  exportNode.style.alignItems = "flex-start";
  exportNode.style.justifyContent = "center";
  exportNode.appendChild(exportSvg);

  return {
    exportNode,
    exportWidth,
    exportHeight,
  };
}

function getExportTextColor(theme) {
  return theme === Theme.LIGHT ? "#F8FAFC" : "#F5F7FF";
}

function getExportLabelBackground(theme) {
  return "rgba(255, 255, 255, 1)";
}

function getExportSectionLabelBackground(theme) {
  return "rgba(255, 255, 255, 0.98)";
}

function getExportSectionLabelTextColor(theme) {
  return theme === Theme.LIGHT ? "#F8FAFC" : "#F5F7FF";
}

function getPxNumber(value, fallback) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return fallback;

  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function isTransparentColor(value) {
  return (
    !value || value === "transparent" || value === "rgba(0, 0, 0, 0)" || value === "rgb(0 0 0 / 0)"
  );
}

function applyExportLabelStyles(exportSvg, theme) {
  const edgeLabelBackground = getExportLabelBackground(theme);
  const sectionLabelBackground = getExportSectionLabelBackground(theme);
  const sectionLabelTextColor = getExportSectionLabelTextColor(theme);

  for (const el of exportSvg.querySelectorAll(
    ".edgeLabel, .edgeLabel foreignObject, .edgeLabel div, .edgeLabel span, .edgeLabel p"
  )) {
    el.style.setProperty("position", "relative");
    el.style.setProperty("z-index", "2");
  }

  for (const el of exportSvg.querySelectorAll(
    ".edgeLabel foreignObject, .edgeLabel div, .edgeLabel span, .edgeLabel p"
  )) {
    el.style.setProperty("background-color", edgeLabelBackground);
    el.style.setProperty("font-size", EXPORT_EDGE_LABEL_FONT_SIZE);
    el.style.setProperty("line-height", "1.25");
  }

  for (const el of exportSvg.querySelectorAll(".edgeLabel text, .edgeLabel tspan")) {
    el.style.setProperty("font-size", EXPORT_EDGE_LABEL_FONT_SIZE);
    el.setAttribute("font-size", EXPORT_EDGE_LABEL_FONT_SIZE);
    el.style.setProperty("fill", getExportTextColor(theme));
    el.style.setProperty("color", getExportTextColor(theme));
    el.setAttribute("fill", getExportTextColor(theme));
  }

  for (const el of exportSvg.querySelectorAll(
    ".cluster-label, .cluster-label foreignObject, .cluster-label div, .cluster-label span, .cluster-label p"
  )) {
    el.style.setProperty("position", "relative");
    el.style.setProperty("z-index", "2");
  }

  for (const el of exportSvg.querySelectorAll(
    ".cluster-label div, .cluster-label span, .cluster-label p"
  )) {
    el.style.setProperty("background-color", sectionLabelBackground);
    el.style.setProperty("padding", "0 6px");
    el.style.setProperty("border-radius", "6px");
    el.style.setProperty("display", "inline-flex");
    el.style.setProperty("align-items", "center");
    el.style.setProperty("justify-content", "center");
    el.style.setProperty("text-align", "center");
    el.style.setProperty("line-height", "1.2");
    el.style.setProperty("margin", "0");
  }

  for (const el of exportSvg.querySelectorAll(".cluster-label text, .cluster-label tspan")) {
    el.style.setProperty("font-size", "16px");
    el.style.setProperty("fill", sectionLabelTextColor);
    el.style.setProperty("color", sectionLabelTextColor);
    el.setAttribute("font-size", "16px");
    el.setAttribute("fill", sectionLabelTextColor);
  }

  // Override SVG rect fill colors in edge labels
  for (const rect of exportSvg.querySelectorAll(".edgeLabel rect")) {
    rect.setAttribute("fill", edgeLabelBackground);
    rect.style.setProperty("fill", edgeLabelBackground);
  }

  // Override SVG rect fill colors in cluster labels
  for (const rect of exportSvg.querySelectorAll(".cluster-label rect")) {
    rect.setAttribute("fill", sectionLabelBackground);
    rect.style.setProperty("fill", sectionLabelBackground);
  }
}

function getForeignObjectLabelStyles(fo, defaults) {
  let backgroundColor = defaults.backgroundColor;
  let textColor = defaults.textColor;
  let fontSize = defaults.fontSize;
  let fontFamily = defaults.fontFamily;
  let fontWeight = defaults.fontWeight;

  let resolvedBackground = false;
  let resolvedTextColor = false;
  let resolvedFontSize = false;
  let resolvedFontFamily = false;
  let resolvedFontWeight = false;

  for (const el of [fo, ...fo.querySelectorAll("*")]) {
    const candidateBackground = el.style?.getPropertyValue("background-color")?.trim();
    if (!resolvedBackground && !isTransparentColor(candidateBackground)) {
      backgroundColor = candidateBackground;
      resolvedBackground = true;
    }

    const candidateTextColor =
      el.style?.getPropertyValue("color")?.trim() || el.style?.getPropertyValue("fill")?.trim();
    if (!resolvedTextColor && !isTransparentColor(candidateTextColor)) {
      textColor = candidateTextColor;
      resolvedTextColor = true;
    }

    const candidateFontSize = el.style?.getPropertyValue("font-size")?.trim();
    if (!resolvedFontSize && candidateFontSize) {
      fontSize = candidateFontSize;
      resolvedFontSize = true;
    }

    const candidateFontFamily = el.style?.getPropertyValue("font-family")?.trim();
    if (!resolvedFontFamily && candidateFontFamily) {
      fontFamily = candidateFontFamily;
      resolvedFontFamily = true;
    }

    const candidateFontWeight = el.style?.getPropertyValue("font-weight")?.trim();
    if (!resolvedFontWeight && candidateFontWeight) {
      fontWeight = candidateFontWeight;
      resolvedFontWeight = true;
    }

    if (
      resolvedBackground &&
      resolvedTextColor &&
      resolvedFontSize &&
      resolvedFontFamily &&
      resolvedFontWeight
    ) {
      break;
    }
  }

  return {
    backgroundColor,
    textColor,
    fontSize,
    fontFamily,
    fontWeight,
  };
}

/**
 * Browsers taint a canvas when an SVG drawn via <img> contains <foreignObject>
 * or external resource URLs, making toDataURL() throw a SecurityError.
 * This function sanitizes a cloned SVG in-place before export:
 *   - Replaces <foreignObject> nodes with SVG <text> equivalents
 *   - Strips @font-face rules that reference external (http/https) URLs
 *   - Removes <image> elements that reference external URLs
 */
function sanitizeSvgForExport(svgClone, theme) {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const exportTextColor = getExportTextColor(theme);
  const exportLabelBackground = getExportLabelBackground(theme);
  const exportSectionLabelBackground = getExportSectionLabelBackground(theme);
  const exportSectionLabelTextColor = getExportSectionLabelTextColor(theme);

  // <foreignObject> is the primary canvas-taint source in Mermaid output.
  // Replace each one with a centered <text> carrying the same text content.
  for (const fo of [...svgClone.querySelectorAll("foreignObject")]) {
    const edgeLabelHost =
      typeof fo.closest === "function"
        ? fo.closest(".edgeLabel")
        : fo.parentNode?.classList?.contains("edgeLabel")
          ? fo.parentNode
          : null;
    const clusterLabelHost =
      typeof fo.closest === "function"
        ? fo.closest(".cluster-label")
        : fo.parentNode?.classList?.contains("cluster-label")
          ? fo.parentNode
          : null;
    // Mermaid nests edge-label foreignObjects under .edgeLabel > .label, so
    // ancestor lookup is required here rather than checking only the immediate parent.
    const isEdgeLabel = Boolean(edgeLabelHost);
    const isClusterLabel = !isEdgeLabel && Boolean(clusterLabelHost);
    const x = parseFloat(fo.getAttribute("x") || "0");
    const y = parseFloat(fo.getAttribute("y") || "0");
    const width = parseFloat(fo.getAttribute("width") || "0");
    const height = parseFloat(fo.getAttribute("height") || "0");
    const textContent = fo.textContent?.trim() || "";

    if (textContent) {
      if (isEdgeLabel || isClusterLabel) {
        const labelStyles = isEdgeLabel
          ? getForeignObjectLabelStyles(fo, {
              backgroundColor: exportLabelBackground,
              textColor: getExportTextColor(theme),
              fontSize: EXPORT_EDGE_LABEL_FONT_SIZE,
              fontFamily: "trebuchet ms, verdana, arial, sans-serif",
              fontWeight: "500",
            })
          : {
              backgroundColor: exportSectionLabelBackground,
              textColor: getExportSectionLabelTextColor(theme),
              fontSize: "16px",
              fontFamily: "trebuchet ms, verdana, arial, sans-serif",
              fontWeight: "600",
            };

        // Preserve label chips when export sanitization has to replace foreignObject markup.
        const groupEl = document.createElementNS(SVG_NS, "g");
        groupEl.setAttribute(
          "class",
          isEdgeLabel ? "exported-label-chip" : "exported-section-label-chip"
        );

        const rectEl = document.createElementNS(SVG_NS, "rect");

        let rectX = x;
        let rectY = y;
        let rectWidth = width;
        let rectHeight = height;

        if (isClusterLabel) {
          const fontPx = getPxNumber(labelStyles.fontSize, 16);
          const lines = textContent.split(/\r?\n/);
          const maxLineChars = Math.max(1, ...lines.map((line) => line.trim().length));
          const measuredWidth = maxLineChars * fontPx * 0.56 + 14;
          const measuredHeight = lines.length * fontPx * 1.2 + 8;

          rectWidth = Math.max(20, width > 0 ? Math.min(width, measuredWidth) : measuredWidth);
          rectHeight = Math.max(20, height > 0 ? Math.min(height, measuredHeight) : measuredHeight);
          rectX = x + Math.max(0, (width - rectWidth) / 2);
          rectY = y + Math.max(0, (height - rectHeight) / 2);
        }

        rectEl.setAttribute("x", String(rectX));
        rectEl.setAttribute("y", String(rectY));
        rectEl.setAttribute("width", String(rectWidth));
        rectEl.setAttribute("height", String(rectHeight));
        rectEl.setAttribute("rx", "4");
        rectEl.setAttribute("ry", "4");
        rectEl.setAttribute("fill", labelStyles.backgroundColor);

        const textEl = document.createElementNS(SVG_NS, "text");
        textEl.setAttribute("x", String(rectX + rectWidth / 2));
        textEl.setAttribute("y", String(rectY + rectHeight / 2));
        textEl.setAttribute("text-anchor", "middle");
        textEl.setAttribute("dominant-baseline", "middle");
        textEl.setAttribute("font-size", labelStyles.fontSize);
        textEl.setAttribute("font-family", labelStyles.fontFamily);
        textEl.setAttribute("fill", labelStyles.textColor);
        textEl.setAttribute("font-weight", labelStyles.fontWeight);

        // Split on \n and use <tspan> for each line
        const lines = textContent.split(/\r?\n/);
        lines.forEach((line, i) => {
          const tspan = document.createElementNS(SVG_NS, "tspan");
          tspan.textContent = line;
          tspan.setAttribute("x", String(rectX + rectWidth / 2));
          if (i === 0) {
            tspan.setAttribute("dy", "0");
          } else {
            tspan.setAttribute("dy", "1.2em");
          }
          textEl.appendChild(tspan);
        });

        groupEl.appendChild(rectEl);
        groupEl.appendChild(textEl);
        fo.parentNode?.replaceChild(groupEl, fo);
      } else {
        // Node text: just replace with <text> and preserve line breaks
        const textEl = document.createElementNS(SVG_NS, "text");
        textEl.setAttribute("x", String(x + width / 2));
        textEl.setAttribute("y", String(y + height / 2));
        textEl.setAttribute("text-anchor", "middle");
        textEl.setAttribute("dominant-baseline", "middle");
        textEl.setAttribute("font-size", "14");
        textEl.setAttribute("font-family", "trebuchet ms, verdana, arial, sans-serif");
        textEl.setAttribute("fill", exportTextColor);
        textEl.setAttribute("font-weight", "500");
        const lines = textContent.split(/\r?\n/);
        lines.forEach((line, i) => {
          const tspan = document.createElementNS(SVG_NS, "tspan");
          tspan.textContent = line;
          tspan.setAttribute("x", String(x + width / 2));
          if (i === 0) {
            tspan.setAttribute("dy", "0");
          } else {
            tspan.setAttribute("dy", "1.2em");
          }
          textEl.appendChild(tspan);
        });
        fo.parentNode?.replaceChild(textEl, fo);
      }
    } else {
      fo.parentNode?.removeChild(fo);
    }
  }

  // Always ensure edge label backgrounds are present in export, even if Mermaid output changes structure.
  // For every .edgeLabel group, if it contains a <text> but no <rect>, insert a background rect behind the text.
  for (const edgeLabel of svgClone.querySelectorAll(".edgeLabel")) {
    const textEl = edgeLabel.querySelector("text");
    let rectEl = edgeLabel.querySelector("rect");
    if (textEl && !rectEl) {
      const textParent = textEl.parentNode;
      if (!textParent) continue;

      // Compute bounding box for the text.
      let bbox = { x: 0, y: 0, width: 0, height: 0 };
      if (typeof textEl.getBBox === "function") {
        try {
          bbox = textEl.getBBox();
        } catch {
          bbox = { x: 0, y: 0, width: 0, height: 0 };
        }
      }

      rectEl = document.createElementNS(SVG_NS, "rect");
      rectEl.setAttribute("x", String(bbox.x - 6));
      rectEl.setAttribute("y", String(bbox.y - 2));
      rectEl.setAttribute("width", String(bbox.width + 12));
      rectEl.setAttribute("height", String(bbox.height + 4));
      rectEl.setAttribute("rx", "4");
      rectEl.setAttribute("ry", "4");
      rectEl.setAttribute("fill", exportLabelBackground);

      // Insert the background into the same group as the text so the sibling
      // relationship is valid even when Mermaid nests the text inside a child <g>.
      textParent.insertBefore(rectEl, textEl);
    } else if (rectEl) {
      const rectFill = rectEl.getAttribute("fill") || rectEl.style.getPropertyValue("fill");
      if (!rectFill || rectFill === "none") {
        rectEl.setAttribute("fill", exportLabelBackground);
      }
    }
  }

  // Strip @font-face rules with external URLs from embedded <style> blocks.
  for (const styleEl of svgClone.querySelectorAll("style")) {
    styleEl.textContent = styleEl.textContent.replace(
      /@font-face\s*\{[^{}]*url\([^)]*https?:[^)]*\)[^{}]*\}/gi,
      ""
    );
  }

  // Remove <image> elements that point to non-data external URLs.
  for (const img of svgClone.querySelectorAll("image")) {
    const href = img.getAttribute("href") || img.getAttribute("xlink:href") || "";
    if (href && !href.startsWith("data:")) {
      img.parentNode?.removeChild(img);
    }
  }

  // Strip stroke from text elements. Text nodes inherit the gold `.mermaid { stroke: var(--accent) }`
  // rule, which getComputedStyle resolves to a gold color and snapshotComputedColors then locks in
  // as an inline style. In the isolated export context (no external CSS) that inherited gold stroke
  // dominates the fill, making text appear gold and blurry due to paint-order / thick stroke.
  for (const el of svgClone.querySelectorAll("text, tspan, textPath")) {
    const currentFill = el.getAttribute("fill") || el.style.getPropertyValue("fill");
    const currentFontWeight =
      el.getAttribute("font-weight") || el.style.getPropertyValue("font-weight");

    el.style.removeProperty("stroke");
    el.style.removeProperty("stroke-width");
    el.style.removeProperty("paint-order");
    el.style.setProperty("stroke", "none");
    el.style.setProperty("stroke-width", "0");
    el.style.setProperty("paint-order", "normal");
    el.setAttribute("stroke", "none");
    el.setAttribute("stroke-width", "0");
    el.setAttribute("paint-order", "normal");

    if (!currentFill || currentFill === "none") {
      el.style.setProperty("fill", exportTextColor);
      el.style.setProperty("color", exportTextColor);
      el.setAttribute("fill", exportTextColor);
    }

    if (!currentFontWeight) {
      el.style.setProperty("font-weight", "500");
      el.setAttribute("font-weight", "500");
    }
  }
}

/**
 * Snapshots the browser-computed presentation colors (fill, stroke, color) from
 * each element in the live SVG onto the corresponding element in the export clone.
 *
 * When the SVG is serialized to a blob and drawn via <img>, external CSS
 * (including var() references) no longer applies.  By capturing the resolved
 * values here we preserve the live theme appearance in the exported PNG.
 *
 * Must be called BEFORE cloneNode so sourceSvg is still in the document and
 * getComputedStyle returns fully resolved values.
 */
function snapshotComputedColors(sourceSvg, targetSvg) {
  if (typeof window === "undefined" || !sourceSvg || !targetSvg) return;

  const COLOR_PROPS = [
    "fill",
    "stroke",
    "color",
    "stop-color",
    "background-color",
    "font-size",
    "font-family",
    "font-weight",
  ];
  const sourceEls = [sourceSvg, ...sourceSvg.querySelectorAll("*")];
  const targetEls = [targetSvg, ...targetSvg.querySelectorAll("*")];
  const count = Math.min(sourceEls.length, targetEls.length);

  for (let i = 0; i < count; i++) {
    const tagName = sourceEls[i].tagName?.toLowerCase?.() || "";
    const isTextElement = tagName === "text" || tagName === "tspan" || tagName === "textpath";
    const computed = window.getComputedStyle(sourceEls[i]);
    for (const prop of COLOR_PROPS) {
      if (isTextElement && prop === "stroke") continue;
      const val = computed.getPropertyValue(prop).trim();
      const isTransparentBackground = prop === "background-color" && isTransparentColor(val);
      // Only override with real presentation values — skip "none", empty, transparent,
      // and unresolved var() references.
      if (val && val !== "none" && !val.startsWith("var(") && !isTransparentBackground) {
        targetEls[i].style.setProperty(prop, val);
      }
    }
  }
}

async function renderSvgToCanvas(svg, theme, { sanitize = true, useRenderedSize = true } = {}) {
  const renderedBounds = svg.getBoundingClientRect();
  const { width: intrinsicWidth, height: intrinsicHeight } = getSvgIntrinsicSize(svg);
  const svgWidth = Math.max(
    1,
    Math.ceil(useRenderedSize ? renderedBounds.width || intrinsicWidth : intrinsicWidth)
  );
  const svgHeight = Math.max(
    1,
    Math.ceil(useRenderedSize ? renderedBounds.height || intrinsicHeight : intrinsicHeight)
  );
  const exportWidth = svgWidth + EXPORT_PADDING_PX * 2;
  const exportHeight = svgHeight + EXPORT_PADDING_PX * 2;
  const background = getExportBackground(theme);

  // Clone AFTER computing styles so getComputedStyle runs on the live DOM element.
  const exportSvg = svg.cloneNode(true);
  exportSvg.setAttribute("width", String(svgWidth));
  exportSvg.setAttribute("height", String(svgHeight));
  if (!svg.getAttribute("viewBox")) {
    exportSvg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
  }
  // Remove style overrides set by normalizeRenderedSvg so the SVG has
  // hard pixel dimensions during rasterization.
  exportSvg.style.cssText = `width:${svgWidth}px;height:${svgHeight}px;display:block;overflow:visible;`;

  // Inline the live computed colors onto the clone before external CSS is lost.
  snapshotComputedColors(svg, exportSvg);
  applyExportLabelStyles(exportSvg, theme);

  // Optional sanitize mode for hostile SVG content. Disabled by default for
  // export parity so the downloaded diagram matches the on-screen rendering.
  if (sanitize) {
    sanitizeSvgForExport(exportSvg, theme);
  }

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(exportSvg);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const svgObjectUrl = URL.createObjectURL(svgBlob);

  try {
    const img = new Image();
    img.src = svgObjectUrl;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const canvas = document.createElement("canvas");
    canvas.width = exportWidth * EXPORT_PIXEL_RATIO;
    canvas.height = exportHeight * EXPORT_PIXEL_RATIO;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to create canvas context for diagram export");
    }
    ctx.imageSmoothingEnabled = true;
    if ("imageSmoothingQuality" in ctx) {
      ctx.imageSmoothingQuality = "high";
    }
    ctx.scale(EXPORT_PIXEL_RATIO, EXPORT_PIXEL_RATIO);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, exportWidth, exportHeight);
    ctx.drawImage(img, EXPORT_PADDING_PX, EXPORT_PADDING_PX, svgWidth, svgHeight);

    return canvas.toDataURL("image/png");
  } finally {
    URL.revokeObjectURL(svgObjectUrl);
  }
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
        flowchart: {
          htmlLabels: false,
        },
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

    const filename = toExportFilename(title);
    const exportHost = hostRef.current;
    const svg = exportHost.querySelector("svg");
    if (!svg) return;

    try {
      await document.fonts?.ready;
    } catch {
      // Continue with best-effort export if document fonts are unavailable.
    }

    try {
      const dataUrl = await renderSvgToCanvas(svg, resolvedTheme, {
        sanitize: false,
        useRenderedSize: true,
      });
      triggerDownload(dataUrl, filename);
      return;
    } catch (primaryCanvasError) {
      console.warn(
        "Diagram export canvas path failed, retrying with sanitized SVG fallback:",
        primaryCanvasError
      );
    }

    try {
      const dataUrl = await renderSvgToCanvas(svg, resolvedTheme, {
        sanitize: true,
        useRenderedSize: true,
      });
      triggerDownload(dataUrl, filename);
      return;
    } catch (sanitizedCanvasError) {
      console.warn(
        "Diagram export sanitized canvas fallback failed, retrying with DOM capture:",
        sanitizedCanvasError
      );
    }

    try {
      const { exportNode, exportWidth, exportHeight } = buildExportNodeFromSvg(svg, resolvedTheme);
      document.body.appendChild(exportNode);
      try {
        const dataUrl = await toPng(exportNode, {
          cacheBust: true,
          pixelRatio: EXPORT_PIXEL_RATIO,
          width: exportWidth,
          height: exportHeight,
          backgroundColor: getExportBackground(resolvedTheme),
        });
        triggerDownload(dataUrl, filename);
      } finally {
        exportNode.remove();
      }
    } catch (fallbackError) {
      console.error("Diagram export failed:", fallbackError);
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
