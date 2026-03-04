import { useEffect, useMemo, useRef, useState } from "react";

/**
 * @file useScrollSpy.js
 * @description
 * Hierarchical scroll-spy with URL history synchronization.
 *
 * Responsibilities:
 * - Observes section + subsection elements using IntersectionObserver
 * - Tracks the currently active *leaf* node (deepest visible section)
 * - Derives the active parent chain from the leaf
 * - Syncs URL hash without page jumps
 * - Supports programmatic scrolling without feedback loops
 *
 * Design principles:
 * - Scroll position is the single source of truth
 * - Navigation clicks cause scroll, not state writes
 * - Only the observer updates active state
 *
 * This hook is safe to use with:
 * - Sticky desktop nav
 * - Mobile drawer nav
 * - Collapsible subsection dropdowns
 */

/* -------------------------------------------------------------------------- */
/* Section tree utilities                                                     */
/* -------------------------------------------------------------------------- */

/**
 * buildSectionTree
 *
 * Flattens a nested section/block structure into a list of observable nodes with parent references.
 * @param {Array} sections
 * @returns {{ nodes: SectionNode[], byId: Map<string, SectionNode> }}
 */
export function buildSectionTree(sections = []) {
  const nodes = [];
  const byId = new Map();

  // Process each section and its blocks to create a flat list of nodes with parent references
  sections.forEach((section) => {
    if (!section?.id) return;

    const sectionNode = {
      id: section.id,
      type: "section",
      parentId: null,
    };

    nodes.push(sectionNode);
    byId.set(section.id, sectionNode);

    // Process blocks within the section, if any
    section.blocks?.forEach((block) => {
      if (!block?.id) return;

      const blockNode = {
        id: block.id,
        type: "block",
        parentId: section.id,
      };

      nodes.push(blockNode);
      byId.set(block.id, blockNode);
    });
  });

  return { nodes, byId };
}

/* -------------------------------------------------------------------------- */
/* Hierarchical scroll spy                                                     */
/* -------------------------------------------------------------------------- */

/**
 * useScrollSpyWithHistory
 *
 * @param {SectionNode[]} nodes - Flat list of observable nodes
 * @param {Map<string, SectionNode>} byId - Lookup map for parent traversal
 * @param {number} offset - Sticky header offset (px)
 */
export function useScrollSpyWithHistory(nodes = [], byId, offset = 0) {
  const [activeLeafId, setActiveLeafId] = useState(null);

  // Prevent observer churn during programmatic scrolls
  const programmaticScroll = useRef(false);
  const scrollTimeout = useRef(null);

  /**
   * Marks a programmatic scroll window.
   * Navigation clicks should call this BEFORE scrolling.
   */
  const markProgrammaticScroll = (id) => {
    programmaticScroll.click = true;
    // Immediately reflect active state on click
    if (id) {
      setActiveLeafId(id);
    }

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    programmaticScroll.current = true;
    scrollTimeout.current = setTimeout(() => {
      programmaticScroll.current = false;
    }, 600); // longer than typical smooth scroll
  };

  /* ------------------------------------------------------------------------ */
  /* IntersectionObserver setup                                                */
  /* ------------------------------------------------------------------------ */

  // Sets up an IntersectionObserver to track visible sections/blocks
  useEffect(() => {
    if (!nodes.length) return;

    // Create an observer with a callback that updates activeLeafId based on visible nodes
    const observer = new IntersectionObserver(
      (entries) => {
        if (programmaticScroll.current) return;

        // Filter to visible entries with IDs, then sort by proximity to top of viewport
        const visible = entries
          .filter((e) => e.isIntersecting && e.target.id)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));

        if (!visible.length) return;

        // The closest visible node to the top of the viewport is the active leaf
        const nextId = visible[0].target.id;

        setActiveLeafId((prev) => {
          if (prev === nextId) return prev;
          history.replaceState(null, "", `#${nextId}`);
          return nextId;
        });
      },
      {
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold: [0, 0.15],
      }
    );

    // Observe all section and block elements
    nodes.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      // Ensure layout is settled before observing
      requestAnimationFrame(() => observer.observe(el));
    });

    return () => observer.disconnect();
  }, [nodes, offset]);

  /* ------------------------------------------------------------------------ */
  /* Initialize from URL hash                                                  */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    // On mount, check if URL hash matches a valid node and set it as active
    const hash = window.location.hash.replace("#", "");
    if (hash && byId?.has(hash)) {
      setActiveLeafId(hash);
    }
  }, [byId]);

  /* ------------------------------------------------------------------------ */
  /* Derive active chain (section → subsection)                                */
  /* ------------------------------------------------------------------------ */

  // Traverses up the tree from the active leaf to build the parent chain
  const activeChain = useMemo(() => {
    const chain = [];
    // Start from the active leaf node and traverse up to the root
    let cursor = byId?.get(activeLeafId) || null;

    while (cursor) {
      // Unshift adds to the front, building the chain from leaf to root
      chain.unshift(cursor.id);
      cursor = cursor.parentId ? byId.get(cursor.parentId) : null;
    }

    return chain;
  }, [activeLeafId, byId]);

  return {
    activeLeafId, // deepest visible node
    activeChain, // [sectionId, blockId?]
    markProgrammaticScroll,
  };
}
