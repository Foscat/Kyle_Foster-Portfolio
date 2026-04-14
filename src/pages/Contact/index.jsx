/**
 * @file src\pages\Contact\index.jsx
 * @description src\pages\Contact\index module.
 * @module src\pages\Contact\index
 */

import { useEffect, useMemo, useState } from "react";
import { FlexboxGrid, Form, Input, Message, Panel } from "rsuite";
import { StickyNav, Footer } from "components/navigation";
import resumeData from "assets/data/content/resumeData.js";
import contactForm from "assets/data/content/contactForm.js";
import { useTheme } from "assets/context/ThemeContext.jsx";
import { PageRoute } from "types/navigation.types";
import ResumePreviewTrigger from "components/features/ResumePreview/ResumePreviewTrigger";
import { Size, Variant } from "types/ui.types";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { Btn } from "components/ui";

/**
 * @file Contact.jsx
 * @description Contact page with form submission, validation-safe payload normalization, and async feedback handling.
 * @module pages/Contact
 */

/**
 * Contact service endpoint used by the public portfolio form.
 * Exported for testability and to keep the request contract centralized.
 *
 * @type {string}
 */
export const CONTACT_API_URL = "https://email-microservice-grem.onrender.com/api/contact";

const FALLBACK_CONTACT_FORM_CONTENT = Object.freeze({
  title: "Contact",
  submitLabel: "Send Message",
  fields: {
    name: {
      label: "Name",
      placeholder: "John Doe",
    },
    email: {
      label: "Email",
      placeholder: "john@example.com",
    },
    message: {
      label: "Message",
      placeholder: "Your message...",
      rows: 5,
    },
  },
});

/**
 * Finds a form field configuration using one or more candidate names.
 *
 * @param {Array<{name: (string|undefined)}>} fields - Schema field list.
 * @param {string[]} names - Candidate field names in priority order.
 * @returns {Object|undefined} Matching field config or undefined.
 */
function findFieldByNames(fields, names) {
  if (!Array.isArray(fields) || !Array.isArray(names)) return undefined;
  return fields.find((field) => names.includes(field?.name));
}

/**
 * Derives presentational content for the contact form from content data.
 *
 * This keeps visual copy in CMS-like data while preserving this page's current
 * API payload contract (`name`, `email`, and `message`).
 *
 * @param {Object} schema - Contact form schema content.
 * @returns {Object} Render-safe copy for form UI.
 */
function buildContactFormContent(schema) {
  const fields = Array.isArray(schema?.fields) ? schema.fields : [];
  const nameField = findFieldByNames(fields, ["name", "fullName"]);
  const emailField = findFieldByNames(fields, ["email"]);
  const messageField = findFieldByNames(fields, ["message"]);

  return {
    title: schema?.title || FALLBACK_CONTACT_FORM_CONTENT.title,
    submitLabel: schema?.submitLabel || FALLBACK_CONTACT_FORM_CONTENT.submitLabel,
    fields: {
      name: {
        label: nameField?.label || FALLBACK_CONTACT_FORM_CONTENT.fields.name.label,
        placeholder:
          nameField?.placeholder || FALLBACK_CONTACT_FORM_CONTENT.fields.name.placeholder,
      },
      email: {
        label: emailField?.label || FALLBACK_CONTACT_FORM_CONTENT.fields.email.label,
        placeholder:
          emailField?.placeholder || FALLBACK_CONTACT_FORM_CONTENT.fields.email.placeholder,
      },
      message: {
        label: messageField?.label || FALLBACK_CONTACT_FORM_CONTENT.fields.message.label,
        placeholder:
          messageField?.placeholder || FALLBACK_CONTACT_FORM_CONTENT.fields.message.placeholder,
        rows:
          Number(messageField?.componentProps?.rows) ||
          FALLBACK_CONTACT_FORM_CONTENT.fields.message.rows,
      },
    },
  };
}

/**
 * Safely normalizes user-entered contact form values before transmission.
 *
 * @param {{ name: string, email: string, message: string }} data - Raw form state.
 * @returns {{ name: string, email: string, message: string }} Trimmed payload.
 */
export function normalizeContactPayload(data) {
  return {
    name: String(data?.name ?? "").trim(),
    email: String(data?.email ?? "").trim(),
    message: String(data?.message ?? "").trim(),
  };
}

/**
 * Sends a contact form payload to the mail microservice.
 *
 * The request contract intentionally uses JSON because the server expects
 * `express.json()` parsing on the `/api/contact` route.
 *
 * @param {{ name: string, email: string, message: string }} data - Raw form values.
 * @returns {Promise<{message: (string|undefined), error: (string|undefined)}>} Parsed API payload.
 * @throws {Error} When the request fails or the API returns a non-OK response.
 */
