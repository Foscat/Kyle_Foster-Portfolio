# srcComponentsRenderersBlocksFormblockIndexRenderer

- Source: `src/components/renderers/blocks/FormBlock/index.jsx`

# srcComponentsRenderersBlocksFormblockIndexRenderer

## components/renderers/blocks/FormBlock

Schema-driven native form block styled by the shared STE CSS libraries.

### FormBlock()

Render a controlled native form from CMS-compatible field definitions.

**Parameters**

- `props` (`Object`) - Form block configuration.
- `props.className` (`string`, optional, default: `""`) - Additional wrapper classes.
- `props.schema` (`Object`) - Form title, labels, fields, and initial values.
- `props.fluid` (`boolean`, optional, default: `true`) - Enables the full-width form layout.
- `props.layout` (`"vertical" | "horizontal" | "inline"`, optional, default: `"vertical"`) - Layout variant.
- `props.disabled` (`boolean`, optional, default: `false`) - Disables all controls.
- `props.readOnly` (`boolean`, optional, default: `false`) - Makes all compatible controls read-only.
- `props.onChange` (`function`, optional) - Receives the complete value map after changes.
- `props.onSubmit` (`function`, optional) - Receives the complete value map on submit.

**Returns**

- `JSX.Element | null` - Native schema form or null for an empty schema.

### handleFieldChange()

Update one controlled field and publish the complete value map.

**Parameters**

- `name` (`string`) - Field name.
- `value` (`any`) - Normalized native control value.
- `event` (`React.ChangeEvent`) - Native change event.

**Returns**

- `void`

### handleSubmit()

Prevent document navigation and submit the current controlled values.

**Parameters**

- `event` (`React.FormEvent<HTMLFormElement>`) - Native submit event.

**Returns**

- `void`

### handleReset()

Reset the controlled form to its schema-derived initial values.
