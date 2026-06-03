/**
 * @file src/styles/colorThemes.contrast.test.js
 * @description Contrast regression checks for core color-theme token pairings.
 * @module src/styles/colorThemes.contrast.test
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function parseHex(hex) {
  const clean = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{3,8}$/.test(clean)) return null;

  if (clean.length === 3 || clean.length === 4) {
    return [
      Number.parseInt(clean[0] + clean[0], 16),
      Number.parseInt(clean[1] + clean[1], 16),
      Number.parseInt(clean[2] + clean[2], 16),
    ];
  }

  return [
    Number.parseInt(clean.slice(0, 2), 16),
    Number.parseInt(clean.slice(2, 4), 16),
    Number.parseInt(clean.slice(4, 6), 16),
  ];
}

function srgbToLinear(channel) {
  const normalized = channel / 255;
  return normalized <= 0.04045 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
}

function luminance([r, g, b]) {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function contrastRatio(foreground, background) {
  const l1 = luminance(foreground);
  const l2 = luminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getPaletteBlocks(css) {
  const blockRegex = /html\[data-palette="([^"]+)"\]\[data-theme="([^"]+)"\]\s*\{([\s\S]*?)\n\}/g;
  const blocks = [];
  let match = blockRegex.exec(css);

  while (match) {
    const [, palette, theme, body] = match;
    const variables = {};

    for (const line of body.split("\n")) {
      const tokenMatch = line.match(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/);
      if (!tokenMatch) continue;
      variables[tokenMatch[1]] = tokenMatch[2];
    }

    blocks.push({ palette, theme, variables });
    match = blockRegex.exec(css);
  }

  return blocks;
}

describe("color-themes contrast coverage", () => {
  it("keeps core text/surface pairings above WCAG AA", () => {
    const cssPath = path.resolve(process.cwd(), "src/styles/tokens.css");
    const css = readFileSync(cssPath, "utf8");
    const blocks = getPaletteBlocks(css);
    const checks = [
      ["text", "bg", 4.5],
      ["text", "surface", 4.5],
      ["text-muted", "surface", 4.5],
      ["text-muted", "bg", 4.5],
      ["link", "bg", 4.5],
      ["primary-text", "primary", 4.5],
      ["secondary-text", "secondary", 4.5],
    ];
    const failures = [];

    for (const block of blocks) {
      for (const [foregroundKey, backgroundKey, minimum] of checks) {
        const foregroundHex = block.variables[foregroundKey];
        const backgroundHex = block.variables[backgroundKey];
        const missingKeys = [];

        if (!foregroundHex) missingKeys.push(foregroundKey);
        if (!backgroundHex) missingKeys.push(backgroundKey);
        if (missingKeys.length > 0) {
          failures.push(
            `${block.palette}/${block.theme} missing required token(s): ${missingKeys.join(", ")}`
          );
          continue;
        }

        const foreground = parseHex(foregroundHex);
        const background = parseHex(backgroundHex);
        if (!foreground || !background) {
          const invalidKeys = [];
          if (!foreground) invalidKeys.push(`${foregroundKey}=${foregroundHex}`);
          if (!background) invalidKeys.push(`${backgroundKey}=${backgroundHex}`);
          failures.push(
            `${block.palette}/${block.theme} has unparseable token value(s): ${invalidKeys.join(", ")}`
          );
          continue;
        }

        const ratio = contrastRatio(foreground, background);
        if (ratio < minimum) {
          failures.push(
            `${block.palette}/${block.theme} ${foregroundKey} on ${backgroundKey} ${ratio.toFixed(
              2
            )} < ${minimum}`
          );
        }
      }
    }

    expect(failures).toEqual([]);
  });
});
