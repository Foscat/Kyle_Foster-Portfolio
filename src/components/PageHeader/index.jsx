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
 * @param {string} [props.className] - Optional additional CSS classes.
 * @returns {JSX.Element}
 */
const PageHeader = ({
  title,
  jobTitle = "",
  timespan = "",
  subTitle = "",
  className = "",
}) => {
  return (
    <Panel
      bordered
      className={`page-header glass-card fade-in ${className}`}
      role="banner"
      expanded
    >
      <FlexboxGrid
        justify="center"
        align="middle"
        className="page-header-inner"
      >
        <FlexboxGrid.Item
          colspan={24}
          className="text-center"
        >
          {/* Primary Title */}
          <h1 className="page-header-title">{title}</h1>

          {/* Job Title + Timespan */}
          {(jobTitle || timespan) && (
            <h2 className="page-header-subtitle">
              {[jobTitle, timespan].filter(Boolean).join(" • ")}
            </h2>
          )}

          {/* Supporting Description */}
          {subTitle && <p className="page-header-description">{subTitle}</p>}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
};

export default PageHeader;
