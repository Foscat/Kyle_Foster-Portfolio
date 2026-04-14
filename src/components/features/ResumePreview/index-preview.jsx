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
 * @description A modal component that allows users to preview and download the resume PDF. It provides an embedded PDF viewer along with action buttons for opening the PDF in a new tab, printing, and closing the modal. The component is designed to work seamlessly in both development and production environments by leveraging Vite's asset management system.
 *
 * Core responsibilities:
 * - Opens a modal containing an embedded PDF preview
 * - Provides a direct download link for the resume
 * - Uses Vite asset imports to ensure correct bundling across environments
 *
 * Technical notes:
 * - PDF is imported as a Vite-managed asset
 * - Works consistently in local development and production builds
 * - Uses RSuite's ButtonToolbar for action buttons
 * - The embedded PDF viewer is implemented using an iframe for broad compatibility
 * - The component is styled to fit within the overall design system and maintain readability of the PDF content
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

const PreviewResume = ({
  title = "Resume Preview",
  subtitle = "Review the resume in a document-focused view.",
  onClose,
  onOpenPdf,
  onDownloadPdf,
  isDownloadPending = false,
  onPrint,
  pdfHref,
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
          {pdfHref && onOpenPdf ? (
            <Btn
              text="Open PDF"
              variant={Variant.SUBTLE}
              className="resume-preview__action resume-preview__action--open"
              onClick={onOpenPdf}
            />
          ) : null}

          {onDownloadPdf ? (
            <Btn
              text={isDownloadPending ? "Building PDF..." : "Download PDF"}
              variant={Variant.SUBTLE}
              className="resume-preview__action resume-preview__action--download"
              onClick={onDownloadPdf}
              ariaLabel={`Download ${downloadName}`}
              disabled={isDownloadPending}
              loading={isDownloadPending ? true : undefined}
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
