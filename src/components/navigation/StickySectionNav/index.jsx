import React, { useEffect, useRef, useState } from "react";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { BlockType, Size, Variant } from "types/ui.types";
import { useResponsive } from "assets/context/responsive/ResponsiveContext";
import { useScrollSpyWithHistory, buildSectionTree } from "assets/hooks";
import { capFirstLetter } from "assets/utils";
import { MobileSectionNavTrigger } from "components/navigation";
import { Btn } from "components/ui";
import "./styles.css";
/**
 * @file index.jsx
 * @fileoverview Sticky, accessible intra-page section navigator with
 * hierarchical scroll tracking and collapsible subsection groups.
 * @module components/StickySectionNav
 */

/**
 * @public
 * @component
 * @name StickySectionNav
 * @description Sticky, accessible intra-page section navigator with
 * hierarchical scroll tracking and collapsible subsection groups.
 * Designed for long-form portfolio pages with multiple sections and subsections
 * (e.g. CodeStream, Hackathon, etc.).
 *
 * Features:
 * - Sticky on desktop, collapsible drawer on mobile
 * - Auto-syncs with scroll position via IntersectionObserver
 * - Smooth scrolling, keyboard navigation, screen-reader friendly
 * - Midnight Gold frosted UI styling
 * - Data-driven from section/block metadata (no hardcoded IDs or structure)
 *
 * @param {object} props
 * @param {Array} props.sections - List of sections with optional blocks for navigation.
 * @param {string} props.pageUrl - Base URL for the page (used for updating hash on navigation).
 * @param {string} props.mode - "desktop" or "mobile" to control styling and behavior.
 * @param {boolean} props.isOpen - For mobile mode, whether the drawer is open.
 * @returns {JSX.Element}
 *
 * @example
 * ```js
 * <StickySectionNav
 * sections={[
 *     { id: "intro", title: "Introduction", blocks: [] },
 *     { id: "features", title: "Features", blocks: [
 *       { id: "feat1", title: "Feature 1" },
 *       { id: "feat2", title: "Feature 2" },
 *     ]
 *   },
 * ]}
 * pageUrl="/portfolio"
 * mode="desktop"
 * isOpen={true}
 * />
 * ```
 */
const StickySectionNav = ({ sections = [], mode = "desktop", pageUrl = "/", isOpen = true }) => {
  const navRef = useRef(null);
  const { isMobile, spacing } = useResponsive();
  const SCROLL_OFFSET = parseInt(spacing.section, 10) + 80;

  /* ---------------------------------------------------------------------- */
  /* Scroll spy setup                                                        */
  /* ---------------------------------------------------------------------- */

  const { nodes, byId } = buildSectionTree(sections);

  const { activeLeafId, activeChain, markProgrammaticScroll } = useScrollSpyWithHistory(
    nodes,
    byId,
    SCROLL_OFFSET
  );

  /* ---------------------------------------------------------------------- */
  /* Dropdown expansion state                                                */
  /* ---------------------------------------------------------------------- */

  /**
   * expandedOverrides:
   *   undefined → derive from activeChain
   *   true      → forced open
   *   false     → forced closed
   */
  const [expandedOverrides, setExpandedOverrides] = useState({});

  const isExpanded = (sectionId) => {
    if (expandedOverrides[sectionId] !== undefined) {
      return expandedOverrides[sectionId];
    }
    return activeChain.includes(sectionId);
  };

  // Toggles the expanded state of a section, overriding the default activeChain behavior
  const toggleSection = (sectionId) => {
    setExpandedOverrides((prev) => ({
      ...prev,
      [sectionId]: !isExpanded(sectionId),
    }));
  };

  /* ---------------------------------------------------------------------- */
  /* Navigation                                                              */
  /* ---------------------------------------------------------------------- */

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Update URL hash without page jump and mark programmatic scroll to prevent observer churn
    history.pushState(null, "", `${pageUrl}#${id}`);
    markProgrammaticScroll(id);

    // Use requestAnimationFrame to ensure the DOM has updated before calculating positions
    requestAnimationFrame(() => {
      const y = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    });
  };

  /* ---------------------------------------------------------------------- */
  /* Keep active item visible in nav                                         */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (!navRef.current || !activeLeafId) return;

    const container = navRef.current;
    const activeItem = container.querySelector(`[data-nav-id="${activeLeafId}"]`);

    if (!activeItem) return;

    // Only scroll if the container is scrollable and the active item is out of view
    if (container.scrollHeight > container.clientHeight) {
      activeItem.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLeafId]);

  /* ---------------------------------------------------------------------- */
  /* Desktop                                                                 */
  /* ---------------------------------------------------------------------- */

  if (!isMobile) {
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
        <ul className="section-nav-list" role="listbox">
          {sections.map((section) => {
            const sectionActive = activeChain.includes(section.id);
            const expanded = isExpanded(section.id);
            const hasBlocks = section.blocks?.length > 0;

            return (
              <li
                key={section.id}
                className={`section-nav-item ${sectionActive ? "is-active" : "is-inactive"}`}
                data-nav-id={section.id}
              >
                <div key={section.id} className="section-nav-row">
                  {/* SECTION TITLE → SCROLL */}
                  <button
                    key={section.id}
                    type="button"
                    className="section-nav-link interactive-surface"
                    aria-current={sectionActive ? "location" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(section.id);
                    }}
                  >
                    {section.title}
                  </button>

                  {/* CARET → DROPDOWN */}
                  {hasBlocks && (
                    <Btn
                      key={section.id}
                      noBG
                      size={Size.XS}
                      variant={Variant.SUBTLE}
                      icon={expanded ? faCaretDown : faCaretRight}
                      className="section-nav-caret interactive-surface"
                      as="button"
                      ariaExpanded={expanded}
                      ariaLabel={`Toggle ${section.title} subsections`}
                      onClick={(e) => {
                        // Prevent section title click when toggling dropdown
                        e.preventDefault();
                        toggleSection(section.id);
                      }}
                    />
                  )}
                </div>
                {/* SUBSECTIONS */}
                {hasBlocks && (
                  <ul key={section.id} className="sub-section-nav-list" hidden={!expanded}>
                    {section.blocks.map((block) => {
                      if (!block.title || block.id.trim() === "" || block.type === BlockType.LINKS)
                        return null;
                      // A block is active if it's the active leaf or if it contains the active leaf
                      const blockActive = activeLeafId === block.id;
                      return (
                        <li key={block.id} data-nav-id={block.id}>
                          <button
                            key={section.id}
                            type="button"
                            aria-label={`Navigate to subsection ${block.title}`}
                            className={`sub-section-nav-block interactive-surface ${blockActive ? "is-active" : ""}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigate(block.id);
                            }}
                          >
                            {block.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Mobile                                                                  */
  /* ---------------------------------------------------------------------- */

  return (
    <MobileSectionNavTrigger
      title={capFirstLetter(pageUrl.replace("/", "")) || "Home"}
      sections={sections}
      activeLeafId={activeLeafId}
      activeChain={activeChain}
      onToggleSection={toggleSection}
      isExpanded={isExpanded}
      navigate={(e, id) => {
        e.preventDefault();
        handleNavigate(id);
      }}
    />
  );
};

export default StickySectionNav;
