import React from "react";
import { FlexboxGrid, Panel } from "rsuite";
import ClickableImg from "components/ClickableImg";

/**
 * @typedef {import("../../types/ui.types.js").FeatureImage} FeatureImage
 */

/**
 * ImageGalleryBlock
 * ------------------------------------------------------------
 * Displays responsive images with:
 * - Click-to-zoom modal
 * - Optional captions
 * - Grid layout using RSuite
 *
 * @component
 * @param {Object} props
 * @param {Array<FeatureImage>} props.images
 */
const ImageGalleryBlock = ({ images = [] }) => {
  if (!images.length) return null;

  return (
    <Panel
      bordered
      collapsible
      className="glass-card image-gallery-block"
    >
      <FlexboxGrid
        justify="space-between"
        align="top"
      >
        {images.map((img, i) => (
          <FlexboxGrid.Item
            key={i}
            colspan={24}
            sm={12}
            md={12}
            lg={8}
          >
            <ClickableImg
              src={img.src}
              alt={img.alt}
              title={img.title}
              caption={img.caption}
              className="gallery-thumb"
            />
          </FlexboxGrid.Item>
        ))}
      </FlexboxGrid>
    </Panel>
  );
};

export default ImageGalleryBlock;
