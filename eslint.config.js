import jsdoc from "eslint-plugin-jsdoc";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import unusedImports from "eslint-plugin-unused-imports";


/**
 * ESLint Flat Config – Final
 * ============================================================
 * Goals:
 * - Zero JSX parse errors
 * - No false positives
 * - Strict where correctness matters
 * - Quiet everywhere else
 */

export default [
  // ==========================================================
  // 1️⃣ GLOBAL BASE (applies everywhere)
  // ==========================================================
  {
    ignores: ["dist/**", "docs/**", "node_modules/**"],

    languageOptions: {
      ecmaVersion: "latest",
    },

    rules: {
      // Core safety
      "no-undef": "error",
      "no-console": "off",
      "no-unused-vars": "warn",
      /**
       * Safe unused import cleanup
       * - Never touches used identifiers
       * - Never rewrites logic
       */
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^React$",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },

  // ==========================================================
  // 2️⃣ REACT APPLICATION CODE (JSX + browser)
  // ==========================================================
  {
    files: ["src/**/*.{js,jsx}"],

    plugins: {
      react,
      import: importPlugin,
      jsdoc,
      "jsx-a11y": jsxA11y,
      "unused-imports": unusedImports,
    },

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
      },
    },

    rules: {
      /**
       * Imports
       * - Keep files readable
       * - Never break runtime
       */
      "import/first": "warn",
      "import/no-duplicates": "warn",
      /**
       * Safe unused import cleanup
       * - Never touches used identifiers
       * - Never rewrites logic
       */
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^React$",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      /**
       * React
       */
      "react/jsx-key": "error",
      "react/react-in-jsx-scope": "off",

      /**
       * Accessibility
       * Warn only (do not block dev)
       */
      "jsx-a11y/anchor-is-valid": "warn",

      /**
       * JSDoc
       * Only enforce syntax correctness here
       */
      "jsdoc/check-types": "error",

      /**
       * New JSX transform support
       * Ignore unused React import if present
       */
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^React$",
        },
      ],
    },
  },

  // ==========================================================
  // 3️⃣ TYPES + ARCHITECTURE (docs-critical)
  // ==========================================================
  {
    files: ["src/types/**/*.js", "src/navigation/**/*.js"],

    plugins: {
      jsdoc,
    },

    rules: {
      /**
       * These files power docs + type safety
       * They MUST be correct
       */
      "jsdoc/check-types": "error",
      "jsdoc/require-param": "error",
      "jsdoc/require-returns": "error",
    },
  },

  // ==========================================================
  // 4️⃣ TEST FILES (Vitest / jsdom)
  // ==========================================================
  {
    files: ["src/test/**/*.{js,jsx}", "**/*.test.{js,jsx}"],

    languageOptions: {
      globals: {
        global: "readonly",
        Element: "readonly",
        window: "readonly",
        document: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        vi: "readonly",
      },
    },

    rules: {
      "no-undef": "off",
      "jsdoc/check-types": "off",
    },
  },

  // ==========================================================
  // 5️⃣ TOOLING (ESM config files)
  // ==========================================================
  {
    files: ["vite.config.js", "vitest.config.js", "eslint.config.js"],

    languageOptions: {
      sourceType: "module",
    },

    rules: {
      "import/first": "off",
      "jsdoc/check-types": "off",
    },
  },

  // ==========================================================
  // 6️⃣ NODE / COMMONJS SCRIPTS
  // ==========================================================
  {
    files: ["*.cjs", "scripts/**", "codemods/**"],

    languageOptions: {
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly",
      },
    },

    rules: {
      "import/first": "off",
      "jsdoc/check-types": "off",
    },
  },
];
