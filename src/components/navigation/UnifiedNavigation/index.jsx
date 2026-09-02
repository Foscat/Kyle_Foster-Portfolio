/**
 * @file index.jsx
 * @fileoverview Unified page navigation with one viewport-wide sticky surface,
 * responsive primary navigation, and optional route-section navigation.
 * @module components/navigation/UnifiedNavigation
 */

import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { faBars, faCircleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Size, SurfaceLevel, Variant } from "types/ui.types";
import { Btn } from "components/ui";
import "./styles.css";
import { AccessibilityMenu, ColorMenu } from "components/features";
import ResumePreviewTrigger from "components/features/ResumePreview/ResumePreviewTrigger";
import resumeData from "assets/data/content/resumeData.js";
import { useTheme } from "assets/context/ThemeContext.jsx";
import { PageRoute } from "types/navigation.types";
import StickySectionNav from "../StickySectionNav";
import Dialog from "components/ui/Dialog";

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
 * <Link
 *    href="/home"
 *    active={activePage === "/home"}
 *    aria-current={activePage === "/home" ? "page" : undefined}
 *    onClick={(e) => handleNavClick(e, activePage === "/home")}
 * >
 *    Home
 * </Link>
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
 * UnifiedNavigation
 * ------------------------------------------------------------------
 * Primary site navigation with one viewport-independent header:
 * - Left icon opens website destinations and utilities in a drawer
 * - Centered brand links home
 * - Optional right icon opens route-section navigation
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
 * @param {string} [props.pageUrl] - Canonical route path used for section hashes.
 * @param {Array<object>} [props.sections=[]] - Optional route-section definitions.
 *
 * @returns {JSX.Element} Rendered sticky navigation.
 */
