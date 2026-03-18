import React from "react";
import {
  Input,
  InputNumber,
  Checkbox,
  CheckboxGroup,
  Slider,
  SelectPicker,
  InputGroup,
  Radio,
  RadioGroup,
  RangeSlider,
  DateInput,
  DatePicker,
  DateRangeInput,
  DateRangePicker,
} from "rsuite";
import FIELD_TYPES from "types/field.types.js";

/**
 * @file fieldRegistry.js
 * @description
 * Centralized registry and utilities for form field definitions in FormBlock.
 * This module defines standard accepters for various field types, normalization of field configs, and rendering logic to map field definitions to actual form controls.
 * The registry supports both simple field types that map directly to a single accepter component, as well as more complex types that require custom rendering logic (e.g., select fields with options, input groups with addons).
 * The normalization function allows for legacy field definitions to be used without breaking changes, while the initial values builder helps construct the default form state based on field configurations.
 *
 * @module components/renderers/blocks/FormBlock/fieldRegistry
 * @author Foscat
 * @see FIELD_TYPES for the list of supported field types.
 */

/**
 * @public
 * @function TextareaAccepter
 * @description
 * Custom accepter for textarea fields. This is necessary because the default Input accepter from rsuite does not support multiline input, and we want to ensure that textarea fields render correctly with the appropriate styles and behavior.
 *
 * The TextareaAccepter is a simple wrapper around the HTML <textarea> element, styled to fit within the form block. It accepts standard props like value and onChange, as well as additional props for rows and className to allow for customization.
 * @param {Object} props
 * @param {string} props.value - The current value of the textarea, passed by Form.Control.
 * @param {function} props.onChange - Change handler to call when the textarea value changes, passed by Form.Control.
 * @param {string} [props.className] - Optional additional class name(s) to apply to the textarea for custom styling.
 * @param {number} [props.rows=5] - Optional number of rows to display in the textarea. Defaults to 5 if not provided.
 * @return {React.ReactNode}
 *
 * @summary
 * This component is designed to be used as a custom accepter in the form field registry. It renders a textarea element with appropriate styling and behavior for multiline input. The value and onChange props are passed through to allow it to work seamlessly with Form.Control, while additional props like className and rows provide flexibility for different use cases.
 */
export const TextareaAccepter = React.forwardRef(function TextareaAccepter(
  { value, onChange, rows = 5, className = "", ...rest },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={`rs-input form-block__textarea ${className}`.trim()}
      rows={rows}
      value={value ?? ""}
      onChange={(event) => onChange?.(event.target.value, event)}
      {...rest}
    />
  );
});

/**
 * @public
 * @function registerField
 * @description
 * Custom accepter for input groups with prefix/suffix addons. This is a common enough pattern that it warrants a built-in accepter to avoid boilerplate in field definitions.
 *
 * The `inputGroup` prop on a field can be used to pass `prefix` and `suffix` values, which will be rendered as addons around the input.
 *
 * @example
 * {
 *   name: "price",
 *  type: FIELD_TYPES.INPUT_GROUP_TEXT,
 *  inputGroup: {
 *    prefix: "$",
 *   suffix: "USD"
 * }
 * }
 * @param {Object} props
 * @param {string} props.value - The current value of the input, passed by Form.Control.
 * @param {function} props.onChange - Change handler to call when the input value changes, passed by Form.Control.
 * @param {string} [props.prefix] - Optional text to display as a prefix addon.
 * @param {string} [props.suffix] - Optional text to display as a suffix addon.
 * @returns {React.ReactNode}
 *
 * @summary
 * This component is designed to be used as a custom accepter in the form field registry. It renders an Input wrapped in an InputGroup, with optional prefix and suffix addons. The value and onChange props are passed through to the Input, allowing it to work seamlessly with Form.Control.
 *
 * @see FIELD_TYPES.INPUT_GROUP_TEXT
 */
