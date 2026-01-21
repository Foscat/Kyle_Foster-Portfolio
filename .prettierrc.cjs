/** @type {import("prettier").Config} */
module.exports = {
  // General formatting
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "always",

  // JSX / React
  jsxSingleQuote: false,
  bracketSameLine: false,

  // Markdown safety
  proseWrap: "preserve",

  // Prevent Prettier from reformatting embedded content
  embeddedLanguageFormatting: "off",

  // Line endings (Windows-safe, CI-safe)
  endOfLine: "lf",
};
