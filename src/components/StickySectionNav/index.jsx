import React, { useEffect, useRef } from "react";
import { useScrollSpyWithHistory } from "assets/hooks/useScrollSpy";
import "./styles.css";

const SCROLL_OFFSET = 120;
/**
 * StickySectionNav
 * ---------------------------------------------------------------------------
 * Sticky, accessible section navigation that highlights the active section,
 * syncs with scroll + URL history, and adapts to desktop or mobile layouts.
 *
 * Features:
 * - position: sticky (desktop sidebar)
 * - optional slide-in drawer (mobile)
 * - keyboard navigation (↑ / ↓)
 * - theme-aware active glow (via CSS)
 * - fade / scale / blur motion language
 *
 * @component
 * @param {Object} props
 * @param {Array<{ id: string, title: string }>} props.sections
 * @param {"desktop" | "mobile"} [props.mode="desktop"]
 * @param {string} [props.pageUrl="/"]
 * @param {boolean} [props.isOpen] - Used for mobile drawer mode
 */
const StickySectionNav = ({ sections = [], mode = "desktop", pageUrl = "/", isOpen = true }) => {
  const sectionIds = sections.map((s) => s.id);
  const navRef = useRef(null);

  const { activeId, markProgrammaticScroll } = useScrollSpyWithHistory(sectionIds, SCROLL_OFFSET);

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

  // Keep active item centered
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
