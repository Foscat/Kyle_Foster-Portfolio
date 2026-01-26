<a name="module_tests/helpers/createPageTests"></a>

## tests/helpers/createPageTests

Shared test factory for page-level components that follow
the SectionRenderer + StickySectionNav architecture.

<a name="module_tests/helpers/createPageTests.createPageTests"></a>

### tests/helpers/createPageTests.createPageTests(config) ⇒ <code>void</code>

createPageTests
---------------------------------------------------------------------------

Factory function that generates a standardized test suite for
data-driven pages.

Pages using this helper are expected to:

- Render a PageHeader
- Render one or more SectionRenderer instances
- Include StickyNav and StickySectionNav
- Restore scroll position on mount

This abstraction:

- Enforces consistent behavior across all pages
- Eliminates duplicated boilerplate in page test files
- Treats page tests as declarative configuration rather than imperative logic

**Kind**: static method of [<code>tests/helpers/createPageTests</code>](#module_tests/helpers/createPageTests)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | Page test configuration. |
| config.PageComponent | <code>React.ComponentType</code> | The page component under test. |
| config.sections | <code>Array</code> | Section configuration used to determine expected section count. |
| config.pageRoute | <code>string</code> | Route constant expected to be passed to StickyNav as `activePage`. |
| config.pageName | <code>string</code> | Human-readable page name used for test descriptions. |
