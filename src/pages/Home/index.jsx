import React, { useEffect } from "react";
import { FlexboxGrid } from "rsuite";
import PageHeader from "components/PageHeader";
import StickyNav from "components/StickyNav";
import StickySectionNav from "components/StickySectionNav";
import SectionRenderer from "components/SectionRenderer";

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
    <div className="container">
      <PageHeader
        title="Kyle Foster"
        jobTitle="Senior Front-End / React Engineer"
      />
      <StickyNav />
      <FlexboxGrid justify="space-around">
        <FlexboxGrid.Item colspan={18}>
          {homeSections.map((sect, i) => {
            return (
              <SectionRenderer
                section={sect}
                key={"home-section-" + i + 1}
              />
            );
          })}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={5}>
          <StickySectionNav sections={homeSections} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Footer />
    </div>
  );
};

export default Home;
