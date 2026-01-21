import { useEffect } from "react";
// import Metas from "assets/data/projectMetas";
import Data from "assets/data/pageMetas";
import { restoreScrollPosition } from "navigation/restoreScrollPosition";
import SectionRegistryProvider from "navigation/SectionRegistryProvider";
import PageHeader from "components/PageHeader";
import StickyNav from "components/StickyNav";
import SectionRenderer from "components/SectionRenderer";
import StickySectionNav from "components/StickySectionNav";
import Footer from "components/Footer";

const csos = Data.Codestream;

/**
 * CodeStream Page
 * ---------------------------------------------------------------------------
 * Professional work case study page for CodeStream Online Studio.
 * Renders a data-driven set of sections and wires them into the sticky
 * section navigation for long-form scanning.
 *
 * @component
 * @returns {JSX.Element}
 */
const CodeStream = () => {
  useEffect(() => {
    restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div className="container">
        <PageHeader
          title={csos.title}
          subTitle={csos.description}
          jobTitle={csos.jobTitle}
          timespan={csos.timespan}
          tech={csos.tech}
        />
        <StickyNav activePage={csos.url} />
        <div className="page-layout">
          <main className="page-content app-main" role="main">
            {csos.sections.map((sect) => {
              return <SectionRenderer section={sect} key={sect.id} />;
            })}
          </main>
          <aside className="page-sidebar">
            <StickySectionNav pageUrl={csos.url} sections={csos.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default CodeStream;
