import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const SRC_ROOT = path.join(ROOT, "src");
const TOKEN_FILE = path.join(SRC_ROOT, "styles", "tokens.css");

const SOURCE_EXTENSIONS = new Set([".css", ".scss", ".js", ".jsx", ".ts", ".tsx"]);
const STYLE_PROPERTY_PATTERN =
  /^\s*(?:color|background|backgroundColor|background-color|borderColor|border-color|boxShadow|box-shadow)\s*:\s*["'`]?[^;]*var\(\s*--interactive-surface-/;
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
      .filter((filePath) => path.resolve(filePath) !== path.resolve(TOKEN_FILE))
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

  it("defines interactive surface color variants at the theme bridge", () => {
    const tokens = fs.readFileSync(TOKEN_FILE, "utf8");

    [
      "--interactive-surface-bg",
      "--interactive-surface-fg",
      "--interactive-surface-border-color",
      "--interactive-surface-variant-primary-bg",
      "--interactive-surface-variant-primary-fg",
      "--interactive-surface-variant-secondary-bg",
      "--interactive-surface-variant-secondary-fg",
      "--interactive-surface-variant-subtle-bg",
      "--interactive-surface-variant-subtle-fg",
      "--interactive-surface-variant-accent-bg",
      "--interactive-surface-variant-accent-fg",
      "--interactive-surface-variant-warning-bg",
      "--interactive-surface-variant-warning-fg",
      "--interactive-surface-variant-danger-bg",
      "--interactive-surface-variant-danger-fg",
    ].forEach((token) => {
      expect(tokens).toContain(token);
    });
  });
});
