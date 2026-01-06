import { useEffect } from "react";

import { homeSections } from "assets/data/homeSections";
import { restoreScrollPosition } from "navigation/restoreScrollPosition";

/**
 * Home Page
 * ---------------------------------------------------------------------------
 * A data-driven landing page that gives recruiters and hiring managers a
 * high-level map of the portfolio and clear CTAs into deeper pages.
 *
 * Content is rendered from `assets/data/homeSections.js` so it can be updated
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
      <div className="container">
        <PageHeader
          title="Kyle Foster"
          jobTitle="Senior Front-End / React Engineer"
        />
        <StickyNav />
        <div className="page-layout">
          <main
            className="page-content app-main"
            role="main"
          >
            {homeSections.map((sect, i) => {
              return (
                <SectionRenderer
                  section={sect}
                  key={`home-section-${i}`}
                />
              );
            })}
          </main>
          <aside className="page-sidebar fros">
            <StickySectionNav sections={homeSections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default Home;
