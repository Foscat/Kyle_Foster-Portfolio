# paletteTransformUi

- Source: `src/components/ui/MermaidDiagram/paletteTransform.js`

# paletteTransformUi

## src\\components\\ui\\MermaidDiagram\\paletteTransform

src\components\ui\MermaidDiagram\paletteTransform module.

### applyPaletteToDiagramSource()

Applies a named palette remapping to Mermaid source by replacing known hex
color literals with palette-specific equivalents.

**Parameters**

- `source` (`string`) - Mermaid definition source.
- `palette` (`string`) - Palette key (`primary`, `alt`, `forest`, `ocean`, `sunset`).

**Returns**

- `string` - Source with palette substitutions applied.
