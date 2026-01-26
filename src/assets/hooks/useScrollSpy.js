import { useEffect, useRef, useState } from "react";

/**
 * Options used to configure scroll spy behavior.
 *
 * @typedef {Object} ScrollSpyOptions
 * @property {number} [offset=0] - Vertical offset applied when calculating visibility.
 */

/**
 * @file useScrollSpy.js
 * @description React hook for tracking the currently visible section
 * based on scroll position.
 * @module assets/hooks/useScrollSpy
 * ---------------------------------------------------------------------------
 * Tracks the currently visible section based on scroll position,
 * syncs with URL hash, and supports programmatic scrolling without
 * feedback loops.
 *
 * @param {string[]} sectionIds
 * @param {number} offset - Pixel offset for sticky headers
 */
export function useScrollSpyWithHistory(sectionIds = [], offset = 0) {
  const [activeId, setActiveId] = useState(null);
  const programmaticScroll = useRef(false);

  const markProgrammaticScroll = async () => {
    programmaticScroll.current = true;
    setTimeout(() => {
      programmaticScroll.current = false;
      return { activeId, programmaticScroll };
    }, 500);
  };

  useEffect(() => {
    if (!sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (programmaticScroll.current) return;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.id;
          if (!id) return;

          setActiveId(id);
          history.replaceState(null, "", `#${id}`);
        });
      },
      {
        rootMargin: `${offset}px 0px -60% 0px`,
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  // Initialize from URL hash
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && sectionIds.includes(hash)) {
      setActiveId(hash);
    }
  }, [sectionIds]);

  return {
    activeId,
    markProgrammaticScroll,
  };
}
