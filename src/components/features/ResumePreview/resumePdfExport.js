/**
 * @file resumePdfExport.js
 * @description Browser-side resume PDF generation helpers.
 * @module components/features/ResumePreview/resumePdfExport
 */

import { toCanvas } from "html-to-image";
import { jsPDF } from "jspdf";

const DEFAULT_MARGIN_PT = 24;
const DEFAULT_PIXEL_RATIO = 2;
const TRANSPARENT_ALPHA_THRESHOLD = 2;
const BREAK_SCORE_WINDOW_PX = 2;

function getColorAlpha(colorValue) {
  if (typeof colorValue !== "string") {
    return 0;
  }

  const normalizedColor = colorValue.trim().toLowerCase();
  if (!normalizedColor || normalizedColor === "transparent") {
    return 0;
  }

  const rgbaMatch = normalizedColor.match(/^rgba\(([^)]+)\)$/);
  if (rgbaMatch) {
    const rgbaParts = rgbaMatch[1].split(",").map((part) => part.trim());
    const alpha = Number(rgbaParts[3]);
    return Number.isFinite(alpha) ? alpha : 1;
  }

  const hslaMatch = normalizedColor.match(/^hsla\(([^)]+)\)$/);
  if (hslaMatch) {
    const hslaParts = hslaMatch[1].split(",").map((part) => part.trim());
    const alpha = Number(hslaParts[3]);
    return Number.isFinite(alpha) ? alpha : 1;
  }

  return 1;
}

function resolveExportBackgroundColor(computedStyles) {
  const colorCandidates = [
    computedStyles?.getPropertyValue("--resume-paper-bg-start"),
    computedStyles?.getPropertyValue("--resume-paper-bg-end"),
    computedStyles?.backgroundColor,
  ];

  const resolvedColor = colorCandidates.find((colorValue) => getColorAlpha(colorValue) > 0);
  return typeof resolvedColor === "string" && resolvedColor.trim()
    ? resolvedColor.trim()
    : "rgb(255, 255, 255)";
}

function isValidRowScoreArray(rowComplexityScores, imageHeightPx) {
  if (!rowComplexityScores) return false;
  const length = rowComplexityScores.length;
  return Number.isFinite(length) && length >= imageHeightPx;
}

function getSmoothedRowComplexity(rowComplexityScores, yPx) {
  const startYPx = Math.max(0, yPx - BREAK_SCORE_WINDOW_PX);
  const endYPx = Math.min(rowComplexityScores.length - 1, yPx + BREAK_SCORE_WINDOW_PX);
  let total = 0;
  let count = 0;

  for (let row = startYPx; row <= endYPx; row += 1) {
    total += Number(rowComplexityScores[row]) || 0;
    count += 1;
  }

  return count > 0 ? total / count : Number.POSITIVE_INFINITY;
}

function findBestBreakRow({ rowComplexityScores, minBreakYPx, maxBreakYPx, preferredBreakYPx }) {
  let bestBreakYPx = preferredBreakYPx;
  let bestScore = Number.POSITIVE_INFINITY;

  for (let row = minBreakYPx; row <= maxBreakYPx; row += 1) {
    const rowScore = getSmoothedRowComplexity(rowComplexityScores, row);
    const distancePenalty = Math.abs(row - preferredBreakYPx) * 0.08;
    const candidateScore = rowScore + distancePenalty;

    if (candidateScore < bestScore) {
      bestScore = candidateScore;
      bestBreakYPx = row;
    }
  }

  return bestBreakYPx;
}

function computeCanvasRowComplexityScores(canvas) {
  if (!(canvas instanceof HTMLCanvasElement) || canvas.width <= 1 || canvas.height <= 0) {
    return null;
  }

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    return null;
  }

  const { width, height } = canvas;
  const { data } = context.getImageData(0, 0, width, height);
  const xStep = width > 1400 ? 2 : 1;
  const scores = new Float32Array(height);

  for (let y = 0; y < height; y += 1) {
    const rowOffset = y * width * 4;
    let score = 0;
    let previousIndex = rowOffset;

    for (let x = xStep; x < width; x += xStep) {
      const index = rowOffset + x * 4;
      score += Math.abs(data[index] - data[previousIndex]);
      score += Math.abs(data[index + 1] - data[previousIndex + 1]);
      score += Math.abs(data[index + 2] - data[previousIndex + 2]);
      previousIndex = index;
    }

    scores[y] = score;
  }

  return scores;
}

