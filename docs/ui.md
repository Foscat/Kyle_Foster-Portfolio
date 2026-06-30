# UI Components

## components/ui

Centralized export module for shared UI components. This file serves as a single point of import for all commonly used UI elements across the codebase, promoting modularity and ease of maintenance.

Note: When adding new shared UI components, simply import them here and include them in the export statement.

## src\\components\\ui\\AccordionList\\index

src\components\ui\AccordionList\index module.

## components/AccordionList

Fully accessible, keyboard-navigable accordion and section
navigation component with frosted-glass styling.

### AccordionList()

**Parameters**

- `props` (`Object`) - Component props.
- `props.id` (`string`, optional) - Optional DOM id applied to the outer panel and accordion.
- `props.title` (`string`, optional) - Optional title rendered in the panel header.
- `props.subtitle` (`string`, optional) - Optional subtitle rendered beneath the title.
- `props.icon` (`any`, optional) - Optional icon rendered next to the title.
- `props.items` (`Array<AccordionItem>`) - List of accordion/navigation items to render.
- `props.accordion` (`boolean`, optional, default: `true`) - Enables collapsible accordion behavior.   When false, acts as a navigational list only.
- `props.variant` (`"dark" | "light"`, optional, default: `"dark"`) - Visual theme variant applied to the wrapper.
- `props.className` (`string`, optional) - Additional CSS class names applied to the wrapper.
- `props.bordered` (`boolean`, optional, default: `false`) - Whether the outer panel displays RSuite borders.

**Returns**

- `JSX.Element` - A fully accessible accordion and section navigation component. --------------------------------------------------------------------------- EXAMPLE USAGE ----------------------------------------------------------------------- <AccordionList   title="Sections"   variant="dark"   items={[     {       id: "editor",       isScroller: true,       icon: faCode,       title: "3-Panel Editor",       text: "Details about the editor system..."     },     {       id: "organizations",       isScroller: true,       icon: faPeopleGroup,       title: "Organizations",       text: "How orgs and licenses work..."     }   ]} /> ----------------------------------------------------------------------- NOTES ----------------------------------------------------------------------- • Designed to integrate with Sticky Section Nav for a unified navigation system • Automatically syncs open item with page scroll position • Accessible to screen readers and keyboard-only users • Uses RSuite's <Accordion> but replaces all header behavior with custom ARIA logic

### focusHeader()

Helper: focus a header by index

### scrollTo()

Smooth scroll to section ID in the page

### togglePanel()

Toggle accordion panel open/closed

### moveFocus()

Move keyboard focus up/down

### moveAndOpen()

Move to adjacent accordion item and open exactly that item. This keeps arrow navigation deterministic and prevents skipping middle items during rapid key repeat. /

### handleKeyDown()

Keyboard handler for each header

### AccordionItem

AccordionItem
---------------------------------------------------------------------------
Describes a single entry rendered within the AccordionList.

- Type: `Object`

**Properties**

- `id` (`string`) - DOM id of the associated page section.
- `title` (`string`) - Display title for the item.
- `text` (`string | JSX.Element`, optional) - Optional accordion panel content.
- `url` (`string`, optional) - Optional URL used for navigation.
- `local` (`boolean`, optional, default: `false`) - Whether the URL is a local route.
- `icon` (`any`, optional) - Optional icon passed to FrostedIcon.
- `isScroller` (`boolean`, optional, default: `false`) - Enables scroll-to-section behavior when activated.

## components/Btn

Unified frosted-glass button component implementing the
Midnight Gold UI system with accessibility, animation, async handling,
and controlled prop passthrough to RSuite and FontAwesome.

### Btn

A unified, accessible, animated button component that conforms to the
Midnight Gold + Frosted UI system.

Core responsibilities:
- Normalizes RSuite `` and `<IconButton>` behavior
- Automatically switches to IconButton when an icon is present
- Enforces accessibility for icon-only buttons
- Supports async click handlers with visual feedback
- Provides tooltip support via RSuite Whisper
- Can render as:
  - Native button
  - React Router link
  - External anchor

