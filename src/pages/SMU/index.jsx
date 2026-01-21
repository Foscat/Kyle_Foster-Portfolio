import { useEffect } from "react";
import Data from "assets/data/pageMetas";
import { restoreScrollPosition } from "navigation/restoreScrollPosition";
import SectionRegistryProvider from "navigation/SectionRegistryProvider";
import PageHeader from "components/PageHeader";
import StickyNav from "components/StickyNav";
import SectionRenderer from "components/SectionRenderer";
import StickySectionNav from "components/StickySectionNav";
import Footer from "components/Footer";

const smu = Data.Smu;

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
    restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div className="container">
        <PageHeader
          title={smu.title}
          subTitle={smu.description}
          timespan={smu.timespan}
          jobTitle={smu.jobTitle}
          tech={smu.tech}
        />
        <StickyNav activePage={smu.url} />
        <div className="page-layout">
          <main className="page-content app-main" role="main">
            {smu.sections.map((sect, i) => {
              return <SectionRenderer section={sect} key={"smu-section" + i + 1} />;
            })}
          </main>
          <aside className="page-sidebar">
            <StickySectionNav pageUrl={smu.url} sections={smu.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default Smu;
