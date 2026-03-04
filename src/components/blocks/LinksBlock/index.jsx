import { faLink } from "@fortawesome/free-solid-svg-icons";
import Btn from "components/Btn";
import { ButtonToolbar, Panel } from "rsuite";
import { Size, Variant } from "types/ui.types";

/**
 * @file LinksBlock.jsx
 * @description Renders a list of link buttons inside a collapsible frosted panel.
 * @module components/blocks/LinksBlock
 */

/**
 * LinksBlock
 * ---------------------------------------------------------------------------
 * Renders a list of link buttons using the shared UI type system.
 *
 * This component relies on the global `LinkItem` typedef defined in
 * `src/types/ui.types.js`. That typedef is treated as a shared contract
 * and should not be redeclared locally.
 *
 * Rendering notes:
 * - Returns `null` when no links are provided
 * - Automatically detects external URLs to apply target and rel attributes
 * - Delegates rendering and accessibility concerns to the shared `Btn` component
 *
 * @public
 * @component
 * @param {object} props - Component props.
 * @param {LinkItem[]} props.links - List of link definitions to render.
 * @returns {JSX.Element | null} Rendered link list or null if empty.
 *
 * @example
 * ```jsx
 * <LinksBlock
 *   links={[
 *     { title: "GitHub", url: "https://github.com", icon: faGithub },
 *     { title: "Resume", url: "/resume.pdf", download: true, icon: faFile },
 *   ]}
 * />
 * ```
 */
const LinksBlock = ({ links = [] }) => {
  // Guard against empty link lists
  console.log("Rendering LinksBlock with links:", links);
  if (!links.length) return null;

  return (
    <Panel collapsible defaultExpanded className="block mt-2">
      <div className="links-block-list flex-row flex-sa">
        {links.map((link, i) => {
          // Determine whether the link should be treated as external
          const isExternal = /^https?:\/\//.test(link.url);
          const isDownload = link.download;
          return (
            <Btn
              key={i}
              className="links-block-item"
              href={link.url}
              hrefLocal={link.local}
              icon={link.icon || faLink}
              size={link.size || Size.MD}
              variant={link.variant || Variant.SECONDARY}
              target={isExternal ? link.target : undefined}
              rel={isExternal ? link.rel : undefined}
              download={isDownload ? link.download : undefined}
              text={link.title || "Open Link"}
              tooltip={link.tooltip}
              aria-label={link.ariaLabel}
              // noBG
            />
          );
        })}
      </div>
    </Panel>
  );
};

export default LinksBlock;
