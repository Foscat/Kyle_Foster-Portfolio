/**
 * @module scripts\codemods\fix-unused-map-index
 * @file fix-unused-map-index.js
 * @description
 * Codemod that renames unused `.map()` index parameters to `_index`.
 *
 * Motivation:
 * - ESLint flags unused variables as errors or warnings
 * - Renaming unused parameters preserves intent while satisfying lint rules
 *
 * Behavior:
 * - Detects `.map((item, index) => ...)` callbacks
 * - Renames `index` only if it is not referenced
 * - Leaves used index parameters untouched
 *
 * IMPORTANT:
 * - This codemod modifies function signatures
 * - It does NOT change runtime behavior
 *
 * Safe to re-run:
 * - Yes
 *
 * Not affected:
 * - `.map()` calls with a single parameter
 * - Non-Identifier index parameters
 */

/**
 * @function fixUnusedMapIndex
 * @description Main codemod function that traverses the AST to find `.map()` calls and renames unused index parameters to `_index`.
 * The function uses `jscodeshift` to manipulate the AST and applies the following logic:
 * 1. Identify `.map()` calls and their callback functions.
 * 2. Check if the callback has at least two parameters (item and index).
 * 3. Verify that the second parameter (index) is an Identifier.
 * 4. Traverse the callback body to check if the index parameter is referenced.
 * 5. If the index parameter is not used, rename it to `_index`.
 * @param {*} file
 * @param {*} api
 * @returns {string} Updated source code after codemod transformations.
 */
export default function fixUnusedMapIndex(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.CallExpression, {
      callee: { property: { name: "map" } },
    })
    .forEach((path) => {
      const callback = path.node.arguments[0];
      if (!callback || callback.params.length < 2) return;

      const indexParam = callback.params[1];
      if (indexParam.type !== "Identifier") return;

      const name = indexParam.name;
      let used = false;

      j(callback.body)
        .find(j.Identifier, { name })
        .forEach(() => {
          used = true;
        });

      if (!used) {
        indexParam.name = `_index`;
      }
    });

  return root.toSource();
}
