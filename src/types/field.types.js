/**
 * @file fieldSchema.js
 * @description Defines the schema and related types for form fields used in FormBlock.
 * This file is focused on the data structure and types for field configuration, independent of the registry logic.
 * It also includes a simple shim component to avoid importing RSuite's Form.Control directly in the registry file.
 * @author Foscat
 */

/// Simple shim component to avoid importing RSuite's Form.Control directly in the registry file, which can cause circular dependencies
const FIELD_TYPES = {
  TEXT: "text",
  TEXTAREA: "textarea",
  NUMBER: "number",
  SELECT: "select",
  CHECKBOX: "checkbox",
  CHECKBOX_GROUP: "checkboxGroup",
  RADIO_GROUP: "radioGroup",
  SLIDER: "slider",
  RANGE_SLIDER: "rangeSlider",
  DATE: "date",
  DATE_RANGE: "dateRange",
  DATE_INPUT: "dateInput",
  DATE_RANGE_INPUT: "dateRangeInput",
  INPUT_GROUP_TEXT: "inputGroupText",
};
Object.freeze(FIELD_TYPES);

export default FIELD_TYPES;

/**
 * @typedef {Object} FormFieldOption
 * @property {string} label - Human-readable option label.
 * @property {*} value - Stored value for the option.
 * @property {boolean} [disabled=false] - Whether this option is disabled.
 */

/**
 * @typedef {Object} InputGroupConfig
 * @property {string} [prefix] - Optional leading addon text.
 * @property {string} [suffix] - Optional trailing addon text.
 */

/**
 * @typedef {Object} FormFieldConfig
 * @property {string} name - Unique field name. Supports nested paths like `contact.email`.
 * @property {string} type - Field type. Prefer values from FIELD_TYPES.
 * @property {string} [label] - Visible label for the field.
 * @property {string} [helpText] - Optional helper copy shown below the field.
 * @property {string} [placeholder] - Placeholder text when supported.
 * @property {*} [defaultValue] - Initial field value.
 * @property {FormFieldOption[]} [options] - Option data for select, checkboxGroup, and radioGroup.
 * @property {boolean} [required=false] - Whether the field is required in the UI layer.
 * @property {boolean} [disabled=false] - Whether the field is disabled.
 * @property {boolean} [readOnly=false] - Whether the field is read-only.
 * @property {boolean} [hidden=false] - Whether the field is hidden.
 * @property {boolean} [block=true] - Whether picker-like controls should span full width.
 * @property {Object} [componentProps] - Props forwarded to the underlying RSuite control.
 * @property {Object} [rule] - Optional RSuite field-level validation rule.
 * @property {string} [errorPlacement="bottomStart"] - Error placement for Form.Control.
 * @property {boolean} [shouldResetWithUnmount=false] - Clear value if field unmounts conditionally.
 * @property {InputGroupConfig} [inputGroup] - Prefix/suffix config for inputGroupText fields.
 * @property {function(Object): boolean} [renderWhen] - Conditional render predicate.
 */

/**
 * @typedef {Object} FormBlockSchema
 * @property {string} [id] - Stable schema id.
 * @property {string} [title] - Optional panel title.
 * @property {string} [submitLabel="Submit"] - Submit button label.
 * @property {string} [resetLabel] - Optional reset button label.
 * @property {FormFieldConfig[]} fields - Array of field configuration objects.
 * @property {Object} [initialValues] - Optional initial form value override.
 */
