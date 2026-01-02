import React, { useEffect } from "react";
import { FlexboxGrid } from "rsuite";
import Projects from "assets/data/projectMetas";
import codestreamSections from "assets/data/codestreamSections";
import { renderTechUsedString } from "assets/utils";
import { restoreScrollPosition } from "navigation/restoreScrollPosition";
import PageHeader from "components/PageHeader";
import StickyNav from "components/StickyNav";
import SectionRenderer from "components/SectionRenderer";
import StickySectionNav from "components/StickySectionNav";
import Footer from "components/Footer";

const csos = Projects.Codestream;

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
  );
};

export default CodeStream;
