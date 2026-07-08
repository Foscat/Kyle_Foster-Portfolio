/**
 * @file index.jsx
 * @description Hackathon case-study page built from structured section data and sticky navigation.
 * @module pages/Hackathon
 */

import { useEffect } from "react";
import pageSummaryMetas from "assets/data/pageSummaryMetas";
import hackathonSections from "assets/data/content/hackathon";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";
import { PageHeader } from "components/layout";
import { StickyNav, StickySectionNav, Footer, helpers } from "components/navigation";
import { SectionRenderer } from "components/renderers";

const hack = {
  ...pageSummaryMetas.Hackathon,
  sections: hackathonSections,
};

/**
 * Hackathon Page
 * ---------------------------------------------------------------------------
 * Long-form narrative + technical breakdown of the Daimler hackathon project.
 * The page is rendered from `hackathonData` for consistency with other pages.
 *
 * @component
 * @returns {JSX.Element}
 */
const Hackathon = () => {
  useEffect(() => {
    helpers.restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div className="page-shell ly-wrapper ly-wrapper--wide ly-stack">
        <PageHeader
          title={hack.title}
          jobTitle={hack.jobTitle}
          subTitle={hack.description}
          timespan={hack.timespan}
          tech={hack.tech}
        />
        <StickyNav activePage={hack.url} />
        <div className="page-layout ly-sidebar-layout ly-sidebar-layout--right">
          <main className="page-content app-main ly-content" role="main">
            {hack.sections.map((sect) => {
              return <SectionRenderer section={sect} key={sect.id} />;
            })}
          </main>
          <aside className="page-sidebar ly-sidebar">
            <StickySectionNav pageUrl={hack.url} sections={hack.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default Hackathon;
