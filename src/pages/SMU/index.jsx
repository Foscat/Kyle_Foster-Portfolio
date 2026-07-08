/**
 * @file index.jsx
 * @description Academic-project showcase page rendered from SMU content metadata.
 * @module pages/SMU
 */

import { useEffect } from "react";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";
import pageSummaryMetas from "assets/data/pageSummaryMetas";
import smuSections from "assets/data/content/smu";
import { PageHeader } from "components/layout";
import { StickyNav, StickySectionNav, Footer, helpers } from "components/navigation";
import { SectionRenderer } from "components/renderers";

const smu = {
  ...pageSummaryMetas.Smu,
  sections: smuSections,
};

const DIAGRAM_DEFER_CONFIG = {
  rootMargin: "480px 0px",
  threshold: 0.01,
  placeholderMinHeight: "240px",
  fallbackDelayMs: 1200,
  startAt: 1,
};

/**
 * SMU Page
 * ---------------------------------------------------------------------------
 * Academic project showcase page.
 * Uses the same section/block rendering system as professional work and
 * side projects to keep UI and content structure consistent.
 *
 * @component
 * @returns {JSX.Element}
 */
const Smu = () => {
  useEffect(() => {
    helpers.restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div className="page-shell ly-wrapper ly-wrapper--wide ly-stack">
        <PageHeader
          title={smu.title}
          subTitle={smu.description}
          timespan={smu.timespan}
          jobTitle={smu.jobTitle}
          tech={smu.tech}
        />
        <StickyNav activePage={smu.url} />
        <div className="page-layout ly-sidebar-layout ly-sidebar-layout--right">
          <main className="page-content app-main ly-content" role="main">
            {smu.sections.map((sect, i) => {
              return (
                <SectionRenderer
                  section={sect}
                  deferDiagrams={DIAGRAM_DEFER_CONFIG}
                  key={`rt-${sect.id}-${i}`}
                />
              );
            })}
          </main>
          <aside className="page-sidebar ly-sidebar">
            <StickySectionNav pageUrl={smu.url} sections={smu.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default Smu;
