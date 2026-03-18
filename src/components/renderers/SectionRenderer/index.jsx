import { useEffect } from "react";
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
import { AccordionList, MermaidDiagram } from "components/ui";

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
const SectionRenderer = ({ section }) => {
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
  useEffect(() => {
    registerSection(section.id, {
      id: section.id,
      title: section.title,
    });

    return () => unregisterSection(section.id);
  }, [section.id, section.title, registerSection, unregisterSection]);

  return (
    <InfoSection
      id={section.id}
      title={section.title}
      subtitle={section.subtitle}
      icon={section.icon}
      className="section-renderer"
      data-section-renderer
    >
      {section.blocks.map((block, i) => {
        {
          /* console.debug("Rendering block:", block); */
        }

        switch (block.type) {
          case BlockType.RICH_TEXT: {
            return <RichTextBlock key={`rtb-${i}-${block.id}`} {...createRichTextBlock(block)} />;
          }

          case BlockType.IMAGE_GALLERY:
            return (
              <ImageGalleryBlock key={`igb-${i}-${block.id}`} {...createImageGalleryBlock(block)} />
            );

          case BlockType.LINKS:
            return <LinksBlock key={`lnk-${i}-${block.id}`} {...createLinkListBlock(block)} />;

          case BlockType.BULLETED_LIST:
            return (
              <AccordionList
                key={`acl-${i}-${block.id}`}
                {...createBulletListBlock(block)}
                className="scroll-anchor"
              />
            );

          case BlockType.CARD_GRID:
            return <CardGridBlock key={`cgb-${i}-${block.id}`} {...createCardGridBlock(block)} />;

          case BlockType.DIAGRAM:
            console.log("Rendering diagram block:", block);
            return (
              <MermaidDiagram
                key={`diagram-${i}-${block.id}`}
                {...createDiagramBlock(block)}
                className="scroll-anchor"
              />
            );

          case BlockType.FORM:
            return <FormBlock key={`form-${i}-${block.id}`} {...createFormBlock(block)} />;

          case BlockType.HERO:
            return <HeroBlock key={`hero-${i}-${block.id}`} {...createHeroBlock(block)} />;

          /**
           * Defensive fallback:
           * If malformed or unknown block data reaches this point,
           * render a visible warning instead of silently failing.
           */
          default:
            console.debug("Corrupted data block", { block });
            return <p key={block.id}>{block?.title || "Unknown block"} data is corrupted.</p>;
        }
      })}
    </InfoSection>
  );
};

export default SectionRenderer;
