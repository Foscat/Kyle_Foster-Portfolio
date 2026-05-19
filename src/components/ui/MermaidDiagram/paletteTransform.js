/**
 * @file src\components\ui\MermaidDiagram\paletteTransform.js
 * @description src\components\ui\MermaidDiagram\paletteTransform module.
 * @module src\components\ui\MermaidDiagram\paletteTransform
 */

const normalizePalette = (palette) => (typeof palette === "string" ? palette.toLowerCase() : "");

const COLOR_MAPS_BY_PALETTE = Object.freeze({
  "midnight-gold": Object.freeze({
    "#1f2793": "#31497a",
    "#131a77": "#1c2c4e",
    "#2a326e": "#24365c",
    "#1a214c": "#131d34",
    "#22305f": "#1b2a4a",
    "#c9a227": "#c69436",
    "#e6c767": "#e7c57f",
    "#0f0f12": "#0b101c",
    "#1f6d49": "#4f6aa8",
    "#8d710d": "#8b6222",
    "#7e89c9": "#93a6d6",
    "#d1d1d6": "#d3dbef",
    "#b8860b": "#b9832f",
    "#a88900": "#7f5c22",
    "#233e54": "#365987",
  }),
  "ocean-steel": Object.freeze({
    "#1f2793": "#0f5c84",
    "#131a77": "#0b3c59",
    "#2a326e": "#126a97",
    "#1a214c": "#0a2639",
    "#22305f": "#10334b",
    "#c9a227": "#1caec5",
    "#e6c767": "#8de0ea",
    "#0f0f12": "#08151f",
    "#1f6d49": "#1a8aa0",
    "#8d710d": "#2f6675",
    "#7e89c9": "#7dbed1",
    "#d1d1d6": "#c9e7ef",
    "#b8860b": "#1595a8",
    "#a88900": "#2a5c68",
    "#233e54": "#206d84",
  }),
  "forest-moss": Object.freeze({
    "#1f2793": "#356f39",
    "#131a77": "#204928",
    "#2a326e": "#417e45",
    "#1a214c": "#16331b",
    "#22305f": "#27492d",
    "#c9a227": "#93b248",
    "#e6c767": "#c8df8e",
    "#0f0f12": "#0b170b",
    "#1f6d49": "#4c9553",
    "#8d710d": "#587038",
    "#7e89c9": "#8eb094",
    "#d1d1d6": "#d7e8cf",
    "#b8860b": "#7e9f3a",
    "#a88900": "#4f6831",
    "#233e54": "#3d7643",
  }),
  "sunset-ember": Object.freeze({
    "#1f2793": "#b5522f",
    "#131a77": "#7d3420",
    "#2a326e": "#c96a45",
    "#1a214c": "#5e2517",
    "#22305f": "#863622",
    "#c9a227": "#d37a52",
    "#e6c767": "#efb08e",
    "#0f0f12": "#21100b",
    "#1f6d49": "#a24a62",
    "#8d710d": "#86513f",
    "#7e89c9": "#d49484",
    "#d1d1d6": "#f0d2c8",
    "#b8860b": "#bd603d",
    "#a88900": "#7a4735",
    "#233e54": "#9f5641",
  }),
  "royal-plum": Object.freeze({
    "#1f2793": "#6f47b8",
    "#131a77": "#482b7b",
    "#2a326e": "#805fca",
    "#1a214c": "#341f5c",
    "#22305f": "#4a2f7a",
    "#c9a227": "#9a7ded",
    "#e6c767": "#c8b5fb",
    "#0f0f12": "#160d23",
    "#1f6d49": "#6d7ddd",
    "#8d710d": "#5f548b",
    "#7e89c9": "#a8a7ef",
    "#d1d1d6": "#ddd6fa",
    "#b8860b": "#8064cf",
    "#a88900": "#54487a",
    "#233e54": "#6f7dc0",
  }),
  "graphite-cyan": Object.freeze({
    "#1f2793": "#3c4a54",
    "#131a77": "#253038",
    "#2a326e": "#4f5e69",
    "#1a214c": "#1b242a",
    "#22305f": "#27333b",
    "#c9a227": "#00a2b6",
    "#e6c767": "#7fd9e5",
    "#0f0f12": "#0b0f12",
    "#1f6d49": "#338c98",
    "#8d710d": "#47535a",
    "#7e89c9": "#8ca0ad",
    "#d1d1d6": "#d2dde4",
    "#b8860b": "#188da0",
    "#a88900": "#3e4a52",
    "#233e54": "#3d6f79",
  }),
  "desert-sage": Object.freeze({
    "#1f2793": "#8d6d44",
    "#131a77": "#5e482d",
    "#2a326e": "#a08056",
    "#1a214c": "#45351f",
    "#22305f": "#6d5432",
    "#c9a227": "#9bb486",
    "#e6c767": "#d0dfbf",
    "#0f0f12": "#1a140d",
    "#1f6d49": "#7f9d68",
    "#8d710d": "#7d6b4f",
    "#7e89c9": "#bca98f",
    "#d1d1d6": "#e7ddcf",
    "#b8860b": "#8f9f68",
    "#a88900": "#6e5f45",
    "#233e54": "#83976b",
  }),
  "rose-quartz": Object.freeze({
    "#1f2793": "#bf587f",
    "#131a77": "#843652",
    "#2a326e": "#d0729a",
    "#1a214c": "#63263c",
    "#22305f": "#8f395b",
    "#c9a227": "#cf7fa8",
    "#e6c767": "#f0bcd3",
    "#0f0f12": "#220d15",
    "#1f6d49": "#ad76c4",
    "#8d710d": "#81576c",
    "#7e89c9": "#dd9db8",
    "#d1d1d6": "#f1d6e3",
    "#b8860b": "#b86c95",
    "#a88900": "#7a5163",
    "#233e54": "#a46ab5",
  }),
  "cyber-lime": Object.freeze({
    "#1f2793": "#72b02d",
    "#131a77": "#4a751c",
    "#2a326e": "#8ac93f",
    "#1a214c": "#345414",
    "#22305f": "#547f24",
    "#c9a227": "#a9ea3d",
    "#e6c767": "#d5f58f",
    "#0f0f12": "#111a08",
    "#1f6d49": "#8e6ae0",
    "#8d710d": "#64724a",
    "#7e89c9": "#b1de79",
    "#d1d1d6": "#e4f2c8",
    "#b8860b": "#8bcf31",
    "#a88900": "#5f6d45",
    "#233e54": "#8264c8",
  }),
  "arctic-indigo": Object.freeze({
    "#1f2793": "#4b63c8",
    "#131a77": "#314397",
    "#2a326e": "#6278d8",
    "#1a214c": "#253273",
    "#22305f": "#364a9d",
    "#c9a227": "#78b9e6",
    "#e6c767": "#c0e2f6",
    "#0f0f12": "#0f172d",
    "#1f6d49": "#74a4de",
    "#8d710d": "#4a6190",
    "#7e89c9": "#9fb4ef",
    "#d1d1d6": "#d8e5fb",
    "#b8860b": "#6299d0",
    "#a88900": "#455a84",
    "#233e54": "#5b84c2",
  }),
});

