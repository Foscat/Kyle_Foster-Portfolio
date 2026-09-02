# renderWithAppProvidersTest

- Source: `src/tests/renderWithAppProviders.jsx`

# renderWithAppProvidersTest

## src/tests/renderWithAppProviders

Render helper for components that already own the router (e.g. App).

### module.exports()

Renders a component tree with app-level providers, excluding router wrappers.

**Parameters**

- `ui` (`React.ReactElement`) - Component under test.

**Returns**

- `object` - Testing Library render result.
