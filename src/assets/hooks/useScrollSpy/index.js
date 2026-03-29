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
 *
 * @module assets/hooks/useScrollSpy
 */

/* -------------------------------------------------------------------------- */
/* Section tree utilities                                                     */
/* -------------------------------------------------------------------------- */

/**
 * @public
 * @function buildSectionTree
 *
 * @description
 * Utility function that transforms a nested section/block data structure into a flat list of observable nodes with parent references. This is used to set up the IntersectionObserver and to derive active chains for scroll-spy behavior.
 * The function takes an array of section objects, each potentially containing an array of block objects, and produces:
 * - A flat array of nodes, where each node represents either a section or a block and includes its ID, type, and parent ID.
 * - A lookup map that allows quick access to any node by its ID, which is essential for traversing the parent chain when determining active sections.
 *
 * @param {Array} sections
 * @returns {{ nodes: SectionNode[], byId: Map<string, SectionNode> }}
 *
 * SectionNode structure:
 * {
 *   id: string,        // Unique identifier (section ID or block ID)
 *   type: 'section' | 'block', // Node type
 *   parentId: string | null // Parent section ID (null for top-level sections)
 * }
 *
 * Design notes:
 * - The function is defensive and skips any sections or blocks that lack an ID.
 * - The resulting flat structure simplifies the IntersectionObserver setup and active chain derivation.
 * - The byId map allows for efficient parent lookups when building the active chain from the leaf node.
 *
 * @example
 * ```js
 * const { nodes, byId } = buildSectionTree([
 *  {
 *   id: "section1",
 *   blocks: [
 *      { id: "block1" },
 *      { id: "block2" }
 *   ]
 *  },
 *  {
 *    id: "section2",
 *    blocks: []
 *  }
 * ]);
 * nodes = [
 * { id: "section1", type: "section", parentId: null },
 * { id: "block1", type: "block", parentId: "section1" },
 * { id: "block2", type: "block", parentId: "section1" },
 * { id: "section2", type: "section", parentId: null }
 * ]
 * byId = Map {
 * "section1" => { id: "section1", type: "section", parentId: null },
 * "block1" => { id: "block1", type: "block", parentId: "section1" },
 * "block2" => { id: "block2", type: "block", parentId: "section1" },
 * "section2" => { id: "section2", type: "section", parentId: null }
 * }
 * ```
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

    // Process section-level nav items first when provided.
    if (Array.isArray(section.navItems) && section.navItems.length) {
      section.navItems.forEach((item) => {
        if (!item?.id) return;

        const navNode = {
          id: item.id,
          type: "block",
          parentId: section.id,
        };

        nodes.push(navNode);
        byId.set(item.id, navNode);
      });

      return;
    }

    // Otherwise, process blocks within the section, if any.
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
