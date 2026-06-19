# renderWithProvidersTest

- Source: `src/tests/renderWithProviders.jsx`

# renderWithProvidersTest

## src/tests/renderWithProviders

src/tests/renderWithProviders module.

### renderWithProviders()

Render helper that mirrors the real app provider stack closely enough for
behavior-driven component tests.

Why this exists:
- Many components depend on router context.
- Theme-aware components require ThemeProvider + RSuite CustomProvider.
- Responsive logic depends on ResponsiveProvider being present.
- Helmet-managed document metadata requires HelmetProvider.

Tests should prefer this helper over raw `render()` whenever the component
under test consumes application context.

**Parameters**

- `ui` (`React.ReactElement`) - Component under test.
- `options` (`object`, optional)
- `options.initialEntries` (`Array<string>`, optional, default: `["/"]`) - Initial router entries.
- `options.rsuiteTheme` (`"light" | "dark"`, optional, default: `"dark"`) - RSuite theme.

**Returns**

- `RenderResult`
