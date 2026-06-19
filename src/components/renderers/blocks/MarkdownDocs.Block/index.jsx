/**
 * @file src\components\renderers\blocks\MarkdownDocs.Block\index.jsx
 * @description src\components\renderers\blocks\MarkdownDocs.Block\index module.
 * @module src\components\renderers\blocks\MarkdownDocs.Block\index
 */

import { useEffect, useMemo, useState } from "react";
import { Panel } from "rsuite";
import MarkdownRenderer from "../../MarkdownRenderer";
import {
  getPortfolioDocs,
  getPortfolioDocsByCriteria,
} from "../../../../assets/data/content/portfolioDocs";
import "./styles.css";

// Stable defaults prevent the docs-loading effect from restarting on every render.
const EMPTY_DOC_FILTER_LIST = Object.freeze([]);

/**
 * Renders a curated stack of documentation articles with optional jump links
 * and per-article tables of contents.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.block - Markdown docs block configuration payload.
 * @returns {JSX.Element|null} Rendered docs block or `null` when no docs resolve.
 */
export default function MarkdownDocsBlock({ block }) {
  const {
    title,
    intro,
    docSlugs = EMPTY_DOC_FILTER_LIST,
    docCategories = EMPTY_DOC_FILTER_LIST,
    docPathPrefixes = EMPTY_DOC_FILTER_LIST,
    includeReferenceIndexes = false,
    maxDocs = 0,
    selectMode = "all",
    showToc = true,
    showDocJumpList = true,
  } = block;
  const [docs, setDocs] = useState([]);
  const [activeDocSlug, setActiveDocSlug] = useState("");
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);
  const criteria = useMemo(() => {
    const normalizeList = (value) =>
      Array.isArray(value) ? value.map((item) => String(item).toLowerCase()).filter(Boolean) : [];

    return {
      slugs: normalizeList(docSlugs),
      categories: normalizeList(docCategories),
      pathPrefixes: normalizeList(docPathPrefixes),
      includeReferenceIndexes: Boolean(includeReferenceIndexes),
      maxDocs: Number.isFinite(Number(maxDocs)) ? Number(maxDocs) : 0,
    };
  }, [docCategories, docPathPrefixes, docSlugs, includeReferenceIndexes, maxDocs]);

  useEffect(() => {
    let isCancelled = false;

    const loadDocs = async () => {
      setIsLoadingDocs(true);
      try {
        const hasExpandedCriteria =
          criteria.categories.length > 0 || criteria.pathPrefixes.length > 0;
        const loadedDocs = hasExpandedCriteria
          ? await getPortfolioDocsByCriteria(criteria)
          : await getPortfolioDocs(criteria.slugs);

        if (!isCancelled) {
          const normalizedDocs = Array.isArray(loadedDocs) ? loadedDocs : [];
          const nextDocs =
            criteria.maxDocs > 0 ? normalizedDocs.slice(0, criteria.maxDocs) : normalizedDocs;
          setDocs(nextDocs);
          setActiveDocSlug((currentSlug) =>
            nextDocs.some((doc) => doc.slug === currentSlug) ? currentSlug : nextDocs[0]?.slug || ""
          );
        }
      } catch (error) {
        if (!isCancelled) {
          setDocs([]);
        }
        console.error("[MarkdownDocsBlock] Failed to load documentation content.", error);
      } finally {
        if (!isCancelled) {
          setIsLoadingDocs(false);
        }
      }
    };

    loadDocs();

    return () => {
      isCancelled = true;
    };
  }, [criteria]);

  if (!isLoadingDocs && !docs.length) return null;

  const usesSingleDocMode = selectMode === "single" && docs.length > 1;
  const visibleDocs = usesSingleDocMode
    ? docs.filter((doc) => doc.slug === activeDocSlug).slice(0, 1)
    : docs;

  return (
    <section id={block.id} className="markdown-docs-block">
      {(title || intro) && (
        <header className="markdown-docs-block__header">
          {title ? <h2 className="markdown-docs-block__title">{title}</h2> : null}
          {intro ? <p className="markdown-docs-block__intro">{intro}</p> : null}
        </header>
      )}
      {showDocJumpList && docs.length > 1 ? (
        <nav className="markdown-docs-block__jump-list" aria-label="Documents">
          {docs.map((doc) =>
            usesSingleDocMode ? (
              <button
                key={doc.slug}
                type="button"
                aria-pressed={doc.slug === activeDocSlug}
                className="markdown-docs-block__jump-link markdown-docs-block__jump-button interactive-surface"
                onClick={() => setActiveDocSlug(doc.slug)}
              >
                <span>{doc.title}</span>
                {doc.category ? (
                  <small className="markdown-docs-block__jump-meta">{doc.category}</small>
                ) : null}
              </button>
            ) : (
              <a
                key={doc.slug}
                href={`#doc-${doc.slug}`}
                className="markdown-docs-block__jump-link interactive-surface"
              >
                <span>{doc.title}</span>
                {doc.category ? (
                  <small className="markdown-docs-block__jump-meta">{doc.category}</small>
                ) : null}
              </a>
            )
          )}
        </nav>
      ) : null}
      {isLoadingDocs ? (
        <p className="mermaid-deferred-status-text">Loading documentation...</p>
      ) : (
        <div className="markdown-docs-block__stack">
          {visibleDocs.map((doc) => (
            <Panel key={doc.slug} bordered className="markdown-docs-block__panel">
              <MarkdownRenderer
                key={doc.id}
                articleId={`doc-${doc.slug}`}
                title={doc.title}
                intro={doc.summary}
                content={doc.content}
                showToc={showToc}
                headingLevelOffset={1}
              />
            </Panel>
          ))}
        </div>
      )}
    </section>
  );
}
