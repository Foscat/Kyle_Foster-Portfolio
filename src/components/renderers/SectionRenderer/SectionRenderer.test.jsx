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

import { screen, cleanup, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import SectionRenderer from "components/renderers/SectionRenderer";
import { BlockType, createRichTextBlock } from "types/ui.types";
import renderWithProviders from "tests/renderWithProviders";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

// Mock Section Registry hook to observe lifecycle registration behavior
const registerSection = vi.fn();
const unregisterSection = vi.fn();
let sectionRegistryValue;

vi.mock("assets/context/SectionRegistryProvider.jsx", () => ({
  useSectionRegistry: () => sectionRegistryValue,
}));

// Mock InfoSection (layout-only)
vi.mock("components/layout/InfoSection", () => ({
  default: ({ children, id, title }) => (
    <section data-testid="info-section" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  ),
}));

vi.mock("components/renderers/blocks/MarkdownDocs.Block", () => ({
  default: () => <div data-testid="markdown-docs-block" />,
}));

// Mock block renderers (dispatch targets only)
vi.mock("components/renderers/blocks", () => ({
  RichTextBlock: () => <div data-testid="rich-text-block" />,
  ImageGalleryBlock: () => <div data-testid="image-gallery-block" />,
  LinksBlock: () => <div data-testid="links-block" />,
  CardGridBlock: () => <div data-testid="card-grid-block" />,
  FormBlock: () => <div data-testid="form-block" />,
  HeroBlock: () => <div data-testid="hero-block" />,
}));

vi.mock("components/ui", async () => {
  const actual = await vi.importActual("components/ui");
  return {
    ...actual,
    AccordionList: () => <div data-testid="accordion-block" />,
    MermaidDiagram: () => <div data-testid="diagram-block" />,
  };
});

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

const SECTION_WITH_TWO_DIAGRAMS = {
  ...SECTION,
  blocks: [
    { type: BlockType.RICH_TEXT },
    { id: "d1", type: BlockType.DIAGRAM },
    { id: "d2", type: BlockType.DIAGRAM },
  ],
};

const SECTION_WITH_THREE_DIAGRAMS = {
  ...SECTION,
  blocks: [
    { type: BlockType.RICH_TEXT },
    { id: "d1", type: BlockType.DIAGRAM },
    { id: "d2", type: BlockType.DIAGRAM },
    { id: "d3", type: BlockType.DIAGRAM },
  ],
};

const SECTION_CARD_GRID = {
  ...SECTION,
  blocks: [{ type: BlockType.CARD_GRID }],
};

const SECTION_FORM = {
  ...SECTION,
  blocks: [{ type: BlockType.FORM }],
};

const SECTION_HERO = {
  ...SECTION,
  blocks: [{ type: BlockType.HERO }],
};

const SECTION_MARKDOWN_DOCS = {
  ...SECTION,
  blocks: [{ type: BlockType.MARKDOWN_DOCS }],
};

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("SectionRenderer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sectionRegistryValue = {
      registerSection,
      unregisterSection,
    };
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

  it("renders safely when section registry hook returns null", () => {
    sectionRegistryValue = null;

    expect(() => renderWithProviders(<SectionRenderer section={SECTION} />)).not.toThrow();
    expect(screen.getByTestId("info-section")).toBeInTheDocument();
  });

  it("renders safely when section registration throws", () => {
    registerSection.mockImplementationOnce(() => {
      throw new Error("register failed");
    });

    expect(() => renderWithProviders(<SectionRenderer section={SECTION} />)).not.toThrow();
    expect(screen.getByTestId("info-section")).toBeInTheDocument();
  });

  it("unregisters the section on unmount", () => {
    const { unmount } = renderWithProviders(<SectionRenderer section={SECTION} />);
    unmount();

    expect(unregisterSection).toHaveBeenCalledWith("test-section");
  });

  it("unmounts safely when section unregistration throws", () => {
    unregisterSection.mockImplementationOnce(() => {
      throw new Error("unregister failed");
    });

    const { unmount } = renderWithProviders(<SectionRenderer section={SECTION} />);

    expect(() => unmount()).not.toThrow();
    expect(unregisterSection).toHaveBeenCalledWith("test-section");
  });

  it("skips registration when section has no id", () => {
    renderWithProviders(<SectionRenderer section={{ ...SECTION, id: undefined }} />);
    expect(registerSection).not.toHaveBeenCalled();
  });

  it("skips registration safely when section id getter throws", () => {
    const brokenSection = {
      title: "Broken Section",
      blocks: [{ type: BlockType.RICH_TEXT }],
    };

    Object.defineProperty(brokenSection, "id", {
      get() {
        throw new Error("id getter failed");
      },
    });

    expect(() => renderWithProviders(<SectionRenderer section={brokenSection} />)).not.toThrow();
    expect(registerSection).not.toHaveBeenCalled();
    expect(screen.getByTestId("rich-text-block")).toBeInTheDocument();
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

  it("renders no blocks when section.blocks is not an array", () => {
    renderWithProviders(<SectionRenderer section={{ ...SECTION, blocks: null }} />);
    expect(screen.queryByTestId("rich-text-block")).not.toBeInTheDocument();
    expect(screen.queryByTestId("diagram-block")).not.toBeInTheDocument();
  });

  it("renders no blocks when section.blocks getter throws", () => {
    const brokenSection = {
      ...SECTION,
    };

    Object.defineProperty(brokenSection, "blocks", {
      get() {
        throw new Error("blocks getter failed");
      },
    });

    expect(() => renderWithProviders(<SectionRenderer section={brokenSection} />)).not.toThrow();
    expect(screen.queryByTestId("rich-text-block")).not.toBeInTheDocument();
    expect(screen.queryByTestId("diagram-block")).not.toBeInTheDocument();
  });

  it("skips malformed block entries when section blocks array index access throws", () => {
    const brokenBlocks = [{ type: BlockType.RICH_TEXT }, { type: BlockType.LINKS }];

    Object.defineProperty(brokenBlocks, 0, {
      get() {
        throw new Error("block index getter failed");
      },
      configurable: true,
    });

    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: brokenBlocks,
        }}
      />
    );

    expect(screen.getByTestId("links-block")).toBeInTheDocument();
    expect(screen.queryByTestId("rich-text-block")).not.toBeInTheDocument();
  });

  it("renders no blocks when section blocks array length is not coercible", () => {
    const proxiedBlocks = new Proxy([{ type: BlockType.RICH_TEXT }], {
      get(target, prop, receiver) {
        if (prop === "length") {
          return Symbol("bad-length");
        }

        return Reflect.get(target, prop, receiver);
      },
    });

    expect(() =>
      renderWithProviders(
        <SectionRenderer
          section={{
            ...SECTION,
            blocks: proxiedBlocks,
          }}
        />
      )
    ).not.toThrow();

    expect(screen.queryByTestId("rich-text-block")).not.toBeInTheDocument();
  });

  it("renders no blocks when section.blocks is a revoked proxy array", () => {
    const { proxy: revokedBlocks, revoke } = Proxy.revocable([{ type: BlockType.RICH_TEXT }], {});
    revoke();

    expect(() =>
      renderWithProviders(
        <SectionRenderer
          section={{
            ...SECTION,
            blocks: revokedBlocks,
          }}
        />
      )
    ).not.toThrow();

    expect(screen.queryByTestId("rich-text-block")).not.toBeInTheDocument();
  });

  it("caps oversized block array lengths and still renders readable entries", () => {
    const proxiedBlocks = new Proxy([{ type: BlockType.LINKS }], {
      get(target, prop, receiver) {
        if (prop === "length") {
          return Number.MAX_SAFE_INTEGER;
        }

        if (typeof prop === "string" && /^\d+$/.test(prop) && prop !== "0") {
          throw new Error("hostile index access");
        }

        return Reflect.get(target, prop, receiver);
      },
    });

    expect(() =>
      renderWithProviders(
        <SectionRenderer
          section={{
            ...SECTION,
            blocks: proxiedBlocks,
          }}
        />
      )
    ).not.toThrow();

    expect(screen.getByTestId("links-block")).toBeInTheDocument();
  });

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

  it("renders a CardGridBlock for CARD_GRID blocks", () => {
    renderWithProviders(<SectionRenderer section={SECTION_CARD_GRID} />);
    expect(screen.getByTestId("card-grid-block")).toBeInTheDocument();
  });

  it("renders a FormBlock for FORM blocks", () => {
    renderWithProviders(<SectionRenderer section={SECTION_FORM} />);
    expect(screen.getByTestId("form-block")).toBeInTheDocument();
  });

  it("renders a HeroBlock for HERO blocks", () => {
    renderWithProviders(<SectionRenderer section={SECTION_HERO} />);
    expect(screen.getByTestId("hero-block")).toBeInTheDocument();
  });

  it("renders a MarkdownDocsBlock for MARKDOWN_DOCS blocks", () => {
    renderWithProviders(<SectionRenderer section={SECTION_MARKDOWN_DOCS} />);
    expect(screen.getByTestId("markdown-docs-block")).toBeInTheDocument();
  });

  it("silently skips null or undefined entries in the blocks array", () => {
    const sectionWithNullBlocks = {
      ...SECTION,
      blocks: [null, { type: BlockType.RICH_TEXT }, undefined, { type: BlockType.LINKS }],
    };

    renderWithProviders(<SectionRenderer section={sectionWithNullBlocks} />);

    expect(screen.getByTestId("rich-text-block")).toBeInTheDocument();
    expect(screen.getByTestId("links-block")).toBeInTheDocument();
  });

  it("renders a deferred placeholder for DIAGRAM blocks when deferDiagrams is true", () => {
    renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

    expect(screen.getByRole("status", { name: /loading diagram/i })).toBeInTheDocument();
    expect(screen.queryByTestId("diagram-block")).not.toBeInTheDocument();
  });

  it("marks the deferred placeholder as busy while the diagram is loading", () => {
    renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

    expect(screen.getByRole("status", { name: /loading diagram/i })).toHaveAttribute(
      "aria-busy",
      "true"
    );
  });

  it("announces deferred placeholder updates atomically", () => {
    renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

    expect(screen.getByRole("status", { name: /loading diagram/i })).toHaveAttribute(
      "aria-atomic",
      "true"
    );
  });

  it("renders visible loading copy for deferred diagrams", () => {
    renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

    expect(screen.getByText(/Loading diagram preview/i)).toBeInTheDocument();
  });

  it("uses custom deferred loading label and caption when provided", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{
          enabled: true,
          loadingLabel: "Diagram pending",
          loadingCaption: "Preparing chart",
        }}
      />
    );

    expect(screen.getByRole("status", { name: /diagram pending/i })).toBeInTheDocument();
    expect(screen.getByText(/Preparing chart/i)).toBeInTheDocument();
  });

  it("falls back to default deferred loading copy when custom values are blank", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{ enabled: true, loadingLabel: "   ", loadingCaption: "   " }}
      />
    );

    expect(screen.getByRole("status", { name: /loading diagram/i })).toBeInTheDocument();
    expect(screen.getByText(/Loading diagram preview/i)).toBeInTheDocument();
  });

  it("falls back to default deferred loading label when defer config getter throws", () => {
    const brokenDeferConfig = { enabled: true };

    Object.defineProperty(brokenDeferConfig, "loadingLabel", {
      get() {
        throw new Error("loadingLabel getter failed");
      },
    });

    expect(() =>
      renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams={brokenDeferConfig} />)
    ).not.toThrow();

    expect(screen.getByRole("status", { name: /loading diagram/i })).toBeInTheDocument();
  });

  it("uses custom deferred loading aria-live mode when provided", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{ enabled: true, loadingLive: "assertive" }}
      />
    );

    expect(screen.getByRole("status", { name: /loading diagram/i })).toHaveAttribute(
      "aria-live",
      "assertive"
    );
  });

  it("falls back to polite aria-live when deferred loading mode is invalid", () => {
    renderWithProviders(
      <SectionRenderer section={SECTION} deferDiagrams={{ enabled: true, loadingLive: "loud" }} />
    );

    expect(screen.getByRole("status", { name: /loading diagram/i })).toHaveAttribute(
      "aria-live",
      "polite"
    );
  });

  it("falls back to polite aria-live when deferred loading mode is non-string", () => {
    expect(() =>
      renderWithProviders(
        <SectionRenderer
          section={SECTION}
          deferDiagrams={{ enabled: true, loadingLive: { mode: "assertive" } }}
        />
      )
    ).not.toThrow();

    expect(screen.getByRole("status", { name: /loading diagram/i })).toHaveAttribute(
      "aria-live",
      "polite"
    );
  });

  it("uses deferred loading aria-live off mode when provided", () => {
    renderWithProviders(
      <SectionRenderer section={SECTION} deferDiagrams={{ enabled: true, loadingLive: "off" }} />
    );

    expect(screen.queryByRole("status", { name: /loading diagram/i })).not.toBeInTheDocument();
    expect(
      screen.getByText(/Loading diagram preview/i, {
        selector: ".mermaid-deferred-placeholder[aria-live='off'] .mermaid-deferred-status-text",
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Loading diagram preview/i, {
        selector:
          ".mermaid-deferred-placeholder[aria-live='off'][aria-atomic] .mermaid-deferred-status-text",
      })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Loading diagram preview/i, {
        selector:
          ".mermaid-deferred-placeholder[aria-live='off'][aria-describedby] .mermaid-deferred-status-text",
      })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Loading diagram preview/i, {
        selector:
          ".mermaid-deferred-placeholder[aria-live='off'][aria-label] .mermaid-deferred-status-text",
      })
    ).not.toBeInTheDocument();
  });

  it("hides decorative deferred skeleton header from assistive technology", () => {
    renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

    expect(screen.getByRole("status", { name: /loading diagram/i })).toContainHTML(
      '<div class="mermaid-deferred-header-skeleton" aria-hidden="true"></div>'
    );
  });

  it("describes the deferred status region with the visible loading copy", () => {
    renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

    expect(screen.getByRole("status", { name: /loading diagram/i })).toHaveAttribute(
      "aria-describedby"
    );
  });

  it("uses unique described-by ids when multiple diagrams are deferred", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION_WITH_TWO_DIAGRAMS}
        deferDiagrams={{ enabled: true, startAt: 0, maxDeferred: 2 }}
      />
    );

    const statuses = screen.getAllByRole("status", { name: /loading diagram/i });
    expect(statuses).toHaveLength(2);

    const describedByIds = statuses.map((status) => status.getAttribute("aria-describedby"));
    expect(describedByIds.every(Boolean)).toBe(true);
    expect(new Set(describedByIds).size).toBe(2);

    const describedByTargets = screen.getAllByText(/Loading diagram preview/i, {
      selector: ".mermaid-deferred-status-text",
    });
    const describedByTargetIds = describedByTargets.map((target) => target.getAttribute("id"));

    expect(describedByTargetIds.every(Boolean)).toBe(true);
    expect(new Set(describedByTargetIds).size).toBe(2);
    expect(new Set(describedByIds)).toEqual(new Set(describedByTargetIds));
  });

  it("uses default placeholder min-height for deferred diagrams", () => {
    renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

    expect(screen.getByRole("status", { name: /loading diagram/i })).toHaveStyle({
      minHeight: "220px",
    });
  });

  it("uses custom placeholder min-height when provided", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{ enabled: true, placeholderMinHeight: "300px" }}
      />
    );

    expect(screen.getByRole("status", { name: /loading diagram/i })).toHaveStyle({
      minHeight: "300px",
    });
  });

  it("trims custom placeholder min-height string values", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{ enabled: true, placeholderMinHeight: "  300px  " }}
      />
    );

    expect(screen.getByRole("status", { name: /loading diagram/i })).toHaveStyle({
      minHeight: "300px",
    });
  });

  it("converts numeric placeholder min-height to px", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{ enabled: true, placeholderMinHeight: 280 }}
      />
    );

    expect(screen.getByRole("status", { name: /loading diagram/i })).toHaveStyle({
      minHeight: "280px",
    });
  });

  it("falls back to default placeholder min-height when config is blank", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{ enabled: true, placeholderMinHeight: "   " }}
      />
    );

    expect(screen.getByRole("status", { name: /loading diagram/i })).toHaveStyle({
      minHeight: "220px",
    });
  });

  it("falls back to default placeholder min-height when numeric config is invalid", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{ enabled: true, placeholderMinHeight: 0 }}
      />
    );

    expect(screen.getByRole("status", { name: /loading diagram/i })).toHaveStyle({
      minHeight: "220px",
    });
  });

  it("mounts deferred MermaidDiagram eagerly when IntersectionObserver is unavailable", async () => {
    const OriginalObserver = globalThis.IntersectionObserver;
    delete globalThis.IntersectionObserver;

    try {
      renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

      await waitFor(() => {
        expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
      });
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("mounts deferred MermaidDiagram after intersection", async () => {
    const OriginalObserver = globalThis.IntersectionObserver;

    class TriggeringObserver {
      constructor(callback) {
        this.callback = callback;
      }

      observe = (element) => {
        this.callback([{ isIntersecting: true, target: element }]);
      };

      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = TriggeringObserver;

    try {
      renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

      await waitFor(() => {
        expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
      });
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("mounts deferred MermaidDiagram when intersectionRatio is positive", async () => {
    const OriginalObserver = globalThis.IntersectionObserver;

    class RatioTriggeringObserver {
      constructor(callback) {
        this.callback = callback;
      }

      observe = (element) => {
        this.callback([{ isIntersecting: false, intersectionRatio: 0.2, target: element }]);
      };

      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = RatioTriggeringObserver;

    try {
      renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

      await waitFor(() => {
        expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
      });
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("keeps deferred placeholder when observer fires with non-intersecting entries", () => {
    const OriginalObserver = globalThis.IntersectionObserver;

    class NonIntersectingObserver {
      constructor(callback) {
        this.callback = callback;
      }

      observe = (element) => {
        this.callback([{ isIntersecting: false, intersectionRatio: 0, target: element }]);
      };

      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = NonIntersectingObserver;

    try {
      renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

      expect(screen.getByRole("status", { name: /loading diagram/i })).toBeInTheDocument();
      expect(screen.queryByTestId("diagram-block")).not.toBeInTheDocument();
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("mounts deferred MermaidDiagram when observer callback fires during construction", async () => {
    const OriginalObserver = globalThis.IntersectionObserver;

    class ConstructorTriggeringObserver {
      constructor(callback) {
        callback([{ isIntersecting: true, intersectionRatio: 1, target: document.body }]);
      }

      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = ConstructorTriggeringObserver;

    try {
      renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

      await waitFor(() => {
        expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
      });
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("mounts deferred MermaidDiagram eagerly when observer construction fails", async () => {
    const OriginalObserver = globalThis.IntersectionObserver;

    class ThrowingObserver {
      constructor() {
        throw new Error("observer unsupported config");
      }
    }

    globalThis.IntersectionObserver = ThrowingObserver;

    try {
      renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

      await waitFor(() => {
        expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
      });
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("mounts deferred MermaidDiagram eagerly when observer.observe() throws", async () => {
    const OriginalObserver = globalThis.IntersectionObserver;

    class ThrowingObserveObserver {
      constructor() {}

      observe = () => {
        throw new Error("observe failed");
      };

      unobserve = () => {};
      disconnect = vi.fn();
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = ThrowingObserveObserver;

    try {
      renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

      await waitFor(() => {
        expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
      });
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("disconnects the observer when the component unmounts before intersection fires", () => {
    const OriginalObserver = globalThis.IntersectionObserver;
    const disconnectSpy = vi.fn();

    class SpyObserver {
      constructor() {
        this.disconnect = disconnectSpy;
      }

      observe = () => {};
      unobserve = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = SpyObserver;

    try {
      const { unmount } = renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams />);

      expect(disconnectSpy).not.toHaveBeenCalled();
      unmount();
      expect(disconnectSpy).toHaveBeenCalledTimes(1);
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("mounts deferred MermaidDiagram after fallback delay when configured", () => {
    const OriginalObserver = globalThis.IntersectionObserver;

    class IdleObserver {
      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = IdleObserver;
    vi.useFakeTimers();

    try {
      renderWithProviders(
        <SectionRenderer section={SECTION} deferDiagrams={{ enabled: true, fallbackDelayMs: 50 }} />
      );

      expect(screen.queryByTestId("diagram-block")).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(50);
      });

      expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("mounts deferred MermaidDiagram immediately when fallback delay is 0", async () => {
    const OriginalObserver = globalThis.IntersectionObserver;

    class IdleObserver {
      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = IdleObserver;

    try {
      renderWithProviders(
        <SectionRenderer section={SECTION} deferDiagrams={{ enabled: true, fallbackDelayMs: 0 }} />
      );

      await waitFor(() => {
        expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
      });
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("ignores invalid fallback delay and keeps deferred placeholder", () => {
    const OriginalObserver = globalThis.IntersectionObserver;

    class IdleObserver {
      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = IdleObserver;

    try {
      renderWithProviders(
        <SectionRenderer section={SECTION} deferDiagrams={{ enabled: true, fallbackDelayMs: -1 }} />
      );

      expect(screen.getByRole("status", { name: /loading diagram/i })).toBeInTheDocument();
      expect(screen.queryByTestId("diagram-block")).not.toBeInTheDocument();
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("clamps overly large fallback delay to the safety max", () => {
    const OriginalObserver = globalThis.IntersectionObserver;

    class IdleObserver {
      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = IdleObserver;
    vi.useFakeTimers();

    try {
      renderWithProviders(
        <SectionRenderer
          section={SECTION}
          deferDiagrams={{ enabled: true, fallbackDelayMs: 99999999 }}
        />
      );

      expect(screen.queryByTestId("diagram-block")).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(15000);
      });

      expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("clears the fallback timer on unmount to prevent stale state updates", () => {
    const OriginalObserver = globalThis.IntersectionObserver;

    class IdleObserver {
      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = IdleObserver;
    vi.useFakeTimers();

    // Spy must be set up after useFakeTimers so it wraps the fake implementation.
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");

    try {
      const { unmount } = renderWithProviders(
        <SectionRenderer section={SECTION} deferDiagrams={{ enabled: true, fallbackDelayMs: 50 }} />
      );

      expect(screen.queryByTestId("diagram-block")).not.toBeInTheDocument();

      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
      clearTimeoutSpy.mockRestore();
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("uses custom defer rootMargin when provided", () => {
    const OriginalObserver = globalThis.IntersectionObserver;
    const observerOptions = [];

    class CapturingObserver {
      constructor(_callback, options) {
        observerOptions.push(options);
      }

      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = CapturingObserver;

    try {
      renderWithProviders(
        <SectionRenderer
          section={SECTION}
          deferDiagrams={{ rootMargin: "640px 0px", threshold: 0.25 }}
        />
      );

      expect(observerOptions[0]?.rootMargin).toBe("640px 0px");
      expect(observerOptions[0]?.threshold).toBe(0.25);
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("trims custom defer rootMargin values", () => {
    const OriginalObserver = globalThis.IntersectionObserver;
    const observerOptions = [];

    class CapturingObserver {
      constructor(_callback, options) {
        observerOptions.push(options);
      }

      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = CapturingObserver;

    try {
      renderWithProviders(
        <SectionRenderer
          section={SECTION}
          deferDiagrams={{ rootMargin: "  640px 0px  ", threshold: 0.25 }}
        />
      );

      expect(observerOptions[0]?.rootMargin).toBe("640px 0px");
      expect(observerOptions[0]?.threshold).toBe(0.25);
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("uses custom threshold array when provided", () => {
    const OriginalObserver = globalThis.IntersectionObserver;
    const observerOptions = [];

    class CapturingObserver {
      constructor(_callback, options) {
        observerOptions.push(options);
      }

      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = CapturingObserver;

    try {
      renderWithProviders(
        <SectionRenderer
          section={SECTION}
          deferDiagrams={{ rootMargin: "640px 0px", threshold: [0, 0.5, 1] }}
        />
      );

      expect(observerOptions[0]?.rootMargin).toBe("640px 0px");
      expect(observerOptions[0]?.threshold).toEqual([0, 0.5, 1]);
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("normalizes threshold array by sorting and deduplicating values", () => {
    const OriginalObserver = globalThis.IntersectionObserver;
    const observerOptions = [];

    class CapturingObserver {
      constructor(_callback, options) {
        observerOptions.push(options);
      }

      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = CapturingObserver;

    try {
      renderWithProviders(
        <SectionRenderer
          section={SECTION}
          deferDiagrams={{ rootMargin: "640px 0px", threshold: [1, 0.5, 0, 0.5] }}
        />
      );

      expect(observerOptions[0]?.rootMargin).toBe("640px 0px");
      expect(observerOptions[0]?.threshold).toEqual([0, 0.5, 1]);
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("falls back to default rootMargin when defer config rootMargin is blank", () => {
    const OriginalObserver = globalThis.IntersectionObserver;
    const observerOptions = [];

    class CapturingObserver {
      constructor(_callback, options) {
        observerOptions.push(options);
      }

      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = CapturingObserver;

    try {
      renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams={{ rootMargin: "" }} />);

      expect(observerOptions[0]?.rootMargin).toBe("320px 0px");
      expect(observerOptions[0]?.threshold).toBe(0.01);
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("falls back to default threshold when defer config threshold is invalid", () => {
    const OriginalObserver = globalThis.IntersectionObserver;
    const observerOptions = [];

    class CapturingObserver {
      constructor(_callback, options) {
        observerOptions.push(options);
      }

      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = CapturingObserver;

    try {
      renderWithProviders(
        <SectionRenderer
          section={SECTION}
          deferDiagrams={{ threshold: 1.5, rootMargin: "500px 0px" }}
        />
      );

      expect(observerOptions[0]?.rootMargin).toBe("500px 0px");
      expect(observerOptions[0]?.threshold).toBe(0.01);
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("falls back to default threshold when defer config threshold array is invalid", () => {
    const OriginalObserver = globalThis.IntersectionObserver;
    const observerOptions = [];

    class CapturingObserver {
      constructor(_callback, options) {
        observerOptions.push(options);
      }

      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }

    globalThis.IntersectionObserver = CapturingObserver;

    try {
      renderWithProviders(
        <SectionRenderer
          section={SECTION}
          deferDiagrams={{ threshold: [0, 1.2], rootMargin: "500px 0px" }}
        />
      );

      expect(observerOptions[0]?.rootMargin).toBe("500px 0px");
      expect(observerOptions[0]?.threshold).toBe(0.01);
    } finally {
      globalThis.IntersectionObserver = OriginalObserver;
    }
  });

  it("does not defer diagrams for unsupported deferDiagrams values", () => {
    renderWithProviders(<SectionRenderer section={SECTION} deferDiagrams={"true"} />);

    expect(screen.queryByRole("status", { name: /loading diagram/i })).not.toBeInTheDocument();
    expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
  });

  it("does not defer diagrams when defer config explicitly sets enabled to false", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{ enabled: false, rootMargin: "640px 0px", threshold: 0.5 }}
      />
    );

    expect(screen.queryByRole("status", { name: /loading diagram/i })).not.toBeInTheDocument();
    expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
  });

  it("defers diagrams when defer config explicitly sets enabled to true", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{ enabled: true, rootMargin: "640px 0px", threshold: 0.5 }}
      />
    );

    expect(screen.getByRole("status", { name: /loading diagram/i })).toBeInTheDocument();
    expect(screen.queryByTestId("diagram-block")).not.toBeInTheDocument();
  });

  it("does not defer diagrams when defer filter returns false", () => {
    renderWithProviders(
      <SectionRenderer section={SECTION} deferDiagrams={{ enabled: true, filter: () => false }} />
    );

    expect(screen.queryByRole("status", { name: /loading diagram/i })).not.toBeInTheDocument();
    expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
  });

  it("defers diagrams when defer filter returns true", () => {
    renderWithProviders(
      <SectionRenderer section={SECTION} deferDiagrams={{ enabled: true, filter: () => true }} />
    );

    expect(screen.getByRole("status", { name: /loading diagram/i })).toBeInTheDocument();
    expect(screen.queryByTestId("diagram-block")).not.toBeInTheDocument();
  });

  it("falls back to deferred behavior when defer filter throws", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{
          enabled: true,
          filter: () => {
            throw new Error("test failure");
          },
        }}
      />
    );

    expect(screen.getByRole("status", { name: /loading diagram/i })).toBeInTheDocument();
    expect(screen.queryByTestId("diagram-block")).not.toBeInTheDocument();
  });

  it("passes block and context to defer filter", () => {
    const filter = vi.fn(() => true);

    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{
          enabled: true,
          filter,
        }}
      />
    );

    expect(filter).toHaveBeenCalledTimes(1);
    expect(filter).toHaveBeenCalledWith(
      expect.objectContaining({ type: BlockType.DIAGRAM }),
      expect.objectContaining({
        block: expect.objectContaining({ type: BlockType.DIAGRAM }),
        section: expect.objectContaining({ id: "test-section" }),
        index: 4,
        diagramIndex: 0,
        totalDiagramCount: 1,
        deferSlotIndex: 0,
        deferConfig: expect.objectContaining({
          enabled: true,
          rootMargin: "320px 0px",
          threshold: 0.01,
          placeholderMinHeight: "220px",
          loadingLabel: "Loading diagram",
          loadingCaption: "Loading diagram preview...",
          loadingLive: "polite",
          fallbackDelayMs: null,
          startAt: 0,
          maxDeferred: null,
        }),
      })
    );
  });

  it("passes normalized loading config to defer filter context", () => {
    const filter = vi.fn(() => true);

    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{
          enabled: true,
          loadingLabel: "  Diagram pending  ",
          loadingCaption: "  Preparing chart  ",
          loadingLive: "  ASSERTIVE  ",
          filter,
        }}
      />
    );

    expect(filter).toHaveBeenCalledWith(
      expect.objectContaining({ type: BlockType.DIAGRAM }),
      expect.objectContaining({
        deferConfig: expect.objectContaining({
          loadingLabel: "Diagram pending",
          loadingCaption: "Preparing chart",
          loadingLive: "assertive",
        }),
      })
    );
  });

  it("normalizes loadingLive to off in defer filter context", () => {
    const filter = vi.fn(() => true);

    renderWithProviders(
      <SectionRenderer
        section={SECTION}
        deferDiagrams={{
          enabled: true,
          loadingLive: "  OFF  ",
          filter,
        }}
      />
    );

    expect(filter).toHaveBeenCalledWith(
      expect.objectContaining({ type: BlockType.DIAGRAM }),
      expect.objectContaining({
        deferConfig: expect.objectContaining({
          loadingLive: "off",
        }),
      })
    );
  });

  it("passes startAt-adjusted deferSlotIndex to defer filter", () => {
    const filter = vi.fn(() => true);

    renderWithProviders(
      <SectionRenderer
        section={SECTION_WITH_TWO_DIAGRAMS}
        deferDiagrams={{ enabled: true, startAt: 1, filter }}
      />
    );

    expect(filter).toHaveBeenCalledTimes(1);
    expect(filter).toHaveBeenCalledWith(
      expect.objectContaining({ id: "d2", type: BlockType.DIAGRAM }),
      expect.objectContaining({
        diagramIndex: 1,
        totalDiagramCount: 2,
        deferSlotIndex: 0,
        deferConfig: expect.objectContaining({
          startAt: 1,
        }),
      })
    );
  });

  it("respects maxDeferred when multiple diagrams are present", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION_WITH_TWO_DIAGRAMS}
        deferDiagrams={{ enabled: true, maxDeferred: 1 }}
      />
    );

    expect(screen.getAllByRole("status", { name: /loading diagram/i })).toHaveLength(1);
    expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
  });

  it("does not defer any diagrams when maxDeferred is 0", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION_WITH_TWO_DIAGRAMS}
        deferDiagrams={{ enabled: true, maxDeferred: 0 }}
      />
    );

    expect(screen.queryByRole("status", { name: /loading diagram/i })).not.toBeInTheDocument();
    expect(screen.getAllByTestId("diagram-block")).toHaveLength(2);
  });

  it("respects startAt by keeping initial diagrams eager", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION_WITH_TWO_DIAGRAMS}
        deferDiagrams={{ enabled: true, startAt: 1 }}
      />
    );

    expect(screen.getAllByRole("status", { name: /loading diagram/i })).toHaveLength(1);
    expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
  });

  it("falls back to immediate deferral when startAt is invalid", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION_WITH_TWO_DIAGRAMS}
        deferDiagrams={{ enabled: true, startAt: -1 }}
      />
    );

    expect(screen.getAllByRole("status", { name: /loading diagram/i })).toHaveLength(2);
    expect(screen.queryByTestId("diagram-block")).not.toBeInTheDocument();
  });

  it("applies maxDeferred after startAt offset", () => {
    renderWithProviders(
      <SectionRenderer
        section={SECTION_WITH_THREE_DIAGRAMS}
        deferDiagrams={{ enabled: true, startAt: 1, maxDeferred: 2 }}
      />
    );

    expect(screen.getAllByRole("status", { name: /loading diagram/i })).toHaveLength(2);
    expect(screen.getByTestId("diagram-block")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Defensive fallback behavior
   * ------------------------------------------------------------ */

  it("renders a warning message for unknown block types", () => {
    renderWithProviders(<SectionRenderer section={SECTION} />);
    expect(screen.getByText(/Corrupt data is corrupted/i)).toBeInTheDocument();
  });

  it("announces unknown block warnings as alerts", () => {
    renderWithProviders(<SectionRenderer section={SECTION} />);

    expect(screen.getByRole("alert")).toHaveTextContent(/Corrupt data is corrupted/i);
  });

  it("renders the unknown block type when title is missing", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [{ type: "BROKEN_BLOCK" }],
        }}
      />
    );

    expect(screen.getByText(/BROKEN_BLOCK data is corrupted/i)).toBeInTheDocument();
  });

  it("renders the unknown block type when title is blank", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [{ type: "BROKEN_BLOCK", title: "   " }],
        }}
      />
    );

    expect(screen.getByText(/BROKEN_BLOCK data is corrupted/i)).toBeInTheDocument();
  });

  it("falls back to a generic label when unknown block type is blank", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [{ type: "   ", title: "   " }],
        }}
      />
    );

    expect(screen.getByText(/Unknown block data is corrupted/i)).toBeInTheDocument();
  });

  it("falls back to a generic label when unknown block title and type are missing", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [{ type: null }],
        }}
      />
    );

    expect(screen.getByText(/Unknown block data is corrupted/i)).toBeInTheDocument();
  });

  it("renders numeric unknown block title when provided", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [{ type: null, title: 404 }],
        }}
      />
    );

    expect(screen.getByText(/404 data is corrupted/i)).toBeInTheDocument();
  });

  it("renders boolean unknown block type when title is missing", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [{ type: false }],
        }}
      />
    );

    expect(screen.getByText(/false data is corrupted/i)).toBeInTheDocument();
  });

  it("renders bigint unknown block type when title is missing", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [{ type: BigInt(9001) }],
        }}
      />
    );

    expect(screen.getByText(/9001 data is corrupted/i)).toBeInTheDocument();
  });

  it("renders symbol unknown block type when title is missing", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [{ type: Symbol("broken") }],
        }}
      />
    );

    expect(screen.getByText(/Symbol\(broken\) data is corrupted/i)).toBeInTheDocument();
  });

  it("falls back to generic label when unknown block type is an empty symbol", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [{ type: Symbol("   ") }],
        }}
      />
    );

    expect(screen.getByText(/Unknown block data is corrupted/i)).toBeInTheDocument();
  });

  it("renders boolean false raw blocks through the defensive fallback", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [false],
        }}
      />
    );

    expect(screen.getByText(/false data is corrupted/i)).toBeInTheDocument();
  });

  it("renders numeric zero raw blocks through the defensive fallback", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [0],
        }}
      />
    );

    expect(screen.getByText(/0 data is corrupted/i)).toBeInTheDocument();
  });

  it("renders empty-string raw blocks with the generic unknown fallback", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [""],
        }}
      />
    );

    expect(screen.getByText(/Unknown block data is corrupted/i)).toBeInTheDocument();
  });

  it("renders known blocks safely when block id is a symbol", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [{ id: Symbol("rich-text-id"), type: BlockType.RICH_TEXT }],
        }}
      />
    );

    expect(screen.getByTestId("rich-text-block")).toBeInTheDocument();
  });

  it("renders known blocks safely when block id is a whitespace-only symbol", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [{ id: Symbol("   "), type: BlockType.RICH_TEXT }],
        }}
      />
    );

    expect(screen.getByTestId("rich-text-block")).toBeInTheDocument();
  });

  it("renders deferred diagram placeholder safely when diagram id is a symbol", () => {
    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [{ id: Symbol("diagram-id"), type: BlockType.DIAGRAM }],
        }}
        deferDiagrams
      />
    );

    expect(screen.getByRole("status", { name: /loading diagram/i })).toBeInTheDocument();
  });

  it("falls back safely when block getters throw during type resolution", () => {
    const brokenBlock = {};

    Object.defineProperty(brokenBlock, "type", {
      get() {
        throw new Error("type getter failed");
      },
    });

    Object.defineProperty(brokenBlock, "title", {
      get() {
        throw new Error("title getter failed");
      },
    });

    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [brokenBlock],
        }}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(/Unknown block data is corrupted/i);
  });

  it("falls back safely when a block factory throws", () => {
    createRichTextBlock.mockImplementationOnce(() => {
      throw new Error("factory failure");
    });

    renderWithProviders(
      <SectionRenderer
        section={{
          ...SECTION,
          blocks: [{ type: BlockType.RICH_TEXT, title: "Broken rich text" }],
        }}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(/Broken rich text data is corrupted/i);
    expect(screen.queryByTestId("rich-text-block")).not.toBeInTheDocument();
  });
});
