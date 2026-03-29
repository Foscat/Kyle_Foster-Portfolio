## Modules

<dl>
<dt><a href="#module_tests/setupTests">tests/setupTests</a></dt>
<dd><p>This file provides stable implementations of browser APIs that are commonly used across the codebase, such as requestAnimationFrame, matchMedia, ResizeObserver, IntersectionObserver, scroll APIs, and clipboard functionality. By defining these shims in a central location, we ensure that all tests have access to consistent and deterministic behavior for these APIs, which is crucial for testing components that rely on responsive design, scrolling behavior, and clipboard interactions. This setup helps to prevent errors related to missing APIs in the jsdom environment and allows tests to focus on component behavior rather than low-level API availability.</p>
<p>Testing rules applied:</p>
<ul>
<li>Browser APIs are mocked to provide stable implementations in the jsdom environment.</li>
<li>The matchMedia mock includes a helper method to allow tests to simulate different media query matches, enabling testing of responsive behavior in components that rely on matchMedia.</li>
<li>The clipboard mock provides a spy function for writeText, allowing tests to verify that clipboard interactions are occurring as expected without relying on the actual clipboard API, which is not available in jsdom.</li>
<li>The IntersectionObserver and ResizeObserver mocks provide basic implementations that allow components using these APIs to function in tests without throwing errors, while also allowing for more complex behavior to be tested by replacing the mock implementations in specific test files as needed.
Design intent:
The goal of this setup file is to provide a consistent and reliable testing environment for all tests in the codebase by ensuring that commonly used browser APIs are available and behave in a predictable manner. This allows tests to focus on the behavior of the components being tested rather than dealing with issues related to missing or inconsistent API implementations in the jsdom environment. By centralizing these shims, we also avoid the need for individual test files to implement their own mocks for these APIs, reducing duplication and ensuring consistency across tests.</li>
</ul>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#createPageTests">createPageTests()</a></dt>
<dd><p>Creates a test suite for a data-driven page component, focused on verifying composition and user-facing content rather than implementation details. The tests ensure that the page correctly integrates with shared components like scroll restoration, page header, section navigation, primary navigation, and footer, and that it renders the expected content based on the provided section data and active route. This allows us to confirm that the page is correctly composed and provides the expected user experience in terms of content rendering and navigation integration without coupling to the internal workings of those components. The createPageTests function can be used across different page test suites to ensure consistent testing of these common behaviors across all pages in the application.</p>
<p>Test cases:</p>
<ul>
<li>Restores scroll position on mount</li>
<li>Renders the page heading and section navigation entries</li>
<li>Passes the active page route into primary navigation behavior</li>
<li>Section titles are delegated into both content and section navigation</li>
<li>Renders the footer component</li>
</ul>
<p>The tests focus on verifying that the page correctly composes with shared components and renders user-facing content based on the provided data, ensuring that the expected behavior and content are present without relying on implementation details of the individual components. This allows us to confirm that the page is correctly structured and provides the expected user experience in terms of content rendering and navigation integration.</p>
</dd>
<dt><a href="#renderWithProviders">renderWithProviders(ui, [options])</a> ⇒ <code>RenderResult</code></dt>
<dd><p>Render helper that mirrors the real app provider stack closely enough for
behavior-driven component tests.</p>
<p>Why this exists:</p>
<ul>
<li>Many components depend on router context.</li>
<li>Theme-aware components require ThemeProvider + RSuite CustomProvider.</li>
<li>Responsive logic depends on ResponsiveProvider being present.</li>
<li>Helmet-managed document metadata requires HelmetProvider.</li>
</ul>
<p>Tests should prefer this helper over raw <code>render()</code> whenever the component
under test consumes application context.</p>
</dd>
</dl>

<a name="module_tests/setupTests"></a>

