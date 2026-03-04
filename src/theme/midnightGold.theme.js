// src/theme/midnightGold.theme.js

export const MidnightGoldTheme = {
  id: "midnight-gold",

  breakpoints: {
    mobile: 768,
    tablet: 1024,
  },

  /**
   * Spacing tokens per breakpoint tier.
   * These should match your layout rhythm (sections, gutters, card padding).
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
   * CSS variable mapping for runtime sync.
   * Keep it explicit so you can rename tokens without accidental exports.
   */
  cssVars: {
    spacing: {
      section: "--spacing-section",
      gutter: "--spacing-gutter",
      cardPadding: "--spacing-cardPadding",
    },
  },
};
