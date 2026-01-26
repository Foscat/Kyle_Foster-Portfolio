## Modules

<dl>
<dt><a href="#module_tests/components/AccordionList">tests/components/AccordionList</a></dt>
<dd><p>Unit tests for the AccordionList component.</p>
<p>Test coverage:</p>
<ul>
<li>Basic rendering of panel and item titles</li>
<li>Accordion expand / collapse behavior</li>
<li>Keyboard interaction (Enter / Space)</li>
<li>Scroll-to-section behavior for <code>isScroller</code> items</li>
<li>Accessibility roles and screen-reader live region updates</li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Uses <code>renderWithProviders</code> to ensure context parity with the app</li>
<li>Uses <code>@testing-library/user-event</code> for realistic interaction simulation</li>
<li>Avoids testing implementation details; focuses on observable behavior</li>
</ul>
</dd>
<dt><a href="#module_components/AccordionList">components/AccordionList</a></dt>
<dd><p>Fully accessible, keyboard-navigable accordion and section
navigation component with frosted-glass styling.</p>
</dd>
<dt><a href="#module_components/blocks/ImageGalleryBlock">components/blocks/ImageGalleryBlock</a></dt>
<dd><p>Renders a responsive image gallery inside a collapsible,
frosted-style panel.</p>
</dd>
<dt><a href="#module_tests/components/blocks/ImageGalleryBlock">tests/components/blocks/ImageGalleryBlock</a></dt>
<dd><p>Unit tests for the ImageGalleryBlock component.</p>
<p>Testing focus:</p>
<ul>
<li>Defensive rendering behavior when image data is missing or invalid</li>
<li>Basic thumbnail rendering with correct accessibility attributes</li>
</ul>
<p>Design intent:
This block is intentionally simple and defensive. Tests verify that:</p>
<ul>
<li>The component fails silently when no images are provided</li>
<li>Valid image data renders accessible <code>&lt;img&gt;</code> elements</li>
</ul>
</dd>
<dt><a href="#module_components/blocks/LinksBlock">components/blocks/LinksBlock</a></dt>
<dd><p>Renders a list of link buttons inside a collapsible frosted panel.</p>
</dd>
<dt><a href="#module_tests/components/blocks/LinksBlock">tests/components/blocks/LinksBlock</a></dt>
<dd><p>Unit tests for the LinksBlock component.</p>
<p>Testing focus:</p>
<ul>
<li>Defensive rendering behavior when link data is missing</li>
<li>Correct rendering of anchor elements with expected attributes</li>
</ul>
<p>Design intent:
LinksBlock is intentionally minimal and data-driven.
These tests ensure it:</p>
<ul>
<li>Fails silently when provided with invalid input</li>
<li>Renders accessible anchor elements when valid data is supplied</li>
</ul>
</dd>
<dt><a href="#module_components/blocks/RichTextBlock">components/blocks/RichTextBlock</a></dt>
<dd><p>Renders a collapsible frosted panel containing one or more
paragraphs of rich text content.</p>
</dd>
<dt><a href="#module_tests/components/blocks/RichTextBlock">tests/components/blocks/RichTextBlock</a></dt>
<dd><p>Unit tests for the RichTextBlock component.</p>
<p>Testing focus:</p>
<ul>
<li>Defensive rendering behavior when content is missing or invalid</li>
<li>Correct rendering of markdown content into semantic HTML</li>
</ul>
<p>Design intent:
RichTextBlock is expected to be tolerant of missing data while still
correctly rendering valid markdown input.</p>
</dd>
<dt><a href="#module_tests/components/Btn">tests/components/Btn</a></dt>
<dd><p>Unit tests for the <code>Btn</code> (Frosted Glass Button) component.</p>
<p>Test coverage:</p>
<ul>
<li>Basic rendering and text output</li>
<li>Default variant and size behavior</li>
<li>Variant and size overrides</li>
<li>Click interaction and disabled behavior</li>
<li>Loading state behavior</li>
<li>Icon-only button behavior and accessibility enforcement</li>
</ul>
<p>Design intent:
These tests ensure <code>Btn</code> behaves as a robust, accessible abstraction
over RSuite Button / IconButton, enforcing:</p>
<ul>
<li>Predictable defaults</li>
<li>Safe async interaction</li>
<li>Strict accessibility guarantees for icon-only usage</li>
</ul>
</dd>
<dt><a href="#module_components/Btn">components/Btn</a></dt>
<dd><p>Unified frosted-glass button component implementing the
Midnight Gold UI system with accessibility, animation, async handling,
and controlled prop passthrough to RSuite and FontAwesome.</p>
</dd>
<dt><a href="#module_tests/components/ClickableImg">tests/components/ClickableImg</a></dt>
<dd><p>Unit tests for the ClickableImg component.</p>
<p>Test coverage:</p>
<ul>
<li>Thumbnail image rendering</li>
<li>Optional caption rendering</li>
<li>Modal open and close behavior</li>
<li>Expanded image rendering</li>
<li>Keyboard interaction (Escape key)</li>
<li>Accessibility attributes and aria-label handling</li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Uses <code>@testing-library/user-event</code> to simulate real user interactions</li>
<li>Verifies RSuite Modal behavior via <code>role=&quot;dialog&quot;</code></li>
<li>Avoids snapshots in favor of semantic queries</li>
</ul>
</dd>
<dt><a href="#module_components/ClickableImg">components/ClickableImg</a></dt>
<dd><p>Clickable image component that expands into a frosted
modal viewer while preserving aspect ratio and accessibility.</p>
</dd>
<dt><a href="#module_tests/components/ErrorBoundary">tests/components/ErrorBoundary</a></dt>
<dd><p>Unit tests for the ErrorBoundary component.</p>
<p>Test coverage:</p>
<ul>
<li>Normal child rendering when no error occurs</li>
<li>Error capture from descendant components</li>
<li>Rendering of fallback UI</li>
<li>Display of captured error messages</li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Uses a deliberately crashing child component to simulate runtime failures</li>
<li>Silences expected React error logs to keep test output clean</li>
<li>Verifies user-facing fallback behavior rather than internal state</li>
</ul>
</dd>
<dt><a href="#module_components/ErrorBoundary">components/ErrorBoundary</a></dt>
<dd><p>Root-level React Error Boundary used to catch and handle
unrecoverable runtime errors without crashing the entire application.</p>
</dd>
<dt><a href="#module_tests/components/Footer">tests/components/Footer</a></dt>
<dd><p>Unit tests for the Footer component.</p>
<p>Test coverage:</p>
<ul>
<li>Static contact information rendering</li>
<li>Dynamic year display</li>
<li>External social link rendering</li>
<li>Clipboard interaction for phone number copying</li>
<li>Toast notification trigger paths</li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Mocks Btn to avoid UI coupling</li>
<li>Mocks useClipboard hook (logic tested independently)</li>
<li>Mocks RSuite toaster to avoid side effects</li>
</ul>
<p>Philosophy:</p>
<ul>
<li>Tests user-visible behavior only</li>
<li>Avoids asserting RSuite internals or toast implementation details</li>
</ul>
</dd>
<dt><a href="#module_components/Footer">components/Footer</a></dt>
<dd><p>Application footer displaying contact information,
social links, and supporting utilities such as clipboard feedback.</p>
</dd>
<dt><a href="#module_tests/components/FrostedIcon">tests/components/FrostedIcon</a></dt>
<dd><p>Unit tests for the FrostedIcon component.</p>
<p>Testing focus:</p>
<ul>
<li>Semantic role switching based on <code>clickable</code> prop</li>
<li>Size-related CSS class application</li>
<li>Loading state accessibility signaling</li>
</ul>
<p>Design intent:
FrostedIcon is a low-level visual primitive that must:</p>
<ul>
<li>Render correct semantic roles (<code>img</code> vs <code>button</code>)</li>
<li>Expose loading state via <code>aria-busy</code></li>
<li>Apply predictable, size-based CSS classes</li>
</ul>
<p>These tests validate observable DOM behavior rather than internal logic.</p>
</dd>
<dt><a href="#module_components/FrostedIcon">components/FrostedIcon</a></dt>
<dd><p>Styled FontAwesome icon component integrated with the
Midnight Gold frosted UI system.</p>
</dd>
<dt><a href="#module_components/Head">components/Head</a></dt>
<dd><p>Centralized document head manager responsible for injecting
SEO, metadata, and social sharing tags based on the current route.</p>
</dd>
<dt><a href="#module_components/Health">components/Health</a></dt>
<dd><p>Lightweight diagnostic component that displays basic
runtime and build environment information.</p>
</dd>
<dt><a href="#module_components/InfoSection">components/InfoSection</a></dt>
<dd><p>Reusable frosted-glass section wrapper used to standardize
layout, spacing, and visual hierarchy across the portfolio.</p>
</dd>
<dt><a href="#module_tests/components/InfoSection">tests/components/InfoSection</a></dt>
<dd><p>Unit tests for the InfoSection layout component.</p>
<p>Testing focus:</p>
<ul>
<li>Correct semantic wrapper element (<code>section</code>)</li>
<li>Proper application of root classes and IDs</li>
<li>Conditional rendering of title, subtitle, and icon</li>
<li>Transparent rendering of child content</li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Mocks RSuite Panel to reduce surface area and DOM complexity</li>
<li>Mocks FrostedIcon to avoid FontAwesome rendering concerns</li>
<li>Focuses on layout and composition, not styling details</li>
</ul>
</dd>
<dt><a href="#module_components/MermaidDiagram">components/MermaidDiagram</a></dt>
<dd><p>Advanced Mermaid diagram renderer with theming, accessibility,
responsive layout, and PNG export support.</p>
</dd>
<dt><a href="#module_components/PageHeader">components/PageHeader</a></dt>
<dd><p>Standardized page-level header component used to introduce
pages and major sections with consistent hierarchy and styling.</p>
</dd>
<dt><a href="#module_tests/components/PageHeader">tests/components/PageHeader</a></dt>
<dd><p>Unit tests for the PageHeader component.</p>
<p>Test coverage:</p>
<ul>
<li>Required title rendering</li>
<li>Optional jobTitle + timespan row composition</li>
<li>Optional subtitle rendering</li>
<li>Semantic role (<code>banner</code>) for accessibility</li>
<li>Root className passthrough</li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Mocks RSuite Panel and FlexboxGrid as minimal layout primitives</li>
<li>Focuses on semantic output and composition logic</li>
<li>Avoids coupling to RSuite layout implementation details</li>
</ul>
</dd>
<dt><a href="#module_components/ProjectCard">components/ProjectCard</a></dt>
<dd><p>Reusable frosted-glass project display card used to present
portfolio projects with images, repository links, and live URLs.</p>
</dd>
<dt><a href="#module_components/ResumePreview">components/ResumePreview</a></dt>
<dd><p>Modal-based resume preview and download component.</p>
</dd>
<dt><a href="#module_tests/components/ResumePreview">tests/components/ResumePreview</a></dt>
<dd><p>Unit tests for the ResumePreview component.</p>
<p>Test coverage:</p>
<ul>
<li>Rendering of the resume preview trigger button</li>
<li>Modal open behavior when the trigger is activated</li>
<li>Rendering of the embedded resume iframe</li>
<li>Modal close behavior via explicit user action</li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Mocks Btn to a minimal native button to isolate behavior</li>
<li>Mocks RSuite Modal components to semantic HTML elements</li>
<li>Avoids testing RSuite internals or styling</li>
</ul>
</dd>
<dt><a href="#module_components/SectionRenderer">components/SectionRenderer</a></dt>
<dd><p>Central render orchestrator for feature sections composed of
declarative content blocks.</p>
</dd>
<dt><a href="#module_tests/components/SectionRenderer">tests/components/SectionRenderer</a></dt>
<dd><p>Unit tests for the SectionRenderer component.</p>
<p>Test coverage:</p>
<ul>
<li>Section registry registration on mount</li>
<li>Section registry cleanup on unmount</li>
<li>Delegation to InfoSection for layout</li>
<li>Block-type dispatching to the correct child renderer</li>
<li>Defensive fallback rendering for unknown block types</li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Mocks all child renderers to isolate dispatch logic</li>
<li>Mocks SectionRegistry to observe registration side effects</li>
<li>Avoids testing block rendering internals (covered elsewhere)</li>
</ul>
<p>Architectural intent:
SectionRenderer is treated as a <strong>render orchestrator</strong>, not a
content renderer. Tests focus on delegation, ordering, and
defensive behavior rather than DOM structure.</p>
</dd>
<dt><a href="#module_components/StickyNav">components/StickyNav</a></dt>
<dd><p>Primary site navigation with synchronized desktop and mobile
layouts, active-route handling, and accessibility semantics.</p>
</dd>
<dt><a href="#module_tests/components/StickyNav">tests/components/StickyNav</a></dt>
<dd><p>Unit tests for the StickyNav component.</p>
<p>Test coverage:</p>
<ul>
<li>Desktop navigation rendering</li>
<li>Active route highlighting via <code>aria-current</code></li>
<li>Mobile menu toggle behavior</li>
<li>External link rendering</li>
<li>ThemeToggle delegation</li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Mocks RSuite navigation primitives to isolate behavior</li>
<li>Mocks Btn, FrostedIcon, and ThemeToggle to avoid UI coupling</li>
<li>Focuses on observable navigation behavior, not layout or styling</li>
</ul>
</dd>
<dt><a href="#module_components/StickySectionNav">components/StickySectionNav</a></dt>
<dd><p>Sticky, accessible intra-page section navigator that tracks
scroll position, updates URL hash state, and highlights the active section.</p>
</dd>
<dt><a href="#module_components/ThemeToggle">components/ThemeToggle</a></dt>
<dd><p>Compact theme selection control for switching between
light and dark application themes.</p>
</dd>
<dt><a href="#module_tests/components/ThemeToggle">tests/components/ThemeToggle</a></dt>
<dd><p>Unit tests for the ThemeToggle component.</p>
<p>Testing focus:</p>
<ul>
<li>Rendering of both light and dark theme toggle buttons</li>
<li>Theme state transitions when toggles are activated</li>
<li>Presence of accessible button labels</li>
</ul>
<p>Testing philosophy:</p>
<ul>
<li>Verifies observable behavior only</li>
<li>Avoids asserting internal DOM structure or RSuite implementation details</li>
<li>Treats theme state as a global side effect via <code>data-theme</code></li>
</ul>
</dd>
<dt><a href="#module_components/blocks">components/blocks</a></dt>
<dd><p>Central export barrel for content block components used by
the SectionRenderer system.</p>
<p>Each exported block is responsible for rendering a specific content type
defined by the page or section configuration.</p>
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

