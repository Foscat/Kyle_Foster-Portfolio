/**
 * @file resumePdfExport.js
 * @description Browser-side resume PDF generation helpers.
 * @module components/features/ResumePreview/resumePdfExport
 */

import { toCanvas } from "html-to-image";
import { jsPDF } from "jspdf";

const DEFAULT_MARGIN_PT = 24;
const DEFAULT_PIXEL_RATIO = 2;

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
 * @returns {{contentWidthPt:number, contentHeightPt:number, slices:Array<{yPx:number, heightPx:number}>}}
 */
export function buildPageSlices({
  imageWidthPx,
  imageHeightPx,
  pageWidthPt,
  pageHeightPt,
  marginPt = DEFAULT_MARGIN_PT,
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
  const slices = [];

  let yPx = 0;
  while (yPx < imageHeightPx - 0.5) {
    const remainingHeightPx = imageHeightPx - yPx;
    const heightPx = Math.max(1, Math.min(maxSliceHeightPx, remainingHeightPx));

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

  const nodeWidth = element.scrollWidth || element.clientWidth || element.offsetWidth;
  const nodeHeight = element.scrollHeight || element.clientHeight || element.offsetHeight;
  const safePixelRatio = Math.max(1, Number(pixelRatio) || DEFAULT_PIXEL_RATIO);
  const orientation = getPdfOrientation(nodeWidth, nodeHeight);
  const resolvedFileName = normalizePdfFileName(fileName);
  const computedStyles = window.getComputedStyle(element);
  const canvas = await toCanvas(element, {
    cacheBust: true,
    width: nodeWidth,
    height: nodeHeight,
    pixelRatio: safePixelRatio,
    backgroundColor: computedStyles.backgroundColor,
  });

  const pdf = new jsPDF({
    orientation,
    unit: "pt",
    format: "a4",
    compress: true,
  });

  const pageWidthPt = pdf.internal.pageSize.getWidth();
  const pageHeightPt = pdf.internal.pageSize.getHeight();
  const safeMarginPt = Math.max(0, Number(marginPt) || DEFAULT_MARGIN_PT);
  const { contentWidthPt, slices } = buildPageSlices({
    imageWidthPx: canvas.width,
    imageHeightPx: canvas.height,
    pageWidthPt,
    pageHeightPt,
    marginPt: safeMarginPt,
  });

  if (!slices.length) {
    throw new Error("Unable to generate PDF pages from the rendered resume.");
  }

  const sliceCanvas = document.createElement("canvas");
  sliceCanvas.width = canvas.width;

  slices.forEach((slice, index) => {
    const startYPx = Math.floor(slice.yPx);
    const endYPx = Math.min(canvas.height, Math.ceil(slice.yPx + slice.heightPx));
    const sliceHeightPx = Math.max(1, endYPx - startYPx);
    sliceCanvas.height = sliceHeightPx;

    const sliceContext = sliceCanvas.getContext("2d");
    if (!sliceContext) {
      throw new Error("Unable to prepare canvas context for PDF page rendering.");
    }

    sliceContext.clearRect(0, 0, sliceCanvas.width, sliceCanvas.height);
    sliceContext.drawImage(
      canvas,
      0,
      startYPx,
      canvas.width,
      sliceHeightPx,
      0,
      0,
      sliceCanvas.width,
      sliceCanvas.height
    );

    const renderedHeightPt = (sliceHeightPx * contentWidthPt) / canvas.width;
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
