import { useEffect } from "react";
import pageSummaryMetas from "assets/data/pageSummaryMetas";
import docsSections from "assets/data/content/docs";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";
import { PageHeader } from "components/layout";
import { StickyNav, StickySectionNav, Footer, helpers } from "components/navigation";
import { SectionRenderer } from "components/renderers";
import "./styles.css";

const docs = {
  ...pageSummaryMetas.Docs,
  sections: docsSections,
};

/**
 * Docs Page
 * ---------------------------------------------------------------------------
 * Full-page documentation experience for project architecture, navigation,
 * scripts, tests, and shared type systems.
 *
 * @component
 * @returns {JSX.Element}
 */
const Docs = () => {
  useEffect(() => {
    helpers.restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div className="page-shell docs-page ly-wrapper ly-wrapper--wide ly-stack">
        <PageHeader title={docs.title} subTitle={docs.description} />
        <StickyNav activePage={docs.url} />
        <div className="page-layout ly-sidebar-layout ly-sidebar-layout--right">
          <main className="page-content app-main ly-content" role="main">
            {docs.sections.map((sect) => (
              <SectionRenderer section={sect} key={sect.id} />
            ))}
          </main>
          <aside className="page-sidebar ly-sidebar">
            <StickySectionNav pageUrl={docs.url} sections={docs.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default Docs;