Accessibility:
- Requires an accessible label for icon-only buttons
- Applies `aria-busy` during loading/async states
- Applies `aria-disabled` consistently

**Parameters**

- `props` (`Object`) - Component props.
- `props.variant` (`Variant`, optional, default: `"primary"`) - Visual style variant aligned with the frosted theme.
- `props.surfaceLevel` (`SurfaceLevel`, optional, default: `"2"`) - Interactive Surface depth level consumed by ui-style-kit-css v2.
- `props.size` (`Size`, optional, default: `"md"`) - Size variant applied to both button and icon.
- `props.text` (`string`, optional) - Text label rendered inside the button.
- `props.type` (`"button" | "submit" | "reset"`, optional, default: `"button"`) - Native button type forwarded to the underlying RSuite button.
- `props.icon` (`string`, optional) - FontAwesome icon name. When provided, renders an IconButton.
- `props.onClick` (`function`, optional) - Click handler. May return a Promise to enable async loading state.
- `props.clickable` (`boolean`, optional, default: `true`) - Indicates whether the button/icon is clickable or not.
- `props.ariaLabel` (`string`, optional) - Accessible label. Required for icon-only buttons if no tooltip is provided.
- `props.ariaExpanded` (`boolean | string`, optional) - Convenience alias mapped to `aria-expanded`.
- `props.ariaCurrent` (`string`, optional) - Convenience alias mapped to `aria-current`.
- `props.tooltip` (`string`, optional) - Tooltip text displayed on hover.
- `props.tooltipFollowCursor` (`boolean`, optional, default: `true`) - When true, the tooltip will follow the cursor.
- `props.tooltipPlacement` (`TooltipPlacement`, optional, default: `"right"`) - Placement of the tooltip relative to the button.
- `props.animation` (`HoverAnimation`, optional, default: `"scale"`) - Optional hover animation preset.
- `props.href` (`string`, optional) - Converts the button into a link when provided.
- `props.hrefLocal` (`boolean`, optional, default: `false`) - When true, renders a React Router `<Link>` instead of an anchor.
- `props.target` (`string`, optional) - Anchor target value (e.g., "_blank").
- `props.tabIndex` (`number`, optional) - Explicit tabIndex for the button. By default, it will be focusable when visible and not disabled.
- `props.rel` (`string`, optional) - Anchor `rel` attribute.
- `props.className` (`string`, optional) - Additional CSS class names.
- `props.noBG` (`boolean`, optional, default: `false`) - Disables the frosted background treatment.
- `props.*` (`RSuiteButtonProps`, optional) - Any supported RSuite Button/IconButton props are forwarded directly.
- `props.*` (`FontAwesomeButtonIconProps`, optional) - FontAwesome-related props forwarded to the internal `FrostedIcon`.

**Returns**

- `JSX.Element` - Rendered button component.

**Examples**

```js
```js
<Btn
variant="accent"
size="lg"
text="Click Me"
icon="fa-solid fa-thumbs-up"
onClick={() => alert("Button clicked!")}
tooltip="This is a button"
ariaLabel="Click Me"
/>
```
In this example, the `Btn` component renders a large, accent-styled button with both text and an icon. It includes a tooltip that appears on hover and an accessible label for screen readers. When clicked, it triggers an alert dialog.
```

### isIconOnly

True when the button renders only an icon with no text label

### nativeAriaLabel

Resolve an accessible aria-label for the button. Falls back to tooltip text or a humanized icon name.

### handleClick()

Async-aware click handler.
Automatically manages loading state when a Promise is returned.

**Parameters**

- `e` (`React.MouseEvent`) - Click event.

**Returns**

- `void`

### RSuiteButtonProps

Subset of props forwarded directly to RSuite `` / `<IconButton>`.
These are documented explicitly to make passthrough behavior clear
without re-exporting RSuite types.

