# Data and Content

## assets/data/index

Barrel export for shared content data modules.

## assets/data/pageMetas

Backward-compatible page metadata registry with sections.
Prefer importing `pageSummaryMetas` for lightweight head/page chrome data.

## assets/data/pageSummaryMetas

Lightweight page metadata used for SEO and page chrome.
This file intentionally excludes heavy section payloads so it can be
imported globally without pulling all route content into the initial bundle.

### seoSummary()

Reuse canonical SEO copy without coupling page chrome to build tooling.

**Parameters**

- `path` (`string`) - Registered application route.

**Returns**

- `Object` - Shared SEO summary.

## assets/data/projectMetas

Static registry of project metadata for portfolio cards and detail surfaces.

## assets/data/seoRouteRegistry

Pure route-level SEO registry shared by React and build tooling.

### SEO\_ROUTE\_REGISTRY

Route metadata used by the runtime head manager, static HTML generator, and sitemap.
The pathname key and the entry's `path` must remain identical.

### normalizePathname()

Normalize a route path so runtime and generated metadata use one canonical shape.

**Parameters**

- `pathname` (`string`) - Route path, optionally including a query or hash.

**Returns**

- `string` - Normalized absolute pathname.

### resolveRouteSeo()

Resolve complete metadata for a route and deployment origin.

**Parameters**

- `pathname` (`string`) - Requested route pathname.
- `origin` (`string`) - Canonical site origin.

**Returns**

- `object` - Resolved metadata with canonical and asset URLs.

### buildStructuredData()

Build the JSON-LD graph shared by runtime and generated route shells.

**Parameters**

- `routeSeo` (`object`) - Metadata returned by {@link resolveRouteSeo}.

**Returns**

- `object` - Schema.org graph for the current route.

## src\\assets\\data\\content\\diagrams

src\assets\data\content\diagrams module.

## src\\assets\\data\\content\\index

src\assets\data\content\index module.

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

## src\\assets\\data\\content\\resumeData

Structured resume content used by the resume preview/export feature.

## src\\assets\\data\\content\\codestream\\diagrams

src\assets\data\content\codestream\diagrams module.

## src\\assets\\data\\content\\codestream\\index

src\assets\data\content\codestream\index module.

### codestreamSections

CodeStream Case Study Data ------------------------------------------------------------ This file powers the CodeStream portfolio page using a data-driven approach. It is designed to work with: - Sticky Section Nav - AccordionList - InfoSection / ClickableImg / diagramDiagram components All UI layout should be derived from this data structure. /

## src\\assets\\data\\content\\contact

Alternative contact page content module.

## src\\assets\\data\\content\\hackathon\\diagrams

src\assets\data\content\hackathon\diagrams module.

## src\\assets\\data\\content\\hackathon\\index

src\assets\data\content\hackathon\index module.

### hackathonSections

Hackathon experience ------------------------------------------------------------ This file powers the Hackathon portfolio page using a data-driven approach. It is designed to work with: - Sticky Section Nav - AccordionList - InfoSection / ClickableImg / diagramDiagram components All UI layout should be derived from this data structure. /

## assets/data/content/home/diagrams

Home-page diagram block definitions used by section data composition.

## src\\assets\\data\\content\\home\\index

src\assets\data\content\home\index module.

## assets/data/content/sanderson-technology-enterprises

Public-safe case study content for Sanderson Technology Enterprises work.

## src\\assets\\data\\content\\side-projects\\diagrams

src\assets\data\content\side-projects\diagrams module.

## src\\assets\\data\\content\\side-projects\\index

src\assets\data\content\side-projects\index module.

## src\\assets\\data\\content\\smu\\diagrams

src\assets\data\content\smu\diagrams module.

## src\\assets\\data\\content\\smu\\index

src\assets\data\content\smu\index module.

### smuSections

SMU – Page Section Data ------------------------------------------------------------ Academic projects demonstrating early-stage growth, teamwork, and problem-solving progression. /