## tests/setupTests
This file provides stable implementations of browser APIs that are commonly used across the codebase, such as requestAnimationFrame, matchMedia, ResizeObserver, IntersectionObserver, scroll APIs, and clipboard functionality. By defining these shims in a central location, we ensure that all tests have access to consistent and deterministic behavior for these APIs, which is crucial for testing components that rely on responsive design, scrolling behavior, and clipboard interactions. This setup helps to prevent errors related to missing APIs in the jsdom environment and allows tests to focus on component behavior rather than low-level API availability.Testing rules applied:- Browser APIs are mocked to provide stable implementations in the jsdom environment.- The matchMedia mock includes a helper method to allow tests to simulate different media query matches, enabling testing of responsive behavior in components that rely on matchMedia.- The clipboard mock provides a spy function for writeText, allowing tests to verify that clipboard interactions are occurring as expected without relying on the actual clipboard API, which is not available in jsdom.- The IntersectionObserver and ResizeObserver mocks provide basic implementations that allow components using these APIs to function in tests without throwing errors, while also allowing for more complex behavior to be tested by replacing the mock implementations in specific test files as needed.Design intent:The goal of this setup file is to provide a consistent and reliable testing environment for all tests in the codebase by ensuring that commonly used browser APIs are available and behave in a predictable manner. This allows tests to focus on the behavior of the components being tested rather than dealing with issues related to missing or inconsistent API implementations in the jsdom environment. By centralizing these shims, we also avoid the need for individual test files to implement their own mocks for these APIs, reducing duplication and ensuring consistency across tests.

**See**: https://vitest.dev/guide/setup-files.html for more information on setup files in Vitest  
**Author**: Kyle Foster  
<a name="module_tests/setupTests..__setMatches"></a>

### tests/setupTests~\_\_setMatches()
Test-only helper used by explicit matchMedia overrides when needed.Kept here so unsupported environments still expose a stable shape.

**Kind**: inner method of [<code>tests/setupTests</code>](#module_tests/setupTests)  
<a name="createPageTests"></a>

## createPageTests()
Creates a test suite for a data-driven page component, focused on verifying composition and user-facing content rather than implementation details. The tests ensure that the page correctly integrates with shared components like scroll restoration, page header, section navigation, primary navigation, and footer, and that it renders the expected content based on the provided section data and active route. This allows us to confirm that the page is correctly composed and provides the expected user experience in terms of content rendering and navigation integration without coupling to the internal workings of those components. The createPageTests function can be used across different page test suites to ensure consistent testing of these common behaviors across all pages in the application.Test cases:- Restores scroll position on mount- Renders the page heading and section navigation entries- Passes the active page route into primary navigation behavior- Section titles are delegated into both content and section navigation- Renders the footer componentThe tests focus on verifying that the page correctly composes with shared components and renders user-facing content based on the provided data, ensuring that the expected behavior and content are present without relying on implementation details of the individual components. This allows us to confirm that the page is correctly structured and provides the expected user experience in terms of content rendering and navigation integration.

**Kind**: global function  
<a name="renderWithProviders"></a>

## renderWithProviders(ui, [options]) ⇒ <code>RenderResult</code>
Render helper that mirrors the real app provider stack closely enough forbehavior-driven component tests.Why this exists:- Many components depend on router context.- Theme-aware components require ThemeProvider + RSuite CustomProvider.- Responsive logic depends on ResponsiveProvider being present.- Helmet-managed document metadata requires HelmetProvider.Tests should prefer this helper over raw `render()` whenever the componentunder test consumes application context.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ui | <code>React.ReactElement</code> |  | Component under test. |
| [options] | <code>object</code> |  |  |
| [options.initialEntries] | <code>Array.&lt;string&gt;</code> | <code>[&quot;/&quot;]</code> | Initial router entries. |
| [options.rsuiteTheme] | <code>&quot;light&quot;</code> \| <code>&quot;dark&quot;</code> | <code>&quot;dark&quot;</code> | RSuite theme. |

