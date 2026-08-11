/**
 * @file index.jsx
 * @fileoverview Primary site navigation with synchronized desktop and mobile
 * layouts, active-route handling, and accessibility semantics. Mobile utilities
 * stay inside the drawer so small screens retain the full content width.
 * @module components/StickyNav
 */

import { useCallback, useEffect, useState } from "react";
import { Nav, Drawer } from "rsuite";
import { Link, useNavigate } from "react-router";
import { faBars, faCircleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Size, Variant } from "types/ui.types";
import { Btn } from "components/ui";
import "./styles.css";
import { AccessibilityMenu, ColorMenu } from "components/features";
import ResumePreviewTrigger from "components/features/ResumePreview/ResumePreviewTrigger";
import resumeData from "assets/data/content/resumeData.js";
import { useTheme } from "assets/context/ThemeContext.jsx";
import { PageRoute } from "types/navigation.types";

/*
 * @typedef {Object} NavItem
 * @description Describes a single navigation entry rendered in both desktop and mobile
 * navigation variants.
 *
 * @property {string} id - Unique identifier for the nav item.
 * @property {string} route - Route path used for navigation.
 * @property {string} label - Human-readable navigation label.
 * @property {string[]} [matches] - Additional routes grouped beneath the entry.
 */

/*
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
  { id: "ni-home", route: PageRoute.HOME, label: "Home" },
  {
    id: "ni-ste",
    route: PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES,
    label: "STE",
  },
  {
    id: "ni-interface-system",
    route: PageRoute.INTERFACE_SYSTEM,
    label: "Interface System",
  },
  {
    id: "ni-work",
    route: PageRoute.SIDE_PROJECTS,
    label: "Work",
    matches: [PageRoute.PROFESSIONAL, PageRoute.HACKATHON, PageRoute.EDUCATION, PageRoute.DOCS],
  },
  { id: "ni-contact", route: PageRoute.CONTACT, label: "Contact" },
];

/**
 * Keep legacy case studies discoverable without letting them dominate the
 * primary information architecture.
 *
 * @param {string} activePage - Current route pathname.
 * @param {object} item - Navigation destination and optional grouped routes.
 * @returns {boolean} Whether the destination represents the current route.
 */
const isRouteActive = (activePage, item) =>
  activePage === item.route || item.matches?.includes(activePage) === true;

const isEditableTarget = (target) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT");

