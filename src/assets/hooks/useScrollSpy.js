import { useEffect, useState } from "react";
import { saveLastSection } from "navigation/sectionPersistence";

/**
 * Scroll spy with URL synchronization.
 *
 * - Updates active section
 * - Pushes hash to URL without page reload
 * - Preserves back/forward navigation
 */
export const useScrollSpyWithHistory = (ids) => {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!ids.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;

            setActiveId(id);
            saveLastSection(id);

            window.history.replaceState(null, "", `#${id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
};

export const scrollToHashOnLoad = () => {
  const hash = window.location.hash.replace("#", "");
  if (!hash) return;

  const el = document.getElementById(hash);
  if (el) {
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
};
