/**
 * @file src\components\features\ResumePreview\ResumePreviewTrigger.jsx
 * @description src\components\features\ResumePreview\ResumePreviewTrigger module.
 * @module src\components\features\ResumePreview\ResumePreviewTrigger
 */

import { lazy, Suspense, useState } from "react";
import { Btn } from "components/ui/index.jsx";
import { ResumeDocument } from "./ResumeDocument.jsx";
import "./PreviewResume.css";

const ResumePreviewModal = lazy(() => import("./ResumePreviewModal.jsx"));

/**
 * @function ResumePreviewTrigger
 * @description Component that triggers the resume preview modal.
 * @param {Object} props - The properties object.
 * @param {string} props.buttonText - The text for the trigger button.
 * @param {string} props.title - The title of the resume preview.
 * @param {string} props.subtitle - The subtitle of the resume preview.
 * @param {Object} props.resume - The resume data object.
 * @param {string} props.downloadName - The name for the downloaded PDF file.
 * @param {string} props.buttonClassName - Additional class names for the trigger button.
 * @param {*} [props.icon] - Optional icon shown inside the trigger button.
 * @param {string} [props.tooltip] - Optional tooltip text for the trigger button.
 * @param {string} [props.ariaLabel] - Accessible label for the trigger button.
 * @param {string} [props.variant] - Optional visual variant passed through to Btn.
 * @param {string} [props.size] - Optional size variant passed through to Btn.
 * @param {boolean} [props.noBG] - Optional no-background treatment for icon-only triggers.
 * @returns {JSX.Element} The rendered trigger component.
 */
const ResumePreviewTrigger = ({
  buttonText = "Preview Resume",
  title = "Resume Preview",
  subtitle = "A cleaner, document-focused preview with real page proportions.",
  resume,
  downloadName = "resume.pdf",
  buttonClassName = "",
  icon,
  tooltip,
  ariaLabel,
  variant,
  size,
  noBG = false,
}) => {
  const [open, setOpen] = useState(false);
  const [shouldMountModal, setShouldMountModal] = useState(false);

  const handleOpen = () => {
    setShouldMountModal(true);
    setOpen(true);
  };

  return (
    <>
      <Btn
        text={buttonText}
        onClick={handleOpen}
        className={`resume-preview-trigger ${buttonClassName}`.trim()}
        icon={icon}
        tooltip={tooltip}
        ariaLabel={ariaLabel}
        variant={variant}
        size={size}
        noBG={noBG}
      />

      {shouldMountModal ? (
        <Suspense fallback={null}>
          <ResumePreviewModal
            open={open}
            onClose={() => setOpen(false)}
            title={title}
            subtitle={subtitle}
            downloadName={downloadName}
          >
            <ResumeDocument resume={resume} />
          </ResumePreviewModal>
        </Suspense>
      ) : null}
    </>
  );
};

export default ResumePreviewTrigger;
