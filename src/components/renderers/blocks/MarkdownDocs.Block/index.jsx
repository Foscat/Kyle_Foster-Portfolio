import { Panel } from "rsuite";
import MarkdownRenderer from "../../MarkdownRenderer";
import { getPortfolioDocs } from "../../../../assets/data/content/portfolioDocs";
import "./styles.css";

export default function MarkdownDocsBlock({ block }) {
  const { title, intro, docSlugs = [], showToc = true, showDocJumpList = true } = block;

  const docs = getPortfolioDocs(docSlugs);

  if (!docs.length) return null;

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
            />
          </Panel>
        ))}
      </div>
    </section>
  );
}
