/**
 * @file src\components\renderers\blocks\LinksBlock\index.jsx
 * @description src\components\renderers\blocks\LinksBlock\index module.
 * @module src\components\renderers\blocks\LinksBlock\index
 */

import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Panel } from "rsuite";
import { Btn } from "components/ui";
import ResumePreviewTrigger from "components/features/ResumePreview/ResumePreviewTrigger";
import resumeData from "assets/data/content/resumeData.js";
import { resolveResumePdfHref } from "assets/data/resume/pdfAssets.js";
import { useTheme } from "assets/context/ThemeContext.jsx";
import { Size, Variant } from "types/ui.types";
import "./styles.css";

/**
 * @file LinksBlock.jsx
 * @fileoverview Renders a list of link buttons inside a collapsible frosted panel.This component is designed to be used as a block renderer within the section
 * content system. It takes a list of link definitions and renders them as styled buttons
 * with appropriate attributes for external links, downloads, and accessibility.
 * @module components/renderers/blocks/LinksBlock
 */

/**
 * @public
 * @component
 * @name LinksBlock
 * @description Renders a list of link buttons using the shared UI type system.
 * This component is designed to be used as a block renderer within the section content system. It takes a list of link definitions and renders them as styled buttons with appropriate attributes for external links, downloads, and accessibility.
 * This component relies on the global `LinkItem` typedef defined in
 * `src/types/ui.types.js`. That typedef is treated as a shared contract
 * and should not be redeclared locally.
 *
 * Rendering notes:
 * - Returns `null` when no links are provided
 * - Automatically detects external URLs to apply target and rel attributes
 * - Delegates rendering and accessibility concerns to the shared `Btn` component
 *
 * @param {object} props - Component props.
 * @param {LinkItem[]} props.items - List of link definitions to render.
 * @returns {JSX.Element | null} Rendered link list or null if empty.
 *
 * @example
 * ```js
 * <LinksBlock
 *   items={[
 *     { title: "GitHub", url: "https://github.com", icon: faGithub },
 *     { title: "Resume", url: "/resume.pdf", download: true, icon: faFile },
 *   ]}
 * />
 * ```
 */
const LinksBlock = ({ items = [] }) => {
  const { theme, palette } = useTheme();
  const resumePdfHref = resolveResumePdfHref(theme);

  // Guard against empty link lists
  // console.log("Rendering LinksBlock with items:", items);
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <Panel collapsible defaultExpanded className="block mt-2">
      <div className="links-block-list">
        {items.map((link, i) => {
          if (link?.resumePreview) {
            const safeTheme = typeof theme === "string" ? theme : "auto";
            const safePalette = typeof palette === "string" ? palette : "ocean";
            const downloadName = `Kyle-Foster-Senior-Developer-Resume-${safeTheme}-${safePalette}.pdf`;

            return (
              <ResumePreviewTrigger
                key={link.id || i}
                buttonText={link.title || "View Resume"}
                title={link.previewTitle || "Kyle Foster - Senior Developer Resume"}
                subtitle={
                  link.previewSubtitle ||
                  "A compact resume preview with PDF-style spacing and download options."
                }
                resume={resumeData}
                pdfHref={resumePdfHref}
                downloadName={downloadName}
                buttonClassName="links-block-item"
                icon={link.icon}
                tooltip={link.tooltip}
                ariaLabel={link.ariaLabel}
                size={link.size || Size.MD}
                variant={link.variant || Variant.SECONDARY}
              />
            );
          }

          const resolvedUrl =
            theme === "light" ? link.urlLight || link.url : link.urlDark || link.url;

          // Determine whether the link should be treated as external
          const isExternal = /^https?:\/\//.test(resolvedUrl);
          const isDownload = link?.download;
          return (
            <Btn
              key={i}
              className="links-block-item"
              href={resolvedUrl}
              hrefLocal={link.local}
              icon={link.icon || faLink}
              size={link.size || Size.MD}
              variant={link.variant || Variant.SECONDARY}
              target={isExternal ? link.target : undefined}
              rel={isExternal ? link.rel : undefined}
              download={isDownload ? link.download : undefined}
              text={link.title || "Open Link"}
              tooltip={link.tooltip}
              ariaLabel={link.ariaLabel}
            />
          );
        })}
      </div>
    </Panel>
  );
};

export default LinksBlock;
