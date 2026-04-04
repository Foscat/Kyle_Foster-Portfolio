import { CardGrid, InsightCard } from "components/ui";
import { InfoSection } from "components/layout";

/**
 * @file index.jsx
 * @fileoverview A block component for displaying a grid of InsightCards. It takes a block object containing the title, number of columns, and an array of items to be displayed as cards. Each item should have properties such as title, icon, subtitle, variant (accent color), and content.
 * @module components/renderers/blocks/CardGridBlock
 */

/**
 * @public
 * @component
 * @name CardGridBlock
 * @description
 * A block component for displaying a grid of InsightCards. It takes a block object containing the title, number of columns, and an array of items to be displayed as cards. Each item should have properties such as title, icon, subtitle, variant (accent color), and content.
 * @property {object} block - The block data containing title, columns, and items.
 * @property {string} block.title - The title of the card grid section.
 * @property {number} block.columns - The number of columns in the card grid.
 * @property {Array} block.items - An array of items to be displayed as cards. Each item should have the following properties:
 * @property {string} block.items[].id - A unique identifier for the card item.
 * @property {string} block.items[].title - The title text for the card.
 * @property {string} block.items[].icon - The name of the icon to be displayed on the card.
 * @property {string} block.items[].subtitle - The subtitle text for the card.
 * @property {string} block.items[].variant - The variant (accent color) for the card, e.g., "blue", "green", "red".
 * @property {string} block.items[].content - The content for the card, which can include rich text.
 *
 * @returns {JSX.Element} The rendered CardGridBlock component.
 * @example
 * ```js
 * const blockData = {
 *   title: "Key Insights",
 *  columns: 3,
 *  items: [
 *    {
 *     id: "1",
 *     title: "Insight One",
 *     icon: "lightbulb",
 *     subtitle: "An important finding",
 *     variant: "blue",
 *     content: "This insight reveals that..."
 *   },
 *   {
 *    id: "2",
 *    title: "Insight Two",
 *    icon: "chart-bar",
 *    subtitle: "Another key point",
 *    variant: "green",
 *    content: "This insight highlights that..."
 *    },
 *  ],
 * };
 * <CardGridBlock block={blockData} />
 * ```
 */
function CardGridBlock(props) {
  const block = props.block ?? props;
  const { id = "", title = "", columns = 3, items = [] } = block;

  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <InfoSection id={id} title={title} className="card-grid-block blue-tile scroll-anchor">
      <CardGrid columns={columns}>
        {items.map((item) => (
          <InsightCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            subtitle={item.subtitle}
            variant={item.variant}
            content={item.content}
            url={item.url}
            local={item.local}
            ariaLabel={item.ariaLabel}
            ctaText={item.ctaText}
            target={item.target}
            rel={item.rel}
            download={item.download}
          />
        ))}
      </CardGrid>
    </InfoSection>
  );
}

export default CardGridBlock;
