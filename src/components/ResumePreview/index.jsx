import { useState } from "react";
import { Modal } from "rsuite";
import { faFileLines, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Btn from "components/Btn";

// ✅ Import PDF as a Vite asset
import resumePdf from "assets/data/Kyle_Foster_React_Resume.pdf";

/**
 * ResumePreview
 * ---------------------------------------------------------------------------
 * Frosted modal that previews and downloads the resume PDF.
 *
 * Technical notes:
 * - PDF is imported as a Vite asset to ensure correct bundling and deployment
 * - Works in local dev, production builds, and on Render
 * - Uses shared modal utility classes defined in App.css
 *
 * Accessibility:
 * - RSuite Modal provides focus trap and ESC handling
 * - Buttons include aria-labels and tooltips
 *
 * @component
 * @returns {JSX.Element}
 */
const ResumePreview = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
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
