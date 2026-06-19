# renderNodeRenderer

- Source: `src/components/renderers/RichText/renderNode.jsx`

# renderNodeRenderer

## src\\components\\renderers\\RichText\\renderNode

src\components\renderers\RichText\renderNode module.

### InlineIcon()

InlineIcon
---------------------------------------------------------------------------
Renders a lightweight, inline icon placeholder.

This component is intentionally decoupled from any specific icon library.
Styling and actual icon rendering should be handled via CSS or a higher-level
icon system.

**Parameters**

- `props` (`object`)
- `props.name` (`string`) - Icon identifier used to construct CSS class names.

**Returns**

- `JSX.Element`

### renderNode()

renderNode
---------------------------------------------------------------------------
Recursively renders a `RichTextNode` into a React element.

Design notes:
- Uses a single switch statement for explicit, readable control flow
- Recursion allows arbitrarily deep nesting (lists, paragraphs, blockquotes)
- Inline nodes return strings or inline elements
- Block nodes return semantic container elements

**Parameters**

- `node` (`RichTextNode`) - Rich text node to render.
- `key` (`number | string`) - React key used when rendering collections.

**Returns**

- `JSX.Element | string | null` - Rendered node output.
