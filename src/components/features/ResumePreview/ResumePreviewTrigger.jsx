/**
 * @file src\components\features\ResumePreview\ResumePreviewTrigger.jsx
 * @description src\components\features\ResumePreview\ResumePreviewTrigger module.
 * @module src\components\features\ResumePreview\ResumePreviewTrigger
 */

import { useState } from "react";
import ResumePreviewModal from "./ResumePreviewModal.jsx";
import { Btn } from "components/ui/index.jsx";
import { ResumeDocument } from "./ResumeDocument.jsx";

/**
 * @function ResumePreviewTrigger
 * @description Component that triggers the resume preview modal.
 * @param {Object} props - The properties object.
 * @param {string} props.buttonText - The text for the trigger button.
 * @param {string} props.title - The title of the resume preview.
 * @param {string} props.subtitle - The subtitle of the resume preview.
 * @param {Object} props.resume - The resume data object.
 * @param {string} props.pdfHref - The URL of the PDF version of the resume.
 * @param {string} props.downloadName - The name for the downloaded PDF file.
 * @param {string} props.buttonClassName - Additional class names for the trigger button.
 * @param {*} [props.icon] - Optional icon shown inside the trigger button.
 * @param {string} [props.tooltip] - Optional tooltip text for the trigger button.
 * @param {string} [props.ariaLabel] - Accessible label for the trigger button.
 * @param {string} [props.variant] - Optional visual variant passed through to Btn.
 * @param {string} [props.size] - Optional size variant passed through to Btn.
 * @returns {JSX.Element} The rendered trigger component.
 */
const ResumePreviewTrigger = ({
  buttonText = "Preview Resume",
  title = "Resume Preview",
  subtitle = "A cleaner, document-focused preview with real page proportions.",
  resume,
  pdfHref,
  downloadName = "resume.pdf",
  buttonClassName = "",
  icon,
  tooltip,
  ariaLabel,
  variant,
  size,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Btn
        text={buttonText}
        onClick={() => setOpen(true)}
        className={`resume-preview-trigger ${buttonClassName}`.trim()}
        icon={icon}
        tooltip={tooltip}
        ariaLabel={ariaLabel}
        variant={variant}
        size={size}
      />

      <ResumePreviewModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        subtitle={subtitle}
        pdfHref={pdfHref}
        downloadName={downloadName}
      >
        <ResumeDocument resume={resume} />
      </ResumePreviewModal>
    </>
  );
};

export default ResumePreviewTrigger;
