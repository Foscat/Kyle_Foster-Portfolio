import React from "react";
import { Panel } from "rsuite";
import FrostedIcon from "components/FrostedIcon";
import "./styles.css";
import { Size } from "types/ui.types";

/**
 * InfoSection Component
 * ------------------------------------------------------------
 * A responsive frosted-glass section wrapper used across the
 * portfolio to standardize section layout, spacing, and visuals.
 *
 * Features:
 * - Optional title & subtitle
 * - Optional Divider under title
 * - Frosted glass Panel for consistent UI
 * - Fully responsive using RSuite Grid system
 * - Accepts any children content
 *
 * @component
 * @param {object} props
 * @param {string} [props.title] - Title displayed at the top of the section.
 * @param {string} [props.subtitle] - Optional subtitle under the main title.
 * @param {boolean} [props.dividerAfter=false] - Whether to show a divider.
 * @param {string} [props.icon] - Icon to show at top of information section
 * @param {string} [props.className] - Extra CSS classes.
 * @param {string} [props.id] - Id of section for section scrolling
 * @param {React.ReactNode} props.children - The content inside the section.
 * @returns {JSX.Element} A polished, reusable content section.
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
            {icon && <FrostedIcon noBG size={Size.XL} icon={icon} />}
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
