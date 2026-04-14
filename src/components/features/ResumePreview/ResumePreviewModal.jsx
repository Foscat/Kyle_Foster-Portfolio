/**
 * @module src\components\features\ResumePreview\ResumePreviewModal
 * @file ResumePreviewModal.jsx
 * @description Modal component for previewing the resume with print and download options.
 */

import { useCallback, useRef, useState } from "react";
import { Modal } from "rsuite";
import PreviewResume from "./index-preview.jsx";
import { downloadResumePdf } from "./resumePdfExport.js";
import "./PreviewResume.css";

const PRINT_EXPORT_CLASS = "resume-preview__paper--print-export";

/**
 * @function collectDocumentStyles
 * @description Collects all styles from the current document to ensure that the print preview has consistent styling. This function gathers both inline styles and linked stylesheets, concatenating their outer HTML into a single string that can be injected into the print preview document.
 * @returns {string} A concatenated string of all styles from the current document, used for ensuring consistent styling in the print preview.
 */
function collectDocumentStyles() {
  return Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((node) => node.outerHTML)
    .join("\n");
}

/**
 * @function PreviewResumeModal
 * @description Modal component for previewing the resume with print and download options.
 * @param {Object} props - The properties object.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {Function} props.onClose - Function to call when the modal is closed.
 * @param {string} props.title - The title of the resume.
 * @param {string} props.subtitle - The subtitle of the resume.
 * @param {string} props.pdfHref - The URL of the PDF version of the resume.
 * @param {string} props.downloadName - The name for the downloaded PDF file.
 * @param {React.ReactNode} props.children - The content of the modal.
 * @returns {JSX.Element} The rendered modal component.
 */
const PreviewResumeModal = ({
  open,
  onClose,
  title,
  subtitle,
  pdfHref,
  downloadName,
  children,
}) => {
  const printableRef = useRef(null);
  const [isDownloadPending, setIsDownloadPending] = useState(false);

  const handleOpenPdf = useCallback(() => {
    if (!pdfHref) return;
    window.open(pdfHref, "_blank");
  }, [pdfHref]);

  const handleDownloadPdf = useCallback(async () => {
    const resumePaper = printableRef.current?.querySelector(".resume-preview__paper");

    if (resumePaper instanceof HTMLElement) {
      const hadPrintExportClass = resumePaper.classList.contains(PRINT_EXPORT_CLASS);
      setIsDownloadPending(true);
      try {
        // Match print output styles without mutating global app theme state.
        if (!hadPrintExportClass) {
          resumePaper.classList.add(PRINT_EXPORT_CLASS);
        }

        await new Promise((resolve) => {
          window.requestAnimationFrame(() => resolve());
        });

        await downloadResumePdf(resumePaper, {
          fileName: downloadName || "resume.pdf",
        });
        return;
      } catch (error) {
        if (!pdfHref) {
          console.error("[ResumePreviewModal] Unable to generate PDF from preview.", error);
          return;
        }
      } finally {
        if (!hadPrintExportClass) {
          resumePaper.classList.remove(PRINT_EXPORT_CLASS);
        }

        setIsDownloadPending(false);
      }
    }

    if (!pdfHref) return;

    const response = await fetch(pdfHref, { credentials: "same-origin" });
    if (!response.ok) {
      throw new Error(`Failed to download resume PDF: ${response.status}`);
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = objectUrl;
    anchor.download = downloadName || "resume.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  }, [downloadName, pdfHref]);

  const handlePrint = useCallback(() => {
    if (!printableRef.current) return;

    const printWindow = window.open("about:blank", "_blank", "width=1200,height=900");

    if (!printWindow) return;

    const styles = collectDocumentStyles();
    const markup = printableRef.current.innerHTML;
    const palette = document.documentElement.dataset.palette;
    const safePalette = /^[a-z-]+$/i.test(palette || "") ? palette : "ocean";

    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html lang="en" data-theme="light" data-palette="${safePalette}">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${title || "Resume Preview"}</title>
          ${styles}
          <style>
            html, body {
              margin: 0;
              padding: 0;
              background: transparent !important;
              -webkit-print-color-adjust: economy;
              print-color-adjust: economy;
            }

            body::before,
            body::after {
              content: none !important;
              display: none !important;
            }

            .resume-preview__shell {
              min-height: auto !important;
              padding: 0 !important;
              background: transparent !important;
              background-image: none !important;
              border: 0 !important;
              box-shadow: none !important;
            }

            .resume-preview__toolbar,
            .resume-preview__eyebrow,
            .resume-preview__subtitle,
            .resume-preview__actions {
              display: none !important;
            }

            .resume-preview__viewport {
              padding: 0 !important;
              min-height: auto !important;
              background: transparent !important;
              background-image: none !important;
              border: 0 !important;
            }

            .resume-preview__paper {
              width: 100% !important;
              max-width: none !important;
              min-height: auto !important;
              margin: 0 !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              border: 0 !important;
              background: transparent !important;
              background-image: none !important;
            }

            .resume-document,
            .resume-document * {
              background: transparent !important;
              background-image: none !important;
              box-shadow: none !important;
            }

            @page {
              size: auto;
              margin: 0.5in;
            }
          </style>
        </head>
        <body>${markup}</body>
      </html>
    `);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  }, [title]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="full"
      className="resume-preview-modal"
      overflow={false}
    >
      <Modal.Body className="resume-preview-modal__body">
        <div ref={printableRef}>
          <PreviewResume
            title={title}
            subtitle={subtitle}
            onClose={onClose}
            onOpenPdf={handleOpenPdf}
            onDownloadPdf={handleDownloadPdf}
            isDownloadPending={isDownloadPending}
            onPrint={handlePrint}
            pdfHref={pdfHref}
            downloadName={downloadName}
          >
            {children}
          </PreviewResume>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PreviewResumeModal;
