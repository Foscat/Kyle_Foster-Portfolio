/**
 * @file src\pages\Home\Home.test.jsx
 * @description src\pages\Home\Home.test module.
 * @module src\pages\Home\Home.test
 */

import { screen, within } from "@testing-library/react";
import Home from "pages/Home";
import homeSections from "assets/data/content/home";
import { PageRoute } from "types/navigation.types";
import { BlockType } from "types/ui.types";
import renderWithProviders from "tests/renderWithProviders";

const homeRouteContract = Object.freeze({ pageRoute: PageRoute.HOME });

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

describe("Home hiring flow", () => {
  it("leads with Kyle's role, selected work, and a direct contact path", async () => {
    renderWithProviders(<Home />);

    const main = screen.getByRole("main");
    expect(within(main).getByRole("heading", { level: 1, name: "Kyle Foster" })).toBeVisible();
    expect(within(main).getByText("Senior React / Frontend Engineer")).toBeVisible();
    expect(within(main).getByRole("link", { name: "View selected work" })).toHaveAttribute(
      "href",
      "#selected-work"
    );
    expect(within(main).getAllByRole("link", { name: "Contact Kyle" })[0]).toHaveAttribute(
      "href",
      PageRoute.CONTACT
    );
    expect(within(main).getByText("Since 2018")).toBeVisible();
  });

  it("keeps the homepage concise while exposing three evidence-backed case studies", () => {
    renderWithProviders(<Home />);

    const selectedWork = screen.getByRole("region", { name: "Selected work" });
    const projectRows = within(selectedWork).getAllByRole("article");

    expect(within(selectedWork).getByRole("heading", { name: "CodeStream Studios" })).toBeVisible();
    expect(within(selectedWork).getByRole("heading", { name: "Daimler Hackathon" })).toBeVisible();
    expect(
      within(selectedWork).getByRole("heading", { name: "Sanderson Technology Enterprises" })
    ).toBeVisible();
    expect(
      within(selectedWork).getByRole("img", { name: /CodeStream Online Studio home page/iu })
    ).toBeVisible();
    expect(projectRows).toHaveLength(3);
    expect(within(projectRows[0]).getByText("Featured case")).toBeVisible();
    expect(within(selectedWork).getAllByRole("img")).toHaveLength(3);
    expect(within(selectedWork).getAllByText("My role")).toHaveLength(3);
    expect(
      screen.queryByRole("navigation", { name: /section navigation/i })
    ).not.toBeInTheDocument();
  });

  it("marks Home as the active primary-navigation destination", async () => {
    renderWithProviders(<Home />);

    const primaryNavigation = await screen.findByRole("navigation", {
      name: /primary navigation/i,
    });
    expect(within(primaryNavigation).getByRole("link", { current: "page" })).toHaveAttribute(
      "href",
      homeRouteContract.pageRoute
    );
  });
});

const getProgramsOfNoteBlock = () =>
  homeSections
    .flatMap((section) => section.blocks ?? [])
    .find((block) => block?.id === "sp-programs-of-note" && block?.type === BlockType.CARD_GRID);

const getCodeStreamSection = () => homeSections.find((section) => section.id === "professional");

const flattenHomeContent = () => JSON.stringify(homeSections);

describe("Home CodeStream showcase", () => {
  it("labels the former professional section as CodeStream Studios", () => {
    const codeStreamSection = getCodeStreamSection();
    const linkTitles = (codeStreamSection?.blocks ?? [])
      .filter((block) => block?.type === BlockType.LINKS)
      .flatMap((block) => block.items ?? [])
      .map((item) => item.title);

    expect(codeStreamSection).toMatchObject({
      title: "CodeStream Studios",
      subtitle: "Senior React / Frontend Engineer at CodeStream Studios LLC (2019-2025)",
    });
    expect(linkTitles).toContain("View CodeStream Case Study");
    expect(flattenHomeContent()).not.toContain("Professional Work");
  });
});

describe("Home side-project highlights", () => {
  it("replaces the Enigma highlight with Layout Style CSS", () => {
    const programsOfNote = getProgramsOfNoteBlock();
    const items = programsOfNote?.items ?? [];
    const layoutStyleItem = items.find((item) => item.id === "sp-layout-style-css");

    expect(items.map((item) => item.id)).not.toContain("sp-enigma");
    expect(items.map((item) => item.title)).not.toContain("Caesar's Enigma");
    expect(layoutStyleItem).toMatchObject({
      title: "Layout Style CSS",
      url: `${PageRoute.SIDE_PROJECTS}/#layout-style-css`,
    });
    expect(JSON.stringify(layoutStyleItem)).toContain("layout layer");
    expect(JSON.stringify(layoutStyleItem)).toContain("ui-style-kit-css");
    expect(JSON.stringify(layoutStyleItem)).toContain("interactive-surface-css");
  });
});
