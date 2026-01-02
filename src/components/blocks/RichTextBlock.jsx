import React from "react";
import { Panel } from "rsuite";

/**
 * RichTextBlock
 * ---------------------------------------------------------------------------
 * Renders a collapsible panel containing one or more paragraphs of rich text.
 * Designed to be used as a content block within feature sections.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.title] - Optional heading displayed in the panel header.
 * @param {string[]} props.paragraphs - Paragraph text content to render.
 * @param {boolean} [props.dividerAfter=false]
 */
const RichTextBlock = ({ title, paragraphs, dividerAfter = false }) => {
  // Defensive guards to prevent invalid rendering
  if (!Array.isArray(paragraphs) || paragraphs.length === 0) {
    return null;
  }

  return (
    <Panel
      collapsible
      defaultExpanded
      header={title || undefined}
      role="region"
      aria-label={title}
      className="glass-card"
    >
      {paragraphs.map((text, index) => (
        <p
          key={`paragraph-${index}`}
          className="block-paragraph"
        >
          {text}
        </p>
      ))}
    </Panel>
  );
};

export default RichTextBlock;
