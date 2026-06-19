/**
 * @file scripts/docs/generate-react-jsdoc-reference.mjs
 * @description Generates aggregate and granular pure-Markdown JSDoc references for the portfolio React app.
 * @module scripts/docs/generate-react-jsdoc-reference
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import jsdoc2md from "jsdoc-to-markdown";
import { createPureMarkdownFromTemplateData } from "./pure-jsdoc-markdown.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(SCRIPT_DIR, "../..");
const SOURCE_EXTENSIONS = new Set([".js", ".jsx", ".mjs", ".cjs"]);
const IGNORED_PATH_SEGMENTS = new Set([
  "__tests__",
  "__mocks__",
  "coverage",
  "dist",
  "docs",
  "node_modules",
  "test-results",
]);
const IGNORED_FILE_PATTERN = /\.(test|spec)\.[cm]?[jt]sx?$/u;

const DEFAULT_SECTION_CONFIG = [
  {
    key: "components",
    title: "Feature Components",
    sourceDirs: ["src/components/features"],
    aggregateFile: "docs/components.md",
    referenceDir: "docs/reference/client/components",
    docSuffix: "Component",
    group: "client",
  },
  {
    key: "layout",
    title: "Layout Components",
    sourceDirs: ["src/components/layout"],
    aggregateFile: "docs/layout.md",
    referenceDir: "docs/reference/client/layout",
    docSuffix: "Layout",
    group: "client",
  },
  {
    key: "navigation",
    title: "Navigation Components",
    sourceDirs: ["src/components/navigation"],
    aggregateFile: "docs/navigation.md",
    referenceDir: "docs/reference/client/navigation",
    docSuffix: "Navigation",
    group: "client",
  },
  {
    key: "renderers",
    title: "Renderer Components",
    sourceDirs: ["src/components/renderers"],
    aggregateFile: "docs/renderers.md",
    referenceDir: "docs/reference/client/renderers",
    docSuffix: "Renderer",
    group: "client",
  },
  {
    key: "ui",
    title: "UI Components",
    sourceDirs: ["src/components/ui"],
    aggregateFile: "docs/ui.md",
    referenceDir: "docs/reference/client/ui",
    docSuffix: "Ui",
    group: "client",
  },
  {
    key: "pages",
    title: "Pages",
    sourceDirs: ["src/pages"],
    aggregateFile: "docs/pages.md",
    referenceDir: "docs/reference/client/pages",
    docSuffix: "Page",
    group: "client",
  },
  {
    key: "hooks",
    title: "Hooks",
    sourceDirs: ["src/assets/hooks", "src/hooks"],
    aggregateFile: "docs/hooks.md",
    referenceDir: "docs/reference/client/hooks",
    docSuffix: "Hook",
    group: "client",
  },
  {
    key: "context",
    title: "Context",
    sourceDirs: ["src/assets/context", "src/context"],
    aggregateFile: "docs/context.md",
    referenceDir: "docs/reference/client/context",
    docSuffix: "Context",
    group: "client",
  },
  {
    key: "data",
    title: "Data and Content",
    sourceDirs: ["src/assets/data"],
    aggregateFile: "docs/data.md",
    referenceDir: "docs/reference/client/data",
    docSuffix: "Data",
    group: "client",
  },
  {
    key: "types",
    title: "Types",
    sourceDirs: ["src/types"],
    aggregateFile: "docs/types.md",
    referenceDir: "docs/reference/client/types",
    docSuffix: "Type",
    group: "client",
  },
  {
    key: "tests",
    title: "Test Helpers",
    sourceDirs: ["src/tests"],
    aggregateFile: "docs/tests.md",
    referenceDir: "docs/reference/client/tests",
    docSuffix: "Test",
    group: "client",
  },
  {
    key: "scripts",
    title: "Scripts",
    sourceDirs: ["scripts"],
    aggregateFile: "docs/scripts.md",
    referenceDir: "docs/reference/tooling/scripts",
    docSuffix: "Script",
    group: "tooling",
  },
  {
    key: "playwright",
    title: "Playwright Fixtures",
    sourceDirs: ["playwright"],
    aggregateFile: "docs/playwright.md",
    referenceDir: "docs/reference/tooling/playwright",
    docSuffix: "Playwright",
    group: "tooling",
  },
];

const GROUP_TITLES = {
  client: "Client Reference",
  tooling: "Tooling Reference",
};

const toPosixPath = (targetPath) => targetPath.replaceAll("\\", "/");

const toAbsolutePath = (root, relativePath) => path.resolve(root, relativePath);

const toRelativeRootPath = (root, absolutePath) => toPosixPath(path.relative(root, absolutePath));

const ensureDirectory = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const writeMarkdown = (outputPath, content) => {
  ensureDirectory(path.dirname(outputPath));
  const normalizedContent = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trimEnd();
  fs.writeFileSync(outputPath, `${normalizedContent}\n`, "utf8");
};

const assertWithinReferenceRoot = (referenceRoot, targetPath) => {
  const relPath = path.relative(referenceRoot, targetPath);
  if (relPath.startsWith("..") || path.isAbsolute(relPath)) {
    throw new Error(`Refusing to clear directory outside docs/reference: ${targetPath}`);
  }
};

const resetReferenceDirectory = (referenceRoot, absoluteDirPath) => {
  assertWithinReferenceRoot(referenceRoot, absoluteDirPath);
  fs.rmSync(absoluteDirPath, { recursive: true, force: true });
  ensureDirectory(absoluteDirPath);
};

const shouldIgnorePath = (targetPath) => {
  const normalizedPath = toPosixPath(targetPath);
  const fileName = path.basename(normalizedPath);
  const segments = normalizedPath.split("/");

  if (IGNORED_FILE_PATTERN.test(fileName) || fileName.endsWith(".d.ts")) {
    return true;
  }

  return segments.some((segment) => IGNORED_PATH_SEGMENTS.has(segment));
};

const collectFilesRecursive = (absoluteSourcePath, extensionSet, fileAccumulator) => {
  if (!fs.existsSync(absoluteSourcePath) || shouldIgnorePath(absoluteSourcePath)) {
    return;
  }

  const stat = fs.statSync(absoluteSourcePath);
  if (stat.isFile()) {
    if (extensionSet.has(path.extname(absoluteSourcePath).toLowerCase())) {
      fileAccumulator.push(absoluteSourcePath);
    }
    return;
  }

  if (!stat.isDirectory()) {
    return;
  }

  const entries = fs.readdirSync(absoluteSourcePath, { withFileTypes: true });
  for (const entry of entries) {
    const nextPath = path.join(absoluteSourcePath, entry.name);
    if (shouldIgnorePath(nextPath)) {
      continue;
    }

    if (entry.isDirectory()) {
      collectFilesRecursive(nextPath, extensionSet, fileAccumulator);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (extensionSet.has(path.extname(entry.name).toLowerCase())) {
      fileAccumulator.push(nextPath);
    }
  }
};

/**
 * Resolves configured source files and folders that exist for a docs section.
 *
 * @param {string} root - Project root directory.
 * @param {Object} section - Section configuration.
 * @returns {string[]} Existing absolute source paths.
 */
