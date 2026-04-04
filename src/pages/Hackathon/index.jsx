/**
 * @file index.jsx
 * @description Hackathon case-study page built from structured section data and sticky navigation.
 * @module pages/Hackathon
 */

import { useEffect } from "react";
import Data from "assets/data/pageMetas";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";
import { PageHeader } from "components/layout";
import { StickyNav, StickySectionNav, Footer, helpers } from "components/navigation";
import { SectionRenderer } from "components/renderers";

const hack = Data.Hackathon;

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
      <div className="container">
        <PageHeader
          title={hack.title}
          jobTitle={hack.jobTitle}
          subTitle={hack.description}
          timespan={hack.timespan}
          tech={hack.tech}
        />
        <StickyNav activePage={hack.url} />
        <div className="page-layout">
          <main className="page-content app-main" role="main">
            {hack.sections.map((sect) => {
              return <SectionRenderer section={sect} key={sect.id} />;
            })}
          </main>
          <aside className="page-sidebar">
            <StickySectionNav pageUrl={hack.url} sections={hack.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default Hackathon;
