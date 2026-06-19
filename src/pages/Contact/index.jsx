/**
 * @file src\pages\Contact\index.jsx
 * @description Contact page composed from section-driven content and a schema-driven form.
 * @module src\pages\Contact\index
 */

import SectionRegistryProvider from "assets/context/SectionRegistryProvider.jsx";
import { StickyNav, Footer } from "components/navigation";
import { SectionRenderer } from "components/renderers";
import resumeData from "assets/data/content/resumeData.js";
import { useTheme } from "assets/context/ThemeContext.jsx";
import { PageRoute } from "types/navigation.types";
import ResumePreviewTrigger from "components/features/ResumePreview/ResumePreviewTrigger";
import "./styles.css";
import "../../styles/rsuite-form.less";
import { contactSections } from "@/assets/data";

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
  const resumeDownloadName = `Kyle-Foster-Senior-Developer-Resume.pdf`;

  return (
    <SectionRegistryProvider>
      <div className="contact-page page-wrapper">
        <StickyNav activePage={PageRoute.CONTACT} />

        <main className="contact-content app-main" role="main">
          <div className="contact-centered-stack">
            <SectionRenderer section={contactSections[0]} />
          </div>
        </main>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
}
