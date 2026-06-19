# portfolioDocsData

- Source: `src/assets/data/content/portfolioDocs.js`

# portfolioDocsData

## src\\assets\\data\\content\\portfolioDocs

src\assets\data\content\portfolioDocs module.

### portfolioDocsMeta

Metadata-only portfolio docs list.
Metadata-only portfolio docs list.
Does not include `content`; use `getPortfolioDocs`, `getPortfolioDoc`,
or `getPortfolioDocsByCategory` to load hydrated docs with `content`.

### portfolioDocs

### getPortfolioDocs()

Load hydrated portfolio docs, including their raw markdown `content`.

**Parameters**

- `slugs` (`Array<string>`, optional, default: `[]`) - Optional slugs to filter by.

**Returns**

- `Promise<Array<{slug: string, fileName: string, path: string, title: string, category: string, summary: string, order: number, content: string}>>`

### getPortfolioDocsByCriteria()

Load hydrated portfolio docs using category or path-prefix selectors.

**Parameters**

- `criteria` (`Object`, optional, default: `{}`) - Selection criteria.
- `criteria.slugs` (`Array<string>`, optional, default: `[]`) - Optional slug allow-list.
- `criteria.categories` (`Array<string>`, optional, default: `[]`) - Optional category allow-list.
- `criteria.pathPrefixes` (`Array<string>`, optional, default: `[]`) - Optional docs-relative path prefixes.
- `criteria.includeReferenceIndexes` (`boolean`, optional, default: `false`) - Whether README index docs should be included.

**Returns**

- `Promise<Array<{slug: string, fileName: string, path: string, relativePath: string, title: string, category: string, summary: string, order: number, content: string}>>`

### getPortfolioDocsMetaByCriteria()

Read metadata-only docs using the same selector rules as hydrated docs.

**Parameters**

- `criteria` (`Object`, optional, default: `{}`) - Selection criteria.

**Returns**

- `Array<Object>` - Metadata-only docs for navigation generation.

### getPortfolioDoc()

Load a single hydrated portfolio doc, including raw markdown `content`.

**Parameters**

- `slug` (`string`)

**Returns**

- `Promise<({slug: string, fileName: string, path: string, title: string, category: string, summary: string, order: number, content: string}|null)>`

### getPortfolioDocsByCategory()

Load hydrated portfolio docs for a category, including raw markdown `content`.

**Parameters**

- `category` (`string`)

**Returns**

- `Promise<Array<{slug: string, fileName: string, path: string, title: string, category: string, summary: string, order: number, content: string}>>`
