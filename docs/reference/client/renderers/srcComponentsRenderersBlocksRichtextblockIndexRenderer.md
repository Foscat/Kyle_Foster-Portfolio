# srcComponentsRenderersBlocksRichtextblockIndexRenderer

- Source: `src/components/renderers/blocks/RichTextBlock/index.jsx`

# srcComponentsRenderersBlocksRichtextblockIndexRenderer

## src\\components\\renderers\\blocks\\RichTextBlock\\index

src\components\renderers\blocks\RichTextBlock\index module.

## components/blocks/RichTextBlock

Renders a collapsible frosted panel containing one or more
paragraphs of rich text content.

### RichTextBlock

Renders a collapsible panel containing one or more paragraphs of rich text. Intended for use as a content block within feature or section layouts.

Rendering notes:
- Returns `null` if no valid paragraph content is provided
- Each paragraph is rendered as a separate `
` element
- Panel header is conditionally rendered when a title is supplied

Accessibility:
- Uses `role="region"` to denote a landmark section
- Applies `aria-label` when a title is present

**Parameters**

- `props` (`object`) - Component props. - Each paragraph is rendered as a separate ` ` element - Panel header is conditionally rendered when a title is supplied Accessibility: - Uses `role="region"` to denote a landmark section - Applies `aria-label` when a title is present
- `props` (`object`) - Component props.
- `props.id` (`string`, optional) - DOM id assigned to the panel container, used as a scroll anchor and for accessibility.
- `props.title` (`string`, optional) - Optional heading displayed in the panel header.
- `props.content` (`Array<string> | RichTextNode`) - Paragraph text content to render.

**Returns**

- `JSX.Element | null` - Rendered rich text panel or null if empty.
