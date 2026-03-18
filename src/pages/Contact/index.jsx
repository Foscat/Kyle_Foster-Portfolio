import { useEffect, useMemo, useState } from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FlexboxGrid, Input, Message, Panel } from "rsuite";
import { Form } from "rsuite";

import { StickyNav, Footer } from "components/navigation";
import { Btn } from "components/ui";

import { ResumePreview } from "components/features";
import { PageRoute, Size, Variant } from "types/ui.types";

import "./styles.css";

/**
 * Contact service endpoint used by the public portfolio form.
 * Exported for testability and to keep the request contract centralized.
 *
 * @type {string}
 */
export const CONTACT_API_URL = "https://email-microservice-grem.onrender.com/api/contact";

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
 * @returns {Promise<{message?: string, error?: string}>} Parsed API payload.
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
  const [showToast, setShowToast] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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
   * Precomputed boolean that prevents empty submissions and duplicate sends.
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
                <h1 className="page-title text-center">Get in Touch</h1>
                <p className="text-center page-subtitle">
                  Have a question, project idea, or opportunity? Let&apos;s connect.
                </p>
                <div className="flex-row-center mt-1">
                  <ResumePreview block />
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
                <Form.ControlLabel htmlFor="contact-name">Name</Form.ControlLabel>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(value) => updateField("name", value)}
                  className="input-field frosted-input"
                />
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel htmlFor="contact-email">Email</Form.ControlLabel>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(value) => updateField("email", value)}
                  className="input-field frosted-input"
                />
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel htmlFor="contact-message">Message</Form.ControlLabel>
                <Input
                  id="contact-message"
                  as="textarea"
                  rows={5}
                  placeholder="Your message..."
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
                text={isSending ? "Sending..." : "Send Message"}
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
