/**
 * @file index.jsx
 * @description Public notice for the portfolio's limited security logging.
 * @module pages/Privacy
 */

import { Link } from "react-router";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider.jsx";
import { PageHeader } from "components/layout";
import { Footer, UnifiedNavigation } from "components/navigation";
import Surface from "components/ui/Surface";
import { PageRoute } from "types/navigation.types";
import "./styles.css";

/**
 * Explain the portfolio's visitor evidence collection, retention, and limits.
 *
 * @returns {JSX.Element} Public visitor privacy and security-logging notice.
 */
export default function Privacy() {
  return (
    <SectionRegistryProvider>
      <div className="privacy-page page-wrapper ly-wrapper ly-wrapper--wide ly-stack">
        <UnifiedNavigation activePage={PageRoute.PRIVACY} />

        <main className="privacy-content app-main ly-stack" role="main">
          <PageHeader
            title="Visitor Privacy and Security Logging"
            subTitle="A plain-language explanation of the limited technical information recorded by this portfolio."
          />

          <Surface header="What this site records" className="privacy-panel">
            <p>
              This portfolio sends a small page-view record to a privately controlled logging
              service operated by Kyle Foster / Sanderson Technology Enterprises LLC. The record
              contains the requested pathname without its query or fragment; receipt time; an
              encrypted source IP; browser User-Agent and language; coarse screen dimensions;
              timezone; low-entropy platform and mobile hints; and hosting request identifiers when
              available.
            </p>
            <p>
              The logger does not inspect or store page contents, form values, referrers,
              advertising cookies, authorization values, canvas output, fonts, audio
              characteristics, or WebGL characteristics. Records are not sold or used for
              advertising.
            </p>
          </Surface>

          <Surface header="Browser correlation" className="privacy-panel">
            <p>
              The page stores one random identifier in this site&apos;s local browser storage. It is
              scoped to this portfolio and is not shared between registered sites. Removing local
              site data removes the identifier from the browser but does not alter records already
              received under the retention policy.
            </p>
            <p>
              Technical signals can help correlate similar visits, but they do not, by themselves,
              prove a person&apos;s identity, device ownership, physical presence, or intent.
            </p>
          </Surface>

          <Surface header="Purpose and retention" className="privacy-panel">
            <p>
              These records are used only for site security, abuse prevention, incident
              investigation, and supporting documentation of repeated unwanted contact. Active
              records are stored in daily tamper-evident files and normally deleted after a rolling
              180-day period.
            </p>
            <p>
              Selected incident evidence may be exported into an integrity-hashed bundle and
              preserved until the associated matter is resolved. Access or deletion requests may be
              limited when preservation is reasonably necessary for security, investigation, legal
              obligations, or an active dispute.
            </p>
          </Surface>

          <p className="privacy-contact">
            Questions or requests can be submitted through the portfolio&apos;s{" "}
            <Link to={PageRoute.CONTACT}>contact page</Link>.
          </p>
        </main>

        <Footer />
      </div>
    </SectionRegistryProvider>
  );
}
