import { useEffect } from "react";
import smuSections from "assets/data/smuSections";
import PageMetas from "assets/data/pageMetas";
import { renderTechUsedString } from "assets/utils";
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
    <SectionRegistryProvider>
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
            <StickySectionNav sections={smuSections} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default Smu;
