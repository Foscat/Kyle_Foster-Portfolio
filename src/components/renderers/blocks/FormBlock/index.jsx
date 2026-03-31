/**
 * @file index.jsx
 * @fileoverview Main FormBlock component that renders a dynamic form based on a provided schema. It uses RSuite's Form components under the hood and supports various field types, validation, and conditional rendering. The component is designed to be flexible and extensible, allowing for custom field types and complex form logic.
 * @module components/blocks/FormBlock
 */

import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Panel } from "rsuite";
import FIELD_TYPES from "types/field.types.js";
import { buildInitialValues, normalizeField, renderFieldControl } from "./fieldRegestry.jsx";
import "./styles.css";

/**
 * @public
 * @component
 * @name FormBlock
 * @description
 * Renders a dynamic form based on a provided schema. The schema defines the fields, their types, labels, validation rules, and other configuration options. FormBlock manages form state internally and exposes onChange and onSubmit callbacks for external handling.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Additional wrapper class names.
 * @param {Object} props.schema - Form schema object from CMS/data files.
 * @param {Object} [props.model] - Optional RSuite schema model for validation.
 * @param {boolean} [props.fluid=true] - Whether the form fills the available width.
 * @param {"vertical"|"horizontal"|"inline"} [props.layout="vertical"] - RSuite form layout.
 * @param {boolean} [props.disabled=false] - Global disabled state.
 * @param {boolean} [props.readOnly=false] - Global read-only state.
 * @param {function} [props.onChange] - Called whenever form values change.
 * @param {function} [props.onSubmit] - Called with the final formValue on submit.
 * @returns {JSX.Element|null}
 *
 * @example
 * ```js
 * const contactFormSchema = {
 * id: "contact-form",
 * title: "Send Me a Message",
 * fields: [
 *   {
 *     name: "fullName",
 *     type: "text",
 *     label: "Full Name",
 *     placeholder: "Enter your name",
 *     required: true,
 *     defaultValue: "",
 *     helpText: "Use your preferred name."
 *
 *   },
 *   {
 *     name: "email",
 *     type: "text",
 *     label: "Email",
 *     placeholder: "",
 *     required: true,
 *     defaultValue: "",
 *     rule: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 *   },
 *   {
 *     name: "reason",
 *     type: "select",
 *     label: "Reason",
 *     placeholder: "Choose one",
 *     defaultValue: null,
 *     options: [
 *       {
 *         label: "Freelance Project",
 *          value: "freelance" },
 *       {
 *         label: "Job Opportunity",
 *          value: "job" },
 *       {
 *          label: "General Question",
 *         value: "general" }
 *     ]
 *   },
 *   {
 *     name: "message",
 *     type: "textarea",
 *     label: "Message",
 *     placeholder: "Tell me about your project",
 *     defaultValue: "",
 *     componentProps: {
 *       rows: 6
 *     }
 *   },
 *   {
 *     name: "contactMethods",
 *     type: "checkboxGroup",
 *     label: "Preferred Contact",
 *     defaultValue: [],
 *     options: [
 *       { label: "Email", value: "email" },
 *       { label: "Phone", value: "phone" },
 *       { label: "Text", value: "text" }
 *     ]
 *   }
 * ],
 * onSubmit: (formValue) => sendMessage(formValue),
 * }
 * <FormBlock schema={contactFormSchema} />
 * ```
 *  */
