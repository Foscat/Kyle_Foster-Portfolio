import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { BlockType } from "types/ui.types";

const docsSections = [
  {
    id: "docs-architecture-systems",
    title: "Architecture and Systems",
    navLabel: "Architecture",
    sourceTag: "Generated Docs",
    navItems: [
      { id: "doc-components", title: "Components" },
      { id: "doc-navigation", title: "Navigation" },
      { id: "doc-types", title: "Types" },
    ],
    subtitle: "Core component, navigation, and type-system documentation.",
    icon: faBookOpenReader,
    isScroller: true,
    blocks: [
      {
        id: "docs-architecture-systems-content",
        type: BlockType.MARKDOWN_DOCS,
        title: "Architecture and Systems Docs",
        intro:
          "Reference docs for component architecture, page navigation, and shared data contracts.",
        docSlugs: ["components", "navigation", "types"],
        showToc: false,
        showDocJumpList: true,
      },
    ],
  },
  {
    id: "docs-tooling",
    title: "Tooling and Automation",
    navLabel: "Tooling",
    sourceTag: "Generated Docs",
    navItems: [
      { id: "doc-scripts", title: "Scripts" },
      { id: "doc-playwright", title: "Playwright" },
    ],
    subtitle: "Documentation for build scripts and browser testing tooling.",
    icon: faBookOpenReader,
    isScroller: true,
    blocks: [
      {
        id: "docs-tooling-content",
        type: BlockType.MARKDOWN_DOCS,
        title: "Tooling Docs",
        intro:
          "Operational references for scripts, diagram tooling, and Playwright automation.",
        docSlugs: ["scripts", "playwright"],
        showToc: false,
        showDocJumpList: true,
      },
    ],
  },
  {
    id: "docs-quality",
    title: "Testing and Quality",
    navLabel: "Quality",
    sourceTag: "Generated Docs",
    navItems: [{ id: "doc-tests", title: "Tests" }],
    subtitle: "Testing strategy and validation conventions.",
    icon: faBookOpenReader,
    isScroller: true,
    blocks: [
      {
        id: "docs-quality-content",
        type: BlockType.MARKDOWN_DOCS,
        title: "Quality Docs",
        intro:
          "Behavior-driven testing guidance and coverage expectations for ongoing maintenance.",
        docSlugs: ["tests"],
        showToc: false,
        showDocJumpList: false,
      },
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
    subtitle: "Contributor-focused authoring and workflow guides from the dev-guides directory.",
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
