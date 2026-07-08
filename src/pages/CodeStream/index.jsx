/**
 * @file src\pages\CodeStream\index.jsx
 * @description src\pages\CodeStream\index module.
 * @module src\pages\CodeStream\index
 */

import { useEffect } from "react";
import pageSummaryMetas from "assets/data/pageSummaryMetas";
import codestreamSections from "assets/data/content/codestream";
import { PageHeader } from "components/layout";
import { StickyNav, StickySectionNav, Footer, helpers } from "components/navigation";
import { SectionRenderer } from "components/renderers";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";

const csos = {
  ...pageSummaryMetas.Codestream,
  sections: codestreamSections,
};

const DIAGRAM_DEFER_CONFIG = {
  rootMargin: "480px 0px",
  threshold: 0.01,
  placeholderMinHeight: "240px",
  fallbackDelayMs: 1200,
  startAt: 1,
};

/**
 * @file index.jsx
 * @fileoverview Professional work case study page for CodeStream Online Studio, featuring a data-driven layout with synchronized sticky navigation and scroll-spy behavior.
 * @module pages/CodeStream
 */

/**
 * @public
 * @component
 * @name CodeStream
 * @description Professional work case study page for CodeStream Online Studio. Renders a data-driven set of sections and wires them into the sticky section navigation for long-form scanning.
 * Features:
 * - Data-driven layout defined by structured section and block metadata
 * - Sticky top navigation for global page access
 * - Sticky section navigation that auto-syncs with scroll position for easy intra-page navigation
 * - Responsive design with mobile-friendly navigation patterns
 * - Uses `SectionRenderer` to dynamically render content blocks based on type, allowing for flexible and maintainable page composition
 * Accessibility:
 * - Semantic HTML structure with landmarks and headings
 * - Keyboard navigable sticky navigation components
 *
 * @returns {JSX.Element}
 */
const CodeStream = () => {
  useEffect(() => {
    helpers.restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div className="page-shell ly-wrapper ly-wrapper--wide ly-stack">
        <PageHeader
          title={csos.title}
          subTitle={csos.description}
          jobTitle={csos.jobTitle}
          timespan={csos.timespan}
          tech={csos.tech}
        />
        <StickyNav activePage={csos.url} />
        <div className="page-layout ly-sidebar-layout ly-sidebar-layout--right">
          <main className="page-content app-main ly-content" role="main">
            {csos.sections.map((sect) => {
              return (
                <SectionRenderer
                  section={sect}
                  deferDiagrams={DIAGRAM_DEFER_CONFIG}
                  key={sect.id}
                />
              );
            })}
          </main>
          <aside className="page-sidebar ly-sidebar">
            <StickySectionNav pageUrl={csos.url} sections={csos.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default CodeStream;
