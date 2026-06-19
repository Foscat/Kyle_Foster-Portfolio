/**
 * @file scripts/docs/pure-jsdoc-markdown.mjs
 * @description Formats JSDoc template data as Markdown without embedded HTML.
 * @module scripts/docs/pure-jsdoc-markdown
 */

const htmlTagNames = new Set([
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "b",
  "blockquote",
  "br",
  "button",
  "caption",
  "code",
  "dd",
  "details",
  "div",
  "dl",
  "dt",
  "em",
  "figcaption",
  "figure",
  "footer",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "i",
  "img",
  "kbd",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "pre",
  "samp",
  "script",
  "section",
  "small",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
  "var",
]);

const blockHtmlTagNames = new Set([
  "article",
  "aside",
  "blockquote",
  "br",
  "dd",
  "details",
  "div",
  "dl",
  "dt",
  "figcaption",
  "figure",
  "footer",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "pre",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "ul",
]);

const htmlElementPattern = /<\/?\s*([a-z][a-z0-9-]*)\b[^>]*>/giu;

const normalizeLineEndings = (value) => String(value ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");

const decodeHtmlEntities = (value) =>
  value
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#34;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&");

const stripUnsafeBlocks = (value) =>
  value.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/giu, "");

const stripKnownHtmlTag = (fullMatch, tagName) => {
  const normalizedTagName = tagName.toLowerCase();

  if (!htmlTagNames.has(normalizedTagName)) {
    return fullMatch;
  }

  return blockHtmlTagNames.has(normalizedTagName) ? "\n" : "";
};

const normalizeMarkdownSpacing = (value) => {
  const lines = value
    .replace(/[ \t]+\n/gu, "\n")
    .split("\n")
    .map((line) => line.trimEnd());

  const normalizedLines = [];
  let blankCount = 0;

  for (const line of lines) {
    if (!line.trim()) {
      blankCount += 1;
      if (blankCount <= 1) {
        normalizedLines.push("");
      }
      continue;
    }

    blankCount = 0;
    normalizedLines.push(line);
  }

  return normalizedLines.join("\n").replace(/\n{3,}/gu, "\n\n").trim();
};

const escapeInlineCode = (value) => String(value ?? "").replaceAll("`", "\\`").trim();

const escapeMarkdownLinkText = (value) =>
  String(value ?? "").replaceAll("[", "\\[").replaceAll("]", "\\]");

