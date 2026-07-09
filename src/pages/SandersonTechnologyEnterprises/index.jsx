/**
 * @file src/pages/SandersonTechnologyEnterprises/index.jsx
 * @description Public case-study page for Sanderson Technology Enterprises work.
 * @module pages/SandersonTechnologyEnterprises
 */

import { useEffect } from "react";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";
import pageSummaryMetas from "assets/data/pageSummaryMetas";
import sandersonTechnologyEnterprisesSections from "assets/data/content/sanderson-technology-enterprises";
import { PageHeader } from "components/layout";
import { Footer, helpers, StickyNav, StickySectionNav } from "components/navigation";
import { SectionRenderer } from "components/renderers";

const sandersonTechnologyEnterprises = {
  ...pageSummaryMetas.SandersonTechnologyEnterprises,
  sections: sandersonTechnologyEnterprisesSections,
};

const DIAGRAM_DEFER_CONFIG = {
  rootMargin: "480px 0px",
  threshold: 0.01,
  placeholderMinHeight: "240px",
  fallbackDelayMs: 1200,
  startAt: 1,
};

/**
 * Public Sanderson Technology Enterprises case-study page.
 *
 * @returns {JSX.Element}
 */
const SandersonTechnologyEnterprises = () => {
  useEffect(() => {
    helpers.restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div className="page-shell ly-wrapper ly-wrapper--wide ly-stack">
        <PageHeader
          title={sandersonTechnologyEnterprises.title}
          subTitle={sandersonTechnologyEnterprises.description}
          jobTitle={sandersonTechnologyEnterprises.jobTitle}
          timespan={sandersonTechnologyEnterprises.timespan}
          tech={sandersonTechnologyEnterprises.tech}
        />
        <StickyNav activePage={sandersonTechnologyEnterprises.url} />
        <div className="page-layout ly-sidebar-layout ly-sidebar-layout--right">
          <main className="page-content app-main ly-content" role="main">
            {sandersonTechnologyEnterprises.sections.map((section) => (
              <SectionRenderer
                section={section}
                deferDiagrams={DIAGRAM_DEFER_CONFIG}
                key={section.id}
              />
            ))}
          </main>
          <aside className="page-sidebar ly-sidebar">
            <StickySectionNav
              pageUrl={sandersonTechnologyEnterprises.url}
              sections={sandersonTechnologyEnterprises.sections}
            />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default SandersonTechnologyEnterprises;
