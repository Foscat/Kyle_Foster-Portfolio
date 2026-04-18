/**
 * @file scripts/check-jsdoc2md-compat.mjs
 * @description scripts/check-jsdoc2md-compat module.
 * @module scripts/check-jsdoc2md-compat
 */

import fs from "node:fs";
import path from "node:path";
import { glob } from "glob";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";

/**
 * @file check-jsdoc2md-compat.mjs
 * @description Audits JSDoc blocks for jsdoc2md compatibility and baseline professional file-level docs.
 * @module scripts/check-jsdoc2md-compat
 */

const traverse = traverseModule.default;

const ROOT = process.cwd();
const WRITE_REPORT = process.argv.includes("--write");
const STRICT = process.argv.includes("--strict");
const REQUIRE_EXPORT_DOCS = process.argv.includes("--require-export-docs");

const TARGET_GLOBS = ["src/**/*.{js,jsx}", "scripts/**/*.{js,cjs,mjs}", "playwright/**/*.{js,ts}"];

const IGNORE_GLOBS = ["**/node_modules/**", "**/dist/**", "**/docs/**", "**/*.min.js"];

const read = (filePath) => fs.readFileSync(filePath, "utf8");

const collectFiles = async () => {
  const files = await glob(TARGET_GLOBS, {
    cwd: ROOT,
    absolute: true,
    ignore: IGNORE_GLOBS,
    nodir: true,
  });

  return files.sort((a, b) => a.localeCompare(b));
};

