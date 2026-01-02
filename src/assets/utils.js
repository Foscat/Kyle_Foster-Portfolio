import pageMetas from "./data/pageMetas";

/**
 * Formats an array of technology names into a human-readable string.
 *
 * Example:
 *   ["React", "Node", "MongoDB"]
 *   → "Tech Used: React, Node, MongoDB"
 *
 * @param {string[]} [techArray=[]] - List of technologies used.
 * @returns {string} A formatted display string or an empty string if no technologies are provided.
 */
export const renderTechUsedString = (techArray = []) => {
  // Guard against invalid or empty input
  if (!Array.isArray(techArray) || techArray.length === 0) {
    return "";
  }

  // Join technologies into a comma-separated list
  const techList = techArray.join(", ");

  return `Tech Used: ${techList}`;
};

/**
 * Merges multiple arrays of strings and removes duplicates.
 *
 * Example:
 *   mergeUniqueStrings(["HTML", "CSS"], ["HTML", "JavaScript"])
 *   → ["HTML", "CSS", "JavaScript"]
 *
 * @param {...string[]} lists - One or more arrays of strings.
 * @returns {string[]} A deduplicated array preserving first-seen order.
 */
export const mergeUniqueStrings = (...lists) => {
  const seen = new Set();

  for (const list of lists) {
    if (!Array.isArray(list)) continue;

    for (const item of list) {
      if (typeof item === "string" && item.trim()) {
        seen.add(item.trim());
      }
    }
  }

  return Array.from(seen);
};

const getMetaByPath = () => {
  const currentURL = window.location.pathname;
  switch (currentURL.split("/")[currentURL.split("/").length - 1]) {
    case "hackathon":
      return pageMetas.Hackathon;
    case "smu":
      return pageMetas.Smu;
    case "sideProjects":
      return pageMetas.SideProjects;
    case "freelance":
      return pageMetas.FreelanceWork;
    case "codestream":
      return pageMetas.Codestream;
    case "contact":
      return pageMetas.Contact;
    default:
      return pageMetas.Home;
  }
};