const UnifiedNavigation = ({ activePage, pageUrl = activePage, sections = [] }) => {
  const navigate = useNavigate();
  const { theme, palette } = useTheme();
  const navigationRef = useRef(null);
  const [siteNavigationOpen, setSiteNavigationOpen] = useState(false);
  const hasSections = Array.isArray(sections) && sections.length > 0;
  const safeTheme = typeof theme === "string" ? theme : "auto";
  const safePalette = typeof palette === "string" ? palette : "ocean";
  const resumeDownloadName = `Kyle-Foster-Senior-React-Frontend-Engineer-Resume-${safeTheme}-${safePalette}.pdf`;
  const resumePreviewTitle = "Kyle Foster - Senior React / Frontend Engineer Resume";
  const resumePreviewSubtitle =
    "A compact resume preview with PDF-style spacing and download options.";

  useLayoutEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return undefined;

    const root = document.documentElement;
    const navigation = navigationRef.current;
    if (!navigation) return undefined;

    // Freeze the wrapper's rendered insets in pixels before the values enter
    // the nested container. This avoids container-unit re-evaluation and also
    // includes centered-wrapper margins on exceptionally wide displays.
    const syncNavigationGeometry = () => {
      const wrapper = navigation.parentElement;
      if (wrapper) {
        const wrapperStyles = window.getComputedStyle(wrapper);
        const wrapperRect = wrapper.getBoundingClientRect();
        const layoutViewportRect = document.body.getBoundingClientRect();
        const inlineStart = Number.parseFloat(
          wrapperStyles.paddingInlineStart || wrapperStyles.paddingLeft || "0"
        );
        const inlineEnd = Number.parseFloat(
          wrapperStyles.paddingInlineEnd || wrapperStyles.paddingRight || "0"
        );
        const breakoutStart = Math.max(
          0,
          wrapperRect.left - layoutViewportRect.left + (inlineStart || 0)
        );
        const breakoutEnd = Math.max(
          0,
          layoutViewportRect.right - wrapperRect.right + (inlineEnd || 0)
        );
        const renderedInsets = [
          ["--unified-navigation-breakout-start", breakoutStart],
          ["--unified-navigation-breakout-end", breakoutEnd],
        ];

        renderedInsets.forEach(([propertyName, inset]) => {
          const nextInset = `${inset}px`;
          if (navigation.style.getPropertyValue(propertyName) !== nextInset) {
            navigation.style.setProperty(propertyName, nextInset);
          }
        });
      }

      // Publish the shared header height so anchors and persistent controls use
      // the same offset at every breakpoint and supported text scale.
      const renderedHeight = Math.ceil(navigation.getBoundingClientRect().height || 0);
      if (renderedHeight <= 0) return;

      const nextHeight = `${renderedHeight}px`;
      if (root.style.getPropertyValue("--portfolio-primary-nav-height") !== nextHeight) {
        root.style.setProperty("--portfolio-primary-nav-height", nextHeight);
      }
    };

    const resizeObserver =
      typeof window.ResizeObserver === "function"
        ? new window.ResizeObserver(syncNavigationGeometry)
        : null;

    resizeObserver?.observe(navigation);
    if (navigation.parentElement) {
      resizeObserver?.observe(navigation.parentElement);
    }
    window.addEventListener("resize", syncNavigationGeometry, { passive: true });
    syncNavigationGeometry();

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", syncNavigationGeometry);
    };
  }, []);

  const openSiteNavigation = useCallback((event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    setSiteNavigationOpen(true);
  }, []);

  const closeSiteNavigation = useCallback(() => {
    setSiteNavigationOpen(false);
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

      if (event.key === "Escape" && siteNavigationOpen) {
        event.preventDefault();
        closeSiteNavigation();
        return;
      }

      const normalizedKey =
        typeof event.key === "string" ? event.key.trim().toLowerCase() : String(event.key);
      const hasPrimaryModifier = event.ctrlKey || event.metaKey;
      const isDrawerShortcut =
        normalizedKey === "m" && hasPrimaryModifier && event.shiftKey && !event.altKey;
      if (isDrawerShortcut && !event.repeat) {
        event.preventDefault();
        setSiteNavigationOpen(true);
      }
    };

    window.addEventListener("keydown", handleGlobalNavKeys);
    return () => window.removeEventListener("keydown", handleGlobalNavKeys);
  }, [closeSiteNavigation, siteNavigationOpen]);

  return (
    <>
      <header
        ref={navigationRef}
        className="unified-navigation"
        data-testid="unified-navigation"
        data-has-sections={hasSections ? "true" : "false"}
      >
        <div className="unified-navigation__inner">
          <div className="unified-navigation__site-trigger">
            <Btn
              icon={faBars}
              variant={Variant.ACCENT}
              surfaceLevel={SurfaceLevel.RAISED}
              size={Size.LG}
              ariaLabel="Open website navigation"
              ariaExpanded={siteNavigationOpen}
              onClick={openSiteNavigation}
            />
          </div>
          <Link
            className="sticky-nav-brand unified-navigation__brand"
            to={PageRoute.HOME}
            aria-label="Kyle Foster home"
          >
            KF
          </Link>
          {hasSections ? (
            <div className="unified-navigation__sections">
              <StickySectionNav pageUrl={pageUrl} sections={sections} />
            </div>
          ) : (
            <span className="unified-navigation__section-spacer" aria-hidden="true" />
          )}
        </div>
      </header>
      {/* Website destinations remain in one consistent drawer at every viewport. */}
      {siteNavigationOpen ? (
        <Dialog
          placement="left"
          open={siteNavigationOpen}
          onClose={closeSiteNavigation}
          className="mobile-nav-drawer"
          ariaLabel="Website Navigation"
        >
          <Dialog.Header closeButton={false}>
            <Dialog.Title>Website Navigation</Dialog.Title>
            <Btn
              icon={faXmark}
              variant={Variant.ACCENT}
              surfaceLevel={SurfaceLevel.RAISED}
              size={Size.LG}
              ariaLabel="Close website navigation"
              className="mobile-nav-drawer__close"
              onClick={closeSiteNavigation}
            />
          </Dialog.Header>

          <Dialog.Body>
            <nav className="mobile-nav-list" aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => {
                const { route, label, id } = item;
                const isExactRoute = activePage === route;
                const isGroupActive = isRouteActive(activePage, item);

                return (
                  <Link
                    key={`${route}-${id}`}
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
                        onAfterNavigate: closeSiteNavigation,
                      })
                    }
                  >
                    {label}
                  </Link>
                );
              })}
              <div className="sticky-nav-mobile-utilities">
                <Suspense fallback={<span role="status">Loading interface controls...</span>}>
                  <div className="sticky-nav-mobile-color sticky-nav-mobile-trigger sticky-nav-mobile-trigger--utility sticky-nav-mobile-trigger--color">
                    <ColorMenu size={Size.LG} showTooltip={false} />
                  </div>
                  <div className="sticky-nav-mobile-a11y sticky-nav-mobile-trigger sticky-nav-mobile-trigger--utility sticky-nav-mobile-trigger--a11y sticky-nav-mobile-trigger--scaled">
                    <AccessibilityMenu size={Size.LG} showTooltip={false} />
                  </div>
                </Suspense>
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
                  />
                </div>
              </div>
            </nav>
          </Dialog.Body>
        </Dialog>
      ) : null}
    </>
  );
};

export default UnifiedNavigation;
