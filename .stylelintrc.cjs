module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],

  plugins: ["stylelint-order", "./scripts/css-token-validator.cjs"],

  rules: {
    /*
    ==========================================================
    Core Safety
    ==========================================================
    */

    "no-duplicate-selectors": null,
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-shorthand-property-overrides": null,

    /*
    ==========================================================
    Do NOT rewrite intentional CSS
    ==========================================================
    */

    "property-no-vendor-prefix": null,
    "value-no-vendor-prefix": null,
    "selector-no-vendor-prefix": null,

    "color-function-notation": null,
    "color-function-alias-notation": null,
    "alpha-value-notation": null,
    "value-keyword-case": null,
    "function-name-case": null,

    /*
    ==========================================================
    Allow CSS variables (your design tokens)
    ==========================================================
    */

    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["/^--/"],
      },
    ],

    "custom-property-pattern": null,
    "custom-property-empty-line-before": null,
    "tokens/validate": true,

    /*
    ==========================================================
    Practical relaxations for real-world CSS
    ==========================================================
    */

    "selector-class-pattern": null,
    "no-descending-specificity": null,
    "keyframes-name-pattern": null,
    "comment-empty-line-before": null,
    "comment-no-empty": null,
    "color-hex-length": null,
    "media-feature-range-notation": null,
    "property-no-deprecated": null,

    /*
    ==========================================================
    Property Ordering — deferred to stylelint-config-recess-order
    ==========================================================
    */

    // The custom list below conflicted with both the recess-order extension
    // and the actual ordering used in production CSS. Disable the override
    // so stylelint-config-recess-order's comprehensive spec takes effect.
    "order/properties-order": null,
  },
};
