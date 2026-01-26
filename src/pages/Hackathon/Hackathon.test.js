import Hackathon from "pages/Hackathon";
import hackathonSections from "assets/data/hackathonSections";
import { PageRoute } from "types/ui.types";
import { createPageTests } from "tests/helpers/createPageTests";

/**
 * @file Hackathon.test.js
 * @description Page-level tests for the Hackathon page.
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
 * - Avoids duplicating boilerplate page assertions
 *
 * Architectural intent:
 * The Hackathon page follows the standard page composition pattern:
 * - PageHeader
 * - One or more SectionRenderer instances
 * - StickyNav + StickySectionNav
 *
 * This test file exists solely to bind the Hackathon page’s
 * section configuration and route to the shared test contract.
 *
 * @module tests/pages/Hackathon
 */

createPageTests({
  PageComponent: Hackathon,
  sections: hackathonSections,
  pageRoute: PageRoute.HACKATHON,
  pageName: "Hackathon",
});
