import "./styles.css";
import { PageRoute } from "types/ui.types";
import { Nav, Sidenav } from "rsuite";

/**
 * @typedef {FeatureSection} FeatureSection
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
              return (
                <Nav.Item
                  key={"section-" + i}
                  href={sect.isScroller ? `${page}#${sect.id}` : sect.url}
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