/**
 * Determines PDF orientation from element dimensions.
 *
 * @param {number} width - Element width in pixels.
 * @param {number} height - Element height in pixels.
 * @returns {"portrait"|"landscape"}
 */
export function getPdfOrientation(width, height) {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return "portrait";
  }

  return width > height ? "landscape" : "portrait";
}

/**
 * Builds a pagination plan for rendering a single source canvas across one or
 * more PDF pages without distortion.
 *
 * @param {Object} options - Pagination options.
 * @param {number} options.imageWidthPx - Source image width in pixels.
 * @param {number} options.imageHeightPx - Source image height in pixels.
 * @param {number} options.pageWidthPt - PDF page width in points.
 * @param {number} options.pageHeightPt - PDF page height in points.
 * @param {number} [options.marginPt=24] - Per-page margin in points.
 * @param {ArrayLike<number>} [options.rowComplexityScores] - Optional per-row visual complexity values.
 * @returns {{contentWidthPt:number, contentHeightPt:number, slices:Array<{yPx:number, heightPx:number}>}}
 */
export function buildPageSlices({
  imageWidthPx,
  imageHeightPx,
  pageWidthPt,
  pageHeightPt,
  marginPt = DEFAULT_MARGIN_PT,
  rowComplexityScores,
}) {
  const validInput =
    Number.isFinite(imageWidthPx) &&
    Number.isFinite(imageHeightPx) &&
    Number.isFinite(pageWidthPt) &&
    Number.isFinite(pageHeightPt) &&
    imageWidthPx > 0 &&
    imageHeightPx > 0 &&
    pageWidthPt > 0 &&
    pageHeightPt > 0;

  if (!validInput) {
    return {
      contentWidthPt: 0,
      contentHeightPt: 0,
      slices: [],
    };
  }

  const safeMargin = Math.max(0, Number(marginPt) || 0);
  const contentWidthPt = Math.max(1, pageWidthPt - safeMargin * 2);
  const contentHeightPt = Math.max(1, pageHeightPt - safeMargin * 2);
  const maxSliceHeightPx = (imageWidthPx * contentHeightPt) / contentWidthPt;
  const minSliceHeightPx = Math.max(72, maxSliceHeightPx * 0.6);
  const hasComplexityScores = isValidRowScoreArray(rowComplexityScores, imageHeightPx);
  const slices = [];

  let yPx = 0;
  while (yPx < imageHeightPx - 0.5) {
    const remainingHeightPx = imageHeightPx - yPx;
    let heightPx = Math.max(1, Math.min(maxSliceHeightPx, remainingHeightPx));

    if (hasComplexityScores && remainingHeightPx > maxSliceHeightPx + 1) {
      const minBreakYPx = Math.max(yPx + 1, Math.floor(yPx + minSliceHeightPx));
      const maxBreakYPx = Math.min(imageHeightPx - 1, Math.floor(yPx + maxSliceHeightPx));
      const preferredBreakYPx = Math.min(
        maxBreakYPx,
        Math.max(minBreakYPx, Math.floor(yPx + heightPx))
      );
      const searchRadiusPx = Math.max(12, Math.floor(maxSliceHeightPx * 0.16));
      const searchStartYPx = Math.max(minBreakYPx, preferredBreakYPx - searchRadiusPx);
      const searchEndYPx = Math.min(maxBreakYPx, preferredBreakYPx + searchRadiusPx);

      if (searchEndYPx > searchStartYPx) {
        const bestBreakYPx = findBestBreakRow({
          rowComplexityScores,
          minBreakYPx: searchStartYPx,
          maxBreakYPx: searchEndYPx,
          preferredBreakYPx,
        });

        heightPx = Math.max(1, bestBreakYPx - yPx);
      }
    }

    slices.push({ yPx, heightPx });
    yPx += heightPx;
  }

  return {
    contentWidthPt,
    contentHeightPt,
    slices,
  };
}

function normalizePdfFileName(fileName) {
  const fallback = "resume.pdf";
  if (typeof fileName !== "string" || fileName.trim().length === 0) return fallback;
  const trimmed = fileName.trim();
  return trimmed.toLowerCase().endsWith(".pdf") ? trimmed : `${trimmed}.pdf`;
}

