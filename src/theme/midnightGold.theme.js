/**
 * @file midnightGold.theme.js
 * @fileoverview Theme configuration for the Midnight Gold design, defining breakpoints, spacing tokens, and CSS variable mappings for consistent styling across the application.
 * @module theme/MidnightGoldTheme
 */

/**
 * @public
 * @constant {Object} MidnightGoldTheme - Theme configuration object for the Midnight Gold design.
 * The `MidnightGoldTheme` object defines the following properties:
 * - `id`: A unique identifier for the theme, used for reference and application.
 * - `breakpoints`: An object defining the pixel widths for different responsive tiers (mobile, tablet, desktop).
 * - `spacing`: An object containing spacing tokens for each breakpoint tier, including section spacing, gutter spacing, and card padding. These tokens should align with the layout rhythm of the application to ensure consistent spacing across components.
 * - `cssVars`: An object mapping the spacing tokens to CSS variable names, allowing for dynamic application of spacing values in stylesheets and inline styles. This mapping ensures that changes to the theme's spacing tokens are automatically reflected in the CSS variables used throughout the application, enabling easy theming and customization.
 */
export const MidnightGoldTheme = {
  id: "midnight-gold",

  breakpoints: {
    mobile: 768,
    tablet: 1024,
  },

  /**
 * @description Spacing tokens per breakpoint tier. These should match your layout rhythm (sections, gutters, card padding). /
 */
  spacing: {
    mobile: {
      section: "1.25rem",
      gutter: "1rem",
      cardPadding: "1rem",
    },
    tablet: {
      section: "2rem",
      gutter: "1.5rem",
      cardPadding: "1.25rem",
    },
    desktop: {
      section: "3rem",
      gutter: "2rem",
      cardPadding: "1.5rem",
    },
  },

  /**
 * @description CSS variable mapping for runtime sync. Keep it explicit so you can rename tokens without accidental exports. /
 */
  cssVars: {
    spacing: {
      section: "--spacing-section",
      gutter: "--spacing-gutter",
      cardPadding: "--spacing-cardPadding",
    },
  },
};
