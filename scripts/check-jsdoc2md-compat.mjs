/**
 * @file scripts/check-jsdoc2md-compat.mjs
 * @description scripts/check-jsdoc2md-compat module.
 * @module scripts/check-jsdoc2md-compat
 */

import fs from "node:fs";
import path from "node:path";
import { glob } from "glob";

/**
 * @file check-jsdoc2md-compat.mjs
 * @description Audits JSDoc blocks for jsdoc2md compatibility and baseline professional file-level docs.
 * @module scripts/check-jsdoc2md-compat
 */

const ROOT = process.cwd();
const WRITE_REPORT = process.argv.includes("--write");
const STRICT = process.argv.includes("--strict");

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
