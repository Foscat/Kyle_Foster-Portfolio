import { FlexboxGrid, Panel } from "rsuite";
import "./styles.css";

/**
 * @file index.jsx
 * @description Standardized page-level header component used to introduce
 * pages and major sections with consistent hierarchy and styling.
 * @module components/PageHeader
 */

/**
 * TechItem
 * ---------------------------------------------------------------------------
 * Describes a technology badge rendered in the "Tech Used" section.
 *
 * @typedef {Object} TechItem
 * @property {string} label - Display name of the technology.
 * @property {string} type - CSS class used to style the technology label.
 * @property {string} [id] - Optional unique identifier.
 */

/**
 * PageHeader
 * ---------------------------------------------------------------------------
 * Standardized page-level header component designed to introduce a page or
 * major section with clear hierarchy and frosted-glass presentation.
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
 *
 * @public
 * @component
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
 * @param {TechItem[]} [props.tech]
 *   List of technologies associated with the page or project.
 *
 * @param {string} [props.className]
 *   Optional additional CSS class names.
 *
 * @returns {JSX.Element} Rendered page header.
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
   * Formats a list of technology items into a human-readable display.
   *
   * Behavior:
   * - Returns an empty string when no valid technologies are provided
   * - Renders each technology with its associated style class
   *
   * @param {TechItem[]} [techArray=[]] - List of technologies used.
   * @returns {JSX.Element|string} Rendered tech list or empty string.
   */
  const renderTechUsedString = (techArray = [{ label: "", type: "" }]) => {
    if (!Array.isArray(techArray) || techArray.length === 0) {
      return "";
    }

    console.log({ techArray });

    const techList = techArray.map((tech, i) => {
      return (
        <span key={tech.label + i} className={`${tech.type}`}>
          {tech.label}
          {i < techArray.length - 1 ? <em key={tech.id}>, </em> : ""}
        </span>
      );
    });

    return <p className="tech-used">Tech Used: {techList}</p>;
  };

  return (
    <Panel bordered className={`page-header blue-tile fade-in ${className}`} role="banner" expanded>
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

export default PageHeader;
