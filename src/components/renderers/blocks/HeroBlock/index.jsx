/**
 * @file src\components\renderers\blocks\HeroBlock\index.jsx
 * @description src\components\renderers\blocks\HeroBlock\index module.
 * @module src\components\renderers\blocks\HeroBlock\index
 */

import { FlexboxGrid, Panel } from "rsuite";
import "./styles.css";

/**
 * @file index.jsx
 * @fileoverview Standardized page-level header component used to introduce
 * pages and major sections with consistent hierarchy and styling.
 * @module components/PageHeader
 */

const TECH_LABELS = {
  FRONTEND: "front",
  BACKEND: "back",
  TOOL: "tool",
};
const TECH_COLORS = {
  [TECH_LABELS.FRONTEND]: "rgba(var(--primary-lighter-rgb), 0.95)",
  [TECH_LABELS.BACKEND]: "rgba(var(--accent-rgb), 0.95)",
  [TECH_LABELS.TOOL]: "rgba(var(--success-dark-rgb), 0.95)",
};

/**
 * @private
 * @function renderTechUsedString
 * ---------------------------------------------
 * Renders a list of technologies used in a project or page.
 * Each technology is displayed as a colored label.
 *
 * @param {Array<Object>} tech
 * @returns {JSX.Element}
 *
 * @example
 * ```js
 * const tech = [
 *   { label: "React.js", type: "front" },
 *   { label: "Node.js", type: "back" },
 *   { label: "Docker", type: "tool" },
 * ];
 * renderTechUsedString(tech);
 * // Output: A div containing three colored labels: "React.js" (blue), "Node.js" (red), "Docker" (green)
 * ```
 */
const renderTechUsedString = (tech) => {
  return (
    <div className="tech-used">
      {tech.map((item, index) => (
        <span
          key={index}
          className="tech-item"
          style={{ backgroundColor: TECH_COLORS[item.type] || "var(--text-secondary)" }}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
};

/**
 * @public
 * @component
 * @name HeroBlock
 * @description A reusable page header component designed to provide a consistent and visually appealing introduction to pages and major sections. It combines a prominent title with optional supporting information such as job titles, timespans, descriptive subtitles, and associated technologies.
 *
 * @summary
 * The HeroBlock component serves as a standardized header section that can be used across different pages and sections of the portfolio. It is designed to be visually striking while maintaining readability and accessibility.
 *
 * Features:
 * - Frosted RSuite Panel container
 * - Primary title (required)
 * - Optional job title and timespan row
 * - Optional descriptive subtitle
 * - Optional technology list
 * - Subtle entrance animation via CSS
 * - Fully responsive layout
 *
 * Accessibility:
 * - Uses `role="banner"` to denote page-level landmark
 * - Content is readable and navigable via assistive technologies
 * - Color contrast is maintained for readability
 *
 * @param {Object} props - Component props.
 *
 * @param {string} props.title
 *   Main page or section title.
 *
 * @param {string} [props.jobTitle]
 *   Optional role or position title.
 *
 * @param {string} [props.timespan]
 *   Optional date range or duration string.
 *
 * @param {string} [props.subTitle]
 *   Supporting descriptive text rendered beneath the title.
 *
 * @param {Array<Object>} [props.tech]
 *   List of technologies associated with the page or project.
 *
 * @param {string} [props.className]
 *   Optional additional CSS class names.
 *
 * @returns {JSX.Element} Rendered page header.
 *
 * @example
 * ```js
 * <HeroBlock
 *   title="My Portfolio"
 *   jobTitle="Software Engineer"
 *   timespan="2020 - Present"
 *   subTitle="Welcome to my personal portfolio showcasing my projects and experience."
 *   tech={[
 *       { label: "React", type: "react" },
 *       { label: "JavaScript", type: "javascript" },
 *       { label: "CSS", type: "css" }
 *     ]}
 * />
 * ```
 */
const HeroBlock = ({
  title,
  jobTitle = "",
  timespan = "",
  subTitle = "",
  tech = [],
  className = "",
}) => {
  return (
    <Panel className={`page-header blue-tile ${className}`} role="banner">
      <FlexboxGrid justify="center" align="middle" className="page-header-inner">
        <FlexboxGrid.Item colspan={24} className="text-center">
          <h1 className="page-header-title">{title}</h1>

          {(jobTitle || timespan) && (
            <h2 className="page-header-subtitle">
              {[jobTitle, timespan].filter(Boolean).join(" • ")}
            </h2>
          )}

          {subTitle && <p className="page-header-description">{subTitle}</p>}
          {tech.length > 0 && renderTechUsedString(tech)}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
};

export default HeroBlock;
