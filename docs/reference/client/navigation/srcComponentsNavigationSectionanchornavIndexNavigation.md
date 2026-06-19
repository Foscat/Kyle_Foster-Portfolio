# srcComponentsNavigationSectionanchornavIndexNavigation

- Source: `src/components/navigation/SectionAnchorNav/index.jsx`

# srcComponentsNavigationSectionanchornavIndexNavigation

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