/*
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
const isPrimaryNavigationEvent = (event) => {
  const hasModifier = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
  const isPrimaryButton = typeof event.button !== "number" || event.button === 0;
  return isPrimaryButton && !hasModifier;
};

const handleNavClick = (event, { isActive, route, navigate, onAfterNavigate } = {}) => {
  if (!isPrimaryNavigationEvent(event)) return;

  event.preventDefault();
  event.stopPropagation();

  if (!isActive && typeof route === "string" && typeof navigate === "function") {
    navigate(route);
  }

  if (typeof onAfterNavigate === "function") {
    onAfterNavigate();
  }
};

/*
 * StickyNav
 * ------------------------------------------------------------------
 * Primary site navigation component with dual layouts:
 *
 * Desktop layout:
 * - Compact, text-led command bar
 * - Current-route styling across curated route groups
 * - Design-system controls for utilities
 *
 * Mobile layout:
 * - Compact brand header with one menu trigger
 * - Theme, accessibility, and resume controls grouped inside the drawer
 * - Burger-triggered RSuite `Drawer` for primary page navigation
 * - Vertical, text-based navigation inside the Drawer
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
  const navigate = useNavigate();
  const { theme, palette } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const safeTheme = typeof theme === "string" ? theme : "auto";
  const safePalette = typeof palette === "string" ? palette : "ocean";
  const resumeDownloadName = `Kyle-Foster-Senior-React-Frontend-Engineer-Resume-${safeTheme}-${safePalette}.pdf`;
  const resumePreviewTitle = "Kyle Foster - Senior React / Frontend Engineer Resume";
  const resumePreviewSubtitle =
    "A compact resume preview with PDF-style spacing and download options.";

  const closeMobileNav = useCallback(() => {
    setMobileOpen(false);
    if (typeof document === "undefined") return;
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleGlobalNavKeys = (event) => {
      if (event.defaultPrevented) return;
      if (isEditableTarget(event.target)) return;

      if (event.key === "Escape" && mobileOpen) {
        event.preventDefault();
        closeMobileNav();
        return;
      }

      const normalizedKey =
        typeof event.key === "string" ? event.key.trim().toLowerCase() : String(event.key);
      const hasPrimaryModifier = event.ctrlKey || event.metaKey;
      const isDrawerShortcut =
        normalizedKey === "m" && hasPrimaryModifier && event.shiftKey && !event.altKey;
      if (isDrawerShortcut && !event.repeat) {
        event.preventDefault();
        setMobileOpen(true);
      }
    };

    window.addEventListener("keydown", handleGlobalNavKeys);
    return () => window.removeEventListener("keydown", handleGlobalNavKeys);
  }, [closeMobileNav, mobileOpen]);

  return (
    <>
      {/* ============================================================
         Desktop Navigation
         ------------------------------------------------------------
         Compact text-led command bar.
         ============================================================ */}
      <Nav className="sticky-nav desktop-menu" role="navigation" aria-label="Primary navigation">
        <Link className="sticky-nav-brand" to={PageRoute.HOME} aria-label="Kyle Foster home">
          KF
        </Link>
        <div className="sticky-nav-pages-group">
          {NAV_ITEMS.map((item) => {
            const { route, label, id } = item;
            const isExactRoute = activePage === route;
            const isGroupActive = isRouteActive(activePage, item);

            return (
              <Nav.Item
                key={`${route}-${id}`}
                as="div"
                data-testid={`desktop-nav-${id}`}
                className={`fi-desk-nav-item sticky-nav-desktop-trigger sticky-nav-desktop-trigger--page ${
                  isGroupActive ? "is-route-active" : ""
                }`}
              >
                <Btn
                  key={item.id}
                  text={label}
                  variant={Variant.PRIMARY}
                  ariaLabel={label}
                  ariaCurrent={isExactRoute ? "page" : undefined}
                  href={route}
                  hrefLocal
                  clickable
                  className={`nav-link ${isGroupActive ? "is-active" : ""}`}
                  size={Size.MD}
                  noBG
                />
              </Nav.Item>
            );
          })}
        </div>

        <div className="sticky-nav-tools-group">
          <Nav.Item
            as="div"
            className="no-popup sticky-nav-resume-toggle sticky-nav-desktop-trigger sticky-nav-desktop-trigger--utility sticky-nav-desktop-trigger--resume"
          >
            <ResumePreviewTrigger
              buttonText=""
              title={resumePreviewTitle}
              subtitle={resumePreviewSubtitle}
              resume={resumeData}
              downloadName={resumeDownloadName}
              buttonClassName="sticky-nav-resume-trigger"
              icon={faCircleDown}
              tooltip="Resume preview and download"
              ariaLabel="Open resume preview and download options"
              size={Size.LG}
              variant={Variant.SECONDARY}
              noBG
            />
          </Nav.Item>
          <Nav.Item
            as="div"
            className="no-popup sticky-nav-color-toggle sticky-nav-desktop-trigger sticky-nav-desktop-trigger--utility sticky-nav-desktop-trigger--color sticky-nav-desktop-trigger--round"
          >
            <ColorMenu size={Size.LG} />
          </Nav.Item>
          <Nav.Item
            as="div"
            className="no-popup sticky-nav-a11y-toggle sticky-nav-desktop-trigger sticky-nav-desktop-trigger--utility sticky-nav-desktop-trigger--a11y sticky-nav-desktop-trigger--round"
          >
            <AccessibilityMenu size={Size.LG} enableHotkey />
          </Nav.Item>
        </div>
      </Nav>
      {/* ============================================================
         Mobile Navigation Trigger
         ------------------------------------------------------------
         Burger button toggles Drawer-based navigation.
         ============================================================ */}
      <header
        className="mobile-site-header mobile-only nav-mobile-only"
        data-testid="mobile-site-header"
      >
        <Link
          className="mobile-site-header__brand"
          to={PageRoute.HOME}
          aria-label="Kyle Foster home"
        >
          KF
        </Link>
        <Btn
          icon={faBars}
          variant={Variant.ACCENT}
          size={Size.LG}
          noBG
          ariaLabel="Open navigation menu"
          onClick={(event) => {
            event?.preventDefault?.();
            event?.stopPropagation?.();
            setMobileOpen(true);
          }}
        />
      </header>
      {/* ============================================================
         Mobile Navigation Drawer
         ------------------------------------------------------------
         Vertical, text-based navigation optimized for touch.
         ============================================================ */}
      <Drawer
        placement="left"
        open={mobileOpen}
        onClose={closeMobileNav}
        className="mobile-nav-drawer"
        closeButton={false}
      >
        <Drawer.Header closeButton={false}>
          <Drawer.Title>Site Navigation</Drawer.Title>
          <Btn
            icon={faXmark}
            variant={Variant.ACCENT}
            size={Size.LG}
            noBG
            ariaLabel="Close site navigation"
            className="mobile-nav-drawer__close"
            onClick={closeMobileNav}
          />
        </Drawer.Header>

        <Drawer.Body>
          <Nav vertical>
            {NAV_ITEMS.map((item) => {
              const { route, label, id } = item;
              const isExactRoute = activePage === route;
              const isGroupActive = isRouteActive(activePage, item);

              return (
                <Nav.Item
                  key={`${route}-${id}`}
                  eventKey={route}
                  as={Link}
                  to={route}
                  className={`interactive-surface ${isGroupActive ? "is-route-active" : ""}`}
                  data-surface-variant={isGroupActive ? "primary" : "subtle"}
                  data-surface-level={isGroupActive ? "2" : "1"}
                  aria-current={isExactRoute ? "page" : undefined}
                  onClick={(event) =>
                    handleNavClick(event, {
                      isActive: isExactRoute,
                      route,
                      navigate,
                      onAfterNavigate: closeMobileNav,
                    })
                  }
                >
                  {label}
                </Nav.Item>
              );
            })}
            <div className="sticky-nav-mobile-utilities">
              <div className="sticky-nav-mobile-color sticky-nav-mobile-trigger sticky-nav-mobile-trigger--utility sticky-nav-mobile-trigger--color">
                <ColorMenu size={Size.LG} showTooltip={false} />
              </div>
              <div className="sticky-nav-mobile-a11y sticky-nav-mobile-trigger sticky-nav-mobile-trigger--utility sticky-nav-mobile-trigger--a11y sticky-nav-mobile-trigger--scaled">
                <AccessibilityMenu size={Size.LG} showTooltip={false} />
              </div>
              <div
                className="sticky-nav-mobile-resume sticky-nav-mobile-trigger sticky-nav-mobile-trigger--utility sticky-nav-mobile-trigger--resume sticky-nav-mobile-trigger--scaled"
                data-testid="mobile-resume-trigger-wrapper"
              >
                <ResumePreviewTrigger
                  buttonText=""
                  title={resumePreviewTitle}
                  subtitle={resumePreviewSubtitle}
                  resume={resumeData}
                  downloadName={resumeDownloadName}
                  buttonClassName="sticky-nav-mobile-resume-trigger"
                  icon={faCircleDown}
                  ariaLabel="Open resume preview and download options"
                  size={Size.LG}
                  variant={Variant.SECONDARY}
                  noBG
                />
              </div>
            </div>
          </Nav>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default StickyNav;