export const resolveSectionSourcePaths = (root, section) => {
  const sourceDirs = section.sourceDirs || [section.sourceDir].filter(Boolean);
  return sourceDirs
    .map((sourceDir) => toAbsolutePath(root, sourceDir))
    .filter((sourcePath) => fs.existsSync(sourcePath));
};

/**
 * Collects supported source files from configured files and folders.
 *
 * @param {string[]} sourcePaths - Absolute source files or directories.
 * @returns {string[]} Sorted absolute source files.
 */
export const collectSourceFiles = (sourcePaths) => {
  const files = [];
  for (const sourcePath of sourcePaths) {
    collectFilesRecursive(sourcePath, SOURCE_EXTENSIONS, files);
  }

  const uniqueFiles = [...new Set(files)];
  return uniqueFiles.sort((left, right) => {
    const leftRel = toPosixPath(left);
    const rightRel = toPosixPath(right);
    const leftDepth = leftRel.split("/").length;
    const rightDepth = rightRel.split("/").length;
    if (leftDepth !== rightDepth) {
      return leftDepth - rightDepth;
    }
    return leftRel.localeCompare(rightRel);
  });
};

const isNoInputFilesError = (error) => /no input files to process/iu.test(String(error?.message || ""));

const renderMarkdownForFiles = async (files, title) => {
  let templateData;

  try {
    templateData = await jsdoc2md.getTemplateData({
      files,
      "no-cache": true,
    });
  } catch (error) {
    // JSDoc can ignore valid .mjs/.cjs inputs when rendered individually; keep the
    // granular file navigable and make the absence of public doclets explicit.
    if (isNoInputFilesError(error)) {
      templateData = [];
    } else {
      throw error;
    }
  }

  return createPureMarkdownFromTemplateData(templateData, { title });
};

