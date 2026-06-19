# fieldRegestryRenderer

- Source: `src/components/renderers/blocks/FormBlock/fieldRegestry.jsx`

# fieldRegestryRenderer

## src\\components\\renderers\\blocks\\FormBlock\\fieldRegestry

src\components\renderers\blocks\FormBlock\fieldRegestry module.

## components/renderers/blocks/FormBlock/fieldRegistry

Centralized registry and utilities for form field definitions in FormBlock.
This module defines standard accepters for various field types, normalization of field configs, and rendering logic to map field definitions to actual form controls.
The registry supports both simple field types that map directly to a single accepter component, as well as more complex types that require custom rendering logic (e.g., select fields with options, input groups with addons).
The normalization function allows for legacy field definitions to be used without breaking changes, while the initial values builder helps construct the default form state based on field configurations.

### SIMPLE\_ACCEPTORS

Mapping of simple field types to their default accepter components.
This is used for fields that don't require special handling beyond rendering the appropriate input type.

### TextareaAccepter()

Custom accepter for textarea fields. This is necessary because the default Input accepter from rsuite does not support multiline input, and we want to ensure that textarea fields render correctly with the appropriate styles and behavior.

The TextareaAccepter is a simple wrapper around the HTML <textarea> element, styled to fit within the form block. It accepts standard props like value and onChange, as well as additional props for rows and className to allow for customization.

**Parameters**

- `props` (`Object`)
- `props.value` (`string`) - The current value of the textarea, passed by Form.Control.
- `props.onChange` (`function`) - Change handler to call when the textarea value changes, passed by Form.Control.
- `props.className` (`string`, optional) - Optional additional class name(s) to apply to the textarea for custom styling.
- `props.rows` (`number`, optional, default: `5`) - Optional number of rows to display in the textarea. Defaults to 5 if not provided.

**Returns**

- `React.ReactNode`

### registerField()

Custom accepter for input groups with prefix/suffix addons. This is a common enough pattern that it warrants a built-in accepter to avoid boilerplate in field definitions.

The `inputGroup` prop on a field can be used to pass `prefix` and `suffix` values, which will be rendered as addons around the input.

**Parameters**

- `props` (`Object`)
- `props.value` (`string`) - The current value of the input, passed by Form.Control.
- `props.onChange` (`function`) - Change handler to call when the input value changes, passed by Form.Control.
- `props.prefix` (`string`, optional) - Optional text to display as a prefix addon.
- `props.suffix` (`string`, optional) - Optional text to display as a suffix addon.

**Returns**

- `React.ReactNode`

**Examples**

```js
{
  name: "price",
 type: FIELD_TYPES.INPUT_GROUP_TEXT,
 inputGroup: {
   prefix: "$",
  suffix: "USD"
}
}
```

### normalizeField()

Normalize legacy CMS field keys into the current schema.
This lets older content continue working while the schema evolves.

**Parameters**

- `field` (`Object`)

**Returns**

- `Object`

### buildInitialValues()

Build initial form values from field defaults.

**Parameters**

- `fields` (`Array<Object>`)

**Returns**

- `Object`

### registerField()

Registers a field in the registry. If a field with the same name already exists, it will be overwritten and a development-only warning will be emitted.

**Parameters**

- `field` (`Object`)

**Returns**

- `React.ReactNode`
