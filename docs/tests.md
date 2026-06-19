# Test Helpers

## src/tests/renderWithAppProviders

Render helper for components that already own the router (e.g. App).

### module.exports()

Renders a component tree with app-level providers, excluding router wrappers.

**Parameters**

- `ui` (`React.ReactElement`) - Component under test.
- `options` (`object`, optional)
- `options.rsuiteTheme` (`"light" | "dark"`, optional, default: `"dark"`) - RSuite theme.

**Returns**

- `object` - Testing Library render result.

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

## src\\tests\\setupTests

src\tests\setupTests module.

## tests/setupTests

This file provides stable implementations of browser APIs that are commonly used across the codebase, such as requestAnimationFrame, matchMedia, ResizeObserver, IntersectionObserver, scroll APIs, and clipboard functionality. By defining these shims in a central location, we ensure that all tests have access to consistent and deterministic behavior for these APIs, which is crucial for testing components that rely on responsive design, scrolling behavior, and clipboard interactions. This setup helps to prevent errors related to missing APIs in the jsdom environment and allows tests to focus on component behavior rather than low-level API availability.

Testing rules applied:
- Browser APIs are mocked to provide stable implementations in the jsdom environment.
- The matchMedia mock includes a helper method to allow tests to simulate different media query matches, enabling testing of responsive behavior in components that rely on matchMedia.
- The clipboard mock provides a spy function for writeText, allowing tests to verify that clipboard interactions are occurring as expected without relying on the actual clipboard API, which is not available in jsdom.
- The IntersectionObserver and ResizeObserver mocks provide basic implementations that allow components using these APIs to function in tests without throwing errors, while also allowing for more complex behavior to be tested by replacing the mock implementations in specific test files as needed.
Design intent:
The goal of this setup file is to provide a consistent and reliable testing environment for all tests in the codebase by ensuring that commonly used browser APIs are available and behave in a predictable manner. This allows tests to focus on the behavior of the components being tested rather than dealing with issues related to missing or inconsistent API implementations in the jsdom environment. By centralizing these shims, we also avoid the need for individual test files to implement their own mocks for these APIs, reducing duplication and ensuring consistency across tests.

### \_\_setMatches()

Test-only helper used by explicit matchMedia overrides when needed. Kept here so unsupported environments still expose a stable shape. /

## src/tests/fixtures/loadInteractiveSurfaceCss

Loads interactive-surface styles for fixture-driven tests.

## src\\tests\\helpers\\clickAndExpectPrevented

src\tests\helpers\clickAndExpectPrevented module.

## src\\tests\\helpers\\createPageTests

src\tests\helpers\createPageTests module.

### createPageTests()

Creates a test suite for a data-driven page component, focused on verifying composition and user-facing content rather than implementation details. The tests ensure that the page correctly integrates with shared components like scroll restoration, page header, section navigation, primary navigation, and footer, and that it renders the expected content based on the provided section data and active route. This allows us to confirm that the page is correctly composed and provides the expected user experience in terms of content rendering and navigation integration without coupling to the internal workings of those components. The createPageTests function can be used across different page test suites to ensure consistent testing of these common behaviors across all pages in the application. Test cases: - Restores scroll position on mount - Renders the page heading and section navigation entries - Passes the active page route into primary navigation behavior - Section titles are delegated into both content and section navigation - Renders the footer component The tests focus on verifying that the page correctly composes with shared components and renders user-facing content based on the provided data, ensuring that the expected behavior and content are present without relying on implementation details of the individual components. This allows us to confirm that the page is correctly structured and provides the expected user experience in terms of content rendering and navigation integration. /

## src\\tests\\helpers\\expectAriaCurrent

src\tests\helpers\expectAriaCurrent module.
