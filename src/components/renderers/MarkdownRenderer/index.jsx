import React, { Children, useEffect, useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Prism from "prismjs";
import "./style.css";

function slugify(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`"'()[\]{}:!?.,/\\]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function flattenText(children) {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") return child;
      if (typeof child === "number") return String(child);
      if (React.isValidElement(child)) return flattenText(child.props.children);
      return "";
    })
    .join("");
}

function extractHeadings(markdown = "", maxDepth = 3) {
  const lines = markdown.split("\n");
  const counts = new Map();
  const headings = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    if (level > maxDepth) continue;

    const rawText = match[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`~]/g, "")
      .trim();

    const base = slugify(rawText);
    const seen = counts.get(base) || 0;
    counts.set(base, seen + 1);

    headings.push({
      level,
      text: rawText,
      id: seen ? `${base}-${seen + 1}` : base,
    });
  }

  return headings;
}

export default function MarkdownRenderer({
  title,
  content = "",
  intro,
  showToc = true,
  maxTocDepth = 3,
  className = "",
  articleId,
}) {
  const rootRef = useRef(null);

  const headings = useMemo(() => extractHeadings(content, maxTocDepth), [content, maxTocDepth]);

  useEffect(() => {
    if (!rootRef.current) return;
    Prism.highlightAllUnder(rootRef.current);
  }, [content]);

  const components = useMemo(() => {
    const counts = new Map();

    const makeHeading = (Tag, level) =>
      function HeadingComponent({ children }) {
        const text = flattenText(children);
        const base = slugify(text);
        const seen = counts.get(base) || 0;
        counts.set(base, seen + 1);
        const id = seen ? `${base}-${seen + 1}` : base;

        return (
          <Tag id={id} className={`markdown-renderer__h${level}`}>
            {children}
          </Tag>
        );
      };

    return {
      h1: makeHeading("h1", 1),
      h2: makeHeading("h2", 2),
      h3: makeHeading("h3", 3),
      h4: makeHeading("h4", 4),
      h5: makeHeading("h5", 5),
      h6: makeHeading("h6", 6),

      p({ children }) {
        return <p className="markdown-renderer__p">{children}</p>;
      },

      a({ href, children }) {
        const isExternal = typeof href === "string" && /^https?:\/\//.test(href);
        return (
          <a
            href={href}
            className="markdown-renderer__link"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
          >
            {children}
          </a>
        );
      },

      ul({ children }) {
        return <ul className="markdown-renderer__ul">{children}</ul>;
      },

      ol({ children }) {
        return <ol className="markdown-renderer__ol">{children}</ol>;
      },

      li({ children }) {
        return <li className="markdown-renderer__li">{children}</li>;
      },

      dl({ children }) {
        return <dl className="markdown-renderer__dl">{children}</dl>;
      },

      dt({ children }) {
        return <dt className="markdown-renderer__dt">{children}</dt>;
      },

      dd({ children }) {
        return <dd className="markdown-renderer__dd">{children}</dd>;
      },

      blockquote({ children }) {
        return <blockquote className="markdown-renderer__blockquote">{children}</blockquote>;
      },

      hr() {
        return <hr className="markdown-renderer__hr" />;
      },

      table({ children }) {
        return (
          <div className="markdown-renderer__table-wrap">
            <table className="markdown-renderer__table">{children}</table>
          </div>
        );
      },

      th({ children }) {
        return <th className="markdown-renderer__th">{children}</th>;
      },

      td({ children }) {
        return <td className="markdown-renderer__td">{children}</td>;
      },

      pre({ children }) {
        return <pre className="markdown-renderer__pre">{children}</pre>;
      },

      code({ inline, className, children, ...props }) {
        const code = String(children).replace(/\n$/, "");
        const language = className?.replace("language-", "") || "";

        if (inline) {
          return (
            <code className="markdown-renderer__inline-code" {...props}>
              {code}
            </code>
          );
        }

        return (
          <code className={className || "language-text"} {...props}>
            {code}
            {language ? null : ""}
          </code>
        );
      },
    };
  }, []);

  return (
    <article id={articleId} ref={rootRef} className={`markdown-renderer ${className}`.trim()}>
      {(title || intro) && (
        <header className="markdown-renderer__header">
          {title ? <h2 className="markdown-renderer__title">{title}</h2> : null}
          {intro ? <p className="markdown-renderer__intro">{intro}</p> : null}
        </header>
      )}
      <div
        className={`markdown-renderer__layout ${
          showToc && headings.length ? "markdown-renderer__layout--toc" : ""
        }`}
      >
        {showToc && headings.length ? (
          <aside className="markdown-renderer__toc" aria-label="Table of contents">
            <p className="markdown-renderer__toc-label">On this document</p>
            <nav>
              <ul className="markdown-renderer__toc-list">
                {headings.map((heading) => (
                  <li
                    key={heading.id}
                    className={`markdown-renderer__toc-item markdown-renderer__toc-item--h${heading.level}`}
                  >
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className="markdown-renderer__toc-link interactive-surface"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        ) : null}

        <div className="markdown-renderer__prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={components}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
