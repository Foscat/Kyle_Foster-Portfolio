import React, { useState } from "react";
import "./styles.css";
import { Nav, Sidenav } from "rsuite";
import { PageRoute} from "../../types/ui.types";

/**
 * @typedef {import("../../types/ui.types.js").FeatureSection} FeatureSection
 */

/**
 * @component SectionAnchorNav
 * ---------------------------------------------------------------------
 * A sticky/floating navigation component that uses the fully accessible
 * AccordionList as its core. Intended for long portfolio pages with
 * multiple subsections (CodeStream, Hackathon, etc.).
 *
 * Features:
 * - Sticky on desktop, collapsible drawer on mobile
 * - Auto-syncs with scroll position via AccordionList’s IntersectionObserver
 * - Smooth scrolling, keyboard navigation, screen-reader friendly
 * - Midnight Gold frosted UI styling
 *
 * @param {Object} props
 * @param {Array<FeatureSection>} props.sections
 * @param {string} [props.className]
 */
const SectionAnchorNav = ({ title = "Contents", sections = [], page= PageRoute.HOME }) => {
  console.log("SectionAnchorNav", { sections });

  return (
    <aside className="san-container">
      <Sidenav className="san-accordion">
        <Sidenav.Header>{title || "Sections"}</Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            {sections.map((sect, i) => {
              return (
                <Nav.Item href={sect.isScroller ? `${page}#${sect.id}` : sect.url}>
                  {sect.title}
                </Nav.Item>
              );
            })}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </aside>
  );
};

export default SectionAnchorNav;
