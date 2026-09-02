/**
 * @file fieldRegestry.jsx
 * @description Native form-field registry for schema-driven portfolio forms.
 * @module components/renderers/blocks/FormBlock/fieldRegestry
 */

import FIELD_TYPES from "types/field.types.js";

/**
 * Normalize legacy CMS field keys into the native form schema.
 *
 * @param {Object} field - Raw field definition.
 * @returns {Object} Normalized field definition.
 */
export function normalizeField(field = {}) {
  return {
    name: field.name || "",
    type: field.type || field.inputType || FIELD_TYPES.TEXT,
    label: field.label || "",
    helpText: field.helpText || "",
    placeholder: field.placeholder || "",
    defaultValue: field.defaultValue !== undefined ? field.defaultValue : field.value,
    options: Array.isArray(field.options) ? field.options : [],
    required: Boolean(field.required),
    disabled: Boolean(field.disabled),
    readOnly: Boolean(field.readOnly),
    hidden: Boolean(field.hidden),
    componentProps: field.componentProps || {},
    inputGroup: field.inputGroup || {},
    renderWhen: typeof field.renderWhen === "function" ? field.renderWhen : null,
    checkboxLabel: field.checkboxLabel,
    ...field,
  };
}

/**
 * Build initial values for every supported native field type.
 *
 * @param {Array<Object>} fields - Normalized or raw field definitions.
 * @returns {Object} Form value map keyed by field name.
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
    [FIELD_TYPES.DATE]: "",
    [FIELD_TYPES.DATE_RANGE]: ["", ""],
    [FIELD_TYPES.DATE_INPUT]: "",
    [FIELD_TYPES.DATE_RANGE_INPUT]: ["", ""],
    [FIELD_TYPES.INPUT_GROUP_TEXT]: "",
  };

  return fields.reduce((values, rawField) => {
    const field = normalizeField(rawField);
    values[field.name] =
      field.defaultValue !== undefined ? field.defaultValue : (fallbackByType[field.type] ?? null);
    return values;
  }, {});
}

/**
 * Normalize a native input event into the value expected by FormBlock.
 *
 * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>} event - Native change event.
 * @param {string} fieldType - Schema field type.
 * @returns {string|number|null} Normalized field value.
 */
function readNativeValue(event, fieldType) {
  const { value } = event.target;
  if (fieldType === FIELD_TYPES.NUMBER || fieldType === FIELD_TYPES.SLIDER) {
    return value === "" ? null : Number(value);
  }
  if (fieldType === FIELD_TYPES.SELECT) return value === "" ? null : value;
  return value;
}

/**
 * Render a schema field as a native form control styled by ui-style-kit-css.
 *
 * @param {Object} field - Normalized field definition.
 * @param {*} value - Current controlled value.
 * @param {Function} onChange - Receives the next value and native change event.
 * @returns {React.ReactNode} Native form control.
 */
export function renderFieldControl(field, value, onChange) {
  const {
    name,
    id = name,
    type,
    label,
    placeholder,
    options,
    componentProps,
    disabled,
    readOnly,
    required,
    inputGroup,
  } = field;
  const sharedProps = {
    id,
    name,
    disabled,
    required,
    "aria-required": required || undefined,
  };

  if (type === FIELD_TYPES.SELECT) {
    return (
      <select
        {...sharedProps}
        value={value ?? ""}
        disabled={disabled || readOnly}
        onChange={(event) => onChange(readNativeValue(event, type), event)}
        {...componentProps}
      >
        <option value="">{placeholder || "Select an option"}</option>
        {options.map((option) => (
          <option key={`${name}-${String(option.value)}`} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (type === FIELD_TYPES.CHECKBOX) {
    return (
      <label className="form-block__choice" htmlFor={id}>
        <input
          {...sharedProps}
          type="checkbox"
          checked={Boolean(value)}
          disabled={disabled || readOnly}
          onChange={(event) => onChange(event.target.checked, event)}
          {...componentProps}
        />
        <span>{field.checkboxLabel || label}</span>
      </label>
    );
  }

  if (type === FIELD_TYPES.CHECKBOX_GROUP) {
    const selectedValues = Array.isArray(value) ? value : [];
    return (
      <div className="form-block__choices">
        {options.map((option) => {
          const optionId = `${id}-${String(option.value)}`;
          return (
            <label className="form-block__choice" htmlFor={optionId} key={optionId}>
              <input
                id={optionId}
                name={name}
                type="checkbox"
                value={option.value}
                checked={selectedValues.includes(option.value)}
                disabled={disabled || readOnly || option.disabled}
                onChange={(event) => {
                  const nextValues = event.target.checked
                    ? [...selectedValues, option.value]
                    : selectedValues.filter((selected) => selected !== option.value);
                  onChange(nextValues, event);
                }}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    );
  }

  if (type === FIELD_TYPES.RADIO_GROUP) {
    return (
      <div className="form-block__choices">
        {options.map((option) => {
          const optionId = `${id}-${String(option.value)}`;
          return (
            <label className="form-block__choice" htmlFor={optionId} key={optionId}>
              <input
                id={optionId}
                name={name}
                type="radio"
                value={option.value}
                checked={value === option.value}
                disabled={disabled || readOnly || option.disabled}
                required={required}
                onChange={(event) => onChange(event.target.value, event)}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    );
  }

  if (type === FIELD_TYPES.RANGE_SLIDER || type === FIELD_TYPES.DATE_RANGE || type === FIELD_TYPES.DATE_RANGE_INPUT) {
    const isRangeSlider = type === FIELD_TYPES.RANGE_SLIDER;
    const rangeValue = Array.isArray(value) ? value : isRangeSlider ? [0, 100] : ["", ""];
    const inputType = isRangeSlider ? "range" : "date";
    return (
      <div className="form-block__range">
        {[0, 1].map((rangeIndex) => (
          <input
            key={`${id}-${rangeIndex}`}
            {...sharedProps}
            id={`${id}-${rangeIndex}`}
            name={`${name}-${rangeIndex}`}
            type={inputType}
            value={rangeValue[rangeIndex] ?? ""}
            readOnly={readOnly}
            onChange={(event) => {
              const nextValue = [...rangeValue];
              nextValue[rangeIndex] = isRangeSlider ? Number(event.target.value) : event.target.value;
              onChange(nextValue, event);
            }}
            {...componentProps}
          />
        ))}
      </div>
    );
  }

  const nativeType =
    type === FIELD_TYPES.NUMBER
      ? "number"
      : type === FIELD_TYPES.SLIDER
        ? "range"
        : type === FIELD_TYPES.DATE || type === FIELD_TYPES.DATE_INPUT
          ? "date"
          : componentProps.type || "text";
  const Control = type === FIELD_TYPES.TEXTAREA ? "textarea" : "input";
  const control = (
    <Control
      {...sharedProps}
      type={Control === "input" ? nativeType : undefined}
      value={value ?? ""}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={(event) => onChange(readNativeValue(event, type), event)}
      {...componentProps}
    />
  );

  if (type !== FIELD_TYPES.INPUT_GROUP_TEXT) return control;

  return (
    <span className="form-block__input-group">
      {inputGroup?.prefix ? <span className="form-block__addon">{inputGroup.prefix}</span> : null}
      {control}
      {inputGroup?.suffix ? <span className="form-block__addon">{inputGroup.suffix}</span> : null}
    </span>
  );
}
