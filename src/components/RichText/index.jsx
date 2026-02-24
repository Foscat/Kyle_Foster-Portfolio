import React from "react";
import renderNode from "./renderNode";

/**
 * @file index.jsx
 * @description Renders rich text content which may include plain strings, arrays,
 * or structured rich text nodes.
 * @module components/RichText
 */

/**
 * RichText
 * ---------------------------------------------------------------------------
 * @param {Object} props
 * @param {string | number | object | Array} props.text
 * @param {number} props.index - Optional index for key generation in arrays
 * @param {string} props.className - Additional CSS classes for styling
 * @param {string} props.role - ARIA role for accessibility
 * @param {string} props.className - Additional CSS classes for styling
 * @param {string} props.role - ARIA role for accessibility
 * @param {string} props.ariaLabeledBy - ID of the element that labels this content for accessibility
 *
 * @returns {JSX.Element|null} Rendered rich text content or null if input is empty/invalid
 */
const RichText = ({ text = "", index = 0, className = "", role, ariaLabeledBy = "" }) => {
  // Treat null/undefined as empty
  if (text === null || text === undefined) return null;

  // Strings (including empty/whitespace)
  if (typeof text === "string") {
    const trimmed = text.trim();
    if (!trimmed) return null;

    return (
      <p
        className={`block-paragraph ${className}`.trim()}
        role={role}
        aria-labelledby={ariaLabeledBy || undefined}
      >
        {text}
      </p>
    );
  }

  // Numbers (sometimes content systems emit these)
  if (typeof text === "number") {
    return (
      <p
        className={`block-paragraph ${className}`.trim()}
        role={role}
        aria-labelledby={ariaLabeledBy || undefined}
      >
        {String(text)}
      </p>
    );
  }

  // Arrays of nodes
  if (Array.isArray(text)) {
    if (!text.length) return null;

    return (
      <>
        {text.map((node, i) => (
          <React.Fragment key={node?.id || `${index}-${i}`}>{renderNode(node, i)}</React.Fragment>
        ))}
      </>
    );
  }

  // Rich text node object
  if (typeof text === "object") {
    // Avoid passing empty objects into renderNode
    if (Object.keys(text).length === 0) return null;

    return renderNode(text, index);
  }

  return null;
};

export default RichText;
