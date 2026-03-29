/**
 * @file MobileSectionNavTrigger.jsx
 * @fileoverview Mobile drawer-based section navigation with collapsible subsections.
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

import { useState } from "react";
import { faCaretDown, faCaretRight, faCompass } from "@fortawesome/free-solid-svg-icons";
import { Drawer } from "rsuite";
import { Size, Variant } from "types/ui.types";
import { Btn } from "components/ui";
import "./styles.css";

/**
 * @public
 * @component
 * @name MobileSectionNavTrigger
 *
 * @description Mobile drawer-based section navigation with collapsible subsections.
 *
 * @param {object} props
 * @param {string} props.title - Title displayed in the drawer header.
 * @param {Array} props.sections - List of sections with optional blocks for navigation.
 * @param {string} props.activeLeafId - ID of the currently active block (for highlighting).
 * @param {Array} props.activeChain - List of active section IDs in the current scroll path.
 * @param {function} props.isExpanded - Function to determine if a section's subsections are expanded.
 * @param {function} props.onToggleSection - Callback to toggle a section's expanded state.
 * @param {function} props.navigate - Callback to handle navigation when a section or block is clicked.
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
        block && typeof block.id === "string" && block.id.trim() !== "" && Boolean(block.title)
    );
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="sect-nav-toggle-btn mobile-only">
        <Btn
          icon={faCompass}
          onClick={() => setOpen(true)}
          className="section-nav-trigger"
          ariaLabel="Open section navigation"
          tooltip="Open section navigation"
          tooltipPlacement="left"
          tooltipFollowCursor={false}
          variant={Variant.ACCENT}
        />
      </div>
      <Drawer
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        className="mobile-nav-drawer"
      >
        <Drawer.Header>
          <Drawer.Title>{title} Page</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          <div className="mobile-section-list">
            {sections.map((section, sectionIndex) => {
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
                  <div className="mobile-section-row">
                    {/* Title → Navigate */}
                    <Btn
                      type="button"
                      text={sectionNavLabel}
                      noBG
                      size={Size.MD}
                      variant={Variant.SUBTLE}
                      className="mobile-section-title"
                      tooltip="Go to section"
                      tooltipFollowCursor={true}
                      tooltipPlacement="right"
                      ariaCurrent={sectionActive ? "location" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(e, section.id);
                        setOpen(false);
                      }}
                    />

                    {/* Caret → Toggle */}
                    {hasBlocks && (
                      <Btn
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
                    <div className="mobile-subsection-list">
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
                            tooltip="Go to sub-section"
                            tooltipFollowCursor={true}
                            tooltipPlacement="right"
                            type="button"
                            className={`mobile-subsection ${blockActive ? "is-active" : ""}`}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(e, block.id);
                              setOpen(false);
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
};;

export default MobileSectionNavTrigger;