const capitalize = (value) => {
  if (!value) return "";
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

const toCamelCase = (value) => {
  const parts = String(value)
    .split(/[^A-Za-z0-9]+/u)
    .filter(Boolean)
    .map((part) => part.replace(/[^A-Za-z0-9]/gu, ""));

  if (parts.length === 0) {
    return "module";
  }

  const [head, ...tail] = parts;
  const normalizedHead = head.charAt(0).toLowerCase() + head.slice(1);
  return normalizedHead + tail.map((part) => capitalize(part.toLowerCase())).join("");
};

const endsWithSuffixVariant = (value, suffix) => {
  const normalizedValue = String(value ?? "").toLowerCase();
  const normalizedSuffix = String(suffix ?? "").toLowerCase();
  if (!normalizedSuffix) {
    return false;
  }

  const suffixVariants = new Set([normalizedSuffix]);
  if (normalizedSuffix.endsWith("s")) {
    suffixVariants.add(normalizedSuffix.slice(0, -1));
  }
  if (normalizedSuffix.endsWith("ies")) {
    suffixVariants.add(`${normalizedSuffix.slice(0, -3)}y`);
  }

  for (const variant of suffixVariants) {
    if (variant && normalizedValue.endsWith(variant)) {
      return true;
    }
  }

  return false;
};

const deriveDocBaseName = (relativeSourcePath, docSuffix, usedNames) => {
  const extensionlessSourcePath = relativeSourcePath.replace(/\.[^/.]+$/, "");
  const baseName = path.basename(extensionlessSourcePath);
  const fallbackName = toCamelCase(baseName);
  const withSuffix = endsWithSuffixVariant(fallbackName, docSuffix)
    ? fallbackName
    : `${fallbackName}${docSuffix}`;

  if (!usedNames.has(withSuffix)) {
    usedNames.add(withSuffix);
    return withSuffix;
  }

  const pathBasedName = toCamelCase(extensionlessSourcePath);
  const withPathSuffix = endsWithSuffixVariant(pathBasedName, docSuffix)
    ? pathBasedName
    : `${pathBasedName}${docSuffix}`;

  if (!usedNames.has(withPathSuffix)) {
    usedNames.add(withPathSuffix);
    return withPathSuffix;
  }

  let index = 2;
  while (usedNames.has(`${withPathSuffix}${index}`)) {
    index += 1;
  }

  const uniqueName = `${withPathSuffix}${index}`;
  usedNames.add(uniqueName);
  return uniqueName;
};

const createEmptyAggregateDoc = (title) => `# ${title}\n\nNo source files were found for this section.\n`;

const createGranularDoc = (docBaseName, relativeSourcePath, apiMarkdown) =>
  [
    `# ${docBaseName}`,
    "",
    `- Source: \`${relativeSourcePath}\``,
    "",
    apiMarkdown.trim(),
    "",
  ].join("\n");

const createSectionReadme = (section, referenceDirPath, aggregateFilePath, entries) => {
  const aggregateLink = toPosixPath(path.relative(referenceDirPath, aggregateFilePath));
  const lines = [
    `# ${section.title} Reference`,
    "",
    `- Aggregate reference: [${path.basename(aggregateFilePath)}](${aggregateLink})`,
    `- Generated docs in this folder: ${entries.length}`,
    "",
  ];

  if (entries.length === 0) {
    lines.push("No source files were discovered for this section.", "");
    return lines.join("\n");
  }

  lines.push("## Modules", "");
  for (const entry of entries) {
    lines.push(`- [${entry.docFileName}](./${entry.docFileName}) - \`${entry.relativeSourcePath}\``);
  }
  lines.push("");

  return lines.join("\n");
};

const createGroupReadme = (groupKey, sectionSummaries) => {
  const title = GROUP_TITLES[groupKey] || `${capitalize(groupKey)} Reference`;
  const lines = [
    `# ${title}`,
    "",
    "Granular and aggregate documentation generated from JSDoc comments.",
    "",
    "## Sections",
    "",
  ];

  for (const summary of sectionSummaries) {
    lines.push(
      `- [${summary.title}](./${summary.key}/README.md) - ${summary.count} module reference file(s)`
    );
  }
  lines.push("");

  return lines.join("\n");
};

const createReferenceRootReadme = (sectionSummaries) => {
  const grouped = new Map();
  for (const summary of sectionSummaries) {
    const summaries = grouped.get(summary.group) || [];
    summaries.push(summary);
    grouped.set(summary.group, summaries);
  }

  const totalFiles = sectionSummaries.reduce((sum, summary) => sum + summary.count, 0);
  const lines = [
    "# API Reference Index",
    "",
    "Start here for generated, low-scroll API references.",
    "",
    "## Navigation",
    "",
  ];

  for (const [groupKey, summaries] of grouped) {
    const groupTitle = GROUP_TITLES[groupKey] || `${capitalize(groupKey)} Reference`;
    const groupCount = summaries.reduce((sum, summary) => sum + summary.count, 0);
    lines.push(`- [${groupTitle}](./${groupKey}/README.md) (${groupCount} granular module docs)`);
  }

  lines.push("", "## Regeneration", "", "- `npm run docs:build`", "", `Total granular files: ${totalFiles}`, "");

  return lines.join("\n");
};

const parseSection = (value) => {
  const [key, sourceDir, title, docSuffix] = String(value).split(":");
  if (!key || !sourceDir) {
    throw new Error("--section entries must use key:sourceDir[:title[:docSuffix]].");
  }

  const safeTitle = title || capitalize(key);
  const safeSuffix = docSuffix || capitalize(key.replace(/s$/u, ""));

  return {
    key,
    title: safeTitle,
    sourceDirs: sourceDir
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean),
    aggregateFile: `docs/${key}.md`,
    referenceDir: `docs/reference/client/${key}`,
    docSuffix: safeSuffix,
    group: "client",
  };
};

