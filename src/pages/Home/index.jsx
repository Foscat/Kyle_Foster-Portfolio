/**
 * @file index.jsx
 * @description Home page composition that renders intro metadata, global navigation,
 * section-driven content, and footer utilities.
 * @module pages/Home
 */

import { useEffect } from "react";
import pageSummaryMetas from "assets/data/pageSummaryMetas";
import homeSections from "assets/data/content/home";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";
import { PageHeader } from "components/layout";
import { StickyNav, StickySectionNav, Footer, helpers } from "components/navigation";
import { SectionRenderer } from "components/renderers";

const home = {
  ...pageSummaryMetas.Home,
  sections: homeSections,
};

/**
 * Home Page
 * ---------------------------------------------------------------------------
 * A data-driven landing page that gives recruiters and hiring managers a
 * high-level map of the portfolio and clear CTAs into deeper pages.
 *
 * Content is rendered from lightweight page metadata plus `assets/data/content/home` sections
 * without touching layout code.
 *
 * @component
 * @returns {JSX.Element}
 */
const Home = () => {
  useEffect(() => {
    helpers.restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div className="page-shell ly-wrapper ly-wrapper--wide ly-stack">
        <PageHeader
          title={home.title}
          subTitle={home.description}
          timespan={home.timespan}
          tech={home.tech}
          jobTitle={home.jobTitle}
        />
        <StickyNav activePage={home.url} />
        <div className="page-layout ly-sidebar-layout ly-sidebar-layout--right">
          <main className="page-content app-main ly-content" role="main">
            {home.sections.map((sect) => {
              return <SectionRenderer section={sect} deferDiagrams key={sect.id} />;
            })}
          </main>
          <aside className="page-sidebar ly-sidebar">
            <StickySectionNav pageUrl={home.url} sections={home.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default Home;
