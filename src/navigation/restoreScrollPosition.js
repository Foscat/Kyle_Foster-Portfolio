import { loadLastSection } from "@/navigation/sectionPersistence";

/**
 * Restore scroll position on page load.
 * URL hash takes priority over saved state.
 */
export const restoreScrollPosition = () => {
  const hashId = window.location.hash.replace("#", "");
  const savedId = loadLastSection();

  const targetId = hashId || savedId;
  if (!targetId) return;

  const el = document.getElementById(targetId);
  if (!el) return;

  requestAnimationFrame(() => {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
};
