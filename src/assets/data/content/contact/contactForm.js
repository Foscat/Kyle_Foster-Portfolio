/**
 * @file contactForm.js
 * @description JSDoc schema contract for CMS-driven FormBlock configuration.
 * This file exports a sample form schema that can be used to render a contact form using the FormBlock component. The schema includes various field types, validation rules, and conditional rendering logic to demonstrate the flexibility of the FormBlock system.
 * @author Foscat
 */

import FIELD_TYPES from "types/field.types.js";

export const contactForm = {
  id: "contact-form",
  title: "Contact Me",
  submitLabel: "Send Message",
  resetLabel: "Reset",
  fields: [
    {
      name: "fullName",
      type: FIELD_TYPES.TEXT,
      label: "Full Name",
      placeholder: "Enter your name",
      defaultValue: "",
      helpText: "Use your preferred name.",
    },
    {
      name: "email",
      type: FIELD_TYPES.INPUT_GROUP_TEXT,
      label: "Email",
      placeholder: "name@example.com",
      defaultValue: "",
      inputGroup: {
        prefix: "@",
      },
      componentProps: {
        autoComplete: "email",
      },
    },
    {
      name: "reason",
      type: FIELD_TYPES.SELECT,
      label: "Reason",
      placeholder: "Choose a reason",
      defaultValue: null,
      options: [
        { label: "Freelance Project", value: "freelance" },
        { label: "Job Opportunity", value: "job" },
        { label: "Portfolio Feedback", value: "feedback" },
        { label: "General Question", value: "general" },
      ],
    },
    {
      name: "budget",
      type: FIELD_TYPES.NUMBER,
      label: "Estimated Budget",
      defaultValue: null,
      placeholder: "Budget in USD",
      componentProps: {
        min: 0,
        step: 100,
      },
    },
    {
      name: "contactMethods",
      type: FIELD_TYPES.CHECKBOX_GROUP,
      label: "Preferred Contact Methods",
      defaultValue: [],
      options: [
        { label: "Email", value: "email" },
        { label: "Phone", value: "phone" },
        { label: "Text", value: "text" },
      ],
    },
    {
      name: "timeline",
      type: FIELD_TYPES.RADIO_GROUP,
      label: "Timeline",
      defaultValue: "flexible",
      options: [
        { label: "ASAP", value: "asap" },
        { label: "2–4 Weeks", value: "2-4-weeks" },
        { label: "1–3 Months", value: "1-3-months" },
        { label: "Flexible", value: "flexible" },
      ],
    },
    {
      name: "wantsNda",
      type: FIELD_TYPES.CHECKBOX,
      label: "NDA",
      checkboxLabel: "I need an NDA before sharing project details.",
      defaultValue: false,
    },
    {
      name: "message",
      type: FIELD_TYPES.TEXTAREA,
      label: "Project Details",
      placeholder: "Tell me about the project, goals, and constraints",
      defaultValue: "",
      componentProps: {
        rows: 7,
        maxLength: 2000,
      },
    },
    {
      name: "launchDate",
      type: FIELD_TYPES.DATE,
      label: "Target Launch Date",
      defaultValue: null,
      renderWhen: (formValue) => formValue.reason === "freelance",
    },
  ],
};

export default contactForm;
