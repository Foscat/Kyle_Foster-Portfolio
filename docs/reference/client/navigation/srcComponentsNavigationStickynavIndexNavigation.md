# srcComponentsNavigationStickynavIndexNavigation

- Source: `src/components/navigation/StickyNav/index.jsx`

# srcComponentsNavigationStickynavIndexNavigation

## components/StickyNav

Primary site navigation with synchronized desktop and mobile
layouts, active-route handling, and accessibility semantics. Mobile utilities
stay inside the drawer so small screens retain the full content width.

### isRouteActive()

Keep legacy case studies discoverable without letting them dominate the
primary information architecture.

**Parameters**

- `activePage` (`string`) - Current route pathname.
- `item` (`object`) - Navigation destination and optional grouped routes.

**Returns**

- `boolean` - Whether the destination represents the current route.
