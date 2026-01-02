import React from "react";
import { ButtonToolbar } from "rsuite";
import Btn from "components/Btn";

/**
 * @typedef {import("../../types/ui.types.js").LinkItem} LinkItem
 */

/**
 * LinksBlock
 * ---------------------------------------------------------------------------
 * Renders a list of links as frosted action buttons.
 *
 * Supports external URLs, in-app navigation, scroll links, downloads,
 * icons, variants, and accessibility metadata.
 *
 * @component
 * @param {Object} props
 * @param {LinkItem[]} props.links - Collection of link definitions to render.
 */
const LinksBlock = ({ links = [] }) => {
  if (!Array.isArray(links) || links.length === 0) {
    return null;
  }

  return (
    <ButtonToolbar className="linklist-block">
      {links.map((link, i) => {
        const badLink =
          typeof link.url !== "string" ||
          (!link.url.startsWith("http") && !link.url.startsWith("#"));

        return (
          <Btn
            key={i}
            className="link-list-item"
            disabled={badLink}
            download={link.download}
            href={link.url}
            hrefLocal={link.local}
            icon={link.icon || "link"}
            rel={link.rel}
            size={link.size || "md"}
            target={link.target}
            text={link.title || "Open Link"}
            tooltip={badLink ? "Unstable link" : link.tooltip}
            variant={link.variant || "primary"}
            ariaLabel={link.ariaLabel}
          />
        );
      })}
    </ButtonToolbar>
  );
};

export default LinksBlock;
