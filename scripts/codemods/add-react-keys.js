/**
 * @module scripts\codemods\add-react-keys
 * @file add-react-keys.js
 * @description
 * Codemod that adds missing React `key` props to JSX elements
 * returned from array `.map()` calls.
 *
 * Scope & Safety:
 * - Only processes JSX inside `.map()` callbacks
 * - Skips elements that already define a `key`
 * - Prefers semantic keys (`item.id`) when available
 * - Falls back to index-based keys only when necessary
 *
 * IMPORTANT:
 * - This codemod mutates source code
 * - It should be run on a clean git working tree
 * - Review diffs carefully before committing
 *
 * Safe to re-run:
 * - Yes (idempotent when keys already exist)
 *
 * Not affected:
 * - Non-map JSX
 * - Conditional rendering
 * - JSX outside of `.map()` callbacks
 */

/**
 * @function addReactKeys
 * @description Main codemod function that traverses the AST to find JSX elements
 * returned from array `.map()` calls and adds missing `key` props.
 * The function uses `jscodeshift` to manipulate the AST and applies the following logic:
 * 1. Identify `.map()` calls and their callback functions.
 * 2. For each JSX element returned from the callback, check if it already has a `key` prop.
 * 3. If not, attempt to add a `key` prop using the following priority:
 *    a. If the callback has an item parameter (e.g., `item`), use `item.id` as the key.
 *    b. If the callback has an index parameter (e.g., `index`), use the index as a fallback key.
 * 4. Skip any JSX elements that already have a `key` prop defined.
 *
 * @param {*} file - The file object provided by `jscodeshift`, containing the source code to be transformed.
 * @param {*} api - The `jscodeshift` API object, used for AST manipulation.
 * @returns {string} The transformed source code with added `key` props.
 */
export default function addReactKeys(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  root
    .find(j.CallExpression, {
      callee: {
        property: { name: "map" },
      },
    })
    .forEach((path) => {
      const callback = path.node.arguments[0];
      if (!callback || !callback.params.length) return;

      const itemParam = callback.params[0];
      const indexParam = callback.params[1];

      // Locate array.map() calls, which are the only valid
      // context where React requires stable `key` props.
      j(callback.body)
        .find(j.JSXElement)
        .forEach((jsxPath) => {
          const opening = jsxPath.node.openingElement;

          const hasKey = opening.attributes.some((attr) => attr.name && attr.name.name === "key");

          if (hasKey) return;

          // Prefer item.id
          let keyExpression = null;

          if (itemParam && itemParam.type === "Identifier") {
            keyExpression = j.memberExpression(itemParam, j.identifier("id"));
          }

          // Fallback: index-based key
          if (!keyExpression && indexParam) {
            keyExpression = indexParam;
          }

          if (!keyExpression) return;

          opening.attributes.unshift(
            j.jsxAttribute(j.jsxIdentifier("key"), j.jsxExpressionContainer(keyExpression))
          );
        });
    });

  return root.toSource();
}
