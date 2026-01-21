import { useState } from "react";
import "./styles.css";
import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { Image, Modal, Placeholder } from "rsuite";
import Btn from "components/Btn";

/**
 * ClickableImg — Frosted Modal Image Viewer
 * ------------------------------------------------------------
 * A responsive clickable image that expands into a modal
 * (75–90% viewport height/width) while maintaining aspect ratio.
 *
 * Features:
 * - Optional modal title
 * - Optional caption (beneath thumb + inside modal)
 * - Lazy-loaded thumbnail
 * - Close button (RSuite IconButton + Close icon)
 * - ESC-to-close (handled by RSuite Modal)
 * - Frosted glass modal and image wrapper
 * - Fully responsive scaling using max-width / max-height
 *
 * @component
 * @param {object} props
 * @param {string} props.src - Image source URL.
 * @param {string} props.alt - Alt text for accessibility.
 * @param {string} [props.ariaLabel] - Aria-label for accessibility.
 * @param {string} [props.className] - Additional CSS classes for thumbnail.
 * @param {string} [props.title] - Optional modal header title.
 * @param {string} [props.caption] - Optional caption below image.
 */
const ClickableImg = ({
  src = "../../assets/images/home/stem.jpg",
  alt = "Default alt text",
  className = "",
  title = "",
  caption = "",
  ariaLabel = "Clickable image, click to expand",
}) => {
  console.log("Clickable image", { src, alt, title, caption });
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail (lazy load) */}
      <Image
        rounded
        src={src}
        alt={alt}
        title={title || alt}
        aria-label={ariaLabel}
        loading="lazy"
        placeholder={<Placeholder.Graph active />}
        className={`clickable-thumb glass-outline ${className}`}
        onClick={() => setOpen(true)}
      />

      {/* Optional caption beneath thumbnail */}
      {caption && <p className="img-caption text-center">{caption}</p>}

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        overflow={false}
        backdrop="static"
        keyboard={true}
        className="frosted-modal"
        size="full"
      >
        {/* Header */}
        <Modal.Header className="frosted-modal-header flex-between">
          {title ? <Modal.Title>{title}</Modal.Title> : <div />}
        </Modal.Header>

        {/* Body */}
        <Modal.Body className="frosted-modal-body text-center">
          <div className="modal-img-wrapper">
            <Image
              rounded
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
        <Modal.Footer>
          {caption && <p className="img-caption modal-caption">{caption}</p>}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClickableImg;
