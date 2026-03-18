const stylelint = require("stylelint");

const ruleName = "tokens/validate";
const messages = stylelint.utils.ruleMessages(ruleName, {
  missingRGB: (token) => `Token "${token}" is missing its RGB companion "${token}-rgb".`,
  orphanRGB: (token) => `RGB token "${token}" has no matching base token.`,
  duplicate: (token) => `Duplicate design token "${token}" detected.`,
});

module.exports = stylelint.createPlugin(ruleName, () => {
  return (root, result) => {
    const tokens = new Map();
    const rgbTokens = new Map();

    root.walkDecls((decl) => {
      if (!decl.prop.startsWith("--")) return;

      const name = decl.prop;

      if (tokens.has(name)) {
        stylelint.utils.report({
          message: messages.duplicate(name),
          node: decl,
          result,
          ruleName,
        });
      }

      tokens.set(name, decl);

      if (name.endsWith("-rgb")) {
        rgbTokens.set(name.replace("-rgb", ""), decl);
      }
    });

    tokens.forEach((decl, name) => {
      if (name.endsWith("-rgb")) return;

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
