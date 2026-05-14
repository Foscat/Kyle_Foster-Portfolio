/**
 * @file pdfAssets.js
 * @description Theme-aware resume PDF asset helpers.
 * @module assets/data/resume/pdfAssets
 */

import resumeLightPdf from "./Kyle Foster _ Senior React _ Frontend Engineer_LightMode.pdf";
import resumeDarkPdf from "./Kyle Foster _ Senior React _ Frontend Engineer_DarkMode.pdf";

export const RESUME_PDF_HREFS = Object.freeze({
  light: resumeLightPdf,
  dark: resumeDarkPdf,
});

/**
 * Resolves the resume PDF href for the provided theme.
 *
 * @param {unknown} theme - Theme identifier from theme context.
 * @returns {string} Theme-matched PDF URL.
 */
export function resolveResumePdfHref(theme) {
  return theme === "light" ? RESUME_PDF_HREFS.light : RESUME_PDF_HREFS.dark;
}