- Type: `Object`

**Properties**

- `active` (`boolean`, optional, default: `true`) - Whether the button is in an active state.
- `as` (`string | React.ElementType`, optional, default: `"button"`) - Render element type.
- `block` (`boolean`, optional, default: `false`) - Makes the button full-width.
- `classPrefix` (`string`, optional, default: `"btn"`) - RSuite CSS class prefix.
- `disabled` (`boolean`, optional, default: `false`) - Disables the button.
- `startIcon` (`React.ReactNode`, optional) - Icon rendered before content.
- `endIcon` (`React.ReactNode`, optional) - Icon rendered after content.
- `loading` (`boolean`, optional, default: `false`) - Shows loading state.
- `href` (`string`, optional) - If provided, renders an anchor instead of a button.
- `target` (`string`, optional) - Anchor target (e.g., "_blank").
- `rel` (`string`, optional) - Anchor rel attribute.
- `download` (`string`, optional) - Anchor download attribute.
- `className` (`string`, optional) - Additional CSS class names.
- `noBG` (`boolean`, optional, default: `false`) - If true, disables the frosted background.
- `variant` (`Variant`, optional, default: `"primary"`) - Visual style variant.
- `surfaceLevel` (`SurfaceLevel`, optional, default: `"2"`) - Interactive Surface visual depth level.
- `size` (`Size`, optional, default: `"md"`) - Size variant applied to both button and icon.
- `text` (`string`, optional) - Text label rendered inside the button.
- `type` (`"button" | "submit" | "reset"`, optional, default: `"button"`) - Native button type.
- `icon` (`string`, optional) - FontAwesome icon name. When provided, renders an IconButton.
- `onClick` (`function`, optional) - Click handler. May return a Promise to enable async loading state.

### FontAwesomeButtonIconProps

FontAwesome-related props forwarded to the internal `FrostedIcon`
instance rendered inside the button. These allow for fine-grained control over
the icon's appearance and behavior, including animation, flipping, masking, and more.

- Type: `Object`

**Properties**

- `border` (`boolean`, optional, default: `false`)
- `mask` (`any`, optional)
- `maskId` (`string`, optional)
- `inverse` (`boolean`, optional, default: `false`)
- `flip` (`string | boolean`, optional, default: `false`)
- `pull` (`string`, optional)
- `rotation` (`number`, optional)
- `rotateBy` (`boolean | number`, optional, default: `false`)
- `spinPulse` (`boolean`, optional, default: `false`)
- `spinReverse` (`boolean`, optional, default: `false`)
- `fade` (`boolean`, optional, default: `false`)
- `beatFade` (`boolean`, optional, default: `false`)
- `bounce` (`boolean`, optional, default: `false`)
- `shake` (`boolean`, optional, default: `false`)
- `symbol` (`boolean | string`, optional, default: `false`)
- `title` (`string`, optional)
- `titleId` (`string`, optional)
- `transform` (`string | Object`, optional)
- `swapOpacity` (`boolean`, optional, default: `false`)
- `widthAuto` (`boolean`, optional, default: `false`)

## components/ClickableImg

Clickable image component that expands into a frosted
modal viewer while preserving aspect ratio and accessibility.

### ClickableImg

A responsive image thumbnail that expands into a modal viewer when clicked. The modal maintains the image's aspect ratio and includes optional title and caption support. Designed with accessibility in mind, it requires alt text and applies appropriate aria-labels.

Key behaviors:
- Renders a responsive image thumbnail using RSuite's Image component
- Clicking the thumbnail opens a modal viewer with a larger version of the image
- The modal can be closed with the close button or pressing the ESC key
- The expanded image supports zoom controls and drag-to-pan interaction
- On mobile, title/caption details are hidden while zoomed to maximize viewing space
- Both thumbnail and modal images are lazy-loaded for performance
- The modal and image wrapper feature frosted glass styling consistent with the UI design system
- On mobile portrait, wide images request landscape orientation when browser support allows it
- On unsupported browsers, wide images show a rotate/zoom guidance hint

