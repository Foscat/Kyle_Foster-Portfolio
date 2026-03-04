#!/usr/bin/env node

const fs = require("fs");
const glob = require("glob");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const process = require("process");
const console = require("console");
const t = require("@babel/types");

const { validateRichText } = require("./validate-richtext.cjs");
const { fixRichText } = require("./codemods/fix-richtext.cjs");

const shouldFix = process.argv.includes("--fix");

const files = glob.sync("src/assets/content/*.js");

let errorCount = 0;
let warnCount = 0;

files.forEach((file) => {
  console.log(`Checking ${file}...`);
  const source = fs.readFileSync(file, "utf8");

  const ast = parser.parse(source, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  let fileModified = false;

  traverse(ast, {
    ObjectExpression(pathNode) {
      const props = pathNode.node.properties;

      const typeProp = props.find((p) => (p.key?.name || p.key?.value) === "type");

      if (!typeProp) return;

      if (typeProp.value.type === "StringLiteral" && typeProp.value.value === "richText") {
        const contentProp = props.find((p) => (p.key?.name || p.key?.value) === "content");

        if (!contentProp || contentProp.value.type !== "ArrayExpression") return;

        const contentNode = contentProp.value;

        const content = evaluateNode(contentNode);

        const issues = validateRichText(content);

        issues.forEach((issue) => {
          console.log(
            `${issue.level.toUpperCase()} ${file} ${issue.path} ${issue.ruleId}: ${issue.message}`
          );
          if (issue.level === "error") errorCount++;
          else warnCount++;
        });

        if (shouldFix) {
          const fixed = fixRichText(content);
          if (JSON.stringify(fixed) !== JSON.stringify(content)) {
            contentProp.value = buildNode(fixed);
            fileModified = true;
          }
        }
      }
    },
  });

  if (shouldFix && fileModified) {
    const output = generate(ast, { quotes: "double" }).code;
    fs.writeFileSync(file, output, "utf8");
  }
});

console.log(`\nRichText lint: ${errorCount} error(s), ${warnCount} warning(s).`);
process.exit(errorCount > 0 ? 1 : 0);

/* ===== Helpers ===== */

function evaluateNode(node) {
  if (!node) return undefined;

  if (node.type === "ArrayExpression") {
    return node.elements.map(evaluateNode);
  }

  if (node.type === "ObjectExpression") {
    const obj = {};
    node.properties.forEach((prop) => {
      const key = prop.key.name || prop.key.value;
      obj[key] = evaluateNode(prop.value);
    });
    return obj;
  }

  if (node.type === "StringLiteral") return node.value;
  if (node.type === "NumericLiteral") return node.value;
  if (node.type === "BooleanLiteral") return node.value;
  if (node.type === "NullLiteral") return null;

  return undefined;
}

function buildNode(value) {
  if (Array.isArray(value)) {
    return t.arrayExpression(value.map(buildNode));
  }

  if (value && typeof value === "object") {
    return t.objectExpression(
      Object.entries(value).map(([k, v]) => t.objectProperty(t.identifier(k), buildNode(v)))
    );
  }

  if (typeof value === "string") return t.stringLiteral(value);
  if (typeof value === "number") return t.numericLiteral(value);
  if (typeof value === "boolean") return t.booleanLiteral(value);
  if (value === null) return t.nullLiteral();

  return t.nullLiteral();
}
