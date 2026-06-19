# srcComponentsRenderersBlocksImagetextsplitblockIndexRenderer

- Source: `src/components/renderers/blocks/ImageTextSplitBlock/index.jsx`

# srcComponentsRenderersBlocksImagetextsplitblockIndexRenderer

## src\\components\\renderers\\blocks\\ImageTextSplitBlock\\index

src\components\renderers\blocks\ImageTextSplitBlock\index module.

### ImageTextSplitBlock

Renders a magazine-style float layout where rich text wraps around a single image.
On tablet and desktop the image floats left or right at roughly one-third width so the text
flows naturally around it. On mobile the float is cleared and the image stacks above the text
regardless of the imagePosition setting.

**Parameters**

- `props` (`object`) - Component props.
- `props.id` (`string`, optional) - DOM id assigned to the panel container.
- `props.title` (`string`, optional) - Optional heading displayed in the panel header.
- `props.image` (`FeatureImage`) - Single image metadata.
- `props.imagePosition` (`"left" | "right"`, optional, default: `"left"`) - Float side on tablet and desktop.
- `props.showCaption` (`boolean`, optional, default: `false`) - Render the image caption when true. Reserved for   future use cases; captions are hidden by default to keep the layout clean.
- `props.content` (`Array<RichTextNode> | Array<string>`) - Rich text nodes that wrap around the image.

**Returns**

- `JSX.Element | null` - Float-layout image/text panel or null when required data is missing.
