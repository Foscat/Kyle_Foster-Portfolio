/**
 * @file src\components\renderers\blocks\MarkdownDocs.Block\index.jsx
 * @description src\components\renderers\blocks\MarkdownDocs.Block\index module.
 * @module src\components\renderers\blocks\MarkdownDocs.Block\index
 */

import { useEffect, useMemo, useState } from "react";
import { Panel } from "rsuite";
import MarkdownRenderer from "../../MarkdownRenderer";
import { getPortfolioDocs } from "../../../../assets/data/content/portfolioDocs";
import "./styles.css";

/**
 * Renders a curated stack of documentation articles with optional jump links
 * and per-article tables of contents.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.block - Markdown docs block configuration payload.
 * @returns {JSX.Element|null} Rendered docs block or `null` when no docs resolve.
 */
export default function MarkdownDocsBlock({ block }) {
  const { title, intro, docSlugs = [], showToc = true, showDocJumpList = true } = block;
  const [docs, setDocs] = useState([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);
  const slugKey = useMemo(
    () =>
      Array.isArray(docSlugs)
        ? docSlugs
            .map((slug) => String(slug).toLowerCase())
            .sort((a, b) => a.localeCompare(b))
            .join("|")
        : "",
    [docSlugs]
  );

  useEffect(() => {
    let isCancelled = false;

    const requestedDocSlugs = slugKey ? slugKey.split("|") : [];

    const loadDocs = async () => {
      setIsLoadingDocs(true);
      try {
        const loadedDocs = await getPortfolioDocs(requestedDocSlugs);
        if (!isCancelled) {
          setDocs(Array.isArray(loadedDocs) ? loadedDocs : []);
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
  }, [slugKey]);

  if (!isLoadingDocs && !docs.length) return null;

  return (
    <section className="markdown-docs-block">
      {(title || intro) && (
        <header className="markdown-docs-block__header">
          {title ? <h2 className="markdown-docs-block__title">{title}</h2> : null}
          {intro ? <p className="markdown-docs-block__intro">{intro}</p> : null}
        </header>
      )}
      {showDocJumpList && docs.length > 1 ? (
        <nav className="markdown-docs-block__jump-list" aria-label="Documents">
          {docs.map((doc) => (
            <a
              key={doc.slug}
              href={`#doc-${doc.slug}`}
              className="markdown-docs-block__jump-link interactive-surface"
            >
              <span key={doc.id}>{doc.title}</span>
              {doc.category ? (
                <small key={doc.id} className="markdown-docs-block__jump-meta">
                  {doc.category}
                </small>
              ) : null}
            </a>
          ))}
        </nav>
      ) : null}
      {isLoadingDocs ? (
        <p className="mermaid-deferred-status-text">Loading documentation...</p>
      ) : (
        <div className="markdown-docs-block__stack">
          {docs.map((doc) => (
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
