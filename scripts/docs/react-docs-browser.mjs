/**
 * @file scripts/docs/react-docs-browser.mjs
 * @description Browser-safe helpers for rendering and exporting generated JSDoc Markdown in React clients.
 * @module scripts/docs/react-docs-browser
 */
import {
  containsHtmlElement,
  createPureMarkdownFromTemplateData,
} from "./pure-jsdoc-markdown.mjs";

const DEFAULT_MARKDOWN_FILE_NAME = "reference.md";

const sanitizeFileName = (value) => {
  const fileName = String(value || DEFAULT_MARKDOWN_FILE_NAME)
    .replace(/[/\\?%*:|"<>]/gu, "-")
    .replace(/\s+/gu, "-")
    .replace(/-+/gu, "-")
    .trim();

  return fileName.endsWith(".md") ? fileName : `${fileName || "reference"}.md`;
};

const normalizeMarkdown = (value) => String(value ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

/**
 * Converts parsed JSDoc template data into pure Markdown that is safe to display in React.
 *
 * @param {Array<Object>} templateData - Parsed JSDoc doclets.
 * @param {Object} [options] - Rendering options.
 * @param {string} [options.title] - Optional top-level document title.
 * @returns {string} Pure Markdown content.
 */
export function createReactMarkdownReference(templateData, options = {}) {
  return createPureMarkdownFromTemplateData(templateData, options);
}

/**
 * Creates a browser download payload for a generated Markdown reference.
 *
 * @param {string} markdown - Markdown content.
 * @param {string} [fileName] - Suggested file name.
 * @returns {{ fileName: string, mimeType: string, content: string }} Download-ready payload.
 */
export function createMarkdownDownload(markdown, fileName = DEFAULT_MARKDOWN_FILE_NAME) {
  return {
    fileName: sanitizeFileName(fileName),
    mimeType: "text/markdown;charset=utf-8",
    content: `${normalizeMarkdown(markdown)}\n`,
  };
}

/**
 * Builds a small manifest for client-side navigation between generated Markdown documents.
 *
 * @param {Array<Object>} entries - Generated reference entries.
 * @returns {Array<Object>} Normalized manifest entries grouped by section metadata.
 */
export function createReferenceManifest(entries) {
  return (Array.isArray(entries) ? entries : [])
    .map((entry) => ({
      sectionKey: String(entry.sectionKey || "general"),
      sectionTitle: String(entry.sectionTitle || entry.sectionKey || "General"),
      title: String(entry.title || entry.docFileName || entry.sourcePath || "Reference"),
      sourcePath: String(entry.sourcePath || ""),
      docFileName: sanitizeFileName(entry.docFileName || entry.title || DEFAULT_MARKDOWN_FILE_NAME),
      markdown: normalizeMarkdown(entry.markdown),
    }))
    .sort((left, right) => {
      const sectionSort = left.sectionTitle.localeCompare(right.sectionTitle);
      return sectionSort === 0 ? left.title.localeCompare(right.title) : sectionSort;
    });
}

/**
 * Copies generated Markdown to the clipboard when the browser Clipboard API is available.
 *
 * @param {string} markdown - Markdown content.
 * @param {Navigator} [navigatorRef] - Browser navigator override, useful in tests.
 * @returns {Promise<boolean>} Whether copy succeeded.
 */
export async function copyMarkdownToClipboard(markdown, navigatorRef = globalThis.navigator) {
  if (!navigatorRef?.clipboard?.writeText) {
    return false;
  }

  await navigatorRef.clipboard.writeText(normalizeMarkdown(markdown));
  return true;
}

/**
 * Downloads generated Markdown in the browser.
 *
 * @param {string} markdown - Markdown content.
 * @param {string} [fileName] - Suggested file name.
 * @param {Document} [documentRef] - Browser document override, useful in tests.
 * @returns {boolean} Whether the download was started.
 */
export function downloadMarkdown(markdown, fileName = DEFAULT_MARKDOWN_FILE_NAME, documentRef = globalThis.document) {
  if (!documentRef?.createElement || !globalThis.Blob || !globalThis.URL?.createObjectURL) {
    return false;
  }

  const payload = createMarkdownDownload(markdown, fileName);
  const blob = new Blob([payload.content], { type: payload.mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = documentRef.createElement("a");

  anchor.href = url;
  anchor.download = payload.fileName;
  anchor.rel = "noopener";
  anchor.style.display = "none";
  documentRef.body?.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);

  return true;
}

/**
 * Validates generated Markdown before it is displayed in a React client.
 *
 * @param {string} markdown - Markdown content.
 * @returns {{ ok: boolean, issues: Array<string> }} Validation result.
 */
export function validateClientMarkdown(markdown) {
  const issues = [];
  const normalizedMarkdown = normalizeMarkdown(markdown);

  if (!normalizedMarkdown) {
    issues.push("Markdown content is empty.");
  }

  if (containsHtmlElement(normalizedMarkdown)) {
    issues.push("Markdown still contains HTML elements.");
  }

  return {
    ok: issues.length === 0,
    issues,
  };
}
