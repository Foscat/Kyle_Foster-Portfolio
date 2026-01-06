
/**
 * LinksBlock
 * ---------------------------------------------------------------------------
 * Renders a list of link buttons using the shared UI type system.
 *
 * This component relies on the global `LinkItem` typedef defined in
 * `src/types/ui.types.js`. Do NOT redeclare or import the type here.
 *
 * @component
 * @param {object} props
 * @param {LinkItem[]} props.links - List of links to render.
 * @returns {JSX.Element | null}
 *
 * @example
 * ```jsx
 * <LinksBlock
 *   links={[
 *     { title: "GitHub", url: "https://github.com", icon: "github" }
 *   ]}
 * />
 * ```
 */
const LinksBlock = ({ links = [] }) => {
  if (!links.length) return null;

  return (
    <ButtonToolbar className="linklist-block">
      {links.map((link, i) => {
        const isExternal = /^https?:\/\//.test(link.url);

        return (
          <Btn
            key={i}
            className="link-list-item"
            href={link.url}
            hrefLocal={link.local}
            icon={link.icon || "link"}
            size={link.size || "sm"}
            variant={link.variant || "primary"}
            target={isExternal ? link.target : undefined}
            rel={isExternal ? link.rel : undefined}
            download={link.download}
            text={link.title || "Open Link"}
            tooltip={link.tooltip}
            aria-label={link.ariaLabel}
          />
        );
      })}
    </ButtonToolbar>
  );
};

export default LinksBlock;
