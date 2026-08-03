/**
 * @file index.jsx
 * @description Accessible video content block for self-hosted product demonstrations.
 * @module components/renderers/blocks/VideoBlock
 */

import { Panel } from "rsuite";
import "./styles.css";

/**
 * Renders a self-hosted product demonstration with browser-native controls.
 *
 * @param {object} props - Declarative video block fields.
 * @param {object} [props.block] - Optional nested block payload.
 * @param {string} [props.id] - DOM anchor for section navigation.
 * @param {string} [props.title] - Collapsible panel title.
 * @param {string} [props.src] - Bundled or public media source.
 * @param {string} [props.mimeType="video/mp4"] - Source MIME type.
 * @param {string} [props.caption] - Visible context below the media.
 * @param {string} [props.ariaLabel] - Accessible name for the video element.
 * @returns {JSX.Element|null} The video block when a source is available.
 */
const VideoBlock = (props = {}) => {
  const block = props.block ?? props;
  const {
    id,
    title,
    src,
    mimeType = "video/mp4",
    caption,
    ariaLabel = title || "Product demonstration video",
  } = block;

  if (typeof src !== "string" || !src.trim()) return null;

  return (
    <Panel
      id={id}
      collapsible
      defaultExpanded
      header={title ? <span className="block-header">{title}</span> : undefined}
      role="region"
      aria-label={title || ariaLabel}
      className="video-block blue-tile block scroll-anchor"
    >
      <figure className="video-block__figure">
        <video
          className="video-block__media"
          controls
          playsInline
          preload="metadata"
          aria-label={ariaLabel}
        >
          <source data-testid="video-source" src={src} type={mimeType} />
          Your browser does not support embedded MP4 video.
        </video>
        {caption ? <figcaption className="video-block__caption">{caption}</figcaption> : null}
      </figure>
    </Panel>
  );
};

export default VideoBlock;
