const rawGeneratedDocs = import.meta.glob("../../../../docs/**/*.{md,markdown}", {
  eager: true,
  query: "?raw",
  import: "default",
});

const rawDevGuides = import.meta.glob("../../../../dev-guides/**/*.{md,markdown}", {
  eager: true,
  query: "?raw",
  import: "default",
});

const rawDocs = {
  ...rawGeneratedDocs,
  ...rawDevGuides,
};

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
    summary: "Project scripts and build/developer workflow.",
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

export const portfolioDocs = Object.entries(rawDocs)
  .map(([path, content]) => {
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
      content,
    };
  })
  .sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

export function getPortfolioDocs(slugs = []) {
  if (!Array.isArray(slugs) || !slugs.length) {
    return portfolioDocs;
  }

  const wanted = new Set(slugs.map((slug) => slug.toLowerCase()));
  return portfolioDocs.filter((doc) => wanted.has(doc.slug));
}

export function getPortfolioDoc(slug) {
  return portfolioDocs.find((doc) => doc.slug === String(slug).toLowerCase());
}

export function getPortfolioDocsByCategory(category) {
  return portfolioDocs.filter(
    (doc) => doc.category.toLowerCase() === String(category).toLowerCase()
  );
}
