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

describe("ui-style compatibility", () => {
  it("loads package CSS from the app entrypoint only", () => {
    const mainJs = readProjectFile("src/main.jsx");
    const appJs = readProjectFile("src/App.jsx");
    const packageManifest = JSON.parse(readProjectFile("package.json"));

    expect(mainJs).toContain('import "interactive-surface-css/interactive-surface.css";');
    expect(mainJs).toContain('import "ui-style-kit-css/dist/ui-style-kit.with-bridge.min.css";');
    expect(mainJs).toContain('import "layout-style-css";');
    expect(mainJs).toContain('import "./App.css";');
    expect(packageManifest.dependencies).toHaveProperty("layout-style-css");
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
});
