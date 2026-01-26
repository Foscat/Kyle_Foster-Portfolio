import ClickableImg from "components/ClickableImg";
import { FlexboxGrid, Panel } from "rsuite";

/**
 * @file ImageGalleryBlock.jsx
 * @description Renders a responsive image gallery inside a collapsible,
 * frosted-style panel.
 * @module components/blocks/ImageGalleryBlock
 */

/**
 * ImageGalleryBlock
 * ---------------------------------------------------------------------------
 * Displays a responsive image gallery as a collapsible frosted panel.
 *
 * Key behaviors:
 * - Renders a grid of image thumbnails using RSuite FlexboxGrid
 * - Each image opens a ClickableImg modal viewer when activated
 * - Uses stable React keys, preferring `image.id` when available
 *
 * Rendering notes:
 * - Returns `null` if no valid images are provided
 * - Panel header is rendered only when a title is supplied
 *
 * @public
 * @component
 * @param {object} props - Component props.
 * @param {string} [props.title] - Optional panel header title.
 * @param {FeatureImage[]} props.images - Image definitions to render.
 * @returns {JSX.Element|null} Rendered image gallery or null if empty.
 */
const ImageGalleryBlock = ({ title, images = [] }) => {
  // Guard against invalid or empty image arrays
  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <Panel
      collapsible
      defaultExpanded
      bordered
      className="frosted"
      header={title ? <h3 className="block-header">{title}</h3> : undefined}
    >
      <FlexboxGrid justify="space-around" align="top">
        {images.map((img, i) => {
          // Prefer a stable image ID; fall back to index-based key
          const key = img?.id ?? `gallery-img-${i}`;

          return (
            <FlexboxGrid.Item className="mb-2" key={key} colspan={11}>
              <ClickableImg key={img.id} {...img} className="gallery-thumb" />
            </FlexboxGrid.Item>
          );
        })}
      </FlexboxGrid>
    </Panel>
  );
};

export default ImageGalleryBlock;
