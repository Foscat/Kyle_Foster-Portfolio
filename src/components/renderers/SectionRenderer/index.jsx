import { useEffect, useRef, useState } from "react";
import { useSectionRegistry } from "assets/context/SectionRegistryProvider.jsx";
import {
  BlockType,
  createBulletListBlock,
  createCardGridBlock,
  createDiagramBlock,
  createFormBlock,
  createHeroBlock,
  createImageGalleryBlock,
  createLinkListBlock,
  createRichTextBlock,
} from "types/ui.types";
import InfoSection from "components/layout/InfoSection";
import {
  CardGridBlock,
  FormBlock,
  HeroBlock,
  ImageGalleryBlock,
  LinksBlock,
  RichTextBlock,
} from "components/renderers/blocks";
import MarkdownDocsBlock from "components/renderers/blocks/MarkdownDocs.Block";
import { AccordionList, MermaidDiagram } from "components/ui";
import "./styles.css";

/**
 * @file index.jsx
 * @fileoverview Central render orchestrator for feature sections composed of
 * declarative content blocks.
 * @module components/SectionRenderer
 */

/**
 * @public
 * @component
 * @name SectionRenderer
 *
 * @description Central render orchestrator for a single feature section.
 * This component acts as a **data-driven layout engine**, allowing
 * entire pages to be defined declaratively via structured data
 * instead of hardcoded JSX.
 *
 * @summary
 * Core responsibilities:
 * - Registers the section with the global SectionRegistry
 *   (used by sticky navigation and scroll-spy behavior)
 * - Renders the section container via `InfoSection`
 * - Dynamically resolves and renders content blocks based on `BlockType`
 *
 * Supported block types:
 * - Rich text content
 * - Image galleries
 * - Link lists
 * - Bulleted / accordion lists
 * - Mermaid diagrams (theme-aware)
 *
 * Defensive behavior:
 * - Gracefully handles malformed or unknown block definitions
 * - Renders a visible warning instead of silently failing
 *
 * @param {Object} props - Component props.
 *
 * @param {FeatureSection} props.section
 *   Fully-defined section descriptor containing metadata
 *   (`id`, `title`, `subtitle`, `icon`) and an ordered list of blocks.
 *
 * @returns {JSX.Element}
 *   Rendered, scroll-registered, frosted-glass section.
 *
 * @example
 * ```js
 * <SectionRenderer
 *   section={{
 *     id: "projects",
 *     title: "Projects",
 *     subtitle: "Selected work",
 *     blocks: [...]
 *   }}
 * />
 * ```
 */
function DeferredMount({ children, rootMargin = "320px 0px" }) {
  const hostRef = useRef(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return undefined;

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      return undefined;
    }

    const host = hostRef.current;
    if (!host) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShouldMount(true);
        observer.disconnect();
      },
      {
        root: null,
        rootMargin,
        threshold: 0.01,
      }
    );

    observer.observe(host);

    return () => observer.disconnect();
  }, [rootMargin, shouldMount]);

  return (
    <div ref={hostRef}>
      {shouldMount ? (
        children
      ) : (
        <div
          className="frosted blue-tile block scroll-anchor mermaid-container mermaid-deferred-placeholder"
          role="status"
          aria-live="polite"
          aria-label="Loading diagram"
        >
          <div className="mermaid-deferred-header-skeleton" />
          <div className="mermaid-deferred-canvas-skeleton" aria-hidden="true">
            <span className="mermaid-deferred-line w-90" />
            <span className="mermaid-deferred-line w-65" />
            <span className="mermaid-deferred-line w-80" />
            <span className="mermaid-deferred-line w-70" />
          </div>
        </div>
      )}
    </div>
  );
}

const SectionRenderer = ({ section = {}, deferDiagrams = false }) => {
  const { registerSection, unregisterSection } = useSectionRegistry();

  /**
   * Registers the section for scroll tracking on mount
   * and unregisters it on unmount.
   *
   * Enables:
   * - Sticky section navigation
   * - Active section highlighting
   * - Programmatic scrolling
   */
  const blocks = Array.isArray(section.blocks) ? section.blocks.filter(Boolean) : [];

  useEffect(() => {
    if (!section?.id) return undefined;

    registerSection(section.id, {
      id: section.id,
      title: section.title,
    });

    return () => unregisterSection(section.id);
  }, [section?.id, section?.title, registerSection, unregisterSection]);

  return (
    <InfoSection
      id={section.id}
      title={section.title}
      subtitle={section.subtitle}
      sectionTag={section.sourceTag}
      icon={section.icon}
      className="section-renderer"
      data-section-renderer
    >
      {blocks.map((block, i) => {
        const blockKey = `${block?.type ?? "unknown"}-${i}-${block?.id ?? "missing-id"}`;

        switch (block.type) {
          case BlockType.RICH_TEXT: {
            return <RichTextBlock key={blockKey} {...createRichTextBlock(block)} />;
          }

          case BlockType.IMAGE_GALLERY:
            return <ImageGalleryBlock key={blockKey} {...createImageGalleryBlock(block)} />;

          case BlockType.LINKS:
            return <LinksBlock key={blockKey} {...createLinkListBlock(block)} />;

          case BlockType.BULLETED_LIST:
            return (
              <AccordionList
                key={blockKey}
                {...createBulletListBlock(block)}
                className="scroll-anchor"
              />
            );

          case BlockType.CARD_GRID:
            return <CardGridBlock key={blockKey} {...createCardGridBlock(block)} />;

          case BlockType.DIAGRAM:
            if (!deferDiagrams) {
              return (
                <MermaidDiagram
                  key={blockKey}
                  {...createDiagramBlock(block)}
                  className="scroll-anchor"
                />
              );
            }

            return (
              <DeferredMount key={blockKey}>
                <MermaidDiagram {...createDiagramBlock(block)} className="scroll-anchor" />
              </DeferredMount>
            );

          case BlockType.FORM:
            return <FormBlock key={blockKey} {...createFormBlock(block)} />;

          case BlockType.HERO:
            return <HeroBlock key={blockKey} {...createHeroBlock(block)} />;

          case BlockType.MARKDOWN_DOCS:
            return <MarkdownDocsBlock key={blockKey} block={block} />;

          /**
           * Defensive fallback:
           * If malformed or unknown block data reaches this point,
           * render a visible warning instead of silently failing.
           */
          default:
            return <p key={blockKey}>{block?.title || "Unknown block"} data is corrupted.</p>;
        }
      })}
    </InfoSection>
  );
};

export default SectionRenderer;
