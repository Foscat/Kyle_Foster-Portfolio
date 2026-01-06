import { useState } from "react";
import "./ResumePreview.css";
import { faFileLines, faFilePdf } from "@fortawesome/free-solid-svg-icons";

/**
 * ResumePreview
 * ------------------------------------------------------------
 * Frosted modal that previews the resume PDF and allows download.
 *
 * Features:
 * - RSuite Modal (ESC, focus trap, accessibility)
 * - Embedded PDF preview
 * - Download CTA
 * - Uses existing frosted UI + Btn component
 */
const ResumePreview = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      <Btn
        text="View Resume"
        icon={faFileLines}
        variant="primary"
        size="lg"
        onClick={() => setOpen(true)}
        ariaLabel="Preview resume"
      />

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size="lg"
        className="resume-modal"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Kyle Foster — Resume</Modal.Title>
        </Modal.Header>

        <Modal.Body className="resume-modal-body">
          <iframe
            src="../../assets/data/Kyle Foster - Resume.pdf"
            title="Resume preview"
            className="resume-iframe"
          />
        </Modal.Body>

        <Modal.Footer className="resume-modal-footer">
          <Btn
            text="Download"
            icon={faFilePdf}
            variant="primary"
            download={true}
            href="../../assets/data/Kyle_Foster_React_Resume.pdf"
            tooltip="Download as a PDF"
          />

          <Btn
            text="Close"
            variant="secondary"
            onClick={() => setOpen(false)}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResumePreview;
