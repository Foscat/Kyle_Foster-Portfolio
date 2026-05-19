/**
 * @file src\components\ui\MermaidDiagram\paletteTransform.test.jsx
 * @description src\components\ui\MermaidDiagram\paletteTransform.test module.
 * @module src\components\ui\MermaidDiagram\paletteTransform.test
 */

import { applyPaletteToDiagramSource } from "./paletteTransform";

describe("applyPaletteToDiagramSource", () => {
  test("keeps source unchanged for midnight-gold in dark mode", () => {
    const source = "classDef default fill:#1F2793,stroke:#C9A227,color:#F5F7FF;";
    expect(applyPaletteToDiagramSource(source, "midnight-gold", "dark")).toBe(source);
  });

  test("adjusts text tokens for midnight-gold in light mode", () => {
    const source = "classDef default fill:#1F2793,stroke:#C9A227,color:#F5F7FF;";
    const next = applyPaletteToDiagramSource(source, "midnight-gold", "light");

    expect(next).toContain("color:#1a2332");
    expect(next).toContain("fill:#1F2793");
  });

  test("maps legacy alias palettes to current theme palettes", () => {
    const source = "fill:#1F2793,stroke:#C9A227,color:#F5F7FF;";
    const alt = applyPaletteToDiagramSource(source, "alt", "dark");
    const forest = applyPaletteToDiagramSource(source, "forest", "dark");
    const ocean = applyPaletteToDiagramSource(source, "ocean", "dark");
    const sunset = applyPaletteToDiagramSource(source, "sunset", "dark");

    expect(alt).toContain("fill:#6f47b8");
    expect(forest).toContain("fill:#356f39");
    expect(ocean).toContain("fill:#0f5c84");
    expect(sunset).toContain("fill:#b5522f");
  });

  test("maps tokens for all 10 current palettes", () => {
    const source = "fill:#1F2793,stroke:#C9A227,color:#F5F7FF;";

    expect(applyPaletteToDiagramSource(source, "ocean-steel", "dark")).toContain("fill:#0f5c84");
    expect(applyPaletteToDiagramSource(source, "forest-moss", "dark")).toContain("fill:#356f39");
    expect(applyPaletteToDiagramSource(source, "sunset-ember", "dark")).toContain("fill:#b5522f");
    expect(applyPaletteToDiagramSource(source, "royal-plum", "dark")).toContain("fill:#6f47b8");
    expect(applyPaletteToDiagramSource(source, "graphite-cyan", "dark")).toContain("fill:#3c4a54");
    expect(applyPaletteToDiagramSource(source, "desert-sage", "dark")).toContain("fill:#8d6d44");
    expect(applyPaletteToDiagramSource(source, "rose-quartz", "dark")).toContain("fill:#bf587f");
    expect(applyPaletteToDiagramSource(source, "cyber-lime", "dark")).toContain("fill:#72b02d");
    expect(applyPaletteToDiagramSource(source, "arctic-indigo", "dark")).toContain("fill:#4b63c8");
  });
});
