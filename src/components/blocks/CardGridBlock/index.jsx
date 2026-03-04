import { CardGrid, InsightCard } from "components/InsightCard";
import RichText from "components/RichText";
import InfoSection from "components/InfoSection";

/**
 * A block component for displaying a grid of InsightCards. It takes a block object containing the title, number of columns, and an array of items to be displayed as cards. Each item should have properties such as title, icon, subtitle, variant (accent color), and content.
 * @param {CardGridBlock} block - The block data for the CardGridBlock, containing title, columns, and items.
 * @property {string} block.id - Unique identifier for the block.
 * @property {"cardGrid"} block.type - The type of block, should be "cardGrid".
 * @property {string} block.title - The title of the card grid section.
 * @property {number} block.columns - The number of columns in the grid.
 * @property {Array<CardGridItem>} block.items - An array of items to be displayed as cards in the grid.
 *
 * @returns {JSX.Element} The rendered CardGridBlock component.
 *
 */
function CardGridBlock({ block }) {
  console.debug("Rendering CardGridBlock with block data:", block);
  const { title, columns = 3, items } = block;

  return (
    <InfoSection title={title} className="card-grid-block">
      <CardGrid columns={columns}>
        {items.map((item) => (
          <InsightCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            subtitle={item.subtitle}
            variant={item.variant}
          >
            <RichText content={item.content} />
          </InsightCard>
        ))}
      </CardGrid>
    </InfoSection>
  );
}

export default CardGridBlock;
