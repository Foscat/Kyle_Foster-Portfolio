import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import jsdoc from "eslint-plugin-jsdoc";

export default [
  // ---------------------------------------------
  // Ignore noise
  // ---------------------------------------------
  {
    ignores: ["dist/**", "docs/**", "node_modules/**"],
  },
  // ---------------------------------------------
  // Base JS (safe, boring, stable)
  // ---------------------------------------------
  js.configs.recommended,
  {
    files: ["src/types/**/*.js"],
    plugins: { jsdoc },
    rules: {
      "jsdoc/valid-types": "error",
      "jsdoc/check-tag-names": "error",
      "jsdoc/require-param-type": "error",
    },
  },

  // ---------------------------------------------
  // React / JSX files
  // ---------------------------------------------
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024,
        ...globals.jest,
        ...globals.vitest,
        ...globals.devtools,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "unused-imports": unusedImports,
    },
    rules: {
      // 🔴 MUST be off — JSX usage breaks this rule
      "no-unused-vars": "off",

      // ✅ JSX-aware replacement
      "unused-imports/no-unused-imports": "off",
      "unused-imports/no-unused-vars": "off",

      // React correctness
      "react/jsx-key": "error",
      "react/react-in-jsx-scope": "off",
    },
  },

  // ---------------------------------------------
  // Node / config files (allow require)
  // ---------------------------------------------
  {
    files: [
      "*.config.js",
      "vite.config.js",
      "vitest.config.js",
      "playwright.config.js",
      "scripts/**/*.js",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
];
