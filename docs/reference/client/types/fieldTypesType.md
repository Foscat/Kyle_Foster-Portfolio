# fieldTypesType

- Source: `src/types/field.types.js`

# fieldTypesType

## FormFieldOption

- Type: `Object`

**Properties**

- `label` (`string`) - Human-readable option label.
- `value` (`any`) - Stored value for the option.
- `disabled` (`boolean`, optional, default: `false`) - Whether this option is disabled.

## InputGroupConfig

- Type: `Object`

**Properties**

- `prefix` (`string`, optional) - Optional leading addon text.
- `suffix` (`string`, optional) - Optional trailing addon text.

## FormFieldConfig

- Type: `Object`

**Properties**

- `name` (`string`) - Unique field name. Supports nested paths like `contact.email`.
- `type` (`string`) - Field type. Prefer values from FIELD_TYPES.
- `label` (`string`, optional) - Visible label for the field.
- `helpText` (`string`, optional) - Optional helper copy shown below the field.
- `placeholder` (`string`, optional) - Placeholder text when supported.
- `defaultValue` (`any`, optional) - Initial field value.
- `options` (`Array<FormFieldOption>`, optional) - Option data for select, checkboxGroup, and radioGroup.
- `required` (`boolean`, optional, default: `false`) - Whether the field is required in the UI layer.
- `disabled` (`boolean`, optional, default: `false`) - Whether the field is disabled.
- `readOnly` (`boolean`, optional, default: `false`) - Whether the field is read-only.
- `hidden` (`boolean`, optional, default: `false`) - Whether the field is hidden.
- `block` (`boolean`, optional, default: `true`) - Whether picker-like controls should span full width.
- `componentProps` (`Object`, optional) - Props forwarded to the underlying RSuite control.
- `rule` (`Object`, optional) - Optional RSuite field-level validation rule.
- `errorPlacement` (`string`, optional, default: `"bottomStart"`) - Error placement for Form.Control.
- `shouldResetWithUnmount` (`boolean`, optional, default: `false`) - Clear value if field unmounts conditionally.
- `inputGroup` (`InputGroupConfig`, optional) - Prefix/suffix config for inputGroupText fields.
- `renderWhen` (`function`, optional) - Conditional render predicate.

## FormBlockSchema

- Type: `Object`

**Properties**

- `id` (`string`, optional) - Stable schema id.
- `title` (`string`, optional) - Optional panel title.
- `submitLabel` (`string`, optional, default: `"Submit"`) - Submit button label.
- `resetLabel` (`string`, optional) - Optional reset button label.
- `fields` (`Array<FormFieldConfig>`) - Array of field configuration objects.
- `initialValues` (`Object`, optional) - Optional initial form value override.
