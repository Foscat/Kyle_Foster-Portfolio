import { useState } from "react";
import { faCaretDown, faCaretRight, faCompass } from "@fortawesome/free-solid-svg-icons";
import Btn from "components/Btn";
import { Drawer, Nav, Sidenav } from "rsuite";
import { Size, Variant } from "types/ui.types";
import "./styles.css";
/**
 * @file MobileSectionNavTrigger.jsx
 * @description
 * Mobile drawer-based section navigation with collapsible subsections.
 *
 * Design:
 * - Section title click → navigate to section
 * - Caret/menu open → expand subsection list
 * - Subsection click → navigate to block
 * - Active state is derived from scroll-spy (passed from parent)
 *
 * This component does NOT manage scroll state.
 * It only reflects and forwards user intent.
 */

/**
 * MobileSectionNavTrigger
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
            {sections.map((section) => {
              const expanded = isExpanded(section.id);
              const sectionActive = activeChain.includes(section.id);
              const hasBlocks = section.blocks?.length > 0;

              return (
                <div
                  key={section.id}
                  className={`mobile-section-group ${sectionActive ? "is-active" : ""}`}
                >
                  {/* SECTION ROW */}
                  <div className="mobile-section-row">
                    {/* Title → Navigate */}
                    <Btn
                      type="button"
                      text={section.title}
                      noBG
                      size={Size.MD}
                      variant={Variant.SUBTLE}
                      className="mobile-section-title"
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
                        ariaLabel={`Toggle ${section.title} subsections`}
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
                      {section.blocks.map((block) => {
                        const blockActive = activeLeafId === block.id;

                        return (
                          <Btn
                            key={block.id}
                            text={block.title}
                            noBG
                            size={Size.SM}
                            variant={Variant.SUBTLE}
                            tooltip="Go to section"
                            tooltipFollowCursor={false}
                            tooltipPlacement="left"
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
};

export default MobileSectionNavTrigger;
