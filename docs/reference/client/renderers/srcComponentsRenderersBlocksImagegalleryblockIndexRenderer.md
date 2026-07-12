# srcComponentsRenderersBlocksImagegalleryblockIndexRenderer

- Source: `src/components/renderers/blocks/ImageGalleryBlock/index.jsx`

# srcComponentsRenderersBlocksImagegalleryblockIndexRenderer

## src\\components\\renderers\\blocks\\ImageGalleryBlock\\index

src\components\renderers\blocks\ImageGalleryBlock\index module.

## src/components/renderers/blocks/ImageGalleryBlock

Renders a responsive image gallery inside a collapsible,
frosted-style panel.

### ImageGalleryBlock

Displays a responsive image gallery as a collapsible frosted panel.

Key behaviors:
- Renders thumbnails through the `layout-style-css` gallery primitive
- Each image opens a ClickableImg modal viewer when activated
- Uses stable React keys, preferring `image.id` when available

Rendering notes:
- Returns `null` if no valid items are provided
- Panel header is rendered only when a title is supplied

**Parameters**

- `block` (`object`) - Component props.
- `block.id` (`string`, optional) - DOM id assigned to the panel container, used as a scroll anchor and for accessibility.
- `block.items` (`Array<FeatureImage>`) - Image definitions to render.

**Returns**

- `JSX.Element | null` - Rendered image gallery or null if empty.

**Examples**

```js
```js
<ImageGalleryBlock
block={{
 id: "gallery1",
title: "Project Screenshots",
items: [
   { id: "img1", src: "/images/screenshot1.png", alt: "Screenshot 1" },
   { id: "img2", src: "/images/screenshot2.png", alt: "Screenshot 2" },
 ],
}}
```
