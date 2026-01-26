import { useEffect } from "react";
import Data from "assets/data/pageMetas";
import { restoreScrollPosition } from "navigation/restoreScrollPosition";
import SectionRegistryProvider from "navigation/SectionRegistryProvider";
import PageHeader from "components/PageHeader";
import StickyNav from "components/StickyNav";
import SectionRenderer from "components/SectionRenderer";
import StickySectionNav from "components/StickySectionNav";
import Footer from "components/Footer";

const home = Data.Home;

/**
 * Home Page
 * ---------------------------------------------------------------------------
 * A data-driven landing page that gives recruiters and hiring managers a
 * high-level map of the portfolio and clear CTAs into deeper pages.
 *
 * Content is rendered from `assets/data/pageMetas.js` and `assets/data/homeSections.js` so it can be updated
 * without touching layout code.
 *
 * @component
 * @returns {JSX.Element}
 */
const Home = () => {
  useEffect(() => {
    restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div>
        <PageHeader
          title={home.title}
          subTitle={home.description}
          timespan={home.timespan}
          tech={home.tech}
          jobTitle={home.jobTitle}
        />
        <StickyNav activePage={home.url} />
        <div className="page-layout">
          <main className="page-content app-main" role="main">
            {home.sections.map((sect) => {
              return <SectionRenderer section={sect} key={sect.id} />;
            })}
          </main>
          <aside className="page-sidebar">
            <StickySectionNav pageUrl={home.url} sections={home.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default Home;
