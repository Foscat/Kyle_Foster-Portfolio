# srcComponentsUiClickableimgIndexUi

- Source: `src/components/ui/ClickableImg/index.jsx`

# srcComponentsUiClickableimgIndexUi

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
