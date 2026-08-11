/**
 * @file src\pages\SideProjects\SideProjects.test.js
 * @description src\pages\SideProjects\SideProjects.test module.
 * @module src\pages\SideProjects\SideProjects.test
 */

import { PageRoute } from "types/navigation.types";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { createPageTests } from "tests/helpers/createPageTests.jsx";
import renderWithProviders from "tests/renderWithProviders";
import SideProjects from "pages/SideProjects";
import sideProjectsSections from "assets/data/content/side-projects";
/**
 * @file SideProjects.test.js
 * @description Page-level tests for the SideProjects page.
 *
 * Testing focus:
 * - Page renders without crashing
 * - Correct route association with UnifiedNavigation
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
 * - One UnifiedNavigation surface for primary and section controls
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

describe("Work archive", () => {
  it("keeps every legacy case study discoverable from the Work route", () => {
    renderWithProviders(createElement(SideProjects));

    const archive = screen.getByRole("navigation", { name: /explore the complete work archive/i });
    const expectedRoutes = [
      PageRoute.CODE_STREAM,
      PageRoute.HACKATHON,
      PageRoute.EDUCATION,
      PageRoute.DOCS,
    ];

    for (const route of expectedRoutes) {
      expect(
        within(archive)
          .getAllByRole("link")
          .some((link) => link.getAttribute("href") === route)
      ).toBe(true);
    }
  });
});
