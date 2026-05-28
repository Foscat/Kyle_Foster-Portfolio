/**
 * @file src\components\renderers\blocks\ImageTextSplitBlock\index.jsx
 * @description src\components\renderers\blocks\ImageTextSplitBlock\index module.
 * @module src\components\renderers\blocks\ImageTextSplitBlock\index
 */

import { Panel } from "rsuite";
import { RichText } from "components/renderers";
import "./styles.css";

/**
 * @public
 * @component
 * @name ImageTextSplitBlock
 * @description Renders a magazine-style float layout where rich text wraps around a single image.
 * On tablet and desktop the image floats left or right at roughly one-third width so the text
 * flows naturally around it. On mobile the float is cleared and the image stacks above the text
 * regardless of the imagePosition setting.
 * @param {object} props - Component props.
 * @param {string} [props.id] - DOM id assigned to the panel container.
 * @param {string} [props.title] - Optional heading displayed in the panel header.
 * @param {FeatureImage} props.image - Single image metadata.
 * @param {"left"|"right"} [props.imagePosition="left"] - Float side on tablet and desktop.
 * @param {boolean} [props.showCaption=false] - Render the image caption when true. Reserved for
 *   future use cases; captions are hidden by default to keep the layout clean.
 * @param {RichTextNode[]|string[]} props.content - Rich text nodes that wrap around the image.
 * @returns {JSX.Element|null} Float-layout image/text panel or null when required data is missing.
 */
const ImageTextSplitBlock = (props = {}) => {
  const block = props.block ?? props;
  const { id, title, image, imagePosition = "left", showCaption = false, content = [] } = block;

  if (!image?.src || !Array.isArray(content) || content.length === 0) {
    return null;
  }

  const positionClass = imagePosition === "right" ? "image-right" : "image-left";
  const imageAlt = image.alt || image.title || "Profile photo";

  return (
    <Panel
      id={id}
      collapsible
      defaultExpanded
      header={title ? <span className="block-header">{title}</span> : undefined}
      role="region"
      aria-label={title}
      className="blue-tile block scroll-anchor image-text-split-block"
    >
      <div className={`image-text-split-layout ${positionClass}`}>
        <figure className="image-text-split-media">
          <img src={image.src} alt={imageAlt} className="image-text-split-img" loading="lazy" />
          {showCaption && image.caption ? (
            <figcaption className="image-text-split-caption">{image.caption}</figcaption>
          ) : null}
        </figure>
        {content.map((node, index) => (
          <RichText key={`split-${id || "block"}-${index}`} text={node} index={index} />
        ))}
      </div>
    </Panel>
  );
};

export default ImageTextSplitBlock;
