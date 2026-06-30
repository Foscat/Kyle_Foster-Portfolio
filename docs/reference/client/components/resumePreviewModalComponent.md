# resumePreviewModalComponent

- Source: `src/components/features/ResumePreview/ResumePreviewModal.jsx`

# resumePreviewModalComponent

## collectDocumentStyles()

Collects all styles from the current document to ensure that the print preview has consistent styling. This function gathers both inline styles and linked stylesheets, concatenating their outer HTML into a single string that can be injected into the print preview document.

**Returns**

- `string` - A concatenated string of all styles from the current document, used for ensuring consistent styling in the print preview.

## PreviewResumeModal()

Modal component for previewing the resume with print and download options.

**Parameters**

- `props` (`Object`) - The properties object.
- `props.open` (`boolean`) - Whether the modal is open.
- `props.onClose` (`function`) - Function to call when the modal is closed.
- `props.title` (`string`) - The title of the resume.
- `props.subtitle` (`string`) - The subtitle of the resume.
- `props.downloadName` (`string`) - The name for the downloaded PDF file.
- `props.children` (`React.ReactNode`) - The content of the modal.

**Returns**

- `JSX.Element` - The rendered modal component.
