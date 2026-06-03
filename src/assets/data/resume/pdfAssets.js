/**
 * @file pdfAssets.js
 * @description Theme-aware resume PDF asset helpers.
 * @module assets/data/resume/pdfAssets
 */

import seniorDeveloperResumePdf from "./Kyle_Foster_Senior_Developer_Resume.pdf";

export const RESUME_PDF_HREFS = Object.freeze({
  light: seniorDeveloperResumePdf,
  dark: seniorDeveloperResumePdf,
});

/**
 * Resolves a raw theme value to an effective light/dark theme.
 *
 * @param {unknown} theme - Theme identifier from theme context.
 * @returns {"light" | "dark"} Effective theme identifier.
 */
function resolveEffectiveTheme(theme) {
  if (theme === "light" || theme === "dark") {
    return theme;
  }

  if (theme === "auto") {
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
  }

  return "dark";
}

/**
 * Resolves the resume PDF href for the provided theme.
 *
 * @param {unknown} theme - Theme identifier from theme context.
 * @returns {string} Theme-matched PDF URL.
 */
export function resolveResumePdfHref(theme) {
  const effectiveTheme = resolveEffectiveTheme(theme);
  return RESUME_PDF_HREFS[effectiveTheme];
}
