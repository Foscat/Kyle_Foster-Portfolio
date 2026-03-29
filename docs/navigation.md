## Modules

<dl>
<dt><a href="#module_components/navigation/Footer">components/navigation/Footer</a></dt>
<dd><p>Tests for the Footer component, ensuring it renders correctly and handles interactions as expected.</p>
</dd>
<dt><a href="#module_components/Footer">components/Footer</a></dt>
<dd><p>Compact application footer providing quiet page closure,
secondary social actions, and copyright information.</p>
</dd>
<dt><a href="#module_components/navigation/Head">components/navigation/Head</a></dt>
<dd><p>Tests for the Head component, ensuring it sets the document title and meta tags correctly based on the current route.</p>
</dd>
<dt><a href="#module_components/Head">components/Head</a></dt>
<dd><p>Centralized document head manager responsible for injecting
SEO, metadata, and social sharing tags based on the current route.</p>
</dd>
<dt><a href="#module_navigation/restoreScrollPosition">navigation/restoreScrollPosition</a></dt>
<dd><p>Restores the user&#39;s scroll position when a page is loaded
or reloaded by resolving a target section and scrolling it into view.</p>
</dd>
<dt><a href="#module_navigation/sectionPersistence">navigation/sectionPersistence</a></dt>
<dd><p>Utilities for persisting and restoring the user&#39;s last active
section on a per-page basis using sessionStorage.</p>
</dd>
<dt><a href="#module_components/navigation">components/navigation</a></dt>
<dd><p>Centralized export module for all navigation-related components and helpers. This file serves as a single point of import for all navigation elements across the codebase, promoting modularity and ease of maintenance.</p>
<p>Note: When adding new navigation components or helpers, simply import them here and include them in the export statement.</p>
</dd>
<dt><a href="#module_components/MobileSectionNavTrigger">components/MobileSectionNavTrigger</a></dt>
<dd><p>Mobile drawer-based section navigation with collapsible subsections.</p>
<p>Design:</p>
<ul>
<li>Section title click → navigate to section</li>
<li>Caret/menu open → expand subsection list</li>
<li>Subsection click → navigate to block</li>
<li>Active state is derived from scroll-spy (passed from parent)</li>
</ul>
<p>This component does NOT manage scroll state.
It only reflects and forwards user intent.
The parent component (e.g. SectionRenderer) is responsible for:</p>
<ul>
<li>Tracking scroll position</li>
<li>Determining active section/block IDs</li>
<li>Managing expanded state of sections</li>
<li>Handling actual navigation (e.g. scrollIntoView)</li>
</ul>
</dd>
<dt><a href="#module_components/SectionAnchorNav">components/SectionAnchorNav</a></dt>
<dd><p>A sticky/floating navigation component that uses the fully accessible
AccordionList as its core. Intended for long portfolio pages with
multiple subsections (CodeStream, Hackathon, etc.).</p>
<p>Features:</p>
<ul>
<li>Sticky on desktop, collapsible drawer on mobile</li>
<li>Auto-syncs with scroll position via AccordionList’s IntersectionObserver</li>
<li>Smooth scrolling, keyboard navigation, screen-reader friendly</li>
<li>Midnight Gold frosted UI styling</li>
</ul>
</dd>
<dt><a href="#module_components/StickyNav">components/StickyNav</a></dt>
<dd><p>Primary site navigation with synchronized desktop and mobile
layouts, active-route handling, and accessibility semantics.</p>
</dd>
<dt><a href="#module_components/navigation/StickyNav">components/navigation/StickyNav</a></dt>
<dd><p>Tests for the StickyNav component, ensuring it renders correctly and handles interactions as expected.</p>
</dd>
<dt><a href="#module_components/StickySectionNav">components/StickySectionNav</a></dt>
<dd><p>Sticky, accessible intra-page section navigator with
hierarchical scroll tracking and collapsible subsection groups.</p>
</dd>
<dt><a href="#module_tests/components/StickySectionNav">tests/components/StickySectionNav</a></dt>
<dd><p>Unit tests for the StickySectionNav component.</p>
<p>Test coverage:</p>
<ul>
<li>Rendering of section navigation links</li>
<li>Active section highlighting via <code>aria-current=&quot;location&quot;</code></li>
<li>History hash updates on navigation</li>
<li>Programmatic scroll coordination with scroll-spy logic</li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Mocks <code>useScrollSpyWithHistory</code> to control active section state</li>
<li>Mocks <code>window.scrollTo</code> to prevent actual scrolling</li>
<li>Uses real DOM nodes to simulate anchor targets</li>
</ul>
<p>Architectural intent:
StickySectionNav is an <strong>intra-page navigation controller</strong>.
Tests focus on:</p>
<ul>
<li>Accessibility semantics</li>
<li>Navigation side effects (history + scroll)</li>
<li>Integration boundaries with the scroll-spy hook</li>
</ul>
</dd>
</dl>

