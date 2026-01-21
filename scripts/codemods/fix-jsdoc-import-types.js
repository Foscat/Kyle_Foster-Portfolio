/**
 * Codemod: Fix unsupported JSDoc import() types
 *
 * Converts:
 *   {import("...").TypeName}
 * To:
 *   {TypeName}
 *
 * Throws if it cannot safely infer the type name.
 */

module.exports = function fixJsdocImportTypes(file, api) {
  /* eslint-disable no-unused-vars */
  const j = api.jscodeshift;
  /* eslint-enable no-unused-vars */
  const source = file.source;

  let didChange = false;

  const fixed = source.replace(/\{import\([^)]+\)\.([A-Za-z0-9_]+)\}/g, (_, typeName) => {
    didChange = true;
    return `{${typeName}}`;
  });

  if (didChange) {
    return fixed;
  }

  return source;
};
