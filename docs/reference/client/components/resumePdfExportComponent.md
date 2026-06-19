# resumePdfExportComponent

- Source: `src/components/features/ResumePreview/resumePdfExport.js`

# resumePdfExportComponent

## components/features/ResumePreview/resumePdfExport

Browser-side resume PDF generation helpers.

### getPdfOrientation()

Determines PDF orientation from element dimensions.

**Parameters**

- `width` (`number`) - Element width in pixels.
- `height` (`number`) - Element height in pixels.

**Returns**

- `"portrait" | "landscape"`

### buildPageSlices()

Builds a pagination plan for rendering a single source canvas across one or
more PDF pages without distortion.

**Parameters**

- `options` (`Object`) - Pagination options.
- `options.imageWidthPx` (`number`) - Source image width in pixels.
- `options.imageHeightPx` (`number`) - Source image height in pixels.
- `options.pageWidthPt` (`number`) - PDF page width in points.
- `options.pageHeightPt` (`number`) - PDF page height in points.
- `options.marginPt` (`number`, optional, default: `24`) - Per-page margin in points.
- `options.rowComplexityScores` (`ArrayLike<number>`, optional) - Optional per-row visual complexity values.

**Returns**

- `Object`

### trimTransparentCanvasMargins()

Removes fully transparent outer margins from a rendered canvas.
This prevents cloned layout offsets from creating blank PDF gutters.

**Parameters**

- `sourceCanvas` (`HTMLCanvasElement`) - Canvas to normalize.

**Returns**

- `HTMLCanvasElement` - Original or cropped canvas.

### fillTransparentCanvasPixels()

Flattens transparent pixels to an explicit solid background color.

**Parameters**

- `sourceCanvas` (`HTMLCanvasElement`) - Canvas to flatten.
- `backgroundColor` (`string`) - Solid fill color.

**Returns**

- `HTMLCanvasElement` - Original or flattened canvas.

### downloadResumePdf()

Generates and downloads a PDF that mirrors the provided resume element's
current browser styling (including active theme/palette variables).

**Parameters**

- `element` (`HTMLElement`) - Root resume element to export.
- `options` (`Object`, optional) - Export options.
- `options.fileName` (`string`, optional, default: `"resume.pdf"`) - Downloaded file name.
- `options.marginPt` (`number`, optional, default: `24`) - PDF page margin in points.
- `options.pixelRatio` (`number`, optional, default: `2`) - Capture quality scale.

**Returns**

- `Promise<string>` - Resolved downloaded file name.
