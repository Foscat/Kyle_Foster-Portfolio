import React, { useEffect } from "react";
import { FlexboxGrid } from "rsuite";
import smuSections from "assets/data/smuSections";
import PageMetas from "assets/data/pageMetas";
import { renderTechUsedString } from "assets/utils";
import PageHeader from "components/PageHeader";
import StickySectionNav from "components/StickySectionNav";
import StickyNav from "components/StickyNav";
import SectionRenderer from "components/SectionRenderer";
import Footer from "components/Footer";
import { restoreScrollPosition } from "navigation/restoreScrollPosition";

const smu = PageMetas.Smu;

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
    <div className="container">
      <PageHeader
        title="SMU Coding Bootcamp"
        subTitle={`Tech Used: ${renderTechUsedString(smu.tech)}`}
        timespan={smu.timespan}
      />
      <StickyNav />
      <FlexboxGrid justify="space-around">
        <FlexboxGrid.Item colspan={18}>
          {smuSections.map((sect, i) => {
            return (
              <SectionRenderer
                section={sect}
                key={"smu-section" + i + 1}
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

export default Smu;
