/**
 * @module src\assets\data\content\contact\contactForm
 * @file contactForm.js
 * @description JSDoc schema contract for CMS-driven FormBlock configuration.
 * This file exports a sample form schema that can be used to render a contact form using the FormBlock component. The schema includes various field types, validation rules, and conditional rendering logic to demonstrate the flexibility of the FormBlock system.
 * @author Foscat
 */

import FIELD_TYPES from "types/field.types.js";

export const contactForm = {
  id: "contact-form",
  title: "Get in Touch",
  submitLabel: "Send message",
  resetLabel: "Reset",
  fields: [
    {
      name: "fullName",
      id: "cf_fni",
      type: FIELD_TYPES.TEXT,
      label: "Full Name",
      placeholder: "Enter your name",
      defaultValue: "",
      helpText: "Use your preferred name.",
    },
    {
      name: "email",
      id: "cf_ei",
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
      id: "cf_ri",
      name: "reason",
      type: FIELD_TYPES.SELECT,
      label: "Reason for contact",
      placeholder: "Choose a reason",
      defaultValue: null,
      options: [
        { label: "Freelance project", value: "freelance" },
        { label: "Job opportunity", value: "job" },
        { label: "Portfolio feedback", value: "feedback" },
        { label: "General question", value: "general" },
      ],
    },
    {
      id: "cf_bi",
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
      id: "cf_cm",
      name: "contactMethods",
      type: FIELD_TYPES.CHECKBOX_GROUP,
      label: "Preferred contact method",
      defaultValue: [],
      options: [
        { label: "Email", value: "email" },
        { label: "Phone", value: "phone" },
        { label: "Text", value: "text" },
      ],
    },
    {
      id: "cf_ti",
      name: "timeline",
      type: FIELD_TYPES.RADIO_GROUP,
      label: "Timeline",
      defaultValue: "flexible",
      options: [
        { label: "As soon as possible", value: "asap" },
        { label: "2-4 weeks", value: "2-4-weeks" },
        { label: "1-3 months", value: "1-3-months" },
        { label: "Flexible", value: "flexible" },
      ],
    },
    {
      id: "cf_nda",
      name: "wantsNda",
      type: FIELD_TYPES.CHECKBOX,
      label: "NDA required",
      checkboxLabel: "I need an NDA before sharing project details.",
      defaultValue: false,
    },
    {
      id: "cf_msg",
      name: "message",
      type: FIELD_TYPES.TEXTAREA,
      label: "Project details",
      placeholder: "Tell me about the project, goals, timeline, and any requirements.",
      defaultValue: "",
      componentProps: {
        rows: 7,
        maxLength: 2000,
      },
    },
    {
      id: "cf_ldi",
      name: "launchDate",
      type: FIELD_TYPES.DATE,
      label: "Target launch date",
      defaultValue: null,
      renderWhen: (formValue) => formValue.reason === "freelance",
    },
  ],
};

export default contactForm;