export async function sendMessage(data) {
  const payload = normalizeContactPayload(data);

  const response = await fetch(CONTACT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responsePayload = await response
    .json()
    .catch(() => ({ error: "Unable to parse server response." }));

  if (!response.ok) {
    throw new Error(responsePayload.error || "Failed to send message.");
  }

  return responsePayload;
}

/**
 * Contact page.
 *
 * Responsibilities:
 * - Render the public contact form.
 * - Handle async form submission state.
 * - Surface success and error feedback to the user.
 * - Reset the form only after successful submission.
 *
 * @returns {JSX.Element} Rendered contact page.
 */
export default function Contact() {
  const { theme, palette } = useTheme();
  const [showToast, setShowToast] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const formUiContent = useMemo(() => buildContactFormContent(contactForm), []);
  const previewResumeDownloadName = `Kyle-Foster-Resume-${theme}-${palette}.pdf`;

  /**
   * Shared field updater to keep form state changes predictable.
   *
   * @param {"name"|"email"|"message"} field - Field to update.
   * @param {string} value - New field value.
   * @returns {void}
   */
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * @description Precomputed boolean that prevents empty submissions and duplicate sends. /
   */
  const isSubmitDisabled = useMemo(() => {
    const payload = normalizeContactPayload(formData);
    return !payload.name || !payload.email || !payload.message || isSending;
  }, [formData, isSending]);

  useEffect(() => {
    if (!showToast) return undefined;

    // Automatically dismiss the success message after a short interval so the
    // UI confirms the action without requiring manual cleanup.
    const timeoutId = window.setTimeout(() => {
      setShowToast(false);
    }, 3500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [showToast]);

  /**
   * Handles form submission and coordinates async UI feedback.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - Form submit event.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setIsSending(true);

    try {
      await sendMessage(formData);
      setShowToast(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="contact-page page-wrapper">
      <StickyNav activePage={PageRoute.CONNECT} />
      <div className="page-overlay" />

      <FlexboxGrid justify="center" className="contact-grid">
        <FlexboxGrid.Item colspan={20}>
          <Panel
            header={
              <header>
                <div className="contact-page__copy">
                  <h1>{formUiContent.title}</h1>
                  <p>
                    I build polished frontend systems, clear user flows, and maintainable React
                    interfaces. Reach out for roles, freelance work, collaborations, or technical
                    discussions.
                  </p>
                </div>

                <div className="contact-page__actions">
                  <ResumePreviewTrigger
                    buttonText="Preview Resume"
                    title="Kyle Foster - Resume"
                    subtitle="A cleaner, document-first preview with improved spacing and a real paper stage."
                    resume={resumeData}
                    downloadName={previewResumeDownloadName}
                  />
                </div>
              </header>
            }
            className="frosted contact-panel"
          >
            {errorMessage ? (
              <Message showIcon type="error" role="alert" className="mb-1">
                {errorMessage}
              </Message>
            ) : null}
            <Form fluid onSubmit={handleSubmit} className="contact-form mt-2">
              <Form.Group>
                <Form.ControlLabel htmlFor="contact-name">
                  {formUiContent.fields.name.label}
                </Form.ControlLabel>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder={formUiContent.fields.name.placeholder}
                  value={formData.name}
                  onChange={(value) => updateField("name", value)}
                  className="input-field frosted-input"
                />
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel htmlFor="contact-email">
                  {formUiContent.fields.email.label}
                </Form.ControlLabel>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder={formUiContent.fields.email.placeholder}
                  value={formData.email}
                  onChange={(value) => updateField("email", value)}
                  className="input-field frosted-input"
                />
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel htmlFor="contact-message">
                  {formUiContent.fields.message.label}
                </Form.ControlLabel>
                <Input
                  id="contact-message"
                  as="textarea"
                  rows={formUiContent.fields.message.rows}
                  placeholder={formUiContent.fields.message.placeholder}
                  name="message"
                  value={formData.message}
                  onChange={(value) => updateField("message", value)}
                  className="input-field frosted-input"
                />
              </Form.Group>

              <Btn
                variant={Variant.PRIMARY}
                type="submit"
                className="w-100 mt-2"
                text={isSending ? "Sending..." : formUiContent.submitLabel}
                icon={faEnvelope}
                ariaLabel="Send message"
                tooltip="Send email message"
                size={Size.LG}
                block
                disabled={isSubmitDisabled}
                loading={isSending}
                onClick={(e) => handleSubmit(e)}
              />
            </Form>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Footer />
      {showToast ? (
        <div className="toast frosted-toast" role="status" aria-live="polite">
          Message sent successfully.
        </div>
      ) : null}
    </div>
  );
}
