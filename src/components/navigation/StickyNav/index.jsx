/**
 * @file index.jsx
 * @fileoverview Primary site navigation with synchronized desktop and mobile
 * layouts, active-route handling, and accessibility semantics.
 * @module components/StickyNav
 */

import { useCallback, useEffect, useState } from "react";
import React from "react";
import { Nav, Drawer } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import {
  faHome,
  faBriefcase,
  faGraduationCap,
  faTrophy,
  faFolderOpen,
  faEnvelope,
  faBook,
  faSignsPost,
  faCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { Size, Variant } from "types/ui.types";
import { Btn } from "components/ui";
import "./styles.css";
import { AccessibilityMenu, ColorMenu } from "components/features";
import ResumePreviewTrigger from "components/features/ResumePreview/ResumePreviewTrigger";
import resumeData from "assets/data/content/resumeData.js";
import { resolveResumePdfHref } from "assets/data/resume/pdfAssets.js";
import { useTheme } from "assets/context/ThemeContext.jsx";
import { PageRoute } from "types/navigation.types";

const MOBILE_ICON_HINTS_KEY = "mobile-icon-hints-dismissed";

/*
 * @typedef {Object} NavItem
 * @description Describes a single navigation entry rendered in both desktop and mobile
 * navigation variants.
 *
 * @property {string} id - Unique identifier for the nav item.
 * @property {string} route - Route path used for navigation.
 * @property {string} label - Human-readable navigation label.
 * @property {*} icon - FontAwesome icon associated with the route.
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
  { id: "ni-contact", route: PageRoute.CONTACT, label: "Contact Me", icon: faEnvelope },
  { id: "ni-docs", route: PageRoute.DOCS, label: "Docs", icon: faBook },
];

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
 * - Horizontal icon-based navigation
 * - Icon-only buttons with hover tooltips
 * - Uses the design-system `Btn` and `FrostedIcon` components
 *
 * Mobile layout:
 * - Fixed left-rail of floating icon buttons (nav toggle, color, a11y, resume,
 *   section-nav when available); button dimensions controlled by
 *   `--sticky-nav-mobile-trigger-size`
 * - Nav toggle, section-nav, a11y, and resume icons all use
 *   `--sticky-nav-mobile-trigger-utility-glyph-size` with `scale(1.45)` so
 *   every rail icon renders at consistent visual weight
 * - Color toggle uses the base `--sticky-nav-mobile-trigger-glyph-size` token
 * - Each floating rail button is wrapped in a `div.{role}-toggle-btn.mobile-only.nav-mobile-only`;
 *   test IDs: `mobile-nav-trigger-wrapper`, `mobile-color-trigger-wrapper`,
 *   `mobile-a11y-trigger-wrapper`, `mobile-resume-trigger-wrapper`
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
  const [showMobileIconHints, setShowMobileIconHints] = useState(false);
  const safeTheme = typeof theme === "string" ? theme : "auto";
  const safePalette = typeof palette === "string" ? palette : "ocean";
  const resumePdfHref = resolveResumePdfHref(theme);
  const resumeDownloadName = `Kyle-Foster-Resume-${safeTheme}-${safePalette}.pdf`;
  const resumePreviewTitle = "Kyle Foster - Resume";
  const resumePreviewSubtitle =
    "A cleaner, document-first preview with improved spacing and a real paper stage.";

  const closeMobileNav = useCallback(() => {
    setMobileOpen(false);
    if (typeof document === "undefined") return;
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }, []);

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
        closeMobileNav();
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
  }, [closeMobileNav, mobileOpen]);

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
                onClick={(event) =>
                  handleNavClick(event, {
                    isActive,
                    route,
                    navigate,
                  })
                }
                className="fi-desk-nav-item"
              >
                <Btn
                  icon={icon}
                  variant={Variant.PRIMARY}
                  tooltip={label}
                  ariaLabel={label}
                  clickable
                  className={`nav-icon ${isActive ? "is-active" : ""}`}
                  size={Size.LG}
                  noBG
                />
              </Nav.Item>
            );
          })}
        </div>

        <div className="sticky-nav-tools-group">
          <Nav.Item className="no-popup sticky-nav-resume-toggle">
            <ResumePreviewTrigger
              buttonText=""
              title={resumePreviewTitle}
              subtitle={resumePreviewSubtitle}
              resume={resumeData}
              pdfHref={resumePdfHref}
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
          <Nav.Item className="no-popup sticky-nav-color-toggle">
            <ColorMenu size={Size.LG} />
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
      <div
        className="nav-toggle-btn mobile-only nav-mobile-only"
        data-testid="mobile-nav-trigger-wrapper"
      >
        <span className="mobile-icon-hint">Menu</span>
        <Btn
          icon={faSignsPost}
          variant={Variant.ACCENT}
          size={Size.LG}
          noBG
          ariaLabel="Open navigation menu"
          onClick={(event) => {
            event?.preventDefault?.();
            event?.stopPropagation?.();
            dismissMobileIconHints();
            setMobileOpen(true);
          }}
        />
      </div>

      <div
        className="color-toggle-btn mobile-only nav-mobile-only"
        data-testid="mobile-color-trigger-wrapper"
        onClickCapture={dismissMobileIconHints}
      >
        <span className="mobile-icon-hint">Color</span>
        <ColorMenu size={Size.LG} showTooltip={false} />
      </div>

      <div
        className="a11y-toggle-btn mobile-only nav-mobile-only"
        data-testid="mobile-a11y-trigger-wrapper"
        onClickCapture={dismissMobileIconHints}
      >
        <span className="mobile-icon-hint">A11y</span>
        <AccessibilityMenu size={Size.LG} showTooltip={false} />
      </div>

      <div
        className="resume-toggle-btn mobile-only nav-mobile-only"
        data-testid="mobile-resume-trigger-wrapper"
        onClickCapture={dismissMobileIconHints}
      >
        <span className="mobile-icon-hint">Resume</span>
        <ResumePreviewTrigger
          buttonText=""
          title={resumePreviewTitle}
          subtitle={resumePreviewSubtitle}
          resume={resumeData}
          pdfHref={resumePdfHref}
          downloadName={resumeDownloadName}
          buttonClassName="sticky-nav-mobile-resume-trigger"
          icon={faCircleDown}
          ariaLabel="Open resume preview and download options"
          size={Size.LG}
          variant={Variant.SECONDARY}
          noBG
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
        onClose={closeMobileNav}
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
                  onClick={(event) =>
                    handleNavClick(event, {
                      isActive,
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
              <div className="sticky-nav-mobile-color">
                <ColorMenu size={Size.LG} showTooltip={false} />
              </div>
              <div className="sticky-nav-mobile-a11y">
                <AccessibilityMenu size={Size.LG} showTooltip={false} />
              </div>
              <div className="sticky-nav-mobile-resume">
                <ResumePreviewTrigger
                  buttonText=""
                  title={resumePreviewTitle}
                  subtitle={resumePreviewSubtitle}
                  resume={resumeData}
                  pdfHref={resumePdfHref}
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
