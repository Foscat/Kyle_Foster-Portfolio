/**
 * @file responsiveTokensEditorial.theme.js
 * @fileoverview Editorial responsive token configuration for roomy reading layouts.
 * @module theme/ResponsiveTokensEditorialTheme
 */

export const ResponsiveTokensEditorialTheme = {
  id: "responsive-tokens-editorial",

  breakpoints: {
    mobile: 768,
    tablet: 1100,
  },

  spacing: {
    mobile: {
      section: "1.375rem",
      gutter: "1.125rem",
      cardPadding: "1.125rem",
    },
    tablet: {
      section: "2.25rem",
      gutter: "1.75rem",
      cardPadding: "1.5rem",
    },
    desktop: {
      section: "3.5rem",
      gutter: "2.5rem",
      cardPadding: "2rem",
    },
  },

  cssVars: {
    spacing: {
      section: "--spacing-section",
      gutter: "--spacing-gutter",
      cardPadding: "--spacing-cardPadding",
    },
  },
};
