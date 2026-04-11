/**
 * @file src\components\ui\MermaidDiagram\paletteTransform.test.jsx
 * @description src\components\ui\MermaidDiagram\paletteTransform.test module.
 * @module src\components\ui\MermaidDiagram\paletteTransform.test
 */

import { applyPaletteToDiagramSource } from "./paletteTransform";

describe("applyPaletteToDiagramSource", () => {
  test("keeps source unchanged for primary palette", () => {
    const source = "classDef default fill:#1F2793,stroke:#C9A227,color:#F5F7FF;";
    expect(applyPaletteToDiagramSource(source, "primary")).toBe(source);
  });

  test("maps legacy primary tokens to alt palette tokens", () => {
    const source = "fill:#1F2793,stroke:#C9A227,color:#F5F7FF;";
    const next = applyPaletteToDiagramSource(source, "alt");

    expect(next).toContain("fill:#1D3447");
    expect(next).toContain("stroke:#5BA4FF");
    expect(next).toContain("color:#E2EDF5");
  });

  test("maps tokens for forest/ocean/sunset palettes", () => {
    const source = "fill:#1F2793,stroke:#C9A227,color:#F5F7FF;";

    expect(applyPaletteToDiagramSource(source, "forest")).toContain("fill:#1B594E");
    expect(applyPaletteToDiagramSource(source, "forest")).toContain("stroke:#B28831");

    expect(applyPaletteToDiagramSource(source, "ocean")).toContain("fill:#14447E");
    expect(applyPaletteToDiagramSource(source, "ocean")).toContain("stroke:#D0853E");

    expect(applyPaletteToDiagramSource(source, "sunset")).toContain("fill:#7C2D3C");
    expect(applyPaletteToDiagramSource(source, "sunset")).toContain("stroke:#D69222");
  });
});
