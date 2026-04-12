/**
 * @file scripts/fix-jsdoc2md-compat.mjs
 * @description scripts/fix-jsdoc2md-compat module.
 * @module scripts/fix-jsdoc2md-compat
 */

import fs from "node:fs";
import path from "node:path";
import { glob } from "glob";

/**
 * @file fix-jsdoc2md-compat.mjs
 * @description Normalizes JSDoc blocks for jsdoc2md compatibility across source, scripts, and playwright files.
 * @module scripts/fix-jsdoc2md-compat
 */

const ROOT = process.cwd();

const TARGET_GLOBS = ["src/**/*.{js,jsx}", "scripts/**/*.{js,cjs,mjs}", "playwright/**/*.{js,ts}"];

const IGNORE_GLOBS = ["**/node_modules/**", "**/dist/**", "**/docs/**", "**/*.min.js"];

// Match only actual JSDoc blocks at line start, avoiding string literals that contain /** or */.
const jsdocBlockRegex = /^\s*\/\*\*[\s\S]*?\*\//gm;

const hasTag = (block, tagName) => new RegExp(`@${tagName}\\b`).test(block);

const collectFiles = async () => {
  const files = await glob(TARGET_GLOBS, {
    cwd: ROOT,
    absolute: true,
    ignore: IGNORE_GLOBS,
    nodir: true,
  });

  return files.sort((a, b) => a.localeCompare(b));
};

const toPosixPath = (value) => value.replaceAll("\\", "/");

const toModuleName = (relPath) => toPosixPath(relPath).replace(/\.[^.]+$/, "");

const normalizeTopBlock = (topBlock, relPath) => {
  let block = topBlock;
  const fileName = toPosixPath(relPath);
  const moduleName = toModuleName(fileName);

  if (!hasTag(block, "file")) {
    block = block.replace("/**", `/**\n * @file ${fileName}`);
  }

  if (!hasTag(block, "description") && !hasTag(block, "fileoverview")) {
    block = block.replace("/**", `/**\n * @description ${moduleName} module.`);
  }

  if (!hasTag(block, "module")) {
    block = block.replace("/**", `/**\n * @module ${moduleName}`);
  }

  return block;
};

const normalizeDescriptiveBlock = (block) => {
  if (/@\w+/.test(block)) {
    return block;
  }

  const raw = block
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, ""))
    .join("\n")
    .replace(/^\s*\/\*\*/, "")
    .replace(/\*\/\s*$/, "")
    .trim();

  if (!raw) {
    return block;
  }

  const firstLine = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");

  if (!firstLine) {
    return block;
  }

  return `/**\n * @description ${firstLine}\n */`;
};

const normalizeImportTypes = (source) =>
  source.replace(/\{\s*import\([^)]*\)\.([A-Za-z0-9_]+)\s*\}/g, "{$1}");

const ensureTopBlock = (source, relPath) => {
  const shebangMatch = source.match(/^#![^\n]*\n/);
  const shebang = shebangMatch ? shebangMatch[0] : "";
  const body = source.slice(shebang.length);
  const topMatch = body.match(/^\s*\/\*\*[\s\S]*?\*\//);

  if (!topMatch) {
    const fileName = toPosixPath(relPath);
    const moduleName = toModuleName(fileName);
    const header = `/**\n * @file ${fileName}\n * @description ${moduleName} module.\n * @module ${moduleName}\n */\n\n`;
    return `${shebang}${header}${body}`;
  }

  const existing = topMatch[0];
  const normalized = normalizeTopBlock(existing, relPath);
  if (existing === normalized) {
    return source;
  }

  const updatedBody = body.replace(existing, normalized);
  return `${shebang}${updatedBody}`;
};

const processFile = (filePath) => {
  const relPath = toPosixPath(path.relative(ROOT, filePath));
  const original = fs.readFileSync(filePath, "utf8");

  let updated = normalizeImportTypes(original);
  updated = ensureTopBlock(updated, relPath);
  updated = updated.replace(jsdocBlockRegex, normalizeDescriptiveBlock);

  if (updated !== original) {
    fs.writeFileSync(filePath, updated, "utf8");
    return true;
  }

  return false;
};

const main = async () => {
  const files = await collectFiles();
  let changed = 0;

  files.forEach((filePath) => {
    if (processFile(filePath)) {
      changed += 1;
    }
  });

  console.log(`JSDoc fixer: scanned ${files.length} file(s), changed ${changed} file(s).`);
};

main().catch((error) => {
  console.error("JSDoc fixer failed:", error);
  process.exitCode = 1;
});
