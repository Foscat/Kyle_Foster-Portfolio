# srcComponentsUiInsightcardIndexUi

- Source: `src/components/ui/InsightCard/index.jsx`

# srcComponentsUiInsightcardIndexUi

## src\\components\\ui\\InsightCard\\index

src\components\ui\InsightCard\index module.

## components/ui/InsightCard

InsightCard and CardGrid components for displaying key insights in a visually engaging card format.

### CardGrid

A grid layout component for displaying multiple InsightCards. It uses the `layout-style-css` card-grid primitive with component-level sizing variables.

**Parameters**

- `columns` (`number`) - The number of columns in the grid. Default is 3.
- `children` (`React.ReactNode`) - The content to be displayed within the grid. Each child will be treated as a separate card.

**Returns**

- `JSX.Element` - A responsive grid container for InsightCards.

**Examples**

```js
```js
<CardGrid columns={2}>
 <InsightCard title="Insight 1" content="This is the first insight." />
 <InsightCard title="Insight 2" content="This is the second insight." />
</CardGrid>
```

Accessibility:
- The grid container uses `role="list"` to denote a list of items (cards).
- Each child card should use `role="listitem"` to denote individual items within the list.
- The grid layout is responsive and will adjust based on screen size, ensuring readability and usability across devices.

Design notes:
- The `columns` prop allows for flexible layout configurations, enabling different numbers of cards per row based on design needs.
- The grid delegates layout behavior to `layout-style-css` while preserving card count and column sizing variables for app-specific tuning.
```

### InsightCard

A card component for displaying insights with a header and body. The header can include an optional FontAwesome icon, title, and subtitle. The body can contain any content passed as children.

**Parameters**

- `title` (`string`) - The title of the insight card.
- `icon` (`object`, optional) - The FontAwesome icon to display in the card header.
- `subtitle` (`string`, optional) - The subtitle of the insight card.
- `variant` (`Variant`, optional) - The accent color for the card (default is "primary").
- `previewImage` (`FeatureImage`, optional) - Optional expandable preview image shown above card details.
- `content` (`Array<RichTextNode> | string`) - The content to be displayed within the card body.

**Returns**

- `JSX.Element` - The rendered InsightCard component.

**Examples**

```js
```js
<InsightCard
 title="Key Insight"
 icon={faLightbulb}
 subtitle="This is a subtitle"
 variant={Variant.SECONDARY}
 content="This is the main content of the insight card."
/>
```

Accessibility:
- The card uses semantic HTML elements (e.g., `<h3>` for the title) to ensure proper structure and readability for screen readers.
- The optional icon includes an `aria-label` for accessibility, describing the purpose of the icon when it is present.
- The card's color variant is purely decorative and does not convey additional information, so it does not affect accessibility attributes.

Design notes:
- The `variant` prop allows for visual differentiation between cards, enabling the use of different accent colors to highlight specific insights.
- The card layout is designed to be flexible, allowing for various types of content in the body while maintaining a consistent header structure.
- The use of a divider between the header and body helps to visually separate the sections and improve readability.

- The component is designed to be reusable and composable, allowing it to be used in various contexts where insights need to be displayed in a card format.
```
