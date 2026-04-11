/**
 * @file src\components\renderers\RichText\index.jsx
 * @description src\components\renderers\RichText\index module.
 * @module src\components\renderers\RichText\index
 */

import React from "react";
import renderNode from "./renderNode";
import "./style.css";

/**
 * @file index.jsx
 * @fileoverview Renders rich text content which may include plain strings, arrays,
 * @module components/RichText
 */

/**
 * @public
 * @component
 * @name RichText
 * @description Renders rich text content which may include plain strings, arrays, or structured rich text nodes. This component is designed to handle a variety of content formats, allowing for flexible rendering of rich text in different contexts.
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
 *
 * Key behaviors:
 * - Handles multiple content formats: strings, numbers, arrays, and objects
 * - Trims string content and renders only if non-empty to avoid empty paragraphs
 * - Recursively renders array content, allowing for complex rich text structures
 * - Uses stable keys for array items, preferring node IDs when available
 * - Applies ARIA roles and labels for accessibility when provided
 * - Returns null for invalid or empty content to prevent rendering errors
 *
 * @example
 * ```js
 * <RichText
 *   text={[
 *     "This is a paragraph of rich text.",
 *     { type: "link", href: "https://example.com", text: "This is a link." },
 *    "This is another paragraph."
 *  ]}
 *  className="custom-rich-text"
 *  role="article"
 * ariaLabeledBy="richTextLabel"
 * />
 * ```
 * In this example, the `RichText` component renders a mix of plain text and a structured link node, applying custom styling and accessibility attributes as specified in the props.
 */
const RichText = ({ text, content, index = 0, className = "", role, ariaLabeledBy = "" }) => {
  const value = text ?? content ?? "";

  if (value === null || value === undefined) return null;

  // Handle string content, trimming whitespace and rendering only if non-empty. This prevents rendering empty paragraphs for strings that are just whitespace, while still allowing valid string content to be rendered as a paragraph.
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;

    return (
      <p
        className={`block-paragraph ${className}`.trim()}
        role={role}
        aria-labelledby={ariaLabeledBy || undefined}
      >
        {value}
      </p>
    );
  }

  // Handle numeric content by converting it to a string and rendering it as a paragraph. This allows numbers to be rendered in the same way as strings, ensuring that numeric content is not ignored or treated as invalid.
  if (typeof value === "number") {
    return (
      <p
        className={`block-paragraph ${className}`.trim()}
        role={role}
        aria-labelledby={ariaLabeledBy || undefined}
      >
        {String(value)}
      </p>
    );
  }

  // Handle array content by recursively rendering each node in the array. This allows for complex rich text structures to be rendered correctly, as each node can be processed according to its type and content. The key generation uses the node's id if available, or falls back to a combination of the parent index and the current index to ensure unique keys for React.
  if (Array.isArray(value)) {
    if (!value.length) return null;

    return (
      <>
        {value.map((node, i) => (
          <React.Fragment key={node?.id || `${index}-${i}`}>{renderNode(node, i)}</React.Fragment>
        ))}
      </>
    );
  }

  // Handle object content by passing it to the renderNode function, which will determine how to render it based on its structure and type. This allows for rich text nodes that are represented as objects to be rendered appropriately, while also ensuring that any invalid or empty objects do not result in rendering errors. If the object is empty, we return null to avoid rendering empty elements.
  if (typeof value === "object") {
    if (Object.keys(value).length === 0) return null;
    return renderNode(value, index);
  }

  return null;
};

export default RichText;
