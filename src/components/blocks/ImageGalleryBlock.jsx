
/**
 * ImageGalleryBlock
 * ------------------------------------------------------------
 * Displays responsive images with:
 * - Click-to-zoom modal
 * - Optional captions
 * - Grid layout using RSuite
 *
 * @component
 * @param {object} props
 * @param {FeatureImage[]} props.images
 */
const ImageGalleryBlock = ({ images = [] }) => {
  if (!images.length) return null;

  return (
    <Panel
      bordered
      collapsible
      defaultExpanded
      className="glass-card image-gallery-block"
    >
      <FlexboxGrid
        justify="space-between"
        align="top"
      >
        {images.map((img, i) => (
          <FlexboxGrid.Item
            key={i}
            colspan={12}
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
