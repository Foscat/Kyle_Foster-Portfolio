# pageSummaryMetasData

- Source: `src/assets/data/pageSummaryMetas.js`

# pageSummaryMetasData

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
