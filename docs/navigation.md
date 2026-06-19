# Navigation Components

## components/navigation

Centralized export module for all navigation-related components and helpers. This file serves as a single point of import for all navigation elements across the codebase, promoting modularity and ease of maintenance.

Note: When adding new navigation components or helpers, simply import them here and include them in the export statement.

### withLazySuspense()

Higher-order component that wraps a lazy-loaded component with React's Suspense for code-splitting and performance optimization.
HOC to wrap a lazy-loaded component with Suspense.
This allows us to keep the benefits of code-splitting while maintaining a clean and consistent import pattern across our navigation components.

**Parameters**

- `loader` (`function`) - Function that dynamically imports the component.
- `displayName` (`string`) - Display name for the wrapped component.

**Returns**

- `React.ComponentType` - - Wrapped component with Suspense.

**Examples**

```js
```js
const LazyComponent = withLazySuspense(() => import("./MyComponent"), "MyComponent");
```
```

## components/navigation/BackToTopButton

Floating back-to-top action that appears after the user scrolls away from the top.

### module.exports()

**Returns**

- `JSX.Element`

## components/Footer

Compact application footer providing quiet page closure,
secondary social actions, and copyright information.

### currentYear

Current year used for copyright display. Computed at render time to avoid manual updates. /

### Footer()

Footer
---------------------------------------------------------------------------
Minimal, mobile-first application footer.

Responsibilities:
- Provide visual closure at the end of each page
- Offer secondary social/profile actions
- Display copyright information

Design philosophy:
- Footer should be unobtrusive and visually calm
- Avoid heavy glassmorphism and large vertical padding
- Never compete with page content or navigation

Layout behavior:
- Mobile: stacked, centered, minimal height
- Desktop: inline, horizontally distributed

Accessibility:
- All interactive controls use the custom `Btn` component
- Icon-only buttons include `aria-label` attributes
- No hover-only affordances required for usability

**Returns**

- `JSX.Element` - Rendered application footer.

## components/navigation/Head

Route-aware document metadata manager for SEO and social previews.

### module.exports()

**Returns**

- `JSX.Element`

## src\\components\\navigation\\helpers\\index

src\components\navigation\helpers\index module.

## src\\components\\navigation\\helpers\\restoreScrollPosition

src\components\navigation\helpers\restoreScrollPosition module.

## navigation/restoreScrollPosition

Restores the user's scroll position when a page is loaded
or reloaded by resolving a target section and scrolling it into view.

### restoreScrollPosition()

Restores the user's scroll position when a page is loaded or reloaded.

Resolution order:
1. URL hash (deep link or manual navigation)
2. Persisted section state from a previous session

Behavior:
- Reads the current location hash, if present
- Falls back to the last saved section ID
- Smoothly scrolls the resolved section into view

Design notes:
- The URL hash is treated as the source of truth to support deep linking
- `requestAnimationFrame` is used to ensure DOM layout is complete
  before attempting to scroll
- Function exits early if no valid section can be resolved

Typical usage:
- Invoked once during page or application bootstrap
- Works in conjunction with scroll-spy and section persistence utilities

**Returns**

- `void`

## navigation/sectionPersistence

Utilities for persisting and restoring the user's last active
section on a per-page basis using sessionStorage.

### saveLastSection

Persists the currently active section ID for the current page.

Intended to be called by scroll-spy or navigation logic whenever the
active section changes.

No-op if a falsy section ID is provided.

**Parameters**

- `sectionId` (`string`) - ID of the active section to persist.

**Returns**

- `void`

### loadLastSection

Loads the last persisted section ID for the current page.

Returns `null` if no section has been saved for the current route.

**Returns**

- `string | null` - Previously saved section ID, if available.

### getPageKey()

Generates a storage key scoped to the current page pathname.

This ensures section state is isolated per route and does not leak
across different pages within the application.

**Returns**

- `string` - Namespaced sessionStorage key.

