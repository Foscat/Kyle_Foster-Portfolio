import { useState } from "react";
import "./styles.css";
import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { Image, Modal, Placeholder } from "rsuite";
import Btn from "components/Btn";

/**
 * @file index.jsx
 * @description Clickable image component that expands into a frosted
 * modal viewer while preserving aspect ratio and accessibility.
 * @module components/ClickableImg
 */

/**
 * ClickableImg — Frosted Modal Image Viewer
 * ------------------------------------------------------------
 * Renders a responsive image thumbnail that expands into a modal
 * (approximately 75–90% of viewport size) while maintaining aspect ratio.
 *
 * Features:
 * - Optional modal title
 * - Optional caption (beneath thumbnail and inside modal)
 * - Lazy-loaded thumbnail and modal image
 * - ESC-to-close behavior (handled by RSuite Modal)
 * - Frosted glass modal and image wrapper styling
 * - Fully responsive scaling using max-width / max-height constraints
 *
 * Accessibility:
 * - Requires alt text for screen readers
 * - Applies aria-label to both thumbnail and modal image
 *
 * @public
 * @component
 * @param {object} props - Component props.
 * @param {string} props.src - Image source URL.
 * @param {string} props.alt - Alt text for accessibility.
 * @param {string} [props.ariaLabel] - Aria-label for accessibility.
 * @param {string} [props.className] - Additional CSS classes for the image.
 * @param {string} [props.title] - Optional modal header title.
 * @param {string} [props.caption] - Optional caption rendered with the image.
 * @returns {JSX.Element} Clickable image with modal viewer.
 */
const ClickableImg = ({
  id = "clickable_img",
  index = 0,
  src = "../../assets/images/home/stem.jpg",
  alt = "Default alt text",
  className = "",
  title = "",
  caption = "",
  ariaLabel = "Clickable image, click to expand",
}) => {
  console.log("Clickable image", { id, index, src, alt, title, caption });

  /**
   * Local modal open/close state.
   * Controlled internally to keep usage simple for consumers.
   */
  const [open, setOpen] = useState(false);

  return (
    <div id={id} className="frosted-tile clickable-img-container">
      {/* Thumbnail (lazy-loaded) */}
      <Image
        id={`${id}-img-${index + 1}`}
        rounded
        src={src}
        alt={alt}
        title={title || alt}
        aria-label={ariaLabel}
        loading="lazy"
        placeholder={<Placeholder.Graph active />}
        className={`clickable-thumb interactive-surface glass-outline ${className}`}
        onClick={() => setOpen(true)}
      />

      {/* Optional caption beneath thumbnail */}
      {caption && <p className="img-caption text-center">{caption}</p>}

      {/* Modal viewer */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        overflow={false}
        backdrop="static"
        keyboard={true}
        className="frosted-modal"
        size="full"
      >
        {/* Modal header */}
        <Modal.Header className="frosted-modal-header flex-between">
          {title ? <Modal.Title>{title}</Modal.Title> : <div />}
        </Modal.Header>

        {/* Modal body */}
        <Modal.Body className="frosted-modal-body text-center">
          <div className="modal-img-wrapper">
            <img
              src={src}
              alt={alt}
              aria-label={ariaLabel}
              title={title || alt}
              loading="lazy"
              placeholder={<Placeholder.Graph active />}
              className={`glass-outline ${className} zoom-img`}
              onClick={() => setOpen(false)}
            />
          </div>
        </Modal.Body>

        {/* Modal footer */}
        <Modal.Footer className="flex-c">
          {caption && <p className="img-caption modal-caption">{caption}</p>}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClickableImg;
