import { useState } from "react";
import { Modal } from "rsuite";
import { faFileLines, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Btn from "components/Btn";

// ✅ Import PDF as a Vite asset
import resumePdf from "assets/data/Kyle_Foster_React_Resume.pdf";

/**
 * @file index.jsx
 * @description Modal-based resume preview and download component.
 * @module components/ResumePreview
 */

/**
 * ResumePreview
 * ---------------------------------------------------------------------------
 * Frosted modal component that allows users to preview and download
 * the resume PDF.
 *
 * Core responsibilities:
 * - Opens a modal containing an embedded PDF preview
 * - Provides a direct download link for the resume
 * - Uses Vite asset imports to ensure correct bundling across environments
 *
 * Technical notes:
 * - PDF is imported as a Vite-managed asset
 * - Works consistently in local development and production builds
 * - Modal styling is shared via global utility classes
 *
 * Accessibility:
 * - RSuite Modal provides focus trapping and ESC-to-close behavior
 * - Buttons include descriptive aria-labels and tooltips
 * - Embedded iframe includes a fallback message
 *
 * @public
 * @component
 * @returns {JSX.Element} Rendered resume preview modal and trigger button.
 */
const ResumePreview = () => {
  const [open, setOpen] = useState(false);

  /**
   * Opens the resume preview modal.
   *
   * @returns {void}
   */
  const openModal = () => setOpen(true);

  /**
   * Closes the resume preview modal.
   *
   * @returns {void}
   */
  const closeModal = () => setOpen(false);

  return (
    <>
      {/* Trigger button */}
      <Btn
        text="View Resume"
        icon={faFileLines}
        variant="primary"
        size="lg"
        onClick={openModal}
        ariaLabel="Preview resume"
        tooltip="Preview resume"
      />

      {/* Modal */}
      <Modal open={open} onClose={closeModal} size="lg" backdrop="static" className="modal-glass">
        <Modal.Header>
          <Modal.Title>Kyle Foster — Resume</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body-pad text-center">
          <iframe src={resumePdf} title="Resume preview" className="modal-embed">
            <p>
              Your browser does not support embedded PDFs.
              <a href={resumePdf} target="_blank" rel="noopener noreferrer">
                Click here to download the resume.
              </a>
            </p>
          </iframe>
        </Modal.Body>

        <Modal.Footer className="modal-footer-row">
          <Btn
            text="Download"
            icon={faFilePdf}
            variant="primary"
            href={resumePdf}
            download
            ariaLabel="Download resume as a PDF"
            tooltip="Download resume"
          />

          <Btn
            text="Close"
            variant="secondary"
            onClick={closeModal}
            ariaLabel="Close resume preview"
            tooltip="Close resume preview"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResumePreview;
