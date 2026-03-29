import { useEffect } from "react";
import Data from "assets/data/pageMetas";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";
import { PageHeader } from "components/layout";
import { StickyNav, StickySectionNav, Footer, helpers } from "components/navigation";
import { SectionRenderer } from "components/renderers";
import "./styles.css";

const docs = Data.Docs;

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
      <div className="container docs-page">
        <PageHeader title={docs.title} subTitle={docs.description} />
        <StickyNav activePage={docs.url} />
        <div className="page-layout">
          <main className="page-content app-main" role="main">
            {docs.sections.map((sect) => (
              <SectionRenderer section={sect} key={sect.id} />
            ))}
          </main>
          <aside className="page-sidebar">
            <StickySectionNav pageUrl={docs.url} sections={docs.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default Docs;