export const InputGroupTextAccepter = React.forwardRef(function InputGroupTextAccepter(
  { value, onChange, prefix, suffix, ...rest },
  ref
) {
  return (
    <InputGroup inside className="form-block__input-group">
      {prefix ? <InputGroup.Addon>{prefix}</InputGroup.Addon> : null}
      <Input ref={ref} value={value ?? ""} onChange={onChange} {...rest} />
      {suffix ? <InputGroup.Addon>{suffix}</InputGroup.Addon> : null}
    </InputGroup>
  );
});

/**
 * @public
 * @constant SIMPLE_ACCEPTORS
 * @description
 * Mapping of simple field types to their default accepter components.
 * This is used for fields that don't require special handling beyond rendering the appropriate input type.
 */
export const SIMPLE_ACCEPTORS = {
  [FIELD_TYPES.TEXT]: Input,
  [FIELD_TYPES.NUMBER]: InputNumber,
  [FIELD_TYPES.SLIDER]: Slider,
  [FIELD_TYPES.RANGE_SLIDER]: RangeSlider,
  [FIELD_TYPES.DATE]: DatePicker,
  [FIELD_TYPES.DATE_RANGE]: DateRangePicker,
  [FIELD_TYPES.DATE_INPUT]: DateInput,
  [FIELD_TYPES.DATE_RANGE_INPUT]: DateRangeInput,
  [FIELD_TYPES.TEXTAREA]: TextareaAccepter,
};

/**
 * @public
 * @function normalizeField
 * @description
 * Normalize legacy CMS field keys into the current schema.
 * This lets older content continue working while the schema evolves.
 *
 * @param {Object} field
 * @returns {Object}
 */
export function normalizeField(field = {}) {
  const normalizedType = field.type || field.inputType || FIELD_TYPES.TEXT;

  return {
    name: field.name || "",
    type: normalizedType,
    label: field.label || "",
    helpText: field.helpText || "",
    placeholder: field.placeholder || "",
    defaultValue: field.defaultValue !== undefined ? field.defaultValue : field.value,
    options: Array.isArray(field.options) ? field.options : [],
    required: Boolean(field.required),
    disabled: Boolean(field.disabled),
    readOnly: Boolean(field.readOnly),
    hidden: Boolean(field.hidden),
    block: field.block !== false,
    componentProps: field.componentProps || {},
    rule: field.rule,
    errorPlacement: field.errorPlacement || "bottomStart",
    shouldResetWithUnmount: Boolean(field.shouldResetWithUnmount),
    inputGroup: field.inputGroup || {},
    renderWhen: typeof field.renderWhen === "function" ? field.renderWhen : null,
    checkboxLabel: field.checkboxLabel,
    ...field,
  };
}

/**
 * @public
 * @function buildInitialValues
 * @description
 * Build initial form values from field defaults.
 *
 * @param {Array<Object>} fields
 * @returns {Object}
 */
export function buildInitialValues(fields = []) {
  const fallbackByType = {
    [FIELD_TYPES.TEXT]: "",
    [FIELD_TYPES.TEXTAREA]: "",
    [FIELD_TYPES.NUMBER]: null,
    [FIELD_TYPES.SELECT]: null,
    [FIELD_TYPES.CHECKBOX]: false,
    [FIELD_TYPES.CHECKBOX_GROUP]: [],
    [FIELD_TYPES.RADIO_GROUP]: null,
    [FIELD_TYPES.SLIDER]: 0,
    [FIELD_TYPES.RANGE_SLIDER]: [0, 100],
    [FIELD_TYPES.DATE]: null,
    [FIELD_TYPES.DATE_RANGE]: null,
    [FIELD_TYPES.DATE_INPUT]: null,
    [FIELD_TYPES.DATE_RANGE_INPUT]: null,
    [FIELD_TYPES.INPUT_GROUP_TEXT]: "",
  };

  // Reduce fields into an object of initial values, using defaults or type-based fallbacks.
  return fields.reduce((accumulator, rawField) => {
    const field = normalizeField(rawField);
    accumulator[field.name] =
      field.defaultValue !== undefined ? field.defaultValue : (fallbackByType[field.type] ?? null);

    return accumulator;
  }, {});
}

