# indexPreviewComponent

- Source: `src/components/features/ResumePreview/index-preview.jsx`

# indexPreviewComponent

## components/ResumePreview/PreviewResume

Modal-based resume preview and download component.

### PreviewResume

A modal component that allows users to preview the resume and generate a PDF download from the rendered document. It provides actions for downloading, printing, and closing the modal.

Core responsibilities:
- Renders the live resume document in a print-focused preview
- Provides a generated PDF download action
- Keeps the preview and PDF export aligned with the shared resume data source

Technical notes:
- Uses RSuite's ButtonToolbar for action buttons
- The component is styled to fit within the overall design system and maintain readability of the PDF content

Accessibility:
- RSuite Modal provides focus trapping and ESC-to-close behavior
- Buttons include descriptive aria-labels and tooltips

**Returns**

- `JSX.Element` - Rendered resume preview modal and trigger button.
