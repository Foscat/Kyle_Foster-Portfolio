/**
 * @file src/styles/colorThemes.contrast.test.js
 * @description Contrast regression checks for core color-theme token pairings.
 * @module src/styles/colorThemes.contrast.test
 */

import { describe, expect, it } from "vitest";
import { PALETTE_TOKENS } from "../assets/themePalettes.js";

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

function mixColors(foreground, background, foregroundWeight) {
  const backgroundWeight = 1 - foregroundWeight;

  return foreground.map((channel, index) =>
    Math.round(channel * foregroundWeight + background[index] * backgroundWeight)
  );
}

function getPaletteBlocks() {
  return Object.entries(PALETTE_TOKENS).flatMap(([palette, themes]) =>
    Object.entries(themes).map(([theme, variables]) => ({
      palette,
      theme,
      variables,
    }))
  );
}

describe("color-themes contrast coverage", () => {
  it("keeps core text/surface pairings above WCAG AA", () => {
    const blocks = getPaletteBlocks();
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

  it("keeps interactive button variants above WCAG AA across every palette mode", () => {
    const blocks = getPaletteBlocks();
    const failures = [];

    for (const block of blocks) {
      const text = parseHex(block.variables.text);
      const textMuted = parseHex(block.variables["text-muted"]);
      const primary = parseHex(block.variables.primary);
      const primaryText = parseHex(block.variables["primary-text"]);
      const secondary = parseHex(block.variables.secondary);
      const secondaryText = parseHex(block.variables["secondary-text"]);
      const accent = parseHex(block.variables.accent);
      const danger = parseHex(block.variables.danger);
      const raisedSurface = parseHex(block.variables["surface-raised"]);
      const mutedSurface = parseHex(block.variables["surface-muted"]);

      const requiredValues = {
        text,
        textMuted,
        primary,
        primaryText,
        secondary,
        secondaryText,
        accent,
        danger,
        raisedSurface,
        mutedSurface,
      };
      const missing = Object.entries(requiredValues)
        .filter(([, value]) => !value)
        .map(([key]) => key);

      if (missing.length > 0) {
        failures.push(
          `${block.palette}/${block.theme} missing interactive-surface source token(s): ${missing.join(", ")}`
        );
        continue;
      }

      const checks = [
        ["primary", contrastRatio(primaryText, primary)],
        ["secondary", contrastRatio(secondaryText, secondary)],
        ["subtle", contrastRatio(textMuted, mutedSurface)],
        ["accent", contrastRatio(text, mixColors(accent, raisedSurface, 0.28))],
        ["danger", contrastRatio(text, mixColors(danger, raisedSurface, 0.22))],
      ];

      for (const [variant, ratio] of checks) {
        if (ratio < 4.5) {
          failures.push(
            `${block.palette}/${block.theme} ${variant} button contrast ${ratio.toFixed(2)} < 4.5`
          );
        }
      }
    }

    expect(failures).toEqual([]);
  });
});
