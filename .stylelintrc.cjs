module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],

  plugins: ["stylelint-order", "./scripts/css-token-validator.cjs"],

  rules: {
    /*
    ==========================================================
    Core Safety
    ==========================================================
    */

    "no-duplicate-selectors": true,
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-shorthand-property-overrides": true,

    /*
    ==========================================================
    Do NOT rewrite intentional CSS
    ==========================================================
    */

    "property-no-vendor-prefix": null,
    "value-no-vendor-prefix": null,
    "selector-no-vendor-prefix": null,

    "color-function-notation": null,
    "alpha-value-notation": null,
    "value-keyword-case": null,
    "function-name-case": null,
    "selector-pseudo-element-case": null,

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
    "rgba-function-notation": null,
    "tokens/validate": true,

    /*
    ==========================================================
    Practical relaxations for real-world CSS
    ==========================================================
    */

    "selector-class-pattern": null,
    "no-descending-specificity": null,
    "keyframes-name-pattern": null,

    /*
    ==========================================================
    Property Ordering (readability)
    ==========================================================
    */

    "order/properties-order": [
      [
        /* Layout */
        "position",
        "top",
        "right",
        "bottom",
        "left",
        "z-index",

        /* Flex/Grid */
        "display",
        "flex",
        "flex-direction",
        "flex-wrap",
        "justify-content",
        "align-items",
        "align-content",
        "gap",

        /* Box Model */
        "width",
        "height",
        "margin",
        "padding",

        /* Typography */
        "font",
        "font-family",
        "font-size",
        "font-weight",
        "line-height",
        "text-align",
        "color",

        /* Visual */
        "background",
        "background-color",
        "border",
        "border-radius",
        "box-shadow",
        "opacity",

        /* Animation */
        "transform",
        "transition",
      ],
    ],
  },
};
