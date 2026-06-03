/**
 * @file src\pages\Contact\index.jsx
 * @description Contact page composed from section-driven content and a schema-driven form.
 * @module src\pages\Contact\index
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { Message } from "rsuite";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider.jsx";
import { StickyNav, Footer } from "components/navigation";
import { SectionRenderer } from "components/renderers";
import resumeData from "assets/data/content/resumeData.js";
import contactFormSchema from "assets/data/content/contact/contactForm.js";
import { resolveResumePdfHref } from "assets/data/resume/pdfAssets.js";
import { useTheme } from "assets/context/ThemeContext.jsx";
import { PageRoute } from "types/navigation.types";
import { BlockType } from "types/ui.types";
import ResumePreviewTrigger from "components/features/ResumePreview/ResumePreviewTrigger";
import "./styles.css";
import "../../styles/rsuite-form.less";
import { contactAltSections } from "@/assets/data";

/**
 * Contact service endpoint used by the public portfolio form.
 * Exported for testability and to keep the request contract centralized.
 *
 * @type {string}
 */
const CONTACT_API_URL_FALLBACK = "https://email-microservice-grem.onrender.com/api/contact";
const CONTACT_DIRECT_EMAIL = "fosterkyle6456@gmail.com";
const NOT_PROVIDED = "Not provided";

/**
 * Resolves a deploy-specific contact endpoint from an environment value.
 * Accepts either a full `/api/contact` URL or a service base URL.
 * Falls back to the default endpoint if the value is missing, invalid, or not HTTP(S).
 *
 * @param {unknown} raw - Environment-provided endpoint or base URL.
 * @returns {string} Absolute contact endpoint URL.
 */
function resolveContactApiUrl(raw) {
  if (typeof raw !== "string" || !raw.trim()) return CONTACT_API_URL_FALLBACK;

  try {
    const parsed = new URL(raw.trim());
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return CONTACT_API_URL_FALLBACK;
    }

    if (/\/api\/contact\/?$/i.test(parsed.pathname)) {
      parsed.pathname = parsed.pathname.replace(/\/+$/, "");
      return parsed.toString();
    }

    const normalizedPath = parsed.pathname.endsWith("/") ? parsed.pathname : `${parsed.pathname}/`;
    parsed.pathname = `${normalizedPath}api/contact`;
    return parsed.toString();
  } catch {
    return CONTACT_API_URL_FALLBACK;
  }
}

/**
 * Contact endpoint resolved from environment for deploy-specific CORS alignment.
 * Accepts either a full `/api/contact` URL or a service base URL.
 *
 * @type {string}
 */
export const CONTACT_API_URL = resolveContactApiUrl(import.meta.env.VITE_CONTACT_API_URL);

const hasOwn = (obj, key) => obj && Object.prototype.hasOwnProperty.call(obj, key);

const formatDateValue = (value) => {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    return NOT_PROVIDED;
  }

  const isoDate = value.toISOString().split("T")[0];
  return isoDate;
};

const formatScalarValue = (value) => {
  if (value === null || value === undefined) return NOT_PROVIDED;
  if (value instanceof Date) return formatDateValue(value);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number" || typeof value === "bigint") return String(value);

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || NOT_PROVIDED;
  }

  try {
    const serialized = JSON.stringify(value);
    return serialized && serialized !== "{}" ? serialized : NOT_PROVIDED;
  } catch {
    return NOT_PROVIDED;
  }
};

const getOptionLabel = (field, rawValue) => {
  const options = Array.isArray(field?.options) ? field.options : [];
  const match = options.find((option) => option?.value === rawValue);
  return typeof match?.label === "string" && match.label.trim()
    ? match.label.trim()
    : formatScalarValue(rawValue);
};

const formatFieldValue = (field, rawValue) => {
  if (Array.isArray(rawValue)) {
    const normalized = rawValue
      .map((value) => getOptionLabel(field, value))
      .map((value) => value.trim())
      .filter((value) => value && value !== NOT_PROVIDED);

    return normalized.length > 0 ? normalized.join(", ") : NOT_PROVIDED;
  }

  if (Array.isArray(field?.options)) {
    return getOptionLabel(field, rawValue);
  }

  return formatScalarValue(rawValue);
};

/**
 * Converts schema-driven form values into a single plain-text email body.
 *
 * @param {Record<string, unknown>} values - Raw form values.
 * @param {{fields?: Array<{name?: string, label?: string, options?: Array<{label?: string, value?: unknown}>}>}} [schema]
 * @returns {string} Single bundled message string containing all form fields.
 */
export function buildBundledContactMessage(values, schema = contactFormSchema) {
  const fields = Array.isArray(schema?.fields) ? schema.fields : [];
  const lines = fields
    .filter((field) => typeof field?.name === "string" && field.name.trim())
    .map((field) => {
      const fieldName = field.name.trim();
      const label =
        typeof field?.label === "string" && field.label.trim() ? field.label.trim() : fieldName;
      const rawValue = hasOwn(values, fieldName) ? values[fieldName] : undefined;
      return `${label}: ${formatFieldValue(field, rawValue)}`;
    });

  return ["Portfolio Contact Submission", "", ...lines].join("\n");
}

