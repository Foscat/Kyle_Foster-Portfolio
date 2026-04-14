/**
 * @file index.jsx
 * @fileoverview Sticky, accessible intra-page section navigator with
 * hierarchical scroll tracking and collapsible subsection groups.
 * @module components/StickySectionNav
 */

import React, { useEffect, useRef, useState } from "react";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { BlockType, Size, Variant } from "types/ui.types";
import { useResponsive } from "assets/context/responsive/ResponsiveContext";
import { useScrollSpyWithHistory, buildSectionTree } from "assets/hooks";
import { capFirstLetter } from "assets/utils";
import { MobileSectionNavTrigger } from "components/navigation";
import { Btn } from "components/ui";
import "./styles.css";

const isEditableTarget = (target) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT");

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
  const { width, spacing } = useResponsive();
  const SCROLL_OFFSET = parseInt(spacing.section, 10) + 80;
  const DESKTOP_SECTION_NAV_MIN_WIDTH = 1024;
  const shouldRenderDesktopNav = width >= DESKTOP_SECTION_NAV_MIN_WIDTH;

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

  // Closed by default; sections open when clicked or while an active subsection is visible.
  const [expandedByClick, setExpandedByClick] = useState({});
  const [hasUserScrolled, setHasUserScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) {
        setHasUserScrolled(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isExpanded = (section) => {
    if (!section?.id) return false;

    // Keep lists closed on initial load; auto-open only after real user scrolling starts.
    const hasActiveDescendant =
      hasUserScrolled &&
      activeLeafId !== section.id &&
      Boolean(activeLeafId) &&
      activeChain.includes(section.id);

    return hasActiveDescendant || Boolean(expandedByClick[section.id]);
  };

  // Toggle only the click-driven expansion state; active section visibility remains auto-driven.
  const toggleSection = (sectionId) => {
    setExpandedByClick((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const getNavigableBlocks = (section) => {
    if (Array.isArray(section?.navItems) && section.navItems.length > 0) {
      return section.navItems.filter(
        (item) =>
          item && typeof item.id === "string" && item.id.trim() !== "" && Boolean(item.title)
      );
    }

    if (!Array.isArray(section?.blocks)) return [];

    return section.blocks.filter(
      (block) =>
        block &&
        typeof block.id === "string" &&
        block.id.trim() !== "" &&
        Boolean(block.title) &&
        block.type !== BlockType.LINKS
    );
  };

  const getFirstTargetIdForSection = (section) => {
    const blocks = getNavigableBlocks(section);
    return blocks[0]?.id || section?.id || null;
  };

  const getCurrentPointer = () => {
    const validSections = sections.filter((section) => section && typeof section.id === "string");

    const sectionIndexFromActiveChain = validSections.findIndex((section) =>
      activeChain.includes(section.id)
    );

    const sectionIndexFromLeaf = validSections.findIndex((section) => {
      if (activeLeafId === section.id) return true;
      const blocks = getNavigableBlocks(section);
      return blocks.some((block) => block.id === activeLeafId);
    });

    const sectionIndex =
      sectionIndexFromLeaf >= 0
        ? sectionIndexFromLeaf
        : sectionIndexFromActiveChain >= 0
          ? sectionIndexFromActiveChain
          : 0;

    const currentSection = validSections[sectionIndex];
    const currentBlocks = getNavigableBlocks(currentSection);
    const activeChainBlockId = [...activeChain]
      .reverse()
      .find((id) => currentBlocks.some((block) => block.id === id));
    const derivedActiveBlockId = currentBlocks.some((block) => block.id === activeLeafId)
      ? activeLeafId
      : activeChainBlockId;
    const blockIndex = currentBlocks.findIndex((block) => block.id === derivedActiveBlockId);

    return {
      validSections,
      sectionIndex,
      blockIndex,
      derivedActiveBlockId,
      currentSection,
      currentBlocks,
    };
  };

  const moveBetweenBlocks = ({ direction = 1, collapseCurrentSection = false }) => {
    const {
      validSections,
      sectionIndex,
      blockIndex,
      derivedActiveBlockId,
      currentSection,
      currentBlocks,
    } = getCurrentPointer();

    if (!currentSection) return false;

    let targetSectionIndex = sectionIndex;
    let targetId = null;
    const isUnknownDescendantActive =
      Boolean(activeLeafId) &&
      activeLeafId !== currentSection?.id &&
      blockIndex === -1 &&
      !derivedActiveBlockId;

    if (direction > 0) {
      if (blockIndex === -1 && !isUnknownDescendantActive && currentBlocks.length > 0) {
        targetId = currentBlocks[0]?.id;
      } else if (blockIndex >= 0 && blockIndex < currentBlocks.length - 1) {
        targetId = currentBlocks[blockIndex + 1]?.id;
      } else {
        targetSectionIndex = sectionIndex + 1;
        if (targetSectionIndex >= validSections.length) return false;
        targetId = getFirstTargetIdForSection(validSections[targetSectionIndex]);
      }
    } else {
      if (blockIndex > 0) {
        targetId = currentBlocks[blockIndex - 1]?.id;
      } else if (blockIndex === -1 && isUnknownDescendantActive && currentBlocks.length > 0) {
        targetId = currentBlocks[currentBlocks.length - 1]?.id;
      } else {
        targetSectionIndex = sectionIndex - 1;
        if (targetSectionIndex < 0) return false;
        targetId = getFirstTargetIdForSection(validSections[targetSectionIndex]);
      }
    }

    const targetSection = validSections[targetSectionIndex];
    if (!targetId || !targetSection?.id) return false;

    setExpandedByClick((prev) => ({
      ...prev,
      [targetSection.id]: true,
      ...(collapseCurrentSection && currentSection?.id ? { [currentSection.id]: false } : {}),
    }));

    return handleNavigate(targetId);
  };

  const moveToAdjacentSection = ({ direction = 1 }) => {
    const { validSections, sectionIndex, currentSection } = getCurrentPointer();
    if (!currentSection) return false;

    const targetSectionIndex = sectionIndex + direction;
    if (targetSectionIndex < 0 || targetSectionIndex >= validSections.length) return false;

    const targetSection = validSections[targetSectionIndex];
    const targetId = getFirstTargetIdForSection(targetSection);
    if (!targetId || !targetSection?.id) return false;

    setExpandedByClick((prev) => ({
      ...prev,
      [currentSection.id]: false,
      [targetSection.id]: true,
    }));

    return handleNavigate(targetId);
  };

  const moveWithinAccordionItems = (direction) => {
    const { currentSection, derivedActiveBlockId } = getCurrentPointer();
    if (!currentSection) return { handled: false, moved: false };

    const accordionBlocks = Array.isArray(currentSection.blocks)
      ? currentSection.blocks.filter((block) => block?.type === BlockType.BULLETED_LIST)
      : [];
    if (!accordionBlocks.length) return { handled: false, moved: false };

    const activeChainAccordionBlockId = [...activeChain]
      .reverse()
      .find((id) => accordionBlocks.some((block) => block.id === id));

    const activeBlock =
      accordionBlocks.find((block) => block.id === derivedActiveBlockId) ||
      accordionBlocks.find((block) => block.id === activeChainAccordionBlockId) ||
      (derivedActiveBlockId ? null : accordionBlocks[0]);

    if (!activeBlock) return { handled: false, moved: false };

    const accordionItemIds = Array.isArray(activeBlock.items)
      ? activeBlock.items
          .filter((item) => item && typeof item.id === "string" && item.id.trim() !== "")
          .map((item) => item.id)
      : [];

    if (!accordionItemIds.length) return { handled: true, moved: false };

    const activeChainItemId = [...activeChain]
      .reverse()
      .find((id) => accordionItemIds.includes(id));
    const currentAccordionId = [activeLeafId, activeChainItemId].find((id) =>
      accordionItemIds.includes(id)
    );
    let currentAccordionIndex = accordionItemIds.indexOf(currentAccordionId);

    if (currentAccordionIndex === -1 && activeBlock.id) {
      // Fallback to currently open accordion row in the DOM when scroll-spy state is between nodes.
      const root = document.getElementById(activeBlock.id);
      const openRow = root?.querySelector(".fa-list-item.open[id]");
      const openId = openRow?.id;
      if (openId && accordionItemIds.includes(openId)) {
        currentAccordionIndex = accordionItemIds.indexOf(openId);
      }
    }

    let targetIndex = -1;

    if (direction > 0) {
      if (currentAccordionIndex === -1) {
        // Entering an accordion block from regular block navigation: start at first sub-item.
        targetIndex = 0;
      } else if (currentAccordionIndex < accordionItemIds.length - 1) {
        targetIndex = currentAccordionIndex + 1;
      }
    } else if (currentAccordionIndex > 0) {
      targetIndex = currentAccordionIndex - 1;
    }

    if (targetIndex < 0) return { handled: true, moved: false };

    const targetId = accordionItemIds[targetIndex];
    if (!targetId) return { handled: true, moved: false };

    const didNavigate = handleNavigate(targetId);
    return { handled: true, moved: didNavigate };
  };

  /* ---------------------------------------------------------------------- */
  /* Navigation                                                              */
  /* ---------------------------------------------------------------------- */

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (!el) return false;

    // Update URL hash without page jump and mark programmatic scroll to prevent observer churn
    history.pushState(null, "", `${pageUrl}#${id}`);
    markProgrammaticScroll(id);

    // Notify local interactive blocks (e.g. AccordionList) to open the target immediately.
    window.dispatchEvent(
      new CustomEvent("section-nav:navigate", {
        detail: { id },
      })
    );

    // Use requestAnimationFrame to ensure the DOM has updated before calculating positions
    requestAnimationFrame(() => {
      const y = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    });

    return true;
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleKeyboardNavigation = (event) => {
      if (event.defaultPrevented) return;
      if (isEditableTarget(event.target)) return;

      const noCtrlCmd = !event.ctrlKey && !event.metaKey;

      if (event.key === "Tab" && noCtrlCmd && !event.altKey) {
        const didMove = moveBetweenBlocks({ direction: event.shiftKey ? -1 : 1 });
        if (didMove) {
          event.preventDefault();
        }
        return;
      }

      if (event.key === "Enter" && noCtrlCmd && !event.shiftKey) {
        const didMove = moveToAdjacentSection({ direction: event.altKey ? -1 : 1 });
        if (didMove) {
          event.preventDefault();
        }
        return;
      }

      if (event.key === "ArrowRight" && noCtrlCmd && !event.altKey && !event.shiftKey) {
        const didMove = moveBetweenBlocks({ direction: 1, collapseCurrentSection: true });
        if (didMove) {
          event.preventDefault();
        }
        return;
      }

      if (event.key === "ArrowLeft" && noCtrlCmd && !event.altKey && !event.shiftKey) {
        const didMove = moveBetweenBlocks({ direction: -1, collapseCurrentSection: true });
        if (didMove) {
          event.preventDefault();
        }
        return;
      }

      if (event.key === "ArrowDown" && noCtrlCmd && !event.altKey && !event.shiftKey) {
        if (event.repeat) return;
        const { handled } = moveWithinAccordionItems(1);
        if (handled) {
          event.preventDefault();
        }
        return;
      }

      if (event.key === "ArrowUp" && noCtrlCmd && !event.altKey && !event.shiftKey) {
        if (event.repeat) return;
        const { handled } = moveWithinAccordionItems(-1);
        if (handled) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyboardNavigation);
    return () => window.removeEventListener("keydown", handleKeyboardNavigation);
  }, [activeChain, activeLeafId, sections]);

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
  if (shouldRenderDesktopNav) {
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
          {sections
            .filter((section) => section && typeof section.id === "string")
            .map((section, sectionIndex) => {
              const sectionActive = activeChain.includes(section.id);
              const expanded = isExpanded(section);
              const navigableBlocks = getNavigableBlocks(section);
              const hasBlocks = navigableBlocks.length > 0;
              const sectionNavLabel = section.navLabel || section.title;

              return (
                <li
                  key={`section-${section.id}-${sectionIndex}`}
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
                      {sectionNavLabel}
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
                        ariaLabel={`Toggle ${sectionNavLabel} subsections`}
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
                    <ul
                      key={`sublist-${section.id}-${sectionIndex}`}
                      className="sub-section-nav-list"
                      hidden={!expanded}
                    >
                      {navigableBlocks.map((block, blockIndex) => {
                        // A block is active if it's the active leaf or if it contains the active leaf
                        const blockActive = activeLeafId === block.id;
                        return (
                          <li
                            key={`block-${section.id}-${block.id}-${blockIndex}`}
                            data-nav-id={block.id}
                          >
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
      isExpanded={(sectionId) => {
        const section = sections.find((item) => item?.id === sectionId);
        return isExpanded(section);
      }}
      navigate={(e, id) => {
        e.preventDefault();
        handleNavigate(id);
      }}
    />
  );
};

export default StickySectionNav;