const escapeMarkdownHeadingText = (value) =>
  String(value ?? "").replace(/([*_`\\])/gu, "\\$1").trim();

const stripMarkdownCode = (value) =>
  value.replace(/```[\s\S]*?```/gu, "").replace(/`[^`\n]*`/gu, "");

/**
 * Converts common JSDoc-generated HTML fragments into Markdown-safe text.
 *
 * @param {string} value - HTML or plain text from parsed JSDoc data.
 * @returns {string} Markdown text without known HTML tags.
 */
export function htmlToMarkdownText(value) {
  let output = normalizeLineEndings(value);

  output = stripUnsafeBlocks(output);
  output = output.replace(
    /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/giu,
    (_match, href, label) => `[${escapeMarkdownLinkText(htmlToMarkdownText(label))}](${href})`
  );
  output = output.replace(
    /<code\b[^>]*>([\s\S]*?)<\/code>/giu,
    (_match, code) => `\`${escapeInlineCode(decodeHtmlEntities(code).replace(htmlElementPattern, stripKnownHtmlTag))}\``
  );
  output = output.replace(
    /<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/giu,
    (_match, _tagName, text) => `**${htmlToMarkdownText(text)}**`
  );
  output = output.replace(
    /<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/giu,
    (_match, _tagName, text) => `*${htmlToMarkdownText(text)}*`
  );
  output = output.replace(/<br\b[^>]*\/?>/giu, "\n");
  output = output.replace(/<li\b[^>]*>/giu, "\n- ");
  output = output.replace(/<\/li>/giu, "");
  output = output.replace(/<\/p>\s*<p\b[^>]*>/giu, "\n\n");
  output = output.replace(htmlElementPattern, stripKnownHtmlTag);
  output = decodeHtmlEntities(output);

  return normalizeMarkdownSpacing(output);
}

/**
 * Checks whether Markdown still contains known HTML elements outside code spans.
 *
 * @param {string} markdown - Markdown content to inspect.
 * @returns {boolean} Whether the content still contains known HTML elements.
 */
export function containsHtmlElement(markdown) {
  const searchableMarkdown = stripMarkdownCode(normalizeLineEndings(markdown));

  for (const match of searchableMarkdown.matchAll(htmlElementPattern)) {
    if (htmlTagNames.has(match[1].toLowerCase())) {
      return true;
    }
  }

  return false;
}

const isRenderableDoclet = (doclet) =>
  doclet &&
  !doclet.ignore &&
  !doclet.undocumented &&
  doclet.access !== "private" &&
  doclet.kind !== "package";

const normalizeTypeName = (typeName) =>
  String(typeName ?? "")
    .replace(/\.\s*</gu, "<")
    .replace(/\s+/gu, " ")
    .replace(/\*/gu, "any")
    .trim();

const formatType = (type) => {
  const names = Array.isArray(type?.names) ? type.names : [];
  const formattedNames = names.map(normalizeTypeName).filter(Boolean);
  return formattedNames.length > 0 ? formattedNames.join(" | ") : "";
};

const formatName = (doclet) => {
  const rawName = String(doclet.name || doclet.longname || "entry")
    .replace(/^module:/u, "")
    .replace(/^exports\./u, "")
    .trim();

  if (doclet.kind === "function") {
    return rawName.endsWith("()") ? rawName : `${rawName}()`;
  }

  return rawName;
};

const formatModuleName = (doclet) =>
  String(doclet.name || doclet.longname || "module")
    .replace(/^module:/u, "")
    .trim();

const normalizeModuleKey = (value) => {
  if (!value) {
    return "";
  }

  const text = String(value);
  const moduleMatch = text.match(/^module:[^.~#]+/u);
  return moduleMatch ? moduleMatch[0] : text;
};

const getDocletModuleKey = (doclet) => {
  const memberOfKey = normalizeModuleKey(doclet.memberof);
  if (memberOfKey) {
    return memberOfKey;
  }

  return normalizeModuleKey(doclet.longname);
};

const formatListDescription = (value) => {
  const description = htmlToMarkdownText(value).replace(/```[\s\S]*?```/gu, "").trim();
  return description.replace(/\n+/gu, " ").trim();
};

const formatOptionalDetails = (item) => {
  const details = [];
  const typeName = formatType(item.type);

  if (typeName) {
    details.push(`\`${typeName}\``);
  }

  if (item.optional) {
    details.push("optional");
  }

  if (item.defaultvalue !== undefined) {
    details.push(`default: \`${escapeInlineCode(item.defaultvalue)}\``);
  }

  return details.length > 0 ? ` (${details.join(", ")})` : "";
};

const formatParam = (param) => {
  const description = formatListDescription(param.description);
  const suffix = description ? ` - ${description}` : "";
  return `- \`${param.name}\`${formatOptionalDetails(param)}${suffix}`;
};

const formatReturn = (returnValue) => {
  const typeName = formatType(returnValue.type);
  const description = formatListDescription(returnValue.description);
  const typePrefix = typeName ? `\`${typeName}\`` : "Value";
  return `- ${typePrefix}${description ? ` - ${description}` : ""}`;
};

const formatExample = (example) => {
  const source = typeof example === "string" ? example : example?.description || "";
  const trimmedSource = normalizeLineEndings(source).trim();

  if (!trimmedSource) {
    return "";
  }

  return ["```js", trimmedSource, "```"].join("\n");
};

const pushSection = (lines, title, entries, formatter) => {
  const renderedEntries = entries.map(formatter).filter(Boolean);
  if (renderedEntries.length === 0) {
    return;
  }

  lines.push(`**${title}**`, "", ...renderedEntries, "");
};

const renderDoclet = (doclet, headingLevel) => {
  const lines = [`${"#".repeat(headingLevel)} ${escapeMarkdownHeadingText(formatName(doclet))}`, ""];
  const description = htmlToMarkdownText(doclet.description);
  const typeName = formatType(doclet.type);

  if (description) {
    lines.push(description, "");
  }

  if (typeName && !["function", "module"].includes(doclet.kind)) {
    lines.push(`- Type: \`${typeName}\``, "");
  }

  pushSection(lines, "Parameters", doclet.params || [], formatParam);
  pushSection(lines, "Properties", doclet.properties || [], formatParam);
  pushSection(lines, "Returns", doclet.returns || [], formatReturn);
  pushSection(lines, "Throws", doclet.exceptions || doclet.throws || [], formatReturn);
  pushSection(lines, "Examples", doclet.examples || [], formatExample);

  return lines.join("\n").trimEnd();
};

const buildModuleGroups = (doclets) => {
  const modules = doclets.filter((doclet) => doclet.kind === "module");
  const moduleKeySet = new Set(modules.map((doclet) => normalizeModuleKey(doclet.longname)).filter(Boolean));
  const childrenByModule = new Map(modules.map((doclet) => [normalizeModuleKey(doclet.longname), []]));
  const ungrouped = [];

  for (const doclet of doclets) {
    if (doclet.kind === "module") {
      continue;
    }

    const moduleKey = getDocletModuleKey(doclet);
    if (moduleKeySet.has(moduleKey)) {
      childrenByModule.get(moduleKey).push(doclet);
      continue;
    }

    ungrouped.push(doclet);
  }

  return { modules, childrenByModule, ungrouped };
};

/**
 * Renders parsed JSDoc template data as Markdown without HTML elements.
 *
 * @param {Array<Object>} templateData - Parsed doclets from jsdoc-to-markdown.
 * @param {Object} [options] - Rendering options.
 * @param {string} [options.title] - Optional top-level document title.
 * @returns {string} Pure Markdown reference content.
 */
export function createPureMarkdownFromTemplateData(templateData, options = {}) {
  const doclets = (Array.isArray(templateData) ? templateData : []).filter(isRenderableDoclet);
  const lines = [];

  if (options.title) {
    lines.push(`# ${escapeMarkdownHeadingText(options.title)}`, "");
  }

  if (doclets.length === 0) {
    lines.push("No public JSDoc entries were found.");
    return lines.join("\n").trimEnd();
  }

  const { modules, childrenByModule, ungrouped } = buildModuleGroups(doclets);

  for (const moduleDoclet of modules) {
    const moduleKey = normalizeModuleKey(moduleDoclet.longname);
    const description = htmlToMarkdownText(moduleDoclet.description);
    lines.push(`## ${escapeMarkdownHeadingText(formatModuleName(moduleDoclet))}`, "");

    if (description) {
      lines.push(description, "");
    }

    for (const childDoclet of childrenByModule.get(moduleKey) || []) {
      lines.push(renderDoclet(childDoclet, 3), "");
    }
  }

  for (const doclet of ungrouped) {
    lines.push(renderDoclet(doclet, 2), "");
  }

  return lines.join("\n").replace(/\n{3,}/gu, "\n\n").trimEnd();
}