Accessibility:
- Requires alt text for screen readers
- Applies aria-label to both thumbnail and modal image

**Parameters**

- `props` (`object`) - Component props.
- `props.src` (`string`) - Image source URL.
- `props.alt` (`string`) - Alt text for accessibility.
- `props.ariaLabel` (`string`, optional) - Aria-label for accessibility.
- `props.className` (`string`, optional) - Additional CSS classes for the image.
- `props.title` (`string`, optional) - Optional modal header title.
- `props.caption` (`string`, optional) - Optional caption rendered with the image.

**Returns**

- `JSX.Element` - Clickable image with modal viewer.

**Examples**

```js
```js
<ClickableImg
src="/images/project-screenshot.png"
alt="Screenshot of the project in action"
title="Project Screenshot"
caption="This screenshot shows the main dashboard of the application."
ariaLabel="Screenshot of the project in action, click to expand"
/>
```
In this example, the `ClickableImg` component renders a thumbnail of a project screenshot. When the user clicks on the image, it opens a modal viewer displaying a larger version of the screenshot along with the provided title and caption. The component ensures that all images are accessible and responsive across different devices.
```

## components/FrostedIcon

Styled FontAwesome icon component integrated with the
Midnight Gold frosted UI system.

### FrostedIcon

A styled wrapper around {@link FontAwesomeIcon} that conforms to the
Midnight Gold + Frosted UI system.

Core responsibilities:
- Applies frosted-glass theming and size variants
- Manages loading and animation states
- Provides optional click interaction
- Exposes tooltip support via RSuite Whisper
- Forwards supported FontAwesome props directly to the SVG renderer

Accessibility:
- Uses `role="button"` when clickable
- Applies `aria-label` when provided
- Uses `aria-busy` during loading states

**Parameters**

- `props` (`Object`) - Component props.
- `props.icon` (`string`) - FontAwesome icon definition to render.
- `props.size` (`Size`, optional, default: `"md"`) - Icon size variant (xs | sm | md | lg | xl).
- `props.variant` (`string`, optional, default: `"primary"`) - Visual style variant applied via CSS.
- `props.clickable` (`boolean`, optional, default: `false`) - Enables pointer and keyboard interaction.
- `props.onClick` (`function`, optional, default: `()=>{}`) - Click handler invoked when clickable.
- `props.loading` (`boolean`, optional, default: `false`) - Displays a loading spinner and sets aria-busy.
- `props.spin` (`boolean`, optional, default: `false`) - Forces spin animation regardless of loading state.
- `props.tooltip` (`string`, optional) - Optional tooltip text displayed on hover.
- `props.ariaLabel` (`string`, optional) - Accessible label for screen readers.
- `props.noBG` (`boolean`, optional, default: `false`) - Disables the frosted background circle.
- `props.className` (`string`, optional) - Additional CSS class names.
- `props.*` (`FontAwesomeIconProps`, optional) - Any supported FontAwesomeIcon props are forwarded directly to the   underlying SVG renderer.

**Returns**

- `JSX.Element` - Rendered frosted icon.

**Examples**

```js
```js
<FrostedIcon
icon={faCoffee}
size={Size.LG}
variant={Variant.ACCENT}
clickable
onClick={() => alert("Icon clicked!")}
/>
```
```

### FontAwesomeIconProps

Subset of props forwarded directly to the underlying `FontAwesomeIcon`
component. These align with the official `@fortawesome/react-fontawesome`
API and are documented here for completeness.

- Type: `Object`

**Properties**

