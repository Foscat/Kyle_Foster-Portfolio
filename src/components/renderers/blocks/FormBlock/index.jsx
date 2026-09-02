/**
 * @file index.jsx
 * @description Schema-driven native form block styled by the shared STE CSS libraries.
 * @module components/renderers/blocks/FormBlock
 */

import { useEffect, useMemo, useState } from "react";
import Surface from "components/ui/Surface";
import Btn from "components/ui/Btn";
import FIELD_TYPES from "types/field.types.js";
import { Variant } from "types/ui.types";
import { buildInitialValues, normalizeField, renderFieldControl } from "./fieldRegestry.jsx";
import "./styles.css";

const GROUP_FIELD_TYPES = new Set([FIELD_TYPES.CHECKBOX_GROUP, FIELD_TYPES.RADIO_GROUP]);

/**
 * Render a controlled native form from CMS-compatible field definitions.
 *
 * @param {Object} props - Form block configuration.
 * @param {string} [props.className=""] - Additional wrapper classes.
 * @param {Object} props.schema - Form title, labels, fields, and initial values.
 * @param {boolean} [props.fluid=true] - Enables the full-width form layout.
 * @param {"vertical"|"horizontal"|"inline"} [props.layout="vertical"] - Layout variant.
 * @param {boolean} [props.disabled=false] - Disables all controls.
 * @param {boolean} [props.readOnly=false] - Makes all compatible controls read-only.
 * @param {Function} [props.onChange] - Receives the complete value map after changes.
 * @param {Function} [props.onSubmit] - Receives the complete value map on submit.
 * @returns {JSX.Element|null} Native schema form or null for an empty schema.
 */
const FormBlock = ({
  className = "",
  schema,
  model: _model = undefined,
  fluid = true,
  layout = "vertical",
  disabled = false,
  readOnly = false,
  onChange = undefined,
  onSubmit = () => {},
}) => {
  const normalizedFields = useMemo(() => {
    const rawFields = Array.isArray(schema?.fields) ? schema.fields : [];
    return rawFields.map(normalizeField).filter((field) => field.name);
  }, [schema]);
  const derivedInitialValues = useMemo(
    () => schema?.initialValues || buildInitialValues(normalizedFields),
    [normalizedFields, schema]
  );
  const [formValue, setFormValue] = useState(derivedInitialValues);

  useEffect(() => {
    setFormValue(derivedInitialValues);
  }, [derivedInitialValues]);

  if (!schema || normalizedFields.length === 0) return null;

  const visibleFields = normalizedFields.filter((field) => {
    if (field.hidden) return false;
    return typeof field.renderWhen !== "function" || Boolean(field.renderWhen(formValue));
  });

  /**
   * Update one controlled field and publish the complete value map.
   *
   * @param {string} name - Field name.
   * @param {*} value - Normalized native control value.
   * @param {React.ChangeEvent} event - Native change event.
   * @returns {void}
   */
  const handleFieldChange = (name, value, event) => {
    setFormValue((currentValue) => {
      const nextValue = { ...currentValue, [name]: value };
      onChange?.(nextValue, event);
      return nextValue;
    });
  };

  /**
   * Prevent document navigation and submit the current controlled values.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - Native submit event.
   * @returns {void}
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formValue);
  };

  /** @description Reset the controlled form to its schema-derived initial values. */
  const handleReset = () => {
    setFormValue(derivedInitialValues);
  };

  return (
    <Surface
      className={["form-block", className].filter(Boolean).join(" ")}
      header={schema.title || null}
    >
      <form
        className={`form-block__form form-block__form--${layout} ${fluid ? "is-fluid" : ""}`}
        aria-label={schema.title || "Dynamic form"}
        onSubmit={handleSubmit}
      >
        {visibleFields.map((field) => {
          const nativeField = {
            ...field,
            disabled: disabled || field.disabled,
            readOnly: readOnly || field.readOnly,
          };
          const control = renderFieldControl(
            nativeField,
            formValue[field.name],
            (value, event) => handleFieldChange(field.name, value, event)
          );

          if (GROUP_FIELD_TYPES.has(field.type)) {
            return (
              <fieldset className="form-block__field" key={field.name} disabled={nativeField.disabled}>
                {field.label ? <legend>{field.label}</legend> : null}
                {control}
                {field.helpText ? <small>{field.helpText}</small> : null}
              </fieldset>
            );
          }

          return (
            <div className="form-block__field" key={field.name}>
              {field.type !== FIELD_TYPES.CHECKBOX && field.label ? (
                <label htmlFor={field.id || field.name}>{field.label}</label>
              ) : null}
              {control}
              {field.helpText ? <small>{field.helpText}</small> : null}
            </div>
          );
        })}

        <div className="form-block__actions ly-cluster">
          <Btn
            type="submit"
            text={schema.submitLabel || "Submit"}
            className="form-block__action-btn"
            variant={Variant.PRIMARY}
            disabled={disabled}
          />
          {schema.resetLabel ? (
            <Btn
              type="button"
              text={schema.resetLabel}
              onClick={handleReset}
              className="form-block__action-btn"
              variant={Variant.SUBTLE}
              disabled={disabled}
            />
          ) : null}
        </div>
      </form>
    </Surface>
  );
};

export default FormBlock;
