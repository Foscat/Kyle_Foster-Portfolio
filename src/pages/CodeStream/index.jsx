import { useEffect } from "react";
import Metas from "assets/data/projectMetas";
import codestreamSections from "assets/data/codestreamSections";
import { renderTechUsedString } from "assets/utils";
import { restoreScrollPosition } from "navigation/restoreScrollPosition";

const csos = Metas.Codestream;

/**
 * CodeStream Page
 * ---------------------------------------------------------------------------
 * Professional work case study page for CodeStream Online Studio.
 * Renders a data-driven set of sections and wires them into the sticky
 * section navigation for long-form scanning.
 *
 * @component
 * @returns {JSX.Element}
 */
const CodeStream = () => {
  useEffect(() => {
    restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div className="container">
        <PageHeader
          title={csos.title}
          jobTitle={csos.jobTitle}
          subtitle={`Tech Used: ${renderTechUsedString(csos.tech)}`}
          timespan={csos.timespan}
        />
        <StickyNav />
        <FlexboxGrid justify="space-around">
          <FlexboxGrid.Item colspan={18}>
            {codestreamSections.map((sect, i) => {
              return (
                <SectionRenderer
                  section={sect}
                  key={"codestream-section" + i + 1}
                />
              );
            })}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={5}>
            <StickySectionNav sections={codestreamSections} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default CodeStream;
