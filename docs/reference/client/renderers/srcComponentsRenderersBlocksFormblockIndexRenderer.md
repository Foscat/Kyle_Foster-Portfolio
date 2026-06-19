# srcComponentsRenderersBlocksFormblockIndexRenderer

- Source: `src/components/renderers/blocks/FormBlock/index.jsx`

# srcComponentsRenderersBlocksFormblockIndexRenderer

## components/blocks/FormBlock

Main FormBlock component that renders a dynamic form based on a provided schema. It uses RSuite's Form components under the hood and supports various field types, validation, and conditional rendering. The component is designed to be flexible and extensible, allowing for custom field types and complex form logic.

### FormBlock

Renders a dynamic form based on a provided schema. The schema defines the fields, their types, labels, validation rules, and other configuration options. FormBlock manages form state internally and exposes onChange and onSubmit callbacks for external handling.

**Parameters**

- `props` (`Object`) - Component props.
- `props.className` (`string`, optional) - Additional wrapper class names.
- `props.schema` (`Object`) - Form schema object from CMS/data files.
- `props.model` (`Object`, optional) - Optional RSuite schema model for validation.
- `props.fluid` (`boolean`, optional, default: `true`) - Whether the form fills the available width.
- `props.layout` (`"vertical" | "horizontal" | "inline"`, optional, default: `"vertical"`) - RSuite form layout.
- `props.disabled` (`boolean`, optional, default: `false`) - Global disabled state.
- `props.readOnly` (`boolean`, optional, default: `false`) - Global read-only state.
- `props.onChange` (`function`, optional) - Called whenever form values change.
- `props.onSubmit` (`function`, optional) - Called with the final formValue on submit.

**Returns**

- `JSX.Element | null`

**Examples**

```js
```js
const contactFormSchema = {
id: "contact-form",
title: "Send Me a Message",
fields: [
  {
    name: "fullName",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your name",
    required: true,
    defaultValue: "",
    helpText: "Use your preferred name."

  },
  {
    name: "email",
    type: "text",
    label: "Email",
    placeholder: "",
    required: true,
    defaultValue: "",
    rule: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  {
    name: "reason",
    type: "select",
    label: "Reason",
    placeholder: "Choose one",
    defaultValue: null,
    options: [
      {
        label: "Freelance Project",
         value: "freelance" },
      {
        label: "Job Opportunity",
         value: "job" },
      {
         label: "General Question",
        value: "general" }
    ]
  },
  {
    name: "message",
    type: "textarea",
    label: "Message",
    placeholder: "Tell me about your project",
    defaultValue: "",
    componentProps: {
      rows: 6
    }
  },
  {
    name: "contactMethods",
    type: "checkboxGroup",
    label: "Preferred Contact",
    defaultValue: [],
    options: [
      { label: "Email", value: "email" },
      { label: "Phone", value: "phone" },
      { label: "Text", value: "text" }
    ]
  }
],
onSubmit: (formValue) => sendMessage(formValue),
}
<FormBlock schema={contactFormSchema} />
```
```
