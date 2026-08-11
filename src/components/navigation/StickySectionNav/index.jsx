/**
 * @file index.jsx
 * @description In-flow route section navigation coordinated with scroll-spy state.
 * @module components/navigation/StickySectionNav
 */

import { useMemo, useState } from "react";
import { useResponsive } from "assets/context/responsive/ResponsiveContext";
import { buildSectionTree, useScrollSpyWithHistory } from "assets/hooks";
import { capFirstLetter } from "assets/utils";
import MobileSectionNavTrigger from "../MobileSectionNavTrigger";
import "./styles.css";

/**
 * Convert a route pathname into a readable drawer heading.
 *
 * @param {string} pageUrl - Route pathname.
 * @returns {string} Human-readable page label.
 */
const getPageLabel = (pageUrl) => {
  const routeLabel = String(pageUrl || "")
    .replace(/^\/+|\/+$/gu, "")
    .replace(/-+/gu, " ")
    .trim();

  return routeLabel ? capFirstLetter(routeLabel) : "Home";
};

/**
 * Render one consistent "On this page" command bar on every viewport.
 * The drawer owns discovery while this coordinator owns scroll-spy state,
 * URL hashes, and smooth document navigation.
 *
 * @param {object} props - Component properties.
 * @param {Array<object>} [props.sections=[]] - Route sections and optional subsections.
 * @param {string} [props.pageUrl="/"] - Canonical route path used for section hashes.
 * @returns {JSX.Element} In-flow section navigator.
 */
const StickySectionNav = ({ sections = [], pageUrl = "/" }) => {
  const { spacing } = useResponsive();
  const parsedSpacing = Number.parseInt(spacing.section, 10);
  const scrollOffset = (Number.isFinite(parsedSpacing) ? parsedSpacing : 0) + 80;
  const [expandedByClick, setExpandedByClick] = useState({});
  // Keep the scroll-spy graph stable across state-only drawer updates.
  const { nodes, byId } = useMemo(() => buildSectionTree(sections), [sections]);
  const { activeLeafId, activeChain, markProgrammaticScroll } = useScrollSpyWithHistory(
    nodes,
    byId,
    scrollOffset
  );

  const toggleSection = (sectionId) => {
    setExpandedByClick((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }));
  };

  const isExpanded = (sectionId) => {
    if (expandedByClick[sectionId] !== undefined) return expandedByClick[sectionId];

    return Boolean(activeLeafId && activeLeafId !== sectionId && activeChain.includes(sectionId));
  };

  const navigate = (event, id) => {
    event?.preventDefault?.();

    const target = document.getElementById(id);
    if (!target) return false;

    history.pushState(null, "", `${pageUrl}#${id}`);
    markProgrammaticScroll(id);
    window.dispatchEvent(new CustomEvent("section-nav:navigate", { detail: { id } }));

    requestAnimationFrame(() => {
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - scrollOffset;
      window.scrollTo({
        behavior: "smooth",
        top: Math.max(0, targetTop),
      });
    });

    return true;
  };

  return (
    <MobileSectionNavTrigger
      title={getPageLabel(pageUrl)}
      sections={sections}
      activeLeafId={activeLeafId}
      activeChain={activeChain}
      onToggleSection={toggleSection}
      isExpanded={isExpanded}
      navigate={navigate}
    />
  );
};

export default StickySectionNav;