/**
 * @public
 * @function registerField
 * @description
 * Registers a field in the registry. If a field with the same name already exists, it will be overwritten and a development-only warning will be emitted.
 *
 * @param {Object} field
 * @returns {React.ReactNode}
 */
export function renderFieldControl(field) {
  const {
    name,
    type,
    label,
    placeholder,
    options,
    componentProps,
    block,
    disabled,
    readOnly,
    rule,
    errorPlacement,
    shouldResetWithUnmount,
    inputGroup,
  } = field;

  if (type === FIELD_TYPES.SELECT) {
    return (
      <FormControlShim
        name={name}
        accepter={SelectPicker}
        placeholder={placeholder}
        data={options}
        block={block}
        cleanable
        searchable
        disabled={disabled}
        readOnly={readOnly}
        rule={rule}
        errorPlacement={errorPlacement}
        shouldResetWithUnmount={shouldResetWithUnmount}
        {...componentProps}
      />
    );
  }

  if (type === FIELD_TYPES.CHECKBOX) {
    return (
      <FormControlShim
        name={name}
        accepter={Checkbox}
        disabled={disabled}
        readOnly={readOnly}
        rule={rule}
        errorPlacement={errorPlacement}
        shouldResetWithUnmount={shouldResetWithUnmount}
        {...componentProps}
      >
        {field.checkboxLabel || label}
      </FormControlShim>
    );
  }

  if (type === FIELD_TYPES.CHECKBOX_GROUP) {
    return (
      <FormControlShim
        name={name}
        accepter={CheckboxGroup}
        disabled={disabled}
        readOnly={readOnly}
        rule={rule}
        errorPlacement={errorPlacement}
        shouldResetWithUnmount={shouldResetWithUnmount}
        {...componentProps}
      >
        {options.map((option) => (
          <Checkbox
            key={`${name}-${String(option.value)}`}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </Checkbox>
        ))}
      </FormControlShim>
    );
  }

  if (type === FIELD_TYPES.RADIO_GROUP) {
    return (
      <FormControlShim
        name={name}
        accepter={RadioGroup}
        disabled={disabled}
        readOnly={readOnly}
        rule={rule}
        errorPlacement={errorPlacement}
        shouldResetWithUnmount={shouldResetWithUnmount}
        {...componentProps}
      >
        {options.map((option) => (
          <Radio
            key={`${name}-${String(option.value)}`}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </Radio>
        ))}
      </FormControlShim>
    );
  }

  if (type === FIELD_TYPES.INPUT_GROUP_TEXT) {
    return (
      <FormControlShim
        name={name}
        accepter={InputGroupTextAccepter}
        placeholder={placeholder}
        prefix={inputGroup?.prefix}
        suffix={inputGroup?.suffix}
        disabled={disabled}
        readOnly={readOnly}
        rule={rule}
        errorPlacement={errorPlacement}
        shouldResetWithUnmount={shouldResetWithUnmount}
        {...componentProps}
      />
    );
  }

  const accepter = SIMPLE_ACCEPTORS[type] || Input;

  return (
    <FormControlShim
      name={name}
      accepter={accepter}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      rule={rule}
      errorPlacement={errorPlacement}
      shouldResetWithUnmount={shouldResetWithUnmount}
      {...componentProps}
    />
  );
}

/**
 * @private
 * @function FormControlShim
 * @description
 * Small shim so the registry file can stay focused on field config
 * instead of importing the full Form namespace everywhere.
 *
 * This component simply forwards all props to Form.Control, allowing us to specify custom accepters and other props without having to import Form.Control directly in the registry file.
 *
 * @param {Object} props - Props to pass to Form.Control.
 * @returns {React.ReactNode}
 */
function FormControlShim(props) {
  const { Form } = require("rsuite");
  return <Form.Control {...props} />;
}
