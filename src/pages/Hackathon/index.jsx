import { useEffect } from "react";
import PageMetas from "assets/data/pageMetas";
import hackathonSections from "assets/data/hackathonSections";
import { renderTechUsedString } from "assets/utils";
import { restoreScrollPosition } from "navigation/restoreScrollPosition";

const hack = PageMetas.Hackathon;

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
    restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div className="container">
        <PageHeader
          title={hack.title}
          jobTitle={hack.jobTitle}
          subTitle={`Tech Used: ${renderTechUsedString(hack.tech)}`}
          timespan={hack.timespan}
        />
        <StickyNav />
        <FlexboxGrid justify="space-around">
          <FlexboxGrid.Item colspan={18}>
            {hackathonSections.map((sect, i) => {
              return (
                <SectionRenderer
                  section={sect}
                  key={"hackathon-section" + i + 1}
                />
              );
            })}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={5}>
            <StickySectionNav sections={hackathonSections} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default Hackathon;