- `border` (`boolean`, optional, default: `false`) - Renders a border around the icon.
- `mask` (`any`, optional) - Icon used as a mask.
- `maskId` (`string`, optional) - Optional ID for the SVG mask.
- `inverse` (`boolean`, optional, default: `false`) - Inverts icon color.
- `flip` (`string | boolean`, optional, default: `false`) - Flips the icon ("horizontal", "vertical", or "both").
- `pull` (`string`, optional) - Pulls icon left or right.
- `rotation` (`number`, optional) - Rotates icon (90, 180, 270).
- `rotateBy` (`boolean | number`, optional, default: `false`) - Arbitrary rotation value.
- `spinPulse` (`boolean`, optional, default: `false`) - Enables pulse-style spinning.
- `spinReverse` (`boolean`, optional, default: `false`) - Reverses spin direction.
- `fade` (`boolean`, optional, default: `false`) - Enables fade animation.
- `beatFade` (`boolean`, optional, default: `false`) - Enables beat-fade animation.
- `bounce` (`boolean`, optional, default: `false`) - Enables bounce animation.
- `shake` (`boolean`, optional, default: `false`) - Enables shake animation.
- `symbol` (`boolean | string`, optional, default: `false`) - Exports icon as SVG symbol.
- `title` (`string`, optional) - SVG `<title>` content.
- `titleId` (`string`, optional) - ID applied to SVG title element.
- `transform` (`string | Object`, optional) - SVG transform definition.
- `swapOpacity` (`boolean`, optional, default: `false`) - Swaps opacity layers.
- `widthAuto` (`boolean`, optional, default: `false`) - Enables automatic width calculation.

## src\\components\\ui\\InsightCard\\index

src\components\ui\InsightCard\index module.

## components/ui/InsightCard

InsightCard and CardGrid components for displaying key insights in a visually engaging card format.

### CardGrid

A grid layout component for displaying multiple InsightCards. It uses CSS Grid to create a responsive layout based on the specified number of columns.

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
- The grid uses consistent spacing and alignment to create a cohesive visual presentation of the insights.
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

## src\\components\\ui\\MermaidDiagram\\index

src\components\ui\MermaidDiagram\index module.

## components/MermaidDiagram

Fully featured Mermaid diagram renderer with dark/light theme support, responsive SVG layout, accessible container, optional description, and PNG export capability. The component normalizes props to support both legacy and new diagram configurations, allowing for flexible integration while maintaining a consistent internal state structure for rendering.

### MermaidDiagram

Fully featured Mermaid diagram renderer with dark/light theme support, responsive SVG layout, accessible container, optional description, and PNG export capability. The component normalizes props to support both legacy and new diagram configurations, allowing for flexible integration while maintaining a consistent internal state structure for rendering.
Core responsibilities:
- Render Mermaid diagrams based on provided source strings, with support for separate mobile and desktop configurations.
- Apply visual themes (dark/light) to the rendered diagrams for consistent styling.
- Ensure the diagram container is accessible, using appropriate ARIA roles and labels.
- Include an optional description rendered beneath the diagram for additional context.
- Provide a button to export the rendered diagram as a PNG image, using `html-to-image` for conversion.
- Normalize incoming props to support both legacy and new diagram configurations, ensuring backward compatibility while enabling new features.

**Parameters**

- `props` (`Object`) - Component props.
- `props.id` (`string`) - DOM id assigned to the panel container, used as a scroll anchor and for accessibility.
- `props.diagram` (`string`) - Mermaid diagram source string. Legacy property if `mobileDiagram` and/or `desktopDiagram` are not provided.
- `props.mobileDiagram` (`Object`) - Optional diagram configuration for mobile viewports.
- `props.desktopDiagram` (`Object`) - Optional diagram configuration for desktop viewports.
- `props.title` (`string`, optional) - Optional title rendered in the panel header and used for accessibility.
- `props.description` (`string`, optional) - Optional descriptive text rendered beneath the diagram.
- `props.theme` (`"dark" | "light"`, optional, default: `"dark"`) - Visual theme applied to Mermaid rendering.
- `props.theme` (`string`, optional) - Visual theme for the diagram (e.g. "dark" or "light").
- `props.icon` (`string`, optional)
- `props.className` (`string`, optional) - Additional CSS class names applied to the panel container.

