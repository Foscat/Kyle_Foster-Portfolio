import React from "react";
import { useScrollSpy } from "assets/hooks/useScrollSpy";
import "./styles.css";

/**
 * StickySectionNav
 * ---------------------------------------------------------------------------
 * Accessible navigation for scrolling between page sections.
 * Supports desktop sidebar and mobile drawer usage.
 *
 * @component
 * @param {Object} props
 * @param {Array<{id: string, title: string}>} props.sections
 * @param {"desktop" | "mobile"} [props.mode="desktop"]
 */
const StickySectionNav = ({
  sections = [],
  mode = "desktop",
  pageUrl = "/",
}) => {
  const sectionIds = sections.map((s) => s.id);
  const activeId = useScrollSpy(sectionIds);

  const navLabel =
    mode === "desktop" ? "Section navigation" : "Section navigation menu";

  return (
    <nav
      className={`sticky-section-nav sticky-section-nav--${mode}`}
      aria-label={navLabel}
    >
      <ul
        role="listbox"
        aria-orientation="vertical"
        className="section-nav-list"
      >
        {sections.map((section, index) => {
          const isActive = section.id === activeId;

          return (
            <li
              key={section.id}
              role="option"
              aria-selected={isActive}
              className={`section-nav-item ${isActive ? "is-active" : ""}`}
            >
              <a
                href={`${pageUrl}#${section.id}`}
                className="section-nav-link"
                aria-current={isActive ? "location" : undefined}
                tabIndex={0}
                onKeyDown={(e) => {
                  // Keyboard navigation
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    document
                      .querySelectorAll(".section-nav-link")
                      [index + 1]?.focus();
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    document
                      .querySelectorAll(".section-nav-link")
                      [index - 1]?.focus();
                  }
                }}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default StickySectionNav;
