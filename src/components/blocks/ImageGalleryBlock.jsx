import ClickableImg from "components/ClickableImg";
import { FlexboxGrid, Panel } from "rsuite";

/**
 * ImageGalleryBlock
 * ---------------------------------------------------------------------------
 * Displays a responsive image gallery as a collapsible frosted panel.
 *
 * Key behaviors:
 * - Renders a grid of thumbnails (RSuite FlexboxGrid)
 * - Each image opens a ClickableImg modal viewer
 * - Uses stable React keys (prefers image.id)
 *
 * @component
 * @param {object} props
 * @param {string} [props.title] - Optional panel header title.
 * @param {FeatureImage[]} props.images - Image definitions to render.
 * @returns {JSX.Element|null}
 */
const ImageGalleryBlock = ({ title, images = [] }) => {
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
          const key = img?.id ?? `gallery-img-${i}`;

          return (
            <FlexboxGrid.Item className="mb-2" key={key} colspan={11}>
              <ClickableImg {...img} className="gallery-thumb" />
            </FlexboxGrid.Item>
          );
        })}
      </FlexboxGrid>
    </Panel>
  );
};

export default ImageGalleryBlock;
