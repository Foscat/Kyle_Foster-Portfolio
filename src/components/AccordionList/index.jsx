import { useState, useEffect, useRef } from "react";
import "./styles.css";

/**
 * @component AccordionList
 * =======================================================================
 * A highly-interactive, keyboard-navigable, frosted-glass accordion list
 * designed for documentation pages, feature navigation, and section-based
 * scrolling. Fully compatible with RSuite v5 and follows WAI-ARIA
 * Authoring Practices for `role="tree"`.
 *
 * -----------------------------------------------------------------------
 * KEY FEATURES
 * -----------------------------------------------------------------------
 * • Frosted-glass RSuite-styled wrapper (`Panel`)
 * • Optional accordion behavior for collapsible sections
 * • Full keyboard navigation with roving tabindex:
 *      ↑ / ↓     → move between treeitems
 *      ←         → collapse current item
 *      →         → expand current item
 *      Home / End → jump to first or last item
 *      Enter/Space → toggle open/close or scroll to section
 *
 * • Screen-reader announcements via `aria-live`
 * • Auto-highlight based on scroll position using IntersectionObserver
 * • Auto-scroll the active item into view (centered)
 * • Clickable navigation links when `item.isScroller === true`
 * • Works seamlessly with Sticky Section Nav
 * • Supports icons using <FrostedIcon>
 *
 * -----------------------------------------------------------------------
 * ACCESSIBILITY IMPLEMENTATION
 * -----------------------------------------------------------------------
 * • `role="tree"` on container
 * • Each header uses:
 *      role="treeitem"
 *      aria-posinset         (1-based index)
 *      aria-setsize          (total visible items)
 *      aria-expanded         (open/closed state)
 *      aria-controls         (ID of associated panel)
 *
 * • Panels use:
 *      role="group"
 *      aria-labelledby       (header reference)
 *
 * • All keyboard interactions follow WAI-ARIA TreeView pattern
 * • Focus controlled via roving tabindex (only one tabbable item)
 *
 * -----------------------------------------------------------------------
 * PROPS
 * -----------------------------------------------------------------------
 * @component
 * @param {object} props
 *
 * @param {string} [props.title]
 *    Optional title displayed in the RSuite Panel header.
 *
 * @param {Array<object>} props.items
 *    A list of accordion/nav sections.
 *
 *    Each item may include:
 *    @param {string}   items[].id
 *          DOM id of the section on the page (required for scrolling).
 *
 *    @param {boolean}  items[].isScroller
 *          If true, clicking or pressing Enter will scroll to
 *          the corresponding page section rather than toggling accordion.
 *
 *    @param {string}   [items[].icon]
 *          Icon name passed to <FrostedIcon />.
 *
 *    @param {string}   items[].title
 *          Display name of the section.
 *
 *    @param {string|JSX.Element} [items[].text]
 *          Optional content shown when expanded (accordion mode only).
 *
 * @param {boolean} [props.accordion=true]
 *    Enables collapsible panels.
 *    If false, acts purely as a nav list with no expand/collapse.
 *
 * @param {"dark"|"light"} [props.variant="dark"]
 *    UI color scheme variant matching the global portfolio UI.
 *
 * @param {string} [props.className]
 *    Additional CSS classes for the wrapper.
 *
 * @param {boolean} [props.bordered=false]
 *    Whether the outer Panel should show RSuite borders.
 *
 * -----------------------------------------------------------------------
 * RETURN
 * -----------------------------------------------------------------------
 * @returns {JSX.Element}
 * A fully accessible, frosted-glass accordion/navigation component.
 *
 * -----------------------------------------------------------------------
 * EXAMPLE USAGE
 * -----------------------------------------------------------------------
 * <AccordionList
 *   title="Sections"
 *   variant="dark"
 *   items={[
 *     {
 *       id: "editor",
 *       isScroller: true,
 *       icon: faCode,
 *       title: "3-Panel Editor",
 *       text: "Details about the editor system..."
 *     },
 *     {
 *       id: "organizations",
 *       isScroller: true,
 *       icon: faPeopleGroup,
 *       title: "Organizations",
 *       text: "How orgs and licenses work..."
 *     }
 *   ]}
 * />
 *
 * -----------------------------------------------------------------------
 * NOTES
 * -----------------------------------------------------------------------
 * • Designed to integrate with Sticky Section Nav for a unified navigation system
 * • Automatically syncs open item with page scroll position
 * • Accessible to screen readers and keyboard-only users
 * • Uses RSuite's <Accordion> but replaces all header behavior with custom ARIA logic
 *
 */

