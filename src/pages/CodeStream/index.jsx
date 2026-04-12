/**
 * @file src\pages\CodeStream\index.jsx
 * @description src\pages\CodeStream\index module.
 * @module src\pages\CodeStream\index
 */

import { useEffect } from "react";
import Data from "assets/data/pageMetas";
import { PageHeader } from "components/layout";
import { StickyNav, StickySectionNav, Footer, helpers } from "components/navigation";
import { SectionRenderer } from "components/renderers";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";

const csos = Data.Codestream;

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
      <div className="container">
        <PageHeader
          title={csos.title}
          subTitle={csos.description}
          jobTitle={csos.jobTitle}
          timespan={csos.timespan}
          tech={csos.tech}
        />
        <StickyNav activePage={csos.url} />
        <div className="page-layout">
          <main className="page-content app-main" role="main">
            {csos.sections.map((sect) => {
              return <SectionRenderer section={sect} key={sect.id} />;
            })}
          </main>
          <aside className="page-sidebar">
            <StickySectionNav pageUrl={csos.url} sections={csos.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default CodeStream;
