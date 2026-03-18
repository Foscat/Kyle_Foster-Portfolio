import { Panel } from "rsuite";
import { RichText } from "components/renderers";

/**
 * @file RichTextBlock.jsx
 * @fileoverview Renders a collapsible frosted panel containing one or more
 * paragraphs of rich text content.
 * @module components/blocks/RichTextBlock
 */

/**
 * @public
 * @component
 * @name RichTextBlock
 * @description Renders a collapsible panel containing one or more paragraphs of rich text. Intended for use as a content block within feature or section layouts.
 *
 * Rendering notes:
 * - Returns `null` if no valid paragraph content is provided
 * - Each paragraph is rendered as a separate `<p>` element
 * - Panel header is conditionally rendered when a title is supplied
 *
 * Accessibility:
 * - Uses `role="region"` to denote a landmark section
 * - Applies `aria-label` when a title is present
 *
 *
 * @param {object} props - Component props.
 * - Each paragraph is rendered as a separate `<p>` element
 * - Panel header is conditionally rendered when a title is supplied
 *
 * Accessibility:
 * - Uses `role="region"` to denote a landmark section
 * - Applies `aria-label` when a title is present
 *
 * @param {object} props - Component props.
 * @param {string} [props.id] - DOM id assigned to the panel container, used as a scroll anchor and for accessibility.
 * @param {string} [props.title] - Optional heading displayed in the panel header.
 * @param {string[] | RichTextNode} props.content - Paragraph text content to render.
 * @returns {JSX.Element | null} Rendered rich text panel or null if empty.
 */
const RichTextBlock = ({ id, title, content }) => {
  // Defensive guards to prevent invalid or empty paragraph rendering
  if (!Array.isArray(content) || content.length === 0) {
    return null;
  }

  return (
    <Panel
      id={id}
      collapsible
      defaultExpanded
      header={
        title && (
          <span id={id ? id : undefined} className="block-header">
            {title}
          </span>
        )
      }
      role="region"
      aria-label={title}
      className="blue-tile block scroll-anchor"
    >
      {content.map((text, index) => {
        return <RichText key={`rt-${id}-${index}`} text={text} index={index} />;
      })}
    </Panel>
  );
};

export default RichTextBlock;
