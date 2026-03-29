const stylelint = require("stylelint");

/** Returns true only when a token's value is a raw (non-var) color literal.
 * Tokens that compose via var() don't need their own -rgb companion because
 * the base palette token they reference already provides one.
 * Values like box-shadows, borders, and gradients that *contain* a color
 * expression are not "color tokens" — the value must start with a color
 * function or hex literal to qualify.
 */
function needsRgbCompanion(value) {
  const trimmed = value.trim();
  if (/\bvar\s*\(/.test(trimmed)) return false;
  return (
    /^(?:rgba?|hsla?|hwb|oklch|oklab|lab|lch)\s*\(/.test(trimmed) ||
    /^#[0-9a-fA-F]{3,8}/.test(trimmed)
  );
}

const ruleName = "tokens/validate";
const messages = stylelint.utils.ruleMessages(ruleName, {
  missingRGB: (token) => `Token "${token}" is missing its RGB companion "${token}-rgb".`,
  orphanRGB: (token) => `RGB token "${token}" has no matching base token.`,
  duplicate: (token) => `Duplicate design token "${token}" detected.`,
});

module.exports = stylelint.createPlugin(ruleName, () => {
  return (root, result) => {
    // Per-scope duplicate tracking keyed by parent node identity so that
    // intentional theme overrides (e.g. html[data-theme="light"] { ... })
    // are not confused with true duplicates inside the same rule block.
    const scopedSeen = new WeakMap();

    // Global registry for companion / orphan checks (first decl wins).
    const tokens = new Map();
    const rgbTokens = new Map();

    root.walkDecls((decl) => {
      if (!decl.prop.startsWith("--")) return;

      const name = decl.prop;
      const parent = decl.parent;

      // Duplicate detection: only within the same rule/at-rule block.
      if (parent) {
        if (!scopedSeen.has(parent)) scopedSeen.set(parent, new Set());
        const seen = scopedSeen.get(parent);
        if (seen.has(name)) {
          stylelint.utils.report({
            message: messages.duplicate(name),
            node: decl,
            result,
            ruleName,
          });
        }
        seen.add(name);
      }

      if (!tokens.has(name)) tokens.set(name, decl);

      if (name.endsWith("-rgb")) {
        rgbTokens.set(name.replace("-rgb", ""), decl);
      }
    });

    tokens.forEach((decl, name) => {
      if (name.endsWith("-rgb")) return;
      if (!needsRgbCompanion(decl.value)) return;
      if (!rgbTokens.has(name)) {
        stylelint.utils.report({
          message: messages.missingRGB(name),
          node: decl,
          result,
          ruleName,
        });
      }
    });

    rgbTokens.forEach((decl, base) => {
      if (!tokens.has(base)) {
        stylelint.utils.report({
          message: messages.orphanRGB(base + "-rgb"),
          node: decl,
          result,
          ruleName,
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