<a name="module_components/navigation/Footer"></a>

## components/navigation/Footer
Tests for the Footer component, ensuring it renders correctly and handles interactions as expected.

<a name="module_components/Footer"></a>

## components/Footer
Compact application footer providing quiet page closure,secondary social actions, and copyright information.


* [components/Footer](#module_components/Footer)
    * [~Footer()](#module_components/Footer..Footer) ⇒ <code>JSX.Element</code>
        * [~currentYear](#module_components/Footer..Footer..currentYear)

<a name="module_components/Footer..Footer"></a>

### components/Footer~Footer() ⇒ <code>JSX.Element</code>
Footer---------------------------------------------------------------------------Minimal, mobile-first application footer.Responsibilities:- Provide visual closure at the end of each page- Offer secondary social/profile actions- Display copyright informationDesign philosophy:- Footer should be unobtrusive and visually calm- Avoid heavy glassmorphism and large vertical padding- Never compete with page content or navigationLayout behavior:- Mobile: stacked, centered, minimal height- Desktop: inline, horizontally distributedAccessibility:- All interactive controls use the custom `Btn` component- Icon-only buttons include `aria-label` attributes- No hover-only affordances required for usability

**Kind**: inner method of [<code>components/Footer</code>](#module_components/Footer)  
**Returns**: <code>JSX.Element</code> - Rendered application footer.  
**Access**: public  
**Component**:   
<a name="module_components/Footer..Footer..currentYear"></a>

#### Footer~currentYear
Current year used for copyright display.Computed at render time to avoid manual updates.

**Kind**: inner constant of [<code>Footer</code>](#module_components/Footer..Footer)  
<a name="module_components/navigation/Head"></a>

## components/navigation/Head
Tests for the Head component, ensuring it sets the document title and meta tags correctly based on the current route.

<a name="module_components/Head"></a>

## components/Head
Centralized document head manager responsible for injectingSEO, metadata, and social sharing tags based on the current route.

<a name="exp_module_components/Head--module.exports"></a>

### module.exports() ⇒ <code>JSX.Element</code> ⏏
Head---------------------------------------------------------------------------Dynamically configures `<head>` metadata for each page in the applicationusing `react-helmet-async`.Responsibilities:- Selects page-specific metadata based on the current URL path- Injects SEO-relevant meta tags (title, description, keywords)- Configures Open Graph metadata for social sharing- Defines favicon, theme color, and canonical URL- Adds performance-related tags (preconnect)Behavior:- Determines the active page by inspecting `window.location.pathname`- Falls back to the Home metadata when no route match is foundUsage notes:- Intended to be rendered once near the top of the app tree- Requires `HelmetProvider` to be present higher in the component hierarchy

**Kind**: Exported function  
**Returns**: <code>JSX.Element</code> - Injected document head metadata.  
**Access**: public  
**Component**:   
<a name="module_navigation/restoreScrollPosition"></a>

## navigation/restoreScrollPosition
Restores the user's scroll position when a page is loadedor reloaded by resolving a target section and scrolling it into view.

<a name="module_navigation/restoreScrollPosition..restoreScrollPosition"></a>

### navigation/restoreScrollPosition~restoreScrollPosition() ⇒ <code>void</code>
Restores the user's scroll position when a page is loaded or reloaded.Resolution order:1. URL hash (deep link or manual navigation)2. Persisted section state from a previous sessionBehavior:- Reads the current location hash, if present- Falls back to the last saved section ID- Smoothly scrolls the resolved section into viewDesign notes:- The URL hash is treated as the source of truth to support deep linking- `requestAnimationFrame` is used to ensure DOM layout is complete  before attempting to scroll- Function exits early if no valid section can be resolvedTypical usage:- Invoked once during page or application bootstrap- Works in conjunction with scroll-spy and section persistence utilities

**Kind**: inner method of [<code>navigation/restoreScrollPosition</code>](#module_navigation/restoreScrollPosition)  
**Access**: public  
<a name="module_navigation/sectionPersistence"></a>

## navigation/sectionPersistence
Utilities for persisting and restoring the user's last activesection on a per-page basis using sessionStorage.


* [navigation/sectionPersistence](#module_navigation/sectionPersistence)
    * _static_
        * [.saveLastSection](#module_navigation/sectionPersistence.saveLastSection) ⇒ <code>void</code>
        * [.loadLastSection](#module_navigation/sectionPersistence.loadLastSection) ⇒ <code>string</code> \| <code>null</code>
    * _inner_
        * [~getPageKey()](#module_navigation/sectionPersistence..getPageKey) ⇒ <code>string</code>

<a name="module_navigation/sectionPersistence.saveLastSection"></a>

### navigation/sectionPersistence.saveLastSection ⇒ <code>void</code>
Persists the currently active section ID for the current page.Intended to be called by scroll-spy or navigation logic whenever theactive section changes.No-op if a falsy section ID is provided.

**Kind**: static constant of [<code>navigation/sectionPersistence</code>](#module_navigation/sectionPersistence)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| sectionId | <code>string</code> | ID of the active section to persist. |

<a name="module_navigation/sectionPersistence.loadLastSection"></a>

### navigation/sectionPersistence.loadLastSection ⇒ <code>string</code> \| <code>null</code>
Loads the last persisted section ID for the current page.Returns `null` if no section has been saved for the current route.

**Kind**: static constant of [<code>navigation/sectionPersistence</code>](#module_navigation/sectionPersistence)  
**Returns**: <code>string</code> \| <code>null</code> - Previously saved section ID, if available.  
**Access**: public  
<a name="module_navigation/sectionPersistence..getPageKey"></a>

### navigation/sectionPersistence~getPageKey() ⇒ <code>string</code>
Generates a storage key scoped to the current page pathname.This ensures section state is isolated per route and does not leakacross different pages within the application.

**Kind**: inner method of [<code>navigation/sectionPersistence</code>](#module_navigation/sectionPersistence)  
**Returns**: <code>string</code> - Namespaced sessionStorage key.  
<a name="module_components/navigation"></a>

## components/navigation
Centralized export module for all navigation-related components and helpers. This file serves as a single point of import for all navigation elements across the codebase, promoting modularity and ease of maintenance.Note: When adding new navigation components or helpers, simply import them here and include them in the export statement.

<a name="module_components/navigation..withLazySuspense"></a>

### components/navigation~withLazySuspense(loader, displayName) ⇒ <code>React.ComponentType</code>
Higher-order component that wraps a lazy-loaded component with React's Suspense for code-splitting and performance optimization.HOC to wrap a lazy-loaded component with Suspense.This allows us to keep the benefits of code-splitting while maintaining a clean and consistent import pattern across our navigation components.

**Kind**: inner method of [<code>components/navigation</code>](#module_components/navigation)  
**Returns**: <code>React.ComponentType</code> - - Wrapped component with Suspense.  

| Param | Type | Description |
| --- | --- | --- |
| loader | <code>function</code> | Function that dynamically imports the component. |
| displayName | <code>string</code> | Display name for the wrapped component. |

**Example**  
```jsconst LazyComponent = withLazySuspense(() => import("./MyComponent"), "MyComponent");```
<a name="module_components/MobileSectionNavTrigger"></a>

## components/MobileSectionNavTrigger
Mobile drawer-based section navigation with collapsible subsections.Design:- Section title click → navigate to section- Caret/menu open → expand subsection list- Subsection click → navigate to block- Active state is derived from scroll-spy (passed from parent)This component does NOT manage scroll state.It only reflects and forwards user intent.The parent component (e.g. SectionRenderer) is responsible for:- Tracking scroll position- Determining active section/block IDs- Managing expanded state of sections- Handling actual navigation (e.g. scrollIntoView)

<a name="module_components/MobileSectionNavTrigger..MobileSectionNavTrigger"></a>

### components/MobileSectionNavTrigger~MobileSectionNavTrigger ⇒ <code>JSX.Element</code>
Mobile drawer-based section navigation with collapsible subsections.

**Kind**: inner property of [<code>components/MobileSectionNavTrigger</code>](#module_components/MobileSectionNavTrigger)  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> |  |
| props.title | <code>string</code> | Title displayed in the drawer header. |
| props.sections | <code>Array</code> | List of sections with optional blocks for navigation. |
| props.activeLeafId | <code>string</code> | ID of the currently active block (for highlighting). |
| props.activeChain | <code>Array</code> | List of active section IDs in the current scroll path. |
| props.isExpanded | <code>function</code> | Function to determine if a section's subsections are expanded. |
| props.onToggleSection | <code>function</code> | Callback to toggle a section's expanded state. |
| props.navigate | <code>function</code> | Callback to handle navigation when a section or block is clicked. |

**Example**  
```js<MobileSectionNavTrigger title="Page Navigation"sections={[     { id: "intro", title: "Introduction", blocks: [] },     { id: "features", title: "Features", blocks: [         { id: "feat1", title: "Feature 1" },         { id: "feat2", title: "Feature 2" },       ]     },     { id: "contact", title: "Contact", blocks: [] },  ]}activeLeafId="feat1"activeChain={["features", "feat1"]}isExpanded={(id) => id === "features"}onToggleSection={(id) => console.log("Toggle section", id)}navigate={(e, id) => console.log("Navigate to", id)}/>```
<a name="module_components/SectionAnchorNav"></a>

## components/SectionAnchorNav
A sticky/floating navigation component that uses the fully accessibleAccordionList as its core. Intended for long portfolio pages withmultiple subsections (CodeStream, Hackathon, etc.).Features:- Sticky on desktop, collapsible drawer on mobile- Auto-syncs with scroll position via AccordionList’s IntersectionObserver- Smooth scrolling, keyboard navigation, screen-reader friendly- Midnight Gold frosted UI styling


* [components/SectionAnchorNav](#module_components/SectionAnchorNav)
    * [~SectionAnchorNav](#module_components/SectionAnchorNav..SectionAnchorNav)
    * [~FeatureSection](#module_components/SectionAnchorNav..FeatureSection) : <code>FeatureSection</code>

<a name="module_components/SectionAnchorNav..SectionAnchorNav"></a>

### components/SectionAnchorNav~SectionAnchorNav
A sticky/floating navigation component that uses the fully accessibleAccordionList as its core. Intended for long portfolio pages withmultiple subsections (CodeStream, Hackathon, etc.).Features:- Sticky on desktop, collapsible drawer on mobile- Auto-syncs with scroll position via AccordionList’s IntersectionObserver- Smooth scrolling, keyboard navigation, screen-reader friendly- Midnight Gold frosted UI styling

**Kind**: inner property of [<code>components/SectionAnchorNav</code>](#module_components/SectionAnchorNav)  
**Access**: public  
**Component**:   

| Param | Type |
| --- | --- |
| props | <code>object</code> | 
| props.sections | <code>Array.&lt;FeatureSection&gt;</code> | 
| [props.className] | <code>string</code> | 

<a name="module_components/SectionAnchorNav..FeatureSection"></a>

### components/SectionAnchorNav~FeatureSection : <code>FeatureSection</code>
**Kind**: inner typedef of [<code>components/SectionAnchorNav</code>](#module_components/SectionAnchorNav)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Unique identifier for the section (used for anchors). |
| title | <code>string</code> |  | Display title for the section. |
| [isScroller] | <code>boolean</code> | <code>false</code> | If true, href will be `#id` for scroll behavior; otherwise, use `url`. |
| [url] | <code>string</code> |  | Optional URL for non-scrolling navigation. |

<a name="module_components/StickyNav"></a>

## components/StickyNav
Primary site navigation with synchronized desktop and mobilelayouts, active-route handling, and accessibility semantics.


* [components/StickyNav](#module_components/StickyNav)
    * [~NAV_ITEMS](#module_components/StickyNav..NAV_ITEMS) : <code>Array.&lt;NavItem&gt;</code>
    * [~handleNavClick(e, isActive)](#module_components/StickyNav..handleNavClick) ⇒ <code>void</code>
    * [~StickyNav(props)](#module_components/StickyNav..StickyNav) ⇒ <code>JSX.Element</code>
    * [~NavItem](#module_components/StickyNav..NavItem) : <code>Object</code>

<a name="module_components/StickyNav..NAV_ITEMS"></a>

### components/StickyNav~NAV\_ITEMS : <code>Array.&lt;NavItem&gt;</code>
Centralized definition of all navigable routes used by both desktop andmobile navigation variants.Keeping this data-driven:- Prevents drift between layouts- Ensures consistent ordering and labeling- Makes future additions trivial

**Kind**: inner constant of [<code>components/StickyNav</code>](#module_components/StickyNav)  
<a name="module_components/StickyNav..handleNavClick"></a>

### components/StickyNav~handleNavClick(e, isActive) ⇒ <code>void</code>
Centralized click handler for navigation items that prevents redundantnavigation events when the user clicks on the currently active route.Prevents redundant navigation when clicking the active route.Preserves:- Visual active highlighting- `aria-current="page"` accessibility semantics- While avoiding unnecessary navigation events

**Kind**: inner method of [<code>components/StickyNav</code>](#module_components/StickyNav)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>MouseEvent</code> | Click event. |
| isActive | <code>boolean</code> | Whether the target route is already active. |

**Example**  
```js<Nav.Item   href="/home"   active={activePage === "/home"}   aria-current={activePage === "/home" ? "page" : undefined}   onClick={(e) => handleNavClick(e, activePage === "/home")}>   Home</Nav.Item>```
<a name="module_components/StickyNav..StickyNav"></a>

### components/StickyNav~StickyNav(props) ⇒ <code>JSX.Element</code>
StickyNav------------------------------------------------------------------Primary site navigation component with dual layouts:Desktop layout:- Horizontal icon-based navigation- Icon-only buttons with hover tooltips- Uses the design-system `Btn` and `FrostedIcon` componentsMobile layout:- Burger-triggered RSuite `Drawer`- Vertical, text-based navigation- Touch-friendly and hover-independentShared behavior:- Active route highlighting- `aria-current="page"` for accessibility- Active route suppresses navigation without disabling styles

**Kind**: inner method of [<code>components/StickyNav</code>](#module_components/StickyNav)  
**Returns**: <code>JSX.Element</code> - Rendered sticky navigation.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component props. |
| props.activePage | <code>string</code> | Currently active route. |

<a name="module_components/StickyNav..NavItem"></a>

### components/StickyNav~NavItem : <code>Object</code>
Describes a single navigation entry rendered in both desktop and mobilenavigation variants.

**Kind**: inner typedef of [<code>components/StickyNav</code>](#module_components/StickyNav)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique identifier for the nav item. |
| route | <code>string</code> | Route path used for navigation. |
| label | <code>string</code> | Human-readable navigation label. |
| icon | <code>\*</code> | FontAwesome icon associated with the route. |

<a name="module_components/navigation/StickyNav"></a>

## components/navigation/StickyNav
Tests for the StickyNav component, ensuring it renders correctly and handles interactions as expected.

<a name="module_components/StickySectionNav"></a>

## components/StickySectionNav
Sticky, accessible intra-page section navigator withhierarchical scroll tracking and collapsible subsection groups.

<a name="module_components/StickySectionNav..StickySectionNav"></a>

### components/StickySectionNav~StickySectionNav ⇒ <code>JSX.Element</code>
Sticky, accessible intra-page section navigator withhierarchical scroll tracking and collapsible subsection groups.Designed for long-form portfolio pages with multiple sections and subsections(e.g. CodeStream, Hackathon, etc.).Features:- Sticky on desktop, collapsible drawer on mobile- Auto-syncs with scroll position via IntersectionObserver- Smooth scrolling, keyboard navigation, screen-reader friendly- Midnight Gold frosted UI styling- Data-driven from section/block metadata (no hardcoded IDs or structure)

**Kind**: inner property of [<code>components/StickySectionNav</code>](#module_components/StickySectionNav)  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> |  |
| props.sections | <code>Array</code> | List of sections with optional blocks for navigation. |
| props.pageUrl | <code>string</code> | Base URL for the page (used for updating hash on navigation). |
| props.mode | <code>string</code> | "desktop" or "mobile" to control styling and behavior. |
| props.isOpen | <code>boolean</code> | For mobile mode, whether the drawer is open. |

**Example**  
```js<StickySectionNavsections={[    { id: "intro", title: "Introduction", blocks: [] },    { id: "features", title: "Features", blocks: [      { id: "feat1", title: "Feature 1" },      { id: "feat2", title: "Feature 2" },    ]  },]}pageUrl="/portfolio"mode="desktop"isOpen={true}/>```
<a name="module_tests/components/StickySectionNav"></a>

## tests/components/StickySectionNav
Unit tests for the StickySectionNav component.Test coverage:- Rendering of section navigation links- Active section highlighting via `aria-current="location"`- History hash updates on navigation- Programmatic scroll coordination with scroll-spy logicTesting strategy:- Mocks `useScrollSpyWithHistory` to control active section state- Mocks `window.scrollTo` to prevent actual scrolling- Uses real DOM nodes to simulate anchor targetsArchitectural intent:StickySectionNav is an **intra-page navigation controller**.Tests focus on:- Accessibility semantics- Navigation side effects (history + scroll)- Integration boundaries with the scroll-spy hook


* [tests/components/StickySectionNav](#module_tests/components/StickySectionNav)
    * [~s1](#module_tests/components/StickySectionNav..s1)
    * [~markProgrammaticScroll](#module_tests/components/StickySectionNav..markProgrammaticScroll)

<a name="module_tests/components/StickySectionNav..s1"></a>

### tests/components/StickySectionNav~s1
Ensure target section elements exist in the DOM soscroll and offset calculations can resolve correctly.

**Kind**: inner property of [<code>tests/components/StickySectionNav</code>](#module_tests/components/StickySectionNav)  
<a name="module_tests/components/StickySectionNav..markProgrammaticScroll"></a>

### tests/components/StickySectionNav~markProgrammaticScroll
Mock scroll-spy hook to control active section stateand observe programmatic scroll suppression behavior.

**Kind**: inner constant of [<code>tests/components/StickySectionNav</code>](#module_tests/components/StickySectionNav)  