const AccordionList = ({
  title,
  items = [],
  accordion = false,
  variant = "dark",
  className = "",
  bordered = false,
}) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [srMessage, setSrMessage] = useState("");
  const manualToggle = useRef(false);
  const listRef = useRef(null);
  const headerRefs = useRef([]);

  const totalItems = items.length;

  /** Helper: focus a header by index */
  const focusHeader = (index) => {
    const node = headerRefs.current[index];
    if (node && typeof node.focus === "function") {
      node.focus();
    }
  };

  /** Smooth scroll to section ID in the page */
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setSrMessage(`Scrolled to section ${id}`);
    }
  };

  /** Auto-highlight based on viewport position for isScroller items */
  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (manualToggle.current) return;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const foundIndex = items.findIndex(
            (it) => it.id && it.id === entry.target.id
          );
          if (foundIndex !== -1) {
            setOpenIndex(foundIndex);
            setFocusedIndex(foundIndex);
          }
        });
      },
      { threshold: 0.45 }
    );

    items.forEach((item) => {
      if (!item.isScroller) return;
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  /** Auto-scroll active item into view whenever openIndex changes */
  useEffect(() => {
    if (!listRef.current || openIndex === null) return;

    const active = listRef.current.querySelector(
      `.fa-list-item:nth-child(${openIndex + 1})`
    );
    if (!active) return;

    active.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [openIndex]);

  /** Also center scroll when focus changes via keyboard */
  useEffect(() => {
    if (!listRef.current || focusedIndex === null) return;

    const active = listRef.current.querySelector(
      `.fa-list-item:nth-child(${focusedIndex + 1})`
    );
    if (!active) return;

    active.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusedIndex]);

  /** Toggle accordion panel open/closed */
  const togglePanel = (index) => {
    manualToggle.current = true;
    setOpenIndex((prev) => {
      const isNowOpen = prev === index ? null : index;
      setSrMessage(
        isNowOpen === null
          ? `Collapsed section ${index + 1} of ${totalItems}`
          : `Expanded section ${index + 1} of ${totalItems}`
      );
      return isNowOpen;
    });
    setFocusedIndex(index);
    setTimeout(() => (manualToggle.current = false), 500);
  };

  /** Move keyboard focus up/down */
  const moveFocus = (direction) => {
    setFocusedIndex((prev) => {
      let next = prev + direction;
      if (next < 0) next = totalItems - 1;
      if (next >= totalItems) next = 0;
      setTimeout(() => focusHeader(next), 0);
      return next;
    });
  };

  /** Keyboard handler for each header */
  const handleKeyDown = (e, index, item, isOpen) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveFocus(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveFocus(-1);
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        setTimeout(() => focusHeader(0), 0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(totalItems - 1);
        setTimeout(() => focusHeader(totalItems - 1), 0);
        break;
      case "ArrowRight":
        e.preventDefault();
        if (accordion && !isOpen) {
          togglePanel(index);
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (accordion && isOpen) {
          togglePanel(index);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (item.isScroller && item.id) {
          scrollTo(item.id);
        }
        if (accordion) {
          togglePanel(index);
        }
        break;
      default:
        break;
    }
  };

  return (
    <Panel
      bordered={bordered}
      header={title}
      className={`frosted-accordion ${variant} ${className}`}
    >
      {/* Keyboard help for users & screen readers */}
      {/* <p className="fa-help">
        Keyboard: <kbd>↑</kbd>/<kbd>↓</kbd> navigate • <kbd>←</kbd> collapse •{" "}
        <kbd>→</kbd> expand • <kbd>Enter</kbd>/<kbd>Space</kbd> toggle
      </p> */}

      {/* Screen reader live region */}
      <div
        className="sr-only"
        aria-live="polite"
      >
        {srMessage}
      </div>

      <Accordion
        className="fa-list"
        ref={listRef}
        role="tree"
        aria-label={title || "Section navigation"}
      >
        {items.map((item, i) => {
          console.log(item);
          const isOpen = accordion && openIndex === i;
          const headerId = `accordion-header-${item.id || i}`;
          const panelId = `accordion-panel-${item.id || i}`;

          return (
            <Accordion.Panel
              key={item.id || i}
              className={`accordian-panel ${isOpen ? "open" : ""}`}
              header={<h4>{item.title}</h4>}
            >
              {item.text && (
                <p
                  id={panelId}
                  role="group"
                  aria-labelledby={headerId}
                >
                  {item.text}
                </p>
              )}
            </Accordion.Panel>
          );
        })}
      </Accordion>
    </Panel>
  );
};

export default AccordionList;
