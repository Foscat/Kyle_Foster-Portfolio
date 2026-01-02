/**
 * FeatureSectionRenderer
 * ------------------------------------------------------------
 * Renders a feature section dynamically based on block type structure.
 */

import React, { useEffect } from "react";
import InfoSection from "components/InfoSection";
import AccordionList from "components/AccordionList";
import MermaidDiagram from "components/blocks/MermaidDiagram";
import RichTextBlock from "components/blocks/RichTextBlock";
import ImageGalleryBlock from "components/blocks/ImageGalleryBlock";
import LinksBlock from "components/blocks/LinksBlock";

const SectionRenderer = ({ section }) => {
  const { registerSection, unregisterSection } = useSectionRegistry();

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
        if (block.type === "richText") {
          return (
            <RichTextBlock
              key={i}
              title={block.title}
              paragraphs={block.paragraphs}
            />
          );
        } else if (block.type === "imageGallery") {
          return (
            <ImageGalleryBlock
              key={i}
              images={block.images}
            />
          );
        } else if (block.type === "links") {
          {
            /* LINKS */
          }
          return (
            <LinksBlock
              key={i}
              links={block.links}
            />
          );
        } else if (block.type === "bulletedList") {
          {
            /* BULLET LIST */
          }
          return (
            <AccordionList
              key={i}
              title={block.title}
              items={block.items}
            />
          );
        } else if (block.type === "diagram") {
          {
            /* DIAGRAMS */
          }
          block = create;
          return (
            <MermaidDiagram
              key={i}
              title={block.title}
              description={block.description}
              diagram={block.diagram}
              theme={block.theme}
              collapsible={block?.collapsible || true}
            />
          );
        } else {
          console.debug({ block });
          return <p key={i}>{block.title} data is corrupted. </p>;
        }
      })}
    </InfoSection>
  );
};

export default SectionRenderer;
