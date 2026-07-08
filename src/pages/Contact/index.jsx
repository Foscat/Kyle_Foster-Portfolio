/**
 * @file src\pages\Contact\index.jsx
 * @description Contact page composed from section-driven content, resume actions, and a schema-driven form.
 * @module src\pages\Contact\index
 */

import { useCallback, useMemo, useState } from "react";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider.jsx";
import { StickyNav, Footer } from "components/navigation";
import { SectionRenderer } from "components/renderers";
import resumeData from "assets/data/content/resumeData.js";
import { PageRoute } from "types/navigation.types";
import ResumePreviewTrigger from "components/features/ResumePreview/ResumePreviewTrigger";
import "./styles.css";
import "../../styles/rsuite-form.less";
import { contactSections } from "@/assets/data";
import contactForm from "@/assets/data/content/contact/contactForm.js";
import { BlockType, Size, Variant } from "types/ui.types";

const CONTACT_ENDPOINT_PATH = "/api/contact";

/**
 * Resolve the contact API endpoint from Vite configuration.
 *
 * The deployed portfolio is static, so production needs a full cross-origin
 * Render endpoint while tests and local preview can keep using `/api/contact`.
 *
 * @param {string} [configuredUrl] - Optional base URL or full contact endpoint.
 * @returns {string} Normalized contact API URL.
 */
export function resolveContactApiUrl(configuredUrl = import.meta.env.VITE_CONTACT_API_URL) {
  const normalizedUrl = typeof configuredUrl === "string" ? configuredUrl.trim() : "";

  if (!normalizedUrl) {
    return CONTACT_ENDPOINT_PATH;
  }

  const withoutTrailingSlash = normalizedUrl.replace(/\/+$/u, "");

  if (withoutTrailingSlash.endsWith(CONTACT_ENDPOINT_PATH)) {
    return withoutTrailingSlash;
  }

  return `${withoutTrailingSlash}${CONTACT_ENDPOINT_PATH}`;
}

const formatContactMessageValue = (value) => {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value ?? "").trim();
};

const buildContactMessage = (formValue) => {
  const lines = [
    "Portfolio Contact Submission",
    `Full Name: ${formatContactMessageValue(formValue.fullName)}`,
    `Email: ${formatContactMessageValue(formValue.email)}`,
    formValue.reason ? `Reason: ${formatContactMessageValue(formValue.reason)}` : null,
    formValue.budget ? `Estimated budget: ${formatContactMessageValue(formValue.budget)}` : null,
    Array.isArray(formValue.contactMethods) && formValue.contactMethods.length
      ? `Preferred contact method: ${formValue.contactMethods.map(formatContactMessageValue).join(", ")}`
      : null,
    formValue.timeline ? `Timeline: ${formatContactMessageValue(formValue.timeline)}` : null,
    formValue.wantsNda ? "NDA required: Yes" : null,
    formValue.launchDate
      ? `Target launch date: ${formatContactMessageValue(formValue.launchDate)}`
      : null,
    `Project details: ${formatContactMessageValue(formValue.message)}`,
  ];

  return lines.filter(Boolean).join("\n");
};

/**
 * Build the payload expected by the deployed email microservice.
 *
 * @param {Object} formValue - Form values emitted by the schema-driven form.
 * @returns {{name: string, email: string, message: string}} Contact API payload.
 */
export function buildContactRequestPayload(formValue = {}) {
  return {
    name: formatContactMessageValue(formValue.fullName),
    email: formatContactMessageValue(formValue.email),
    message: buildContactMessage(formValue),
  };
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
export default function Contact() {
  const [statusMessage, setStatusMessage] = useState("");
  const resumeDownloadName = `Kyle-Foster-Senior-Developer-Resume.pdf`;
  const handleContactSubmit = useCallback(async (formValue) => {
    setStatusMessage("Sending message...");

    try {
      const response = await fetch(resolveContactApiUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildContactRequestPayload(formValue)),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.message || "Contact request failed.");
      }

      setStatusMessage(payload?.message || "Message sent successfully.");
    } catch {
      setStatusMessage("Message could not be sent. Please use email or phone instead.");
    }
  }, []);
  const contactFormSection = useMemo(
    () => ({
      id: "contact-form-section",
      title: contactForm.title,
      navLabel: "Message",
      blocks: [
        {
          id: "contact-form-block",
          type: BlockType.FORM,
          schema: contactForm,
          onSubmit: handleContactSubmit,
        },
      ],
    }),
    [handleContactSubmit]
  );

  return (
    <SectionRegistryProvider>
      <div className="contact-page page-wrapper ly-wrapper ly-wrapper--wide ly-stack">
        <StickyNav activePage={PageRoute.CONTACT} />

        <main className="contact-content app-main" role="main">
          <div className="contact-centered-stack ly-stack">
            <SectionRenderer section={contactSections[0]} />
            <div className="contact-resume-actions">
              <ResumePreviewTrigger
                buttonText="Preview Resume"
                resume={resumeData}
                downloadName={resumeDownloadName}
                variant={Variant.PRIMARY}
                size={Size.MD}
              />
            </div>
            <SectionRenderer section={contactFormSection} />
            <p className="contact-form-status" role="status" aria-live="polite">
              {statusMessage}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
}
