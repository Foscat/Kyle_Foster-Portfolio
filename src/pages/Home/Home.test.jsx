/**
 * @file src\pages\Home\Home.test.jsx
 * @description src\pages\Home\Home.test module.
 * @module src\pages\Home\Home.test
 */

import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "pages/Home";
import homeSections from "assets/data/content/home";
import { PageRoute } from "types/navigation.types";
import { BlockType } from "types/ui.types";
import renderWithProviders from "tests/renderWithProviders";

const homeRouteContract = Object.freeze({ pageRoute: PageRoute.HOME });
const LAZY_NAVIGATION_TIMEOUT_MS = 10_000;

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

describe("Home dual-audience flow", () => {
  it("leads with Kyle's balanced role and distinct STE and hiring paths", async () => {
    renderWithProviders(<Home />);

    const main = screen.getByRole("main");
    expect(within(main).getByRole("heading", { level: 1, name: "Kyle Foster" })).toBeVisible();
    expect(within(main).getByText("Senior Frontend Engineer & Product Builder")).toBeVisible();
    expect(within(main).getByRole("link", { name: "Explore STE work" })).toHaveAttribute(
      "href",
      PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES
    );
    expect(within(main).getByRole("link", { name: "For hiring teams" })).toHaveAttribute(
      "href",
      "#professional-experience"
    );
    expect(within(main).getByRole("link", { name: "View NPM libraries" })).toHaveAttribute(
      "href",
      PageRoute.INTERFACE_SYSTEM
    );
  });

  it("makes STE the flagship while preserving CodeStream and Daimler as evidence", () => {
    renderWithProviders(<Home />);

    const selectedWork = screen.getByRole("region", { name: "Flagship work" });
    const projectRows = within(selectedWork).getAllByRole("article");

    expect(within(selectedWork).getByRole("heading", { name: "CodeStream Studios" })).toBeVisible();
    expect(within(selectedWork).getByRole("heading", { name: "Daimler Hackathon" })).toBeVisible();
    expect(
      within(selectedWork).getByRole("heading", { name: "Sanderson Technology Enterprises" })
    ).toBeVisible();
    expect(projectRows).toHaveLength(3);
    expect(
      within(projectRows[0]).getByRole("heading", { name: "Sanderson Technology Enterprises" })
    ).toBeVisible();
    expect(within(projectRows[0]).getByText("Flagship case study")).toBeVisible();
    expect(within(selectedWork).getAllByRole("img")).toHaveLength(3);
    expect(
      screen.queryByRole("navigation", { name: /section navigation/i })
    ).not.toBeInTheDocument();
  });

  it("features all four published interface-system packages", () => {
    renderWithProviders(<Home />);

    const ecosystem = screen.getByRole("region", { name: "Open-source interface system" });
    expect(within(ecosystem).getByText("layout-style-css")).toBeVisible();
    expect(within(ecosystem).getByText("ui-style-kit-css")).toBeVisible();
    expect(within(ecosystem).getByText("ui-style-kit-icons")).toBeVisible();
    expect(within(ecosystem).getByText("interactive-surface-css")).toBeVisible();
    expect(
      within(ecosystem).getByRole("link", { name: "Explore the Interface System" })
    ).toHaveAttribute("href", PageRoute.INTERFACE_SYSTEM);
  });

  it(
    "marks Home as the active primary-navigation destination",
    async () => {
      const user = userEvent.setup();
      renderWithProviders(<Home />);

      const websiteTrigger = await screen.findByRole(
        "button",
        { name: "Open website navigation" },
        { timeout: LAZY_NAVIGATION_TIMEOUT_MS }
      );
      await user.click(websiteTrigger);
      const primaryNavigation = await screen.findByRole(
        "navigation",
        { name: /primary navigation/i },
        { timeout: LAZY_NAVIGATION_TIMEOUT_MS }
      );
      expect(within(primaryNavigation).getByRole("link", { current: "page" })).toHaveAttribute(
        "href",
        homeRouteContract.pageRoute
      );
    },
    LAZY_NAVIGATION_TIMEOUT_MS + 5_000
  );
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