## components/MobileSectionNavTrigger

Mobile drawer-based section navigation with collapsible subsections.

Design:
- Section title click → navigate to section
- Caret/menu open → expand subsection list
- Subsection click → navigate to block
- Active state is derived from scroll-spy (passed from parent)

This component does NOT manage scroll state.
It only reflects and forwards user intent.
The parent component (e.g. SectionRenderer) is responsible for:
- Tracking scroll position
- Determining active section/block IDs
- Managing expanded state of sections
- Handling actual navigation (e.g. scrollIntoView)

### MobileSectionNavTrigger

Mobile drawer-based section navigation with collapsible subsections.

**Parameters**

- `props` (`object`)
- `props.title` (`string`) - Title displayed in the drawer header.
- `props.sections` (`Array`) - List of sections. Each section may contain a `navItems`   array (takes priority) or a `blocks` array for subsection navigation.
- `props.activeLeafId` (`string`) - ID of the currently active block (for highlighting).
- `props.activeChain` (`Array`) - List of active section IDs in the current scroll path.
- `props.isExpanded` (`function`) - Function to determine if a section's subsections are expanded.
- `props.onToggleSection` (`function`) - Callback to toggle a section's expanded state.
- `props.navigate` (`function`) - Callback to handle navigation when a section or block is clicked.

**Returns**

- `JSX.Element`

**Examples**

```js
```js
<MobileSectionNavTrigger
 title="Page Navigation"
sections={[
     { id: "intro", title: "Introduction", blocks: [] },
     { id: "features", title: "Features", blocks: [
         { id: "feat1", title: "Feature 1" },
         { id: "feat2", title: "Feature 2" },
       ]
     },
     { id: "contact", title: "Contact", blocks: [] },
  ]}
activeLeafId="feat1"
activeChain={["features", "feat1"]}
isExpanded={(id) => id === "features"}
onToggleSection={(id) => console.log("Toggle section", id)}
navigate={(e, id) => console.log("Navigate to", id)}
/>
```
```

## components/SectionAnchorNav

A sticky/floating navigation component that uses the fully accessible
AccordionList as its core. Intended for long portfolio pages with
multiple subsections (CodeStream, Hackathon, etc.).

Features:
- Sticky on desktop, collapsible drawer on mobile
- Auto-syncs with scroll position via AccordionList’s IntersectionObserver
- Smooth scrolling, keyboard navigation, screen-reader friendly
- Midnight Gold frosted UI styling

### SectionAnchorNav

A sticky/floating navigation component that uses the fully accessible
AccordionList as its core. Intended for long portfolio pages with
multiple subsections (CodeStream, Hackathon, etc.).

Features:
- Sticky on desktop, collapsible drawer on mobile
- Auto-syncs with scroll position via AccordionList’s IntersectionObserver
- Smooth scrolling, keyboard navigation, screen-reader friendly
- Midnight Gold frosted UI styling

**Parameters**

- `props` (`object`)
- `props.sections` (`Array<FeatureSection>`)
- `props.className` (`string`, optional)

### FeatureSection

- Type: `FeatureSection`

**Properties**

- `id` (`string`) - Unique identifier for the section (used for anchors).
- `title` (`string`) - Display title for the section.
- `isScroller` (`boolean`, optional, default: `false`) - If true, href will be `#id` for scroll behavior; otherwise, use `url`.
- `url` (`string`, optional) - Optional URL for non-scrolling navigation.

## components/StickyNav

Primary site navigation with synchronized desktop and mobile
layouts, active-route handling, and accessibility semantics.

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

## normalizePathname()

Normalizes a pathname to avoid canonical duplicates caused by trailing slashes.

**Parameters**

- `pathname` (`string`)

**Returns**

- `string`

## normalizeKeywords()

Ensures every metadata keyword collection is normalized and stable.

**Parameters**

- `keywords` (`unknown`)

**Returns**

- `Array<string>`
