# srcComponentsLayoutPageheaderIndexLayout

- Source: `src/components/layout/PageHeader/index.jsx`

# srcComponentsLayoutPageheaderIndexLayout

## src\\components\\layout\\PageHeader\\index

src\components\layout\PageHeader\index module.

## components/PageHeader

Standardized page-level header component used to introduce
pages and major sections with consistent hierarchy and styling.

### PageHeader()

PageHeader
---------------------------------------------------------------------------
Standardized page-level header component designed to introduce a page or
major section with clear hierarchy and frosted-glass presentation.

Features:
- Frosted RSuite Panel container
- Primary title (required)
- Optional job title and timespan row
- Optional descriptive subtitle
- Optional technology list
- Subtle entrance animation via CSS
- Fully responsive layout

Accessibility:
- Uses `role="banner"` to denote page-level landmark
- Content is readable and navigable via assistive technologies

**Parameters**

- `props` (`Object`) - Component props.
- `props.title` (`string`) - Main page or section title.
- `props.jobTitle` (`string`, optional) - Optional role or position title.
- `props.timespan` (`string`, optional) - Optional date range or duration string.
- `props.subTitle` (`string`, optional) - Supporting descriptive text rendered beneath the title.
- `props.tech` (`Array<TechItem>`, optional) - List of technologies associated with the page or project.
- `props.className` (`string`, optional) - Optional additional CSS class names.

**Returns**

- `JSX.Element` - Rendered page header.

### renderTechUsedString()

Formats a list of technology items into a human-readable display.

Behavior:
- Returns an empty string when no valid technologies are provided
- Renders each technology with its associated style class

**Parameters**

- `techArray` (`Array<TechItem>`, optional, default: `[]`) - List of technologies used.

**Returns**

- `JSX.Element | string` - Rendered tech list or empty string.

### TechItem

TechItem
---------------------------------------------------------------------------
Describes a technology badge rendered in the "Tech Used" section.

- Type: `Object`

**Properties**

- `label` (`string`) - Display name of the technology.
- `type` (`string`) - CSS class used to style the technology label.
- `id` (`string`, optional) - Optional unique identifier.
