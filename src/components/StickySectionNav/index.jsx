import React, { useEffect, useRef, useState } from "react";
import { buildSectionTree, useScrollSpyWithHistory } from "assets/hooks/useScrollSpy";
import MobileSectionNavTrigger from "components/MobileSectionNavTrigger";
import { capFirstLetter } from "assets/utils";
import "./styles.css";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Btn from "components/Btn";
import { Size, Variant } from "types/ui.types";
import userOnMobile from "assets/hooks/userOnMobile";

/**
 * @file index.jsx
 * @description Sticky, accessible intra-page section navigator with
 * hierarchical scroll tracking and collapsible subsection groups.
 */

const SCROLL_OFFSET = 120;

const StickySectionNav = ({ sections = [], mode = "desktop", pageUrl = "/", isOpen = true }) => {
  const navRef = useRef(null);
  const isMobile = userOnMobile();

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

  if (isMobile) {
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
                <div className="section-nav-row">
                  {/* SECTION TITLE → SCROLL */}
                  <button
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
                  <ul className="sub-section-nav-list" hidden={!expanded}>
                    {section.blocks.map((block) => {
                      if (!block.title) return null;
                      // A block is active if it's the active leaf or if it contains the active leaf
                      const blockActive = activeLeafId === block.id;

                      return (
                        <li key={block.id} data-nav-id={block.id}>
                          <button
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
