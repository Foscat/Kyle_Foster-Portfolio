/**
 * @file responsiveTokensSpacious.theme.js
 * @fileoverview Spacious responsive token configuration with larger rhythm.
 * @module theme/ResponsiveTokensSpaciousTheme
 */

export const ResponsiveTokensSpaciousTheme = {
  id: "responsive-tokens-spacious",

  breakpoints: {
    mobile: 820,
    tablet: 1180,
  },

  spacing: {
    mobile: {
      section: "1.5rem",
      gutter: "1.25rem",
      cardPadding: "1.125rem",
    },
    tablet: {
      section: "2.5rem",
      gutter: "2rem",
      cardPadding: "1.5rem",
    },
    desktop: {
      section: "4rem",
      gutter: "2.75rem",
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
