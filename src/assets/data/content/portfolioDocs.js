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
    title: "Feature Components",
    category: "Client Reference",
    summary: "Reusable feature-level React component patterns and responsibilities.",
    order: 2,
  },
  layout: {
    title: "Layout Components",
    category: "Client Reference",
    summary: "Page frame, section, and content layout component references.",
    order: 3,
  },
  navigation: {
    title: "Navigation Components",
    category: "Client Reference",
    summary: "Sticky nav, section nav, scroll behavior, and hierarchy.",
    order: 4,
  },
  renderers: {
    title: "Renderers",
    category: "Client Reference",
    summary: "Data-driven block renderers and markdown rendering surfaces.",
    order: 5,
  },
  ui: {
    title: "UI Components",
    category: "Client Reference",
    summary: "Reusable UI controls, cards, diagrams, and interaction primitives.",
    order: 6,
  },
  pages: {
    title: "Pages",
    category: "Client Reference",
    summary: "Route-level page composition and page-specific behavior.",
    order: 7,
  },
  hooks: {
    title: "Hooks",
    category: "Client Reference",
    summary: "Shared React hooks for responsive behavior, scrolling, and app utilities.",
    order: 8,
  },
  context: {
    title: "Context",
    category: "Client Reference",
    summary: "React context providers that coordinate app-wide state and preferences.",
    order: 9,
  },
  data: {
    title: "Data and Content",
    category: "Client Reference",
    summary: "Content registries, metadata, and source data powering the portfolio.",
    order: 10,
  },
  scripts: {
    title: "Scripts",
    category: "Tooling",
    summary: "Project scripts and the build/development process.",
    order: 30,
  },
  tests: {
    title: "Test Helpers",
    category: "Quality",
    summary: "Testing structure, intent, and coverage strategy.",
    order: 40,
  },
  types: {
    title: "Types",
    category: "Client Reference",
    summary: "Shared shapes, block contracts, and model conventions.",
    order: 11,
  },
  playwright: {
    title: "Playwright Fixtures",
    category: "Tooling",
    summary: "Browser test fixtures and visual validation support files.",
    order: 31,
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
    summary: "Guide to script architecture, intent, and safe maintenance practices.",
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
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getFileName(path) {
  return (
    path
      .split("/")
      .pop()
      ?.replace(/\.(md|markdown)$/i, "") || "document"
  );
}

function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getDocsRelativePath(path) {
  const normalizedPath = path.replaceAll("\\", "/");
  const docsIndex = normalizedPath.indexOf("/docs/");

  if (docsIndex >= 0) {
    return normalizedPath.slice(docsIndex + "/docs/".length);
  }

  const devGuidesIndex = normalizedPath.indexOf("/dev-guides/");
  if (devGuidesIndex >= 0) {
    return normalizedPath.slice(devGuidesIndex + 1);
  }

  return normalizedPath;
}

function getSlug(path) {
  const relativePath = getDocsRelativePath(path).replace(/\.(md|markdown)$/i, "");

  if (relativePath.startsWith("reference/")) {
    return slugify(relativePath);
  }

  return slugify(getFileName(path));
}

function getCategoryFromPath(path) {
  if (path.includes("/dev-guides/")) {
    return "Developer Guides";
  }

  const cleanPath = getDocsRelativePath(path);
  const parts = cleanPath.split("/");

  if (parts[0] === "reference" && parts.length >= 3) {
    const groupTitle = titleize(parts[1]);
    const sectionTitle = parts[2]?.toLowerCase() === "readme" ? "Index" : titleize(parts[2] || "");
    return sectionTitle === "Index" ? `${groupTitle} Reference` : `${groupTitle} ${sectionTitle}`;
  }

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
    const relativePath = getDocsRelativePath(path);
    const meta = DOC_META[slug] || {};

    return {
      slug,
      fileName,
      path,
      relativePath,
      title: meta.title || titleize(fileName),
      category: meta.category || getCategoryFromPath(path),
      summary: meta.summary || "",
      order: meta.order || 999,
      isReferenceDoc: relativePath.startsWith("reference/"),
      isReferenceIndex:
        relativePath.endsWith("/README.md") || relativePath === "reference/README.md",
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

function normalizePathPrefix(prefix = "") {
  return String(prefix)
    .replaceAll("\\", "/")
    .replace(/^(\.\.\/)+/g, "")
    .replace(/^docs\//, "")
    .replace(/^\/+/, "")
    .replace(/\/?$/u, "/");
}

function matchesPathPrefix(doc, prefixes = []) {
  if (!Array.isArray(prefixes) || prefixes.length === 0) {
    return true;
  }

  return prefixes.some((prefix) => doc.relativePath.startsWith(normalizePathPrefix(prefix)));
}

function selectDocsByCriteria({
  slugs = [],
  categories = [],
  pathPrefixes = [],
  includeReferenceIndexes = false,
} = {}) {
  const hasSlugs = Array.isArray(slugs) && slugs.length > 0;
  const hasCategories = Array.isArray(categories) && categories.length > 0;
  const hasPathPrefixes = Array.isArray(pathPrefixes) && pathPrefixes.length > 0;

  if (!hasSlugs && !hasCategories && !hasPathPrefixes) {
    return portfolioDocEntries;
  }

  const wantedSlugs = new Set((slugs || []).map((slug) => String(slug).toLowerCase()));
  const wantedCategories = new Set(
    (categories || []).map((category) => String(category).toLowerCase())
  );

  return portfolioDocEntries.filter((doc) => {
    if (!includeReferenceIndexes && doc.isReferenceIndex) {
      return false;
    }

    const matchesSlug = !hasSlugs || wantedSlugs.has(doc.slug);
    const matchesCategory = !hasCategories || wantedCategories.has(doc.category.toLowerCase());
    const matchesPrefix = !hasPathPrefixes || matchesPathPrefix(doc, pathPrefixes);

    return matchesSlug && matchesCategory && matchesPrefix;
  });
}

async function hydratePortfolioDoc(entry) {
  const content = await entry.load();
  const sanitizedContent = sanitizeDocContent(content, entry.path);

  return {
    slug: entry.slug,
    fileName: entry.fileName,
    path: entry.path,
    relativePath: entry.relativePath,
    title: entry.title,
    category: entry.category,
    summary: entry.summary,
    order: entry.order,
    isReferenceDoc: entry.isReferenceDoc,
    isReferenceIndex: entry.isReferenceIndex,
    content: sanitizedContent,
  };
}

/**
 * @description Metadata-only portfolio docs list.
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
 * Load hydrated portfolio docs using category or path-prefix selectors.
 *
 * @param {Object} [criteria={}] Selection criteria.
 * @param {string[]} [criteria.slugs=[]] Optional slug allow-list.
 * @param {string[]} [criteria.categories=[]] Optional category allow-list.
 * @param {string[]} [criteria.pathPrefixes=[]] Optional docs-relative path prefixes.
 * @param {boolean} [criteria.includeReferenceIndexes=false] Whether README index docs should be included.
 * @returns {Promise<Array<{slug: string, fileName: string, path: string, relativePath: string, title: string, category: string, summary: string, order: number, content: string}>>}
 */
export async function getPortfolioDocsByCriteria(criteria = {}) {
  const docs = selectDocsByCriteria(criteria);
  return Promise.all(docs.map(hydratePortfolioDoc));
}

/**
 * Read metadata-only docs using the same selector rules as hydrated docs.
 *
 * @param {Object} [criteria={}] Selection criteria.
 * @returns {Array<Object>} Metadata-only docs for navigation generation.
 */
export function getPortfolioDocsMetaByCriteria(criteria = {}) {
  return selectDocsByCriteria(criteria).map(({ load, ...doc }) => doc);
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
