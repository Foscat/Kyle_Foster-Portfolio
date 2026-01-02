import React from "react";
import { Panel, Divider, Row, Col, FlexboxGrid } from "rsuite";
import FrostedIcon from "components/FrostedIcon";
import "./styles.css";

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
 * @param {Object} props
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
    <Row
      content=""
      className={`info-section ${className}`}
      as="section"
    >
      <Col
        xs={24}
        sm={24}
        md={23}
        lg={24}
      >
        <Panel
          id={id}
          bordered
          className="info-section frosted"
        >
          <FlexboxGrid.Item colspan={2}>
            {icon && <FrostedIcon icon={icon} />}
          </FlexboxGrid.Item>
          {/* TITLE AREA */}
          <FlexboxGrid.Item colspan={22}>
            {title && <h2 className="info-title">{title}</h2>}
            {subtitle && <h4 className="info-subtitle">{subtitle}</h4>}
          </FlexboxGrid.Item>

          {/* CONTENT AREA */}
          <div className="info-content">{children}</div>
        </Panel>
      </Col>
    </Row>
  );
};

export default InfoSection;
