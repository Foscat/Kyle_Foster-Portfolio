import { Panel } from "rsuite";

/**
 * @file RichTextBlock.jsx
 * @description Renders a collapsible frosted panel containing one or more
 * paragraphs of rich text content.
 * @module components/blocks/RichTextBlock
 */

/**
 * RichTextBlock
 * ---------------------------------------------------------------------------
 * Renders a collapsible panel containing one or more paragraphs of rich text.
 * Intended for use as a content block within feature or section layouts.
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
 * @public
 * @component
 * @param {object} props - Component props.
 * @param {string} [props.title] - Optional heading displayed in the panel header.
 * @param {string[]} props.paragraphs - Paragraph text content to render.
 * @returns {JSX.Element | null} Rendered rich text panel or null if empty.
 */
const RichTextBlock = ({ title, paragraphs }) => {
  console.log({ title, paragraphs });

  // Defensive guards to prevent invalid or empty paragraph rendering
  if (!Array.isArray(paragraphs) || paragraphs.length === 0) {
    return null;
  }

  return (
    <Panel
      collapsible
      defaultExpanded
      bordered
      header={title && <span className="block-header">{title}</span>}
      role="region"
      aria-label={title}
      className="frosted"
    >
      {paragraphs.map((text, index) => (
        <p key={`paragraph-${index}`} className="block-paragraph">
          {text}
        </p>
      ))}
    </Panel>
  );
};

export default RichTextBlock;
