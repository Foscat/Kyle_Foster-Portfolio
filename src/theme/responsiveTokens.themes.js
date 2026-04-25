/**
 * @file responsiveTokens.themes.js
 * @fileoverview Registry + resolver helpers for responsive token theme variants.
 * @module theme/ResponsiveTokenThemes
 */

import { ResponsiveTokensCompactTheme } from "./responsiveTokensCompact.theme.js";
import { ResponsiveTokensEditorialTheme } from "./responsiveTokensEditorial.theme.js";
import { ResponsiveTokensSpaciousTheme } from "./responsiveTokensSpacious.theme.js";
import { ResponsiveTokensTheme } from "./responsiveTokens.theme.js";

export const RESPONSIVE_TOKEN_THEMES = Object.freeze({
  default: ResponsiveTokensTheme,
  compact: ResponsiveTokensCompactTheme,
  spacious: ResponsiveTokensSpaciousTheme,
  editorial: ResponsiveTokensEditorialTheme,
});

const RESPONSIVE_TOKEN_THEMES_BY_ID = Object.freeze(
  Object.values(RESPONSIVE_TOKEN_THEMES).reduce((lookup, themeConfig) => {
    lookup[themeConfig.id] = themeConfig;
    return lookup;
  }, {})
);

export const DEFAULT_RESPONSIVE_TOKENS_THEME = RESPONSIVE_TOKEN_THEMES.default;
export const RESPONSIVE_TOKEN_THEME_KEYS = Object.freeze(Object.keys(RESPONSIVE_TOKEN_THEMES));
export const RESPONSIVE_TOKEN_THEME_IDS = Object.freeze(
  Object.values(RESPONSIVE_TOKEN_THEMES).map((themeConfig) => themeConfig.id)
);

/**
 * @param {string | undefined | null} requestedThemeKey
 * @returns {typeof DEFAULT_RESPONSIVE_TOKENS_THEME}
 */
export function resolveResponsiveTokensTheme(requestedThemeKey) {
  if (typeof requestedThemeKey !== "string") {
    return DEFAULT_RESPONSIVE_TOKENS_THEME;
  }

  const normalizedKey = requestedThemeKey.trim().toLowerCase();
  if (!normalizedKey) {
    return DEFAULT_RESPONSIVE_TOKENS_THEME;
  }

  return (
    RESPONSIVE_TOKEN_THEMES[normalizedKey] ??
    RESPONSIVE_TOKEN_THEMES_BY_ID[normalizedKey] ??
    DEFAULT_RESPONSIVE_TOKENS_THEME
  );
}
