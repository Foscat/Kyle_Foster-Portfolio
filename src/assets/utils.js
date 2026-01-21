import pageMetas from "./data/pageMetas";

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
