import js from "@eslint/js";
import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      jsdoc,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },

    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/keyof/]",
          message:
            "JSDoc generator does not support 'keyof'. Use literal unions instead.",
        },
      ],
      "jsdoc/check-alignment": "error",
      "jsdoc/check-indentation": "error",
      "jsdoc/check-param-names": "error",
      "jsdoc/check-tag-names": "error",
      "jsdoc/check-types": "error",
      "jsdoc/valid-types": "error",
      "jsdoc/check-alignment": "error",
      "jsdoc/check-indentation": "error",
      "jsdoc/check-param-names": "error",
      "jsdoc/check-tag-names": "error",
      "jsdoc/check-types": "error",
      "jsdoc/valid-types": "error",
      "jsdoc/no-multi-asterisks": "error",

      "jsdoc/tag-lines": ["error", "any", { startLines: 1 }],
      "jsdoc/require-hyphen-before-param-description": "always",

      /* ============================================================
       * React – correctness & consistency
       * ============================================================ */

      "react/jsx-uses-react": "off", // React 17+
      "react/react-in-jsx-scope": "off",

      "react/jsx-key": "error",
      "react/no-array-index-key": "warn",
      "react/no-unused-prop-types": "warn",
      "react/prop-types": "off", // JSDoc replaces PropTypes

      "react/self-closing-comp": "error",
      "react/jsx-boolean-value": ["error", "never"],

      /* ============================================================
       * React Hooks
       * ============================================================ */

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /* ============================================================
       * Accessibility (a11y)
       * ============================================================ */

      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",

      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/no-static-element-interactions": "error",
      "jsx-a11y/no-noninteractive-element-interactions": "error",

      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/control-has-associated-label": [
        "error",
        {
          labelAttributes: ["label", "ariaLabel"],
        },
      ],
    },
  },
]);
