import { useState } from "react";
import { Image, Modal, Placeholder } from "rsuite";
import "./styles.css";

/**
 * @file index.jsx
 * @fileoverview Clickable image component that expands into a frosted
 * modal viewer while preserving aspect ratio and accessibility.
 * @module components/ClickableImg
 */

/**
 * @public
 * @component
 * @name ClickableImg
 * @description A responsive image thumbnail that expands into a modal viewer when clicked. The modal maintains the image's aspect ratio and includes optional title and caption support. Designed with accessibility in mind, it requires alt text and applies appropriate aria-labels.
 *
 * Key behaviors:
 * - Renders a responsive image thumbnail using RSuite's Image component
 * - Clicking the thumbnail opens a modal viewer with a larger version of the image
 * - The modal can be closed by clicking the image again or pressing the ESC key
 * - Both thumbnail and modal images are lazy-loaded for performance
 * - The modal and image wrapper feature frosted glass styling consistent with the UI design system
 * - The modal scales responsively using max-width and max-height constraints to fit within the viewport
 *
 * Accessibility:
 * - Requires alt text for screen readers
 * - Applies aria-label to both thumbnail and modal image
 *
 * @param {object} props - Component props.
 * @param {string} props.src - Image source URL.
 * @param {string} props.alt - Alt text for accessibility.
 * @param {string} [props.ariaLabel] - Aria-label for accessibility.
 * @param {string} [props.className] - Additional CSS classes for the image.
 * @param {string} [props.title] - Optional modal header title.
 * @param {string} [props.caption] - Optional caption rendered with the image.
 * @returns {JSX.Element} Clickable image with modal viewer.
 *
 * @example
 * ```js
 * <ClickableImg
 * src="/images/project-screenshot.png"
 * alt="Screenshot of the project in action"
 * title="Project Screenshot"
 * caption="This screenshot shows the main dashboard of the application."
 * ariaLabel="Screenshot of the project in action, click to expand"
 * />
 * ```
 * In this example, the `ClickableImg` component renders a thumbnail of a project screenshot. When the user clicks on the image, it opens a modal viewer displaying a larger version of the screenshot along with the provided title and caption. The component ensures that all images are accessible and responsive across different devices.
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
  // console.log("Clickable image", { id, index, src, alt, title, caption });

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
