/**
 * @file src/styles/colorThemes.contrast.test.js
 * @description Guards the portfolio palette list against the ui-style-kit-css v2 theme bundle.
 * @module src/styles/colorThemes.contrast.test
 */

import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PALETTE_IDS } from "../assets/themePalettes.js";

const require = createRequire(import.meta.url);

function readPackageThemeColors() {
  return readFileSync(require.resolve("ui-style-kit-css/theme-colors.css"), "utf8");
}

function listPackagePalettes(css) {
  const matches = css.matchAll(/\[data-theme="([^"]+)"\]\[data-mode="(?:light|dark|contrast)"\]/g);
  return [...new Set([...matches].map(([, palette]) => palette))].sort();
}

describe("color-theme package contract", () => {
  it("keeps portfolio palette identifiers aligned with ui-style-kit-css themes", () => {
    const packagePalettes = listPackagePalettes(readPackageThemeColors());

    expect([...PALETTE_IDS].sort()).toEqual(packagePalettes);
  });

  it("does not re-export a local palette token matrix", async () => {
    const paletteModule = await import("../assets/themePalettes.js");

    expect("PALETTE_TOKENS" in paletteModule).toBe(false);
    expect("applyPaletteTokens" in paletteModule).toBe(false);
  });
});