const parseCliOptions = (argv = process.argv) => {
  const options = {
    root: DEFAULT_ROOT,
    selectedSections: new Set(),
    customSections: [],
    skipIndex: false,
  };

  for (let index = 2; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--skip-index") {
      options.skipIndex = true;
      continue;
    }

    if (arg === "--root") {
      options.root = path.resolve(argv[index + 1] || "");
      index += 1;
      continue;
    }

    if (arg.startsWith("--root=")) {
      options.root = path.resolve(arg.slice("--root=".length));
      continue;
    }

    if (arg === "--only") {
      options.selectedSections.add(argv[index + 1] || "");
      index += 1;
      continue;
    }

    if (arg.startsWith("--only=")) {
      options.selectedSections.add(arg.slice("--only=".length));
      continue;
    }

    if (arg === "--section") {
      options.customSections.push(parseSection(argv[index + 1] || ""));
      index += 1;
      continue;
    }

    if (arg.startsWith("--section=")) {
      options.customSections.push(parseSection(arg.slice("--section=".length)));
    }
  }

  return options;
};

const getSelectedSections = (allSections, requestedSectionKeys) => {
  const requestedKeys = new Set([...requestedSectionKeys].filter(Boolean));
  if (requestedKeys.size === 0) {
    return allSections;
  }

  const sections = allSections.filter((section) => requestedKeys.has(section.key));
  const selectedKeys = new Set(sections.map((section) => section.key));
  const unknownKeys = [...requestedKeys].filter((sectionKey) => !selectedKeys.has(sectionKey));

  if (unknownKeys.length > 0) {
    throw new Error(`Unknown client docs section(s): ${unknownKeys.join(", ")}`);
  }

  return sections;
};

