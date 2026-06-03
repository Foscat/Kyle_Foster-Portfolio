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
  it("lets interactive button surfaces inherit ui-style-kit bridge variables", () => {
    const css = readProjectFile("src/components/ui/Btn/styles.css");
    const baseRule = getCssRule(
      css,
      `.rs-btn.btn.interactive-surface,
.rs-panel-btn.interactive-surface`
    );

    expect(baseRule).toContain("color: var(--interactive-surface-fg");
    expect(baseRule).toContain("background: var(--interactive-surface-bg");
    expect(baseRule).toContain("border-color: var(--interactive-surface-border-color");
    expect(baseRule).toContain("border-radius: var(--interactive-surface-radius");
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
    expect(tokenCss).toContain("var(--primary-dark) 78%");
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
    const css = readProjectFile("src/App.css");

    expect(getCssRule(css, ".glass-card")).toContain("var(--app-surface-bg");
    expect(getCssRule(css, ".frosted")).toContain("var(--app-surface-muted-bg");
    expect(getCssRule(css, ".blue-tile")).toContain("var(--app-surface-strong-bg");
  });
});
