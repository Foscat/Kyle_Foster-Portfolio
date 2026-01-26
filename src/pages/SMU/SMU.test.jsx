import SMU from "pages/SMU";
import smuSections from "assets/data/smuSections";
import { PageRoute } from "types/ui.types";
import { createPageTests } from "tests/helpers/createPageTests";

/**
 * @file SMU.test.jsx
 * @description Page-level tests for the SMU page.
 *
 * Testing focus:
 * - Page renders without crashing
 * - Correct route association with StickyNav
 * - Correct section configuration for SectionRenderer
 * - Shared page guarantees enforced via `createPageTests`
 *
 * Testing strategy:
 * - Delegates all assertions to the shared `createPageTests` helper
 * - Keeps page tests declarative and configuration-driven
 * - Avoids duplicating boilerplate assertions across pages
 *
 * Architectural intent:
 * The SMU page follows the same standardized page architecture as
 * the rest of the site:
 * - PageHeader
 * - SectionRenderer instances driven by section data
 * - StickyNav + StickySectionNav for navigation
 *
 * This test file exists solely to bind SMU-specific
 * configuration (sections + route) to the shared page test contract.
 *
 * @module tests/pages/SMU
 */

createPageTests({
  PageComponent: SMU,
  sections: smuSections,
  pageRoute: PageRoute.SMU,
  pageName: "SMU",
});
