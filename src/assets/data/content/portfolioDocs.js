/**
 * @file src\assets\data\content\portfolioDocs.js
 * @description src\assets\data\content\portfolioDocs module.
 * @module src\assets\data\content\portfolioDocs
 */

const generatedDocLoaders = import.meta.glob("../../../../docs/**/*.{md,markdown}", {
  query: "?raw",
  import: "default",
});

const devGuideLoaders = import.meta.glob("../../../../dev-guides/**/*.{md,markdown}", {
  query: "?raw",
  import: "default",
});

const docLoaders = {
  ...generatedDocLoaders,
  ...devGuideLoaders,
};

const RAW_HTML_TAG_PATTERN = /<\/?[A-Za-z][^>\n]*>/g;

const DOC_META = {
  architecture_overview: {
    title: "Architecture Overview",
    category: "Architecture",
    summary: "High-level structure, systems, and page composition.",
    order: 1,
  },
  components: {
    title: "Components",
    category: "Systems",
    summary: "Reusable component patterns and responsibilities.",
    order: 2,
  },
  navigation: {
    title: "Navigation",
    category: "Systems",
    summary: "Sticky nav, section nav, scroll behavior, and hierarchy.",
    order: 3,
  },
  scripts: {
    title: "Scripts",
    category: "Tooling",
    summary: "Project scripts and the build and developer workflow.",
    order: 4,
  },
  tests: {
    title: "Tests",
    category: "Quality",
    summary: "Testing structure, intent, and coverage strategy.",
    order: 5,
  },
  types: {
    title: "Types",
    category: "Systems",
    summary: "Shared shapes, block contracts, and model conventions.",
    order: 6,
  },
  breakpoints: {
    title: "Breakpoints",
    category: "Design System",
    summary: "Responsive strategy and breakpoint conventions.",
    order: 7,
  },
  testingguidelines: {
    title: "Testing Guidelines",
    category: "Quality",
    summary: "Behavior-first testing rules and discipline.",
    order: 8,
  },
  "diagram-guidelines": {
    title: "Diagram Guidelines",
    category: "Developer Guides",
    summary: "Diagram authoring standards, validation rules, and quality checks.",
    order: 20,
  },
  "richtext-author-guidelines": {
    title: "RichText Author Guidelines",
    category: "Developer Guides",
    summary: "Authoring conventions for rich text content blocks and consistency.",
    order: 21,
  },
  "scripts-tooling-overview": {
    title: "Scripts Tooling Overview",
    category: "Developer Guides",
    summary: "Guide to script architecture, intent, and safe maintenance workflow.",
    order: 22,
  },
  "testing-guidelines": {
    title: "Testing Guidelines",
    category: "Developer Guides",
    summary: "Practical project testing guidance for contributors and maintainers.",
    order: 23,
  },
};

function titleize(value = "") {
  return value.replace(/[_-]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function getFileName(path) {
  return (
    path
      .split("/")
      .pop()
      ?.replace(/\.(md|markdown)$/i, "") || "document"
  );
}

function getSlug(path) {
  return getFileName(path).toLowerCase();
}

function getCategoryFromPath(path) {
  if (path.includes("/dev-guides/")) {
    return "Developer Guides";
  }

  const cleanPath = path.split("/docs/")[1] || path;
  const parts = cleanPath.split("/");
  if (parts.length <= 1) return "Documentation";
  return titleize(parts[0]);
}

function escapeAngleBrackets(value = "") {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sanitizeRawHtmlOutsideCodeFences(markdown = "") {
  const lines = String(markdown).split("\n");
  let inFence = false;

  return lines
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return line;
      }

      if (inFence) {
        return line;
      }

      return line.replace(RAW_HTML_TAG_PATTERN, (match) => escapeAngleBrackets(match));
    })
    .join("\n");
}

function sanitizeDocContent(content, path) {
  if (typeof content !== "string") {
    return "";
  }

  // Generated JSDoc markdown can contain raw component-like tags in prose.
  // Escape them so react-markdown does not interpret them as HTML nodes.
  if (path.includes("/docs/")) {
    return sanitizeRawHtmlOutsideCodeFences(content);
  }

  return content;
}

const portfolioDocEntries = Object.entries(docLoaders)
  .map(([path, load]) => {
    const slug = getSlug(path);
    const fileName = getFileName(path);
    const meta = DOC_META[slug] || {};

    return {
      slug,
      fileName,
      path,
      title: meta.title || titleize(fileName),
      category: meta.category || getCategoryFromPath(path),
      summary: meta.summary || "",
      order: meta.order || 999,
      load,
    };
  })
  .sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

function selectDocsBySlug(slugs = []) {
  if (!Array.isArray(slugs) || !slugs.length) {
    return portfolioDocEntries;
  }

  const wanted = new Set(slugs.map((slug) => slug.toLowerCase()));
  return portfolioDocEntries.filter((doc) => wanted.has(doc.slug));
}

async function hydratePortfolioDoc(entry) {
  const content = await entry.load();
  const sanitizedContent = sanitizeDocContent(content, entry.path);

  return {
    slug: entry.slug,
    fileName: entry.fileName,
    path: entry.path,
    title: entry.title,
    category: entry.category,
    summary: entry.summary,
    order: entry.order,
    content: sanitizedContent,
  };
}

/**
 * Metadata-only portfolio docs list.
 * Does not include `content`; use `getPortfolioDocs`, `getPortfolioDoc`,
 * or `getPortfolioDocsByCategory` to load hydrated docs with `content`.
 */
export const portfolioDocsMeta = portfolioDocEntries.map(({ load, ...doc }) => doc);

/**
 * @deprecated Use `portfolioDocsMeta` instead. This export is metadata-only
 * and does not include `content`.
 */
export const portfolioDocs = portfolioDocsMeta;

/**
 * Load hydrated portfolio docs, including their raw markdown `content`.
 *
 * @param {string[]} [slugs=[]] Optional slugs to filter by.
 * @returns {Promise<Array<{slug: string, fileName: string, path: string, title: string, category: string, summary: string, order: number, content: string}>>}
 */
export async function getPortfolioDocs(slugs = []) {
  const docs = selectDocsBySlug(slugs);
  return Promise.all(docs.map(hydratePortfolioDoc));
}

/**
 * Load a single hydrated portfolio doc, including raw markdown `content`.
 *
 * @param {string} slug
 * @returns {Promise<{slug: string, fileName: string, path: string, title: string, category: string, summary: string, order: number, content: string} | null>}
 */
export async function getPortfolioDoc(slug) {
  const docEntry = portfolioDocEntries.find((doc) => doc.slug === String(slug).toLowerCase());
  if (!docEntry) return null;
  return hydratePortfolioDoc(docEntry);
}

/**
 * Load hydrated portfolio docs for a category, including raw markdown `content`.
 *
 * @param {string} category
 * @returns {Promise<Array<{slug: string, fileName: string, path: string, title: string, category: string, summary: string, order: number, content: string}>>}
 */
export async function getPortfolioDocsByCategory(category) {
  const normalizedCategory = String(category).toLowerCase();
  const docs = portfolioDocEntries.filter(
    (doc) => doc.category.toLowerCase() === normalizedCategory
  );
  return Promise.all(docs.map(hydratePortfolioDoc));
}