const PALETTE_ALIASES = Object.freeze({
  primary: "midnight-gold",
  alt: "royal-plum",
  forest: "forest-moss",
  ocean: "ocean-steel",
  sunset: "sunset-ember",
});

const LIGHT_MODE_TEXT_OVERRIDES = Object.freeze({
  "#f5f7ff": "#1a2332",
  "#e8eef9": "#1f2a3d",
  "#e2edf5": "#1a2636",
  "#e1e1e3": "#222735",
  "#d1d1d6": "#2c3242",
});

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function applyHexColorMap(source, colorMap) {
  if (!source || !colorMap || Object.keys(colorMap).length === 0) return source;

  const pattern = Object.keys(colorMap)
    .sort((left, right) => right.length - left.length)
    .map((value) => escapeRegExp(value))
    .join("|");

  if (!pattern) return source;

  const matcher = new RegExp(pattern, "gi");
  return source.replace(matcher, (matched) => {
    const replacement = colorMap[matched.toLowerCase()];
    return typeof replacement === "string" ? replacement : matched;
  });
}

/**
 * Applies a named palette remapping to Mermaid source by replacing known hex
 * color literals with palette-specific equivalents.
 *
 * @param {string} source - Mermaid definition source.
 * @param {string} palette - Palette key (`primary`, `alt`, `forest`, `ocean`, `sunset`).
 * @returns {string} Source with palette substitutions applied.
 */
export function applyPaletteToDiagramSource(source, palette, mode = "dark") {
  if (!source) return source;

  const normalizedPalette = normalizePalette(palette);
  const paletteKey = PALETTE_ALIASES[normalizedPalette] || normalizedPalette;
  if (!paletteKey || paletteKey === "midnight-gold") {
    const withFallbackText =
      mode === "light" ? applyHexColorMap(source, LIGHT_MODE_TEXT_OVERRIDES) : source;
    return withFallbackText;
  }

  const colorMap = COLOR_MAPS_BY_PALETTE[paletteKey] || COLOR_MAPS_BY_PALETTE["royal-plum"];
  const mapped = applyHexColorMap(source, colorMap);

  if (mode === "light") {
    return applyHexColorMap(mapped, LIGHT_MODE_TEXT_OVERRIDES);
  }

  return mapped;
}

export const mermaidPaletteColorMaps = COLOR_MAPS_BY_PALETTE;
