import { FlexboxGrid, Panel } from "rsuite";
import { useBreakpoint } from "assets/hooks";
import { ClickableImg } from "components/ui";

/**
 * @file ImageGalleryBlock.jsx
 * @fileoverview Renders a responsive image gallery inside a collapsible,
 * frosted-style panel.
 * @module src/components/renderers/blocks/ImageGalleryBlock
 */

/**
 * @public
 * @component
 * @name ImageGalleryBlock
 * @description Displays a responsive image gallery as a collapsible frosted panel.
 *
 * Key behaviors:
 * - Renders a grid of image thumbnails using RSuite FlexboxGrid
 * - Each image opens a ClickableImg modal viewer when activated
 * - Uses stable React keys, preferring `image.id` when available
 *
 * Rendering notes:
 * - Returns `null` if no valid items are provided
 * - Panel header is rendered only when a title is supplied
 *
 * @param {object} block - Component props.
 * @param {string} [block.id] - DOM id assigned to the panel container, used as a scroll anchor and for accessibility.
 * @param {FeatureImage[]} block.items - Image definitions to render.
 * @returns {JSX.Element|null} Rendered image gallery or null if empty.
 *
 * @example
 * ```js
 * <ImageGalleryBlock
 * block={{
 *  id: "gallery1",
 * title: "Project Screenshots",
 * items: [
 *    { id: "img1", src: "/images/screenshot1.png", alt: "Screenshot 1" },
 *    { id: "img2", src: "/images/screenshot2.png", alt: "Screenshot 2" },
 *  ],
 * }}
 */
const ImageGalleryBlock = (block = {}) => {
  const { id, title, items = [] } = block;
  // Guard against invalid or empty image arrays
  if (!Array.isArray(items) || items.length === 0) return null;
  const { isMobile } = useBreakpoint();

  return (
    <Panel
      id={id}
      collapsible
      defaultExpanded
      className="blue-tile block scroll-anchor"
      header={title ? <span className="block-header">{title}</span> : undefined}
    >
      <FlexboxGrid justify="space-around" align="top">
        {items.map((img, i) => {
          if (!img || !img.src) return null;
          // Prefer a stable image ID; fall back to index-based key
          const key = img?.id ? `gallery-img-${img.id}` : `gallery-img-${i}`;

          return (
            <FlexboxGrid.Item className="mb-2" key={key} colspan={isMobile ? 24 : 11}>
              <ClickableImg
                index={i}
                key={img?.id ?? key}
                {...img}
                id={img?.id ?? key}
                className="gallery-thumb"
              />
            </FlexboxGrid.Item>
          );
        })}
      </FlexboxGrid>
    </Panel>
  );
};

// return (
//   <Panel
//     collapsible
//     defaultExpanded
//     bordered
//     className="frosted block"
//     header={title ? <h3 className="block-header">{title}</h3> : undefined}
//   >
//     <FlexboxGrid justify="space-around" align="top">
//       {items.map((img, i) => {
//         // Prefer a stable image ID; fall back to index-based key
//         const key = img?.id ?? `gallery-img-${i}`;

//         return (
//           <FlexboxGrid.Item className="mb-2" key={key} colspan={11}>
//             <ClickableImg key={img.id} {...img} className="gallery-thumb" />
//           </FlexboxGrid.Item>
//         );
//       })}
//     </FlexboxGrid>
//   </Panel>
// );

export default ImageGalleryBlock;
