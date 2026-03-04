import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism-tomorrow.css";

/**
 * @file renderNode.jsx
 * @description
 * Recursive renderer for structured rich text content.
 *
 * This module converts a normalized rich-text node schema into React elements.
 * It is intentionally framework-agnostic and designed to be reused by content
 * blocks such as `RichTextBlock`.
 *
 * Supported content types:
 * - Paragraphs and inline text
 * - Inline formatting (strong, em, links, icons)
 * - Lists (ul, ol, li)
 * - Blockquotes
 * - Inline code
 * - Syntax-highlighted code blocks
 *
 * Rendering strategy:
 * - Uses recursion to walk a tree of `RichTextNode` objects
 * - Block-level nodes render structural elements
 * - Inline nodes render typographic or semantic elements
 *
 * Security notes:
 * - Syntax-highlighted code blocks use `dangerouslySetInnerHTML`
 * - Content MUST be trusted or sanitized before reaching this renderer
 *
 * This renderer is pure and side-effect free.
 */

/**
 * InlineIcon
 * ---------------------------------------------------------------------------
 * Renders a lightweight, inline icon placeholder.
 *
 * This component is intentionally decoupled from any specific icon library.
 * Styling and actual icon rendering should be handled via CSS or a higher-level
 * icon system.
 *
 * @param {object} props
 * @param {string} props.name - Icon identifier used to construct CSS class names.
 * @returns {JSX.Element}
 */
const InlineIcon = ({ name }) => (
  <i
    className={`inline-icon icon-${name}`}
    aria-hidden="true"
    data-testid={`inline-icon-${name}`}
  />
);

/**
 * renderNode
 * ---------------------------------------------------------------------------
 * Recursively renders a `RichTextNode` into a React element.
 *
 * Design notes:
 * - Uses a single switch statement for explicit, readable control flow
 * - Recursion allows arbitrarily deep nesting (lists, paragraphs, blockquotes)
 * - Inline nodes return strings or inline elements
 * - Block nodes return semantic container elements
 *
 * @param {RichTextNode} node - Rich text node to render.
 * @param {number|string} key - React key used when rendering collections.
 * @returns {JSX.Element | string | null} Rendered node output.
 */
const renderNode = (node, key) => {
  // Defensive guard: ignore null or undefined nodes
  if (!node) return null;

  switch (node.type) {
    /* ---------------------------------------------------------------------
       Inline text
       ------------------------------------------------------------------ */
    case "text":
      return node.text;

    /* ---------------------------------------------------------------------
       Paragraph
       ------------------------------------------------------------------ */
    case "p":
      return (
        <p key={key} className="block-paragraph">
          {node.children?.map(renderNode)}
        </p>
      );

    /* ---------------------------------------------------------------------
       Inline formatting
       ------------------------------------------------------------------ */
    case "strong":
      return (
        <strong key={key} className="block-strong">
          {node.text}
        </strong>
      );

    // Italicized text
    case "em":
      return (
        <em className="block-em" key={key}>
          {node.text}
        </em>
      );

    // Hyperlink
    case "a":
      return (
        <a key={key} href={node.href} className="block-link">
          {node.text}
        </a>
      );

    // Emogi icon
    case "inlineIcon":
      return (
        <i key={key} className={`inline-icon `}>
          {node.icon}
        </i>
      );

    /* ---------------------------------------------------------------------
       Lists
       ------------------------------------------------------------------ */
    case "ul":
      return (
        <ul key={key} className="block-list">
          {node.children?.map(renderNode)}
        </ul>
      );

    case "ol":
      return (
        <ol key={key} className="block-list ordered">
          {node.children?.map(renderNode)}
        </ol>
      );

    case "li":
      return (
        <li key={key} className="block-list-item">
          {node.children?.map(renderNode)}
        </li>
      );

    /* ---------------------------------------------------------------------
       Blockquote
       ------------------------------------------------------------------ */
    case "blockquote":
      return (
        <blockquote key={key} className="block-quote">
          {node.children?.map(renderNode)}
        </blockquote>
      );

    /* ---------------------------------------------------------------------
       Inline code
       ------------------------------------------------------------------ */
    case "code":
      return (
        <code key={key} className="inline-code">
          {node.text}
        </code>
      );

    /* ---------------------------------------------------------------------
       Syntax-highlighted code block
       ------------------------------------------------------------------ */
    case "pre": {
      // Highlight source code using Prism for the specified language
      const language = node.language || "shell";
      const html = Prism.highlight(node.text || "", Prism.languages[language], language);

      return (
        <pre key={key} className="code-block">
          <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      );
    }

    /* ---------------------------------------------------------------------
       Unknown node types
       ------------------------------------------------------------------ */
    default:
      return null;
  }
};

export default renderNode;
