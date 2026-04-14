/**
 * @file index.jsx
 * @fileoverview Primary site navigation with synchronized desktop and mobile
 * layouts, active-route handling, and accessibility semantics.
 * @module components/StickyNav
 */

import { useEffect, useState } from "react";
import React from "react";
import { Nav, Drawer } from "rsuite";
import { Link } from "react-router-dom";
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
import { AccessibilityMenu, PaletteToggle, ThemeToggle } from "components/features";
import { PageRoute } from "types/navigation.types";

const MOBILE_ICON_HINTS_KEY = "mobile-icon-hints-dismissed";

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

const isEditableTarget = (target) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT");

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
  const [showMobileIconHints, setShowMobileIconHints] = useState(false);

  const dismissMobileIconHints = () => {
    if (typeof window === "undefined") return;
    setShowMobileIconHints(false);
    window.localStorage.setItem(MOBILE_ICON_HINTS_KEY, "1");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dismissed = window.localStorage.getItem(MOBILE_ICON_HINTS_KEY) === "1";
    if (!dismissed) {
      setShowMobileIconHints(true);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    if (showMobileIconHints) {
      document.documentElement.setAttribute("data-mobile-icon-hints", "true");
      return () => {
        document.documentElement.removeAttribute("data-mobile-icon-hints");
      };
    }

    document.documentElement.removeAttribute("data-mobile-icon-hints");
    return undefined;
  }, [showMobileIconHints]);

  useEffect(() => {
    if (!showMobileIconHints || typeof window === "undefined") return undefined;

    const timeoutId = window.setTimeout(() => {
      dismissMobileIconHints();
    }, 8000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [showMobileIconHints]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleGlobalNavKeys = (event) => {
      if (event.defaultPrevented) return;
      if (isEditableTarget(event.target)) return;

      if (event.key === "Escape" && mobileOpen) {
        event.preventDefault();
        setMobileOpen(false);
        return;
      }

      const noExtraModifiers = !event.altKey && !event.shiftKey && !event.metaKey;
      if (event.key === "Control" && noExtraModifiers && !event.repeat) {
        event.preventDefault();
        setMobileOpen(true);
      }
    };

    window.addEventListener("keydown", handleGlobalNavKeys);
    return () => window.removeEventListener("keydown", handleGlobalNavKeys);
  }, [mobileOpen]);

  return (
    <>
      {/* ============================================================
         Desktop Navigation
         ------------------------------------------------------------
         Icon-only, horizontal layout with hover tooltips.
         ============================================================ */}
      <Nav className="sticky-nav desktop-menu" role="navigation" aria-label="Primary navigation">
        <div className="sticky-nav-pages-group">
          {NAV_ITEMS.map(({ route, label, icon, id }) => {
            const isActive = activePage === route;

            return (
              <Nav.Item
                key={`${route}-${id}`}
                eventKey={route}
                as={Link}
                to={route}
                active={isActive}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => handleNavClick(e, isActive)}
                className="fi-desk-nav-item"
              >
                <Btn
                  icon={icon}
                  variant={Variant.PRIMARY}
                  tooltip={label}
                  ariaLabel={label}
                  clickable
                  className={`nav-icon interactive-surface ${isActive ? "is-active" : ""}`}
                  size={Size.SM}
                  noBG
                />
              </Nav.Item>
            );
          })}
        </div>

        <div className="sticky-nav-tools-group">
          <Nav.Item className="no-popup sticky-nav-theme-toggle">
            <ThemeToggle />
          </Nav.Item>
          <Nav.Item className="no-popup sticky-nav-a11y-toggle">
            <AccessibilityMenu size={Size.LG} enableHotkey />
          </Nav.Item>
        </div>
      </Nav>

      {/* ============================================================
         Mobile Navigation Trigger
         ------------------------------------------------------------
         Burger button toggles Drawer-based navigation.
         ============================================================ */}
      <div className="nav-toggle-btn mobile-only nav-mobile-only">
        <span className="mobile-icon-hint">Menu</span>
        <Btn
          icon={faMap}
          variant={Variant.ACCENT}
          size={Size.LG}
          ariaLabel="Open navigation menu"
          onClick={() => {
            dismissMobileIconHints();
            setMobileOpen(true);
          }}
        />
      </div>

      <div
        className="a11y-toggle-btn mobile-only nav-mobile-only"
        onClickCapture={dismissMobileIconHints}
      >
        <span className="mobile-icon-hint">A11y</span>
        <AccessibilityMenu size={Size.LG} showTooltip={false} />
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
                  as={Link}
                  to={route}
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
            <div className="sticky-nav-mobile-palette">
              <PaletteToggle size={Size.SM} />
            </div>
            <div className="sticky-nav-mobile-a11y">
              <AccessibilityMenu size={Size.LG} showTooltip={false} />
            </div>
          </Nav>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default StickyNav;
