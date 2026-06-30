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

const buildContactMessage = (formValue) => {
  const lines = [
    "Portfolio Contact Submission",
    `Full Name: ${formValue.fullName || ""}`,
    `Email: ${formValue.email || ""}`,
    formValue.reason ? `Reason: ${formValue.reason}` : null,
    formValue.budget ? `Estimated budget: ${formValue.budget}` : null,
    Array.isArray(formValue.contactMethods) && formValue.contactMethods.length
      ? `Preferred contact method: ${formValue.contactMethods.join(", ")}`
      : null,
    formValue.timeline ? `Timeline: ${formValue.timeline}` : null,
    formValue.wantsNda ? "NDA required: Yes" : null,
    formValue.launchDate ? `Target launch date: ${formValue.launchDate}` : null,
    `Project details: ${formValue.message || ""}`,
  ];

  return lines.filter(Boolean).join("\n");
};

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formValue.fullName || "",
          email: formValue.email || "",
          message: buildContactMessage(formValue),
        }),
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
      <div className="contact-page page-wrapper">
        <StickyNav activePage={PageRoute.CONTACT} />

        <main className="contact-content app-main" role="main">
          <div className="contact-centered-stack">
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
