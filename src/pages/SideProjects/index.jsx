import { useEffect } from "react";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";
import Data from "assets/data/pageMetas.js";
import { PageHeader } from "components/layout";
import { StickyNav, StickySectionNav, Footer, helpers } from "components/navigation";
import { SectionRenderer } from "components/renderers";

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
    helpers.restoreScrollPosition();
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
