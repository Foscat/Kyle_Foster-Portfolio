import React, { useState } from "react";
import { Modal } from "rsuite";
import Btn from "components/Btn";
import "./ResumePreview.css";

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
        icon="file-lines"
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
          <a
            href="../../assets/data/Kyle Foster - Resume.pdf"
            download="Kyle_Foster_Resume.pdf"
          >
            <Btn
              text="Download"
              icon="file-pdf"
              variant="primary"
            />
          </a>

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