const getTrimmedFieldValue = (values, name) => {
  if (typeof name !== "string" || !name.trim()) return "";
  const rawValue = hasOwn(values, name) ? values[name] : undefined;
  if (typeof rawValue === "string") return rawValue.trim();
  if (rawValue === null || rawValue === undefined) return "";

  try {
    return String(rawValue).trim();
  } catch {
    return "";
  }
};

/**
 * Normalizes dynamic contact form values into the mail-service payload contract.
 *
 * @param {Record<string, unknown>} values - Raw form values from FormBlock.
 * @param {{fields?: Array<{name?: string}>}} [schema] - Contact form schema.
 * @returns {{name: string, email: string, message: string}} Payload sent to the contact API.
 */
export function normalizeContactPayload(values, schema = contactFormSchema) {
  const fields = Array.isArray(schema?.fields) ? schema.fields : [];
  const fieldNames = fields.map((field) => field?.name).filter(Boolean);
  const resolvedNameKey = fieldNames.includes("fullName") ? "fullName" : "name";
  const resolvedEmailKey = fieldNames.includes("email") ? "email" : "email";

  return {
    name: getTrimmedFieldValue(values, resolvedNameKey),
    email: getTrimmedFieldValue(values, resolvedEmailKey),
    message: buildBundledContactMessage(values, schema),
  };
}

/**
 * Sends a contact form payload to the mail microservice.
 *
 * The request contract intentionally uses JSON because the server expects
 * `express.json()` parsing on the `/api/contact` route.
 *
 * @param {Record<string, unknown>} values - Raw form values.
 * @param {{fields?: Array<{name?: string}>}} [schema] - Contact form schema.
 * @returns {Promise<{message: (string|undefined), error: (string|undefined)}>} Parsed API payload.
 * @throws {Error} When the request fails or the API returns a non-OK response.
 */
export async function sendMessage(values, schema = contactFormSchema) {
  const payload = normalizeContactPayload(values, schema);

  let response;
  try {
    response = await fetch(CONTACT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        `Unable to reach the contact service (network/CORS). Please email me directly at ${CONTACT_DIRECT_EMAIL}.`
      );
    }
    throw error;
  }

  const responsePayload = await response.json().catch(() => null);

  if (!response.ok) {
    const serverMessage = responsePayload?.error || responsePayload?.message;
    const requestId = response.headers?.get("rndr-id");
    const diagnostics = `HTTP ${response.status}${requestId ? ` | request ${requestId}` : ""}`;

    if (response.status >= 500) {
      throw new Error(
        `Contact service is temporarily unavailable. Please email me directly at ${CONTACT_DIRECT_EMAIL}. (${diagnostics})`
      );
    }

    throw new Error(serverMessage ? `${serverMessage} (${diagnostics})` : diagnostics);
  }

  return responsePayload || { message: "Message sent successfully." };
}

/**
 * Contact page.
 *
 * Responsibilities:
 * - Render resume preview actions.
 * - Render the schema-driven contact form via SectionRenderer.
 * - Handle async form submission state.
 * - Surface success and error feedback to the user.
 *
 * @returns {JSX.Element} Rendered contact page.
 */
export default function ContactAlt() {
  const { theme, palette } = useTheme();
  const [showToast, setShowToast] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formResetNonce, setFormResetNonce] = useState(0);

  const resumePdfHref = resolveResumePdfHref(theme);

  useEffect(() => {
    if (!showToast) return undefined;

    const timeoutId = window.setTimeout(() => {
      setShowToast(false);
    }, 3500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [showToast]);

  const handleSubmit = useCallback(async (formValue = {}) => {
    setErrorMessage("");
    setIsSending(true);

    try {
      await sendMessage(formValue, contactFormSchema);
      setShowToast(true);
      setFormResetNonce((current) => current + 1);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message.");
    } finally {
      setIsSending(false);
    }
  }, []);

  const contactFormSection = useMemo(
    () => ({
      id: "contact-form-section",
      title: contactFormSchema.title || "Get in Touch",
      navLabel: "Contact Form",
      blocks: [
        {
          id: "contact-form-block",
          type: BlockType.FORM,
          schema: {
            ...contactFormSchema,
            title: "",
            submitLabel: isSending ? "Sending..." : contactFormSchema.submitLabel,
          },
          onSubmit: handleSubmit,
          disabled: isSending,
          className: "contact-form mt-2",
        },
      ],
    }),
    [handleSubmit, isSending]
  );

  return (
    <SectionRegistryProvider>
      <div className="contact-page page-wrapper">
        <StickyNav activePage={PageRoute.CONTACT} />

        <main className="contact-content app-main" role="main">
          <div className="contact-centered-stack">
            {errorMessage ? (
              <Message showIcon type="error" role="alert" className="mb-1">
                {errorMessage}
              </Message>
            ) : null}
            <SectionRenderer section={contactAltSections[0]} />
            <ResumePreviewTrigger
              buttonText="Preview Resume"
              title="Kyle Foster - Senior Developer Resume"
              subtitle="A compact resume preview with PDF-style spacing and download options."
              resume={resumeData}
              pdfHref={resumePdfHref}
              downloadName={"Kyle-Foster-Senior-Developer-Resume.pdf"}
              buttonClassName="contact-resume-trigger"
            />
          </div>
        </main>
        <Footer />
        {showToast ? (
          <div className="toast frosted-toast" role="status" aria-live="polite">
            Message sent successfully.
          </div>
        ) : null}
      </div>
    </SectionRegistryProvider>
  );
}
