# indexPreviewComponent

- Source: `src/components/features/ResumePreview/index-preview.jsx`

# indexPreviewComponent

## components/ResumePreview/PreviewResume

Modal-based resume preview and download component.

### PreviewResume

A modal component that allows users to preview and download the resume PDF. It provides an embedded PDF viewer along with action buttons for opening the PDF in a new tab, printing, and closing the modal. The component is designed to work seamlessly in both development and production environments by leveraging Vite's asset management system.

Core responsibilities:
- Opens a modal containing an embedded PDF preview
- Provides a direct download link for the resume
- Uses Vite asset imports to ensure correct bundling across environments

Technical notes:
- PDF is imported as a Vite-managed asset
- Works consistently in local development and production builds
- Uses RSuite's ButtonToolbar for action buttons
- The embedded PDF viewer is implemented using an iframe for broad compatibility
- The component is styled to fit within the overall design system and maintain readability of the PDF content

Accessibility:
- RSuite Modal provides focus trapping and ESC-to-close behavior
- Buttons include descriptive aria-labels and tooltips
- Embedded iframe includes a fallback message

**Returns**

- `JSX.Element` - Rendered resume preview modal and trigger button.
