# srcComponentsNavigationStickysectionnavIndexNavigation

- Source: `src/components/navigation/StickySectionNav/index.jsx`

# srcComponentsNavigationStickysectionnavIndexNavigation

## components/StickySectionNav

Sticky, accessible intra-page section navigator with
hierarchical scroll tracking and collapsible subsection groups.

### StickySectionNav

Sticky, accessible intra-page section navigator with
hierarchical scroll tracking and collapsible subsection groups.
Designed for long-form portfolio pages with multiple sections and subsections
(e.g. CodeStream, Hackathon, etc.).

Features:
- Sticky on desktop, collapsible drawer on mobile
- Auto-syncs with scroll position via IntersectionObserver
- Smooth scrolling, keyboard navigation, screen-reader friendly
- Midnight Gold frosted UI styling
- Data-driven from section/block metadata (no hardcoded IDs or structure)

**Parameters**

- `props` (`object`)
- `props.sections` (`Array`) - List of sections with optional blocks for navigation.
- `props.pageUrl` (`string`) - Base URL for the page (used for updating hash on navigation).
- `props.mode` (`string`) - "desktop" or "mobile" to control styling and behavior.
- `props.isOpen` (`boolean`) - For mobile mode, whether the drawer is open.

**Returns**

- `JSX.Element`

**Examples**

```js
```js
<StickySectionNav
sections={[
    { id: "intro", title: "Introduction", blocks: [] },
    { id: "features", title: "Features", blocks: [
      { id: "feat1", title: "Feature 1" },
      { id: "feat2", title: "Feature 2" },
    ]
  },
]}
pageUrl="/portfolio"
mode="desktop"
isOpen={true}
/>
```
```
