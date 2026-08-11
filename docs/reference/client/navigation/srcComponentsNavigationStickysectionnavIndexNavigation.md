# srcComponentsNavigationStickysectionnavIndexNavigation

- Source: `src/components/navigation/StickySectionNav/index.jsx`

# srcComponentsNavigationStickysectionnavIndexNavigation

## components/navigation/StickySectionNav

In-flow route section navigation coordinated with scroll-spy state.

### getPageLabel()

Convert a route pathname into a readable drawer heading.

**Parameters**

- `pageUrl` (`string`) - Route pathname.

**Returns**

- `string` - Human-readable page label.

### StickySectionNav()

Render one consistent "On this page" command bar on every viewport.
The drawer owns discovery while this coordinator owns scroll-spy state,
URL hashes, and smooth document navigation.

**Parameters**

- `props` (`object`) - Component properties.
- `props.sections` (`Array<object>`, optional, default: `[]`) - Route sections and optional subsections.
- `props.pageUrl` (`string`, optional, default: `"/"`) - Canonical route path used for section hashes.

**Returns**

- `JSX.Element` - In-flow section navigator.
