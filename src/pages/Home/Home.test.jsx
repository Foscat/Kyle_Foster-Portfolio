import Home from "pages/Home";
import { homeSections } from "assets/data/homeSections";
import { PageRoute } from "types/ui.types";
import { createPageTests } from "tests/helpers/createPageTests";

/**
 * @file Home.test.jsx
 * @description Page-level tests for the Home page.
 *
 * Testing focus:
 * - Page renders without crashing
 * - Correct route association
 * - Correct section configuration
 * - Shared page behavior via `createPageTests`
 *
 * Testing strategy:
 * - Delegates all assertions to the shared `createPageTests` helper
 * - Ensures consistency across all page tests
 * - Avoids duplicating boilerplate page assertions
 *
 * Architectural intent:
 * Page test files act as **thin configuration layers**.
 * All behavioral guarantees are centralized in `createPageTests`,
 * allowing pages to be tested declaratively rather than imperatively.
 *
 * @module tests/pages/Home
 */

createPageTests({
  PageComponent: Home,
  sections: homeSections,
  pageRoute: PageRoute.HOME,
  pageName: "Home",
});
