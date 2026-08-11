/**
 * @file index.jsx
 * @description Side-projects page that renders portfolio sections from structured content metadata.
 * @module pages/SideProjects
 */

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";
import pageSummaryMetas from "assets/data/pageSummaryMetas";
import sideProjectsSections from "assets/data/content/side-projects";
import { PageHeader } from "components/layout";
import { StickyNav, StickySectionNav, Footer, helpers } from "components/navigation";
import { SectionRenderer } from "components/renderers";
import { PageRoute } from "types/navigation.types";
import "./styles.css";

const sidePro = {
  ...pageSummaryMetas.SideProjects,
  sections: sideProjectsSections,
};

const workArchiveItems = [
  {
    label: "CodeStream",
    description: "Enterprise React product engineering and learning-platform delivery.",
    route: PageRoute.CODE_STREAM,
  },
  {
    label: "Hackathon Work",
    description: "Fast product experiments built under compressed delivery constraints.",
    route: PageRoute.HACKATHON,
  },
  {
    label: "SMU Systems",
    description: "Selected academic software, research, and systems work.",
    route: PageRoute.EDUCATION,
  },
  {
    label: "Engineering Docs",
    description: "Architecture notes, testing standards, and implementation references.",
    route: PageRoute.DOCS,
  },
];
const DIAGRAM_DEFER_CONFIG = {
  rootMargin: "480px 0px",
  threshold: 0.01,
  placeholderMinHeight: "240px",
  fallbackDelayMs: 1200,
  startAt: 1,
  maxDeferred: 2,
  filter: (_block, context) => context?.section?.deferDiagrams !== false,
};

const createDefaultDiagramDeferConfig = () => ({
  ...DIAGRAM_DEFER_CONFIG,
  filter: DIAGRAM_DEFER_CONFIG.filter,
});

const resolveDiagramDeferConfig = (section, sectionIndex, totalSections) => {
  const defaultConfig = createDefaultDiagramDeferConfig();
  const sectionDeferConfigRaw = section?.deferDiagrams;
  let sectionDeferConfig = sectionDeferConfigRaw;
  const resolverContext = {
    section,
    sectionIndex,
    totalSections,
    defaults: defaultConfig,
  };

  if (typeof sectionDeferConfigRaw === "function") {
    try {
      sectionDeferConfig = sectionDeferConfigRaw(
        section,
        sectionIndex,
        totalSections,
        resolverContext
      );
    } catch {
      return defaultConfig;
    }
  }

  if (sectionDeferConfig === false) {
    return {
      ...defaultConfig,
      enabled: false,
    };
  }

  if (sectionDeferConfig === true) {
    return {
      ...defaultConfig,
      enabled: true,
    };
  }

  if (sectionDeferConfig && typeof sectionDeferConfig === "object") {
    return {
      ...defaultConfig,
      ...sectionDeferConfig,
      filter:
        typeof sectionDeferConfig.filter === "function"
          ? sectionDeferConfig.filter
          : defaultConfig.filter,
    };
  }

  return defaultConfig;
};

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
    helpers.restoreScrollPosition();
  }, []);

  return (
    <SectionRegistryProvider>
      <div className="page-shell ly-wrapper ly-wrapper--wide ly-stack">
        <StickyNav activePage={sidePro.url} />
        <PageHeader
          title={sidePro.title}
          subTitle={sidePro.description}
          jobTitle={sidePro.jobTitle}
          timespan={sidePro.timespan}
          tech={sidePro.tech}
        />
        <div className="page-layout ly-sidebar">
          <main className="page-content app-main ly-sidebar__content" role="main">
            <nav className="work-archive" aria-labelledby="work-archive-title">
              <header className="work-archive__header">
                <p>Case-study index</p>
                <h2 id="work-archive-title">Explore the complete work archive</h2>
              </header>
              <div className="work-archive__grid">
                {workArchiveItems.map((item) => (
                  <Link
                    className="work-archive__link interactive-surface"
                    data-surface-variant="subtle"
                    data-surface-level="1"
                    key={item.route}
                    to={item.route}
                  >
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.description}</small>
                    </span>
                    <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </nav>
            {sidePro.sections.map((sect, sectionIndex) => {
              return (
                <SectionRenderer
                  section={sect}
                  deferDiagrams={resolveDiagramDeferConfig(
                    sect,
                    sectionIndex,
                    sidePro.sections.length
                  )}
                  key={sect.id}
                />
              );
            })}
          </main>
          <aside className="page-sidebar ly-sidebar__side">
            <StickySectionNav pageUrl={sidePro.url} sections={sidePro.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default SideProjects;
