import clsx from "clsx";
import { Children } from "react";
import { Size, Variant } from "types/ui.types";
import { Btn, FrostedIcon } from "..";
import { RichText } from "components/renderers";
import "./style.css";

/**
 * @file index.jsx
 * @fileoverview InsightCard and CardGrid components for displaying key insights in a visually engaging card format.
 * @module components/ui/InsightCard
 */

/**
 * @public
 * @component
 * @name CardGrid
 * @description A grid layout component for displaying multiple InsightCards. It uses CSS Grid to create a responsive layout based on the specified number of columns.
 * @param {number} columns - The number of columns in the grid. Default is 3.
 * @param {React.ReactNode} children - The content to be displayed within the grid. Each child will be treated as a separate card.
 * @returns {JSX.Element} A responsive grid container for InsightCards.
 *
 * @example
 * ```js
 * <CardGrid columns={2}>
 *  <InsightCard title="Insight 1" content="This is the first insight." />
 *  <InsightCard title="Insight 2" content="This is the second insight." />
 * </CardGrid>
 * ```
 *
 * Accessibility:
 * - The grid container uses `role="list"` to denote a list of items (cards).
 * - Each child card should use `role="listitem"` to denote individual items within the list.
 * - The grid layout is responsive and will adjust based on screen size, ensuring readability and usability across devices.
 *
 * Design notes:
 * - The `columns` prop allows for flexible layout configurations, enabling different numbers of cards per row based on design needs.
 * - The grid uses consistent spacing and alignment to create a cohesive visual presentation of the insights.
 */
export function CardGrid({ columns = 3, children }) {
  const normalizedColumns = Number.isFinite(columns) && Number(columns) > 0 ? Number(columns) : 3;
  const cardCount = Children.toArray(children).filter(Boolean).length;

  return (
    <div
      className="card-grid"
      role="list"
      style={{
        "--card-grid-columns": normalizedColumns,
        "--card-grid-count": cardCount,
      }}
    >
      {children}
    </div>
  );
}

/**
 * @public
 * @component
 * @name InsightCard
 * @description A card component for displaying insights with a header and body. The header can include an optional FontAwesome icon, title, and subtitle. The body can contain any content passed as children.
 *
 * @param {string} title - The title of the insight card.
 * @param {object} [icon] - The FontAwesome icon to display in the card header.
 * @param {string} [subtitle] - The subtitle of the insight card.
 * @param {Variant} [variant] - The accent color for the card (default is "primary").
 * @param {RichTextNode[]|string} content - The content to be displayed within the card body.
 * @returns {JSX.Element} The rendered InsightCard component.
 *
 * @example
 * ```js
 * <InsightCard
 *  title="Key Insight"
 *  icon={faLightbulb}
 *  subtitle="This is a subtitle"
 *  variant={Variant.SECONDARY}
 *  content="This is the main content of the insight card."
 * />
 * ```
 *
 * Accessibility:
 * - The card uses semantic HTML elements (e.g., `<h3>` for the title) to ensure proper structure and readability for screen readers.
 * - The optional icon includes an `aria-label` for accessibility, describing the purpose of the icon when it is present.
 * - The card's color variant is purely decorative and does not convey additional information, so it does not affect accessibility attributes.
 *
 * Design notes:
 * - The `variant` prop allows for visual differentiation between cards, enabling the use of different accent colors to highlight specific insights.
 * - The card layout is designed to be flexible, allowing for various types of content in the body while maintaining a consistent header structure.
 * - The use of a divider between the header and body helps to visually separate the sections and improve readability.
 *
 * - The component is designed to be reusable and composable, allowing it to be used in various contexts where insights need to be displayed in a card format.
 */
export function InsightCard({
  title,
  icon,
  subtitle,
  variant = Variant.PRIMARY,
  content,
  url,
  local,
  ariaLabel,
  ctaText = "Learn More",
  target,
  rel,
  download,
}) {
  const isLocalLink =
    typeof local === "boolean"
      ? local
      : typeof url === "string" && (url.startsWith("/") || url.startsWith("#"));

  return (
    <article className={clsx("insight-card", `insight-card--${variant}`)} role="listitem">
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
        {url ? (
          <div className="insight-card__footer flex-row">
            <Btn
              className="flex-c"
              text={ctaText}
              href={url}
              hrefLocal={isLocalLink}
              target={target}
              rel={rel}
              download={download}
              size={Size.SM}
              variant={Variant.ACCENT}
              ariaLabel={ariaLabel || `Learn more about ${title}`}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
