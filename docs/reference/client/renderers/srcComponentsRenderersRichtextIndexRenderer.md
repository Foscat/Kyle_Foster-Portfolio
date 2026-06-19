# srcComponentsRenderersRichtextIndexRenderer

- Source: `src/components/renderers/RichText/index.jsx`

# srcComponentsRenderersRichtextIndexRenderer

## src\\components\\renderers\\RichText\\index

src\components\renderers\RichText\index module.

## components/RichText

Renders rich text content which may include plain strings, arrays,

### RichText

Renders rich text content which may include plain strings, arrays, or structured rich text nodes. This component is designed to handle a variety of content formats, allowing for flexible rendering of rich text in different contexts.

**Parameters**

- `props` (`Object`)
- `props.text` (`string | number | object | Array`)
- `props.index` (`number`) - Optional index for key generation in arrays
- `props.className` (`string`) - Additional CSS classes for styling
- `props.role` (`string`) - ARIA role for accessibility
- `props.className` (`string`) - Additional CSS classes for styling
- `props.role` (`string`) - ARIA role for accessibility
- `props.ariaLabeledBy` (`string`) - ID of the element that labels this content for accessibility

**Returns**

- `JSX.Element | null` - Rendered rich text content or null if input is empty/invalid Key behaviors: - Handles multiple content formats: strings, numbers, arrays, and objects - Trims string content and renders only if non-empty to avoid empty paragraphs - Recursively renders array content, allowing for complex rich text structures - Uses stable keys for array items, preferring node IDs when available - Applies ARIA roles and labels for accessibility when provided - Returns null for invalid or empty content to prevent rendering errors

**Examples**

```js
```js
<RichText
  text={[
    "This is a paragraph of rich text.",
    { type: "link", href: "https://example.com", text: "This is a link." },
   "This is another paragraph."
 ]}
 className="custom-rich-text"
 role="article"
ariaLabeledBy="richTextLabel"
/>
```
In this example, the `RichText` component renders a mix of plain text and a structured link node, applying custom styling and accessibility attributes as specified in the props.
```
