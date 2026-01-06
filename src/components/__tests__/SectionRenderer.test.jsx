import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// Import your enums in the exact format your app uses.
import { BlockType } from "types/ui.types";

// If your project uses path aliases (e.g. "navigation/..."), keep this mock path aligned.
vi.mock("navigation/SectionRegistryProvider", () => {
  return {
    useSectionRegistry: () => ({
      registerSection: vi.fn(),
      unregisterSection: vi.fn(),
    }),
  };
});

// Mock child components so these tests focus on routing-by-block-type.
// This turns the test into a “block-type coverage” test rather than testing internals.
vi.mock("components/InfoSection", () => ({
  default: ({ title, children }) => (
    <section>
      <h2>{title}</h2>
      <div data-testid="info-children">{children}</div>
    </section>
  ),
}));

vi.mock("components/blocks/RichTextBlock", () => ({
  default: ({ paragraphs = [] }) => (
    <div data-testid="block-richText">{paragraphs.join(" ")}</div>
  ),
}));

vi.mock("components/blocks/ImageGalleryBlock", () => ({
  default: ({ images = [] }) => (
    <div data-testid="block-imageGallery">images:{images.length}</div>
  ),
}));

vi.mock("components/blocks/LinksBlock", () => ({
  default: ({ links = [] }) => (
    <div data-testid="block-links">links:{links.length}</div>
  ),
}));

vi.mock("components/AccordionList", () => ({
  default: ({ items = [] }) => (
    <div data-testid="block-bulletedList">items:{items.length}</div>
  ),
}));

vi.mock("components/MermaidDiagram", () => ({
  default: ({ mermaid }) => (
    <div data-testid="block-diagram">
      {mermaid?.slice(0, 20) || "no-diagram"}
    </div>
  ),
}));

describe("<SectionRenderer /> block-type coverage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const baseSection = {
    id: "test-section",
    title: "Test Section",
    subtitle: "",
    icon: "",
    blocks: [],
  };

  it("renders RichText blocks", () => {
    render(
      <SectionRenderer
        section={{
          ...baseSection,
          blocks: [
            {
              type: BlockType.RICH_TEXT,
              paragraphs: ["Hello", "world"],
              dividerAfter: false,
            },
          ],
        }}
      />
    );

    expect(screen.getByTestId("block-richText")).toHaveTextContent(
      "Hello world"
    );
  });

  it("renders ImageGallery blocks", () => {
    render(
      <SectionRenderer
        section={{
          ...baseSection,
          blocks: [
            {
              type: BlockType.IMAGE_GALLERY,
              images: [{ src: "x", alt: "a", title: "t" }],
            },
          ],
        }}
      />
    );

    expect(screen.getByTestId("block-imageGallery")).toHaveTextContent(
      "images:1"
    );
  });

  it("renders Links blocks", () => {
    render(
      <SectionRenderer
        section={{
          ...baseSection,
          blocks: [
            {
              type: BlockType.LINKS,
              links: [{ url: "https://example.com", title: "Example" }],
            },
          ],
        }}
      />
    );

    expect(screen.getByTestId("block-links")).toHaveTextContent("links:1");
  });

  it("renders BulletedList blocks", () => {
    render(
      <SectionRenderer
        section={{
          ...baseSection,
          blocks: [
            {
              type: BlockType.BULLETED_LIST,
              items: [{ text: "A", id: "a" }],
            },
          ],
        }}
      />
    );

    expect(screen.getByTestId("block-bulletedList")).toHaveTextContent(
      "items:1"
    );
  });

  it("renders Diagram blocks", () => {
    render(
      <SectionRenderer
        section={{
          ...baseSection,
          blocks: [
            {
              type: BlockType.DIAGRAM,
              title: "Diagram",
              mermaid: "flowchart LR; A-->B;",
            },
          ],
        }}
      />
    );

    expect(screen.getByTestId("block-diagram")).toHaveTextContent(
      "flowchart LR"
    );
  });

  it("fails safely on unknown/corrupted block types (renders fallback)", () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});

    render(
      <SectionRenderer
        section={{
          ...baseSection,
          blocks: [
            {
              type: "not-a-real-block-type",
              title: "Bad Block",
            },
          ],
        }}
      />
    );

    expect(screen.getByText(/data is corrupted/i)).toBeInTheDocument();
    expect(debugSpy).toHaveBeenCalled();

    debugSpy.mockRestore();
  });
});
