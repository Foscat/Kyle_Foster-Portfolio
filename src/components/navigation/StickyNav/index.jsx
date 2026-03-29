/**
 * @file index.jsx
 * @fileoverview Primary site navigation with synchronized desktop and mobile
 * layouts, active-route handling, and accessibility semantics.
 * @module components/StickyNav
 */

import { useState } from "react";
import { Nav, Drawer } from "rsuite";
import {
  faHome,
  faBriefcase,
  faGraduationCap,
  faTrophy,
  faFolderOpen,
  faEnvelope,
  faMap,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { Size, Variant } from "types/ui.types";
import { Btn, FrostedIcon } from "components/ui";
import "./styles.css";
import { ThemeToggle } from "components/features";
import { PageRoute } from "types/navigation.types";

/**
 * @typedef {Object} NavItem
 * @description Describes a single navigation entry rendered in both desktop and mobile
 * navigation variants.
 *
 * @property {string} id - Unique identifier for the nav item.
 * @property {string} route - Route path used for navigation.
 * @property {string} label - Human-readable navigation label.
 * @property {*} icon - FontAwesome icon associated with the route.
 */

/**
 * @constant {NavItem[]} NAV_ITEMS
 * @description Centralized definition of all navigable routes used by both desktop and
 * mobile navigation variants.
 *
 * Keeping this data-driven:
 * - Prevents drift between layouts
 * - Ensures consistent ordering and labeling
 * - Makes future additions trivial
 *
 */
const NAV_ITEMS = [
  { id: "ni-home", route: PageRoute.HOME, label: "Home", icon: faHome },
  {
    id: "ni-professional",
    route: PageRoute.PROFESSIONAL,
    label: "Professional Work",
    icon: faBriefcase,
  },
  { id: "ni-education", route: PageRoute.EDUCATION, label: "Education", icon: faGraduationCap },
  { id: "ni-hackathon", route: PageRoute.HACKATHON, label: "Hackathon", icon: faTrophy },
  {
    id: "ni-projects",
    route: PageRoute.SIDE_PROJECTS,
    label: "Personal Projects",
    icon: faFolderOpen,
  },
  { id: "ni-docs", route: PageRoute.DOCS, label: "Docs", icon: faBook },
  { id: "ni-contact", route: PageRoute.CONNECT, label: "Contact Me", icon: faEnvelope },
];

/**
 * @function handleNavClick
 * @description Centralized click handler for navigation items that prevents redundant
 * navigation events when the user clicks on the currently active route.
 * Prevents redundant navigation when clicking the active route.
 *
 * Preserves:
 * - Visual active highlighting
 * - `aria-current="page"` accessibility semantics
 * - While avoiding unnecessary navigation events
 *
 * @param {MouseEvent} e - Click event.
 * @param {boolean} isActive - Whether the target route is already active.
 * @returns {void}
 *
 * @example
 * ```js
 * <Nav.Item
 *    href="/home"
 *    active={activePage === "/home"}
 *    aria-current={activePage === "/home" ? "page" : undefined}
 *    onClick={(e) => handleNavClick(e, activePage === "/home")}
 * >
 *    Home
 * </Nav.Item>
 * ```
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
 * Primary site navigation component with dual layouts:
 *
 * Desktop layout:
 * - Horizontal icon-based navigation
 * - Icon-only buttons with hover tooltips
 * - Uses the design-system `Btn` and `FrostedIcon` components
 *
 * Mobile layout:
 * - Burger-triggered RSuite `Drawer`
 * - Vertical, text-based navigation
 * - Touch-friendly and hover-independent
 *
 * Shared behavior:
 * - Active route highlighting
 * - `aria-current="page"` for accessibility
 * - Active route suppresses navigation without disabling styles
 *
 * @public
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string} props.activePage - Currently active route.
 *
 * @returns {JSX.Element} Rendered sticky navigation.
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
                  className="nav-icon interactive-surface"
                  size={Size.LG}
                  noBG
                />
              </Nav.Item>
            );
          })}
          <Nav.Item className="no-popup sticky-nav-theme-toggle">
            <ThemeToggle />
          </Nav.Item>
        </Nav>
      </nav>

      {/* ============================================================
         Mobile Navigation Trigger
         ------------------------------------------------------------
         Burger button toggles Drawer-based navigation.
         ============================================================ */}
      <div className="nav-toggle-btn mobile-only">
        <Btn
          icon={faMap}
          variant={Variant.ACCENT}
          ariaLabel="Open navigation menu"
          tooltip="Open Navigation Menu"
          tooltipPlacement="right"
          tooltipFollowCursor={false}
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
          <Drawer.Title>Site Navigation</Drawer.Title>
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
                  className="interactive-surface"
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
            <ThemeToggle size={Size.MD} />
          </Nav>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default StickyNav;
