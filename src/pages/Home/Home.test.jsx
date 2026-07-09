/**
 * @file src\pages\Home\Home.test.jsx
 * @description src\pages\Home\Home.test module.
 * @module src\pages\Home\Home.test
 */

import Home from "pages/Home";
import homeSections from "assets/data/content/home";
import { PageRoute } from "types/navigation.types";
import { BlockType } from "types/ui.types";
import { createPageTests } from "tests/helpers/createPageTests.jsx";

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
