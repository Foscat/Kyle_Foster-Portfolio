/**
 * @module scripts\codemods\fix-jsdoc-import-types
 * @file fix-jsdoc-import-types.js
 * @description
 * Codemod that rewrites unsupported JSDoc `import()` type references
 * into plain type identifiers.
 *
 * Converts:
 *   {TypeName}
 * Into:
 *   {TypeName}
 *
 * Motivation:
 * - JSDoc (and jsdoc-to-markdown) do not support `import()` types
 * - This causes documentation generation to fail
 *
 * Safety:
 * - Only operates on comment text
 * - Does NOT modify executable code
 * - Does NOT rewrite ambiguous import expressions
 *
 * Safe to re-run:
 * - Yes (idempotent once rewritten)
 *
 * Failure behavior:
 * - Leaves source unchanged if no safe replacement is found
 */

/**
 * @function fixJsdocImportTypes
 * @description Codemod function that rewrites unsupported JSDoc `import()` type references into plain type identifiers.
 * @param {*} file - The file object provided by `jscodeshift`, containing the source code to be transformed.
 * @param {*} api - The `jscodeshift` API object, used for AST manipulation.
 * @returns {string} The transformed source code with fixed JSDoc import types.
 */
const fixJsdocImportTypes = (file, api) => {
  /* eslint-disable no-unused-vars */
  const j = api.jscodeshift;
  /* eslint-enable no-unused-vars */
  const source = file.source;

  let didChange = false;

  // Match only well-formed JSDoc import type references.
  // If the type name cannot be inferred safely, no replacement occurs.
  const fixed = source.replace(/\{import\([^)]+\)\.([A-Za-z0-9_]+)\}/g, (_, typeName) => {
    didChange = true;
    return `{${typeName}}`;
  });

  if (didChange) {
    return fixed;
  }

  return source;
};

export default fixJsdocImportTypes;
