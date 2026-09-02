/**
 * @file src\components\layout\InfoSection\index.jsx
 * @description src\components\layout\InfoSection\index module.
 * @module src\components\layout\InfoSection\index
 */

import React from "react";
import Surface from "components/ui/Surface";
import FrostedIcon from "components/ui/FrostedIcon";
import "./styles.css";
import { Size } from "types/ui.types";

/**
 * @file index.jsx
 * @description Reusable frosted-glass section wrapper used to standardize
 * layout, spacing, and visual hierarchy across the portfolio.
 * @module components/layout/InfoSection
 */

/**
 * @public
 * @component InfoSection
 * ---------------------------------------------------------------------------
 * @description A responsive, collapsible frosted-glass section wrapper used throughout
 * the application to enforce consistent structure and visual language.
 *
 * @summary
 * Core features:
 * - Optional title and subtitle
 * - Optional icon rendered alongside the title
 * - Collapsible frosted panel container
 * - `layout-style-css` section primitive for switchable spatial rhythm
 * - Semantic `<section>` wrapper
 * - Arbitrary child content
 *
 * Design notes:
 * - Uses the portfolio's native `Surface` disclosure primitive
 * - Applies shared frosted and tile styles via CSS
 * - Intended for use with section-based navigation and scroll targeting
 *
 * @param {Object} props - Component props.
 *
 * @param {string} [props.title]
 *   Title displayed at the top of the section.
 *
 * @param {string} [props.subtitle]
 *   Optional subtitle rendered beneath the title.
 *
 * @param {*} [props.icon]
 *   Optional icon rendered next to the section title.
 *
 * @param {string} [props.className]
 *   Additional CSS class names applied to the wrapper.
 *
 * @param {string} [props.id]
 *   Optional DOM id used for section scrolling and deep linking.
 *
 * @param {React.ReactNode} props.children
 *   Content rendered inside the section body.
 *
 * @returns {JSX.Element} Rendered frosted content section.
 */
const InfoSection = ({
  title = "",
  subtitle = "",
  sectionTag = "",
  icon = null,
  className = "",
  id = "",
  children,
}) => {
  const hasHeader = Boolean(title || subtitle || sectionTag || icon);

  return (
    <Surface
      collapsible={hasHeader}
      defaultExpanded
      id={id}
      header={
        hasHeader ? (
          <div className="info-header">
            {sectionTag ? <span className="info-section-tag">{sectionTag}</span> : null}
            <div className="title-wrapper">
              {icon && <FrostedIcon className="infoSect-icon" noBG size={Size.XL} icon={icon} />}
              {title && <span className="info-title">{title}</span>}
            </div>
            {subtitle && <p className="info-subtitle">{subtitle}</p>}
          </div>
        ) : null
      }
      className={`info-section glass-card ly-section ly-surface ${className}`.trim()}
      as="section"
    >
      {/* The panel body remains available when a section intentionally has no heading. */}
      <div className="info-content ly-stack ly-gap-4">{children}</div>
    </Surface>
  );
};

export default InfoSection;
