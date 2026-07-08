/**
 * @file src/styles/uiStyleCompatibility.test.js
 * @description Static regressions for color contrast and ui-style-kit-css compatibility.
 * @module src/styles/uiStyleCompatibility.test
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readProjectFile(relativePath) {
  return readFileSync(path.resolve(process.cwd(), relativePath), "utf8");
}

function getCssRule(css, selector) {
  const selectorPattern = selector
    .trim()
    .split("\n")
    .map((part) => part.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("\\s*");
  const match = css.match(new RegExp(`(?:^|\\n)${selectorPattern}\\s*\\{([\\s\\S]*?)\\n\\}`, "m"));
  return match?.[1] || "";
}

function expectVisualRulesDelegated(css, selector) {
  const selectRule = getCssRule(css, selector);
  const optionRule = getCssRule(css, `${selector} option`);
  const focusRule = getCssRule(css, `${selector}:focus-visible`);
  const libraryOwnedVisualProperties =
    /(?:^|\n)\s*(?:color|background(?:-[\w-]+)?|border(?:-[\w-]+)?|box-shadow|outline|-webkit-backdrop-filter|backdrop-filter)\s*:/u;

  expect(selectRule).not.toMatch(libraryOwnedVisualProperties);
  expect(optionRule.trim()).toBe("");
  expect(focusRule.trim()).toBe("");
}

describe("ui-style compatibility", () => {
  it("loads package CSS from the app entrypoint only", () => {
    const mainJs = readProjectFile("src/main.jsx");
    const appJs = readProjectFile("src/App.jsx");
    const packageManifest = JSON.parse(readProjectFile("package.json"));
    const packageLock = JSON.parse(readProjectFile("package-lock.json"));

    expect(mainJs).toContain(
      'import "layout-style-css/all-with-ui-kit-and-interactive-surface.css";'
    );
    expect(mainJs).not.toContain('import "interactive-surface-css/interactive-surface.css";');
    expect(mainJs).not.toContain(
      'import "ui-style-kit-css/dist/ui-style-kit.with-bridge.min.css";'
    );
    expect(mainJs).not.toContain('import "layout-style-css";');
    expect(mainJs).toContain('import "./App.css";');
    expect(packageManifest.dependencies).toHaveProperty("layout-style-css", "1.1.2");
    expect(packageManifest.dependencies).toHaveProperty("ui-style-kit-css", "2.0.2");
    expect(packageManifest.dependencies).toHaveProperty("interactive-surface-css", "1.3.0");
    expect(packageLock.packages[""].dependencies).toHaveProperty("layout-style-css", "1.1.2");
    expect(packageLock.packages[""].dependencies).toHaveProperty("ui-style-kit-css", "2.0.2");
    expect(packageLock.packages[""].dependencies).toHaveProperty(
      "interactive-surface-css",
      "1.3.0"
    );
    expect(packageLock.packages["node_modules/layout-style-css"].version).toBe("1.1.2");
    expect(packageLock.packages["node_modules/ui-style-kit-css"].version).toBe("2.0.2");
    expect(packageLock.packages["node_modules/interactive-surface-css"].version).toBe("1.3.0");
    expect(appJs).not.toContain("interactive-surface-css");
    expect(appJs).not.toContain("layout-style-css");
    expect(appJs).not.toContain('import "./App.css"');
  });

  it("keeps Mermaid light-mode default node labels readable on dark fills", () => {
    const css = readProjectFile("src/components/ui/MermaidDiagram/Mermaid.css");
    const tokenCss = readProjectFile("src/styles/tokens.css");
    const mermaidJs = readProjectFile("src/components/ui/MermaidDiagram/index.jsx");
    const defaultLightLabelRule = getCssRule(
      css,
      `.mermaid .mermaid-svg-host.light g.node.default .nodeLabel,
.mermaid .mermaid-svg-host.light g.node.default .nodeLabel p,
.mermaid .mermaid-svg-host.light g.node.default .label text,
.mermaid .mermaid-svg-host.light g.node.default text,
.mermaid .mermaid-svg-host.light g.node.default tspan`
    );

    expect(defaultLightLabelRule).toContain("var(--mermaid-light-node-fg");
    expect(tokenCss).toContain("--mermaid-light-node-fg: rgba(var(--white-rgb), 0.96);");
    expect(tokenCss).toContain("--mermaid-light-node-bg: color-mix(");
    expect(tokenCss).toContain("var(--app-surface-primary)");
    expect(tokenCss).not.toContain("--mermaid-light-node-bg: color-mix(in srgb, var(--bg-bright)");
    expect(mermaidJs).toContain("getLightNodePaint");
    expect(mermaidJs).toContain("var(--mermaid-light-node-muted-bg)");
    expect(mermaidJs).not.toContain("CYBER_LIME_LIGHT_NODE_TEXT");
  });

  it("uses semantic light-mode Mermaid tokens instead of hardcoded palette overrides", () => {
    const mermaidCss = readProjectFile("src/components/ui/MermaidDiagram/Mermaid.css");
    const tokenCss = readProjectFile("src/styles/tokens.css");

    expect(mermaidCss).not.toContain('html[data-theme="light"][data-palette="cyber-lime"]');
    expect(tokenCss).not.toContain('html[data-theme="light"][data-palette="cyber-lime"] .mermaid');
    expect(mermaidCss).not.toContain("rgba(20, 37, 8");
    expect(mermaidCss).not.toContain("#24380f");
    expect(mermaidCss).toContain("fill: var(--mermaid-light-node-muted-bg");
    expect(mermaidCss).toContain("fill: var(--mermaid-light-body");
    expect(tokenCss).toContain("--mermaid-light-foreground");
    expect(tokenCss).toContain("--mermaid-light-node-bg");
  });

  it("routes shared app surfaces through ui-style-aware surface variables", () => {
    const tokens = readProjectFile("src/styles/tokens.css");
    const css = readProjectFile("src/App.css");

    expect(tokens).toContain("--app-surface-bg: rgb(var(--usk-surface-rgb");
    expect(tokens).toContain("--app-surface-strong-bg: rgb(var(--usk-surface-strong-rgb");
    expect(tokens).toContain("--app-surface-primary: rgb(var(--usk-primary-rgb");
    expect(tokens).not.toContain("--ui-kit-bg:");
    expect(tokens).not.toContain("--interactive-surface-bg:");
    expect(getCssRule(css, ".glass-card")).toContain("var(--app-surface-bg");
  });

  it("routes portfolio composition through layout-style-css primitives", () => {
    const appShell = readProjectFile("src/App.jsx");
    const pageMarkup = [
      "src/pages/Home/index.jsx",
      "src/pages/CodeStream/index.jsx",
      "src/pages/SideProjects/index.jsx",
      "src/pages/Hackathon/index.jsx",
      "src/pages/SMU/index.jsx",
      "src/pages/Docs/index.jsx",
      "src/pages/Contact/index.jsx",
      "src/components/layout/InfoSection/index.jsx",
      "src/components/renderers/blocks/ImageGalleryBlock/index.jsx",
      "src/components/renderers/blocks/LinksBlock/index.jsx",
      "src/components/ui/InsightCard/index.jsx",
    ]
      .map(readProjectFile)
      .join("\n");

    expect(appShell).toContain("ly-page");
    expect(pageMarkup).toContain("ly-wrapper");
    expect(pageMarkup).toContain("ly-sidebar-layout");
    expect(pageMarkup).toContain("ly-sidebar-layout--right");
    expect(pageMarkup).not.toContain("ly-app-main");
    expect(pageMarkup).toContain("ly-sidebar");
    expect(pageMarkup).toContain("ly-section");
    expect(pageMarkup).toContain("ly-surface");
    expect(pageMarkup).toContain("ly-stack");
    expect(pageMarkup).toContain("ly-cluster");
    expect(pageMarkup).toContain("ly-card-grid");
    expect(pageMarkup).toContain("ly-gallery");
  });

  it("keeps the portfolio route sidebar contract local and breakpoint-aligned", () => {
    const css = readProjectFile("src/App.css");

    expect(css).toContain("@media (width < 1024px)");
    expect(css).toContain("@media (width >= 1024px)");
    expect(css).toContain(".page-layout.ly-sidebar-layout.ly-sidebar-layout--right");
    expect(css).toContain("--portfolio-route-sidebar-width");
    expect(css).toContain("--portfolio-route-sidebar-width: clamp(18rem");
    expect(css).toContain("minmax(18rem, var(--portfolio-route-sidebar-width))");
    expect(css).not.toContain("@media (width <=1024px)");
    expect(css).not.toContain("@media (width >=1025px)");
  });

  it("keeps theme-menu select visuals delegated to shared component libraries", () => {
    const selectorStyles = [
      ["src/components/features/LayoutStyleToggle/styles.css", ".layout-style-toggle__select"],
      ["src/components/features/UiStyleToggle/styles.css", ".ui-style-toggle__select"],
      ["src/components/features/PaletteToggle/styles.css", ".palette-toggle__select"],
    ];

    selectorStyles.forEach(([relativePath, selector]) => {
      expectVisualRulesDelegated(readProjectFile(relativePath), selector);
    });
  });

  it("keeps color menu row and panel visuals delegated to semantic library surfaces", () => {
    const css = readProjectFile("src/components/features/ColorMenu/styles.css");
    const visualProperties =
      /(?:^|\n)\s*(?:color|background(?:-[\w-]+)?|border(?:-[\w-]+)?|box-shadow|-webkit-backdrop-filter|backdrop-filter)\s*:/u;

    expect(getCssRule(css, ".color-panel")).not.toMatch(visualProperties);
    expect(getCssRule(css, ".color-row")).not.toMatch(visualProperties);
    expect(css).not.toContain('html[data-theme="dark"] .color-row');
    expect(css).not.toContain('html[data-theme="light"] .color-row');
    expect(css).not.toContain('html[data-theme="light"] .color-panel');
  });

  it("keeps selected documentation jump-card text readable on active surfaces", () => {
    const css = readProjectFile("src/components/renderers/blocks/MarkdownDocs.Block/styles.css");
    const activeButtonRule = getCssRule(
      css,
      '.markdown-docs-block__jump-button[aria-pressed="true"]'
    );
    const activeTextRule = getCssRule(
      css,
      `.markdown-docs-block__jump-button[aria-pressed="true"]
  :where(span, .markdown-docs-block__jump-meta)`
    );

    expect(activeButtonRule).toContain("var(--app-surface-readable-fg");
    expect(activeTextRule).toContain("color: inherit");
  });
});
