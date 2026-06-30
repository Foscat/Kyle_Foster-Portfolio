/**
 * @file src/styles/interactiveSurfaceCssContract.test.js
 * @description Guards against using package-owned interactive-surface CSS tokens in app component styles.
 * @module styles/interactiveSurfaceCssContract.test
 */
import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const SRC_ROOT = path.join(ROOT, "src");
const SOURCE_EXTENSIONS = new Set([".css", ".scss", ".js", ".jsx", ".ts", ".tsx"]);
const STYLE_PROPERTY_PATTERN =
  /^\s*(?:color|background|backgroundColor|background-color|borderColor|border-color|boxShadow|box-shadow)\s*:\s*["'`]?[^;]*var\(\s*--interactive-surface-/;
const PACKAGE_TOKEN_DEFINITION_PATTERN =
  /^\s*--(?:interactive-surface|ui-kit|saas|bento|max|bau|tactile|neo|retro|brutal|cyber|y2k|rg)-[\w-]+\s*:/;
const TEST_FILE_PATTERN = /(?:^|[\\/])[^\\/]+(?:\.test|\.spec)\.[cm]?[jt]sx?$/;

function listSourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return listSourceFiles(fullPath);
    }

    return SOURCE_EXTENSIONS.has(path.extname(entry.name)) ? [fullPath] : [];
  });
}

describe("interactive-surface-css contract", () => {
  it("keeps package color tokens out of component color properties", () => {
    const offenders = listSourceFiles(SRC_ROOT)
      .filter((filePath) => !TEST_FILE_PATTERN.test(filePath))
      .flatMap((filePath) =>
        fs
          .readFileSync(filePath, "utf8")
          .split(/\r?\n/)
          .map((line, index) => ({ filePath, index, line }))
          .filter(({ line }) => STYLE_PROPERTY_PATTERN.test(line))
      )
      .map(
        ({ filePath, index, line }) =>
          `${path.relative(ROOT, filePath)}:${index + 1}: ${line.trim()}`
      );

    expect(offenders).toEqual([]);
  });

  it("keeps package-owned token definitions out of app styles", () => {
    const offenders = listSourceFiles(SRC_ROOT)
      .filter((filePath) => !TEST_FILE_PATTERN.test(filePath))
      .flatMap((filePath) =>
        fs
          .readFileSync(filePath, "utf8")
          .split(/\r?\n/)
          .map((line, index) => ({ filePath, index, line }))
          .filter(({ line }) => PACKAGE_TOKEN_DEFINITION_PATTERN.test(line))
      )
      .map(
        ({ filePath, index, line }) =>
          `${path.relative(ROOT, filePath)}:${index + 1}: ${line.trim()}`
      );

    expect(offenders).toEqual([]);
  });
});
