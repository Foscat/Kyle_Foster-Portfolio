# srcComponentsRenderersBlocksVideoblockIndexRenderer

- Source: `src/components/renderers/blocks/VideoBlock/index.jsx`

# srcComponentsRenderersBlocksVideoblockIndexRenderer

## components/renderers/blocks/VideoBlock

Accessible video content block for self-hosted product demonstrations.

### VideoBlock()

Renders a self-hosted product demonstration with browser-native controls.

**Parameters**

- `props` (`object`) - Declarative video block fields.
- `props.block` (`object`, optional) - Optional nested block payload.
- `props.id` (`string`, optional) - DOM anchor for section navigation.
- `props.title` (`string`, optional) - Collapsible panel title.
- `props.src` (`string`, optional) - Bundled or public media source.
- `props.mimeType` (`string`, optional, default: `"video/mp4"`) - Source MIME type.
- `props.caption` (`string`, optional) - Visible context below the media.
- `props.ariaLabel` (`string`, optional) - Accessible name for the video element.

**Returns**

- `JSX.Element | null` - The video block when a source is available.
