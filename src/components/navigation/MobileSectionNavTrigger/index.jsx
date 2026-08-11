/**
 * @file MobileSectionNavTrigger.jsx
 * @fileoverview In-flow route section command bar with a drawer-based explorer.
 *
 * Design:
 * - Section title click → navigate to section
 * - Caret/menu open → expand subsection list
 * - Subsection click → navigate to block
 * - Active state is derived from scroll-spy (passed from parent)
 *
 * This component does NOT manage scroll state.
 * It only reflects and forwards user intent.
 * The parent component (e.g. SectionRenderer) is responsible for:
 * - Tracking scroll position
 * - Determining active section/block IDs
 * - Managing expanded state of sections
 * - Handling actual navigation (e.g. scrollIntoView)
 *
 * @module components/MobileSectionNavTrigger
 */

import { useCallback, useEffect, useState } from "react";
import { faCaretDown, faCaretRight, faListUl, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Drawer } from "rsuite";
import { BlockType, Size, Variant } from "types/ui.types";
import { Btn } from "components/ui";
import "./styles.css";

/**
 * @public
 * @component
 * @name MobileSectionNavTrigger
 *
 * @description Compact route section navigation with collapsible subsections.
 *
 * @param {object} props
 * @param {string} props.title - Title displayed in the drawer header.
 * @param {Array} props.sections - List of sections. Each section may contain a `navItems`
 *   array (takes priority) or a `blocks` array for subsection navigation.
 * @param {string} props.activeLeafId - ID of the currently active block (for highlighting).
 * @param {Array} props.activeChain - List of active section IDs in the current scroll path.
 * @param {function} props.isExpanded - Function to determine if a section's subsections are expanded.
 * @param {function} props.onToggleSection - Callback to toggle a section's expanded state.
 * @param {function} props.navigate - Callback to handle navigation when a section or block is clicked.
 *
 * @remarks
 * The command bar stays in normal document flow and can be made sticky by the
 * route shell. It never reserves a document-level rail or reduces content width.
 * @returns {JSX.Element}
 *
 * @example
 * ```js
 * <MobileSectionNavTrigger
 *  title="Page Navigation"
 * sections={[
 *      { id: "intro", title: "Introduction", blocks: [] },
 *      { id: "features", title: "Features", blocks: [
 *          { id: "feat1", title: "Feature 1" },
 *          { id: "feat2", title: "Feature 2" },
 *        ]
 *      },
 *      { id: "contact", title: "Contact", blocks: [] },
 *   ]}
 * activeLeafId="feat1"
 * activeChain={["features", "feat1"]}
 * isExpanded={(id) => id === "features"}
 * onToggleSection={(id) => console.log("Toggle section", id)}
 * navigate={(e, id) => console.log("Navigate to", id)}
 * />
 * ```
 */
