# pdfAssetsData

- Source: `src/assets/data/resume/pdfAssets.js`

# pdfAssetsData

## assets/data/resume/pdfAssets

Theme-aware resume PDF asset helpers.

### resolveResumePdfHref()

Resolves the resume PDF href for the provided theme.

**Parameters**

- `theme` (`unknown`) - Theme identifier from theme context.

**Returns**

- `string` - Theme-matched PDF URL.

### resolveEffectiveTheme()

Resolves a raw theme value to an effective light/dark theme.

**Parameters**

- `theme` (`unknown`) - Theme identifier from theme context.

**Returns**

- `"light" | "dark"` - Effective theme identifier.
