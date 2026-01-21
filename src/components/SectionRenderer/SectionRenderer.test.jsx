/**
 * SectionRenderer.test.jsx
 * ------------------------------------------------------------------
 * Unit tests for the SectionRenderer component.
 *
 * Covers:
 * - Section registry registration / cleanup
 * - InfoSection prop wiring
 * - Block type dispatching
 * - Defensive fallback rendering
 *
 * Notes:
 * - All child renderers are mocked (delegation only)
 * - Registry hook is mocked to observe side effects
 */

import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import SectionRenderer from "./index";
import { BlockType } from "types/ui.types";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

// Mock Section Registry hook
const registerSection = vi.fn();
const unregisterSection = vi.fn();

vi.mock("navigation/SectionRegistryProvider", () => ({
  useSectionRegistry: () => ({
    registerSection,
    unregisterSection,
  }),
}));

// Mock InfoSection (layout only)
vi.mock("components/InfoSection", () => ({
  default: ({ children, id, title }) => (
    <section data-testid="info-section" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  ),
}));

// Mock block renderers
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

// Mock block factory helpers
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
   * Section registration
   * ------------------------------------------------------------ */

  it("registers the section on mount", () => {
    render(<SectionRenderer section={SECTION} />);

    expect(registerSection).toHaveBeenCalledWith("test-section", {
      id: "test-section",
      title: "Test Section",
    });
  });

  it("unregisters the section on unmount", () => {
    const { unmount } = render(<SectionRenderer section={SECTION} />);
    unmount();

    expect(unregisterSection).toHaveBeenCalledWith("test-section");
  });

  /* ------------------------------------------------------------
   * Layout delegation
   * ------------------------------------------------------------ */

  it("renders InfoSection with the correct id and title", () => {
    render(<SectionRenderer section={SECTION} />);

    const section = screen.getByTestId("info-section");
    expect(section).toHaveAttribute("id", "test-section");
    expect(screen.getByText("Test Section")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Block dispatching
   * ------------------------------------------------------------ */

  it("renders a RichTextBlock for RICH_TEXT blocks", () => {
    render(<SectionRenderer section={SECTION} />);
    expect(screen.getByTestId("rich-text-block")).toBeInTheDocument();
  });

  it("renders an ImageGalleryBlock for IMAGE_GALLERY blocks", () => {
    render(<SectionRenderer section={SECTION} />);
    expect(screen.getByTestId("image-gallery-block")).toBeInTheDocument();
  });

  it("renders a LinksBlock for LINKS blocks", () => {
    render(<SectionRenderer section={SECTION} />);
    expect(screen.getByTestId("links-block")).toBeInTheDocument();
  });

  it("renders an AccordionList for BULLETED_LIST blocks", () => {
    render(<SectionRenderer section={SECTION} />);
    expect(screen.getByTestId("accordion-block")).toBeInTheDocument();
  });

  it("renders a MermaidDiagram for DIAGRAM blocks", () => {
    render(<SectionRenderer section={SECTION} />);
    expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Defensive fallback
   * ------------------------------------------------------------ */

  it("renders a warning message for unknown block types", () => {
    render(<SectionRenderer section={SECTION} />);

    expect(screen.getByText(/Corrupt data is corrupted/i)).toBeInTheDocument();
  });
});
