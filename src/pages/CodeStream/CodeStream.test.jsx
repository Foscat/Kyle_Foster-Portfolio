import CodeStream from "pages/CodeStream";
import codeStreamSections from "assets/data/codestreamSections";
import { PageRoute } from "types/ui.types";
import { createPageTests } from "tests/helpers/createPageTests";

/**
 * @file CodeStream.test.jsx
 * @description Page-level tests for the CodeStream page.
 *
 * Testing focus:
 * - Page renders without crashing
 * - Correct route association with StickyNav
 * - Correct section configuration for SectionRenderer
 * - Shared page guarantees enforced via `createPageTests`
 *
 * Testing strategy:
 * - Delegates all assertions to the shared `createPageTests` helper
 * - Treats the page as declarative configuration
 * - Avoids duplicating boilerplate assertions
 *
 * Architectural intent:
 * The CodeStream page follows the standard page architecture:
 * - PageHeader
 * - SectionRenderer (one per section)
 * - StickyNav + StickySectionNav
 *
 * This test file exists solely to bind configuration
 * (sections + route) to the shared test contract.
 *
 * @module tests/pages/CodeStream
 */

createPageTests({
  PageComponent: CodeStream,
  sections: codeStreamSections,
  pageRoute: PageRoute.CODE_STREAM,
  pageName: "Code Stream",
});
