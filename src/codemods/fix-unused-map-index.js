/**
 * Codemod: Rename unused map index to _index
 *
 * - Detects map callbacks
 * - Renames unused index param to _index
 * - ESLint-compatible
 * - No logic changes
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
