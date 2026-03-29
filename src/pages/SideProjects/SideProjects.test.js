import { PageRoute } from "types/navigation.types";
import { createPageTests } from "tests/helpers/createPageTests.jsx";
import SideProjects from "pages/SideProjects";
import sideProjectsSections from "assets/data/content/side-projects";
/**
 * @file SideProjects.test.js
 * @description Page-level tests for the SideProjects page.
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
 * - Avoids duplicating boilerplate test logic
 *
 * Architectural intent:
 * The SideProjects page adheres to the standard page composition model:
 * - PageHeader
 * - SectionRenderer instances (driven by section data)
 * - StickyNav + StickySectionNav
 *
 * This test file exists solely to bind SideProjects-specific
 * configuration to the shared page test contract.
 *
 * @module tests/pages/SideProjects
 */

createPageTests({
  PageComponent: SideProjects,
  sections: sideProjectsSections,
  pageRoute: PageRoute.SIDE_PROJECTS,
  pageName: "Side Projects",
});
