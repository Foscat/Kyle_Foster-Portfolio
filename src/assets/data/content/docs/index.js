/**
 * @file src/assets/data/content/docs/index.js
 * @description Data-driven documentation page sections built from generated Markdown references.
 * @module assets/data/content/docs
 */
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { BlockType } from "types/ui.types";

const REFERENCE_PREFIXES = {
  components: "reference/client/components/",
  layout: "reference/client/layout/",
  navigation: "reference/client/navigation/",
  renderers: "reference/client/renderers/",
  ui: "reference/client/ui/",
  pages: "reference/client/pages/",
  hooks: "reference/client/hooks/",
  context: "reference/client/context/",
  data: "reference/client/data/",
  types: "reference/client/types/",
  tests: "reference/client/tests/",
  scripts: "reference/tooling/scripts/",
  playwright: "reference/tooling/playwright/",
};

const REFERENCE_TITLES = {
  components: "Feature Components",
  layout: "Layout Components",
  navigation: "Navigation Components",
  renderers: "Renderers",
  ui: "UI Components",
  pages: "Pages",
  hooks: "Hooks",
  context: "Context",
  data: "Data and Content",
  types: "Types",
  tests: "Test Helpers",
  scripts: "Scripts",
  playwright: "Playwright Fixtures",
};

function createReferenceNavItems(sectionKeys = []) {
  return sectionKeys.map((key) => ({
    id: `docs-reference-${key}`,
    title: REFERENCE_TITLES[key],
  }));
}

function createReferenceBlock({ key, title, intro }) {
  return {
    id: `docs-reference-${key}`,
    type: BlockType.MARKDOWN_DOCS,
    title,
    intro,
    docPathPrefixes: [REFERENCE_PREFIXES[key]],
    selectMode: "single",
    showToc: false,
    showDocJumpList: true,
  };
}

const docsSections = [
  {
    id: "docs-component-reference",
    title: "Component Reference",
    navLabel: "Components",
    sourceTag: "Generated Docs",
    navItems: createReferenceNavItems(["components", "layout", "ui"]),
    subtitle: "Feature, layout, and reusable UI component references generated from JSDoc.",
    icon: faBookOpenReader,
    isScroller: true,
    blocks: [
      createReferenceBlock({
        key: "components",
        title: "Feature Components",
        intro: "Generated module docs for feature-level React components.",
      }),
      createReferenceBlock({
        key: "layout",
        title: "Layout Components",
        intro: "Generated module docs for shared layout and section framing components.",
      }),
      createReferenceBlock({
        key: "ui",
        title: "UI Components",
        intro: "Generated module docs for reusable controls, cards, and UI primitives.",
      }),
    ],
  },
  {
    id: "docs-navigation-rendering",
    title: "Navigation and Rendering",
    navLabel: "Navigation",
    sourceTag: "Generated Docs",
    navItems: createReferenceNavItems(["navigation", "renderers"]),
    subtitle: "Route navigation, scroll-spy behavior, markdown rendering, and block renderers.",
    icon: faBookOpenReader,
    isScroller: true,
    blocks: [
      createReferenceBlock({
        key: "navigation",
        title: "Navigation Components",
        intro: "Generated module docs for page navigation, section navigation, and scroll helpers.",
      }),
      createReferenceBlock({
        key: "renderers",
        title: "Renderer Components",
        intro: "Generated module docs for data-driven content blocks and markdown rendering.",
      }),
    ],
  },
  {
    id: "docs-pages-data",
    title: "Pages and Data",
    navLabel: "Pages/Data",
    sourceTag: "Generated Docs",
    navItems: createReferenceNavItems(["pages", "data"]),
    subtitle: "Route-level pages and content registries that drive the portfolio experience.",
    icon: faBookOpenReader,
    isScroller: true,
    blocks: [
      createReferenceBlock({
        key: "pages",
        title: "Pages",
        intro: "Generated module docs for route-level page composition.",
      }),
      createReferenceBlock({
        key: "data",
        title: "Data and Content",
        intro: "Generated module docs for content registries, metadata, and page source data.",
      }),
    ],
  },
  {
    id: "docs-state-types",
    title: "State, Hooks, and Types",
    navLabel: "State/Types",
    sourceTag: "Generated Docs",
    navItems: createReferenceNavItems(["hooks", "context", "types"]),
    subtitle: "Shared hooks, context providers, and typed runtime contracts.",
    icon: faBookOpenReader,
    isScroller: true,
    blocks: [
      createReferenceBlock({
        key: "hooks",
        title: "Hooks",
        intro: "Generated module docs for shared React hooks.",
      }),
      createReferenceBlock({
        key: "context",
        title: "Context",
        intro: "Generated module docs for context providers and app-wide state surfaces.",
      }),
      createReferenceBlock({
        key: "types",
        title: "Types",
        intro: "Generated module docs for shared UI and navigation data contracts.",
      }),
    ],
  },
  {
    id: "docs-tooling-quality",
    title: "Tooling and Quality",
    navLabel: "Tooling",
    sourceTag: "Generated Docs",
    navItems: createReferenceNavItems(["tests", "scripts", "playwright"]),
    subtitle: "Generated docs for test helpers, automation scripts, and browser-test fixtures.",
    icon: faBookOpenReader,
    isScroller: true,
    blocks: [
      createReferenceBlock({
        key: "tests",
        title: "Test Helpers",
        intro: "Generated module docs for shared unit and integration test helpers.",
      }),
      createReferenceBlock({
        key: "scripts",
        title: "Scripts",
        intro: "Generated module docs for build, docs, diagrams, and quality scripts.",
      }),
      createReferenceBlock({
        key: "playwright",
        title: "Playwright Fixtures",
        intro: "Generated module docs for browser-test fixture support files.",
      }),
    ],
  },
  {
    id: "docs-dev-guides",
    title: "Developer Guides",
    navLabel: "Guides",
    sourceTag: "Developer Guides",
    navItems: [
      { id: "doc-diagram-guidelines", title: "Diagram Guidelines" },
      { id: "doc-richtext-author-guidelines", title: "RichText Author Guidelines" },
      { id: "doc-scripts-tooling-overview", title: "Scripts Tooling Overview" },
      { id: "doc-testing-guidelines", title: "Testing Guidelines" },
    ],
    subtitle: "Contributor-focused authoring and process guides from the dev-guides directory.",
    icon: faBookOpenReader,
    isScroller: true,
    blocks: [
      {
        id: "docs-dev-guides-content",
        type: BlockType.MARKDOWN_DOCS,
        title: "Developer Guide Docs",
        intro:
          "Hand-authored guides for testing discipline, diagram standards, rich text authoring, and scripts/tooling maintenance.",
        docSlugs: [
          "diagram-guidelines",
          "richtext-author-guidelines",
          "scripts-tooling-overview",
          "testing-guidelines",
        ],
        showToc: false,
        showDocJumpList: true,
      },
    ],
  },
];

Object.freeze(docsSections);

export default docsSections;
