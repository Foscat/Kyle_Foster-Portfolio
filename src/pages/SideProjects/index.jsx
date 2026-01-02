import React, { useEffect } from "react";
import { FlexboxGrid } from "rsuite";
import sideProjectsData from "assets/data/sideprojectSections";
import { renderTechUsedString } from "assets/utils";
import PageHeader from "components/PageHeader";
import StickyNav from "components/StickyNav";
import SectionRenderer from "components/SectionRenderer";
import StickySectionNav from "components/StickySectionNav";
import Footer from "components/Footer";
import { restoreScrollPosition } from "navigation/restoreScrollPosition";

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
    <div className="container">
      <PageHeader
        title="Side Projects"
        subTitle={`Tech Used: ${renderTechUsedString()}`}
        jobTitle="Student / Freelancer"
        timespan="2018 - Current"
      />
      <StickyNav />
      <FlexboxGrid justify="space-around">
        <FlexboxGrid.Item colspan={18}>
          {sideProjectsData.map((sect, i) => {
            return (
              <SectionRenderer
                section={sect}
                key={"side-pro-section" + i + 1}
              />
            );
          })}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={5}>
          <StickySectionNav sections={sideProjectsData} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Footer />
    </div>
  );
};

export default SideProjects;
