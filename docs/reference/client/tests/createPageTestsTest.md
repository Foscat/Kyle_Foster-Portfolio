# createPageTestsTest

- Source: `src/tests/helpers/createPageTests.jsx`

# createPageTestsTest

## src\\tests\\helpers\\createPageTests

src\tests\helpers\createPageTests module.

### createPageTests()

Creates a test suite for a data-driven page component, focused on verifying composition and user-facing content rather than implementation details. The tests ensure that the page correctly integrates with shared components like scroll restoration, page header, section navigation, primary navigation, and footer, and that it renders the expected content based on the provided section data and active route. This allows us to confirm that the page is correctly composed and provides the expected user experience in terms of content rendering and navigation integration without coupling to the internal workings of those components. The createPageTests function can be used across different page test suites to ensure consistent testing of these common behaviors across all pages in the application. Test cases: - Restores scroll position on mount - Renders the page heading and section navigation entries - Passes the active page route into primary navigation behavior - Section titles are delegated into both content and section navigation - Renders the footer component The tests focus on verifying that the page correctly composes with shared components and renders user-facing content based on the provided data, ensuring that the expected behavior and content are present without relying on implementation details of the individual components. This allows us to confirm that the page is correctly structured and provides the expected user experience in terms of content rendering and navigation integration. /
