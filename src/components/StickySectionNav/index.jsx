import React, { useEffect, useRef } from "react";
import { useScrollSpyWithHistory } from "assets/hooks/useScrollSpy";
import "./styles.css";

/**
 * @file index.jsx
 * @description Sticky, accessible intra-page section navigator that tracks
 * scroll position, updates URL hash state, and highlights the active section.
 * @module components/StickySectionNav
 */

const SCROLL_OFFSET = 120;

/**
 * SectionNavItem
 * ---------------------------------------------------------------------------
 * Describes a single section entry used by StickySectionNav.
 *
 * @typedef {Object} SectionNavItem
 * @property {string} id - DOM id of the section element to scroll to.
 * @property {string} title - Human-readable label shown in the nav list.
 */

/**
 * StickySectionNav
 * ---------------------------------------------------------------------------
 * Sticky, accessible section navigation for **individual pages**.
 *
 * Responsibilities:
 * - Highlights the currently active section based on scroll position
 * - Syncs navigation state with the URL hash (via History API)
 * - Supports both desktop and mobile presentation modes via CSS
 * - Keeps the active item visible by auto-scrolling the nav container
 *
 * Behavior:
 * - Uses a fixed `SCROLL_OFFSET` to account for sticky headers / top padding
 * - Uses smooth scrolling to navigate to target sections
 * - Marks programmatic scroll to avoid scroll-spy churn during animated scroll
 *
 * Accessibility:
 * - Root uses `aria-label="Section navigation"`
 * - Active item uses `aria-current="location"`
 * - Uses list semantics for predictable screen reader interaction
 *
 * @public
 * @component
 *
 * @param {Object} props - Component props.
 * @param {SectionNavItem[]} props.sections - List of sections to render and navigate.
 * @param {"desktop"|"mobile"} [props.mode="desktop"] - Layout mode used by styling rules.
 * @param {string} [props.pageUrl="/"] - Base page URL used for hash updates.
 * @param {boolean} [props.isOpen=true] - Controls open-state styling in mobile mode.
 *
 * @returns {JSX.Element} Rendered sticky section navigation.
 */
const StickySectionNav = ({ sections = [], mode = "desktop", pageUrl = "/", isOpen = true }) => {
  const sectionIds = sections.map((s) => s.id);
  const navRef = useRef(null);

  const { activeId, markProgrammaticScroll } = useScrollSpyWithHistory(sectionIds, SCROLL_OFFSET);

  /**
   * Navigates to a target section by ID, updating URL hash and scrolling smoothly.
   *
   * Implementation notes:
   * - Uses `history.pushState` to update the hash without a full navigation
   * - Uses requestAnimationFrame to allow layout to settle before measuring
   *
   * @param {string} id - Target section id.
   * @returns {void}
   */
  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    history.pushState(null, "", `${pageUrl}#${id}`);
    markProgrammaticScroll();

    requestAnimationFrame(() => {
      const y = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    });
  };

  /**
   * Keeps the active nav item visible/centered within the nav container.
   * Only performs scrolling when the nav container itself is scrollable.
   */
  useEffect(() => {
    if (!navRef.current || !activeId) return;

    const container = navRef.current;
    const activeItem = container.querySelector(`.section-nav-item[data-id="${activeId}"]`);

    if (!activeItem) return;

    // Only scroll the nav if it can scroll
    if (container.scrollHeight > container.clientHeight) {
      activeItem.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeId]);

  return (
    <nav
      ref={navRef}
      className={`
        blue-tile
        sticky-section-nav
        sticky-section-nav--${mode}
        ${mode === "mobile" && isOpen ? "is-open" : ""}
      `}
      aria-label="Section navigation"
    >
      <ul role="listbox" aria-orientation="vertical" className="section-nav-list">
        {sections.map((section) => {
          const isActive = section.id === activeId;

          return (
            <li
              key={section.id + "-li"}
              className={`section-nav-item ${isActive ? "is-active" : "is-inactive"}`}
            >
              <p
                key={section.id + "-a"}
                data-id={section.id}
                className="section-nav-link"
                aria-current={isActive ? "location" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(section.id);
                }}
              >
                {section.title}
              </p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default StickySectionNav;