**Returns**

- `JSX.Element` - Rendered Mermaid diagram panel.

**Examples**

```js
```js
<MermaidDiagram
id="example-diagram"
title="Example Mermaid Diagram"
description="This is an example of a Mermaid diagram rendered within the MermaidDiagram component."
diagram="graph TD; A-->B; A-->C; B-->D; C-->D;"
theme="dark"
/>
// In this example, the `MermaidDiagram` component renders a simple flowchart defined by the Mermaid syntax in the `diagram` prop. The component applies the "dark" theme to the rendered SVG and includes a title and description for context. The diagram is rendered within a styled panel that is accessible and includes functionality for exporting the diagram as a PNG image.
```
```

### handleExport()

Handle diagram export by converting the rendered SVG to a PNG image using `html-to-image`, while ensuring that the host element and SVG are present before attempting the export. The function includes error handling to catch and log any issues during the export process, providing feedback in case of failure. The exported file is named based on the provided title or defaults to "diagram.png" if no title is available, ensuring a user-friendly download experience.
The export process involves:
- Selecting the SVG element from the host container to ensure that the correct content is exported.
- Using `html-to-image`'s `toPng` function to convert the SVG to a PNG data URL, with options for cache busting and background color to ensure a clean export.
- Creating a temporary anchor element to trigger the download of the PNG file, setting the `href` to the generated data URL and the `download` attribute to specify the filename.
- Handling any errors that occur during the export process by logging them to the console, allowing for debugging and user feedback in case of issues.

**Returns**

- `Promise<void>` - A promise that resolves when the export process is complete, allowing for asynchronous handling of the export operation.

## src\\components\\ui\\MermaidDiagram\\paletteTransform

src\components\ui\MermaidDiagram\paletteTransform module.

### applyPaletteToDiagramSource()

Applies a named palette remapping to Mermaid source by replacing known hex
color literals with palette-specific equivalents.

**Parameters**

- `source` (`string`) - Mermaid definition source.
- `palette` (`string`) - Palette key (`primary`, `alt`, `forest`, `ocean`, `sunset`).

**Returns**

- `string` - Source with palette substitutions applied.

## src\\components\\ui\\ProjectCard\\index

src\components\ui\ProjectCard\index module.

## components/ProjectCard

Reusable frosted-glass project display card used to present
portfolio projects with images, repository links, and live URLs.

### ProjectCard

A reusable card component for showcasing portfolio projects, featuring a frosted-glass design consistent with the UI theme. Each card can display a project title, description, a grid of images, and action buttons linking to the project's GitHub repository and live URL. The component is designed to be flexible and visually engaging, making it ideal for presenting projects in a portfolio context.
Features:
- Standardized layout via `InfoSection`
- Optional responsive image gallery using `ClickableImg`
- Optional GitHub repository link
- Optional live project URL
- Pure-CSS animation and layout styling

Usage notes:
- Images are rendered only when provided
- Action buttons are conditionally rendered based on link availability
- Designed to integrate cleanly with section-based navigation

**Parameters**

- `props` (`Object`) - Component props.
- `props.title` (`string`) - Project title.
- `props.description` (`string`) - Main project description text.
- `props.images` (`Array<ProjectImage>`, optional, default: `[]`) - Optional list of project images to render.
- `props.repo` (`string`, optional) - Optional GitHub repository URL.
- `props.url` (`string`, optional) - Optional live project URL.
- `props.icon` (`any`, optional, default: `faCode`) - Icon displayed alongside the project title.
- `props.id` (`string`, optional) - Optional DOM id used for section scrolling or deep linking.

**Returns**

- `JSX.Element` - Rendered project card.

### ProjectImage

- Type: `Object`

**Properties**

- `src` (`string`) - Image source URL.
- `alt` (`string`) - Alt text for accessibility.
- `title` (`string`, optional) - Optional image title.
- `caption` (`string`, optional) - Optional caption displayed with the image.
