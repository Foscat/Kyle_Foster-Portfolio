/**
 * @file index.jsx
 * @description Side-projects page that renders portfolio sections from structured content metadata.
 * @module pages/SideProjects
 */

import { useEffect } from "react";
import React from "react";
import SectionRegistryProvider from "assets/context/SectionRegistryProvider";
import Data from "assets/data/pageMetas.js";
import { PageHeader } from "components/layout";
import { StickyNav, StickySectionNav, Footer, helpers } from "components/navigation";
import { SectionRenderer } from "components/renderers";

const sidePro = Data.SideProjects;
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
      <div className="container">
        <PageHeader
          title={sidePro.title}
          subTitle={sidePro.description}
          jobTitle={sidePro.jobTitle}
          timespan={sidePro.timespan}
          tech={sidePro.tech}
        />
        <StickyNav activePage={sidePro.url} />
        <div className="page-layout">
          <main className="page-content app-main" role="main">
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
          <aside className="page-sidebar">
            <StickySectionNav pageUrl={sidePro.url} sections={sidePro.sections} />
          </aside>
        </div>
        <Footer />
      </div>
    </SectionRegistryProvider>
  );
};

export default SideProjects;
