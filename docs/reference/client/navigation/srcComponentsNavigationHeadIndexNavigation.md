# srcComponentsNavigationHeadIndexNavigation

- Source: `src/components/navigation/Head/index.jsx`

# srcComponentsNavigationHeadIndexNavigation

## components/navigation/Head

Route-aware document metadata manager backed by the shared SEO registry.

### module.exports()

Render canonical, crawler, social, and structured metadata for the current route.
Static build tooling uses the same registry and structured-data builder so raw HTML
and hydrated React metadata remain identical.

**Returns**

- `JSX.Element` - Helmet-managed route metadata.
