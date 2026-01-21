import InfoSection from "components/InfoSection";
import "./styles.css";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import ClickableImg from "components/ClickableImg";
import Btn from "components/Btn";

/**
 * ProjectCard Component
 * A reusable frosted-glass project display card with optional images,
 * repo links, and live project URLs. Responsive and animated using pure CSS for portfolio use.
 *
 * @component
 * @param {object} props
 * @param {string} props.title                 - Project title
 * @param {string} props.description           - Main description text
 * @param {Array<object>}  props.images        - Array of image objects {src, alt, title, description}
 * @param {string | undefined} [props.repo]    - GitHub repo link
 * @param {string | undefined} [props.url]     - Live project link
 *
 * @returns {JSX.Element}
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