/**
 * Removes fully transparent outer margins from a rendered canvas.
 * This prevents cloned layout offsets from creating blank PDF gutters.
 *
 * @param {HTMLCanvasElement} sourceCanvas - Canvas to normalize.
 * @returns {HTMLCanvasElement} Original or cropped canvas.
 */
export function trimTransparentCanvasMargins(sourceCanvas) {
  if (!(sourceCanvas instanceof HTMLCanvasElement)) {
    return sourceCanvas;
  }

  const width = sourceCanvas.width;
  const height = sourceCanvas.height;

  if (width <= 0 || height <= 0) {
    return sourceCanvas;
  }

  const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
  if (!sourceContext) {
    return sourceCanvas;
  }

  const imageData = sourceContext.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    const rowOffset = y * width * 4;
    for (let x = 0; x < width; x += 1) {
      const alpha = pixels[rowOffset + x * 4 + 3];
      if (alpha <= TRANSPARENT_ALPHA_THRESHOLD) {
        continue;
      }

      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  const hasVisiblePixels = maxX >= minX && maxY >= minY;
  if (!hasVisiblePixels) {
    return sourceCanvas;
  }

  const needsTrim = minX > 0 || minY > 0 || maxX < width - 1 || maxY < height - 1;
  if (!needsTrim) {
    return sourceCanvas;
  }

  const trimmedWidth = maxX - minX + 1;
  const trimmedHeight = maxY - minY + 1;
  const trimmedCanvas = document.createElement("canvas");
  trimmedCanvas.width = trimmedWidth;
  trimmedCanvas.height = trimmedHeight;

  const trimmedContext = trimmedCanvas.getContext("2d");
  if (!trimmedContext) {
    return sourceCanvas;
  }

  trimmedContext.drawImage(
    sourceCanvas,
    minX,
    minY,
    trimmedWidth,
    trimmedHeight,
    0,
    0,
    trimmedWidth,
    trimmedHeight
  );

  return trimmedCanvas;
}

/**
 * Flattens transparent pixels to an explicit solid background color.
 *
 * @param {HTMLCanvasElement} sourceCanvas - Canvas to flatten.
 * @param {string} backgroundColor - Solid fill color.
 * @returns {HTMLCanvasElement} Original or flattened canvas.
 */
export function fillTransparentCanvasPixels(sourceCanvas, backgroundColor = "rgb(255, 255, 255)") {
  if (!(sourceCanvas instanceof HTMLCanvasElement)) {
    return sourceCanvas;
  }

  const width = sourceCanvas.width;
  const height = sourceCanvas.height;
  if (width <= 0 || height <= 0) {
    return sourceCanvas;
  }

  const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
  if (!sourceContext) {
    return sourceCanvas;
  }

  const sourcePixels = sourceContext.getImageData(0, 0, width, height).data;
  let hasTransparency = false;

  for (let index = 3; index < sourcePixels.length; index += 4) {
    if (sourcePixels[index] < 255) {
      hasTransparency = true;
      break;
    }
  }

  if (!hasTransparency) {
    return sourceCanvas;
  }

  const flattenedCanvas = document.createElement("canvas");
  flattenedCanvas.width = width;
  flattenedCanvas.height = height;
  const flattenedContext = flattenedCanvas.getContext("2d");

  if (!flattenedContext) {
    return sourceCanvas;
  }

  flattenedContext.fillStyle = backgroundColor;
  flattenedContext.fillRect(0, 0, width, height);
  flattenedContext.drawImage(sourceCanvas, 0, 0);

  return flattenedCanvas;
}

/**
 * Generates and downloads a PDF that mirrors the provided resume element's
 * current browser styling (including active theme/palette variables).
 *
 * @param {HTMLElement} element - Root resume element to export.
 * @param {Object} [options] - Export options.
 * @param {string} [options.fileName="resume.pdf"] - Downloaded file name.
 * @param {number} [options.marginPt=24] - PDF page margin in points.
 * @param {number} [options.pixelRatio=2] - Capture quality scale.
 * @returns {Promise<string>} Resolved downloaded file name.
 */
export async function downloadResumePdf(
  element,
  { fileName = "resume.pdf", marginPt = DEFAULT_MARGIN_PT, pixelRatio = DEFAULT_PIXEL_RATIO } = {}
) {
  if (!(element instanceof HTMLElement)) {
    throw new Error("A valid resume root element is required for PDF export.");
  }

  const rect = element.getBoundingClientRect();
  const nodeWidth = Math.max(
    1,
    Math.ceil(
      Number.isFinite(rect.width) && rect.width > 0
        ? rect.width
        : element.clientWidth || element.offsetWidth || element.scrollWidth
    )
  );
  const nodeHeight = Math.max(
    1,
    Math.ceil(
      Number.isFinite(rect.height) && rect.height > 0
        ? rect.height
        : element.clientHeight || element.offsetHeight || element.scrollHeight
    )
  );
  const safePixelRatio = Math.max(1, Number(pixelRatio) || DEFAULT_PIXEL_RATIO);
  const orientation = getPdfOrientation(nodeWidth, nodeHeight);
  const resolvedFileName = normalizePdfFileName(fileName);
  const computedStyles = window.getComputedStyle(element);
  const exportBackgroundColor = resolveExportBackgroundColor(computedStyles);
  const canvas = await toCanvas(element, {
    cacheBust: true,
    width: nodeWidth,
    height: nodeHeight,
    pixelRatio: safePixelRatio,
    backgroundColor: computedStyles.backgroundColor,
    style: {
      margin: "0",
      width: `${nodeWidth}px`,
      maxWidth: `${nodeWidth}px`,
      borderRadius: "0",
    },
  });

  const normalizedCanvas = trimTransparentCanvasMargins(canvas);
  const filledCanvas = fillTransparentCanvasPixels(normalizedCanvas, exportBackgroundColor);
  const rowComplexityScores = computeCanvasRowComplexityScores(filledCanvas);

  const pdf = new jsPDF({
    orientation,
    unit: "pt",
    format: "a4",
    compress: true,
  });

  const pageWidthPt = pdf.internal.pageSize.getWidth();
  const pageHeightPt = pdf.internal.pageSize.getHeight();
  const numericMarginPt = Number(marginPt);
  const safeMarginPt = Math.max(
    0,
    Number.isFinite(numericMarginPt) ? numericMarginPt : DEFAULT_MARGIN_PT
  );
  const { contentWidthPt, slices } = buildPageSlices({
    imageWidthPx: filledCanvas.width,
    imageHeightPx: filledCanvas.height,
    pageWidthPt,
    pageHeightPt,
    marginPt: safeMarginPt,
    rowComplexityScores,
  });

  if (!slices.length) {
    throw new Error("Unable to generate PDF pages from the rendered resume.");
  }

  const sliceCanvas = document.createElement("canvas");
  sliceCanvas.width = filledCanvas.width;

  slices.forEach((slice, index) => {
    const startYPx = Math.floor(slice.yPx);
    const endYPx = Math.min(filledCanvas.height, Math.ceil(slice.yPx + slice.heightPx));
    const sliceHeightPx = Math.max(1, endYPx - startYPx);
    sliceCanvas.height = sliceHeightPx;

    const sliceContext = sliceCanvas.getContext("2d");
    if (!sliceContext) {
      throw new Error("Unable to prepare canvas context for PDF page rendering.");
    }

    sliceContext.clearRect(0, 0, sliceCanvas.width, sliceCanvas.height);
    sliceContext.drawImage(
      filledCanvas,
      0,
      startYPx,
      filledCanvas.width,
      sliceHeightPx,
      0,
      0,
      sliceCanvas.width,
      sliceCanvas.height
    );

    const renderedHeightPt = (sliceHeightPx * contentWidthPt) / filledCanvas.width;
    const imageDataUrl = sliceCanvas.toDataURL("image/png");

    if (index > 0) {
      pdf.addPage();
    }

    pdf.addImage(
      imageDataUrl,
      "PNG",
      safeMarginPt,
      safeMarginPt,
      contentWidthPt,
      renderedHeightPt,
      undefined,
      "FAST"
    );
  });

  const maybePromise = pdf.save(resolvedFileName, { returnPromise: true });
  if (maybePromise && typeof maybePromise.then === "function") {
    await maybePromise;
  }

  return resolvedFileName;
}
