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
const SOURCE_EXTENSIONS = new Set([".css", ".less", ".scss", ".js", ".jsx", ".ts", ".tsx"]);
const STYLE_PROPERTY_PATTERN =
  /^\s*(?:color|background|backgroundColor|background-color|borderColor|border-color|boxShadow|box-shadow)\s*:\s*["'`]?[^;]*var\(\s*--interactive-surface-/;
const PACKAGE_TOKEN_DEFINITION_PATTERN =
  /^\s*--(?:interactive-surface|ui-kit|saas|bento|max|bau|tactile|neo|retro|brutal|cyber|y2k|rg)-[\w-]+\s*:/;
const TEST_FILE_PATTERN = /(?:^|[\\/])[^\\/]+(?:\.test|\.spec)\.[cm]?[jt]sx?$/;
const BUTTON_PAINT_OR_STATE_PATTERN =
  /^\s*(?:--btn-surface-[\w-]+|background(?:-[\w-]+)?|border(?:-[\w-]+)?|box-shadow|color|cursor|fill|filter|opacity|outline(?:-[\w-]+)?|text-shadow|transition(?:-[\w-]+)?|translate|-webkit-backdrop-filter|backdrop-filter)\s*:/u;
const ALLOWED_BUTTON_ADAPTER_PAINT = [
  "color: inherit !important;",
  "fill: currentcolor;",
  "background: transparent;",
  "border-color: transparent;",
  "box-shadow: none;",
];
const INTERACTION_MOTION_CONFIG = "--interactive-surface-motion-default: 220ms;";
const LOCAL_CONTROL_VISUAL_PATTERN =
  /(?:^|\n)\s*(?:background(?:-[\w-]+)?|border(?:-[\w-]+)?|box-shadow|color|filter|outline(?:-[\w-]+)?|text-shadow|transition(?:-[\w-]+)?|-webkit-backdrop-filter|backdrop-filter)\s*:/u;

function listSourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return listSourceFiles(fullPath);
    }

    return SOURCE_EXTENSIONS.has(path.extname(entry.name)) ? [fullPath] : [];
  });
}

/**
 * Read one local CSS rule body so ownership assertions stay selector-specific.
 *
 * @param {string} css - Complete stylesheet source.
 * @param {string} selector - Exact selector text to locate.
 * @returns {string} Matched declaration block or an empty string.
 */
function getCssRule(css, selector) {
  const selectorPattern = selector
    .trim()
    .split("\n")
    .map((part) => part.trim().replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"))
    .join("\\s*");
  const match = css.match(new RegExp(`(?:^|\\n)${selectorPattern}\\s*\\{([\\s\\S]*?)\\n\\}`, "mu"));

  return match?.[1] || "";
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
          .filter(({ filePath, line }) => {
            if (!PACKAGE_TOKEN_DEFINITION_PATTERN.test(line)) return false;

            const isApprovedMotionConfig =
              path.relative(SRC_ROOT, filePath) === path.join("styles", "tokens.css") &&
              line.trim() === INTERACTION_MOTION_CONFIG;

            return !isApprovedMotionConfig;
          })
      )
      .map(
        ({ filePath, index, line }) =>
          `${path.relative(ROOT, filePath)}:${index + 1}: ${line.trim()}`
      );

    expect(offenders).toEqual([]);
  });

  it("keeps button paint and interaction states owned by the shared CSS libraries", () => {
    const buttonCss = fs.readFileSync(
      path.join(SRC_ROOT, "components", "ui", "Btn", "styles.css"),
      "utf8"
    );
    const appCss = fs.readFileSync(path.join(SRC_ROOT, "App.css"), "utf8");
    const buttonOwnershipOffenders = buttonCss
      .split(/\r?\n/u)
      .map((line) => ({ line }))
      .filter(({ line }) => BUTTON_PAINT_OR_STATE_PATTERN.test(line))
      .map(({ line }) => line.trim());

    expect(buttonOwnershipOffenders).toEqual(ALLOWED_BUTTON_ADAPTER_PAINT);
    expect(buttonCss).not.toMatch(/\.interactive-surface:(?:hover|focus|focus-visible|active)/u);
    expect(buttonCss).not.toContain("--rs-");
    expect(appCss).not.toContain(".rs-");
    expect(appCss).not.toContain("select.interactive-surface");
  });

  it("keeps the runtime free of RSuite dependencies and compatibility selectors", () => {
    const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
    const runtimeSources = listSourceFiles(SRC_ROOT)
      .filter((filePath) => !TEST_FILE_PATTERN.test(filePath))
      .map((filePath) => fs.readFileSync(filePath, "utf8"))
      .join("\n");

    expect(packageJson.dependencies?.rsuite).toBeUndefined();
    expect(packageJson.dependencies?.["@rsuite/icons"]).toBeUndefined();
    expect(packageJson.devDependencies?.less).toBeUndefined();
    expect(runtimeSources).not.toMatch(/(?:from|import\s+)\s*["']rsuite|\.rs-/u);
  });

  it("keeps feature-level button styles limited to layout adapters", () => {
    const selectorChecks = [
      [
        "components/features/ThemeToggle/styles.css",
        ".theme-toggle .btn.interactive-surface.theme-toggle__btn",
      ],
      ["components/features/ResumePreview/PreviewResume.css", ".resume-preview__action.btn"],
      [
        "components/ui/MermaidDiagram/Mermaid.css",
        ".mermaid-action-btn.btn.interactive-surface",
      ],
      ["components/navigation/BackToTopButton/styles.css", ".back-to-top__button"],
      [
        "components/navigation/UnifiedNavigation/styles.css",
        ".mobile-nav-list > a",
      ],
    ];

    selectorChecks.forEach(([relativePath, selector]) => {
      const css = fs.readFileSync(path.join(SRC_ROOT, relativePath), "utf8");
      expect(getCssRule(css, selector), `${relativePath}: ${selector}`).not.toMatch(
        LOCAL_CONTROL_VISUAL_PATTERN
      );
    });

    const combinedCss = selectorChecks
      .map(([relativePath]) => fs.readFileSync(path.join(SRC_ROOT, relativePath), "utf8"))
      .join("\n");
    const appCss = fs.readFileSync(path.join(SRC_ROOT, "App.css"), "utf8");
    const tokenCss = fs.readFileSync(path.join(SRC_ROOT, "styles", "tokens.css"), "utf8");
    const richTextRenderer = fs.readFileSync(
      path.join(SRC_ROOT, "components", "renderers", "RichText", "renderNode.jsx"),
      "utf8"
    );

    expect(combinedCss).not.toMatch(
      /(?:resume-preview__action\.btn|back-to-top__button|btn\.icon-only|sub-section-nav-block):(?:hover|focus|focus-visible|active)/u
    );
    expect(appCss).not.toContain(".block-link.interactive-surface");
    expect(tokenCss).not.toContain(".back-to-top__button");
    expect(tokenCss).not.toContain(".block-link.interactive-surface");
    expect(richTextRenderer).not.toContain('className="block-link interactive-surface"');
  });

  it("configures a deliberate shared-library hover duration", () => {
    const tokenCss = fs.readFileSync(path.join(SRC_ROOT, "styles", "tokens.css"), "utf8");
    const motionConfigurations = tokenCss
      .split(/\r?\n/u)
      .map((line) => line.trim())
      .filter((line) => line.startsWith("--interactive-surface-motion-default:"));

    expect(motionConfigurations).toEqual([INTERACTION_MOTION_CONFIG]);
  });
});
