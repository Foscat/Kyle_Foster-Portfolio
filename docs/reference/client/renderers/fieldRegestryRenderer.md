# fieldRegestryRenderer

- Source: `src/components/renderers/blocks/FormBlock/fieldRegestry.jsx`

# fieldRegestryRenderer

## components/renderers/blocks/FormBlock/fieldRegestry

Native form-field registry for schema-driven portfolio forms.

### normalizeField()

Normalize legacy CMS field keys into the native form schema.

**Parameters**

- `field` (`Object`) - Raw field definition.

**Returns**

- `Object` - Normalized field definition.

### buildInitialValues()

Build initial values for every supported native field type.

**Parameters**

- `fields` (`Array<Object>`) - Normalized or raw field definitions.

**Returns**

- `Object` - Form value map keyed by field name.

### renderFieldControl()

Render a schema field as a native form control styled by ui-style-kit-css.

**Parameters**

- `field` (`Object`) - Normalized field definition.
- `value` (`any`) - Current controlled value.
- `onChange` (`function`) - Receives the next value and native change event.

**Returns**

- `React.ReactNode` - Native form control.

### readNativeValue()

Normalize a native input event into the value expected by FormBlock.

**Parameters**

- `event` (`React.ChangeEvent<(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)>`) - Native change event.
- `fieldType` (`string`) - Schema field type.

**Returns**

- `string | number | null` - Normalized field value.
