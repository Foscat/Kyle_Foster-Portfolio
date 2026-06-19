# srcComponentsUiProjectcardIndexUi

- Source: `src/components/ui/ProjectCard/index.jsx`

# srcComponentsUiProjectcardIndexUi

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
