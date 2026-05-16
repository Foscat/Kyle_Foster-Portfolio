import { useEffect } from "react";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";
import { PageHeader } from "components/layout";
import { StickyNav, Footer, helpers } from "components/navigation";
import { SectionRenderer } from "components/renderers";
import { contactAltSections } from "@/assets/data";
import "./styles.css";

const contactAlt = {
  url: "/contact-alt",
  title: "Direct Contact Information",
  description: "Reach Kyle Foster directly via email, phone, LinkedIn, or GitHub.",
  sections: contactAltSections,
};

/**
 * ContactAlt Page
 * ---------------------------------------------------------------------------
 * Contact alternative page.
 * Uses the same section/block rendering system as professional work and
 * side projects to keep UI and content structure consistent.
 *
 * @component
 * @returns {JSX.Element}
 */
const ContactAlt = () => {
  useEffect(() => {
    helpers.restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div className="container contact-alt-page">
        <PageHeader title={contactAlt.title} subTitle={contactAlt.description} />
        <StickyNav activePage={contactAlt.url} />
        <div className="page-layout contact-alt-layout">
          <main className="page-content app-main contact-alt-main" role="main">
            {contactAltSections.map((sect, i) => {
              return <SectionRenderer section={sect} key={`rt-${sect.id}-${i}`} />;
            })}
          </main>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default ContactAlt;
