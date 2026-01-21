import { useEffect } from "react";
import { restoreScrollPosition } from "navigation/restoreScrollPosition";
import SectionRegistryProvider from "navigation/SectionRegistryProvider";
import Data from "assets/data/pageMetas";
import PageHeader from "components/PageHeader";
import StickyNav from "components/StickyNav";
import SectionRenderer from "components/SectionRenderer";
import Footer from "components/Footer";
import StickySectionNav from "components/StickySectionNav";

const sidePro = Data.SideProjects;

/**
 * SideProjects Page
 * ---------------------------------------------------------------------------
 * Data-driven portfolio page showcasing personal projects.
 * Renders `sideProjectsData` into consistent frosted UI sections.
 *
 * @component
 * @returns {JSX.Element}
 */
const SideProjects = () => {
  useEffect(() => {
    restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div className="container">
        <PageHeader
          title={sidePro.title}
          subTitle={sidePro.description}
          jobTitle={sidePro.jobTitle}
          timespan={sidePro.timespan}
          tech={sidePro.tech}
        />
        <StickyNav activePage={sidePro.url} />
        <div className="page-layout">
          <main className="page-content app-main" role="main">
            {sidePro.sections.map((sect) => {
              return <SectionRenderer section={sect} key={sect.id} />;
            })}
          </main>
          <aside className="page-sidebar">
            <StickySectionNav pageUrl={sidePro.url} sections={sidePro.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default SideProjects;