/**
 * Generates granular JSDoc references for React client and tooling source folders.
 *
 * @param {Object} options - Generation options.
 * @param {string} options.root - Project root.
 * @param {Array<Object>} options.sections - Section configuration.
 * @param {boolean} [options.skipIndex] - Whether to skip index files.
 * @returns {Promise<Array<Object>>} Section summaries.
 */
export async function generateReactJSDocReference({
  root = DEFAULT_ROOT,
  sections = DEFAULT_SECTION_CONFIG,
  skipIndex = false,
} = {}) {
  const referenceRoot = toAbsolutePath(root, "docs/reference");
  const groupSummaries = new Map();
  const sectionSummaries = [];

  ensureDirectory(referenceRoot);

  for (const section of sections) {
    const sourcePaths = resolveSectionSourcePaths(root, section);
    const aggregateFilePath = toAbsolutePath(root, section.aggregateFile);
    const referenceDirPath = toAbsolutePath(root, section.referenceDir);
    const sourceFiles = collectSourceFiles(sourcePaths);

    resetReferenceDirectory(referenceRoot, referenceDirPath);

    if (sourceFiles.length === 0) {
      writeMarkdown(aggregateFilePath, createEmptyAggregateDoc(section.title));
      writeMarkdown(
        path.join(referenceDirPath, "README.md"),
        createSectionReadme(section, referenceDirPath, aggregateFilePath, [])
      );
      sectionSummaries.push({ key: section.key, title: section.title, count: 0, group: section.group });
      continue;
    }

    const aggregateMarkdown = await renderMarkdownForFiles(sourceFiles, section.title);
    writeMarkdown(aggregateFilePath, aggregateMarkdown);

    const usedNames = new Set();
    const entries = [];

    for (const absoluteSourcePath of sourceFiles) {
      const relativeSourcePath = toRelativeRootPath(root, absoluteSourcePath);
      const docBaseName = deriveDocBaseName(relativeSourcePath, section.docSuffix, usedNames);
      const docFileName = `${docBaseName}.md`;
      const docOutputPath = path.join(referenceDirPath, docFileName);
      const moduleMarkdown = await renderMarkdownForFiles([absoluteSourcePath], docBaseName);

      writeMarkdown(docOutputPath, createGranularDoc(docBaseName, relativeSourcePath, moduleMarkdown));
      entries.push({ docFileName, relativeSourcePath });
    }

    writeMarkdown(
      path.join(referenceDirPath, "README.md"),
      createSectionReadme(section, referenceDirPath, aggregateFilePath, entries)
    );
    sectionSummaries.push({
      key: section.key,
      title: section.title,
      count: entries.length,
      group: section.group,
    });
  }

  for (const summary of sectionSummaries) {
    const summaries = groupSummaries.get(summary.group) || [];
    summaries.push(summary);
    groupSummaries.set(summary.group, summaries);
  }

  if (!skipIndex) {
    for (const [groupKey, summaries] of groupSummaries) {
      writeMarkdown(path.join(referenceRoot, groupKey, "README.md"), createGroupReadme(groupKey, summaries));
    }
    writeMarkdown(path.join(referenceRoot, "README.md"), createReferenceRootReadme(sectionSummaries));
  }

  return sectionSummaries;
}

const main = async () => {
  const cliOptions = parseCliOptions();
  const sections = getSelectedSections(
    cliOptions.customSections.length > 0 ? cliOptions.customSections : DEFAULT_SECTION_CONFIG,
    cliOptions.selectedSections
  );

  const sectionSummaries = await generateReactJSDocReference({
    root: cliOptions.root,
    sections,
    skipIndex: cliOptions.skipIndex,
  });

  const totalGranularDocs = sectionSummaries.reduce((sum, section) => sum + section.count, 0);
  console.log(
    `Reference docs generated: ${totalGranularDocs} granular files across ${sectionSummaries.length} sections.`
  );
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error("Failed to generate granular client reference docs:", error);
    process.exitCode = 1;
  });
}
