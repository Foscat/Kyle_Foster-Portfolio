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

import { Link } from "react-router";
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
      <nav className="san-accordion ly-stack" aria-label={title || "Sections"}>
        <h2 className="san-header">{title || "Sections"}</h2>
        <div className="san-body ly-stack ly-gap-2">
            {sections.map((sect, i) => {
              const href = sect.isScroller ? `${page}#${sect.id}` : sect.url;
              const useRouterLink = isLocalRoute(href);
              const Anchor = useRouterLink ? Link : "a";

              return (
                <Anchor
                  key={"section-" + i}
                  to={useRouterLink ? href : undefined}
                  href={useRouterLink ? undefined : href}
                  className="san-nav-item interactive-surface"
                  data-surface-variant="subtle"
                  data-surface-level="1"
                >
                  {sect.title}
                </Anchor>
              );
            })}
        </div>
      </nav>
    </aside>
  );
};

export default SectionAnchorNav;
