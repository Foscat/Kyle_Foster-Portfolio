## Classes

<dl>
<dt><a href="#ErrorBoundary">ErrorBoundary</a></dt>
<dd><h2 id="root-error-boundary">Root Error Boundary</h2>
<p>Prevents the entire app from crashing on runtime errors.
Displays a fallback UI and logs the error for debugging.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#NAV_ITEMS">NAV_ITEMS</a></dt>
<dd><h2 id="navigation-item-configuration">Navigation item configuration</h2>
<p>Centralized definition of all navigable routes used by
both desktop and mobile navigation variants.</p>
<p>Keeping this data-driven prevents drift between layouts
and makes future additions trivial.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#AccordionList">AccordionList(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd></dd>
<dt><a href="#ImageGalleryBlock">ImageGalleryBlock(props)</a> ⇒ <code>JSX.Element</code> | <code>null</code></dt>
<dd><h2 id="imagegalleryblock">ImageGalleryBlock</h2>
<p>Displays a responsive image gallery as a collapsible frosted panel.</p>
<p>Key behaviors:</p>
<ul>
<li>Renders a grid of thumbnails (RSuite FlexboxGrid)</li>
<li>Each image opens a ClickableImg modal viewer</li>
<li>Uses stable React keys (prefers image.id)</li>
</ul>
</dd>
<dt><a href="#LinksBlock">LinksBlock(props)</a> ⇒ <code>JSX.Element</code> | <code>null</code></dt>
<dd><h2 id="linksblock">LinksBlock</h2>
<p>Renders a list of link buttons using the shared UI type system.</p>
<p>This component relies on the global <code>LinkItem</code> typedef defined in
<code>src/types/ui.types.js</code>. Do NOT redeclare or import the type here.</p>
</dd>
<dt><a href="#RichTextBlock">RichTextBlock(props)</a></dt>
<dd><h2 id="richtextblock">RichTextBlock</h2>
<p>Renders a collapsible panel containing one or more paragraphs of rich text.
Designed to be used as a content block within feature sections.</p>
</dd>
<dt><a href="#ClickableImg">ClickableImg(props)</a></dt>
<dd><h2 id="clickableimg--frosted-modal-image-viewer">ClickableImg — Frosted Modal Image Viewer</h2>
<p>A responsive clickable image that expands into a modal
(75–90% viewport height/width) while maintaining aspect ratio.</p>
<p>Features:</p>
<ul>
<li>Optional modal title</li>
<li>Optional caption (beneath thumb + inside modal)</li>
<li>Lazy-loaded thumbnail</li>
<li>Close button (RSuite IconButton + Close icon)</li>
<li>ESC-to-close (handled by RSuite Modal)</li>
<li>Frosted glass modal and image wrapper</li>
<li>Fully responsive scaling using max-width / max-height</li>
</ul>
</dd>
<dt><a href="#Footer">Footer()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Displays contact links and social media icons
using RSuite UI components and a custom
frosted-glass / blurred background aesthetic.</p>
</dd>
<dt><a href="#FrostedIcon">FrostedIcon(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="frostedicon-component">FrostedIcon Component</h2>
<p>A styled wrapper around <FontAwesomeIcon /> that integrates with
your custom Midnight Gold UI theme. Supports:</p>
<ul>
<li>Size variants: xs, sm, md, lg, xl</li>
<li>Variants: primary, secondary, accent, subtle, danger</li>
<li>Hover animations</li>
<li>Clickable mode</li>
<li>Optional label for accessibility</li>
</ul>
</dd>
<dt><a href="#InfoSection">InfoSection(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="infosection-component">InfoSection Component</h2>
<p>A responsive frosted-glass section wrapper used across the
portfolio to standardize section layout, spacing, and visuals.</p>
<p>Features:</p>
<ul>
<li>Optional title &amp; subtitle</li>
<li>Optional Divider under title</li>
<li>Frosted glass Panel for consistent UI</li>
<li>Fully responsive using RSuite Grid system</li>
<li>Accepts any children content</li>
</ul>
</dd>
<dt><a href="#MermaidDiagram">MermaidDiagram(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="mermaiddiagram">MermaidDiagram</h2>
<p>Fully featured Mermaid diagram renderer with:</p>
<ul>
<li>Dark / light theme support</li>
<li>Pan + zoom (mouse + keyboard)</li>
<li>Auto-enabled minimap for large diagrams</li>
<li>Mobile-friendly collapse</li>
<li>PNG export</li>
<li>Accessibility-first keyboard interaction</li>
</ul>
</dd>
<dt><a href="#PageHeader">PageHeader(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="pageheader-component">PageHeader Component</h2>
<p>Standardized page-level header used across the portfolio.
Designed to introduce a section or page with clear hierarchy
and a frosted-glass presentation.</p>
<p>Features:</p>
<ul>
<li>Frosted glass container (RSuite Panel)</li>
<li>Primary title (required)</li>
<li>Optional job title + timespan row</li>
<li>Optional descriptive subtitle</li>
<li>Subtle entrance animation (fade-in)</li>
<li>Fully responsive and layout-safe</li>
</ul>
</dd>
<dt><a href="#ProjectCard">ProjectCard(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>ProjectCard Component
A reusable frosted-glass project display card with optional images,
repo links, and live project URLs. Responsive and animated using pure CSS for portfolio use.</p>
</dd>
<dt><a href="#ResumePreview">ResumePreview()</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="resumepreview">ResumePreview</h2>
<p>Frosted modal that previews and downloads the resume PDF.</p>
<p>Technical notes:</p>
<ul>
<li>PDF is imported as a Vite asset to ensure correct bundling and deployment</li>
<li>Works in local dev, production builds, and on Render</li>
<li>Uses shared modal utility classes defined in App.css</li>
</ul>
<p>Accessibility:</p>
<ul>
<li>RSuite Modal provides focus trap and ESC handling</li>
<li>Buttons include aria-labels and tooltips</li>
</ul>
</dd>
<dt><a href="#SectionAnchorNav">SectionAnchorNav(props)</a></dt>
<dd></dd>
<dt><a href="#SectionRenderer">SectionRenderer(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="sectionrenderer-component">SectionRenderer Component</h2>
<p>Central render orchestrator for a single FeatureSection.</p>
<p>This component is responsible for:</p>
<ul>
<li>Registering the section with the global SectionRegistry
(used by Sticky Section Nav and scroll-spy behavior)</li>
<li>Rendering the section container via InfoSection</li>
<li>Dynamically rendering content blocks based on their <code>BlockType</code></li>
</ul>
<p>The renderer acts as a <strong>data-driven layout engine</strong>, allowing
entire pages to be defined declaratively via JSON-like data
instead of hardcoded JSX.</p>
<p>Supported block types:</p>
<ul>
<li>Rich text content</li>
<li>Image galleries</li>
<li>Link lists</li>
<li>Bulleted / accordion lists</li>
<li>Mermaid diagrams (theme-aware)</li>
</ul>
</dd>
<dt><a href="#handleNavClick">handleNavClick(e, isActive)</a></dt>
<dd><p>Prevent redundant navigation when clicking the active route.</p>
<p>This preserves:</p>
<ul>
<li>visual &quot;active&quot; highlighting</li>
<li>accessibility semantics (aria-current)</li>
<li>while avoiding unnecessary navigation events</li>
</ul>
</dd>
<dt><a href="#StickyNav">StickyNav(props)</a></dt>
<dd><h2 id="stickynav">StickyNav</h2>
<p>Primary site navigation with dual layouts:</p>
<p>Desktop:</p>
<ul>
<li>Horizontal icon-based navigation</li>
<li>Icon-only buttons with hover tooltips</li>
<li>Uses the design-system <Btn> component</li>
</ul>
<p>Mobile:</p>
<ul>
<li>Burger-triggered RSuite Drawer</li>
<li>Vertical text-based navigation</li>
<li>Touch-friendly and hover-independent</li>
</ul>
<p>Shared behavior:</p>
<ul>
<li>Active route highlighting</li>
<li>aria-current=&quot;page&quot; for accessibility</li>
<li>Active route suppresses navigation without disabling styles</li>
</ul>
</dd>
<dt><a href="#StickySectionNav">StickySectionNav(props)</a></dt>
<dd><h2 id="stickysectionnav">StickySectionNav</h2>
<p>Sticky, accessible section navigation that highlights the active section,
syncs with scroll + URL history, and adapts to desktop or mobile layouts.</p>
<p>Features:</p>
<ul>
<li>position: sticky (desktop sidebar)</li>
<li>optional slide-in drawer (mobile)</li>
<li>keyboard navigation (↑ / ↓)</li>
<li>theme-aware active glow (via CSS)</li>
<li>fade / scale / blur motion language</li>
</ul>
</dd>
<dt><a href="#ThemeToggle">ThemeToggle()</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="themetoggle">ThemeToggle</h2>
<p>Compact theme selection control for switching between
light and dark application themes.</p>
<p>Design goals:</p>
<ul>
<li>Minimal footprint (icon-only buttons)</li>
<li>Clear active-state feedback</li>
<li>Accessible via keyboard and screen readers</li>
<li>Consistent with the frosted / glass UI system</li>
</ul>
<p>Behavior:</p>
<ul>
<li>Highlights the currently active theme</li>
<li>Invokes ThemeContext to update global theme state</li>
<li>Does not manage theme persistence directly</li>
</ul>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#BtnProps">BtnProps</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="frosted-glass-button-component">Frosted Glass Button Component</h2>
<p>A unified, accessible, animated button component that conforms
to the portfolio’s Midnight Gold + Frosted UI system.</p>
<p>This enhanced version:</p>
<ul>
<li>Removing all duplicated logic between Button/IconButton</li>
<li>Automatically switches to IconButton when an icon is provided</li>
<li>Enforces aria-label when icon-only (true accessibility)</li>
<li>Supports loading, success, and error visual states</li>
<li>Adds animation presets (&quot;pulse&quot;, &quot;scale&quot;, &quot;fade&quot;)</li>
<li>Supports tooltip via RSuite Whisper</li>
<li>Works as button OR anchor link</li>
</ul>
</dd>
<dt><a href="#FeatureSection">FeatureSection</a> : <code><a href="#FeatureSection">FeatureSection</a></code></dt>
<dd></dd>
</dl>

<a name="ErrorBoundary"></a>

## ErrorBoundary
Root Error Boundary
------------------------------------------------------------
Prevents the entire app from crashing on runtime errors.
Displays a fallback UI and logs the error for debugging.

**Kind**: global class  
<a name="NAV_ITEMS"></a>

## NAV\_ITEMS
Navigation item configuration
------------------------------------------------------------
Centralized definition of all navigable routes used by
both desktop and mobile navigation variants.

Keeping this data-driven prevents drift between layouts
and makes future additions trivial.

**Kind**: global constant  
<a name="AccordionList"></a>

## AccordionList(props) ⇒ <code>JSX.Element</code>
**Kind**: global function  
**Returns**: <code>JSX.Element</code> - A fully accessible, frosted-glass accordion/navigation component.

-----------------------------------------------------------------------
EXAMPLE USAGE
-----------------------------------------------------------------------
<AccordionList
  title="Sections"
  variant="dark"
  items={[
    {
      id: "editor",
      isScroller: true,
      icon: faCode,
      title: "3-Panel Editor",
      text: "Details about the editor system..."
    },
    {
      id: "organizations",
      isScroller: true,
      icon: faPeopleGroup,
      title: "Organizations",
      text: "How orgs and licenses work..."
    }
  ]}
/>

-----------------------------------------------------------------------
NOTES
-----------------------------------------------------------------------
• Designed to integrate with Sticky Section Nav for a unified navigation system
• Automatically syncs open item with page scroll position
• Accessible to screen readers and keyboard-only users
• Uses RSuite's <Accordion> but replaces all header behavior with custom ARIA logic  
**Component**: AccordionList
=======================================================================
A highly-interactive, keyboard-navigable, frosted-glass accordion list
designed for documentation pages, feature navigation, and section-based
scrolling. Fully compatible with RSuite v5 and follows WAI-ARIA
Authoring Practices for `role="tree"`.

-----------------------------------------------------------------------
KEY FEATURES
-----------------------------------------------------------------------
• Frosted-glass RSuite-styled wrapper (`Panel`)
• Optional accordion behavior for collapsible sections
• Full keyboard navigation with roving tabindex:
     ↑ / ↓     → move between treeitems
     ←         → collapse current item
     →         → expand current item
     Home / End → jump to first or last item
     Enter/Space → toggle open/close or scroll to section

• Screen-reader announcements via `aria-live`
• Auto-highlight based on scroll position using IntersectionObserver
• Auto-scroll the active item into view (centered)
• Clickable navigation links when `item.isScroller === true`
• Works seamlessly with Sticky Section Nav
• Supports icons using <FrostedIcon>

-----------------------------------------------------------------------
ACCESSIBILITY IMPLEMENTATION
-----------------------------------------------------------------------
• `role="tree"` on container
• Each header uses:
     role="treeitem"
     aria-posinset         (1-based index)
     aria-setsize          (total visible items)
     aria-expanded         (open/closed state)
     aria-controls         (ID of associated panel)

• Panels use:
     role="group"
     aria-labelledby       (header reference)

• All keyboard interactions follow WAI-ARIA TreeView pattern
• Focus controlled via roving tabindex (only one tabbable item)

-----------------------------------------------------------------------
PROPS
-----------------------------------------------------------------------  
**Component**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>object</code> |  |  |
| [props.title] | <code>string</code> |  | Optional title displayed in the RSuite Panel header. |
| props.items | <code>Array.&lt;object&gt;</code> |  | A list of accordion/nav sections.    Each item may include: |
| items[].id | <code>string</code> |  | DOM id of the section on the page (required for scrolling). |
| [items[].icon] | <code>string</code> |  | Icon name passed to <FrostedIcon />. |
| items[].title | <code>string</code> |  | Display name of the section. |
| [items[].text] | <code>string</code> \| <code>JSX.Element</code> |  | Optional content shown when expanded (accordion mode only). |
| items[].[url]} | <code>string</code> |  | Optional URL to navigate to wwhen button is clicked. |
| [props.accordion] | <code>boolean</code> | <code>true</code> | Enables collapsible panels.    If false, acts purely as a nav list with no expand/collapse. |
| [props.variant] | <code>&quot;dark&quot;</code> \| <code>&quot;light&quot;</code> | <code>&quot;dark&quot;</code> | UI color scheme variant matching the global portfolio UI. |
| [props.className] | <code>string</code> |  | Additional CSS classes for the wrapper. |
| [props.bordered] | <code>boolean</code> | <code>false</code> | Whether the outer Panel should show RSuite borders. ----------------------------------------------------------------------- RETURN ----------------------------------------------------------------------- |


* [AccordionList(props)](#AccordionList) ⇒ <code>JSX.Element</code>
    * [~focusHeader()](#AccordionList..focusHeader)
    * [~scrollTo()](#AccordionList..scrollTo)
    * [~togglePanel()](#AccordionList..togglePanel)
    * [~moveFocus()](#AccordionList..moveFocus)
    * [~handleKeyDown()](#AccordionList..handleKeyDown)

<a name="AccordionList..focusHeader"></a>

### AccordionList~focusHeader()
Helper: focus a header by index

**Kind**: inner method of [<code>AccordionList</code>](#AccordionList)  
<a name="AccordionList..scrollTo"></a>

### AccordionList~scrollTo()
Smooth scroll to section ID in the page

**Kind**: inner method of [<code>AccordionList</code>](#AccordionList)  
<a name="AccordionList..togglePanel"></a>

### AccordionList~togglePanel()
Toggle accordion panel open/closed

**Kind**: inner method of [<code>AccordionList</code>](#AccordionList)  
<a name="AccordionList..moveFocus"></a>

### AccordionList~moveFocus()
Move keyboard focus up/down

**Kind**: inner method of [<code>AccordionList</code>](#AccordionList)  
<a name="AccordionList..handleKeyDown"></a>

### AccordionList~handleKeyDown()
Keyboard handler for each header

**Kind**: inner method of [<code>AccordionList</code>](#AccordionList)  
<a name="ImageGalleryBlock"></a>

## ImageGalleryBlock(props) ⇒ <code>JSX.Element</code> \| <code>null</code>
ImageGalleryBlock
---------------------------------------------------------------------------
Displays a responsive image gallery as a collapsible frosted panel.

Key behaviors:
- Renders a grid of thumbnails (RSuite FlexboxGrid)
- Each image opens a ClickableImg modal viewer
- Uses stable React keys (prefers image.id)

**Kind**: global function  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> |  |
| [props.title] | <code>string</code> | Optional panel header title. |
| props.images | <code>Array.&lt;FeatureImage&gt;</code> | Image definitions to render. |

<a name="LinksBlock"></a>

## LinksBlock(props) ⇒ <code>JSX.Element</code> \| <code>null</code>
LinksBlock
---------------------------------------------------------------------------
Renders a list of link buttons using the shared UI type system.

This component relies on the global `LinkItem` typedef defined in
`src/types/ui.types.js`. Do NOT redeclare or import the type here.

**Kind**: global function  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> |  |
| props.links | <code>Array.&lt;LinkItem&gt;</code> | List of links to render. |

**Example**  
```jsx
<LinksBlock
  links={[
    { title: "GitHub", url: "https://github.com", icon: "github" }
  ]}
/>
```
<a name="RichTextBlock"></a>

## RichTextBlock(props)
RichTextBlock
---------------------------------------------------------------------------
Renders a collapsible panel containing one or more paragraphs of rich text.
Designed to be used as a content block within feature sections.

**Kind**: global function  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> |  |
| [props.title] | <code>string</code> | Optional heading displayed in the panel header. |
| props.paragraphs | <code>Array.&lt;string&gt;</code> | Paragraph text content to render. |

<a name="ClickableImg"></a>

## ClickableImg(props)
ClickableImg — Frosted Modal Image Viewer
------------------------------------------------------------
A responsive clickable image that expands into a modal
(75–90% viewport height/width) while maintaining aspect ratio.

Features:
- Optional modal title
- Optional caption (beneath thumb + inside modal)
- Lazy-loaded thumbnail
- Close button (RSuite IconButton + Close icon)
- ESC-to-close (handled by RSuite Modal)
- Frosted glass modal and image wrapper
- Fully responsive scaling using max-width / max-height

**Kind**: global function  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> |  |
| props.src | <code>string</code> | Image source URL. |
| props.alt | <code>string</code> | Alt text for accessibility. |
| [props.ariaLabel] | <code>string</code> | Aria-label for accessibility. |
| [props.className] | <code>string</code> | Additional CSS classes for thumbnail. |
| [props.title] | <code>string</code> | Optional modal header title. |
| [props.caption] | <code>string</code> | Optional caption below image. |

<a name="Footer"></a>

## Footer() ⇒ <code>JSX.Element</code>
Displays contact links and social media icons
using RSuite UI components and a custom
frosted-glass / blurred background aesthetic.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The rendered footer  
**Component**:   
<a name="FrostedIcon"></a>

## FrostedIcon(props) ⇒ <code>JSX.Element</code>
FrostedIcon Component
------------------------------------------------------------
A styled wrapper around <FontAwesomeIcon /> that integrates with
your custom Midnight Gold UI theme. Supports:

 - Size variants: xs, sm, md, lg, xl
 - Variants: primary, secondary, accent, subtle, danger
 - Hover animations
 - Clickable mode
 - Optional label for accessibility

**Kind**: global function  
**Component**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>object</code> |  |  |
| props.icon | <code>string</code> |  | FontAwesome icon definition. |
| [props.size] | <code>Size</code> | <code>&quot;md&quot;</code> | Icon size (xs|sm|md|lg|xl). |
| [props.variant] | <code>string</code> | <code>&quot;\&quot;primary\&quot;&quot;</code> | Color style. |
| [props.clickable] | <code>boolean</code> | <code>false</code> | Enables hover/click effects. |
| [props.className] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | Additional classes. |
| [props.loading] | <code>boolean</code> | <code>false</code> | Content loading state |
| [props.ariaLabel] | <code>string</code> |  | For accessibility (aria-label). |
| [props.tooltip] | <code>string</code> |  | Optional tooltip info on hover |
| [props.noBG] | <code>boolean</code> | <code>false</code> | Disable background circle |
| [props.onClick] | <code>function</code> | <code>()&#x3D;&gt;{}</code> | Click handler |

<a name="InfoSection"></a>

## InfoSection(props) ⇒ <code>JSX.Element</code>
InfoSection Component
------------------------------------------------------------
A responsive frosted-glass section wrapper used across the
portfolio to standardize section layout, spacing, and visuals.

Features:
- Optional title & subtitle
- Optional Divider under title
- Frosted glass Panel for consistent UI
- Fully responsive using RSuite Grid system
- Accepts any children content

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - A polished, reusable content section.  
**Component**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>object</code> |  |  |
| [props.title] | <code>string</code> |  | Title displayed at the top of the section. |
| [props.subtitle] | <code>string</code> |  | Optional subtitle under the main title. |
| [props.dividerAfter] | <code>boolean</code> | <code>false</code> | Whether to show a divider. |
| [props.icon] | <code>string</code> |  | Icon to show at top of information section |
| [props.className] | <code>string</code> |  | Extra CSS classes. |
| [props.id] | <code>string</code> |  | Id of section for section scrolling |
| props.children | <code>React.ReactNode</code> |  | The content inside the section. |

<a name="MermaidDiagram"></a>

## MermaidDiagram(props) ⇒ <code>JSX.Element</code>
MermaidDiagram
---------------------------------------------------------------------------
Fully featured Mermaid diagram renderer with:
- Dark / light theme support
- Pan + zoom (mouse + keyboard)
- Auto-enabled minimap for large diagrams
- Mobile-friendly collapse
- PNG export
- Accessibility-first keyboard interaction

**Kind**: global function  
**Component**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>object</code> |  |  |
| props.diagram | <code>string</code> |  | Mermaid diagram source |
| [props.title] | <code>string</code> |  |  |
| [props.description] | <code>string</code> |  |  |
| [props.theme] | <code>&quot;dark&quot;</code> \| <code>&quot;light&quot;</code> | <code>&quot;dark&quot;</code> |  |
| [props.collapsible] | <code>boolean</code> | <code>false</code> |  |
| [props.className] | <code>string</code> |  |  |

<a name="PageHeader"></a>

## PageHeader(props) ⇒ <code>JSX.Element</code>
PageHeader Component
------------------------------------------------------------
Standardized page-level header used across the portfolio.
Designed to introduce a section or page with clear hierarchy
and a frosted-glass presentation.

Features:
- Frosted glass container (RSuite Panel)
- Primary title (required)
- Optional job title + timespan row
- Optional descriptive subtitle
- Subtle entrance animation (fade-in)
- Fully responsive and layout-safe

**Kind**: global function  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> |  |
| props.title | <code>string</code> | Main page title. |
| [props.jobTitle] | <code>string</code> | Role or position title. |
| [props.timespan] | <code>string</code> | Date range or duration. |
| [props.subTitle] | <code>string</code> | Supporting descriptive text. |
| [props.tech] | <code>Array.&lt;string&gt;</code> | List of technologies used. |
| [props.className] | <code>string</code> | Optional additional CSS classes. |

<a name="PageHeader..renderTechUsedString"></a>

### PageHeader~renderTechUsedString([techArray]) ⇒ <code>React.Component</code>
Formats an array of technology names into a human-readable string.

Example:
  ["React", "Node", "MongoDB"]
  → "Tech Used: React, Node, MongoDB"

**Kind**: inner method of [<code>PageHeader</code>](#PageHeader)  
**Returns**: <code>React.Component</code> - A formatted display string or an empty string if no technologies are provided.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [techArray] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | List of technologies used. |

<a name="ProjectCard"></a>

## ProjectCard(props) ⇒ <code>JSX.Element</code>
ProjectCard Component
A reusable frosted-glass project display card with optional images,
repo links, and live project URLs. Responsive and animated using pure CSS for portfolio use.

**Kind**: global function  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> |  |
| props.title | <code>string</code> | Project title |
| props.description | <code>string</code> | Main description text |
| props.images | <code>Array.&lt;object&gt;</code> | Array of image objects {src, alt, title, description} |
| [props.repo] | <code>string</code> \| <code>undefined</code> | GitHub repo link |
| [props.url] | <code>string</code> \| <code>undefined</code> | Live project link |

<a name="ResumePreview"></a>

## ResumePreview() ⇒ <code>JSX.Element</code>
ResumePreview
---------------------------------------------------------------------------
Frosted modal that previews and downloads the resume PDF.

Technical notes:
- PDF is imported as a Vite asset to ensure correct bundling and deployment
- Works in local dev, production builds, and on Render
- Uses shared modal utility classes defined in App.css

Accessibility:
- RSuite Modal provides focus trap and ESC handling
- Buttons include aria-labels and tooltips

**Kind**: global function  
**Component**:   
<a name="SectionAnchorNav"></a>

## SectionAnchorNav(props)
**Kind**: global function  
**Component**: SectionAnchorNav
---------------------------------------------------------------------
A sticky/floating navigation component that uses the fully accessible
AccordionList as its core. Intended for long portfolio pages with
multiple subsections (CodeStream, Hackathon, etc.).

Features:
- Sticky on desktop, collapsible drawer on mobile
- Auto-syncs with scroll position via AccordionList’s IntersectionObserver
- Smooth scrolling, keyboard navigation, screen-reader friendly
- Midnight Gold frosted UI styling  

| Param | Type |
| --- | --- |
| props | <code>object</code> | 
| props.sections | [<code>Array.&lt;FeatureSection&gt;</code>](#FeatureSection) | 
| [props.className] | <code>string</code> | 

<a name="SectionRenderer"></a>

## SectionRenderer(props) ⇒ <code>JSX.Element</code>
SectionRenderer Component
--------------------------------------------------------------------
Central render orchestrator for a single FeatureSection.

This component is responsible for:
- Registering the section with the global SectionRegistry
  (used by Sticky Section Nav and scroll-spy behavior)
- Rendering the section container via InfoSection
- Dynamically rendering content blocks based on their `BlockType`

The renderer acts as a **data-driven layout engine**, allowing
entire pages to be defined declaratively via JSON-like data
instead of hardcoded JSX.

Supported block types:
- Rich text content
- Image galleries
- Link lists
- Bulleted / accordion lists
- Mermaid diagrams (theme-aware)

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - A rendered, scroll-registered, frosted-glass section.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> |  |
| props.section | [<code>FeatureSection</code>](#FeatureSection) | A fully-defined section descriptor containing metadata   (id, title, subtitle, icon) and an ordered list of blocks. |

**Example**  
```js
<SectionRenderer
  section={{
    id: "projects",
    title: "Projects",
    content: [...]
  }}
/>
```
<a name="handleNavClick"></a>

## handleNavClick(e, isActive)
Prevent redundant navigation when clicking the active route.

This preserves:
- visual "active" highlighting
- accessibility semantics (aria-current)
- while avoiding unnecessary navigation events

**Kind**: global function  

| Param | Type |
| --- | --- |
| e | <code>MouseEvent</code> | 
| isActive | <code>boolean</code> | 

<a name="StickyNav"></a>

## StickyNav(props)
StickyNav
------------------------------------------------------------------
Primary site navigation with dual layouts:

Desktop:
- Horizontal icon-based navigation
- Icon-only buttons with hover tooltips
- Uses the design-system <Btn> component

Mobile:
- Burger-triggered RSuite Drawer
- Vertical text-based navigation
- Touch-friendly and hover-independent

Shared behavior:
- Active route highlighting
- aria-current="page" for accessibility
- Active route suppresses navigation without disabling styles

**Kind**: global function  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> |  |
| props.activePage | <code>string</code> | Currently active route |

<a name="StickySectionNav"></a>

## StickySectionNav(props)
StickySectionNav
---------------------------------------------------------------------------
Sticky, accessible section navigation that highlights the active section,
syncs with scroll + URL history, and adapts to desktop or mobile layouts.

Features:
- position: sticky (desktop sidebar)
- optional slide-in drawer (mobile)
- keyboard navigation (↑ / ↓)
- theme-aware active glow (via CSS)
- fade / scale / blur motion language

**Kind**: global function  
**Component**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  |  |
| props.sections | <code>Array.&lt;{id: string, title: string}&gt;</code> |  |  |
| [props.mode] | <code>&quot;desktop&quot;</code> \| <code>&quot;mobile&quot;</code> | <code>&quot;desktop&quot;</code> |  |
| [props.pageUrl] | <code>string</code> | <code>&quot;\&quot;/\&quot;&quot;</code> |  |
| [props.isOpen] | <code>boolean</code> |  | Used for mobile drawer mode |

<a name="ThemeToggle"></a>

## ThemeToggle() ⇒ <code>JSX.Element</code>
ThemeToggle
------------------------------------------------------------------
Compact theme selection control for switching between
light and dark application themes.

Design goals:
- Minimal footprint (icon-only buttons)
- Clear active-state feedback
- Accessible via keyboard and screen readers
- Consistent with the frosted / glass UI system

Behavior:
- Highlights the currently active theme
- Invokes ThemeContext to update global theme state
- Does not manage theme persistence directly

**Kind**: global function  
**Component**:   
<a name="BtnProps"></a>

## BtnProps ⇒ <code>JSX.Element</code>
Frosted Glass Button Component
------------------------------------------------------------------
A unified, accessible, animated button component that conforms
to the portfolio’s Midnight Gold + Frosted UI system.

This enhanced version:
- Removing all duplicated logic between Button/IconButton
- Automatically switches to IconButton when an icon is provided
- Enforces aria-label when icon-only (true accessibility)
- Supports loading, success, and error visual states
- Adds animation presets ("pulse", "scale", "fade")
- Supports tooltip via RSuite Whisper
- Works as button OR anchor link

**Kind**: global typedef  
**Component**:   
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [variant] | <code>Variant</code> | <code>&quot;primary&quot;</code> | UI color scheme aligned with frosted theme. |
| [size] | <code>Size</code> | <code>&quot;md&quot;</code> | RSuite size variant. |
| [disabled] | <code>boolean</code> | <code>false</code> | Prevents interaction and dims the button. |
| [loading] | <code>boolean</code> | <code>false</code> | Shows a loading indicator and prevents clicks. |
| [text] | <code>string</code> |  | Text label displayed inside the button. |
| [icon] | <code>string</code> |  | FontAwesome icon name. If provided, renders an IconButton. |
| [ariaLabel] | <code>string</code> |  | Required when the button is icon-only (no text). |
| [onClick] | <code>function</code> |  | Button click handler. |
| [href] | <code>string</code> |  | Converts button into a link. |
| [hrefLocal] | <code>boolean</code> | <code>false</code> |  |
| [target] | <code>string</code> |  | Anchor target value ("_blank", etc.) |
| [rel] | <code>string</code> |  | Anchor rel attribute. |
| [tooltip] | <code>string</code> |  | Tooltip label shown on hover. |
| [animation] | <code>&quot;none&quot;</code> \| <code>&quot;pulse&quot;</code> \| <code>&quot;scale&quot;</code> \| <code>&quot;fade&quot;</code> | <code>&quot;none&quot;</code> | Optional animation preset applied on hover. |
| [className] | <code>string</code> |  | Additional custom styles. |

<a name="FeatureSection"></a>

## FeatureSection : [<code>FeatureSection</code>](#FeatureSection)
**Kind**: global typedef  
