/**
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