const firstDocBlock = (source) => {
  const match = source.match(/^(?:#![^\n]*\n)?\s*\/\*\*[\s\S]*?\*\//);
  return match ? match[0] : "";
};

const jsdocBlocks = (source) => source.match(/^\s*\/\*\*[\s\S]*?\*\//gm) || [];

const hasTag = (block, tagName) => new RegExp(`@${tagName}\\b`).test(block);

const hasUnsupportedImportType = (source) =>
  /\{\s*import\([^)]*\)\.[A-Za-z0-9_$]+\s*\}/.test(source);

const hasJSDocComment = (comments = []) =>
  comments.some(
    (comment) => comment?.type === "CommentBlock" && comment.value.trim().startsWith("*")
  );

const isFunctionLikeInitializer = (value) =>
  value?.type === "ArrowFunctionExpression" || value?.type === "FunctionExpression";

const isPotentialWrappedComponent = (name, value) =>
  typeof name === "string" &&
  /^[A-Z]/.test(name) &&
  value?.type === "CallExpression" &&
  value.callee !== null;

const shouldAuditExportDocs = (relPath) => {
  if (!REQUIRE_EXPORT_DOCS) return false;
  if (!/\.(js|jsx)$/.test(relPath)) return false;
  if (!/^src\/(components|pages)\//.test(relPath)) return false;
  if (/\.test\.[jt]sx?$/.test(relPath)) return false;
  if (/\/__tests__\//.test(relPath)) return false;
  return true;
};

const collectTopLevelDeclarations = (programBody) => {
  const declarations = new Map();

  programBody.forEach((node) => {
    if (node.type === "FunctionDeclaration" && node.id?.name) {
      declarations.set(node.id.name, node);
      return;
    }

    if (node.type === "VariableDeclaration") {
      node.declarations.forEach((declaration) => {
        if (declaration.id?.type === "Identifier") {
          declarations.set(declaration.id.name, node);
        }
      });
    }
  });

  return declarations;
};

const declarationNeedsExportDoc = (name, declaration, declarationNode) => {
  if (declarationNode?.type === "FunctionDeclaration") {
    return true;
  }

  if (declarationNode?.type !== "VariableDeclaration") {
    return false;
  }

  const target = declarationNode.declarations.find(
    (candidate) => candidate.id?.type === "Identifier" && candidate.id.name === declaration
  );

  if (!target) return false;

  return isFunctionLikeInitializer(target.init) || isPotentialWrappedComponent(name, target.init);
};

const auditExportedFunctionAndComponentDocs = (source) => {
  let ast;
  try {
    ast = parse(source, {
      sourceType: "module",
      plugins: ["jsx"],
      attachComment: true,
      errorRecovery: true,
    });
  } catch {
    return ["Unable to parse file for exported declaration JSDoc audit."];
  }

  const missing = [];
  const topLevelDeclarations = collectTopLevelDeclarations(ast.program.body);
  const addMissing = (name, line) => {
    missing.push(`Missing JSDoc for exported declaration \`${name}\` at line ${line}.`);
  };

  traverse(ast, {
    ExportNamedDeclaration(currentPath) {
      const declarationNode = currentPath.node.declaration;
      if (!declarationNode) return;

      if (declarationNode.type === "FunctionDeclaration" && declarationNode.id?.name) {
        if (
          !hasJSDocComment(declarationNode.leadingComments) &&
          !hasJSDocComment(currentPath.node.leadingComments)
        ) {
          addMissing(
            `export function ${declarationNode.id.name}`,
            declarationNode.loc?.start?.line ?? 1
          );
        }
        return;
      }

      if (declarationNode.type !== "VariableDeclaration") {
        return;
      }

      declarationNode.declarations.forEach((declaration) => {
        if (declaration.id?.type !== "Identifier") return;

        const exportName = declaration.id.name;
        const requiresDocs =
          isFunctionLikeInitializer(declaration.init) ||
          isPotentialWrappedComponent(exportName, declaration.init);

        if (!requiresDocs) return;

        if (
          !hasJSDocComment(declarationNode.leadingComments) &&
          !hasJSDocComment(currentPath.node.leadingComments)
        ) {
          addMissing(`export const ${exportName}`, declarationNode.loc?.start?.line ?? 1);
        }
      });
    },
    ExportDefaultDeclaration(currentPath) {
      const declarationNode = currentPath.node.declaration;

      if (declarationNode.type === "FunctionDeclaration") {
        const functionName = declarationNode.id?.name || "default";
        if (
          !hasJSDocComment(declarationNode.leadingComments) &&
          !hasJSDocComment(currentPath.node.leadingComments)
        ) {
          addMissing(
            `export default function ${functionName}`,
            declarationNode.loc?.start?.line ?? currentPath.node.loc?.start?.line ?? 1
          );
        }
        return;
      }

      if (declarationNode.type !== "Identifier") return;

      const linkedDeclaration = topLevelDeclarations.get(declarationNode.name);
      if (!linkedDeclaration) return;

      const needsDocs = declarationNeedsExportDoc(
        declarationNode.name,
        declarationNode.name,
        linkedDeclaration
      );
      if (!needsDocs) return;

      if (
        !hasJSDocComment(linkedDeclaration.leadingComments) &&
        !hasJSDocComment(currentPath.node.leadingComments)
      ) {
        addMissing(
          `export default ${declarationNode.name}`,
          linkedDeclaration.loc?.start?.line ?? currentPath.node.loc?.start?.line ?? 1
        );
      }
    },
  });

  return missing;
};

const auditFile = (filePath) => {
  const relPath = path.relative(ROOT, filePath).replaceAll("\\", "/");
  const source = read(filePath);
  const issues = [];

  const topBlock = firstDocBlock(source);

  if (!topBlock) {
    issues.push("Missing top-of-file JSDoc block.");
  } else {
    if (!hasTag(topBlock, "file")) {
      issues.push("Top-of-file JSDoc is missing @file.");
    }

    if (!hasTag(topBlock, "description") && !hasTag(topBlock, "fileoverview")) {
      issues.push("Top-of-file JSDoc is missing @description or @fileoverview.");
    }

    if (!hasTag(topBlock, "module")) {
      issues.push("Top-of-file JSDoc is missing @module.");
    }
  }

  if (hasUnsupportedImportType(source)) {
    issues.push("Uses unsupported JSDoc import() type syntax for jsdoc2md.");
  }

  const emptyJSDocBlocks = jsdocBlocks(source).filter(
    (block) => !/@\w+/.test(block) && block.replace(/\s|\/|\*/g, "").length > 0
  );

  if (emptyJSDocBlocks.length > 0) {
    issues.push("Contains descriptive JSDoc block(s) without tags; add at least one explicit tag.");
  }

  if (shouldAuditExportDocs(relPath)) {
    const exportDocIssues = auditExportedFunctionAndComponentDocs(source);
    issues.push(...exportDocIssues);
  }

  return { relPath, issues };
};

const markdownReport = (results) => {
  const totalFiles = results.length;
  const filesWithIssues = results.filter((item) => item.issues.length > 0);

  const lines = [
    "# JSDoc2MD Compatibility Audit",
    "",
    `- Files scanned: ${totalFiles}`,
    `- Files with issues: ${filesWithIssues.length}`,
    "",
  ];

  if (!filesWithIssues.length) {
    lines.push("All scanned files passed the JSDoc compatibility audit.");
    lines.push("");
    return lines.join("\n");
  }

  filesWithIssues.forEach(({ relPath, issues }) => {
    lines.push(`## ${relPath}`);
    lines.push("");
    issues.forEach((issue) => lines.push(`- ${issue}`));
    lines.push("");
  });

  return lines.join("\n");
};

const main = async () => {
  const files = await collectFiles();
  const results = files.map(auditFile);
  const filesWithIssues = results.filter((item) => item.issues.length > 0);

  const reportText = markdownReport(results);

  if (WRITE_REPORT) {
    const reportPath = path.join(ROOT, "docs", "jsdoc-audit.md");
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, reportText, "utf8");
    console.log(`JSDoc audit report written to ${reportPath}`);
  }

  console.log(
    `JSDoc audit: scanned ${files.length} file(s), found ${filesWithIssues.length} file(s) with issues.`
  );

  if (filesWithIssues.length > 0 && STRICT) {
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error("JSDoc audit failed:", error);
  process.exitCode = 1;
});