const FormBlock = ({
  className = "",
  schema,
  model,
  fluid = true,
  layout = "vertical",
  disabled = false,
  readOnly = false,
  onChange,
  onSubmit = () => {},
}) => {
  /**
   * @function normalizeFields
   * @description
   * Normalize and validate the fields from the schema. This includes:
   * - Ensuring the fields array exists and is properly formatted.
   * - Mapping legacy field keys to the current schema format for backward compatibility.
   * - Filtering out any fields that do not have a valid name, as the name is required for form state management.
   *
   * The normalization process allows the FormBlock to be flexible in terms of the input schema it can handle, making it easier to integrate with various CMS configurations or data sources without requiring strict adherence to a single format.
   * @private
   * @returns {Array} An array of normalized field configurations ready for rendering.
   */
  const normalizedFields = useMemo(() => {
    const rawFields = Array.isArray(schema?.fields) ? schema.fields : [];
    return rawFields.map(normalizeField).filter((field) => field.name);
  }, [schema]);

  /**
   * @function deriveInitialValues
   * @description
   * Derive the initial form values based on the provided schema. The function first checks if the schema includes an `initialValues` object, which allows for explicit definition of initial form state. If `initialValues` is not provided, it falls back to building the initial values from the normalized fields using the `buildInitialValues` utility function. This ensures that every field has an initial value, either from the schema or derived from its configuration, which is essential for controlled form components in React.
   *
   * The useMemo hook is used to optimize performance by memoizing the derived initial values. This means that the initial values will only be recalculated when the normalized fields or the schema itself changes, preventing unnecessary computations on every render.
   * @private
   * @returns {Object} An object containing the initial form values.
   */
  const derivedInitialValues = useMemo(() => {
    return schema?.initialValues || buildInitialValues(normalizedFields);
  }, [normalizedFields, schema]);

  const [formValue, setFormValue] = useState(derivedInitialValues);

  useEffect(() => {
    setFormValue(derivedInitialValues);
  }, [derivedInitialValues]);

  if (!schema || normalizedFields.length === 0) return null;

  /**
   * @function getVisibleFields
   * @description
   * Determine which fields should be visible based on the `hidden` property and any conditional rendering logic defined in the `renderWhen` function. This allows for dynamic forms where certain fields can be shown or hidden based on user input or other form values. The function filters out any fields that are marked as hidden or do not meet the conditions specified in their `renderWhen` function, ensuring that only relevant fields are rendered to the user.
   * @private
   * @returns {Array} An array of field configurations that should be rendered.
   */
  const visibleFields = normalizedFields.filter((field) => {
    if (field.hidden) return false;
    if (typeof field.renderWhen === "function") {
      return Boolean(field.renderWhen(formValue));
    }
    return true;
  });

  /**
   * @function handleChange
   * @description
   * Handle form value changes.
   *
   * @param {Object} nextFormValue - The updated form values.
   * @param {Object} event - The event object from the form control.
   *
   * This function updates the internal form state and calls the external onChange callback if provided. The onChange callback allows parent components to react to form changes in real-time, such as enabling/disabling other UI elements or performing live validation.
   *
   * @private
   * @returns {void}
   */
  const handleChange = (nextFormValue, event) => {
    setFormValue(nextFormValue);
    onChange?.(nextFormValue, event);
  };

  /**
   * @function handleSubmit
   * @description
   * Handle form submission.
   * This function is called when the user submits the form. It calls the external onSubmit callback with the current form values. The onSubmit callback is where you would typically handle form validation, send data to an API, or perform other side effects related to form submission.
   * @private
   * @returns {void}
   */
  const handleSubmit = () => {
    onSubmit(formValue);
  };

  /**
   * @function handleReset
   * @description
   * Handle form reset action.
   * This function resets the form values to their initial state. It is called when the user clicks the reset button (if provided). Resetting the form can be useful for allowing users to clear their input and start over without having to manually delete their entries.
   * @private
   * @returns {void}
   */
  const handleReset = () => {
    setFormValue(derivedInitialValues);
  };

  return (
    <Panel
      bordered
      className={["form-block", className].filter(Boolean).join(" ")}
      header={schema.title || null}
    >
      <Form
        fluid={fluid}
        layout={layout}
        model={model}
        formValue={formValue}
        onChange={handleChange}
        onSubmit={handleSubmit}
        disabled={disabled}
        readOnly={readOnly}
        aria-label={schema.title || "Dynamic form"}
      >
        {visibleFields.map((field) => (
          <Form.Group key={field.name} controlId={field.name}>
            {field.type !== FIELD_TYPES.CHECKBOX && field.label ? (
              <Form.ControlLabel>{field.label}</Form.ControlLabel>
            ) : null}

            {renderFieldControl(field)}

            {field.helpText ? <Form.Text muted>{field.helpText}</Form.Text> : null}
          </Form.Group>
        ))}

        <Form.Group className="form-block__actions">
          <Button
            appearance="primary"
            type="submit"
            className="interactive-surface form-block__action-btn"
          >
            {schema.submitLabel || "Submit"}
          </Button>

          {schema.resetLabel ? (
            <Button
              appearance="subtle"
              type="button"
              onClick={handleReset}
              className="interactive-surface form-block__action-btn"
            >
              {schema.resetLabel}
            </Button>
          ) : null}
        </Form.Group>
      </Form>
    </Panel>
  );
};

// PropTypes validation for better developer experience and error handling.
FormBlock.propTypes = {
  className: PropTypes.string,
  schema: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    submitLabel: PropTypes.string,
    resetLabel: PropTypes.string,
    initialValues: PropTypes.object,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        label: PropTypes.string,
        helpText: PropTypes.string,
        placeholder: PropTypes.string,
        defaultValue: PropTypes.any,
        options: PropTypes.array,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        hidden: PropTypes.bool,
        block: PropTypes.bool,
        componentProps: PropTypes.object,
        rule: PropTypes.any,
        errorPlacement: PropTypes.string,
        shouldResetWithUnmount: PropTypes.bool,
        inputGroup: PropTypes.shape({
          prefix: PropTypes.string,
          suffix: PropTypes.string,
        }),
        renderWhen: PropTypes.func,
      })
    ),
  }),
  model: PropTypes.any,
  fluid: PropTypes.bool,
  layout: PropTypes.oneOf(["vertical", "horizontal", "inline"]),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default FormBlock;
