import InfoSection from "components/layout/InfoSection";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { Btn, ClickableImg } from "..";

/**
 * @file index.jsx
 * @fileoverview Reusable frosted-glass project display card used to present
 * portfolio projects with images, repository links, and live URLs.
 * @module components/ProjectCard
 */

/**
 * @typedef {Object} ProjectImage
 * @property {string} src - Image source URL.
 * @property {string} alt - Alt text for accessibility.
 * @property {string} [title] - Optional image title.
 * @property {string} [caption] - Optional caption displayed with the image.
 */

/**
 * @public
 * @component
 * @name ProjectCard
 * @description A reusable card component for showcasing portfolio projects, featuring a frosted-glass design consistent with the UI theme. Each card can display a project title, description, a grid of images, and action buttons linking to the project's GitHub repository and live URL. The component is designed to be flexible and visually engaging, making it ideal for presenting projects in a portfolio context.
 * Features:
 * - Standardized layout via `InfoSection`
 * - Optional responsive image gallery using `ClickableImg`
 * - Optional GitHub repository link
 * - Optional live project URL
 * - Pure-CSS animation and layout styling
 *
 * Usage notes:
 * - Images are rendered only when provided
 * - Action buttons are conditionally rendered based on link availability
 * - Designed to integrate cleanly with section-based navigation
 *
 * @param {Object} props - Component props.
 *
 * @param {string} props.title
 *   Project title.
 *
 * @param {string} props.description
 *   Main project description text.
 *
 * @param {ProjectImage[]} [props.images=[]]
 *   Optional list of project images to render.
 *
 * @param {string} [props.repo]
 *   Optional GitHub repository URL.
 *
 * @param {string} [props.url]
 *   Optional live project URL.
 *
 * @param {*} [props.icon=faCode]
 *   Icon displayed alongside the project title.
 *
 * @param {string} [props.id]
 *   Optional DOM id used for section scrolling or deep linking.
 *
 * @returns {JSX.Element} Rendered project card.
 */
const ProjectCard = ({
  title,
  description,
  images = [],
  repo = "",
  url = "",
  icon = faCode,
  id = "",
}) => {
  return (
    <InfoSection className="fadeIn" title={title} subtitle={description} icon={icon} id={id}>
      {/* Images */}
      {images.length > 0 && (
        <div className="projectCard-imageGrid">
          {images.map((img, index) => (
            <ClickableImg
              src={img.src}
              alt={img.alt}
              title={img.title}
              caption={img.caption}
              className="projectCard-imageBox glass-inner"
              key={index}
            />
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="link-box">
        {repo && (
          <Btn
            variant="ghost"
            className="glass-button"
            text="See the Code"
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="View source code on GitHub"
            tooltip="View source code on GitHub"
          />
        )}

        {url && (
          <Btn
            variant="primary"
            className="glass-button"
            text="View Project"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="View live project"
            tooltip="View live project"
          />
        )}
      </div>
    </InfoSection>
  );
};

export default ProjectCard;
