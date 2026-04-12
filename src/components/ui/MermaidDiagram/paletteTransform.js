/**
 * @file src\components\ui\MermaidDiagram\paletteTransform.js
 * @description src\components\ui\MermaidDiagram\paletteTransform module.
 * @module src\components\ui\MermaidDiagram\paletteTransform
 */

const normalizePalette = (palette) => (typeof palette === "string" ? palette.toLowerCase() : "");

const COLOR_MAPS_BY_PALETTE = Object.freeze({
  alt: Object.freeze({
    "#1f2793": "#1D3447",
    "#131a77": "#182631",
    "#2a326e": "#182631",
    "#1a214c": "#09131C",
    "#22305f": "#0D1A26",
    "#c9a227": "#5BA4FF",
    "#e6c767": "#9CC4FF",
    "#f5f7ff": "#E2EDF5",
    "#0f0f12": "#09131C",
    "#1f6d49": "#215D8D",
    "#8d710d": "#233E54",
    "#7e89c9": "#4C687F",
    "#d1d1d6": "#4C687F",
    "#e8eef9": "#E2EDF5",
    "#b8860b": "#5BA4FF",
    "#a88900": "#385268",
    "#e1e1e3": "#E2EDF5",
  }),
  forest: Object.freeze({
    "#1f2793": "#1B594E",
    "#1d3447": "#1B594E",
    "#131a77": "#134038",
    "#182631": "#134038",
    "#2a326e": "#1F4E45",
    "#1a214c": "#13342D",
    "#22305f": "#183B34",
    "#0d1a26": "#183B34",
    "#0f0f12": "#0D1815",
    "#09131c": "#0D1815",
    "#c9a227": "#B28831",
    "#5ba4ff": "#B28831",
    "#e6c767": "#DDBD7A",
    "#9cc4ff": "#DDBD7A",
    "#b8860b": "#86601A",
    "#a88900": "#8E6A20",
    "#385268": "#527C73",
    "#4c687f": "#5F8E84",
    "#7e89c9": "#6FA79D",
    "#d1d1d6": "#BBD0C9",
    "#f5f7ff": "#EDF6F2",
    "#e2edf5": "#EDF6F2",
    "#e8eef9": "#E6F1EC",
    "#e1e1e3": "#DDEBE5",
    "#1f6d49": "#2E7F5F",
    "#8d710d": "#6D5A1E",
    "#233e54": "#2A5D53",
  }),
  ocean: Object.freeze({
    "#1f2793": "#14447E",
    "#1d3447": "#14447E",
    "#131a77": "#0C2C54",
    "#182631": "#0C2C54",
    "#2a326e": "#1B4F8B",
    "#1a214c": "#123A6A",
    "#22305f": "#164577",
    "#0d1a26": "#164577",
    "#0f0f12": "#0B1422",
    "#09131c": "#0B1422",
    "#c9a227": "#D0853E",
    "#5ba4ff": "#D0853E",
    "#e6c767": "#EAB278",
    "#9cc4ff": "#EAB278",
    "#b8860b": "#925622",
    "#a88900": "#9F6329",
    "#385268": "#5E95C4",
    "#4c687f": "#74A5CF",
    "#7e89c9": "#8CB8DC",
    "#d1d1d6": "#C1D4E6",
    "#f5f7ff": "#ECF4FC",
    "#e2edf5": "#ECF4FC",
    "#e8eef9": "#DCEAF7",
    "#e1e1e3": "#D6E5F3",
    "#1f6d49": "#1C5F95",
    "#8d710d": "#7E5125",
    "#233e54": "#1A5A93",
  }),
  sunset: Object.freeze({
    "#1f2793": "#7C2D3C",
    "#1d3447": "#7C2D3C",
    "#131a77": "#5E2330",
    "#182631": "#5E2330",
    "#2a326e": "#934255",
    "#1a214c": "#6E2C3A",
    "#22305f": "#7B3242",
    "#0d1a26": "#7B3242",
    "#0f0f12": "#1C0E11",
    "#09131c": "#1C0E11",
    "#c9a227": "#D69222",
    "#5ba4ff": "#D69222",
    "#e6c767": "#F1C06E",
    "#9cc4ff": "#F1C06E",
    "#b8860b": "#965A12",
    "#a88900": "#9F661B",
    "#385268": "#C98295",
    "#4c687f": "#D899A9",
    "#7e89c9": "#E2AEBB",
    "#d1d1d6": "#E7C8CF",
    "#f5f7ff": "#FBEFF2",
    "#e2edf5": "#FBEFF2",
    "#e8eef9": "#F3DCE2",
    "#e1e1e3": "#F0D7DD",
    "#1f6d49": "#9A3F54",
    "#8d710d": "#8B4F12",
    "#233e54": "#A24A62",
  }),
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

export function applyPaletteToDiagramSource(source, palette) {
  if (!source) return source;

  const paletteKey = normalizePalette(palette);
  if (!paletteKey || paletteKey === "primary") return source;

  const colorMap = COLOR_MAPS_BY_PALETTE[paletteKey] || COLOR_MAPS_BY_PALETTE.alt;
  return applyHexColorMap(source, colorMap);
}

export const mermaidPaletteColorMaps = COLOR_MAPS_BY_PALETTE;
