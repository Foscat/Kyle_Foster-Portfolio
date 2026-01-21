import { useState } from "react";
import { Nav, Drawer } from "rsuite";
import Btn from "components/Btn";
import {
  faBars,
  faHome,
  faBriefcase,
  faGraduationCap,
  faTrophy,
  faFolderOpen,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { PageRoute, Variant } from "types/ui.types";
import FrostedIcon from "components/FrostedIcon";

/**
 * Navigation item configuration
 * ------------------------------------------------------------
 * Centralized definition of all navigable routes used by
 * both desktop and mobile navigation variants.
 *
 * Keeping this data-driven prevents drift between layouts
 * and makes future additions trivial.
 */
const NAV_ITEMS = [
  { id: "ni-home", route: PageRoute.HOME, label: "Home", icon: faHome },
  {
    id: "ni-professional",
    route: PageRoute.PROFESSIONAL,
    label: "Professional",
    icon: faBriefcase,
  },
  { id: "ni-education", route: PageRoute.EDUCATION, label: "Education", icon: faGraduationCap },
  { id: "ni-hackathon", route: PageRoute.HACKATHON, label: "Hackathon", icon: faTrophy },
  { id: "ni-projects", route: PageRoute.PROJECTS, label: "Projects", icon: faFolderOpen },
  { id: "ni-contact", route: PageRoute.CONTACT, label: "Contact", icon: faEnvelope },
];

/**
 * Prevent redundant navigation when clicking the active route.
 *
 * This preserves:
 * - visual "active" highlighting
 * - accessibility semantics (aria-current)
 * - while avoiding unnecessary navigation events
 *
 * @param {MouseEvent} e
 * @param {boolean} isActive
 */
const handleNavClick = (e, isActive) => {
  if (isActive) {
    e.preventDefault();
    e.stopPropagation();
  }
};

/**
 * StickyNav
 * ------------------------------------------------------------------
 * Primary site navigation with dual layouts:
 *
 * Desktop:
 * - Horizontal icon-based navigation
 * - Icon-only buttons with hover tooltips
 * - Uses the design-system <Btn> component
 *
 * Mobile:
 * - Burger-triggered RSuite Drawer
 * - Vertical text-based navigation
 * - Touch-friendly and hover-independent
 *
 * Shared behavior:
 * - Active route highlighting
 * - aria-current="page" for accessibility
 * - Active route suppresses navigation without disabling styles
 *
 * @component
 * @param {object} props
 * @param {string} props.activePage - Currently active route
 */
const StickyNav = ({ activePage }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ============================================================
         Desktop Navigation
         ------------------------------------------------------------
         Icon-only, horizontal layout with hover tooltips.
         ============================================================ */}
      <nav className="sticky-nav desktop-menu" aria-label="Primary navigation">
        <Nav>
          {NAV_ITEMS.map(({ route, label, icon, id }) => {
            const isActive = activePage === route;

            return (
              <Nav.Item
                key={`${route}-${id}`}
                eventKey={route}
                href={route}
                active={isActive}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => handleNavClick(e, isActive)}
                className="fi-desk-nav-item"
              >
                <FrostedIcon
                  icon={icon}
                  variant={isActive ? Variant.ACCENT : Variant.PRIMARY}
                  tooltip={label}
                  ariaLabel={label}
                  clickable
                  className="nav-icon"
                />
              </Nav.Item>
            );
          })}
        </Nav>
      </nav>

      {/* ============================================================
         Mobile Navigation Trigger
         ------------------------------------------------------------
         Burger button toggles Drawer-based navigation.
         ============================================================ */}
      <div className="mobile-only">
        <Btn
          icon={faBars}
          variant={Variant.PRIMARY}
          ariaLabel="Open navigation menu"
          tooltip="Open Navigation Menu"
          onClick={() => setMobileOpen(true)}
        />
      </div>

      {/* ============================================================
         Mobile Navigation Drawer
         ------------------------------------------------------------
         Vertical, text-based navigation optimized for touch.
         ============================================================ */}
      <Drawer
        placement="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        className="mobile-nav-drawer"
      >
        <Drawer.Header>
          <Drawer.Title>Navigation</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          <Nav vertical>
            {NAV_ITEMS.map(({ route, label, id }) => {
              const isActive = activePage === route;

              return (
                <Nav.Item
                  key={`${route}-${id}`}
                  eventKey={route}
                  href={route}
                  active={isActive}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => {
                    handleNavClick(e, isActive);
                    setMobileOpen(false);
                  }}
                >
                  {label}
                </Nav.Item>
              );
            })}
          </Nav>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default StickyNav;
