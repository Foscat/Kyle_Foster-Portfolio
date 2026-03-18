import { useEffect } from "react";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";
import Data from "assets/data/pageMetas";
import { PageHeader } from "components/layout";
import { StickyNav, StickySectionNav, Footer, helpers } from "components/navigation";
import { SectionRenderer } from "components/renderers";

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
    helpers.restoreScrollPosition();
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
              return <SectionRenderer section={sect} key={`rt-${sect.id}-${i}`} />;
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
