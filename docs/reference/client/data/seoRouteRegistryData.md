# seoRouteRegistryData

- Source: `src/assets/data/seoRouteRegistry.js`

# seoRouteRegistryData

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
