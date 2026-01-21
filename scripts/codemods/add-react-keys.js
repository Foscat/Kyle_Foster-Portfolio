/**
 * Codemod: Add missing React key props
 *
 * - Only touches JSX returned from array.map()
 * - Skips if key already exists
 * - Uses item.id when available
 * - Falls back to index-based key if needed
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
