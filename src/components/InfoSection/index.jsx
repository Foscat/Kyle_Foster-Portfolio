import React from "react";
import { Panel } from "rsuite";
import FrostedIcon from "components/FrostedIcon";
import "./styles.css";
import { Size, Variant } from "types/ui.types";

/**
 * @file index.jsx
 * @description Reusable frosted-glass section wrapper used to standardize
 * layout, spacing, and visual hierarchy across the portfolio.
 * @module components/InfoSection
 */

/**
 * InfoSection
 * ---------------------------------------------------------------------------
 * A responsive, collapsible frosted-glass section wrapper used throughout
 * the application to enforce consistent structure and visual language.
 *
 * Core features:
 * - Optional title and subtitle
 * - Optional icon rendered alongside the title
 * - Collapsible frosted panel container
 * - Semantic `<section>` wrapper
 * - Arbitrary child content
 *
 * Design notes:
 * - Uses RSuite `Panel` for consistent layout behavior
 * - Applies shared frosted and tile styles via CSS
 * - Intended for use with section-based navigation and scroll targeting
 *
 * @public
 * @component
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
  icon = null,
  className = "",
  id = "",
  children,
}) => {
  return (
    <Panel
      collapsible
      defaultExpanded
      id={id}
      header={
        <div className="info-header">
          <div className="title-wrapper">
            {icon && <FrostedIcon className="infoSect-icon" noBG size={Size.XL} icon={icon} />}
            {title && <h2 className="info-title">{title}</h2>}
          </div>
          {subtitle && <h4 className="info-subtitle">{subtitle}</h4>}
        </div>
      }
      className={`info-section frosted blue-tile ${className}`}
      as="section"
    >
      {/* CONTENT AREA */}
      <div className="info-content">{children}</div>
    </Panel>
  );
};

export default InfoSection;
