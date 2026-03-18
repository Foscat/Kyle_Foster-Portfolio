/**
 * @file SectionRenderer.test.jsx
 * @description Unit tests for the SectionRenderer component.
 *
 * Test coverage:
 * - Section registry registration on mount
 * - Section registry cleanup on unmount
 * - Delegation to InfoSection for layout
 * - Block-type dispatching to the correct child renderer
 * - Defensive fallback rendering for unknown block types
 *
 * Testing strategy:
 * - Mocks all child renderers to isolate dispatch logic
 * - Mocks SectionRegistry to observe registration side effects
 * - Avoids testing block rendering internals (covered elsewhere)
 *
 * Architectural intent:
 * SectionRenderer is treated as a **render orchestrator**, not a
 * content renderer. Tests focus on delegation, ordering, and
 * defensive behavior rather than DOM structure.
 *
 * @module tests/components/SectionRenderer
 */

import { screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import SectionRenderer from "components/SectionRenderer";
import { BlockType } from "types/ui.types";
import renderWithProviders from "tests/renderWithProviders";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

// Mock Section Registry hook to observe lifecycle registration behavior
const registerSection = vi.fn();
const unregisterSection = vi.fn();

vi.mock("navigation/SectionRegistryProvider", () => ({
  useSectionRegistry: () => ({
    registerSection,
    unregisterSection,
  }),
}));

// Mock InfoSection (layout-only)
vi.mock("components/InfoSection", () => ({
  default: ({ children, id, title }) => (
    <section data-testid="info-section" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  ),
}));

// Mock block renderers (dispatch targets only)
vi.mock("components/blocks", () => ({
  RichTextBlock: () => <div data-testid="rich-text-block" />,
  ImageGalleryBlock: () => <div data-testid="image-gallery-block" />,
  LinksBlock: () => <div data-testid="links-block" />,
}));

vi.mock("components/AccordionList", () => ({
  default: () => <div data-testid="accordion-block" />,
}));

vi.mock("components/MermaidDiagram", () => ({
  default: () => <div data-testid="diagram-block" />,
}));

// Mock block factory helpers to return passthrough data
vi.mock("types/ui.types", async () => {
  const actual = await vi.importActual("types/ui.types");
  return {
    ...actual,
    createRichTextBlock: vi.fn((b) => b),
    createImageGalleryBlock: vi.fn((b) => b),
    createLinkListBlock: vi.fn((b) => b),
    createBulletListBlock: vi.fn((b) => b),
    createDiagramBlock: vi.fn((b) => b),
  };
});

/* ------------------------------------------------------------------
 * Test data
 * ------------------------------------------------------------------ */

const SECTION = {
  id: "test-section",
  title: "Test Section",
  subtitle: "Optional subtitle",
  icon: null,
  blocks: [
    { type: BlockType.RICH_TEXT },
    { type: BlockType.IMAGE_GALLERY },
    { type: BlockType.LINKS },
    { type: BlockType.BULLETED_LIST },
    { type: BlockType.DIAGRAM },
    { type: "UNKNOWN_BLOCK", title: "Corrupt" },
  ],
};

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("SectionRenderer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  /* ------------------------------------------------------------
   * Section registration lifecycle
   * ------------------------------------------------------------ */

  it("registers the section on mount", () => {
    renderWithProviders(<SectionRenderer section={SECTION} />);

    expect(registerSection).toHaveBeenCalledWith("test-section", {
      id: "test-section",
      title: "Test Section",
    });
  });

  it("unregisters the section on unmount", () => {
    const { unmount } = renderWithProviders(<SectionRenderer section={SECTION} />);
    unmount();

    expect(unregisterSection).toHaveBeenCalledWith("test-section");
  });

  /* ------------------------------------------------------------
   * Layout delegation
   * ------------------------------------------------------------ */

  it("renders InfoSection with the correct id and title", () => {
    renderWithProviders(<SectionRenderer section={SECTION} />);

    const section = screen.getByTestId("info-section");
    expect(section).toHaveAttribute("id", "test-section");
    expect(screen.getByText("Test Section")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Block dispatching
   * ------------------------------------------------------------ */

  it("renders a RichTextBlock for RICH_TEXT blocks", () => {
    renderWithProviders(<SectionRenderer section={SECTION} />);
    expect(screen.getByTestId("rich-text-block")).toBeInTheDocument();
  });

  it("renders an ImageGalleryBlock for IMAGE_GALLERY blocks", () => {
    renderWithProviders(<SectionRenderer section={SECTION} />);
    expect(screen.getByTestId("image-gallery-block")).toBeInTheDocument();
  });

  it("renders a LinksBlock for LINKS blocks", () => {
    renderWithProviders(<SectionRenderer section={SECTION} />);
    expect(screen.getByTestId("links-block")).toBeInTheDocument();
  });

  it("renders an AccordionList for BULLETED_LIST blocks", () => {
    renderWithProviders(<SectionRenderer section={SECTION} />);
    expect(screen.getByTestId("accordion-block")).toBeInTheDocument();
  });

  it("renders a MermaidDiagram for DIAGRAM blocks", () => {
    renderWithProviders(<SectionRenderer section={SECTION} />);
    expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Defensive fallback behavior
   * ------------------------------------------------------------ */

  it("renders a warning message for unknown block types", () => {
    renderWithProviders(<SectionRenderer section={SECTION} />);
    expect(screen.getByText(/Corrupt data is corrupted/i)).toBeInTheDocument();
  });
});