## Functions

<dl>
<dt><a href="#SectionAnchorNav">SectionAnchorNav(props)</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#FeatureSection">FeatureSection</a> : <code><a href="#FeatureSection">FeatureSection</a></code></dt>
<dd></dd>
</dl>

<a name="module_tests/components/AccordionList"></a>

## tests/components/AccordionList

Unit tests for the AccordionList component.

Test coverage:

- Basic rendering of panel and item titles
- Accordion expand / collapse behavior
- Keyboard interaction (Enter / Space)
- Scroll-to-section behavior for `isScroller` items
- Accessibility roles and screen-reader live region updates

Testing strategy:

- Uses `renderWithProviders` to ensure context parity with the app
- Uses `@testing-library/user-event` for realistic interaction simulation
- Avoids testing implementation details; focuses on observable behavior

<a name="module_components/AccordionList"></a>

## components/AccordionList

Fully accessible, keyboard-navigable accordion and section
navigation component with frosted-glass styling.

- [components/AccordionList](#module_components/AccordionList)
  - [~AccordionList(props)](#module_components/AccordionList..AccordionList) ⇒ <code>JSX.Element</code>
    - [~focusHeader()](#module_components/AccordionList..AccordionList..focusHeader)
    - [~scrollTo()](#module_components/AccordionList..AccordionList..scrollTo)
    - [~togglePanel()](#module_components/AccordionList..AccordionList..togglePanel)
    - [~moveFocus()](#module_components/AccordionList..AccordionList..moveFocus)
    - [~handleKeyDown()](#module_components/AccordionList..AccordionList..handleKeyDown)
  - [~AccordionItem](#module_components/AccordionList..AccordionItem) : <code>Object</code>

<a name="module_components/AccordionList..AccordionList"></a>

### components/AccordionList~AccordionList(props) ⇒ <code>JSX.Element</code>

**Kind**: inner method of [<code>components/AccordionList</code>](#module_components/AccordionList)  
**Returns**: <code>JSX.Element</code> - A fully accessible accordion and section navigation component
---------------------------------------------------------------------------

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
**Access**: public  
**Component**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  | Component props. |
| [props.id] | <code>string</code> |  | Optional DOM id applied to the outer panel and accordion. |
| [props.title] | <code>string</code> |  | Optional title rendered in the panel header. |
| [props.subtitle] | <code>string</code> |  | Optional subtitle rendered beneath the title. |
| [props.icon] | <code>\*</code> |  | Optional icon rendered next to the title. |
| props.items | <code>Array.&lt;AccordionItem&gt;</code> |  | List of accordion/navigation items to render. |
| [props.accordion] | <code>boolean</code> | <code>false</code> | Enables collapsible accordion behavior.   When false, acts as a navigational list only. |
| [props.variant] | <code>&quot;dark&quot;</code> \| <code>&quot;light&quot;</code> | <code>&quot;dark&quot;</code> | Visual theme variant applied to the wrapper. |
| [props.className] | <code>string</code> |  | Additional CSS class names applied to the wrapper. |
| [props.bordered] | <code>boolean</code> | <code>false</code> | Whether the outer panel displays RSuite borders. |

- [~AccordionList(props)](#module_components/AccordionList..AccordionList) ⇒ <code>JSX.Element</code>
  - [~focusHeader()](#module_components/AccordionList..AccordionList..focusHeader)
  - [~scrollTo()](#module_components/AccordionList..AccordionList..scrollTo)
  - [~togglePanel()](#module_components/AccordionList..AccordionList..togglePanel)
  - [~moveFocus()](#module_components/AccordionList..AccordionList..moveFocus)
  - [~handleKeyDown()](#module_components/AccordionList..AccordionList..handleKeyDown)

<a name="module_components/AccordionList..AccordionList..focusHeader"></a>

#### AccordionList~focusHeader()

Helper: focus a header by index

**Kind**: inner method of [<code>AccordionList</code>](#module_components/AccordionList..AccordionList)  
<a name="module_components/AccordionList..AccordionList..scrollTo"></a>

#### AccordionList~scrollTo()

Smooth scroll to section ID in the page

**Kind**: inner method of [<code>AccordionList</code>](#module_components/AccordionList..AccordionList)  
<a name="module_components/AccordionList..AccordionList..togglePanel"></a>

#### AccordionList~togglePanel()

Toggle accordion panel open/closed

**Kind**: inner method of [<code>AccordionList</code>](#module_components/AccordionList..AccordionList)  
<a name="module_components/AccordionList..AccordionList..moveFocus"></a>

#### AccordionList~moveFocus()

Move keyboard focus up/down

**Kind**: inner method of [<code>AccordionList</code>](#module_components/AccordionList..AccordionList)  
<a name="module_components/AccordionList..AccordionList..handleKeyDown"></a>

#### AccordionList~handleKeyDown()

Keyboard handler for each header

**Kind**: inner method of [<code>AccordionList</code>](#module_components/AccordionList..AccordionList)  
<a name="module_components/AccordionList..AccordionItem"></a>

### components/AccordionList~AccordionItem : <code>Object</code>

AccordionItem
---------------------------------------------------------------------------

Describes a single entry rendered within the AccordionList.

**Kind**: inner typedef of [<code>components/AccordionList</code>](#module_components/AccordionList)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | DOM id of the associated page section. |
| title | <code>string</code> |  | Display title for the item. |
| [text] | <code>string</code> \| <code>JSX.Element</code> |  | Optional accordion panel content. |
| [url] | <code>string</code> |  | Optional URL used for navigation. |
| [local] | <code>boolean</code> | <code>false</code> | Whether the URL is a local route. |
| [icon] | <code>\*</code> |  | Optional icon passed to FrostedIcon. |
| [isScroller] | <code>boolean</code> | <code>false</code> | Enables scroll-to-section behavior when activated. |

<a name="module_components/blocks/ImageGalleryBlock"></a>

## components/blocks/ImageGalleryBlock

Renders a responsive image gallery inside a collapsible,
frosted-style panel.

<a name="module_components/blocks/ImageGalleryBlock..ImageGalleryBlock"></a>

### components/blocks/ImageGalleryBlock~ImageGalleryBlock(props) ⇒ <code>JSX.Element</code> \| <code>null</code>

ImageGalleryBlock
---------------------------------------------------------------------------

Displays a responsive image gallery as a collapsible frosted panel.

Key behaviors:

- Renders a grid of image thumbnails using RSuite FlexboxGrid
- Each image opens a ClickableImg modal viewer when activated
- Uses stable React keys, preferring `image.id` when available

Rendering notes:

- Returns `null` if no valid images are provided
- Panel header is rendered only when a title is supplied

**Kind**: inner method of [<code>components/blocks/ImageGalleryBlock</code>](#module_components/blocks/ImageGalleryBlock)  
**Returns**: <code>JSX.Element</code> \| <code>null</code> - Rendered image gallery or null if empty.  
**Access**: public  
**Component**:

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props. |
| [props.title] | <code>string</code> | Optional panel header title. |
| props.images | <code>Array.&lt;FeatureImage&gt;</code> | Image definitions to render. |

<a name="module_tests/components/blocks/ImageGalleryBlock"></a>

## tests/components/blocks/ImageGalleryBlock

Unit tests for the ImageGalleryBlock component.

Testing focus:

- Defensive rendering behavior when image data is missing or invalid
- Basic thumbnail rendering with correct accessibility attributes

Design intent:
This block is intentionally simple and defensive. Tests verify that:

- The component fails silently when no images are provided
- Valid image data renders accessible `<img>` elements

<a name="module_components/blocks/LinksBlock"></a>

## components/blocks/LinksBlock

Renders a list of link buttons inside a collapsible frosted panel.

<a name="module_components/blocks/LinksBlock..LinksBlock"></a>

### components/blocks/LinksBlock~LinksBlock(props) ⇒ <code>JSX.Element</code> \| <code>null</code>

LinksBlock
---------------------------------------------------------------------------

Renders a list of link buttons using the shared UI type system.

This component relies on the global `LinkItem` typedef defined in
`src/types/ui.types.js`. That typedef is treated as a shared contract
and should not be redeclared locally.

Rendering notes:

- Returns `null` when no links are provided
- Automatically detects external URLs to apply target and rel attributes
- Delegates rendering and accessibility concerns to the shared `Btn` component

**Kind**: inner method of [<code>components/blocks/LinksBlock</code>](#module_components/blocks/LinksBlock)  
**Returns**: <code>JSX.Element</code> \| <code>null</code> - Rendered link list or null if empty.  
**Access**: public  
**Component**:

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props. |
| props.links | <code>Array.&lt;LinkItem&gt;</code> | List of link definitions to render. |

**Example**  

```jsx
<LinksBlock
  links={[
    { title: "GitHub", url: "https://github.com", icon: "github" }
  ]}
/>
```

<a name="module_tests/components/blocks/LinksBlock"></a>

## tests/components/blocks/LinksBlock

Unit tests for the LinksBlock component.

Testing focus:

- Defensive rendering behavior when link data is missing
- Correct rendering of anchor elements with expected attributes

Design intent:
LinksBlock is intentionally minimal and data-driven.
These tests ensure it:

- Fails silently when provided with invalid input
- Renders accessible anchor elements when valid data is supplied

<a name="module_components/blocks/RichTextBlock"></a>

## components/blocks/RichTextBlock

Renders a collapsible frosted panel containing one or more
paragraphs of rich text content.

<a name="module_components/blocks/RichTextBlock..RichTextBlock"></a>

### components/blocks/RichTextBlock~RichTextBlock(props) ⇒ <code>JSX.Element</code> \| <code>null</code>

RichTextBlock
---------------------------------------------------------------------------

Renders a collapsible panel containing one or more paragraphs of rich text.
Intended for use as a content block within feature or section layouts.

Rendering notes:

- Returns `null` if no valid paragraph content is provided
- Each paragraph is rendered as a separate `<p>` element
- Panel header is conditionally rendered when a title is supplied

Accessibility:

- Uses `role="region"` to denote a landmark section
- Applies `aria-label` when a title is present

**Kind**: inner method of [<code>components/blocks/RichTextBlock</code>](#module_components/blocks/RichTextBlock)  
**Returns**: <code>JSX.Element</code> \| <code>null</code> - Rendered rich text panel or null if empty.  
**Access**: public  
**Component**:

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props. |
| [props.title] | <code>string</code> | Optional heading displayed in the panel header. |
| props.paragraphs | <code>Array.&lt;string&gt;</code> | Paragraph text content to render. |

<a name="module_tests/components/blocks/RichTextBlock"></a>

## tests/components/blocks/RichTextBlock

Unit tests for the RichTextBlock component.

Testing focus:

- Defensive rendering behavior when content is missing or invalid
- Correct rendering of markdown content into semantic HTML

Design intent:
RichTextBlock is expected to be tolerant of missing data while still
correctly rendering valid markdown input.

<a name="module_tests/components/Btn"></a>

## tests/components/Btn

Unit tests for the `Btn` (Frosted Glass Button) component.

Test coverage:

- Basic rendering and text output
- Default variant and size behavior
- Variant and size overrides
- Click interaction and disabled behavior
- Loading state behavior
- Icon-only button behavior and accessibility enforcement

Design intent:
These tests ensure `Btn` behaves as a robust, accessible abstraction
over RSuite Button / IconButton, enforcing:

- Predictable defaults
- Safe async interaction
- Strict accessibility guarantees for icon-only usage

<a name="module_components/Btn"></a>

## components/Btn

Unified frosted-glass button component implementing the
Midnight Gold UI system with accessibility, animation, async handling,
and controlled prop passthrough to RSuite and FontAwesome.

- [components/Btn](#module_components/Btn)
  - [~Btn(props)](#module_components/Btn..Btn) ⇒ <code>JSX.Element</code>
    - [~isIconOnly](#module_components/Btn..Btn..isIconOnly)
    - [~resolvedAriaLabel](#module_components/Btn..Btn..resolvedAriaLabel)
    - [~handleClick(e)](#module_components/Btn..Btn..handleClick) ⇒ <code>void</code>
  - [~RSuiteButtonProps](#module_components/Btn..RSuiteButtonProps) : <code>Object</code>
  - [~FontAwesomeButtonIconProps](#module_components/Btn..FontAwesomeButtonIconProps) : <code>Object</code>

<a name="module_components/Btn..Btn"></a>

### components/Btn~Btn(props) ⇒ <code>JSX.Element</code>

Btn
------------------------------------------------------------------

A unified, accessible, animated button component that conforms to the
Midnight Gold + Frosted UI system.

Core responsibilities:

- Normalizes RSuite `<Button>` and `<IconButton>` behavior
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

**Kind**: inner method of [<code>components/Btn</code>](#module_components/Btn)  
**Returns**: <code>JSX.Element</code> - Rendered button component.  
**Access**: public  
**Component**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  | Component props. |
| [props.variant] | <code>Variant</code> | <code>&quot;primary&quot;</code> | Visual style variant aligned with the frosted theme. |
| [props.size] | <code>Size</code> | <code>&quot;md&quot;</code> | Size variant applied to both button and icon. |
| [props.text] | <code>string</code> |  | Text label rendered inside the button. |
| [props.icon] | <code>string</code> |  | FontAwesome icon name. When provided, renders an IconButton. |
| [props.onClick] | <code>function</code> |  | Click handler. May return a Promise to enable async loading state. |
| [props.ariaLabel] | <code>string</code> |  | Accessible label. Required for icon-only buttons if no tooltip is provided. |
| [props.tooltip] | <code>string</code> |  | Tooltip text displayed on hover. |
| [props.animation] | <code>&quot;none&quot;</code> \| <code>&quot;pulse&quot;</code> \| <code>&quot;scale&quot;</code> \| <code>&quot;fade&quot;</code> | <code>&quot;none&quot;</code> | Optional hover animation preset. |
| [props.href] | <code>string</code> |  | Converts the button into a link when provided. |
| [props.hrefLocal] | <code>boolean</code> | <code>false</code> | When true, renders a React Router `<Link>` instead of an anchor. |
| [props.target] | <code>string</code> |  | Anchor target value (e.g., "_blank"). |
| [props.rel] | <code>string</code> |  | Anchor `rel` attribute. |
| [props.className] | <code>string</code> |  | Additional CSS class names. |
| [props.noBG] | <code>boolean</code> | <code>false</code> | Disables the frosted background treatment. |
| [props.*] | <code>RSuiteButtonProps</code> |  | Any supported RSuite Button/IconButton props are forwarded directly. |
| [props.*] | <code>FontAwesomeButtonIconProps</code> |  | FontAwesome-related props forwarded to the internal `FrostedIcon`. |

- [~Btn(props)](#module_components/Btn..Btn) ⇒ <code>JSX.Element</code>
  - [~isIconOnly](#module_components/Btn..Btn..isIconOnly)
  - [~resolvedAriaLabel](#module_components/Btn..Btn..resolvedAriaLabel)
  - [~handleClick(e)](#module_components/Btn..Btn..handleClick) ⇒ <code>void</code>

<a name="module_components/Btn..Btn..isIconOnly"></a>

#### Btn~isIconOnly

True when the button renders only an icon with no text label

**Kind**: inner constant of [<code>Btn</code>](#module_components/Btn..Btn)  
<a name="module_components/Btn..Btn..resolvedAriaLabel"></a>

#### Btn~resolvedAriaLabel

Resolve an accessible aria-label for the button.
Falls back to tooltip text or a humanized icon name.

**Kind**: inner constant of [<code>Btn</code>](#module_components/Btn..Btn)  
<a name="module_components/Btn..Btn..handleClick"></a>

#### Btn~handleClick(e) ⇒ <code>void</code>

Async-aware click handler.
Automatically manages loading state when a Promise is returned.

**Kind**: inner method of [<code>Btn</code>](#module_components/Btn..Btn)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>React.MouseEvent</code> | Click event. |

<a name="module_components/Btn..RSuiteButtonProps"></a>

### components/Btn~RSuiteButtonProps : <code>Object</code>

RSuiteButtonProps
---------------------------------------------------------------------------

Subset of props forwarded directly to RSuite `<Button>` / `<IconButton>`.
These are documented explicitly to make passthrough behavior clear
without re-exporting RSuite types.

**Kind**: inner typedef of [<code>components/Btn</code>](#module_components/Btn)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [active] | <code>boolean</code> | <code>true</code> | Whether the button is in an active state. |
| [as] | <code>string</code> \| <code>React.ElementType</code> | <code>&quot;\&quot;button\&quot;&quot;</code> | Render element type. |
| [block] | <code>boolean</code> | <code>false</code> | Makes the button full-width. |
| [classPrefix] | <code>string</code> | <code>&quot;\&quot;btn\&quot;&quot;</code> | RSuite CSS class prefix. |
| [disabled] | <code>boolean</code> | <code>false</code> | Disables the button. |
| [startIcon] | <code>React.ReactNode</code> |  | Icon rendered before content. |
| [endIcon] | <code>React.ReactNode</code> |  | Icon rendered after content. |
| [loading] | <code>boolean</code> | <code>false</code> | Shows loading state. |

<a name="module_components/Btn..FontAwesomeButtonIconProps"></a>

### components/Btn~FontAwesomeButtonIconProps : <code>Object</code>

FontAwesomeButtonIconProps
---------------------------------------------------------------------------

FontAwesome-related props forwarded to the internal `FrostedIcon`
instance rendered inside the button.

**Kind**: inner typedef of [<code>components/Btn</code>](#module_components/Btn)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [border] | <code>boolean</code> | <code>false</code> |
| [mask] | <code>\*</code> |  |
| [maskId] | <code>string</code> |  |
| [inverse] | <code>boolean</code> | <code>false</code> |
| [flip] | <code>string</code> \| <code>boolean</code> | <code>false</code> |
| [pull] | <code>string</code> |  |
| [rotation] | <code>number</code> |  |
| [rotateBy] | <code>boolean</code> \| <code>number</code> | <code>false</code> |
| [spinPulse] | <code>boolean</code> | <code>false</code> |
| [spinReverse] | <code>boolean</code> | <code>false</code> |
| [fade] | <code>boolean</code> | <code>false</code> |
| [beatFade] | <code>boolean</code> | <code>false</code> |
| [bounce] | <code>boolean</code> | <code>false</code> |
| [shake] | <code>boolean</code> | <code>false</code> |
| [symbol] | <code>boolean</code> \| <code>string</code> | <code>false</code> |
| [title] | <code>string</code> |  |
| [titleId] | <code>string</code> |  |
| [transform] | <code>string</code> \| <code>Object</code> |  |
| [swapOpacity] | <code>boolean</code> | <code>false</code> |
| [widthAuto] | <code>boolean</code> | <code>false</code> |

<a name="module_tests/components/ClickableImg"></a>

## tests/components/ClickableImg

Unit tests for the ClickableImg component.

Test coverage:

- Thumbnail image rendering
- Optional caption rendering
- Modal open and close behavior
- Expanded image rendering
- Keyboard interaction (Escape key)
- Accessibility attributes and aria-label handling

Testing strategy:

- Uses `@testing-library/user-event` to simulate real user interactions
- Verifies RSuite Modal behavior via `role="dialog"`
- Avoids snapshots in favor of semantic queries

<a name="module_components/ClickableImg"></a>

## components/ClickableImg

Clickable image component that expands into a frosted
modal viewer while preserving aspect ratio and accessibility.

<a name="module_components/ClickableImg..ClickableImg"></a>

### components/ClickableImg~ClickableImg(props) ⇒ <code>JSX.Element</code>

ClickableImg — Frosted Modal Image Viewer
------------------------------------------------------------

Renders a responsive image thumbnail that expands into a modal
(approximately 75–90% of viewport size) while maintaining aspect ratio.

Features:

- Optional modal title
- Optional caption (beneath thumbnail and inside modal)
- Lazy-loaded thumbnail and modal image
- ESC-to-close behavior (handled by RSuite Modal)
- Frosted glass modal and image wrapper styling
- Fully responsive scaling using max-width / max-height constraints

Accessibility:

- Requires alt text for screen readers
- Applies aria-label to both thumbnail and modal image

**Kind**: inner method of [<code>components/ClickableImg</code>](#module_components/ClickableImg)  
**Returns**: <code>JSX.Element</code> - Clickable image with modal viewer.  
**Access**: public  
**Component**:

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props. |
| props.src | <code>string</code> | Image source URL. |
| props.alt | <code>string</code> | Alt text for accessibility. |
| [props.ariaLabel] | <code>string</code> | Aria-label for accessibility. |
| [props.className] | <code>string</code> | Additional CSS classes for the image. |
| [props.title] | <code>string</code> | Optional modal header title. |
| [props.caption] | <code>string</code> | Optional caption rendered with the image. |

<a name="module_tests/components/ErrorBoundary"></a>

## tests/components/ErrorBoundary

Unit tests for the ErrorBoundary component.

Test coverage:

- Normal child rendering when no error occurs
- Error capture from descendant components
- Rendering of fallback UI
- Display of captured error messages

Testing strategy:

- Uses a deliberately crashing child component to simulate runtime failures
- Silences expected React error logs to keep test output clean
- Verifies user-facing fallback behavior rather than internal state

<a name="module_tests/components/ErrorBoundary..consoleErrorSpy"></a>

### tests/components/ErrorBoundary~consoleErrorSpy

Silence expected React error boundary logs during tests.
React intentionally logs errors when an error boundary is triggered.

**Kind**: inner property of [<code>tests/components/ErrorBoundary</code>](#module_tests/components/ErrorBoundary)  
<a name="module_components/ErrorBoundary"></a>

## components/ErrorBoundary

Root-level React Error Boundary used to catch and handle
unrecoverable runtime errors without crashing the entire application.

- [components/ErrorBoundary](#module_components/ErrorBoundary)
  - [~ErrorBoundary](#module_components/ErrorBoundary..ErrorBoundary) ⇐ <code>React.Component</code>
    - [new ErrorBoundary(props)](#new_module_components/ErrorBoundary..ErrorBoundary_new)
    - _instance_
      - [.componentDidMount()](#module_components/ErrorBoundary..ErrorBoundary+componentDidMount)
      - [.componentDidCatch(error, info)](#module_components/ErrorBoundary..ErrorBoundary+componentDidCatch)
      - [.render()](#module_components/ErrorBoundary..ErrorBoundary+render) ⇒ <code>JSX.Element</code>
    - _static_
      - [.getDerivedStateFromError(error)](#module_components/ErrorBoundary..ErrorBoundary.getDerivedStateFromError) ⇒ <code>Object</code>

<a name="module_components/ErrorBoundary..ErrorBoundary"></a>

### components/ErrorBoundary~ErrorBoundary ⇐ <code>React.Component</code>

ErrorBoundary
------------------------------------------------------------

A root error boundary that prevents the entire application from
crashing due to uncaught runtime errors.

Responsibilities:

- Catches render-time and lifecycle errors in descendant components
- Displays a user-facing fallback UI
- Logs error details and component stack traces to the console

Behavior:

- Uses `getDerivedStateFromError` to trigger fallback rendering
- Uses `componentDidCatch` for side-effect logging
- Allows normal rendering when no error is present

Usage notes:

- Intended to wrap the highest possible level of the app (e.g., App root)
- Should not be used for recoverable or expected errors

**Kind**: inner class of [<code>components/ErrorBoundary</code>](#module_components/ErrorBoundary)  
**Extends**: <code>React.Component</code>  
**Access**: public  
**Component**:

- [~ErrorBoundary](#module_components/ErrorBoundary..ErrorBoundary) ⇐ <code>React.Component</code>
  - [new ErrorBoundary(props)](#new_module_components/ErrorBoundary..ErrorBoundary_new)
  - _instance_
    - [.componentDidMount()](#module_components/ErrorBoundary..ErrorBoundary+componentDidMount)
    - [.componentDidCatch(error, info)](#module_components/ErrorBoundary..ErrorBoundary+componentDidCatch)
    - [.render()](#module_components/ErrorBoundary..ErrorBoundary+render) ⇒ <code>JSX.Element</code>
  - _static_
    - [.getDerivedStateFromError(error)](#module_components/ErrorBoundary..ErrorBoundary.getDerivedStateFromError) ⇒ <code>Object</code>

<a name="new_module_components/ErrorBoundary..ErrorBoundary_new"></a>

#### new ErrorBoundary(props)

Initializes error boundary state.

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component props. |

<a name="module_components/ErrorBoundary..ErrorBoundary+componentDidMount"></a>

#### errorBoundary.componentDidMount()

Lifecycle hook invoked after the component mounts.
Used here as a simple diagnostic log.

**Kind**: instance method of [<code>ErrorBoundary</code>](#module_components/ErrorBoundary..ErrorBoundary)  
<a name="module_components/ErrorBoundary..ErrorBoundary+componentDidCatch"></a>

#### errorBoundary.componentDidCatch(error, info)

Lifecycle hook invoked when an error is caught.
Used for logging error details and component stack trace.

**Kind**: instance method of [<code>ErrorBoundary</code>](#module_components/ErrorBoundary..ErrorBoundary)  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | The thrown error. |
| info | <code>React.ErrorInfo</code> | Component stack information. |

<a name="module_components/ErrorBoundary..ErrorBoundary+render"></a>

#### errorBoundary.render() ⇒ <code>JSX.Element</code>

Renders fallback UI when an error has been caught,
otherwise renders child components normally.

**Kind**: instance method of [<code>ErrorBoundary</code>](#module_components/ErrorBoundary..ErrorBoundary)  
<a name="module_components/ErrorBoundary..ErrorBoundary.getDerivedStateFromError"></a>

#### ErrorBoundary.getDerivedStateFromError(error) ⇒ <code>Object</code>

Lifecycle hook invoked when a descendant throws during render.
Updates state to trigger fallback UI.

**Kind**: static method of [<code>ErrorBoundary</code>](#module_components/ErrorBoundary..ErrorBoundary)  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | The thrown error. |

<a name="module_tests/components/Footer"></a>

## tests/components/Footer

Unit tests for the Footer component.

Test coverage:

- Static contact information rendering
- Dynamic year display
- External social link rendering
- Clipboard interaction for phone number copying
- Toast notification trigger paths

Testing strategy:

- Mocks Btn to avoid UI coupling
- Mocks useClipboard hook (logic tested independently)
- Mocks RSuite toaster to avoid side effects

Philosophy:

- Tests user-visible behavior only
- Avoids asserting RSuite internals or toast implementation details

- [tests/components/Footer](#module_tests/components/Footer)
  - [~copyMock](#module_tests/components/Footer..copyMock)
  - [~pushMock](#module_tests/components/Footer..pushMock)

<a name="module_tests/components/Footer..copyMock"></a>

### tests/components/Footer~copyMock

Mock useClipboard hook.
Clipboard logic is tested independently; here we only
verify integration paths.

**Kind**: inner constant of [<code>tests/components/Footer</code>](#module_tests/components/Footer)  
<a name="module_tests/components/Footer..pushMock"></a>

### tests/components/Footer~pushMock

Mock RSuite toaster to prevent UI side effects.

**Kind**: inner constant of [<code>tests/components/Footer</code>](#module_tests/components/Footer)  
<a name="module_components/Footer"></a>

## components/Footer

Application footer displaying contact information,
social links, and supporting utilities such as clipboard feedback.

- [components/Footer](#module_components/Footer)
  - [~Footer()](#module_components/Footer..Footer) ⇒ <code>JSX.Element</code>
    - [~toaster](#module_components/Footer..Footer..toaster)
    - [~copyPhoneNumber(number)](#module_components/Footer..Footer..copyPhoneNumber) ⇒ <code>void</code>

<a name="module_components/Footer..Footer"></a>

### components/Footer~Footer() ⇒ <code>JSX.Element</code>

Footer
---------------------------------------------------------------------------

Application footer component that presents:

- Contact information with click-to-copy behavior
- Social profile links rendered as frosted buttons
- Resume preview access
- Copyright notice

Behavior:

- Uses `useClipboard` to copy phone numbers
- Displays toast notifications via RSuite `useToaster`
- Shows success and error feedback when clipboard actions occur

Accessibility:

- Interactive text is keyboard- and screen-reader accessible
- Buttons include aria-labels and tooltips

Design notes:

- Uses RSuite layout primitives (Container, FlexboxGrid, Panel)
- Applies frosted-glass styling via CSS classes

**Kind**: inner method of [<code>components/Footer</code>](#module_components/Footer)  
**Returns**: <code>JSX.Element</code> - Rendered application footer.  
**Access**: public  
**Component**:

- [~Footer()](#module_components/Footer..Footer) ⇒ <code>JSX.Element</code>
  - [~toaster](#module_components/Footer..Footer..toaster)
  - [~copyPhoneNumber(number)](#module_components/Footer..Footer..copyPhoneNumber) ⇒ <code>void</code>

<a name="module_components/Footer..Footer..toaster"></a>

#### Footer~toaster

RSuite toaster instance used for user feedback messages.

**Kind**: inner constant of [<code>Footer</code>](#module_components/Footer..Footer)  
<a name="module_components/Footer..Footer..copyPhoneNumber"></a>

#### Footer~copyPhoneNumber(number) ⇒ <code>void</code>

Copies a phone number to the clipboard.

**Kind**: inner method of [<code>Footer</code>](#module_components/Footer..Footer)  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>string</code> | Phone number to copy. |

<a name="module_tests/components/FrostedIcon"></a>

## tests/components/FrostedIcon

Unit tests for the FrostedIcon component.

Testing focus:

- Semantic role switching based on `clickable` prop
- Size-related CSS class application
- Loading state accessibility signaling

Design intent:
FrostedIcon is a low-level visual primitive that must:

- Render correct semantic roles (`img` vs `button`)
- Expose loading state via `aria-busy`
- Apply predictable, size-based CSS classes

These tests validate observable DOM behavior rather than internal logic.

<a name="module_components/FrostedIcon"></a>

## components/FrostedIcon

Styled FontAwesome icon component integrated with the
Midnight Gold frosted UI system.

- [components/FrostedIcon](#module_components/FrostedIcon)
  - [~FrostedIcon(props)](#module_components/FrostedIcon..FrostedIcon) ⇒ <code>JSX.Element</code>
  - [~FontAwesomeIconProps](#module_components/FrostedIcon..FontAwesomeIconProps) : <code>Object</code>

<a name="module_components/FrostedIcon..FrostedIcon"></a>

### components/FrostedIcon~FrostedIcon(props) ⇒ <code>JSX.Element</code>

FrostedIcon
---------------------------------------------------------------------------

A styled wrapper around [FontAwesomeIcon](FontAwesomeIcon) that conforms to the
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

**Kind**: inner method of [<code>components/FrostedIcon</code>](#module_components/FrostedIcon)  
**Returns**: <code>JSX.Element</code> - Rendered frosted icon.  
**Access**: public  
**Component**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  | Component props. |
| props.icon | <code>string</code> |  | FontAwesome icon definition to render. |
| [props.size] | <code>Size</code> | <code>&quot;md&quot;</code> | Icon size variant (xs | sm | md | lg | xl). |
| [props.variant] | <code>string</code> | <code>&quot;\&quot;primary\&quot;&quot;</code> | Visual style variant applied via CSS. |
| [props.clickable] | <code>boolean</code> | <code>false</code> | Enables pointer and keyboard interaction. |
| [props.onClick] | <code>function</code> | <code>()&#x3D;&gt;{}</code> | Click handler invoked when clickable. |
| [props.loading] | <code>boolean</code> | <code>false</code> | Displays a loading spinner and sets aria-busy. |
| [props.spin] | <code>boolean</code> | <code>false</code> | Forces spin animation regardless of loading state. |
| [props.tooltip] | <code>string</code> |  | Optional tooltip text displayed on hover. |
| [props.ariaLabel] | <code>string</code> |  | Accessible label for screen readers. |
| [props.noBG] | <code>boolean</code> | <code>false</code> | Disables the frosted background circle. |
| [props.className] | <code>string</code> |  | Additional CSS class names. |
| [props.*] | <code>FontAwesomeIconProps</code> |  | Any supported FontAwesomeIcon props are forwarded directly to the   underlying SVG renderer. |

<a name="module_components/FrostedIcon..FontAwesomeIconProps"></a>

### components/FrostedIcon~FontAwesomeIconProps : <code>Object</code>

FontAwesomeIconProps
---------------------------------------------------------------------------

Subset of props forwarded directly to the underlying `FontAwesomeIcon`
component. These align with the official `@fortawesome/react-fontawesome`
API and are documented here for completeness.

**Kind**: inner typedef of [<code>components/FrostedIcon</code>](#module_components/FrostedIcon)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [border] | <code>boolean</code> | <code>false</code> | Renders a border around the icon. |
| [mask] | <code>\*</code> |  | Icon used as a mask. |
| [maskId] | <code>string</code> |  | Optional ID for the SVG mask. |
| [inverse] | <code>boolean</code> | <code>false</code> | Inverts icon color. |
| [flip] | <code>string</code> \| <code>boolean</code> | <code>false</code> | Flips the icon ("horizontal", "vertical", or "both"). |
| [pull] | <code>string</code> |  | Pulls icon left or right. |
| [rotation] | <code>number</code> |  | Rotates icon (90, 180, 270). |
| [rotateBy] | <code>boolean</code> \| <code>number</code> | <code>false</code> | Arbitrary rotation value. |
| [spinPulse] | <code>boolean</code> | <code>false</code> | Enables pulse-style spinning. |
| [spinReverse] | <code>boolean</code> | <code>false</code> | Reverses spin direction. |
| [fade] | <code>boolean</code> | <code>false</code> | Enables fade animation. |
| [beatFade] | <code>boolean</code> | <code>false</code> | Enables beat-fade animation. |
| [bounce] | <code>boolean</code> | <code>false</code> | Enables bounce animation. |
| [shake] | <code>boolean</code> | <code>false</code> | Enables shake animation. |
| [symbol] | <code>boolean</code> \| <code>string</code> | <code>false</code> | Exports icon as SVG symbol. |
| [title] | <code>string</code> |  | SVG `<title>` content. |
| [titleId] | <code>string</code> |  | ID applied to SVG title element. |
| [transform] | <code>string</code> \| <code>Object</code> |  | SVG transform definition. |
| [swapOpacity] | <code>boolean</code> | <code>false</code> | Swaps opacity layers. |
| [widthAuto] | <code>boolean</code> | <code>false</code> | Enables automatic width calculation. |

<a name="module_components/Head"></a>

## components/Head

Centralized document head manager responsible for injecting
SEO, metadata, and social sharing tags based on the current route.

<a name="exp_module_components/Head--module.exports"></a>

### module.exports() ⇒ <code>JSX.Element</code> ⏏

Head
---------------------------------------------------------------------------

Dynamically configures `<head>` metadata for each page in the application
using `react-helmet-async`.

Responsibilities:

- Selects page-specific metadata based on the current URL path
- Injects SEO-relevant meta tags (title, description, keywords)
- Configures Open Graph metadata for social sharing
- Defines favicon, theme color, and canonical URL
- Adds performance-related tags (preconnect)

Behavior:

- Determines the active page by inspecting `window.location.pathname`
- Falls back to the Home metadata when no route match is found

Usage notes:

- Intended to be rendered once near the top of the app tree
- Requires `HelmetProvider` to be present higher in the component hierarchy

**Kind**: Exported function  
**Returns**: <code>JSX.Element</code> - Injected document head metadata.  
**Access**: public  
**Component**:
<a name="module_components/Health"></a>

## components/Health

Lightweight diagnostic component that displays basic
runtime and build environment information.

<a name="module_components/Health..Health"></a>

### components/Health~Health() ⇒ <code>JSX.Element</code>

Health
---------------------------------------------------------------------------

Displays basic system and environment health information for the application.

Intended usage:

- Developer diagnostics
- Build verification
- Quick runtime sanity checks during development or demos

Displayed information:

- React version
- Current Vite environment mode
- Build tool identification
- RSuite availability

Notes:

- This component is informational only
- No side effects or external dependencies beyond environment variables

**Kind**: inner method of [<code>components/Health</code>](#module_components/Health)  
**Returns**: <code>JSX.Element</code> - Rendered system health panel.  
**Access**: public  
**Component**:
<a name="module_components/InfoSection"></a>

## components/InfoSection

Reusable frosted-glass section wrapper used to standardize
layout, spacing, and visual hierarchy across the portfolio.

<a name="module_components/InfoSection..InfoSection"></a>

### components/InfoSection~InfoSection(props) ⇒ <code>JSX.Element</code>

InfoSection
---------------------------------------------------------------------------

A responsive, collapsible frosted-glass section wrapper used throughout
the application to enforce consistent structure and visual language.

Core features:

- Optional title and subtitle
- Optional icon rendered alongside the title
- Collapsible frosted panel container
- Semantic `<section>` wrapper
- Arbitrary child content

Design notes:

- Uses RSuite `Panel` for consistent layout behavior
- Applies shared frosted and tile styles via CSS
- Intended for use with section-based navigation and scroll targeting

**Kind**: inner method of [<code>components/InfoSection</code>](#module_components/InfoSection)  
**Returns**: <code>JSX.Element</code> - Rendered frosted content section.  
**Access**: public  
**Component**:

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component props. |
| [props.title] | <code>string</code> | Title displayed at the top of the section. |
| [props.subtitle] | <code>string</code> | Optional subtitle rendered beneath the title. |
| [props.icon] | <code>\*</code> | Optional icon rendered next to the section title. |
| [props.className] | <code>string</code> | Additional CSS class names applied to the wrapper. |
| [props.id] | <code>string</code> | Optional DOM id used for section scrolling and deep linking. |
| props.children | <code>React.ReactNode</code> | Content rendered inside the section body. |

<a name="module_tests/components/InfoSection"></a>

## tests/components/InfoSection

Unit tests for the InfoSection layout component.

Testing focus:

- Correct semantic wrapper element (`section`)
- Proper application of root classes and IDs
- Conditional rendering of title, subtitle, and icon
- Transparent rendering of child content

Testing strategy:

- Mocks RSuite Panel to reduce surface area and DOM complexity
- Mocks FrostedIcon to avoid FontAwesome rendering concerns
- Focuses on layout and composition, not styling details

<a name="module_components/MermaidDiagram"></a>

## components/MermaidDiagram

Advanced Mermaid diagram renderer with theming, accessibility,
responsive layout, and PNG export support.

- [components/MermaidDiagram](#module_components/MermaidDiagram)
  - [~cssVar(name, fallback)](#module_components/MermaidDiagram..cssVar) ⇒ <code>string</code>
  - [~buildMermaidThemeVariables(theme)](#module_components/MermaidDiagram..buildMermaidThemeVariables) ⇒ <code>Object</code>
  - [~MermaidDiagram(props)](#module_components/MermaidDiagram..MermaidDiagram) ⇒ <code>JSX.Element</code>

<a name="module_components/MermaidDiagram..cssVar"></a>

### components/MermaidDiagram~cssVar(name, fallback) ⇒ <code>string</code>

Resolves a CSS variable value from the document root with a fallback.

**Kind**: inner method of [<code>components/MermaidDiagram</code>](#module_components/MermaidDiagram)  
**Returns**: <code>string</code> - Resolved CSS value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | CSS variable name (e.g. "--accent"). |
| fallback | <code>string</code> | Fallback value if variable is unavailable. |

<a name="module_components/MermaidDiagram..buildMermaidThemeVariables"></a>

### components/MermaidDiagram~buildMermaidThemeVariables(theme) ⇒ <code>Object</code>

Builds a Mermaid-compatible theme variable object based on the active UI theme.

Design notes:

- Pulls from global CSS variables to stay visually in sync
- Avoids Mermaid auto-centering or transform overrides

**Kind**: inner method of [<code>components/MermaidDiagram</code>](#module_components/MermaidDiagram)  
**Returns**: <code>Object</code> - Mermaid themeVariables configuration.  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>&quot;dark&quot;</code> \| <code>&quot;light&quot;</code> | Active theme mode. |

<a name="module_components/MermaidDiagram..MermaidDiagram"></a>

### components/MermaidDiagram~MermaidDiagram(props) ⇒ <code>JSX.Element</code>

MermaidDiagram
---------------------------------------------------------------------------

Fully featured Mermaid diagram renderer with:

- Dark / light theme support
- Responsive SVG layout without forced transforms
- Accessible keyboard-focusable diagram container
- Optional description text
- PNG export capability

Rendering strategy:

- Mermaid renders off-DOM into a controlled host element
- SVG dimensions are normalized for responsive scaling
- No automatic centering, zoom, or transforms are applied

Accessibility:

- Diagram container uses `role="img"`
- Keyboard focus enabled via `tabIndex`
- ARIA label derived from title

**Kind**: inner method of [<code>components/MermaidDiagram</code>](#module_components/MermaidDiagram)  
**Returns**: <code>JSX.Element</code> - Rendered Mermaid diagram panel.  
**Access**: public  
**Component**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  | Component props. |
| props.diagram | <code>string</code> |  | Mermaid diagram source string. |
| [props.title] | <code>string</code> |  | Optional title rendered in the panel header and used for accessibility. |
| [props.description] | <code>string</code> |  | Optional descriptive text rendered beneath the diagram. |
| [props.theme] | <code>&quot;dark&quot;</code> \| <code>&quot;light&quot;</code> | <code>&quot;dark&quot;</code> | Visual theme applied to Mermaid rendering. |
| [props.className] | <code>string</code> |  | Additional CSS class names applied to the panel container. |

<a name="module_components/PageHeader"></a>

## components/PageHeader

Standardized page-level header component used to introduce
pages and major sections with consistent hierarchy and styling.

- [components/PageHeader](#module_components/PageHeader)
  - [~PageHeader(props)](#module_components/PageHeader..PageHeader) ⇒ <code>JSX.Element</code>
    - [~renderTechUsedString([techArray])](#module_components/PageHeader..PageHeader..renderTechUsedString) ⇒ <code>JSX.Element</code> \| <code>string</code>
  - [~TechItem](#module_components/PageHeader..TechItem) : <code>Object</code>

<a name="module_components/PageHeader..PageHeader"></a>

### components/PageHeader~PageHeader(props) ⇒ <code>JSX.Element</code>

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

**Kind**: inner method of [<code>components/PageHeader</code>](#module_components/PageHeader)  
**Returns**: <code>JSX.Element</code> - Rendered page header.  
**Access**: public  
**Component**:

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component props. |
| props.title | <code>string</code> | Main page or section title. |
| [props.jobTitle] | <code>string</code> | Optional role or position title. |
| [props.timespan] | <code>string</code> | Optional date range or duration string. |
| [props.subTitle] | <code>string</code> | Supporting descriptive text rendered beneath the title. |
| [props.tech] | <code>Array.&lt;TechItem&gt;</code> | List of technologies associated with the page or project. |
| [props.className] | <code>string</code> | Optional additional CSS class names. |

<a name="module_components/PageHeader..PageHeader..renderTechUsedString"></a>

#### PageHeader~renderTechUsedString([techArray]) ⇒ <code>JSX.Element</code> \| <code>string</code>

Formats a list of technology items into a human-readable display.

Behavior:

- Returns an empty string when no valid technologies are provided
- Renders each technology with its associated style class

**Kind**: inner method of [<code>PageHeader</code>](#module_components/PageHeader..PageHeader)  
**Returns**: <code>JSX.Element</code> \| <code>string</code> - Rendered tech list or empty string.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [techArray] | <code>Array.&lt;TechItem&gt;</code> | <code>[]</code> | List of technologies used. |

<a name="module_components/PageHeader..TechItem"></a>

### components/PageHeader~TechItem : <code>Object</code>

TechItem
---------------------------------------------------------------------------

Describes a technology badge rendered in the "Tech Used" section.

**Kind**: inner typedef of [<code>components/PageHeader</code>](#module_components/PageHeader)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | Display name of the technology. |
| type | <code>string</code> | CSS class used to style the technology label. |
| [id] | <code>string</code> | Optional unique identifier. |

<a name="module_tests/components/PageHeader"></a>

## tests/components/PageHeader

Unit tests for the PageHeader component.

Test coverage:

- Required title rendering
- Optional jobTitle + timespan row composition
- Optional subtitle rendering
- Semantic role (`banner`) for accessibility
- Root className passthrough

Testing strategy:

- Mocks RSuite Panel and FlexboxGrid as minimal layout primitives
- Focuses on semantic output and composition logic
- Avoids coupling to RSuite layout implementation details

<a name="module_components/ProjectCard"></a>

## components/ProjectCard

Reusable frosted-glass project display card used to present
portfolio projects with images, repository links, and live URLs.

- [components/ProjectCard](#module_components/ProjectCard)
  - [~ProjectCard(props)](#module_components/ProjectCard..ProjectCard) ⇒ <code>JSX.Element</code>
  - [~ProjectImage](#module_components/ProjectCard..ProjectImage) : <code>Object</code>

<a name="module_components/ProjectCard..ProjectCard"></a>

### components/ProjectCard~ProjectCard(props) ⇒ <code>JSX.Element</code>

ProjectCard
---------------------------------------------------------------------------

A reusable frosted-glass project display card designed for portfolio use.

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

**Kind**: inner method of [<code>components/ProjectCard</code>](#module_components/ProjectCard)  
**Returns**: <code>JSX.Element</code> - Rendered project card.  
**Access**: public  
**Component**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  | Component props. |
| props.title | <code>string</code> |  | Project title. |
| props.description | <code>string</code> |  | Main project description text. |
| [props.images] | <code>Array.&lt;ProjectImage&gt;</code> | <code>[]</code> | Optional list of project images to render. |
| [props.repo] | <code>string</code> |  | Optional GitHub repository URL. |
| [props.url] | <code>string</code> |  | Optional live project URL. |
| [props.icon] | <code>\*</code> | <code>faCode</code> | Icon displayed alongside the project title. |
| [props.id] | <code>string</code> |  | Optional DOM id used for section scrolling or deep linking. |

<a name="module_components/ProjectCard..ProjectImage"></a>

### components/ProjectCard~ProjectImage : <code>Object</code>

ProjectImage
---------------------------------------------------------------------------

Describes an image rendered within a project card.

**Kind**: inner typedef of [<code>components/ProjectCard</code>](#module_components/ProjectCard)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | Image source URL. |
| alt | <code>string</code> | Alt text for accessibility. |
| [title] | <code>string</code> | Optional image title. |
| [caption] | <code>string</code> | Optional caption displayed with the image. |

<a name="module_components/ResumePreview"></a>

## components/ResumePreview

Modal-based resume preview and download component.

- [components/ResumePreview](#module_components/ResumePreview)
  - [~ResumePreview()](#module_components/ResumePreview..ResumePreview) ⇒ <code>JSX.Element</code>
    - [~openModal()](#module_components/ResumePreview..ResumePreview..openModal) ⇒ <code>void</code>
    - [~closeModal()](#module_components/ResumePreview..ResumePreview..closeModal) ⇒ <code>void</code>

<a name="module_components/ResumePreview..ResumePreview"></a>

### components/ResumePreview~ResumePreview() ⇒ <code>JSX.Element</code>

ResumePreview
---------------------------------------------------------------------------

Frosted modal component that allows users to preview and download
the resume PDF.

Core responsibilities:

- Opens a modal containing an embedded PDF preview
- Provides a direct download link for the resume
- Uses Vite asset imports to ensure correct bundling across environments

Technical notes:

- PDF is imported as a Vite-managed asset
- Works consistently in local development and production builds
- Modal styling is shared via global utility classes

Accessibility:

- RSuite Modal provides focus trapping and ESC-to-close behavior
- Buttons include descriptive aria-labels and tooltips
- Embedded iframe includes a fallback message

**Kind**: inner method of [<code>components/ResumePreview</code>](#module_components/ResumePreview)  
**Returns**: <code>JSX.Element</code> - Rendered resume preview modal and trigger button.  
**Access**: public  
**Component**:

- [~ResumePreview()](#module_components/ResumePreview..ResumePreview) ⇒ <code>JSX.Element</code>
  - [~openModal()](#module_components/ResumePreview..ResumePreview..openModal) ⇒ <code>void</code>
  - [~closeModal()](#module_components/ResumePreview..ResumePreview..closeModal) ⇒ <code>void</code>

<a name="module_components/ResumePreview..ResumePreview..openModal"></a>

#### ResumePreview~openModal() ⇒ <code>void</code>

Opens the resume preview modal.

**Kind**: inner method of [<code>ResumePreview</code>](#module_components/ResumePreview..ResumePreview)  
<a name="module_components/ResumePreview..ResumePreview..closeModal"></a>

#### ResumePreview~closeModal() ⇒ <code>void</code>

Closes the resume preview modal.

**Kind**: inner method of [<code>ResumePreview</code>](#module_components/ResumePreview..ResumePreview)  
<a name="module_tests/components/ResumePreview"></a>

## tests/components/ResumePreview

Unit tests for the ResumePreview component.

Test coverage:

- Rendering of the resume preview trigger button
- Modal open behavior when the trigger is activated
- Rendering of the embedded resume iframe
- Modal close behavior via explicit user action

Testing strategy:

- Mocks Btn to a minimal native button to isolate behavior
- Mocks RSuite Modal components to semantic HTML elements
- Avoids testing RSuite internals or styling

<a name="module_components/SectionRenderer"></a>

## components/SectionRenderer

Central render orchestrator for feature sections composed of
declarative content blocks.

<a name="module_components/SectionRenderer..SectionRenderer"></a>

### components/SectionRenderer~SectionRenderer(props) ⇒ <code>JSX.Element</code>

SectionRenderer
--------------------------------------------------------------------

Central render orchestrator for a single feature section.

This component acts as a **data-driven layout engine**, allowing
entire pages to be defined declaratively via structured data
instead of hardcoded JSX.

Core responsibilities:

- Registers the section with the global SectionRegistry
  (used by sticky navigation and scroll-spy behavior)
- Renders the section container via `InfoSection`
- Dynamically resolves and renders content blocks based on `BlockType`

Supported block types:

- Rich text content
- Image galleries
- Link lists
- Bulleted / accordion lists
- Mermaid diagrams (theme-aware)

Defensive behavior:

- Gracefully handles malformed or unknown block definitions
- Renders a visible warning instead of silently failing

**Kind**: inner method of [<code>components/SectionRenderer</code>](#module_components/SectionRenderer)  
**Returns**: <code>JSX.Element</code> - Rendered, scroll-registered, frosted-glass section.  
**Access**: public  
**Component**:

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component props. |
| props.section | [<code>FeatureSection</code>](#FeatureSection) | Fully-defined section descriptor containing metadata   (`id`, `title`, `subtitle`, `icon`) and an ordered list of blocks. |

**Example**  

```jsx
<SectionRenderer
  section={{
    id: "projects",
    title: "Projects",
    subtitle: "Selected work",
    blocks: [...]
  }}
/>
```

<a name="module_tests/components/SectionRenderer"></a>

## tests/components/SectionRenderer

Unit tests for the SectionRenderer component.

Test coverage:

- Section registry registration on mount
- Section registry cleanup on unmount
- Delegation to InfoSection for layout
- Block-type dispatching to the correct child renderer
- Defensive fallback rendering for unknown block types

Testing strategy:

- Mocks all child renderers to isolate dispatch logic
- Mocks SectionRegistry to observe registration side effects
- Avoids testing block rendering internals (covered elsewhere)

Architectural intent:
SectionRenderer is treated as a **render orchestrator**, not a
content renderer. Tests focus on delegation, ordering, and
defensive behavior rather than DOM structure.

<a name="module_components/StickyNav"></a>

## components/StickyNav

Primary site navigation with synchronized desktop and mobile
layouts, active-route handling, and accessibility semantics.

- [components/StickyNav](#module_components/StickyNav)
  - [~NAV_ITEMS](#module_components/StickyNav..NAV_ITEMS) : <code>Array.&lt;NavItem&gt;</code>
  - [~handleNavClick(e, isActive)](#module_components/StickyNav..handleNavClick) ⇒ <code>void</code>
  - [~StickyNav(props)](#module_components/StickyNav..StickyNav) ⇒ <code>JSX.Element</code>
  - [~NavItem](#module_components/StickyNav..NavItem) : <code>Object</code>

<a name="module_components/StickyNav..NAV_ITEMS"></a>

### components/StickyNav~NAV\_ITEMS : <code>Array.&lt;NavItem&gt;</code>

NAV_ITEMS
---------------------------------------------------------------------------

Centralized definition of all navigable routes used by both desktop and
mobile navigation variants.

Keeping this data-driven:

- Prevents drift between layouts
- Ensures consistent ordering and labeling
- Makes future additions trivial

**Kind**: inner constant of [<code>components/StickyNav</code>](#module_components/StickyNav)  
<a name="module_components/StickyNav..handleNavClick"></a>

### components/StickyNav~handleNavClick(e, isActive) ⇒ <code>void</code>

Prevents redundant navigation when clicking the active route.

Preserves:

- Visual active highlighting
- `aria-current="page"` accessibility semantics
- While avoiding unnecessary navigation events

**Kind**: inner method of [<code>components/StickyNav</code>](#module_components/StickyNav)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>MouseEvent</code> | Click event. |
| isActive | <code>boolean</code> | Whether the target route is already active. |

<a name="module_components/StickyNav..StickyNav"></a>

### components/StickyNav~StickyNav(props) ⇒ <code>JSX.Element</code>

StickyNav
------------------------------------------------------------------

Primary site navigation component with dual layouts:

Desktop layout:

- Horizontal icon-based navigation
- Icon-only buttons with hover tooltips
- Uses the design-system `Btn` and `FrostedIcon` components

Mobile layout:

- Burger-triggered RSuite `Drawer`
- Vertical, text-based navigation
- Touch-friendly and hover-independent

Shared behavior:

- Active route highlighting
- `aria-current="page"` for accessibility
- Active route suppresses navigation without disabling styles

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

NavItem
---------------------------------------------------------------------------

Describes a single navigation entry rendered in both desktop and mobile
navigation variants.

**Kind**: inner typedef of [<code>components/StickyNav</code>](#module_components/StickyNav)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique identifier for the nav item. |
| route | <code>string</code> | Route path used for navigation. |
| label | <code>string</code> | Human-readable navigation label. |
| icon | <code>\*</code> | FontAwesome icon associated with the route. |

<a name="module_tests/components/StickyNav"></a>

## tests/components/StickyNav

Unit tests for the StickyNav component.

Test coverage:

- Desktop navigation rendering
- Active route highlighting via `aria-current`
- Mobile menu toggle behavior
- External link rendering
- ThemeToggle delegation

Testing strategy:

- Mocks RSuite navigation primitives to isolate behavior
- Mocks Btn, FrostedIcon, and ThemeToggle to avoid UI coupling
- Focuses on observable navigation behavior, not layout or styling

<a name="module_components/StickySectionNav"></a>

## components/StickySectionNav

Sticky, accessible intra-page section navigator that tracks
scroll position, updates URL hash state, and highlights the active section.

- [components/StickySectionNav](#module_components/StickySectionNav)
  - [~StickySectionNav(props)](#module_components/StickySectionNav..StickySectionNav) ⇒ <code>JSX.Element</code>
    - [~handleNavigate(id)](#module_components/StickySectionNav..StickySectionNav..handleNavigate) ⇒ <code>void</code>
  - [~SectionNavItem](#module_components/StickySectionNav..SectionNavItem) : <code>Object</code>

<a name="module_components/StickySectionNav..StickySectionNav"></a>

### components/StickySectionNav~StickySectionNav(props) ⇒ <code>JSX.Element</code>

StickySectionNav
---------------------------------------------------------------------------

Sticky, accessible section navigation for **individual pages**.

Responsibilities:

- Highlights the currently active section based on scroll position
- Syncs navigation state with the URL hash (via History API)
- Supports both desktop and mobile presentation modes via CSS
- Keeps the active item visible by auto-scrolling the nav container

Behavior:

- Uses a fixed `SCROLL_OFFSET` to account for sticky headers / top padding
- Uses smooth scrolling to navigate to target sections
- Marks programmatic scroll to avoid scroll-spy churn during animated scroll

Accessibility:

- Root uses `aria-label="Section navigation"`
- Active item uses `aria-current="location"`
- Uses list semantics for predictable screen reader interaction

**Kind**: inner method of [<code>components/StickySectionNav</code>](#module_components/StickySectionNav)  
**Returns**: <code>JSX.Element</code> - Rendered sticky section navigation.  
**Access**: public  
**Component**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  | Component props. |
| props.sections | <code>Array.&lt;SectionNavItem&gt;</code> |  | List of sections to render and navigate. |
| [props.mode] | <code>&quot;desktop&quot;</code> \| <code>&quot;mobile&quot;</code> | <code>&quot;desktop&quot;</code> | Layout mode used by styling rules. |
| [props.pageUrl] | <code>string</code> | <code>&quot;\&quot;/\&quot;&quot;</code> | Base page URL used for hash updates. |
| [props.isOpen] | <code>boolean</code> | <code>true</code> | Controls open-state styling in mobile mode. |

<a name="module_components/StickySectionNav..StickySectionNav..handleNavigate"></a>

#### StickySectionNav~handleNavigate(id) ⇒ <code>void</code>

Navigates to a target section by ID, updating URL hash and scrolling smoothly.

Implementation notes:

- Uses `history.pushState` to update the hash without a full navigation
- Uses requestAnimationFrame to allow layout to settle before measuring

**Kind**: inner method of [<code>StickySectionNav</code>](#module_components/StickySectionNav..StickySectionNav)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Target section id. |

<a name="module_components/StickySectionNav..SectionNavItem"></a>

### components/StickySectionNav~SectionNavItem : <code>Object</code>

SectionNavItem
---------------------------------------------------------------------------

Describes a single section entry used by StickySectionNav.

**Kind**: inner typedef of [<code>components/StickySectionNav</code>](#module_components/StickySectionNav)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | DOM id of the section element to scroll to. |
| title | <code>string</code> | Human-readable label shown in the nav list. |

<a name="module_components/ThemeToggle"></a>

## components/ThemeToggle

Compact theme selection control for switching between
light and dark application themes.

<a name="module_components/ThemeToggle..ThemeToggle"></a>

### components/ThemeToggle~ThemeToggle(props) ⇒ <code>JSX.Element</code>

ThemeToggle
------------------------------------------------------------------

Compact, icon-only theme selector used to toggle between light and
dark application themes.

Design goals:

- Minimal visual footprint
- Clear active-state feedback
- Keyboard and screen-reader accessible
- Consistent with the frosted / glass UI system

Behavior:

- Highlights the currently active theme
- Disables the active option to prevent redundant state updates
- Delegates theme state management to ThemeContext

Accessibility:

- Toolbar includes an aria-label for screen readers
- Each button includes descriptive aria-labels and tooltips

**Kind**: inner method of [<code>components/ThemeToggle</code>](#module_components/ThemeToggle)  
**Returns**: <code>JSX.Element</code> - Rendered theme toggle control.  
**Access**: public  
**Component**:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  | Component props. |
| [props.size] | <code>Size</code> | <code>Size.SM</code> | Size applied to the toggle buttons. |

<a name="module_tests/components/ThemeToggle"></a>

## tests/components/ThemeToggle

Unit tests for the ThemeToggle component.

Testing focus:

- Rendering of both light and dark theme toggle buttons
- Theme state transitions when toggles are activated
- Presence of accessible button labels

Testing philosophy:

- Verifies observable behavior only
- Avoids asserting internal DOM structure or RSuite implementation details
- Treats theme state as a global side effect via `data-theme`

<a name="module_components/blocks"></a>

## components/blocks

Central export barrel for content block components used by
the SectionRenderer system.

Each exported block is responsible for rendering a specific content type
defined by the page or section configuration.

<a name="module_tests/components/StickySectionNav"></a>

## tests/components/StickySectionNav

Unit tests for the StickySectionNav component.

Test coverage:

- Rendering of section navigation links
- Active section highlighting via `aria-current="location"`
- History hash updates on navigation
- Programmatic scroll coordination with scroll-spy logic

Testing strategy:

- Mocks `useScrollSpyWithHistory` to control active section state
- Mocks `window.scrollTo` to prevent actual scrolling
- Uses real DOM nodes to simulate anchor targets

Architectural intent:
StickySectionNav is an **intra-page navigation controller**.
Tests focus on:

- Accessibility semantics
- Navigation side effects (history + scroll)
- Integration boundaries with the scroll-spy hook

<a name="module_tests/components/StickySectionNav..markProgrammaticScroll"></a>

### tests/components/StickySectionNav~markProgrammaticScroll

Mock scroll-spy hook to control active section state
and observe programmatic scroll suppression behavior.

**Kind**: inner constant of [<code>tests/components/StickySectionNav</code>](#module_tests/components/StickySectionNav)  
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

<a name="FeatureSection"></a>

## FeatureSection : [<code>FeatureSection</code>](#FeatureSection)

**Kind**: global typedef  
