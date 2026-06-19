# srcComponentsRenderersBlocksCardgridblockIndexRenderer

- Source: `src/components/renderers/blocks/CardGridBlock/index.jsx`

# srcComponentsRenderersBlocksCardgridblockIndexRenderer

## src\\components\\renderers\\blocks\\CardGridBlock\\index

src\components\renderers\blocks\CardGridBlock\index module.

## components/renderers/blocks/CardGridBlock

A block component for displaying a grid of InsightCards. It takes a block object containing the title, number of columns, and an array of items to be displayed as cards. Each item should have properties such as title, icon, subtitle, variant (accent color), and content.

### CardGridBlock

A block component for displaying a grid of InsightCards. It takes a block object containing the title, number of columns, and an array of items to be displayed as cards. Each item should have properties such as title, icon, subtitle, variant (accent color), and content.

**Properties**

- `block` (`object`) - The block data containing title, columns, and items.
- `block.title` (`string`) - The title of the card grid section.
- `block.columns` (`number`) - The number of columns in the card grid.
- `block.items` (`Array`) - An array of items to be displayed as cards. Each item should have the following properties:
- `block.items[].id` (`string`) - A unique identifier for the card item.
- `block.items[].title` (`string`) - The title text for the card.
- `block.items[].icon` (`string`) - The name of the icon to be displayed on the card.
- `block.items[].subtitle` (`string`) - The subtitle text for the card.
- `block.items[].variant` (`string`) - The variant (accent color) for the card, e.g., "blue", "green", "red".
- `block.items[].content` (`string`) - The content for the card, which can include rich text.

**Returns**

- `JSX.Element` - The rendered CardGridBlock component.

**Examples**

```js
```js
const blockData = {
  title: "Key Insights",
 columns: 3,
 items: [
   {
    id: "1",
    title: "Insight One",
    icon: "lightbulb",
    subtitle: "An important finding",
    variant: "blue",
    content: "This insight reveals that..."
  },
  {
   id: "2",
   title: "Insight Two",
   icon: "chart-bar",
   subtitle: "Another key point",
   variant: "green",
   content: "This insight highlights that..."
   },
 ],
};
<CardGridBlock block={blockData} />
```
```
