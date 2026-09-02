# srcComponentsUiDialogIndexUi

- Source: `src/components/ui/Dialog/index.jsx`

# srcComponentsUiDialogIndexUi

## components/ui/Dialog

Accessible native dialog primitive used by portfolio features.

### Dialog()

Render an accessible modal using the platform dialog element.

**Parameters**

- `props` (`Object`) - Dialog configuration.
- `props.open` (`boolean`) - Whether the dialog is visible.
- `props.onClose` (`function`, optional) - Close request handler.
- `props.ariaLabel` (`string`, optional) - Accessible label for titleless dialogs.
- `props.size` (`"sm" | "md" | "lg" | "full"`, optional, default: `"md"`) - Dialog size contract.
- `props.backdrop` (`"static" | boolean`, optional, default: `true`) - Backdrop dismissal behavior.
- `props.keyboard` (`boolean`, optional, default: `true`) - Whether Escape requests closure.
- `props.className` (`string`, optional, default: `""`) - Additional dialog classes.
- `props.children` (`React.ReactNode`) - Dialog content.

**Returns**

- `JSX.Element` - Native dialog element.

### handleCancel()

Forward the native cancel event through the controlled close callback.

**Parameters**

- `event` (`React.SyntheticEvent<HTMLDialogElement>`) - Native dialog cancel event.

**Returns**

- `void`

### handleBackdropClick()

Close on a direct backdrop click while preserving static dialogs.

**Parameters**

- `event` (`React.MouseEvent<HTMLDialogElement>`) - Native pointer event.

**Returns**

- `void`

### DialogHeader()

Render a dialog header and its native close control.

**Parameters**

- `props` (`Object`) - Header configuration.
- `props.closeButton` (`boolean`, optional, default: `true`) - Whether to render the close button.
- `props.className` (`string`, optional, default: `""`) - Additional header classes.
- `props.children` (`React.ReactNode`) - Header content.

**Returns**

- `JSX.Element` - Dialog header.

### DialogTitle()

Render the accessible title associated with the parent dialog.

**Parameters**

- `props` (`Object`) - Title configuration.
- `props.className` (`string`, optional, default: `""`) - Additional title classes.
- `props.children` (`React.ReactNode`) - Title content.

**Returns**

- `JSX.Element` - Dialog heading.

### DialogBody()

Render the scrollable dialog body.

**Parameters**

- `props` (`Object`) - Body configuration.
- `props.className` (`string`, optional, default: `""`) - Additional body classes.
- `props.children` (`React.ReactNode`) - Body content.

**Returns**

- `JSX.Element` - Dialog body.

### DialogFooter()

Render the dialog action footer.

**Parameters**

- `props` (`Object`) - Footer configuration.
- `props.className` (`string`, optional, default: `""`) - Additional footer classes.
- `props.children` (`React.ReactNode`) - Footer content.

**Returns**

- `JSX.Element` - Dialog footer.

## handleWindowKeyDown()

Close the active dialog when Escape is pressed anywhere within the window.
This keeps keyboard dismissal reliable when focus is moved by native dialog
behavior, an embedded control, or a browser accessibility feature.

**Parameters**

- `event` (`KeyboardEvent`) - Window keyboard event.

**Returns**

- `void`
