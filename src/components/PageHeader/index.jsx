import { FlexboxGrid, Panel } from "rsuite";
import "./styles.css";

/**
 * PageHeader Component
 * ------------------------------------------------------------
 * Standardized page-level header used across the portfolio.
 * Designed to introduce a section or page with clear hierarchy
 * and a frosted-glass presentation.
 *
 * Features:
 * - Frosted glass container (RSuite Panel)
 * - Primary title (required)
 * - Optional job title + timespan row
 * - Optional descriptive subtitle
 * - Subtle entrance animation (fade-in)
 * - Fully responsive and layout-safe
 *
 * @component
 * @param {object} props
 * @param {string} props.title - Main page title.
 * @param {string} [props.jobTitle] - Role or position title.
 * @param {string} [props.timespan] - Date range or duration.
 * @param {string} [props.subTitle] - Supporting descriptive text.
 * @param {string[]} [props.tech] - List of technologies used.
 * @param {string} [props.className] - Optional additional CSS classes.
 * @returns {JSX.Element}
 */
const PageHeader = ({
  title,
  jobTitle = "",
  timespan = "",
  subTitle = "",
  tech = [],
  className = "",
}) => {
  /**
   * Formats an array of technology names into a human-readable string.
   *
   * Example:
   *   ["React", "Node", "MongoDB"]
   *   → "Tech Used: React, Node, MongoDB"
   *
   * @param {string[]} [techArray=[]] - List of technologies used.
   * @returns {React.Component} A formatted display string or an empty string if no technologies are provided.
   */
  const renderTechUsedString = (techArray = [{ label: "", type: "" }]) => {
    // Guard against invalid or empty input
    if (!Array.isArray(techArray) || techArray.length === 0) {
      return "";
    }
    console.log({ techArray });

    // Join technologies into a comma-separated list
    const techList = techArray.map((tech, i) => {
      return (
        <span key={tech.label + i} className={`${tech.type}`}>
          {tech.label}
          <i>, </i>
        </span>
      );
    }); // Remove trailing comma if present
    return <p className="tech-used">Tech Used: {techList}</p>;
  };

  return (
    <Panel bordered className={`page-header blue-tile fade-in ${className}`} role="banner" expanded>
      <FlexboxGrid justify="center" align="middle" className="page-header-inner">
        <FlexboxGrid.Item colspan={24} className="text-center">
          {/* Primary Title */}
          <h1 className="page-header-title">{title}</h1>

          {/* Job Title + Timespan */}
          {(jobTitle || timespan) && (
            <h2 className="page-header-subtitle">
              {[jobTitle, timespan].filter(Boolean).join(" • ")}
            </h2>
          )}

          {/* Tech Used */}
          {tech.length > 0 && renderTechUsedString(tech)}

          {/* Supporting Description */}
          {subTitle && <p className="page-header-description">{subTitle}</p>}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
};

export default PageHeader;
