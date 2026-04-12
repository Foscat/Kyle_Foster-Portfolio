/**
 * @file SectionAnchorNav.jsx
 * @fileoverview A sticky/floating navigation component that uses the fully accessible
 * AccordionList as its core. Intended for long portfolio pages with
 * multiple subsections (CodeStream, Hackathon, etc.).
 *
 * Features:
 * - Sticky on desktop, collapsible drawer on mobile
 * - Auto-syncs with scroll position via AccordionList’s IntersectionObserver
 * - Smooth scrolling, keyboard navigation, screen-reader friendly
 * - Midnight Gold frosted UI styling
 *
 * @module components/SectionAnchorNav
 */

import { Nav, Sidenav } from "rsuite";
import { Link } from "react-router-dom";
import { PageRoute } from "types/navigation.types";
import "./styles.css";

const isLocalRoute = (url = "") => /^(\/(?!\/)|#(?!\/)|\.{1,2}\/)/.test(String(url).trim());

/**
 * @typedef {FeatureSection} FeatureSection
 * @property {string} id - Unique identifier for the section (used for anchors).
 * @property {string} title - Display title for the section.
 * @property {boolean} [isScroller=false] - If true, href will be `#id` for scroll behavior; otherwise, use `url`.
 * @property {string} [url] - Optional URL for non-scrolling navigation.
 */

/**
 * @public
 * @component
 * @name SectionAnchorNav
 *
 * @description A sticky/floating navigation component that uses the fully accessible
 * AccordionList as its core. Intended for long portfolio pages with
 * multiple subsections (CodeStream, Hackathon, etc.).
 *
 * Features:
 * - Sticky on desktop, collapsible drawer on mobile
 * - Auto-syncs with scroll position via AccordionList’s IntersectionObserver
 * - Smooth scrolling, keyboard navigation, screen-reader friendly
 * - Midnight Gold frosted UI styling
 *
 * @param {object} props
 * @param {Array<FeatureSection>} props.sections
 * @param {string} [props.className]
 */
const SectionAnchorNav = ({ title = "Contents", sections = [], page = PageRoute.HOME }) => {
  return (
    <aside className="san-container">
      <Sidenav className="san-accordion">
        <Sidenav.Header>{title || "Sections"}</Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            {sections.map((sect, i) => {
              const href = sect.isScroller ? `${page}#${sect.id}` : sect.url;
              const useRouterLink = isLocalRoute(href);

              return (
                <Nav.Item
                  key={"section-" + i}
                  as={useRouterLink ? Link : undefined}
                  to={useRouterLink ? href : undefined}
                  href={useRouterLink ? undefined : href}
                  className="san-nav-item interactive-surface"
                >
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
