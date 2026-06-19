/**
 * @file index-preview.jsx
 * @description Modal-based resume preview and download component.
 * @module components/ResumePreview/PreviewResume
 */

import { Btn } from "components/ui";
import { ButtonToolbar } from "rsuite";
import { Variant } from "types/ui.types";

/**
 * @name PreviewResume
 * @description A modal component that allows users to preview the resume and generate a PDF download from the rendered document. It provides actions for downloading, printing, and closing the modal.
 *
 * Core responsibilities:
 * - Renders the live resume document in a print-focused preview
 * - Provides a generated PDF download action
 * - Keeps the preview and PDF export aligned with the shared resume data source
 *
 * Technical notes:
 * - Uses RSuite's ButtonToolbar for action buttons
 * - The component is styled to fit within the overall design system and maintain readability of the PDF content
 *
 * Accessibility:
 * - RSuite Modal provides focus trapping and ESC-to-close behavior
 * - Buttons include descriptive aria-labels and tooltips
 *
 * @public
 * @component
 * @returns {JSX.Element} Rendered resume preview modal and trigger button.
 */

const PreviewResume = ({
  title = "Resume Preview",
  subtitle = "Review the resume in a document-focused view.",
  onClose,
  onDownloadPdf,
  isDownloadPending = false,
  onPrint,
  downloadName = "resume.pdf",
  children,
}) => {
  return (
    <section className="resume-preview__shell">
      <div className="resume-preview__toolbar">
        <div className="resume-preview__heading">
          <p className="resume-preview__eyebrow">Document Preview</p>
          <h2 className="resume-preview__title">{title}</h2>
          {subtitle ? <p className="resume-preview__subtitle">{subtitle}</p> : null}
        </div>

        <ButtonToolbar className="resume-preview__actions">
          {onDownloadPdf ? (
            <Btn
              text={isDownloadPending ? "Building PDF..." : "Download PDF"}
              variant={Variant.SUBTLE}
              className="resume-preview__action resume-preview__action--download"
              onClick={onDownloadPdf}
              ariaLabel={`Download ${downloadName}`}
              disabled={isDownloadPending}
              loading={isDownloadPending}
            />
          ) : null}

          <Btn
            text="Print"
            variant={Variant.SUBTLE}
            className="resume-preview__action"
            onClick={onPrint}
          />

          <Btn
            text="Close"
            className="resume-preview__action resume-preview__action--close"
            onClick={onClose}
            variant={Variant.SUBTLE}
          />
        </ButtonToolbar>
      </div>

      <div className="resume-preview__viewport">
        <article className="resume-preview__paper">{children}</article>
      </div>
    </section>
  );
};

export default PreviewResume;
