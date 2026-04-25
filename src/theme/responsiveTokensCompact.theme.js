/**
 * @file responsiveTokensCompact.theme.js
 * @fileoverview Compact responsive token configuration with tighter spacing.
 * @module theme/ResponsiveTokensCompactTheme
 */

export const ResponsiveTokensCompactTheme = {
  id: "responsive-tokens-compact",

  breakpoints: {
    mobile: 700,
    tablet: 980,
  },

  spacing: {
    mobile: {
      section: "1rem",
      gutter: "0.75rem",
      cardPadding: "0.875rem",
    },
    tablet: {
      section: "1.5rem",
      gutter: "1.125rem",
      cardPadding: "1rem",
    },
    desktop: {
      section: "2.25rem",
      gutter: "1.5rem",
      cardPadding: "1.25rem",
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
