import clsx from "clsx";
import FrostedIcon from "components/FrostedIcon";
import "./style.css";
import RichText from "components/RichText";
import { Variant } from "types/ui.types";

/**
 * A grid layout component for displaying multiple InsightCards. It uses CSS Grid to create a responsive layout based on the specified number of columns.
 * @param {number} columns - The number of columns in the grid. Default is 3.
 * @param {React.ReactNode} children - The content to be displayed within the grid. Each child will be treated as a separate card.
 * @returns
 */
export function CardGrid({ columns = 3, children }) {
  return (
    <div
      className="card-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * A card component for displaying insights with a header and body. The header can include an optional FontAwesome icon, title, and subtitle. The body can contain any content passed as children.
 *
 * @param {string} title - The title of the insight card.
 * @param {object} [icon] - The FontAwesome icon to display in the card header.
 * @param {string} [subtitle] - The subtitle of the insight card.
 * @param {Variant} [variant] - The accent color for the card (default is "primary").
 * @param {RichTextNode[]|string} content - The content to be displayed within the card body.
 * @returns
 */
export function InsightCard({ title, icon, subtitle, variant = Variant.PRIMARY, content }) {
  return (
    <div className={clsx("insight-card", `insight-card--${variant}`)}>
      <div className="insight-card__header">
        {icon && (
          <div className="insight-card__icon">
            <FrostedIcon noBG clickable={false} icon={icon} />
          </div>
        )}
        <div className="insight-card__title-group">
          <h3 className="insight-card__title">{title}</h3>
          {subtitle && <p className="insight-card__subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="insight-card__divider" />

      <div className="insight-card__body">
        <RichText content={content} />
      </div>
    </div>
  );
}