const MobileSectionNavTrigger = ({
  title = "Home",
  sections = [],
  activeLeafId,
  activeChain = [],
  isExpanded = () => false,
  onToggleSection = () => {},
  navigate = () => {},
}) => {
  const [open, setOpen] = useState(false);

  const closeDrawer = useCallback(() => {
    setOpen(false);
    if (typeof document === "undefined") return;
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const isEditableTarget = (target) =>
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT");

    const handleGlobalSectionKeys = (event) => {
      if (event.defaultPrevented) return;
      if (isEditableTarget(event.target)) return;

      if (event.key === "Escape" && open) {
        event.preventDefault();
        closeDrawer();
      }
    };

    window.addEventListener("keydown", handleGlobalSectionKeys);
    return () => window.removeEventListener("keydown", handleGlobalSectionKeys);
  }, [closeDrawer, open]);

  // Utility to filter out invalid blocks (e.g. missing id or title)
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

  const navigableSections = sections.filter(
    (section) =>
      section &&
      typeof section.id === "string" &&
      section.id.trim() !== "" &&
      Boolean(section.navLabel || section.title)
  );
  const activeSectionIndex = navigableSections.findIndex((section) =>
    activeChain.includes(section.id)
  );
  const currentSectionIndex = activeSectionIndex >= 0 ? activeSectionIndex : 0;
  const currentSection = navigableSections[currentSectionIndex];
  const currentSectionLabel = currentSection?.navLabel || currentSection?.title || title;
  const progressLabel = navigableSections.length
    ? `${currentSectionIndex + 1} / ${navigableSections.length}`
    : "0 / 0";

  return (
    <>
      <nav className="route-section-nav" aria-label="On this page">
        <span className="route-section-nav__label">On this page</span>
        <Btn
          icon={faListUl}
          text={currentSectionLabel}
          size={Size.MD}
          noBG
          onClick={(event) => {
            event?.preventDefault?.();
            event?.stopPropagation?.();
            setOpen(true);
          }}
          className="section-nav-trigger route-section-nav__trigger"
          ariaLabel={`Open section navigation: ${currentSectionLabel}`}
          ariaExpanded={open}
          variant={Variant.ACCENT}
        />
        <span className="route-section-nav__progress" aria-label={`Section ${progressLabel}`}>
          {progressLabel}
        </span>
      </nav>
      <Drawer
        placement="right"
        open={open}
        onClose={closeDrawer}
        className="mobile-nav-drawer mobile-section-nav-drawer"
        closeButton={false}
      >
        <Drawer.Header closeButton={false}>
          <Drawer.Title>{title} Page</Drawer.Title>
          <Btn
            icon={faXmark}
            size={Size.LG}
            noBG
            className="mobile-section-nav-drawer__close"
            ariaLabel="Close section navigation"
            variant={Variant.ACCENT}
            onClick={closeDrawer}
          />
        </Drawer.Header>

        <Drawer.Body>
          <div className="mobile-section-list">
            {navigableSections.map((section, sectionIndex) => {
              const expanded = isExpanded(section.id);
              const sectionActive = activeChain.includes(section.id);
              const navigableBlocks = getNavigableBlocks(section);
              const hasBlocks = navigableBlocks.length > 0;
              const sectionNavLabel = section.navLabel || section.title;

              return (
                <div
                  key={`mobile-section-${section.id}-${sectionIndex}`}
                  className={`mobile-section-group ${sectionActive ? "is-active" : ""}`}
                >
                  {/* SECTION ROW */}
                  <div key={section.id} className="mobile-section-row">
                    {/* Title → Navigate */}
                    <Btn
                      key={section.id}
                      type="button"
                      text={sectionNavLabel}
                      noBG
                      size={Size.MD}
                      variant={Variant.SUBTLE}
                      className="mobile-section-title"
                      ariaCurrent={sectionActive ? "location" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(e, section.id);
                        closeDrawer();
                      }}
                    />

                    {/* Caret → Toggle */}
                    {hasBlocks && (
                      <Btn
                        key={section.id}
                        type="button"
                        className="mobile-section-caret"
                        noBG
                        size={Size.SM}
                        variant={Variant.SUBTLE}
                        icon={expanded ? faCaretDown : faCaretRight}
                        ariaLabel={`Toggle ${sectionNavLabel} subsections`}
                        aria-expanded={expanded}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onToggleSection(section.id);
                        }}
                      />
                    )}
                  </div>
                  {/* Subsections */}
                  {hasBlocks && expanded && (
                    <div key={section.id} className="mobile-subsection-list">
                      {navigableBlocks.map((block, blockIndex) => {
                        const blockActive = activeLeafId === block.id;
                        const blockLabel = block.title;

                        return (
                          <Btn
                            key={`mobile-block-${section.id}-${block.id}-${blockIndex}`}
                            text={blockLabel}
                            noBG
                            size={Size.SM}
                            variant={Variant.SUBTLE}
                            type="button"
                            className={`mobile-subsection ${blockActive ? "is-active" : ""}`}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(e, block.id);
                              closeDrawer();
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default MobileSectionNavTrigger;
