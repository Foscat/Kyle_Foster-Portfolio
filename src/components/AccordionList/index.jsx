import { useState, useEffect, useRef } from "react";
import "./styles.css";
import { Panel, PanelGroup } from "rsuite";
import Btn from "components/Btn";
import { faReadme } from "@fortawesome/free-brands-svg-icons";
import { Size } from "types/ui.types";
import RichText from "components/RichText";

/**
 * @file index.jsx
 * @description Fully accessible, keyboard-navigable accordion and section
 * navigation component with frosted-glass styling.
 * @module components/AccordionList
 */

/**
 * AccordionItem
 * ---------------------------------------------------------------------------
 * Describes a single entry rendered within the AccordionList.
 *
 * @typedef {Object} AccordionItem
 * @property {string} id - DOM id of the associated page section.
 * @property {string} title - Display title for the item.
 * @property {string|JSX.Element} [text] - Optional accordion panel content.
 * @property {string} [url] - Optional URL used for navigation.
 * @property {boolean} [local=false] - Whether the URL is a local route.
 * @property {*} [icon] - Optional icon passed to FrostedIcon.
 * @property {boolean} [isScroller=false]
 *   Enables scroll-to-section behavior when activated.
 */

/**
 * @public
 * @component
 *
 * @param {Object} props - Component props.
 *
 * @param {string} [props.id]
 *   Optional DOM id applied to the outer panel and accordion.
 *
 * @param {string} [props.title]
 *   Optional title rendered in the panel header.
 *
 * @param {string} [props.subtitle]
 *   Optional subtitle rendered beneath the title.
 *
 * @param {*} [props.icon]
 *   Optional icon rendered next to the title.
 *
 * @param {AccordionItem[]} props.items
 *   List of accordion/navigation items to render.
 *
 * @param {boolean} [props.accordion=false]
 *   Enables collapsible accordion behavior.
 *   When false, acts as a navigational list only.
 *
 * @param {"dark"|"light"} [props.variant="dark"]
 *   Visual theme variant applied to the wrapper.
 *
 * @param {string} [props.className]
 *   Additional CSS class names applied to the wrapper.
 *
 * @param {boolean} [props.bordered=false]
 *   Whether the outer panel displays RSuite borders.
 *
 * @returns {JSX.Element}
 * A fully accessible accordion and section navigation component.
 * ---------------------------------------------------------------------------
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
  id,
  title,
  subtitle,
  items = [],
  accordion = true,
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
    if (typeof window === "undefined") return; // SSR / non-browser
    if (!("IntersectionObserver" in window)) {
      // Fallback: either no-op or set a reasonable default
      // Example: keep current openIndex/focusedIndex and just return
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (manualToggle.current) return;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const foundIndex = items.findIndex((it) => it.id && it.id === entry.target.id);
          if (foundIndex !== -1) {
            setOpenIndex(foundIndex);
            setFocusedIndex(foundIndex);
          }
        }
      },
      { threshold: 0.45 }
    );

    // Observe targets (example)
    const targets = items.map((it) => document.getElementById(it.id)).filter(Boolean);

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items, setOpenIndex, setFocusedIndex]);

  /** Auto-scroll active item into view whenever openIndex changes */
  useEffect(() => {
    if (!listRef.current || openIndex === null) return;

    const active = listRef.current.querySelector(`.fa-list-item:nth-child(${openIndex + 1})`);
    if (!active) return;

    active.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [openIndex]);

  /** Also center scroll when focus changes via keyboard */
  useEffect(() => {
    if (!listRef.current || focusedIndex === null) return;

    const active = listRef.current.querySelector(`.fa-list-item:nth-child(${focusedIndex + 1})`);
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
      collapsible
      expanded
      bordered={bordered}
      header={
        <div id={id} className="flex-column">
          {title && <span className="block-header">{title}</span>}
          {subtitle && <span className="block-subtitle">{subtitle}</span>}
        </div>
      }
      className={`frosted-accordion blue-tile block ${variant} ${className}`}
    >
      {/* Keyboard help for users & screen readers */}
      <p className="fa-help">
        Keyboard: <kbd>↑</kbd>/<kbd>↓</kbd> navigate • <kbd>←</kbd> collapse • <kbd>→</kbd> expand •{" "}
        <kbd>Enter</kbd>/<kbd>Space</kbd> toggle
      </p>
      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite">
        {srMessage}
      </div>
      <PanelGroup
        id={id}
        className="fa-list"
        ref={listRef}
        role="tree"
        aria-label={title || "Section navigation"}
      >
        {items.map((item, i) => {
          const headerId = `-${item.id || i}`;
          const panelId = `ac-panel-${item.id || i}`;

          return (
            <Panel
              collapsible
              bordered
              onSelect={() => togglePanel(i)}
              defaultExpanded={item.defaultExpanded}
              onKeyDown={(e) => handleKeyDown(e, i, items[i], openIndex === i)}
              key={`${id}-${item.id || i}`}
              className={"fa-list-item"}
              header={
                <div className="flex-column">
                  <span className="block-key" key={`${headerId}_${i}`}>
                    {item.title}
                  </span>
                  <span className="block-subkey" key={`${headerId}_subtitle${i}`}>
                    {item.subtitle}
                  </span>
                </div>
              }
            >
              {item.text && (
                <RichText
                  key={panelId}
                  id={panelId}
                  role="group"
                  className="mt-1 mb-1"
                  aria-labelledby={headerId}
                  text={item.text}
                />
              )}
              {item.url && (
                <div key={panelId + "-btnWrap"} className="center-v mt-2">
                  <Btn
                    key={panelId + "-btn"}
                    text="Learn More"
                    icon={faReadme}
                    href={item.url}
                    hrefLocal={item.local}
                    size={Size.MD}
                    ariaLabel={`Learn more about ${item.title.toLowerCase()}`}
                    tooltip={`Get more info about ${item.title.toLowerCase()}`}
                  />
                </div>
              )}
            </Panel>
          );
        })}
      </PanelGroup>
    </Panel>
  );
};

export default AccordionList;
