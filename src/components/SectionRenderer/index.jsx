import { useEffect } from "react";
import { useSectionRegistry } from "navigation/SectionRegistryProvider";
import {
  BlockType,
  createBulletListBlock,
  createDiagramBlock,
  createImageGalleryBlock,
  createLinkListBlock,
  createRichTextBlock,
} from "types/ui.types";

/**
 * SectionRenderer Component
 * --------------------------------------------------------------------
 * Central render orchestrator for a single FeatureSection.
 *
 * This component is responsible for:
 * - Registering the section with the global SectionRegistry
 *   (used by Sticky Section Nav and scroll-spy behavior)
 * - Rendering the section container via InfoSection
 * - Dynamically rendering content blocks based on their `BlockType`
 *
 * The renderer acts as a **data-driven layout engine**, allowing
 * entire pages to be defined declaratively via JSON-like data
 * instead of hardcoded JSX.
 *
 * Supported block types:
 * - Rich text content
 * - Image galleries
 * - Link lists
 * - Bulleted / accordion lists
 * - Mermaid diagrams (theme-aware)
 *
 * @component
 *
 * @param {object} props
 * @param {FeatureSection} props.section
 *   A fully-defined section descriptor containing metadata
 *   (id, title, subtitle, icon) and an ordered list of blocks.
 *
 * @returns {JSX.Element}
 *   A rendered, scroll-registered, frosted-glass section.
 *
 *
 * @example
 * ```js
 * <SectionRenderer
 *   section={{
 *     id: "projects",
 *     title: "Projects",
 *     content: [...]
 *   }}
 * />
 * ```
 */
const SectionRenderer = ({ section }) => {
  const { registerSection, unregisterSection } = useSectionRegistry();

  /**
   * Register the section for scroll tracking when mounted
   * and unregister it on unmount.
   *
   * This enables:
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
  }, [section.id]);

  return (
    <InfoSection
      id={section.id}
      title={section.title}
      subtitle={section.subtitle}
      icon={section.icon}
    >
      {section.blocks.map((block, i) => {
        switch (block.type) {
          case BlockType.RICH_TEXT: {
            const rtb = createRichTextBlock(block);
            return (
              <RichTextBlock
                key={i}
                {...rtb}
              />
            );
          }

          case BlockType.IMAGE_GALLERY:
            const imgGal = createImageGalleryBlock(block);
            return (
              <ImageGalleryBlock
                key={i}
                {...imgGal}
              />
            );

          case BlockType.LINKS:
            const linksBlock = createLinkListBlock(block);
            return (
              <LinksBlock
                key={i}
                {...linksBlock}
              />
            );

          case BlockType.BULLETED_LIST: {
            const bl = createBulletListBlock(block);
            return (
              <AccordionList
                key={i}
                {...bl}
              />
            );
          }

          case BlockType.DIAGRAM: {
            const mdg = createDiagramBlock(block);
            return (
              <MermaidDiagram
                key={i}
                {...mdg}
              />
            );
          }

          /**
           * Defensive fallback:
           * If malformed or unknown block data reaches this point,
           * we render a visible warning instead of silently failing.
           */
          default:
            console.debug({ block });
            return (
              <p key={i}>
                {block?.title || "Unknown block"} data is corrupted.
              </p>
            );
        }
      })}
    </InfoSection>
  );
};

export default SectionRenderer;
