## Modules

<dl>
<dt><a href="#module_types/navigation">types/navigation</a></dt>
<dd><p>Shared navigation-related type definitions used across the
section registry, scroll persistence, and navigation components.</p>
</dd>
<dt><a href="#module_types/ui">types/ui</a></dt>
<dd><p>Shared UI-related type definitions used across components,
including buttons, icons, layout utilities, block renderers, and markdown documentation.
Provides JSDoc typedefs for all UI component props, enums for styling variants,
factory functions for initializing block structures, and the central block renderer registry.</p>
</dd>
<dt><a href="#module_assets/hooks/useClipboard">assets/hooks/useClipboard</a></dt>
<dd><p>React hook that provides a safe, asynchronous interface for copying text
to the system clipboard using the Web Clipboard API.</p>
</dd>
<dt><a href="#module_tests/hooks/useClipboard">tests/hooks/useClipboard</a></dt>
<dd><p>Tests the clipboard copying functionality, state management, and error handling of the useClipboard hook.</p>
<p>Test plan:</p>
<ul>
<li>copies valid text and resets copied state after the configured delay</li>
<li>returns false and does not call the clipboard API for empty input</li>
<li>surfaces an error when the clipboard API is unavailable</li>
</ul>
<p>Note: the hook&#39;s internal timer is mocked to keep tests deterministic and fast.</p>
<p>Testing strategy:</p>
<ul>
<li>Mocks the clipboard API to verify interactions without relying on actual clipboard access</li>
<li>Uses fake timers to control the timing of state resets without waiting in real time</li>
<li>Asserts the hook&#39;s return values and state changes based on different input scenarios</li>
<li>Covers both typical usage and edge cases to ensure robust behavior</li>
</ul>
</dd>
<dt><a href="#module_assets/hooks/useLongPress">assets/hooks/useLongPress</a></dt>
<dd><p>Custom React hook for detecting long-press interactions on an element. It provides a simple API to execute a callback function when a long-press is detected, with support for both mouse and touch events. The hook allows for a configurable threshold duration to define what constitutes a long-press.
This hook is useful for implementing features like context menus, drag-and-drop, or any interaction that requires a sustained press on an element.</p>
<p>Capabilities:</p>
<ul>
<li>Detects long-press interactions for both mouse and touch events</li>
<li>Configurable threshold duration for long-press detection</li>
<li>Provides a simple API for integrating long-press functionality into any component
Usage:
const longPressHandlers = useLongPress(() =&gt; {
// Handle long-press action here
}, 700);</li>
</ul>
</dd>
<dt><a href="#module_assets/hooks/useScrollSpy">assets/hooks/useScrollSpy</a></dt>
<dd><p>Hierarchical scroll-spy with URL history synchronization.</p>
<p>Responsibilities:</p>
<ul>
<li>Observes section + subsection elements using IntersectionObserver</li>
<li>Tracks the currently active <em>leaf</em> node (deepest visible section)</li>
<li>Derives the active parent chain from the leaf</li>
<li>Syncs URL hash without page jumps</li>
<li>Supports programmatic scrolling without feedback loops</li>
</ul>
<p>Design principles:</p>
<ul>
<li>Scroll position is the single source of truth</li>
<li>Navigation clicks cause scroll, not state writes</li>
<li>Only the observer updates active state</li>
</ul>
<p>This hook is safe to use with:</p>
<ul>
<li>Sticky desktop nav</li>
<li>Mobile drawer nav</li>
<li>Collapsible subsection dropdowns</li>
</ul>
</dd>
<dt><a href="#module_tests/hooks/useScrollSpy">tests/hooks/useScrollSpy</a></dt>
<dd><p>Hook tests for useScrollSpyWithHistory.</p>
<p>Gold-standard rules followed:</p>
<ul>
<li>browser APIs are mocked</li>
<li>calls are wrapped in act()</li>
<li>async updates use waitFor()</li>
<li>assertions target public return values only</li>
</ul>
</dd>
<dt><a href="#module_assets/utils">assets/utils</a></dt>
<dd><p>Collection of shared utility helpers used across the application.
These functions are intentionally small, side-effect free, and reusable.</p>
</dd>
<dt><a href="#module_components/ResumePreview/PreviewResume">components/ResumePreview/PreviewResume</a></dt>
<dd><p>Modal-based resume preview and download component.</p>
</dd>
<dt><a href="#module_components/ResumePreview">components/ResumePreview</a></dt>
<dd><p>Main export for the resume preview feature.</p>
</dd>
<dt><a href="#module_tests/components/ResumePreview">tests/components/ResumePreview</a></dt>
<dd><p>Unit tests for the ResumePreview component.</p>
<p>Test coverage:</p>
<ul>
<li>Modal opens when the trigger button is clicked</li>
<li>Modal renders the resume content when opened</li>
<li>Modal closes when the close button is clicked</li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Mocks external dependencies (Btn and rsuite Modal components) to isolate testing to ResumePreview&#39;s behavior</li>
<li>Uses user-facing queries to verify the presence of interactive elements and content</li>
<li>Simulates user interactions (clicks) to test modal open/close behavior</li>
<li>Asserts the presence or absence of the modal and its content based on user actions</li>
</ul>
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
<dt><a href="#module_components/layout/InfoSection">components/layout/InfoSection</a></dt>
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
<dt><a href="#module_components/renderers/blocks/CardGridBlock">components/renderers/blocks/CardGridBlock</a></dt>
<dd><p>Tests for the CardGridBlock component, ensuring it renders insight cards correctly when items are provided and returns nothing when there are no items.</p>
</dd>
<dt><a href="#module_components/renderers/blocks/CardGridBlock">components/renderers/blocks/CardGridBlock</a></dt>
<dd><p>A block component for displaying a grid of InsightCards. It takes a block object containing the title, number of columns, and an array of items to be displayed as cards. Each item should have properties such as title, icon, subtitle, variant (accent color), and content.</p>
</dd>
<dt><a href="#module_components/renderers/blocks/FormBlock/fieldRegistry">components/renderers/blocks/FormBlock/fieldRegistry</a></dt>
<dd><p>Centralized registry and utilities for form field definitions in FormBlock.
This module defines standard accepters for various field types, normalization of field configs, and rendering logic to map field definitions to actual form controls.
The registry supports both simple field types that map directly to a single accepter component, as well as more complex types that require custom rendering logic (e.g., select fields with options, input groups with addons).
The normalization function allows for legacy field definitions to be used without breaking changes, while the initial values builder helps construct the default form state based on field configurations.</p>
</dd>
<dt><a href="#module_components/blocks/FormBlock">components/blocks/FormBlock</a></dt>
<dd><p>Main FormBlock component that renders a dynamic form based on a provided schema. It uses RSuite&#39;s Form components under the hood and supports various field types, validation, and conditional rendering. The component is designed to be flexible and extensible, allowing for custom field types and complex form logic.</p>
</dd>
<dt><a href="#module_components/PageHeader">components/PageHeader</a></dt>
<dd><p>Standardized page-level header component used to introduce
pages and major sections with consistent hierarchy and styling.</p>
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
<dt><a href="#module_src/components/renderers/blocks/ImageGalleryBlock">src/components/renderers/blocks/ImageGalleryBlock</a></dt>
<dd><p>Renders a responsive image gallery inside a collapsible,
frosted-style panel.</p>
</dd>
<dt><a href="#module_components/blocks">components/blocks</a></dt>
<dd><p>Centralized export module for all block components used in page rendering.
This file serves as a single point of import for all block types, promoting
modularity and ease of maintenance across the codebase.</p>
<p>Note: When adding new block types, simply import them here and include them in the export statement.</p>
</dd>
<dt><a href="#module_components/renderers/blocks/LinksBlock">components/renderers/blocks/LinksBlock</a></dt>
<dd><p>Renders a list of link buttons inside a collapsible frosted panel.This component is designed to be used as a block renderer within the section
content system. It takes a list of link definitions and renders them as styled buttons
with appropriate attributes for external links, downloads, and accessibility.</p>
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
<dt><a href="#module_components/RichText">components/RichText</a></dt>
<dd><p>Renders rich text content which may include plain strings, arrays,
or structured rich text nodes.</p>
</dd>
<dt><a href="#module_components/renderers/RichText/renderNode">components/renderers/RichText/renderNode</a></dt>
<dd><p>Tests for the renderNode function, ensuring it correctly renders various node types such as text, links, lists, code blocks, and inline icons, and handles unknown or null nodes gracefully without throwing errors.</p>
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
<dt><a href="#tests/components/ui/BtnNote_ The rsuite Button and IconButton components are mocked to simplify testing and focus on Btns behavior rather than the underlying library implementation.The FrostedIcon component is also mocked to provide a simple representation for testing purposes.module_">tests/components/ui/BtnNote: The rsuite Button and IconButton components are mocked to simplify testing and focus on Btns behavior rather than the underlying library implementation.The FrostedIcon component is also mocked to provide a simple representation for testing purposes.</a></dt>
<dd><p>Unit tests for the Btn component.
Testing focus:</p>
<ul>
<li>Click handling behavior (invocation, disabled state)</li>
<li>Accessibility features (icon-only naming, button type)</li>
<li>Async behavior (busy state during pending operations)</li>
</ul>
<p>Design intent:
Btn is designed to be a versatile button component that can handle various use cases, including icon-only buttons and async operations. The tests ensure that it behaves correctly in these scenarios while maintaining accessibility standards.</p>
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
<dt><a href="#module_components/ui">components/ui</a></dt>
<dd><p>Centralized export module for shared UI components. This file serves as a single point of import for all commonly used UI elements across the codebase, promoting modularity and ease of maintenance.</p>
<p>Note: When adding new shared UI components, simply import them here and include them in the export statement.</p>
</dd>
<dt><a href="#module_components/ui/InsightCard">components/ui/InsightCard</a></dt>
<dd><p>InsightCard and CardGrid components for displaying key insights in a visually engaging card format.</p>
</dd>
<dt><a href="#module_components/MermaidDiagram">components/MermaidDiagram</a></dt>
<dd><p>Fully featured Mermaid diagram renderer with dark/light theme support, responsive SVG layout, accessible container, optional description, and PNG export capability. The component normalizes props to support both legacy and new diagram configurations, allowing for flexible integration while maintaining a consistent internal state structure for rendering.</p>
</dd>
<dt><a href="#module_components/ProjectCard">components/ProjectCard</a></dt>
<dd><p>Reusable frosted-glass project display card used to present
portfolio projects with images, repository links, and live URLs.</p>
</dd>
<dt><a href="#module_pages/CodeStream">pages/CodeStream</a></dt>
<dd><p>Professional work case study page for CodeStream Online Studio, featuring a data-driven layout with synchronized sticky navigation and scroll-spy behavior.</p>
</dd>
<dt><a href="#module_tests/pages/Hackathon">tests/pages/Hackathon</a></dt>
<dd><p>Page-level tests for the Hackathon page.</p>
<p>Testing focus:</p>
<ul>
<li>Page renders without crashing</li>
<li>Correct route association with StickyNav</li>
<li>Correct section configuration for SectionRenderer</li>
<li>Shared page guarantees enforced via <code>createPageTests</code></li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Delegates all assertions to the shared <code>createPageTests</code> helper</li>
<li>Treats the page as declarative configuration</li>
<li>Avoids duplicating boilerplate page assertions</li>
</ul>
<p>Architectural intent:
The Hackathon page follows the standard page composition pattern:</p>
<ul>
<li>PageHeader</li>
<li>One or more SectionRenderer instances</li>
<li>StickyNav + StickySectionNav</li>
</ul>
<p>This test file exists solely to bind the Hackathon page’s
section configuration and route to the shared test contract.</p>
</dd>
<dt><a href="#module_components/Health">components/Health</a></dt>
<dd><p>Lightweight diagnostic component that displays basic
runtime and build environment information.</p>
</dd>
<dt><a href="#module_tests/pages/Home">tests/pages/Home</a></dt>
<dd><p>Page-level tests for the Home page.</p>
<p>Testing focus:</p>
<ul>
<li>Page renders without crashing</li>
<li>Correct route association</li>
<li>Correct section configuration</li>
<li>Shared page behavior via <code>createPageTests</code></li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Delegates all assertions to the shared <code>createPageTests</code> helper</li>
<li>Ensures consistency across all page tests</li>
<li>Avoids duplicating boilerplate page assertions</li>
</ul>
<p>Architectural intent:
Page test files act as <strong>thin configuration layers</strong>.
All behavioral guarantees are centralized in <code>createPageTests</code>,
allowing pages to be tested declaratively rather than imperatively.</p>
</dd>
<dt><a href="#module_tests/pages/SideProjects">tests/pages/SideProjects</a></dt>
<dd><p>Page-level tests for the SideProjects page.</p>
<p>Testing focus:</p>
<ul>
<li>Page renders without crashing</li>
<li>Correct route association with StickyNav</li>
<li>Correct section configuration for SectionRenderer</li>
<li>Shared page guarantees enforced via <code>createPageTests</code></li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Delegates all assertions to the shared <code>createPageTests</code> helper</li>
<li>Keeps page tests declarative and configuration-driven</li>
<li>Avoids duplicating boilerplate test logic</li>
</ul>
<p>Architectural intent:
The SideProjects page adheres to the standard page composition model:</p>
<ul>
<li>PageHeader</li>
<li>SectionRenderer instances (driven by section data)</li>
<li>StickyNav + StickySectionNav</li>
</ul>
<p>This test file exists solely to bind SideProjects-specific
configuration to the shared page test contract.</p>
</dd>
<dt><a href="#module_tests/pages/SMU">tests/pages/SMU</a></dt>
<dd><p>Page-level tests for the SMU page.</p>
<p>Testing focus:</p>
<ul>
<li>Page renders without crashing</li>
<li>Correct route association with StickyNav</li>
<li>Correct section configuration for SectionRenderer</li>
<li>Shared page guarantees enforced via <code>createPageTests</code></li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Delegates all assertions to the shared <code>createPageTests</code> helper</li>
<li>Keeps page tests declarative and configuration-driven</li>
<li>Avoids duplicating boilerplate assertions across pages</li>
</ul>
<p>Architectural intent:
The SMU page follows the same standardized page architecture as
the rest of the site:</p>
<ul>
<li>PageHeader</li>
<li>SectionRenderer instances driven by section data</li>
<li>StickyNav + StickySectionNav for navigation</li>
</ul>
<p>This test file exists solely to bind SMU-specific
configuration (sections + route) to the shared page test contract.</p>
</dd>
<dt><a href="#module_tests/pages/CodeStream">tests/pages/CodeStream</a></dt>
<dd><p>Page-level tests for the CodeStream page.</p>
<p>Testing focus:</p>
<ul>
<li>Page renders without crashing</li>
<li>Correct route association with StickyNav</li>
<li>Correct section configuration for SectionRenderer</li>
<li>Shared page guarantees enforced via <code>createPageTests</code></li>
</ul>
<p>Testing strategy:</p>
<ul>
<li>Delegates all assertions to the shared <code>createPageTests</code> helper</li>
<li>Treats the page as declarative configuration</li>
<li>Avoids duplicating boilerplate assertions</li>
</ul>
<p>Architectural intent:
The CodeStream page follows the standard page architecture:</p>
<ul>
<li>PageHeader</li>
<li>SectionRenderer (one per section)</li>
<li>StickyNav + StickySectionNav</li>
</ul>
<p>This test file exists solely to bind configuration
(sections + route) to the shared test contract.</p>
</dd>
<dt><a href="#module_tests/pages/Contact">tests/pages/Contact</a></dt>
<dd><p>Tests for the Contact page, focusing on form submission behavior and error handling.</p>
<p>Testing strategy:</p>
<ul>
<li>Mocks the global fetch function to simulate API responses for contact form submissions.</li>
<li>Tests successful form submission by verifying that the correct API endpoint is called with the expected payload.</li>
<li>Tests error handling by simulating a failed API response and verifying that the appropriate error message is displayed, as well as allowing for a retry of the submission.</li>
</ul>
<p>Design intent:
The Contact page is designed to allow users to send messages through a contact form. The tests ensure that the form submission process works correctly, including handling both successful and failed submissions. By mocking the fetch function, we can isolate the component&#39;s behavior and verify that it interacts with the API as expected without relying on actual network requests.</p>
</dd>
<dt><a href="#module_scripts/check-jsdoc2md-compat">scripts/check-jsdoc2md-compat</a></dt>
<dd><p>Audits JSDoc blocks for jsdoc2md compatibility and baseline professional file-level docs.</p>
</dd>
<dt><a href="#module_format-mermaid">format-mermaid</a></dt>
<dd><p>Deterministic formatter for Mermaid diagram source strings.</p>
<p>This module operates on raw Mermaid source text and enforces:</p>
<ul>
<li>Structural indentation</li>
<li>Whitespace normalization</li>
<li>Mermaid grammar safety (Mermaid v11 compatible)</li>
</ul>
<p>Characteristics:</p>
<ul>
<li>Pure function (no side effects)</li>
<li>Idempotent (repeated runs produce the same output)</li>
<li>Project-agnostic (safe to reuse elsewhere)</li>
</ul>
<p>IMPORTANT:</p>
<ul>
<li>This module does NOT read or write files</li>
<li>It does NOT validate diagram correctness</li>
<li>It only normalizes formatting</li>
</ul>
</dd>
</dl>

## Members

<dl>
<dt><a href="#ResumeSection">ResumeSection</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A section within the resume document, used to group related content under a common heading.</p>
</dd>
<dt><a href="#ResumeDocument">ResumeDocument</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Component responsible for rendering a structured resume document based on provided data.</p>
</dd>
<dt><a href="#LazyDisplay">LazyDisplay</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A simple component to display a loading message and an optional icon while a lazy-loaded component is being fetched.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#diagram">diagram</a> ⇒ <code>string</code></dt>
<dd><p>Diagram helper that injects a standard architecture layer palette into flowchart diagrams and formats with Mermaid init.
This ensures consistent styling and layer definitions across all architecture diagrams without requiring manual palette inclusion, while leaving non-flowchart diagrams unaffected.</p>
</dd>
<dt><a href="#CONTACT_API_URL">CONTACT_API_URL</a> : <code>string</code></dt>
<dd><p>Contact service endpoint used by the public portfolio form.
Exported for testability and to keep the request contract centralized.</p>
</dd>
<dt><a href="#DIAGRAM_BLOCK_RE">DIAGRAM_BLOCK_RE</a></dt>
<dd><p>Regex finds:
diagram: <code>...</code></p>
</dd>
<dt><a href="#CORE_TYPES">CORE_TYPES</a></dt>
<dd><h2 id="valid_mermaid_types">VALID_MERMAID_TYPES</h2>
<p>Hybrid strict mode:</p>
<ul>
<li>CORE_TYPES are always allowed</li>
<li>EXTENDED_TYPES are allowed but validated more strictly</li>
</ul>
</dd>
<dt><a href="#OUTPUT_DIR">OUTPUT_DIR</a></dt>
<dd><p>Output directory for rendered PNG assets.</p>
<p>This directory is expected to be committed or published
alongside generated documentation.</p>
</dd>
<dt><a href="#VIEWPORT">VIEWPORT</a></dt>
<dd><p>Fixed viewport ensures:</p>
<ul>
<li>Consistent diagram scaling</li>
<li>Predictable text wrapping</li>
<li>Stable screenshot output across environments</li>
</ul>
</dd>
<dt><a href="#DIAGRAM_ENTRIES">DIAGRAM_ENTRIES</a> : <code>Array.&lt;{id: string, route: string}&gt;</code></dt>
<dd><p>Each entry maps a Mermaid diagram block ID to the page route where it renders.</p>
</dd>
<dt><a href="#DIAGRAM_IDS">DIAGRAM_IDS</a></dt>
<dd><p>Flat list of just the IDs, for utilities that only need strings.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getBreakpoint">getBreakpoint()</a> ⇒ <code>string</code></dt>
<dd><p>Helper function that checks the current viewport width against defined breakpoints using media queries. It returns a string indicating the current breakpoint category: &quot;mobile&quot;, &quot;tablet&quot;, or &quot;desktop&quot;. This function is used internally by the <code>useBreakpoint</code> hook to determine the initial breakpoint state and to update it when the viewport size changes.</p>
</dd>
<dt><a href="#getOrientation">getOrientation()</a> ⇒ <code>string</code></dt>
<dd><p>Helper function that checks the current viewport orientation using media queries.</p>
</dd>
<dt><a href="#useBreakpoint">useBreakpoint()</a> ⇒ <code><a href="#BreakpointState">BreakpointState</a></code></dt>
<dd><p>Custom React hook that provides responsive breakpoint and orientation information based on window.matchMedia.
It returns the current breakpoint and orientation, along with boolean flags for convenience.
The hook listens for changes in viewport size and orientation, updating the state accordingly.
It is designed to be used in any component that needs to adapt its layout or behavior based on the current screen size and orientation.</p>
</dd>
<dt><a href="#useResponsiveValue">useResponsiveValue(values)</a> ⇒ <code>*</code></dt>
<dd><p>Custom React hook that returns a value based on the current responsive breakpoint.
It accepts an object with optional values for mobile, tablet, and desktop breakpoints.
The hook uses the <code>useBreakpoint</code> hook to determine the current breakpoint and returns
the corresponding value, falling back to smaller breakpoints if a value is not provided.</p>
</dd>
<dt><a href="#buildArchitectureVariants">buildArchitectureVariants(config)</a> ⇒ <code>Object</code></dt>
<dd><ul>
<li>Builds desktop and mobile Mermaid sources from a single architecture config.</li>
</ul>
<p>Mobile rules:</p>
<ul>
<li>Default direction becomes TB unless explicitly set by config.mobile.direction</li>
<li>Optionally stack layer order unchanged (TB handles readability)</li>
</ul>
</dd>
<dt><a href="#registerDiagram">registerDiagram(id, entry)</a></dt>
<dd><p>Register a diagram configuration. The config is opaque to the registry, but will be used by the diagram factory to produce renderable Mermaid sources.</p>
</dd>
<dt><a href="#getDiagramEntry">getDiagramEntry(id)</a> ⇒ <code>object</code> | <code>undefined</code></dt>
<dd><p>Get a registered diagram entry by id.</p>
</dd>
<dt><a href="#listDiagramIds">listDiagramIds()</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>List registered diagram ids, sorted alphabetically.</p>
</dd>
<dt><a href="#buildDiagramSources">buildDiagramSources(id)</a> ⇒ <code>object</code></dt>
<dd><p>Build Mermaid sources for a given diagram id. The sources are generated based on the diagram&#39;s type and config, and may include variants for different contexts (e.g., desktop vs mobile).</p>
</dd>
<dt><a href="#buildAllDiagramSources">buildAllDiagramSources()</a> ⇒ <code>Array</code></dt>
<dd><p>Build all sources (useful for linting/CI).</p>
</dd>
<dt><a href="#getResponsiveFlowchartInit">getResponsiveFlowchartInit(options)</a> ⇒ <code>string</code></dt>
<dd><p>Generates a Mermaid init block based on responsive and accessibility context.
This allows diagrams to adapt to user preferences and device constraints.
Currently adjusts flowchart diagrams for mobile breakpoint, reduced motion, reduced transparency, and high contrast modes.</p>
</dd>
<dt><a href="#resolveDiagram">resolveDiagram(def)</a> ⇒ <code><a href="#DiagramDefinition">DiagramDefinition</a></code></dt>
<dd><ul>
<li>Resolves diagram definitions into renderable diagrams.</li>
</ul>
</dd>
<dt><a href="#collectDocumentStyles">collectDocumentStyles()</a> ⇒ <code>string</code></dt>
<dd><p>Collects all styles from the current document to ensure that the print preview has consistent styling. This function gathers both inline styles and linked stylesheets, concatenating their outer HTML into a single string that can be injected into the print preview document.</p>
</dd>
<dt><a href="#PreviewResumeModal">PreviewResumeModal(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Modal component for previewing the resume with print and download options.</p>
</dd>
<dt><a href="#ResumePreviewTrigger">ResumePreviewTrigger(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Component that triggers the resume preview modal.</p>
</dd>
<dt><a href="#InlineIcon">InlineIcon(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="inlineicon">InlineIcon</h2>
<p>Renders a lightweight, inline icon placeholder.</p>
<p>This component is intentionally decoupled from any specific icon library.
Styling and actual icon rendering should be handled via CSS or a higher-level
icon system.</p>
</dd>
<dt><a href="#renderNode">renderNode(node, key)</a> ⇒ <code>JSX.Element</code> | <code>string</code> | <code>null</code></dt>
<dd><h2 id="rendernode">renderNode</h2>
<p>Recursively renders a <code>RichTextNode</code> into a React element.</p>
<p>Design notes:</p>
<ul>
<li>Uses a single switch statement for explicit, readable control flow</li>
<li>Recursion allows arbitrarily deep nesting (lists, paragraphs, blockquotes)</li>
<li>Inline nodes return strings or inline elements</li>
<li>Block nodes return semantic container elements</li>
</ul>
</dd>
<dt><a href="#findFieldByNames">findFieldByNames(fields, names)</a> ⇒ <code>Object</code> | <code>undefined</code></dt>
<dd><p>Finds a form field configuration using one or more candidate names.</p>
</dd>
<dt><a href="#buildContactFormContent">buildContactFormContent(schema)</a> ⇒ <code>Object</code></dt>
<dd><p>Derives presentational content for the contact form from content data.</p>
<p>This keeps visual copy in CMS-like data while preserving this page&#39;s current
API payload contract (<code>name</code>, <code>email</code>, and <code>message</code>).</p>
</dd>
<dt><a href="#normalizeContactPayload">normalizeContactPayload(data)</a> ⇒ <code>Object</code></dt>
<dd><p>Safely normalizes user-entered contact form values before transmission.</p>
</dd>
<dt><a href="#sendMessage">sendMessage(data)</a> ⇒ <code>Promise.&lt;{message: (string|undefined), error: (string|undefined)}&gt;</code></dt>
<dd><p>Sends a contact form payload to the mail microservice.</p>
<p>The request contract intentionally uses JSON because the server expects
<code>express.json()</code> parsing on the <code>/api/contact</code> route.</p>
</dd>
<dt><a href="#Docs">Docs()</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="docs-page">Docs Page</h2>
<p>Full-page documentation experience for project architecture, navigation,
scripts, tests, and shared type systems.</p>
</dd>
<dt><a href="#Hackathon">Hackathon()</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="hackathon-page">Hackathon Page</h2>
<p>Long-form narrative + technical breakdown of the Daimler hackathon project.
The page is rendered from <code>hackathonData</code> for consistency with other pages.</p>
</dd>
<dt><a href="#Home">Home()</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="home-page">Home Page</h2>
<p>A data-driven landing page that gives recruiters and hiring managers a
high-level map of the portfolio and clear CTAs into deeper pages.</p>
<p>Content is rendered from <code>assets/data/pageMetas.js</code> and <code>assets/data/homeSections.js</code> so it can be updated
without touching layout code.</p>
</dd>
<dt><a href="#NotFound">NotFound()</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="notfound-component">NotFound Component</h2>
<p>A polished 404 error page using RSuite components and the
frosted-glass UI system.</p>
<p>Features:</p>
<ul>
<li>Centered layout with FlexboxGrid</li>
<li>Frosted glass panel styling</li>
<li>Clear error messaging and recovery path</li>
<li>Accessible, keyboard-friendly navigation</li>
</ul>
</dd>
<dt><a href="#SideProjects">SideProjects()</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="sideprojects-page">SideProjects Page</h2>
<p>Data-driven portfolio page showcasing personal projects.
Renders <code>sideProjectsData</code> into consistent frosted UI sections.</p>
</dd>
<dt><a href="#Smu">Smu()</a> ⇒ <code>JSX.Element</code></dt>
<dd><h2 id="smu-page">SMU Page</h2>
<p>Academic project showcase page.
Uses the same section/block rendering system as professional work and
side projects to keep UI and content structure consistent.</p>
</dd>
<dt><a href="#run">run()</a></dt>
<dd><p>Main execution function for building diagram assets.</p>
</dd>
<dt><a href="#addReactKeys">addReactKeys(file, api)</a> ⇒ <code>string</code></dt>
<dd><p>Main codemod function that traverses the AST to find JSX elements
returned from array <code>.map()</code> calls and adds missing <code>key</code> props.
The function uses <code>jscodeshift</code> to manipulate the AST and applies the following logic:</p>
<ol>
<li>Identify <code>.map()</code> calls and their callback functions.</li>
<li>For each JSX element returned from the callback, check if it already has a <code>key</code> prop.</li>
<li>If not, attempt to add a <code>key</code> prop using the following priority:
a. If the callback has an item parameter (e.g., <code>item</code>), use <code>item.id</code> as the key.
b. If the callback has an index parameter (e.g., <code>index</code>), use the index as a fallback key.</li>
<li>Skip any JSX elements that already have a <code>key</code> prop defined.</li>
</ol>
</dd>
<dt><a href="#fixJsdocImportTypes">fixJsdocImportTypes(file, api)</a> ⇒ <code>string</code></dt>
<dd><p>Codemod function that rewrites unsupported JSDoc <code>import()</code> type references into plain type identifiers.</p>
</dd>
<dt><a href="#fixRichText">fixRichText(nodes)</a> ⇒ <code>Array</code></dt>
<dd><p>Cleans and normalizes rich text nodes by trimming whitespace, removing empty text nodes, and merging adjacent text nodes.</p>
</dd>
<dt><a href="#fixUnusedMapIndex">fixUnusedMapIndex(file, api)</a> ⇒ <code>string</code></dt>
<dd><p>Main codemod function that traverses the AST to find <code>.map()</code> calls and renames unused index parameters to <code>_index</code>.
The function uses <code>jscodeshift</code> to manipulate the AST and applies the following logic:</p>
<ol>
<li>Identify <code>.map()</code> calls and their callback functions.</li>
<li>Check if the callback has at least two parameters (item and index).</li>
<li>Verify that the second parameter (index) is an Identifier.</li>
<li>Traverse the callback body to check if the index parameter is referenced.</li>
<li>If the index parameter is not used, rename it to <code>_index</code>.</li>
</ol>
</dd>
<dt><a href="#needsRgbCompanion">needsRgbCompanion()</a></dt>
<dd><p>Returns true only when a token&#39;s value is a raw (non-var) color literal.
Tokens that compose via var() don&#39;t need their own -rgb companion because
the base palette token they reference already provides one.
Values like box-shadows, borders, and gradients that <em>contain</em> a color
expression are not &quot;color tokens&quot; — the value must start with a color
function or hex literal to qualify.</p>
</dd>
<dt><a href="#stripInit">stripInit()</a></dt>
<dd><p>Removes the Mermaid init block for structural validation only.</p>
</dd>
<dt><a href="#extractSources">extractSources()</a></dt>
<dd><p>Extracts all Mermaid source strings from a diagram block.</p>
</dd>
<dt><a href="#lintDiagram">lintDiagram()</a></dt>
<dd><p>Performs structural validation on a single Mermaid diagram block.</p>
</dd>
<dt><a href="#run">run()</a></dt>
<dd><p>ENTRYPOINT BEHAVIOR</p>
</dd>
<dt><a href="#normalizeMermaidSource">normalizeMermaidSource(source)</a> ⇒ <code>string</code></dt>
<dd><p>Normalizes Mermaid diagram source for consistent linting.
This function ensures:</p>
<ul>
<li>Proper newline after init block</li>
<li>Blank line after diagram declaration</li>
<li>Consistent line endings</li>
<li>Trims leading whitespace
This is a best-effort normalization to improve linting consistency.
It does NOT attempt to fully parse or validate Mermaid syntax.
It simply applies common formatting fixes to reduce false positives in linters.</li>
</ul>
</dd>
<dt><a href="#normalizeDiagrams">normalizeDiagrams(input)</a> ⇒ <code>array</code></dt>
<dd><p>Normalizes a diagram collection into a consistent array format.
Supports both object maps and legacy arrays. Applies Mermaid source normalization.
This function is designed to be flexible and forgiving, allowing for various input shapes while ensuring a predictable output structure for downstream processing.</p>
</dd>
<dt><a href="#normalizeMermaidSource">normalizeMermaidSource(source)</a> ⇒ <code>string</code></dt>
<dd><p>Normalizes a Mermaid diagram source string by removing init blocks,
normalizing line endings, and trimming leading whitespace.</p>
</dd>
<dt><a href="#render">render()</a></dt>
<dd><p>Renders all Mermaid diagram blocks to PNG images.</p>
<p>Execution flow:</p>
<ol>
<li>Ensure output directory exists</li>
<li>Launch headless Chromium</li>
<li>Load Mermaid in an isolated HTML shell</li>
<li>Inject diagram source one at a time</li>
<li>Screenshot rendered output</li>
<li>Close browser</li>
</ol>
<p>This function is intentionally sequential to:</p>
<ul>
<li>Avoid race conditions in Mermaid rendering</li>
<li>Prevent memory pressure from concurrent pages</li>
</ul>
</dd>
<dt><a href="#validateRichText">validateRichText(nodes)</a> ⇒ <code>Array</code></dt>
<dd><p>Validates an array of rich text nodes against expected structure and content rules.
Validation rules include:</p>
<ul>
<li>Node types must be recognized and allowed</li>
<li><li> elements must be properly nested inside <ul> or <ol></li>
<li><a> elements must include an href attribute</li>
<li><p> elements should not exceed 600 characters of combined text content</li>
<li>Single <p> blocks are discouraged (but not disallowed)</li>
</ul>
</dd>
<dt><a href="#flattenText">flattenText(children)</a> ⇒ <code>string</code></dt>
<dd><p>Recursively concatenates text content from a node&#39;s children.
This is used to calculate the total text length of a <p> block for validation.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#FormFieldOption">FormFieldOption</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#InputGroupConfig">InputGroupConfig</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FormFieldConfig">FormFieldConfig</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FormBlockSchema">FormBlockSchema</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#BreakpointState">BreakpointState</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponsiveValues">ResponsiveValues</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#architectureDiagram">architectureDiagram</a> ⇒ <code>string</code></dt>
<dd><ul>
<li>Custom diagram builder for layered architecture diagrams with built-in validation and styling conventions. This function abstracts the complexity of Mermaid syntax while enforcing a consistent structure and visual language for architecture diagrams, making it easier to create clear and maintainable architectural visuals.</li>
</ul>
<p>Key features:</p>
<ul>
<li>Layered structure with subgraphs for clear separation of concerns</li>
<li>Class assignment for consistent styling of components, datastores, and external systems</li>
<li>Edge validation to ensure all connections reference valid nodes</li>
</ul>
<p>Enforces:</p>
<ul>
<li>Subgraph per layer</li>
<li>Class assignment per layer</li>
<li>Datastore formatting</li>
<li>Deterministic structure</li>
</ul>
</dd>
<dt><a href="#DiagramDefinition">DiagramDefinition</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="module_types/navigation"></a>

## types/navigation
Shared navigation-related type definitions used across thesection registry, scroll persistence, and navigation components.


* [types/navigation](#module_types/navigation)
    * _static_
        * [.PageRoute](#module_types/navigation.PageRoute) : <code>enum</code>
    * _inner_
        * [~NavigationSection](#module_types/navigation..NavigationSection) : <code>Object</code>
        * [~SectionRegistry](#module_types/navigation..SectionRegistry) : <code>Object.&lt;string, NavigationSection&gt;</code>
        * [~ScrollPositionState](#module_types/navigation..ScrollPositionState) : <code>Object</code>
        * [~RegisterSection](#module_types/navigation..RegisterSection) ⇒ <code>void</code>
        * [~UnregisterSection](#module_types/navigation..UnregisterSection) ⇒ <code>void</code>

<a name="module_types/navigation.PageRoute"></a>

### types/navigation.PageRoute : <code>enum</code>
Route types

**Kind**: static enum of [<code>types/navigation</code>](#module_types/navigation)  
**Read only**: true  
<a name="module_types/navigation..NavigationSection"></a>

### types/navigation~NavigationSection : <code>Object</code>
Represents a single navigable section registered with the application.

**Kind**: inner typedef of [<code>types/navigation</code>](#module_types/navigation)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique identifier for the section (used as anchor/hash). |
| label | <code>string</code> | Human-readable label displayed in navigation UI. |
| order | <code>number</code> | Sort order determining vertical and nav placement. |
| element | <code>HTMLElement</code> \| <code>null</code> | DOM element associated with the section. |
| [hidden] | <code>boolean</code> | Whether the section should be excluded from nav. |

<a name="module_types/navigation..SectionRegistry"></a>

### types/navigation~SectionRegistry : <code>Object.&lt;string, NavigationSection&gt;</code>
Map of section IDs to their registered section metadata.

**Kind**: inner typedef of [<code>types/navigation</code>](#module_types/navigation)  
<a name="module_types/navigation..ScrollPositionState"></a>

### types/navigation~ScrollPositionState : <code>Object</code>
Describes the scroll position state persisted between navigations.

**Kind**: inner typedef of [<code>types/navigation</code>](#module_types/navigation)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | Horizontal scroll offset. |
| y | <code>number</code> | Vertical scroll offset. |
| pathname | <code>string</code> | Pathname associated with the saved position. |

<a name="module_types/navigation..RegisterSection"></a>

### types/navigation~RegisterSection ⇒ <code>void</code>
Function signature used to register a section with the registry.

**Kind**: inner typedef of [<code>types/navigation</code>](#module_types/navigation)  

| Param | Type | Description |
| --- | --- | --- |
| section | <code>NavigationSection</code> | Section metadata to register. |

<a name="module_types/navigation..UnregisterSection"></a>

### types/navigation~UnregisterSection ⇒ <code>void</code>
Function signature used to unregister a section from the registry.

**Kind**: inner typedef of [<code>types/navigation</code>](#module_types/navigation)  

| Param | Type | Description |
| --- | --- | --- |
| sectionId | <code>string</code> | ID of the section to remove. |

<a name="module_types/ui"></a>

## types/ui
Shared UI-related type definitions used across components,including buttons, icons, layout utilities, block renderers, and markdown documentation.Provides JSDoc typedefs for all UI component props, enums for styling variants,factory functions for initializing block structures, and the central block renderer registry.


* [types/ui](#module_types/ui)
    * _static_
        * [.Size](#module_types/ui.Size) : <code>enum</code>
        * [.Variant](#module_types/ui.Variant) : <code>enum</code>
        * [.Theme](#module_types/ui.Theme) : <code>enum</code>
        * [.createFeatureImage](#module_types/ui.createFeatureImage) ⇒ <code>FeatureImage</code>
        * [.createImageGalleryBlock](#module_types/ui.createImageGalleryBlock) ⇒ <code>ImageGalleryBlock</code>
        * [.createRichTextBlock](#module_types/ui.createRichTextBlock) ⇒ <code>RichTextBlock</code>
        * [.createDiagramBlock](#module_types/ui.createDiagramBlock) ⇒ <code>DiagramBlock</code>
        * [.createCardGridBlock](#module_types/ui.createCardGridBlock) ⇒ <code>CardGridBlock</code>
        * [.createBulletListBlock](#module_types/ui.createBulletListBlock) ⇒ <code>BulletListBlock</code>
        * [.createLinkListBlock](#module_types/ui.createLinkListBlock) ⇒ <code>LinkListBlock</code>
        * [.createHeroBlock](#module_types/ui.createHeroBlock) ⇒ <code>HeroBlock</code>
        * [.createFormBlock](#module_types/ui.createFormBlock) ⇒ <code>FormBlock</code>
        * [.createFeatureSection](#module_types/ui.createFeatureSection) ⇒ <code>FeatureSection</code>
        * [.createMarkdownDocsBlock](#module_types/ui.createMarkdownDocsBlock) ⇒ <code>MarkdownDocsBlock</code>
        * [.isValidEnumValue](#module_types/ui.isValidEnumValue) ⇒ <code>boolean</code>
    * _inner_
        * [~TOP](#module_types/ui..TOP)
        * [~TOP_START](#module_types/ui..TOP_START)
        * [~TOP_END](#module_types/ui..TOP_END)
        * [~BOTTOM](#module_types/ui..BOTTOM)
        * [~BOTTOM_START](#module_types/ui..BOTTOM_START)
        * [~BOTTOM_END](#module_types/ui..BOTTOM_END)
        * [~LEFT](#module_types/ui..LEFT)
        * [~LEFT_START](#module_types/ui..LEFT_START)
        * [~LEFT_END](#module_types/ui..LEFT_END)
        * [~RIGHT](#module_types/ui..RIGHT)
        * [~RIGHT_START](#module_types/ui..RIGHT_START)
        * [~RIGHT_END](#module_types/ui..RIGHT_END)
        * [~NONE](#module_types/ui..NONE)
        * [~LIFT](#module_types/ui..LIFT)
        * [~HIGHLIGHT](#module_types/ui..HIGHLIGHT)
        * [~EMPHASIZE](#module_types/ui..EMPHASIZE)
        * [~TooltipPlacement](#module_types/ui..TooltipPlacement) : <code>enum</code>
        * [~AccordionVariants](#module_types/ui..AccordionVariants) : <code>enum</code>
        * *[~BlockType](#module_types/ui..BlockType) : <code>enum</code>*
        * [~blockSchemas](#module_types/ui..blockSchemas) : <code>enum</code>
        * [~BLOCK_RENDERERS](#module_types/ui..BLOCK_RENDERERS) : <code>Object.&lt;BlockType, React.ComponentType&gt;</code>
        * [~RichTextNodeType](#module_types/ui..RichTextNodeType) : <code>RichTextNode</code>
        * [~createBulletItem(item, [position])](#module_types/ui..createBulletItem) ⇒ <code>BulletItem</code>
        * [~createInsightCard(item, [position])](#module_types/ui..createInsightCard) ⇒ <code>InsightCard</code>
        * [~RichTextNode](#module_types/ui..RichTextNode) : <code>Object.&lt;string, string&gt;</code>
        * [~RichTextNode](#module_types/ui..RichTextNode) : <code>object</code>
        * [~FeatureImage](#module_types/ui..FeatureImage) : <code>object</code>
        * [~LinkItem](#module_types/ui..LinkItem) : <code>object</code>
        * [~BulletItem](#module_types/ui..BulletItem) : <code>object</code>
        * [~InsightCard](#module_types/ui..InsightCard) : <code>object</code>
        * [~CardGridBlock](#module_types/ui..CardGridBlock) : <code>object</code>
        * [~DiagramBlock](#module_types/ui..DiagramBlock) : <code>object</code>
        * [~ImageGalleryBlock](#module_types/ui..ImageGalleryBlock) : <code>object</code>
        * [~BulletListBlock](#module_types/ui..BulletListBlock) : <code>object</code>
        * [~LinkListBlock](#module_types/ui..LinkListBlock) : <code>object</code>
        * [~MarkdownHeading](#module_types/ui..MarkdownHeading) : <code>object</code>
        * [~MarkdownRendererProps](#module_types/ui..MarkdownRendererProps) : <code>object</code>
        * [~MarkdownDocsBlock](#module_types/ui..MarkdownDocsBlock) : <code>object</code>
        * [~FeatureBlock](#module_types/ui..FeatureBlock) : <code>RichTextBlock</code> \| <code>ImageGalleryBlock</code> \| <code>DiagramBlock</code> \| <code>BulletListBlock</code> \| <code>LinkListBlock</code> \| <code>MarkdownDocsBlock</code>
        * [~FeatureSection](#module_types/ui..FeatureSection) : <code>object</code>
        * [~BaseUIProps](#module_types/ui..BaseUIProps) : <code>Object</code>
        * [~IconConfig](#module_types/ui..IconConfig) : <code>Object</code>

<a name="module_types/ui.Size"></a>

### types/ui.Size : <code>enum</code>
Component size variants

**Kind**: static enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui.Variant"></a>

### types/ui.Variant : <code>enum</code>
Visual style variants

**Kind**: static enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui.Theme"></a>

### types/ui.Theme : <code>enum</code>
Theme variants

**Kind**: static enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui.createFeatureImage"></a>

### types/ui.createFeatureImage ⇒ <code>FeatureImage</code>
Create a default FeatureImage using base

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type |
| --- | --- |
| block | <code>object</code> | 

<a name="module_types/ui.createImageGalleryBlock"></a>

### types/ui.createImageGalleryBlock ⇒ <code>ImageGalleryBlock</code>
Create a default ImageGalleryBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;ImageGalleryBlock&gt;</code> | Image gallery block properties. |

<a name="module_types/ui.createRichTextBlock"></a>

### types/ui.createRichTextBlock ⇒ <code>RichTextBlock</code>
Create a default RichTextBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;RichTextBlock&gt;</code> | Rich text block properties. |

<a name="module_types/ui.createDiagramBlock"></a>

### types/ui.createDiagramBlock ⇒ <code>DiagramBlock</code>
Create a default DiagramBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;BulletListBlock&gt;</code> | Diagram block properties. |

<a name="module_types/ui.createCardGridBlock"></a>

### types/ui.createCardGridBlock ⇒ <code>CardGridBlock</code>
Create a default CardGridBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;CardGridBlock&gt;</code> | Card grid block properties. |

<a name="module_types/ui.createBulletListBlock"></a>

### types/ui.createBulletListBlock ⇒ <code>BulletListBlock</code>
Create a default BulletListBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;BulletListBlock&gt;</code> | Bullet list block properties. |

<a name="module_types/ui.createLinkListBlock"></a>

### types/ui.createLinkListBlock ⇒ <code>LinkListBlock</code>
Create a default LinkListBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;LinkListBlock&gt;</code> | Link list block properties. |

<a name="module_types/ui.createHeroBlock"></a>

### types/ui.createHeroBlock ⇒ <code>HeroBlock</code>
Create a default HeroBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;HeroBlock&gt;</code> | Hero block properties. |

<a name="module_types/ui.createFormBlock"></a>

### types/ui.createFormBlock ⇒ <code>FormBlock</code>
Create a default FormBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;FormBlock&gt;</code> | Form block properties. |

<a name="module_types/ui.createFeatureSection"></a>

### types/ui.createFeatureSection ⇒ <code>FeatureSection</code>
Create a default FeatureSection

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  
**Returns**: <code>FeatureSection</code> - Initialized feature section with default values.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [section] | <code>Partial.&lt;FeatureSection&gt;</code> | <code>{}</code> | Feature section properties. |

<a name="module_types/ui.createMarkdownDocsBlock"></a>

### types/ui.createMarkdownDocsBlock ⇒ <code>MarkdownDocsBlock</code>
Factory function to initialize a markdown documentation block with necessary defaults.Ensures proper structure for rendering documentation from portfolio docs registry with configurabletable of contents and navigation.

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  
**Returns**: <code>MarkdownDocsBlock</code> - Initialized markdown docs block with applied defaults.  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;MarkdownDocsBlock&gt;</code> | Markdown docs block properties. |

<a name="module_types/ui.isValidEnumValue"></a>

### types/ui.isValidEnumValue ⇒ <code>boolean</code>
Validate enum membership at runtime

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  
**Returns**: <code>boolean</code> - True if valid enum value.  

| Param | Type | Description |
| --- | --- | --- |
| enumObj | <code>object</code> | Enum object. |
| value | <code>\*</code> | Value to test. |

<a name="module_types/ui..TOP"></a>

### types/ui~TOP
Top-center placement (default)

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..TOP_START"></a>

### types/ui~TOP\_START
Top-left placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..TOP_END"></a>

### types/ui~TOP\_END
Top-right placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..BOTTOM"></a>

### types/ui~BOTTOM
Bottom-center placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..BOTTOM_START"></a>

### types/ui~BOTTOM\_START
Bottom-left placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..BOTTOM_END"></a>

### types/ui~BOTTOM\_END
Bottom-right placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..LEFT"></a>

### types/ui~LEFT
Left-center placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..LEFT_START"></a>

### types/ui~LEFT\_START
Left-top placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..LEFT_END"></a>

### types/ui~LEFT\_END
Left-bottom placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..RIGHT"></a>

### types/ui~RIGHT
Right-center placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..RIGHT_START"></a>

### types/ui~RIGHT\_START
Right-top placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..RIGHT_END"></a>

### types/ui~RIGHT\_END
Right-bottom placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..NONE"></a>

### types/ui~NONE
No hover animation.Use for static elements or where motion would be distracting.

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..LIFT"></a>

### types/ui~LIFT
Subtle vertical lift.Maps to a small translateY + shadow.Safe for glass UIs.

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..HIGHLIGHT"></a>

### types/ui~HIGHLIGHT
Background color change only.No transform, no shadow.Use for text links or low-emphasis actions.

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..EMPHASIZE"></a>

### types/ui~EMPHASIZE
Shadow emphasis without movement.Use when layout stability is critical.

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..TooltipPlacement"></a>

### types/ui~TooltipPlacement : <code>enum</code>
Standardized tooltip placement options for RSuite components.This enum provides a centralized reference for all tooltip placements used across the application, ensuring consistency and ease of maintenance.Each value corresponds to a valid placement option accepted by RSuite's tooltip components, allowing developers to use descriptive keys instead of hardcoding strings throughout the codebase.For example, instead of using "bottomStart" directly in a component, developers can use `TooltipPlacement.BOTTOM_START`, which improves readability and reduces the risk of typos.When adding new placements, simply include them in this enum to maintain a single source of truth for tooltip positioning.

**Kind**: inner enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui..AccordionVariants"></a>

### types/ui~AccordionVariants : <code>enum</code>
Standardized variant options for accordion components.This enum provides a centralized reference for all accordion variants used across the application, ensuring consistency in styling and behavior.Each value corresponds to a specific visual style or behavior pattern for accordion components, allowing developers to use descriptive keys instead of hardcoding strings throughout the codebase.For example, instead of using "default" directly in a component, developers can use `AccordionVariants.DEFAULT`, which improves readability and reduces the risk of typos.When adding new variants, simply include them in this enum to maintain a single source of truth for accordion styling options.

**Kind**: inner enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui..BlockType"></a>

### *types/ui~BlockType : <code>enum</code>*
Enumeration of block types used to define the structure of feature sections.Each block type corresponds to a specific layout or content pattern, enabling dynamic renderingof feature sections based on their defined block type. Each type has an associated renderer componentin the `BLOCK_RENDERERS` registry and required fields defined in `blockSchemas`.**Available block types:**- **HERO**: Full-width hero section with background image, title, subtitle, and call-to-action.- **RICH_TEXT**: Custom rich text content using nested node structure for fine-grained control.- **IMAGE_GALLERY**: Responsive gallery of images with metadata (alt text, captions, titles).- **DIAGRAM**: Mermaid diagram definitions with separate desktop and mobile variants.- **CARD_GRID**: Grid layout of insight cards with customizable column count and variant styling.- **BULLETED_LIST**: List of bullet items rendered as expandable accordion sections for progressive disclosure.- **LINKS**: Collection of styled link items with optional icons, tooltips, and size variants.- **MARKDOWN_DOCS**: Portfolio documentation fetched and rendered as collapsible panels with auto-generated table of contents.**To add new block types:**1. Add new constant to this enum (uppercase with underscores)2. Create renderer component and add it to `BLOCK_RENDERERS`3. Define required fields in `blockSchemas`4. Create factory function (e.g., `createNewBlock()`)5. Update `FeatureBlock` union typedef

**Kind**: inner abstract enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui..blockSchemas"></a>

### types/ui~blockSchemas : <code>enum</code>
Defines the required fields for each block type in the feature section registry.Used as validation reference to ensure block configurations contain all necessary data for proper rendering.Each key corresponds to a BlockType, and its value is an array of required field names.**Field reference by block type:**- **hero**: `title`, `subtitle`, `backgroundImage` - Hero section content and background.- **richText**: `content`, `title` - Rich text nodes array and section heading.- **imageGallery**: `images`, `title` - Image metadata array and section heading.- **diagram**: `desktopDiagram`, `mobileDiagram`, `title` - Device-specific diagram definitions and heading.- **bulletedList**: `items`, `title`, `subtitle` - Bullet items, heading, and optional description.- **links**: `links`, `title` - Link item array and section heading.- **cardGrid**: `cards`, `columns`, `title`, `subtitle`, `icon` - Card items, layout columns, and headers.- **markdownDocs**: `docSlugs`, `title`, `intro` - Documentation slugs to fetch and section headers.**Usage in validation:**```jsconst requiredFields = blockSchemas[block.type];const isValid = requiredFields.every(field => field in block);```**When adding new block types:** Add a new entry with all required field names to maintain validation consistency.

**Kind**: inner enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui..BLOCK_RENDERERS"></a>

### types/ui~BLOCK\_RENDERERS : <code>Object.&lt;BlockType, React.ComponentType&gt;</code>
Central registry mapping BlockType enums to their corresponding React renderer components.Enables dynamic block rendering in feature sections without conditional logic.Each renderer component accepts a `block` prop conforming to its corresponding BlockType schema.**Renderers included:**- **HERO**: [HeroBlock](HeroBlock) - Full-width hero section with background image and CTA.- **RICH_TEXT**: [RichTextBlock](RichTextBlock) - Custom rich text content with nested node trees.- **IMAGE_GALLERY**: [ImageGalleryBlock](ImageGalleryBlock) - Responsive image gallery with metadata.- **DIAGRAM**: [MermaidDiagram](MermaidDiagram) - Mermaid diagram definitions with desktop/mobile variants.- **CARD_GRID**: [CardGridBlock](CardGridBlock) - Grid layout of insight cards with customizable columns.- **BULLETED_LIST**: [AccordionList](AccordionList) - Bullet items rendered as expandable accordion sections.- **LINKS**: [LinksBlock](LinksBlock) - Collection of styled link items with optional icons and tooltips.- **MARKDOWN_DOCS**: [MarkdownDocsBlock](MarkdownDocsBlock) - Portfolio documentation rendered as collapsible panels with TOC.**Usage example:**```jsconst blockComponent = BLOCK_RENDERERS[block.type];return blockComponent ? <blockComponent block={block} /> : null;```**When adding new block types:**1. Create renderer component and add type definition (e.g. `NewBlock` variable)2. Add type to `BlockType` enum (uppercase naming convention)3. Update `blockSchemas` with required fields for validation4. Add mapping entry to `BLOCK_RENDERERS`5. Create factory function `createNewBlock()` in DEFAULT FACTORIES section6. Update `FeatureBlock` union typedef to include new type

**Kind**: inner constant of [<code>types/ui</code>](#module_types/ui)  
**Access**: public  
<a name="module_types/ui..RichTextNodeType"></a>

### types/ui~RichTextNodeType : <code>RichTextNode</code>
Enumeration of node types for rich text content. Each type corresponds to a specific HTML element or inline formatting option, such as paragraphs, strong emphasis, links, code blocks, lists, blockquotes, and inline icons. This enum serves as a reference for defining the structure of rich text content and guiding the rendering logic for each node type.

**Kind**: inner constant of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui..createBulletItem"></a>

### types/ui~createBulletItem(item, [position]) ⇒ <code>BulletItem</code>
Create a default BulletListItem

**Kind**: inner method of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Partial.&lt;BulletListBlock&gt;</code> | Bullet item properties. |
| [position] | <code>number</code> | Index position used for generating fallback ids. |

<a name="module_types/ui..createInsightCard"></a>

### types/ui~createInsightCard(item, [position]) ⇒ <code>InsightCard</code>
Create a default InsightCard

**Kind**: inner method of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Partial.&lt;InsightCard&gt;</code> | Insight card properties. |
| [position] | <code>number</code> | Index position used for generating fallback ids. |

<a name="module_types/ui..RichTextNode"></a>

### types/ui~RichTextNode : <code>Object.&lt;string, string&gt;</code>
Enumeration of node types for rich text content. Each type corresponds to a specific HTML element or inline formatting option, such as paragraphs, strong emphasis, links, code blocks, lists, blockquotes, and inline icons. This enum serves as a reference for defining the structure of rich text content and guiding the rendering logic for each node type.

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| TEXT | <code>string</code> | Plain text node. |
| PARAGRAPH | <code>string</code> | Paragraph block node. |
| STRONG | <code>string</code> | Strong emphasis (bold) node. |
| EMPHASIS | <code>string</code> | Emphasis (italic) node. |
| ANCHOR | <code>string</code> | Hyperlink node. |
| CODE | <code>string</code> | Inline code node. |
| PRE | <code>string</code> | Preformatted code block node. |
| UNORDERED_LIST | <code>string</code> | Unordered list block node. |
| ORDERED_LIST | <code>string</code> | Ordered list block node. |
| LIST_ITEM | <code>string</code> | List item node. |
| BLOCKQUOTE | <code>string</code> | Blockquote node. |
| INLINE_ICON | <code>string</code> | Inline icon node. |

<a name="module_types/ui..RichTextNode"></a>

### types/ui~RichTextNode : <code>object</code>
**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>&#x27;text&#x27;</code> \| <code>&#x27;p&#x27;</code> \| <code>&#x27;strong&#x27;</code> \| <code>&#x27;em&#x27;</code> \| <code>&#x27;a&#x27;</code> \| <code>&#x27;code&#x27;</code> \| <code>&#x27;pre&#x27;</code> \| <code>&#x27;ul&#x27;</code> \| <code>&#x27;ol&#x27;</code> \| <code>&#x27;li&#x27;</code> \| <code>&#x27;blockquote&#x27;</code> \| <code>&#x27;inlineIcon&#x27;</code> | Node type identifier that determines rendering behavior. |
| [text] | <code>string</code> | Text content for inline nodes and code blocks. |
| [href] | <code>string</code> | Destination URL for anchor (`a`) nodes. |
| [language] | <code>string</code> | Programming language identifier for syntax-highlighted code blocks. |
| [icon] | <code>string</code> | Icon identifier used by `inlineIcon` nodes. |
| [children] | <code>Array.&lt;RichTextNode&gt;</code> | Nested child nodes for block-level or composite elements. |

<a name="module_types/ui..FeatureImage"></a>

### types/ui~FeatureImage : <code>object</code>
Image metadata

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | Relative image path. |
| alt | <code>string</code> | Accessible alt text. |
| title | <code>string</code> | Short title or tooltip. |
| [caption] | <code>string</code> | Optional description. |
| [ariaLabel] | <code>string</code> | Screen-reader label. |

<a name="module_types/ui..LinkItem"></a>

### types/ui~LinkItem : <code>object</code>
Link item definition

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | Destination URL. |
| [title] | <code>string</code> |  | Display label. |
| [icon] | <code>string</code> |  | Optional icon key. |
| [size] | <code>&quot;xs&quot;</code> \| <code>&quot;sm&quot;</code> \| <code>&quot;md&quot;</code> \| <code>&quot;lg&quot;</code> \| <code>&quot;xl&quot;</code> | <code>&quot;sm&quot;</code> | Size variant. |
| [variant] | <code>&quot;primary&quot;</code> \| <code>&quot;secondary&quot;</code> \| <code>&quot;accent&quot;</code> \| <code>&quot;subtle&quot;</code> \| <code>&quot;danger&quot;</code> | <code>&quot;primary&quot;</code> | Visual style. |
| [local] | <code>boolean</code> | <code>false</code> | Internal navigation. |
| [isScroller] | <code>boolean</code> | <code>false</code> | Scroll-to-anchor behavior. |
| [ariaLabel] | <code>string</code> |  | Screen-reader label. |
| [download] | <code>boolean</code> | <code>false</code> | Download flag. |
| [tooltip] | <code>string</code> |  | Hover tooltip text. |
| [target] | <code>string</code> |  | Anchor target attribute. |
| [rel] | <code>string</code> |  | Relationship attribute. |

<a name="module_types/ui..BulletItem"></a>

### types/ui~BulletItem : <code>object</code>
Bullet list item

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | DOM id or scroll target. |
| text | <code>string</code> |  | Bullet content. |
| [title] | <code>string</code> |  | Optional heading. |
| [icon] | <code>string</code> |  | Optional icon key. |
| [isScroller] | <code>boolean</code> | <code>false</code> | Scroll-to-anchor behavior. |
| [isLink] | <code>boolean</code> | <code>false</code> | Acts as a link. |
| [url] | <code>string</code> |  | Destination URL. |

<a name="module_types/ui..InsightCard"></a>

### types/ui~InsightCard : <code>object</code>
InsightCard

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Unique card identifier. |
| title | <code>string</code> |  | Card title. |
| [subtitle] | <code>string</code> |  | Optional subtitle. |
| [icon] | <code>string</code> |  | Optional icon key. |
| [variant] | <code>Variant</code> | <code>&quot;primary&quot;</code> | Visual style variant. |
| content | <code>RichTextNode</code> |  | Card content, either as rich text nodes or plain string. |

<a name="module_types/ui..CardGridBlock"></a>

### types/ui~CardGridBlock : <code>object</code>
CardGridBlock

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Unique block identifier. |
| type | <code>&quot;cardGrid&quot;</code> |  | Block discriminator. |
| title | <code>string</code> |  | Section title. |
| [columns] | <code>number</code> | <code>3</code> | Number of grid columns. |
| items | <code>Array.&lt;InsightCard&gt;</code> |  | Array of card items to display. |

<a name="module_types/ui..DiagramBlock"></a>

### types/ui~DiagramBlock : <code>object</code>
Diagram Variant

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| diagram | <code>string</code> |  | Mermaid.js definition. |
| description | <code>RichTextNode</code> \| <code>string</code> |  | Diagram explanation. / /** Diagram block |
| type | <code>&quot;diagram&quot;</code> |  | Block discriminator. |
| title | <code>string</code> |  | Diagram title. |
| desktop | <code>DiagramVariant</code> |  | Mermaid.js definition an description optomized for desktop. |
| mobile | <code>DiagramVariant</code> |  | Mermaid.js definition and description optomized for mobile devices. |
| [theme] | <code>&quot;light&quot;</code> \| <code>&quot;dark&quot;</code> \| <code>&quot;auto&quot;</code> | <code>&quot;auto&quot;</code> | Theme preference. |
| [description] | <code>string</code> |  | Optional explanation. |
| [collapsible] | <code>boolean</code> | <code>true</code> | Allow collapse. |

<a name="module_types/ui..ImageGalleryBlock"></a>

### types/ui~ImageGalleryBlock : <code>object</code>
Image gallery block

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>&quot;imageGallery&quot;</code> | Block discriminator. |
| [title] | <code>string</code> | Optional heading. |
| images | <code>Array.&lt;FeatureImage&gt;</code> | Images to render. |

<a name="module_types/ui..BulletListBlock"></a>

### types/ui~BulletListBlock : <code>object</code>
Bullet list block

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>&quot;bulletedList&quot;</code> | Block discriminator. |
| [title] | <code>string</code> | Optional heading. |
| items | <code>Array.&lt;BulletItem&gt;</code> | Bullet items. |

<a name="module_types/ui..LinkListBlock"></a>

### types/ui~LinkListBlock : <code>object</code>
Link list block

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>&quot;links&quot;</code> | Block discriminator. |
| [title] | <code>string</code> | Optional heading. |
| links | <code>Array.&lt;LinkItem&gt;</code> | Links to render. |

<a name="module_types/ui..MarkdownHeading"></a>

### types/ui~MarkdownHeading : <code>object</code>
Markdown heading entry for table of contents

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | Heading level (1-6), corresponds to h1-h6 tags. |
| text | <code>string</code> | Cleaned heading text without markdown formatting. |
| id | <code>string</code> | Generated unique ID slug for anchor linking, auto-suffixed if duplicates exist. |

<a name="module_types/ui..MarkdownRendererProps"></a>

### types/ui~MarkdownRendererProps : <code>object</code>
Markdown renderer props

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content | <code>string</code> |  | Raw markdown content to render. |
| [title] | <code>string</code> |  | Optional heading displayed above markdown content. |
| [intro] | <code>string</code> |  | Optional introductory paragraph displayed above markdown. |
| [articleId] | <code>string</code> |  | Optional id attribute applied to the article root element for deep linking. |
| [showToc] | <code>boolean</code> | <code>true</code> | Show auto-generated table of contents from headings. |
| [maxTocDepth] | <code>number</code> | <code>3</code> | Maximum heading depth included in table of contents (1-6). |
| [className] | <code>string</code> |  | Optional additional CSS class names applied to the article root. |

<a name="module_types/ui..MarkdownDocsBlock"></a>

### types/ui~MarkdownDocsBlock : <code>object</code>
Markdown documentation block

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>&quot;MARKDOWN\_DOCS&quot;</code> |  | Block discriminator. |
| id | <code>string</code> |  | Unique block identifier. |
| title | <code>string</code> |  | Section title displayed above the documentation list. |
| [intro] | <code>string</code> |  | Optional introductory text describing the documentation section. |
| docSlugs | <code>Array.&lt;string&gt;</code> |  | Array of documentation slugs to fetch and render from the portfolio docs registry. |
| [showToc] | <code>boolean</code> | <code>true</code> | Show table of contents for each document being rendered. |
| [showDocJumpList] | <code>boolean</code> | <code>true</code> | Show navigation list linking to each document in the stack. |

<a name="module_types/ui..FeatureBlock"></a>

### types/ui~FeatureBlock : <code>RichTextBlock</code> \| <code>ImageGalleryBlock</code> \| <code>DiagramBlock</code> \| <code>BulletListBlock</code> \| <code>LinkListBlock</code> \| <code>MarkdownDocsBlock</code>
Union of all feature blocks

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..FeatureSection"></a>

### types/ui~FeatureSection : <code>object</code>
Feature section definition

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | DOM anchor id. |
| title | <code>string</code> |  | Section title. |
| [subtitle] | <code>string</code> |  | Optional subtitle. |
| [icon] | <code>string</code> |  | Icon key. |
| [isScroller] | <code>boolean</code> | <code>false</code> | Used by sticky nav. |
| blocks | <code>Array.&lt;FeatureBlock&gt;</code> |  | Content blocks. |

<a name="module_types/ui..BaseUIProps"></a>

### types/ui~BaseUIProps : <code>Object</code>
Base props shared by most interactive UI components.

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [variant] | <code>Variant</code> | Visual style variant. |
| [size] | <code>Size</code> | Component size. |
| [disabled] | <code>boolean</code> | Whether the component is disabled. |
| [className] | <code>string</code> | Optional additional CSS class names. |

<a name="module_types/ui..IconConfig"></a>

### types/ui~IconConfig : <code>Object</code>
Describes an icon configuration used by icon-based components.

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Icon identifier or asset key. |
| [size] | <code>number</code> | Icon size in pixels. |
| [color] | <code>string</code> | CSS color value applied to the icon. |

<a name="module_assets/hooks/useClipboard"></a>

## assets/hooks/useClipboard
React hook that provides a safe, asynchronous interface for copying textto the system clipboard using the Web Clipboard API.


* [assets/hooks/useClipboard](#module_assets/hooks/useClipboard)
    * [~useClipboard([options])](#module_assets/hooks/useClipboard..useClipboard) ⇒ <code>Object</code> \| <code>function</code> \| <code>boolean</code> \| <code>Error</code> \| <code>null</code>
        * [~copy](#module_assets/hooks/useClipboard..useClipboard..copy) ⇒ <code>Promise.&lt;boolean&gt;</code>

<a name="module_assets/hooks/useClipboard..useClipboard"></a>

### assets/hooks/useClipboard~useClipboard([options]) ⇒ <code>Object</code> \| <code>function</code> \| <code>boolean</code> \| <code>Error</code> \| <code>null</code>
Custom React hook that provides clipboard copy functionality with success/error state management.It exposes a `copy` function that attempts to write text to the clipboard and tracks whether the operation succeeded or failed.The hook also allows for an optional automatic reset of the copied state after a specified delay.Capabilities:- Asynchronous clipboard writes- Graceful handling of unsupported browsers- Explicit success and error state tracking- Optional automatic reset of the copied stateDesign notes:- Uses the modern `navigator.clipboard.writeText` API- Does not attempt legacy fallbacks (e.g., `execCommand`)- Returns a boolean to allow calling code to branch on success/failureTypical use cases:- “Copy to clipboard” buttons- Shareable links or code snippets- Developer tooling and utilities

**Kind**: inner method of [<code>assets/hooks/useClipboard</code>](#module_assets/hooks/useClipboard)  
**Returns**: <code>Object</code> - Clipboard interaction helpers and state.<code>function</code> - returns.copy  Asynchronously copies the provided string to the clipboard.  Resolves to `true` on success and `false` on failure.<code>boolean</code> - returns.copied  Indicates whether the most recent copy operation succeeded.<code>Error</code> \| <code>null</code> - returns.error  Error object if the last copy attempt failed, otherwise `null`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | Optional configuration object. |
| [options.resetDelay] | <code>number</code> | <code>2000</code> | Duration in milliseconds before the `copied` state automatically resets   to `false`. Set to `0` or a negative value to disable auto-reset. |

<a name="module_assets/hooks/useClipboard..useClipboard..copy"></a>

#### useClipboard~copy ⇒ <code>Promise.&lt;boolean&gt;</code>
Attempts to copy the provided text to the clipboard.

**Kind**: inner constant of [<code>useClipboard</code>](#module_assets/hooks/useClipboard..useClipboard)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Resolves to `true` if the copy succeeds, otherwise `false`.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text content to copy. |

<a name="module_tests/hooks/useClipboard"></a>

## tests/hooks/useClipboard
Tests the clipboard copying functionality, state management, and error handling of the useClipboard hook.Test plan:- copies valid text and resets copied state after the configured delay- returns false and does not call the clipboard API for empty input- surfaces an error when the clipboard API is unavailableNote: the hook's internal timer is mocked to keep tests deterministic and fast.Testing strategy:- Mocks the clipboard API to verify interactions without relying on actual clipboard access- Uses fake timers to control the timing of state resets without waiting in real time- Asserts the hook's return values and state changes based on different input scenarios- Covers both typical usage and edge cases to ensure robust behavior

<a name="module_assets/hooks/useLongPress"></a>

## assets/hooks/useLongPress
Custom React hook for detecting long-press interactions on an element. It provides a simple API to execute a callback function when a long-press is detected, with support for both mouse and touch events. The hook allows for a configurable threshold duration to define what constitutes a long-press.This hook is useful for implementing features like context menus, drag-and-drop, or any interaction that requires a sustained press on an element.Capabilities:- Detects long-press interactions for both mouse and touch events- Configurable threshold duration for long-press detection- Provides a simple API for integrating long-press functionality into any componentUsage:const longPressHandlers = useLongPress(() => {  // Handle long-press action here}, 700);

<a name="module_assets/hooks/useLongPress..useLongPress"></a>

### assets/hooks/useLongPress~useLongPress(callback, threshold) ⇒ <code>Object</code>
Custom React hook that detects long-press interactions on an element. It accepts a callback function to be executed when a long-press is detected, and an optional threshold duration (defaulting to 500 milliseconds) that defines how long the press must be held before the callback is triggered. The hook returns event handlers that can be attached to any element to enable long-press detection for both mouse and touch interactions.

**Kind**: inner method of [<code>assets/hooks/useLongPress</code>](#module_assets/hooks/useLongPress)  
**Returns**: <code>Object</code> - Event handlers for long-press detection.Capabilities:- Detects long-press interactions for both mouse and touch events- Configurable threshold duration for long-press detection- Provides a simple API for integrating long-press functionality into any componentUsage:const longPressHandlers = useLongPress(() => {  // Handle long-press action here}, 700);  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The function to be executed when a long-press is detected. |
| threshold | <code>number</code> | The duration (in milliseconds) that defines a long-press. Defaults to 500ms. |

<a name="module_assets/hooks/useScrollSpy"></a>

## assets/hooks/useScrollSpy
Hierarchical scroll-spy with URL history synchronization.Responsibilities:- Observes section + subsection elements using IntersectionObserver- Tracks the currently active *leaf* node (deepest visible section)- Derives the active parent chain from the leaf- Syncs URL hash without page jumps- Supports programmatic scrolling without feedback loopsDesign principles:- Scroll position is the single source of truth- Navigation clicks cause scroll, not state writes- Only the observer updates active stateThis hook is safe to use with:- Sticky desktop nav- Mobile drawer nav- Collapsible subsection dropdowns


* [assets/hooks/useScrollSpy](#module_assets/hooks/useScrollSpy)
    * _static_
        * [.useScrollSpyWithHistory(nodes, byId, offset)](#module_assets/hooks/useScrollSpy.useScrollSpyWithHistory)
            * [~markProgrammaticScroll()](#module_assets/hooks/useScrollSpy.useScrollSpyWithHistory..markProgrammaticScroll)
    * _inner_
        * [~buildSectionTree(sections)](#module_assets/hooks/useScrollSpy..buildSectionTree) ⇒ <code>Object</code>

<a name="module_assets/hooks/useScrollSpy.useScrollSpyWithHistory"></a>

### assets/hooks/useScrollSpy.useScrollSpyWithHistory(nodes, byId, offset)
useScrollSpyWithHistory

**Kind**: static method of [<code>assets/hooks/useScrollSpy</code>](#module_assets/hooks/useScrollSpy)  

| Param | Type | Description |
| --- | --- | --- |
| nodes | <code>Array.&lt;SectionNode&gt;</code> | Flat list of observable nodes |
| byId | <code>Map.&lt;string, SectionNode&gt;</code> | Lookup map for parent traversal |
| offset | <code>number</code> | Sticky header offset (px) |

<a name="module_assets/hooks/useScrollSpy.useScrollSpyWithHistory..markProgrammaticScroll"></a>

#### useScrollSpyWithHistory~markProgrammaticScroll()
Marks a programmatic scroll window.Navigation clicks should call this BEFORE scrolling.

**Kind**: inner method of [<code>useScrollSpyWithHistory</code>](#module_assets/hooks/useScrollSpy.useScrollSpyWithHistory)  
<a name="module_assets/hooks/useScrollSpy..buildSectionTree"></a>

### assets/hooks/useScrollSpy~buildSectionTree(sections) ⇒ <code>Object</code>
Utility function that transforms a nested section/block data structure into a flat list of observable nodes with parent references. This is used to set up the IntersectionObserver and to derive active chains for scroll-spy behavior.The function takes an array of section objects, each potentially containing an array of block objects, and produces:- A flat array of nodes, where each node represents either a section or a block and includes its ID, type, and parent ID.- A lookup map that allows quick access to any node by its ID, which is essential for traversing the parent chain when determining active sections.

**Kind**: inner method of [<code>assets/hooks/useScrollSpy</code>](#module_assets/hooks/useScrollSpy)  
**Returns**: <code>Object</code> - SectionNode structure:{  id: string,        // Unique identifier (section ID or block ID)  type: 'section' | 'block', // Node type  parentId: string | null // Parent section ID (null for top-level sections)}Design notes:- The function is defensive and skips any sections or blocks that lack an ID.- The resulting flat structure simplifies the IntersectionObserver setup and active chain derivation.- The byId map allows for efficient parent lookups when building the active chain from the leaf node.  
**Access**: public  

| Param | Type |
| --- | --- |
| sections | <code>Array</code> | 

**Example**  
```jsconst { nodes, byId } = buildSectionTree([ {  id: "section1",  blocks: [     { id: "block1" },     { id: "block2" }  ] }, {   id: "section2",   blocks: [] }]);nodes = [{ id: "section1", type: "section", parentId: null },{ id: "block1", type: "block", parentId: "section1" },{ id: "block2", type: "block", parentId: "section1" },{ id: "section2", type: "section", parentId: null }]byId = Map {"section1" => { id: "section1", type: "section", parentId: null },"block1" => { id: "block1", type: "block", parentId: "section1" },"block2" => { id: "block2", type: "block", parentId: "section1" },"section2" => { id: "section2", type: "section", parentId: null }}```
<a name="module_tests/hooks/useScrollSpy"></a>

## tests/hooks/useScrollSpy
Hook tests for useScrollSpyWithHistory.Gold-standard rules followed:- browser APIs are mocked- calls are wrapped in act()- async updates use waitFor()- assertions target public return values only

<a name="module_assets/utils"></a>

## assets/utils
Collection of shared utility helpers used across the application.These functions are intentionally small, side-effect free, and reusable.


* [assets/utils](#module_assets/utils)
    * [~capFirstLetter(str)](#module_assets/utils..capFirstLetter) ⇒ <code>string</code>
    * [~classNames(...classes)](#module_assets/utils..classNames) ⇒ <code>string</code>
    * [~formatClassNames(classStrBlock)](#module_assets/utils..formatClassNames) ⇒ <code>string</code>
    * [~isBrowser()](#module_assets/utils..isBrowser) ⇒ <code>boolean</code>
    * [~noop()](#module_assets/utils..noop) ⇒ <code>void</code>
    * [~clamp(value, min, max)](#module_assets/utils..clamp) ⇒ <code>number</code>
    * [~debounce(fn, delay)](#module_assets/utils..debounce) ⇒ <code>function</code>
    * [~getCallerLocation()](#module_assets/utils..getCallerLocation) ⇒ <code>string</code>
    * [~logger()](#module_assets/utils..logger)

<a name="module_assets/utils..capFirstLetter"></a>

### assets/utils~capFirstLetter(str) ⇒ <code>string</code>
Capitalizes the first letter of a string.

**Kind**: inner method of [<code>assets/utils</code>](#module_assets/utils)  
**Returns**: <code>string</code> - String with the first letter capitalized.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | Input string. |

**Example**  
```js
capFirstLetter("hello world"); // "Hello world"
```
<a name="module_assets/utils..classNames"></a>

### assets/utils~classNames(...classes) ⇒ <code>string</code>
Joins multiple class name values into a single string, filtering out falsy values.Safely joins multiple class name values into a single string.Falsy values are ignored.

**Kind**: inner method of [<code>assets/utils</code>](#module_assets/utils)  
**Returns**: <code>string</code> - Space-delimited class name string.  

| Param | Type | Description |
| --- | --- | --- |
| ...classes | <code>string</code> \| <code>false</code> \| <code>null</code> \| <code>undefined</code> | Class name values to join. |

**Example**  
```js
classNames("btn", isActive && "active"); // "btn active"
```
<a name="module_assets/utils..formatClassNames"></a>

### assets/utils~formatClassNames(classStrBlock) ⇒ <code>string</code>
Formats a string of class names by trimming whitespace, normalizing spaces, removing duplicates, and eliminating newlines. Returned string is suitable for use in a `className` attribute by stripping out unnecessary blanks.

**Kind**: inner method of [<code>assets/utils</code>](#module_assets/utils)  
**Returns**: <code>string</code> - The formatted string with whitespace normalized and duplicates removed.  

| Param | Type | Description |
| --- | --- | --- |
| classStrBlock | <code>string</code> | A string of space-delimited class names. |

<a name="module_assets/utils..isBrowser"></a>

### assets/utils~isBrowser() ⇒ <code>boolean</code>
Determines if the current execution context is a browser environment by checking for the presence of the `window` object. This is useful for guarding against code that should only run in the browser, such as DOM manipulation or accessing browser-specific APIs, especially when rendering on the server or during testing.

**Kind**: inner method of [<code>assets/utils</code>](#module_assets/utils)  
**Returns**: <code>boolean</code> - True if `window` is defined.  
<a name="module_assets/utils..noop"></a>

### assets/utils~noop() ⇒ <code>void</code>
No-op function used as a default callback placeholder.

**Kind**: inner method of [<code>assets/utils</code>](#module_assets/utils)  
<a name="module_assets/utils..clamp"></a>

### assets/utils~clamp(value, min, max) ⇒ <code>number</code>
Clamps a numeric value between a minimum and maximum.

**Kind**: inner method of [<code>assets/utils</code>](#module_assets/utils)  
**Returns**: <code>number</code> - Clamped value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Input value. |
| min | <code>number</code> | Lower bound. |
| max | <code>number</code> | Upper bound. |

<a name="module_assets/utils..debounce"></a>

### assets/utils~debounce(fn, delay) ⇒ <code>function</code>
Returns a debounced version of a function.The function is invoked only after the delay has elapsed since the last call.

**Kind**: inner method of [<code>assets/utils</code>](#module_assets/utils)  
**Returns**: <code>function</code> - Debounced function.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function to debounce. |
| delay | <code>number</code> | Delay in milliseconds. |

<a name="module_assets/utils..getCallerLocation"></a>

### assets/utils~getCallerLocation() ⇒ <code>string</code>
Extracts the caller's file and line number from the stack trace for logging purposes.This function creates a new Error to capture the stack trace, then parses it to find the relevant frame.

**Kind**: inner method of [<code>assets/utils</code>](#module_assets/utils)  
**Returns**: <code>string</code> - A string representing the caller's file and line number, or "unknown:0" if it cannot be determined.  
<a name="module_assets/utils..logger"></a>

### assets/utils~logger()
Logger utility that provides timestamped, leveled logging with caller location.Each log entry includes the log level, timestamp, and the file/line of the caller.This enhances debugging by providing context about where logs are coming from.Example usage:logger.info("This is an info message");

**Kind**: inner method of [<code>assets/utils</code>](#module_assets/utils)  
<a name="module_components/ResumePreview/PreviewResume"></a>

## components/ResumePreview/PreviewResume
Modal-based resume preview and download component.

<a name="module_components/ResumePreview/PreviewResume..PreviewResume"></a>

### components/ResumePreview/PreviewResume~PreviewResume ⇒ <code>JSX.Element</code>
A modal component that allows users to preview and download the resume PDF. It provides an embedded PDF viewer along with action buttons for opening the PDF in a new tab, printing, and closing the modal. The component is designed to work seamlessly in both development and production environments by leveraging Vite's asset management system.Core responsibilities:- Opens a modal containing an embedded PDF preview- Provides a direct download link for the resume- Uses Vite asset imports to ensure correct bundling across environmentsTechnical notes:- PDF is imported as a Vite-managed asset- Works consistently in local development and production builds- Uses RSuite's ButtonToolbar for action buttons- The embedded PDF viewer is implemented using an iframe for broad compatibility- The component is styled to fit within the overall design system and maintain readability of the PDF contentAccessibility:- RSuite Modal provides focus trapping and ESC-to-close behavior- Buttons include descriptive aria-labels and tooltips- Embedded iframe includes a fallback message

**Kind**: inner property of [<code>components/ResumePreview/PreviewResume</code>](#module_components/ResumePreview/PreviewResume)  
**Returns**: <code>JSX.Element</code> - Rendered resume preview modal and trigger button.  
**Access**: public  
**Component**:   
<a name="module_components/ResumePreview"></a>

## components/ResumePreview
Main export for the resume preview feature.

<a name="module_tests/components/ResumePreview"></a>

## tests/components/ResumePreview
Unit tests for the ResumePreview component.Test coverage:- Modal opens when the trigger button is clicked- Modal renders the resume content when opened- Modal closes when the close button is clickedTesting strategy:- Mocks external dependencies (Btn and rsuite Modal components) to isolate testing to ResumePreview's behavior- Uses user-facing queries to verify the presence of interactive elements and content- Simulates user interactions (clicks) to test modal open/close behavior- Asserts the presence or absence of the modal and its content based on user actions

<a name="module_components/ThemeToggle"></a>

## components/ThemeToggle
Compact theme selection control for switching betweenlight and dark application themes.

<a name="module_components/ThemeToggle..ThemeToggle"></a>

### components/ThemeToggle~ThemeToggle(props) ⇒ <code>JSX.Element</code>
ThemeToggle------------------------------------------------------------------Compact, icon-only theme selector used to toggle between light anddark application themes.Design goals:- Minimal visual footprint- Clear active-state feedback- Keyboard and screen-reader accessible- Consistent with the frosted / glass UI systemBehavior:- Highlights the currently active theme- Disables the active option to prevent redundant state updates- Delegates theme state management to ThemeContextAccessibility:- Toolbar includes an aria-label for screen readers- Each button includes descriptive aria-labels and tooltips

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
Unit tests for the ThemeToggle component.Testing focus:- Rendering of both light and dark theme toggle buttons- Theme state transitions when toggles are activated- Presence of accessible button labelsTesting philosophy:- Verifies observable behavior only- Avoids asserting internal DOM structure or RSuite implementation details- Treats theme state as a global side effect via `data-theme`

<a name="module_components/layout/InfoSection"></a>

## components/layout/InfoSection
Reusable frosted-glass section wrapper used to standardizelayout, spacing, and visual hierarchy across the portfolio.

<a name="module_components/layout/InfoSection..InfoSection"></a>

### components/layout/InfoSection~InfoSection(props) ⇒ <code>JSX.Element</code>
A responsive, collapsible frosted-glass section wrapper used throughoutthe application to enforce consistent structure and visual language.

**Kind**: inner method of [<code>components/layout/InfoSection</code>](#module_components/layout/InfoSection)  
**Summary**: Core features:- Optional title and subtitle- Optional icon rendered alongside the title- Collapsible frosted panel container- Semantic `<section>` wrapper- Arbitrary child contentDesign notes:- Uses RSuite `Panel` for consistent layout behavior- Applies shared frosted and tile styles via CSS- Intended for use with section-based navigation and scroll targeting  
**Returns**: <code>JSX.Element</code> - Rendered frosted content section.  
**Access**: public  
**Component**: InfoSection---------------------------------------------------------------------------  

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
Unit tests for the InfoSection layout component.Testing focus:- Correct semantic wrapper element (`section`)- Proper application of root classes and IDs- Conditional rendering of title, subtitle, and icon- Transparent rendering of child contentTesting strategy:- Mocks RSuite Panel to reduce surface area and DOM complexity- Mocks FrostedIcon to avoid FontAwesome rendering concerns- Focuses on layout and composition, not styling details

<a name="module_components/PageHeader"></a>

## components/PageHeader
Standardized page-level header component used to introducepages and major sections with consistent hierarchy and styling.


* [components/PageHeader](#module_components/PageHeader)
    * [~HeroBlock](#module_components/PageHeader..HeroBlock) ⇒ <code>JSX.Element</code>
    * [~PageHeader(props)](#module_components/PageHeader..PageHeader) ⇒ <code>JSX.Element</code>
        * [~renderTechUsedString([techArray])](#module_components/PageHeader..PageHeader..renderTechUsedString) ⇒ <code>JSX.Element</code> \| <code>string</code>
    * [~TechItem](#module_components/PageHeader..TechItem) : <code>Object</code>

<a name="module_components/PageHeader..HeroBlock"></a>

### components/PageHeader~HeroBlock ⇒ <code>JSX.Element</code>
A reusable page header component designed to provide a consistent and visually appealing introduction to pages and major sections. It combines a prominent title with optional supporting information such as job titles, timespans, descriptive subtitles, and associated technologies.

**Kind**: inner property of [<code>components/PageHeader</code>](#module_components/PageHeader)  
**Summary**: The HeroBlock component serves as a standardized header section that can be used across different pages and sections of the portfolio. It is designed to be visually striking while maintaining readability and accessibility.Features:- Frosted RSuite Panel container- Primary title (required)- Optional job title and timespan row- Optional descriptive subtitle- Optional technology list- Subtle entrance animation via CSS- Fully responsive layoutAccessibility:- Uses `role="banner"` to denote page-level landmark- Content is readable and navigable via assistive technologies- Color contrast is maintained for readability  
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
| [props.tech] | <code>Array.&lt;Object&gt;</code> | List of technologies associated with the page or project. |
| [props.className] | <code>string</code> | Optional additional CSS class names. |

**Example**  
```js<HeroBlock  title="My Portfolio"  jobTitle="Software Engineer"  timespan="2020 - Present"  subTitle="Welcome to my personal portfolio showcasing my projects and experience."  tech={[      { label: "React", type: "react" },      { label: "JavaScript", type: "javascript" },      { label: "CSS", type: "css" }    ]}/>```
<a name="module_components/PageHeader..PageHeader"></a>

### components/PageHeader~PageHeader(props) ⇒ <code>JSX.Element</code>
PageHeader---------------------------------------------------------------------------Standardized page-level header component designed to introduce a page ormajor section with clear hierarchy and frosted-glass presentation.Features:- Frosted RSuite Panel container- Primary title (required)- Optional job title and timespan row- Optional descriptive subtitle- Optional technology list- Subtle entrance animation via CSS- Fully responsive layoutAccessibility:- Uses `role="banner"` to denote page-level landmark- Content is readable and navigable via assistive technologies

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
Formats a list of technology items into a human-readable display.Behavior:- Returns an empty string when no valid technologies are provided- Renders each technology with its associated style class

**Kind**: inner method of [<code>PageHeader</code>](#module_components/PageHeader..PageHeader)  
**Returns**: <code>JSX.Element</code> \| <code>string</code> - Rendered tech list or empty string.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [techArray] | <code>Array.&lt;TechItem&gt;</code> | <code>[]</code> | List of technologies used. |

<a name="module_components/PageHeader..TechItem"></a>

### components/PageHeader~TechItem : <code>Object</code>
TechItem---------------------------------------------------------------------------Describes a technology badge rendered in the "Tech Used" section.

**Kind**: inner typedef of [<code>components/PageHeader</code>](#module_components/PageHeader)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | Display name of the technology. |
| type | <code>string</code> | CSS class used to style the technology label. |
| [id] | <code>string</code> | Optional unique identifier. |

<a name="module_tests/components/PageHeader"></a>

## tests/components/PageHeader
Unit tests for the PageHeader component.Test coverage:- Required title rendering- Optional jobTitle + timespan row composition- Optional subtitle rendering- Semantic role (`banner`) for accessibility- Root className passthroughTesting strategy:- Mocks RSuite Panel and FlexboxGrid as minimal layout primitives- Focuses on semantic output and composition logic- Avoids coupling to RSuite layout implementation details

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
<a name="module_components/renderers/blocks/CardGridBlock"></a>

## components/renderers/blocks/CardGridBlock
Tests for the CardGridBlock component, ensuring it renders insight cards correctly when items are provided and returns nothing when there are no items.

<a name="module_components/renderers/blocks/CardGridBlock..CardGridBlock"></a>

### components/renderers/blocks/CardGridBlock~CardGridBlock ⇒ <code>JSX.Element</code>
A block component for displaying a grid of InsightCards. It takes a block object containing the title, number of columns, and an array of items to be displayed as cards. Each item should have properties such as title, icon, subtitle, variant (accent color), and content.

**Kind**: inner property of [<code>components/renderers/blocks/CardGridBlock</code>](#module_components/renderers/blocks/CardGridBlock)  
**Returns**: <code>JSX.Element</code> - The rendered CardGridBlock component.  
**Access**: public  
**Component**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| block | <code>object</code> | The block data containing title, columns, and items. |
| block.title | <code>string</code> | The title of the card grid section. |
| block.columns | <code>number</code> | The number of columns in the card grid. |
| block.items | <code>Array</code> | An array of items to be displayed as cards. Each item should have the following properties: |
| block.items[].id | <code>string</code> | A unique identifier for the card item. |
| block.items[].title | <code>string</code> | The title text for the card. |
| block.items[].icon | <code>string</code> | The name of the icon to be displayed on the card. |
| block.items[].subtitle | <code>string</code> | The subtitle text for the card. |
| block.items[].variant | <code>string</code> | The variant (accent color) for the card, e.g., "blue", "green", "red". |
| block.items[].content | <code>string</code> | The content for the card, which can include rich text. |

**Example**  
```jsconst blockData = {  title: "Key Insights", columns: 3, items: [   {    id: "1",    title: "Insight One",    icon: "lightbulb",    subtitle: "An important finding",    variant: "blue",    content: "This insight reveals that..."  },  {   id: "2",   title: "Insight Two",   icon: "chart-bar",   subtitle: "Another key point",   variant: "green",   content: "This insight highlights that..."   }, ],};<CardGridBlock block={blockData} />```
<a name="module_components/renderers/blocks/CardGridBlock"></a>

## components/renderers/blocks/CardGridBlock
A block component for displaying a grid of InsightCards. It takes a block object containing the title, number of columns, and an array of items to be displayed as cards. Each item should have properties such as title, icon, subtitle, variant (accent color), and content.

<a name="module_components/renderers/blocks/CardGridBlock..CardGridBlock"></a>

### components/renderers/blocks/CardGridBlock~CardGridBlock ⇒ <code>JSX.Element</code>
A block component for displaying a grid of InsightCards. It takes a block object containing the title, number of columns, and an array of items to be displayed as cards. Each item should have properties such as title, icon, subtitle, variant (accent color), and content.

**Kind**: inner property of [<code>components/renderers/blocks/CardGridBlock</code>](#module_components/renderers/blocks/CardGridBlock)  
**Returns**: <code>JSX.Element</code> - The rendered CardGridBlock component.  
**Access**: public  
**Component**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| block | <code>object</code> | The block data containing title, columns, and items. |
| block.title | <code>string</code> | The title of the card grid section. |
| block.columns | <code>number</code> | The number of columns in the card grid. |
| block.items | <code>Array</code> | An array of items to be displayed as cards. Each item should have the following properties: |
| block.items[].id | <code>string</code> | A unique identifier for the card item. |
| block.items[].title | <code>string</code> | The title text for the card. |
| block.items[].icon | <code>string</code> | The name of the icon to be displayed on the card. |
| block.items[].subtitle | <code>string</code> | The subtitle text for the card. |
| block.items[].variant | <code>string</code> | The variant (accent color) for the card, e.g., "blue", "green", "red". |
| block.items[].content | <code>string</code> | The content for the card, which can include rich text. |

**Example**  
```jsconst blockData = {  title: "Key Insights", columns: 3, items: [   {    id: "1",    title: "Insight One",    icon: "lightbulb",    subtitle: "An important finding",    variant: "blue",    content: "This insight reveals that..."  },  {   id: "2",   title: "Insight Two",   icon: "chart-bar",   subtitle: "Another key point",   variant: "green",   content: "This insight highlights that..."   }, ],};<CardGridBlock block={blockData} />```
<a name="module_components/renderers/blocks/FormBlock/fieldRegistry"></a>

## components/renderers/blocks/FormBlock/fieldRegistry
Centralized registry and utilities for form field definitions in FormBlock.This module defines standard accepters for various field types, normalization of field configs, and rendering logic to map field definitions to actual form controls.The registry supports both simple field types that map directly to a single accepter component, as well as more complex types that require custom rendering logic (e.g., select fields with options, input groups with addons).The normalization function allows for legacy field definitions to be used without breaking changes, while the initial values builder helps construct the default form state based on field configurations.

**See**: FIELD_TYPES for the list of supported field types.  
**Author**: Foscat  

* [components/renderers/blocks/FormBlock/fieldRegistry](#module_components/renderers/blocks/FormBlock/fieldRegistry)
    * [~SIMPLE_ACCEPTORS](#module_components/renderers/blocks/FormBlock/fieldRegistry..SIMPLE_ACCEPTORS)
    * [~TextareaAccepter(props)](#module_components/renderers/blocks/FormBlock/fieldRegistry..TextareaAccepter) ⇒ <code>React.ReactNode</code>
    * [~registerField(props)](#module_components/renderers/blocks/FormBlock/fieldRegistry..registerField) ⇒ <code>React.ReactNode</code>
    * [~normalizeField(field)](#module_components/renderers/blocks/FormBlock/fieldRegistry..normalizeField) ⇒ <code>Object</code>
    * [~buildInitialValues(fields)](#module_components/renderers/blocks/FormBlock/fieldRegistry..buildInitialValues) ⇒ <code>Object</code>
    * [~registerField(field)](#module_components/renderers/blocks/FormBlock/fieldRegistry..registerField) ⇒ <code>React.ReactNode</code>

<a name="module_components/renderers/blocks/FormBlock/fieldRegistry..SIMPLE_ACCEPTORS"></a>

### components/renderers/blocks/FormBlock/fieldRegistry~SIMPLE\_ACCEPTORS
Mapping of simple field types to their default accepter components.This is used for fields that don't require special handling beyond rendering the appropriate input type.

**Kind**: inner constant of [<code>components/renderers/blocks/FormBlock/fieldRegistry</code>](#module_components/renderers/blocks/FormBlock/fieldRegistry)  
**Access**: public  
<a name="module_components/renderers/blocks/FormBlock/fieldRegistry..TextareaAccepter"></a>

### components/renderers/blocks/FormBlock/fieldRegistry~TextareaAccepter(props) ⇒ <code>React.ReactNode</code>
Custom accepter for textarea fields. This is necessary because the default Input accepter from rsuite does not support multiline input, and we want to ensure that textarea fields render correctly with the appropriate styles and behavior.The TextareaAccepter is a simple wrapper around the HTML <textarea> element, styled to fit within the form block. It accepts standard props like value and onChange, as well as additional props for rows and className to allow for customization.

**Kind**: inner method of [<code>components/renderers/blocks/FormBlock/fieldRegistry</code>](#module_components/renderers/blocks/FormBlock/fieldRegistry)  
**Summary**: This component is designed to be used as a custom accepter in the form field registry. It renders a textarea element with appropriate styling and behavior for multiline input. The value and onChange props are passed through to allow it to work seamlessly with Form.Control, while additional props like className and rows provide flexibility for different use cases.  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  |  |
| props.value | <code>string</code> |  | The current value of the textarea, passed by Form.Control. |
| props.onChange | <code>function</code> |  | Change handler to call when the textarea value changes, passed by Form.Control. |
| [props.className] | <code>string</code> |  | Optional additional class name(s) to apply to the textarea for custom styling. |
| [props.rows] | <code>number</code> | <code>5</code> | Optional number of rows to display in the textarea. Defaults to 5 if not provided. |

<a name="module_components/renderers/blocks/FormBlock/fieldRegistry..registerField"></a>

### components/renderers/blocks/FormBlock/fieldRegistry~registerField(props) ⇒ <code>React.ReactNode</code>
Custom accepter for input groups with prefix/suffix addons. This is a common enough pattern that it warrants a built-in accepter to avoid boilerplate in field definitions.The `inputGroup` prop on a field can be used to pass `prefix` and `suffix` values, which will be rendered as addons around the input.

**Kind**: inner method of [<code>components/renderers/blocks/FormBlock/fieldRegistry</code>](#module_components/renderers/blocks/FormBlock/fieldRegistry)  
**Summary**: This component is designed to be used as a custom accepter in the form field registry. It renders an Input wrapped in an InputGroup, with optional prefix and suffix addons. The value and onChange props are passed through to the Input, allowing it to work seamlessly with Form.Control.  
**Access**: public  
**See**: FIELD_TYPES.INPUT_GROUP_TEXT  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> |  |
| props.value | <code>string</code> | The current value of the input, passed by Form.Control. |
| props.onChange | <code>function</code> | Change handler to call when the input value changes, passed by Form.Control. |
| [props.prefix] | <code>string</code> | Optional text to display as a prefix addon. |
| [props.suffix] | <code>string</code> | Optional text to display as a suffix addon. |

**Example**  
```js
{  name: "price", type: FIELD_TYPES.INPUT_GROUP_TEXT, inputGroup: {   prefix: "$",  suffix: "USD"}}
```
<a name="module_components/renderers/blocks/FormBlock/fieldRegistry..normalizeField"></a>

### components/renderers/blocks/FormBlock/fieldRegistry~normalizeField(field) ⇒ <code>Object</code>
Normalize legacy CMS field keys into the current schema.This lets older content continue working while the schema evolves.

**Kind**: inner method of [<code>components/renderers/blocks/FormBlock/fieldRegistry</code>](#module_components/renderers/blocks/FormBlock/fieldRegistry)  
**Access**: public  

| Param | Type |
| --- | --- |
| field | <code>Object</code> | 

<a name="module_components/renderers/blocks/FormBlock/fieldRegistry..buildInitialValues"></a>

### components/renderers/blocks/FormBlock/fieldRegistry~buildInitialValues(fields) ⇒ <code>Object</code>
Build initial form values from field defaults.

**Kind**: inner method of [<code>components/renderers/blocks/FormBlock/fieldRegistry</code>](#module_components/renderers/blocks/FormBlock/fieldRegistry)  
**Access**: public  

| Param | Type |
| --- | --- |
| fields | <code>Array.&lt;Object&gt;</code> | 

<a name="module_components/renderers/blocks/FormBlock/fieldRegistry..registerField"></a>

### components/renderers/blocks/FormBlock/fieldRegistry~registerField(field) ⇒ <code>React.ReactNode</code>
Registers a field in the registry. If a field with the same name already exists, it will be overwritten and a development-only warning will be emitted.

**Kind**: inner method of [<code>components/renderers/blocks/FormBlock/fieldRegistry</code>](#module_components/renderers/blocks/FormBlock/fieldRegistry)  
**Access**: public  

| Param | Type |
| --- | --- |
| field | <code>Object</code> | 

<a name="module_components/blocks/FormBlock"></a>

## components/blocks/FormBlock
Main FormBlock component that renders a dynamic form based on a provided schema. It uses RSuite's Form components under the hood and supports various field types, validation, and conditional rendering. The component is designed to be flexible and extensible, allowing for custom field types and complex form logic.

<a name="module_components/blocks/FormBlock..FormBlock"></a>

### components/blocks/FormBlock~FormBlock ⇒ <code>JSX.Element</code> \| <code>null</code>
Renders a dynamic form based on a provided schema. The schema defines the fields, their types, labels, validation rules, and other configuration options. FormBlock manages form state internally and exposes onChange and onSubmit callbacks for external handling.

**Kind**: inner property of [<code>components/blocks/FormBlock</code>](#module_components/blocks/FormBlock)  
**Access**: public  
**Component**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  | Component props. |
| [props.className] | <code>string</code> |  | Additional wrapper class names. |
| props.schema | <code>Object</code> |  | Form schema object from CMS/data files. |
| [props.model] | <code>Object</code> |  | Optional RSuite schema model for validation. |
| [props.fluid] | <code>boolean</code> | <code>true</code> | Whether the form fills the available width. |
| [props.layout] | <code>&quot;vertical&quot;</code> \| <code>&quot;horizontal&quot;</code> \| <code>&quot;inline&quot;</code> | <code>&quot;vertical&quot;</code> | RSuite form layout. |
| [props.disabled] | <code>boolean</code> | <code>false</code> | Global disabled state. |
| [props.readOnly] | <code>boolean</code> | <code>false</code> | Global read-only state. |
| [props.onChange] | <code>function</code> |  | Called whenever form values change. |
| [props.onSubmit] | <code>function</code> |  | Called with the final formValue on submit. |

**Example**  
```jsconst contactFormSchema = {id: "contact-form",title: "Send Me a Message",fields: [  {    name: "fullName",    type: "text",    label: "Full Name",    placeholder: "Enter your name",    required: true,    defaultValue: "",    helpText: "Use your preferred name."  },  {    name: "email",    type: "text",    label: "Email",    placeholder: "",    required: true,    defaultValue: "",    rule: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  },  {    name: "reason",    type: "select",    label: "Reason",    placeholder: "Choose one",    defaultValue: null,    options: [      {        label: "Freelance Project",         value: "freelance" },      {        label: "Job Opportunity",         value: "job" },      {         label: "General Question",        value: "general" }    ]  },  {    name: "message",    type: "textarea",    label: "Message",    placeholder: "Tell me about your project",    defaultValue: "",    componentProps: {      rows: 6    }  },  {    name: "contactMethods",    type: "checkboxGroup",    label: "Preferred Contact",    defaultValue: [],    options: [      { label: "Email", value: "email" },      { label: "Phone", value: "phone" },      { label: "Text", value: "text" }    ]  }],onSubmit: (formValue) => sendMessage(formValue),}<FormBlock schema={contactFormSchema} />```
<a name="module_components/PageHeader"></a>

## components/PageHeader
Standardized page-level header component used to introducepages and major sections with consistent hierarchy and styling.


* [components/PageHeader](#module_components/PageHeader)
    * [~HeroBlock](#module_components/PageHeader..HeroBlock) ⇒ <code>JSX.Element</code>
    * [~PageHeader(props)](#module_components/PageHeader..PageHeader) ⇒ <code>JSX.Element</code>
        * [~renderTechUsedString([techArray])](#module_components/PageHeader..PageHeader..renderTechUsedString) ⇒ <code>JSX.Element</code> \| <code>string</code>
    * [~TechItem](#module_components/PageHeader..TechItem) : <code>Object</code>

<a name="module_components/PageHeader..HeroBlock"></a>

### components/PageHeader~HeroBlock ⇒ <code>JSX.Element</code>
A reusable page header component designed to provide a consistent and visually appealing introduction to pages and major sections. It combines a prominent title with optional supporting information such as job titles, timespans, descriptive subtitles, and associated technologies.

**Kind**: inner property of [<code>components/PageHeader</code>](#module_components/PageHeader)  
**Summary**: The HeroBlock component serves as a standardized header section that can be used across different pages and sections of the portfolio. It is designed to be visually striking while maintaining readability and accessibility.Features:- Frosted RSuite Panel container- Primary title (required)- Optional job title and timespan row- Optional descriptive subtitle- Optional technology list- Subtle entrance animation via CSS- Fully responsive layoutAccessibility:- Uses `role="banner"` to denote page-level landmark- Content is readable and navigable via assistive technologies- Color contrast is maintained for readability  
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
| [props.tech] | <code>Array.&lt;Object&gt;</code> | List of technologies associated with the page or project. |
| [props.className] | <code>string</code> | Optional additional CSS class names. |

**Example**  
```js<HeroBlock  title="My Portfolio"  jobTitle="Software Engineer"  timespan="2020 - Present"  subTitle="Welcome to my personal portfolio showcasing my projects and experience."  tech={[      { label: "React", type: "react" },      { label: "JavaScript", type: "javascript" },      { label: "CSS", type: "css" }    ]}/>```
<a name="module_components/PageHeader..PageHeader"></a>

### components/PageHeader~PageHeader(props) ⇒ <code>JSX.Element</code>
PageHeader---------------------------------------------------------------------------Standardized page-level header component designed to introduce a page ormajor section with clear hierarchy and frosted-glass presentation.Features:- Frosted RSuite Panel container- Primary title (required)- Optional job title and timespan row- Optional descriptive subtitle- Optional technology list- Subtle entrance animation via CSS- Fully responsive layoutAccessibility:- Uses `role="banner"` to denote page-level landmark- Content is readable and navigable via assistive technologies

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
Formats a list of technology items into a human-readable display.Behavior:- Returns an empty string when no valid technologies are provided- Renders each technology with its associated style class

**Kind**: inner method of [<code>PageHeader</code>](#module_components/PageHeader..PageHeader)  
**Returns**: <code>JSX.Element</code> \| <code>string</code> - Rendered tech list or empty string.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [techArray] | <code>Array.&lt;TechItem&gt;</code> | <code>[]</code> | List of technologies used. |

<a name="module_components/PageHeader..TechItem"></a>

### components/PageHeader~TechItem : <code>Object</code>
TechItem---------------------------------------------------------------------------Describes a technology badge rendered in the "Tech Used" section.

**Kind**: inner typedef of [<code>components/PageHeader</code>](#module_components/PageHeader)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | Display name of the technology. |
| type | <code>string</code> | CSS class used to style the technology label. |
| [id] | <code>string</code> | Optional unique identifier. |

<a name="module_tests/components/blocks/ImageGalleryBlock"></a>

## tests/components/blocks/ImageGalleryBlock
Unit tests for the ImageGalleryBlock component.Testing focus:- Defensive rendering behavior when image data is missing or invalid- Basic thumbnail rendering with correct accessibility attributesDesign intent:This block is intentionally simple and defensive. Tests verify that:- The component fails silently when no images are provided- Valid image data renders accessible `<img>` elements

<a name="module_src/components/renderers/blocks/ImageGalleryBlock"></a>

## src/components/renderers/blocks/ImageGalleryBlock
Renders a responsive image gallery inside a collapsible,frosted-style panel.

<a name="module_src/components/renderers/blocks/ImageGalleryBlock..ImageGalleryBlock"></a>

### src/components/renderers/blocks/ImageGalleryBlock~ImageGalleryBlock ⇒ <code>JSX.Element</code> \| <code>null</code>
Displays a responsive image gallery as a collapsible frosted panel.Key behaviors:- Renders a grid of image thumbnails using RSuite FlexboxGrid- Each image opens a ClickableImg modal viewer when activated- Uses stable React keys, preferring `image.id` when availableRendering notes:- Returns `null` if no valid items are provided- Panel header is rendered only when a title is supplied

**Kind**: inner property of [<code>src/components/renderers/blocks/ImageGalleryBlock</code>](#module_src/components/renderers/blocks/ImageGalleryBlock)  
**Returns**: <code>JSX.Element</code> \| <code>null</code> - Rendered image gallery or null if empty.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| block | <code>object</code> | Component props. |
| [block.id] | <code>string</code> | DOM id assigned to the panel container, used as a scroll anchor and for accessibility. |
| block.items | <code>Array.&lt;FeatureImage&gt;</code> | Image definitions to render. |

**Example**  
```js<ImageGalleryBlockblock={{ id: "gallery1",title: "Project Screenshots",items: [   { id: "img1", src: "/images/screenshot1.png", alt: "Screenshot 1" },   { id: "img2", src: "/images/screenshot2.png", alt: "Screenshot 2" }, ],}}
<a name="module_components/blocks"></a>

## components/blocks
Centralized export module for all block components used in page rendering.This file serves as a single point of import for all block types, promotingmodularity and ease of maintenance across the codebase.Note: When adding new block types, simply import them here and include them in the export statement.


* [components/blocks](#module_components/blocks)
    * [~ImageGalleryBlockRenders a gallery-style block for displaying one or more images.](#module_components/blocks..ImageGalleryBlockRenders a gallery-style block for displaying one or more images.) : <code>React.ComponentType.&lt;any&gt;</code>
    * [~LinksBlockRenders a block containing a list of external or internal links.](#module_components/blocks..LinksBlockRenders a block containing a list of external or internal links.) : <code>React.ComponentType.&lt;any&gt;</code>
    * [~RichTextBlockRenders formatted rich text content, typically sourced from markdownor CMS-style configuration.](#module_components/blocks..RichTextBlockRenders formatted rich text content, typically sourced from markdownor CMS-style configuration.) : <code>React.ComponentType.&lt;any&gt;</code>
    * [~CardGridBlockRenders a grid of cards, each containing an image, title, description,and optional link. Used for showcasing projects, team members, or othercollections of related items.](#module_components/blocks..CardGridBlockRenders a grid of cards, each containing an image, title, description,and optional link. Used for showcasing projects, team members, or othercollections of related items.) : <code>React.ComponentType.&lt;any&gt;</code>
    * [~HeroBlockRenders a prominent header section typically used at the top of pages ormajor sections. Displays a title, optional subtitle, and associatedtechnologies.](#module_components/blocks..HeroBlockRenders a prominent header section typically used at the top of pages ormajor sections. Displays a title, optional subtitle, and associatedtechnologies.) : <code>React.ComponentType.&lt;any&gt;</code>
    * [~FormBlockRenders a configurable form based on a declarative schema. Supports variousfield types, validation rules, and submission handling logic.](#module_components/blocks..FormBlockRenders a configurable form based on a declarative schema. Supports variousfield types, validation rules, and submission handling logic.) : <code>React.ComponentType.&lt;any&gt;</code>

<a name="module_components/blocks..ImageGalleryBlockRenders a gallery-style block for displaying one or more images."></a>

### components/blocks~ImageGalleryBlockRenders a gallery-style block for displaying one or more images. : <code>React.ComponentType.&lt;any&gt;</code>
**Kind**: inner property of [<code>components/blocks</code>](#module_components/blocks)  
<a name="module_components/blocks..LinksBlockRenders a block containing a list of external or internal links."></a>

### components/blocks~LinksBlockRenders a block containing a list of external or internal links. : <code>React.ComponentType.&lt;any&gt;</code>
**Kind**: inner property of [<code>components/blocks</code>](#module_components/blocks)  
<a name="module_components/blocks..RichTextBlockRenders formatted rich text content, typically sourced from markdownor CMS-style configuration."></a>

### components/blocks~RichTextBlockRenders formatted rich text content, typically sourced from markdownor CMS-style configuration. : <code>React.ComponentType.&lt;any&gt;</code>
**Kind**: inner property of [<code>components/blocks</code>](#module_components/blocks)  
<a name="module_components/blocks..CardGridBlockRenders a grid of cards, each containing an image, title, description,and optional link. Used for showcasing projects, team members, or othercollections of related items."></a>

### components/blocks~CardGridBlockRenders a grid of cards, each containing an image, title, description,and optional link. Used for showcasing projects, team members, or othercollections of related items. : <code>React.ComponentType.&lt;any&gt;</code>
**Kind**: inner property of [<code>components/blocks</code>](#module_components/blocks)  
<a name="module_components/blocks..HeroBlockRenders a prominent header section typically used at the top of pages ormajor sections. Displays a title, optional subtitle, and associatedtechnologies."></a>

### components/blocks~HeroBlockRenders a prominent header section typically used at the top of pages ormajor sections. Displays a title, optional subtitle, and associatedtechnologies. : <code>React.ComponentType.&lt;any&gt;</code>
**Kind**: inner property of [<code>components/blocks</code>](#module_components/blocks)  
<a name="module_components/blocks..FormBlockRenders a configurable form based on a declarative schema. Supports variousfield types, validation rules, and submission handling logic."></a>

### components/blocks~FormBlockRenders a configurable form based on a declarative schema. Supports variousfield types, validation rules, and submission handling logic. : <code>React.ComponentType.&lt;any&gt;</code>
**Kind**: inner property of [<code>components/blocks</code>](#module_components/blocks)  
<a name="module_components/renderers/blocks/LinksBlock"></a>

## components/renderers/blocks/LinksBlock
Renders a list of link buttons inside a collapsible frosted panel.This component is designed to be used as a block renderer within the sectioncontent system. It takes a list of link definitions and renders them as styled buttonswith appropriate attributes for external links, downloads, and accessibility.

<a name="module_components/renderers/blocks/LinksBlock..LinksBlock"></a>

### components/renderers/blocks/LinksBlock~LinksBlock ⇒ <code>JSX.Element</code> \| <code>null</code>
Renders a list of link buttons using the shared UI type system.This component is designed to be used as a block renderer within the section content system. It takes a list of link definitions and renders them as styled buttons with appropriate attributes for external links, downloads, and accessibility.This component relies on the global `LinkItem` typedef defined in`src/types/ui.types.js`. That typedef is treated as a shared contractand should not be redeclared locally.Rendering notes:- Returns `null` when no links are provided- Automatically detects external URLs to apply target and rel attributes- Delegates rendering and accessibility concerns to the shared `Btn` component

**Kind**: inner property of [<code>components/renderers/blocks/LinksBlock</code>](#module_components/renderers/blocks/LinksBlock)  
**Returns**: <code>JSX.Element</code> \| <code>null</code> - Rendered link list or null if empty.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props. |
| props.items | <code>Array.&lt;LinkItem&gt;</code> | List of link definitions to render. |

**Example**  
```js<LinksBlock  items={[    { title: "GitHub", url: "https://github.com", icon: faGithub },    { title: "Resume", url: "/resume.pdf", download: true, icon: faFile },  ]}/>```
<a name="module_tests/components/blocks/LinksBlock"></a>

## tests/components/blocks/LinksBlock
Unit tests for the LinksBlock component.Testing focus:- Defensive rendering behavior when link data is missing- Correct rendering of anchor elements with expected attributesDesign intent:LinksBlock is intentionally minimal and data-driven.These tests ensure it:- Fails silently when provided with invalid input- Renders accessible anchor elements when valid data is supplied

<a name="module_components/blocks/RichTextBlock"></a>

## components/blocks/RichTextBlock
Renders a collapsible frosted panel containing one or moreparagraphs of rich text content.

<a name="module_components/blocks/RichTextBlock..RichTextBlock"></a>

### components/blocks/RichTextBlock~RichTextBlock ⇒ <code>JSX.Element</code> \| <code>null</code>
Renders a collapsible panel containing one or more paragraphs of rich text. Intended for use as a content block within feature or section layouts.Rendering notes:- Returns `null` if no valid paragraph content is provided- Each paragraph is rendered as a separate `<p>` element- Panel header is conditionally rendered when a title is suppliedAccessibility:- Uses `role="region"` to denote a landmark section- Applies `aria-label` when a title is present

**Kind**: inner property of [<code>components/blocks/RichTextBlock</code>](#module_components/blocks/RichTextBlock)  
**Returns**: <code>JSX.Element</code> \| <code>null</code> - Rendered rich text panel or null if empty.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props. - Each paragraph is rendered as a separate `<p>` element - Panel header is conditionally rendered when a title is supplied Accessibility: - Uses `role="region"` to denote a landmark section - Applies `aria-label` when a title is present |
| props | <code>object</code> | Component props. |
| [props.id] | <code>string</code> | DOM id assigned to the panel container, used as a scroll anchor and for accessibility. |
| [props.title] | <code>string</code> | Optional heading displayed in the panel header. |
| props.content | <code>Array.&lt;string&gt;</code> \| <code>RichTextNode</code> | Paragraph text content to render. |

<a name="module_tests/components/blocks/RichTextBlock"></a>

## tests/components/blocks/RichTextBlock
Unit tests for the RichTextBlock component.Testing focus:- Defensive rendering behavior when content is missing or invalid- Correct rendering of markdown content into semantic HTMLDesign intent:RichTextBlock is expected to be tolerant of missing data while stillcorrectly rendering valid markdown input.

<a name="module_components/RichText"></a>

## components/RichText
Renders rich text content which may include plain strings, arrays,or structured rich text nodes.

<a name="module_components/RichText..RichText"></a>

### components/RichText~RichText ⇒ <code>JSX.Element</code> \| <code>null</code>
Renders rich text content which may include plain strings, arrays, or structured rich text nodes. This component is designed to handle a variety of content formats, allowing for flexible rendering of rich text in different contexts.

**Kind**: inner property of [<code>components/RichText</code>](#module_components/RichText)  
**Returns**: <code>JSX.Element</code> \| <code>null</code> - Rendered rich text content or null if input is empty/invalidKey behaviors:- Handles multiple content formats: strings, numbers, arrays, and objects- Trims string content and renders only if non-empty to avoid empty paragraphs- Recursively renders array content, allowing for complex rich text structures- Uses stable keys for array items, preferring node IDs when available- Applies ARIA roles and labels for accessibility when provided- Returns null for invalid or empty content to prevent rendering errors  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> |  |
| props.text | <code>string</code> \| <code>number</code> \| <code>object</code> \| <code>Array</code> |  |
| props.index | <code>number</code> | Optional index for key generation in arrays |
| props.className | <code>string</code> | Additional CSS classes for styling |
| props.role | <code>string</code> | ARIA role for accessibility |
| props.className | <code>string</code> | Additional CSS classes for styling |
| props.role | <code>string</code> | ARIA role for accessibility |
| props.ariaLabeledBy | <code>string</code> | ID of the element that labels this content for accessibility |

**Example**  
```js<RichText  text={[    "This is a paragraph of rich text.",    { type: "link", href: "https://example.com", text: "This is a link." },   "This is another paragraph." ]} className="custom-rich-text" role="article"ariaLabeledBy="richTextLabel"/>```In this example, the `RichText` component renders a mix of plain text and a structured link node, applying custom styling and accessibility attributes as specified in the props.
<a name="module_components/renderers/RichText/renderNode"></a>

## components/renderers/RichText/renderNode
Tests for the renderNode function, ensuring it correctly renders various node types such as text, links, lists, code blocks, and inline icons, and handles unknown or null nodes gracefully without throwing errors.

<a name="module_components/SectionRenderer"></a>

## components/SectionRenderer
Central render orchestrator for feature sections composed ofdeclarative content blocks.


* [components/SectionRenderer](#module_components/SectionRenderer)
    * [~SectionRenderer](#module_components/SectionRenderer..SectionRenderer) ⇒ <code>JSX.Element</code>
        * [~blocks](#module_components/SectionRenderer..SectionRenderer..blocks)

<a name="module_components/SectionRenderer..SectionRenderer"></a>

### components/SectionRenderer~SectionRenderer ⇒ <code>JSX.Element</code>
Central render orchestrator for a single feature section.This component acts as a **data-driven layout engine**, allowingentire pages to be defined declaratively via structured datainstead of hardcoded JSX.

**Kind**: inner property of [<code>components/SectionRenderer</code>](#module_components/SectionRenderer)  
**Summary**: Core responsibilities:- Registers the section with the global SectionRegistry  (used by sticky navigation and scroll-spy behavior)- Renders the section container via `InfoSection`- Dynamically resolves and renders content blocks based on `BlockType`Supported block types:- Rich text content- Image galleries- Link lists- Bulleted / accordion lists- Mermaid diagrams (theme-aware)Defensive behavior:- Gracefully handles malformed or unknown block definitions- Renders a visible warning instead of silently failing  
**Returns**: <code>JSX.Element</code> - Rendered, scroll-registered, frosted-glass section.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component props. |
| props.section | <code>FeatureSection</code> | Fully-defined section descriptor containing metadata   (`id`, `title`, `subtitle`, `icon`) and an ordered list of blocks. |

**Example**  
```js<SectionRenderer  section={{    id: "projects",    title: "Projects",    subtitle: "Selected work",    blocks: [...]  }}/>```
<a name="module_components/SectionRenderer..SectionRenderer..blocks"></a>

#### SectionRenderer~blocks
Registers the section for scroll tracking on mountand unregisters it on unmount.Enables:- Sticky section navigation- Active section highlighting- Programmatic scrolling

**Kind**: inner constant of [<code>SectionRenderer</code>](#module_components/SectionRenderer..SectionRenderer)  
<a name="module_tests/components/SectionRenderer"></a>

## tests/components/SectionRenderer
Unit tests for the SectionRenderer component.Test coverage:- Section registry registration on mount- Section registry cleanup on unmount- Delegation to InfoSection for layout- Block-type dispatching to the correct child renderer- Defensive fallback rendering for unknown block typesTesting strategy:- Mocks all child renderers to isolate dispatch logic- Mocks SectionRegistry to observe registration side effects- Avoids testing block rendering internals (covered elsewhere)Architectural intent:SectionRenderer is treated as a **render orchestrator**, not acontent renderer. Tests focus on delegation, ordering, anddefensive behavior rather than DOM structure.

<a name="module_tests/components/AccordionList"></a>

## tests/components/AccordionList
Unit tests for the AccordionList component.Test coverage:- Basic rendering of panel and item titles- Accordion expand / collapse behavior- Keyboard interaction (Enter / Space)- Scroll-to-section behavior for `isScroller` items- Accessibility roles and screen-reader live region updatesTesting strategy:- Uses `renderWithProviders` to ensure context parity with the app- Uses `@testing-library/user-event` for realistic interaction simulation- Avoids testing implementation details; focuses on observable behavior

<a name="module_components/AccordionList"></a>

## components/AccordionList
Fully accessible, keyboard-navigable accordion and sectionnavigation component with frosted-glass styling.


* [components/AccordionList](#module_components/AccordionList)
    * [~AccordionList(props)](#module_components/AccordionList..AccordionList) ⇒ <code>JSX.Element</code>
        * [~focusHeader()](#module_components/AccordionList..AccordionList..focusHeader)
        * [~scrollTo()](#module_components/AccordionList..AccordionList..scrollTo)
        * [~togglePanel()](#module_components/AccordionList..AccordionList..togglePanel)
        * [~moveFocus()](#module_components/AccordionList..AccordionList..moveFocus)
        * [~handleKeyDown()](#module_components/AccordionList..AccordionList..handleKeyDown)
    * [~AccordionItem](#module_components/AccordionList..AccordionItem) : <code>Object</code>

<a name="module_components/AccordionList..AccordionList"></a>

### components/AccordionList~AccordionList(props) ⇒ <code>JSX.Element</code>
**Kind**: inner method of [<code>components/AccordionList</code>](#module_components/AccordionList)  
**Returns**: <code>JSX.Element</code> - A fully accessible accordion and section navigation component.---------------------------------------------------------------------------EXAMPLE USAGE-----------------------------------------------------------------------<AccordionList  title="Sections"  variant="dark"  items={[    {      id: "editor",      isScroller: true,      icon: faCode,      title: "3-Panel Editor",      text: "Details about the editor system..."    },    {      id: "organizations",      isScroller: true,      icon: faPeopleGroup,      title: "Organizations",      text: "How orgs and licenses work..."    }  ]}/>-----------------------------------------------------------------------NOTES-----------------------------------------------------------------------• Designed to integrate with Sticky Section Nav for a unified navigation system• Automatically syncs open item with page scroll position• Accessible to screen readers and keyboard-only users• Uses RSuite's <Accordion> but replaces all header behavior with custom ARIA logic  
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
| [props.accordion] | <code>boolean</code> | <code>true</code> | Enables collapsible accordion behavior.   When false, acts as a navigational list only. |
| [props.variant] | <code>&quot;dark&quot;</code> \| <code>&quot;light&quot;</code> | <code>&quot;dark&quot;</code> | Visual theme variant applied to the wrapper. |
| [props.className] | <code>string</code> |  | Additional CSS class names applied to the wrapper. |
| [props.bordered] | <code>boolean</code> | <code>false</code> | Whether the outer panel displays RSuite borders. |


* [~AccordionList(props)](#module_components/AccordionList..AccordionList) ⇒ <code>JSX.Element</code>
    * [~focusHeader()](#module_components/AccordionList..AccordionList..focusHeader)
    * [~scrollTo()](#module_components/AccordionList..AccordionList..scrollTo)
    * [~togglePanel()](#module_components/AccordionList..AccordionList..togglePanel)
    * [~moveFocus()](#module_components/AccordionList..AccordionList..moveFocus)
    * [~handleKeyDown()](#module_components/AccordionList..AccordionList..handleKeyDown)

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
AccordionItem---------------------------------------------------------------------------Describes a single entry rendered within the AccordionList.

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

<a name="tests/components/ui/BtnNote_ The rsuite Button and IconButton components are mocked to simplify testing and focus on Btns behavior rather than the underlying library implementation.The FrostedIcon component is also mocked to provide a simple representation for testing purposes.module_"></a>

## tests/components/ui/BtnNote: The rsuite Button and IconButton components are mocked to simplify testing and focus on Btns behavior rather than the underlying library implementation.The FrostedIcon component is also mocked to provide a simple representation for testing purposes.
Unit tests for the Btn component.Testing focus:- Click handling behavior (invocation, disabled state)- Accessibility features (icon-only naming, button type)- Async behavior (busy state during pending operations)Design intent:Btn is designed to be a versatile button component that can handle various use cases, including icon-only buttons and async operations. The tests ensure that it behaves correctly in these scenarios while maintaining accessibility standards.

<a name="module_components/Btn"></a>

## components/Btn
Unified frosted-glass button component implementing theMidnight Gold UI system with accessibility, animation, async handling,and controlled prop passthrough to RSuite and FontAwesome.


* [components/Btn](#module_components/Btn)
    * [~Btn](#module_components/Btn..Btn) ⇒ <code>JSX.Element</code>
        * [~isIconOnly](#module_components/Btn..Btn..isIconOnly)
        * [~resolvedAriaLabel](#module_components/Btn..Btn..resolvedAriaLabel)
        * [~handleClick(e)](#module_components/Btn..Btn..handleClick) ⇒ <code>void</code>
    * [~RSuiteButtonProps](#module_components/Btn..RSuiteButtonProps) : <code>Object</code>
    * [~FontAwesomeButtonIconProps](#module_components/Btn..FontAwesomeButtonIconProps) : <code>Object</code>

<a name="module_components/Btn..Btn"></a>

### components/Btn~Btn ⇒ <code>JSX.Element</code>
A unified, accessible, animated button component that conforms to theMidnight Gold + Frosted UI system.Core responsibilities:- Normalizes RSuite `<Button>` and `<IconButton>` behavior- Automatically switches to IconButton when an icon is present- Enforces accessibility for icon-only buttons- Supports async click handlers with visual feedback- Provides tooltip support via RSuite Whisper- Can render as:  - Native button  - React Router link  - External anchorAccessibility:- Requires an accessible label for icon-only buttons- Applies `aria-busy` during loading/async states- Applies `aria-disabled` consistently

**Kind**: inner property of [<code>components/Btn</code>](#module_components/Btn)  
**Returns**: <code>JSX.Element</code> - Rendered button component.  
**Access**: public  
**Component**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  | Component props. |
| [props.variant] | <code>Variant</code> | <code>&quot;primary&quot;</code> | Visual style variant aligned with the frosted theme. |
| [props.size] | <code>Size</code> | <code>&quot;md&quot;</code> | Size variant applied to both button and icon. |
| [props.text] | <code>string</code> |  | Text label rendered inside the button. |
| [props.type] | <code>&quot;button&quot;</code> \| <code>&quot;submit&quot;</code> \| <code>&quot;reset&quot;</code> | <code>&quot;button&quot;</code> | Native button type forwarded to the underlying RSuite button. |
| [props.icon] | <code>string</code> |  | FontAwesome icon name. When provided, renders an IconButton. |
| [props.onClick] | <code>function</code> |  | Click handler. May return a Promise to enable async loading state. |
| [props.clickable] | <code>boolean</code> | <code>true</code> | Indicates whether the button/icon is clickable or not. |
| [props.ariaLabel] | <code>string</code> |  | Accessible label. Required for icon-only buttons if no tooltip is provided. |
| [props.tooltip] | <code>string</code> |  | Tooltip text displayed on hover. |
| [props.tooltipFollowCursor] | <code>boolean</code> | <code>true</code> | When true, the tooltip will follow the cursor. |
| [props.tooltipPlacement] | <code>TooltipPlacement</code> | <code>&quot;right&quot;</code> | Placement of the tooltip relative to the button. |
| [props.animation] | <code>HoverAnimation</code> | <code>&quot;scale&quot;</code> | Optional hover animation preset. |
| [props.href] | <code>string</code> |  | Converts the button into a link when provided. |
| [props.hrefLocal] | <code>boolean</code> | <code>false</code> | When true, renders a React Router `<Link>` instead of an anchor. |
| [props.target] | <code>string</code> |  | Anchor target value (e.g., "_blank"). |
| [props.rel] | <code>string</code> |  | Anchor `rel` attribute. |
| [props.className] | <code>string</code> |  | Additional CSS class names. |
| [props.noBG] | <code>boolean</code> | <code>false</code> | Disables the frosted background treatment. |
| [props.*] | <code>RSuiteButtonProps</code> |  | Any supported RSuite Button/IconButton props are forwarded directly. |
| [props.*] | <code>FontAwesomeButtonIconProps</code> |  | FontAwesome-related props forwarded to the internal `FrostedIcon`. |

**Example**  
```js<Btnvariant="accent"size="lg"text="Click Me"icon="fa-solid fa-thumbs-up"onClick={() => alert("Button clicked!")}tooltip="This is a button"ariaLabel="Click Me"/>```In this example, the `Btn` component renders a large, accent-styled button with both text and an icon. It includes a tooltip that appears on hover and an accessible label for screen readers. When clicked, it triggers an alert dialog.

* [~Btn](#module_components/Btn..Btn) ⇒ <code>JSX.Element</code>
    * [~isIconOnly](#module_components/Btn..Btn..isIconOnly)
    * [~resolvedAriaLabel](#module_components/Btn..Btn..resolvedAriaLabel)
    * [~handleClick(e)](#module_components/Btn..Btn..handleClick) ⇒ <code>void</code>

<a name="module_components/Btn..Btn..isIconOnly"></a>

#### Btn~isIconOnly
True when the button renders only an icon with no text label

**Kind**: inner constant of [<code>Btn</code>](#module_components/Btn..Btn)  
<a name="module_components/Btn..Btn..resolvedAriaLabel"></a>

#### Btn~resolvedAriaLabel
Resolve an accessible aria-label for the button.Falls back to tooltip text or a humanized icon name.

**Kind**: inner constant of [<code>Btn</code>](#module_components/Btn..Btn)  
<a name="module_components/Btn..Btn..handleClick"></a>

#### Btn~handleClick(e) ⇒ <code>void</code>
Async-aware click handler.Automatically manages loading state when a Promise is returned.

**Kind**: inner method of [<code>Btn</code>](#module_components/Btn..Btn)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>React.MouseEvent</code> | Click event. |

<a name="module_components/Btn..RSuiteButtonProps"></a>

### components/Btn~RSuiteButtonProps : <code>Object</code>
Subset of props forwarded directly to RSuite `<Button>` / `<IconButton>`.These are documented explicitly to make passthrough behavior clearwithout re-exporting RSuite types.Subset of props forwarded directly to RSuite `<Button>` / `<IconButton>`.These are documented explicitly to make passthrough behavior clearwithout re-exporting RSuite types.

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
| [href] | <code>string</code> |  | If provided, renders an anchor instead of a button. |
| [target] | <code>string</code> |  | Anchor target (e.g., "_blank"). |
| [rel] | <code>string</code> |  | Anchor rel attribute. |
| [download] | <code>string</code> |  | Anchor download attribute. |
| [className] | <code>string</code> |  | Additional CSS class names. |
| [noBG] | <code>boolean</code> | <code>false</code> | If true, disables the frosted background. |
| [variant] | <code>Variant</code> | <code>&quot;primary&quot;</code> | Visual style variant. |
| [size] | <code>Size</code> | <code>&quot;md&quot;</code> | Size variant applied to both button and icon. |
| [text] | <code>string</code> |  | Text label rendered inside the button. |
| [type] | <code>&quot;button&quot;</code> \| <code>&quot;submit&quot;</code> \| <code>&quot;reset&quot;</code> | <code>&quot;button&quot;</code> | Native button type. |
| [icon] | <code>string</code> |  | FontAwesome icon name. When provided, renders an IconButton. |
| [onClick] | <code>function</code> |  | Click handler. May return a Promise to enable async loading state. |

<a name="module_components/Btn..FontAwesomeButtonIconProps"></a>

### components/Btn~FontAwesomeButtonIconProps : <code>Object</code>
FontAwesome-related props forwarded to the internal `FrostedIcon`instance rendered inside the button. These allow for fine-grained control overthe icon's appearance and behavior, including animation, flipping, masking, and more.

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
Unit tests for the ClickableImg component.Test coverage:- Thumbnail image rendering- Optional caption rendering- Modal open and close behavior- Expanded image rendering- Keyboard interaction (Escape key)- Accessibility attributes and aria-label handlingTesting strategy:- Uses `@testing-library/user-event` to simulate real user interactions- Verifies RSuite Modal behavior via `role="dialog"`- Avoids snapshots in favor of semantic queries

<a name="module_components/ClickableImg"></a>

## components/ClickableImg
Clickable image component that expands into a frostedmodal viewer while preserving aspect ratio and accessibility.

<a name="module_components/ClickableImg..ClickableImg"></a>

### components/ClickableImg~ClickableImg ⇒ <code>JSX.Element</code>
A responsive image thumbnail that expands into a modal viewer when clicked. The modal maintains the image's aspect ratio and includes optional title and caption support. Designed with accessibility in mind, it requires alt text and applies appropriate aria-labels.Key behaviors:
- Renders a responsive image thumbnail using RSuite's Image component
- Clicking the thumbnail opens a modal viewer with a larger version of the image
- The modal can be closed with the close button or pressing the ESC key
- The expanded image supports zoom controls and drag-to-pan interaction
- On mobile, title/caption details are hidden while zoomed to maximize viewing space
- Both thumbnail and modal images are lazy-loaded for performance
- The modal and image wrapper feature frosted glass styling consistent with the UI design system
- On mobile portrait, wide images show a rotate/zoom guidance hint
Accessibility:- Requires alt text for screen readers- Applies aria-label to both thumbnail and modal image

**Kind**: inner property of [<code>components/ClickableImg</code>](#module_components/ClickableImg)  
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

**Example**  
```js<ClickableImgsrc="/images/project-screenshot.png"alt="Screenshot of the project in action"title="Project Screenshot"caption="This screenshot shows the main dashboard of the application."ariaLabel="Screenshot of the project in action, click to expand"/>```In this example, the `ClickableImg` component renders a thumbnail of a project screenshot. When the user clicks on the image, it opens a modal viewer displaying a larger version of the screenshot along with the provided title and caption. The component ensures that all images are accessible and responsive across different devices.
<a name="module_tests/components/FrostedIcon"></a>

## tests/components/FrostedIcon
Unit tests for the FrostedIcon component.Testing focus:- Semantic role switching based on `clickable` prop- Size-related CSS class application- Loading state accessibility signalingDesign intent:FrostedIcon is a low-level visual primitive that must:- Render correct semantic roles (`img` vs `button`)- Expose loading state via `aria-busy`- Apply predictable, size-based CSS classesThese tests validate observable DOM behavior rather than internal logic.

<a name="module_components/FrostedIcon"></a>

## components/FrostedIcon
Styled FontAwesome icon component integrated with theMidnight Gold frosted UI system.


* [components/FrostedIcon](#module_components/FrostedIcon)
    * [~FrostedIcon](#module_components/FrostedIcon..FrostedIcon) ⇒ <code>JSX.Element</code>
    * [~FontAwesomeIconProps](#module_components/FrostedIcon..FontAwesomeIconProps) : <code>Object</code>

<a name="module_components/FrostedIcon..FrostedIcon"></a>

### components/FrostedIcon~FrostedIcon ⇒ <code>JSX.Element</code>
A styled wrapper around [FontAwesomeIcon](FontAwesomeIcon) that conforms to theMidnight Gold + Frosted UI system.Core responsibilities:- Applies frosted-glass theming and size variants- Manages loading and animation states- Provides optional click interaction- Exposes tooltip support via RSuite Whisper- Forwards supported FontAwesome props directly to the SVG rendererAccessibility:- Uses `role="button"` when clickable- Applies `aria-label` when provided- Uses `aria-busy` during loading states

**Kind**: inner property of [<code>components/FrostedIcon</code>](#module_components/FrostedIcon)  
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

**Example**  
```js<FrostedIconicon={faCoffee}size={Size.LG}variant={Variant.ACCENT}clickableonClick={() => alert("Icon clicked!")}/>```
<a name="module_components/FrostedIcon..FontAwesomeIconProps"></a>

### components/FrostedIcon~FontAwesomeIconProps : <code>Object</code>
Subset of props forwarded directly to the underlying `FontAwesomeIcon`component. These align with the official `@fortawesome/react-fontawesome`API and are documented here for completeness.

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

<a name="module_components/ui"></a>

## components/ui
Centralized export module for shared UI components. This file serves as a single point of import for all commonly used UI elements across the codebase, promoting modularity and ease of maintenance.Note: When adding new shared UI components, simply import them here and include them in the export statement.

<a name="module_components/ui/InsightCard"></a>

## components/ui/InsightCard
InsightCard and CardGrid components for displaying key insights in a visually engaging card format.


* [components/ui/InsightCard](#module_components/ui/InsightCard)
    * [~CardGrid](#module_components/ui/InsightCard..CardGrid) ⇒ <code>JSX.Element</code>
    * [~InsightCard](#module_components/ui/InsightCard..InsightCard) ⇒ <code>JSX.Element</code>

<a name="module_components/ui/InsightCard..CardGrid"></a>

### components/ui/InsightCard~CardGrid ⇒ <code>JSX.Element</code>
A grid layout component for displaying multiple InsightCards. It uses CSS Grid to create a responsive layout based on the specified number of columns.

**Kind**: inner property of [<code>components/ui/InsightCard</code>](#module_components/ui/InsightCard)  
**Returns**: <code>JSX.Element</code> - A responsive grid container for InsightCards.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| columns | <code>number</code> | The number of columns in the grid. Default is 3. |
| children | <code>React.ReactNode</code> | The content to be displayed within the grid. Each child will be treated as a separate card. |

**Example**  
```js<CardGrid columns={2}> <InsightCard title="Insight 1" content="This is the first insight." /> <InsightCard title="Insight 2" content="This is the second insight." /></CardGrid>```Accessibility:- The grid container uses `role="list"` to denote a list of items (cards).- Each child card should use `role="listitem"` to denote individual items within the list.- The grid layout is responsive and will adjust based on screen size, ensuring readability and usability across devices.Design notes:- The `columns` prop allows for flexible layout configurations, enabling different numbers of cards per row based on design needs.- The grid uses consistent spacing and alignment to create a cohesive visual presentation of the insights.
<a name="module_components/ui/InsightCard..InsightCard"></a>

### components/ui/InsightCard~InsightCard ⇒ <code>JSX.Element</code>
A card component for displaying insights with a header and body. The header can include an optional FontAwesome icon, title, and subtitle. The body can contain any content passed as children.

**Kind**: inner property of [<code>components/ui/InsightCard</code>](#module_components/ui/InsightCard)  
**Returns**: <code>JSX.Element</code> - The rendered InsightCard component.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The title of the insight card. |
| [icon] | <code>object</code> | The FontAwesome icon to display in the card header. |
| [subtitle] | <code>string</code> | The subtitle of the insight card. |
| [variant] | <code>Variant</code> | The accent color for the card (default is "primary"). |
| content | <code>Array.&lt;RichTextNode&gt;</code> \| <code>string</code> | The content to be displayed within the card body. |

**Example**  
```js<InsightCard title="Key Insight" icon={faLightbulb} subtitle="This is a subtitle" variant={Variant.SECONDARY} content="This is the main content of the insight card."/>```Accessibility:- The card uses semantic HTML elements (e.g., `<h3>` for the title) to ensure proper structure and readability for screen readers.- The optional icon includes an `aria-label` for accessibility, describing the purpose of the icon when it is present.- The card's color variant is purely decorative and does not convey additional information, so it does not affect accessibility attributes.Design notes:- The `variant` prop allows for visual differentiation between cards, enabling the use of different accent colors to highlight specific insights.- The card layout is designed to be flexible, allowing for various types of content in the body while maintaining a consistent header structure.- The use of a divider between the header and body helps to visually separate the sections and improve readability.- The component is designed to be reusable and composable, allowing it to be used in various contexts where insights need to be displayed in a card format.
<a name="module_components/MermaidDiagram"></a>

## components/MermaidDiagram
Fully featured Mermaid diagram renderer with dark/light theme support, responsive SVG layout, accessible container, optional description, and PNG export capability. The component normalizes props to support both legacy and new diagram configurations, allowing for flexible integration while maintaining a consistent internal state structure for rendering.

**See**: https://mermaid.js.org/ for Mermaid documentation and syntax reference.  

* [components/MermaidDiagram](#module_components/MermaidDiagram)
    * [~MermaidDiagram](#module_components/MermaidDiagram..MermaidDiagram) ⇒ <code>JSX.Element</code>
    * [~handleExport()](#module_components/MermaidDiagram..handleExport) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="module_components/MermaidDiagram..MermaidDiagram"></a>

### components/MermaidDiagram~MermaidDiagram ⇒ <code>JSX.Element</code>
Fully featured Mermaid diagram renderer with dark/light theme support, responsive SVG layout, accessible container, optional description, and PNG export capability. The component normalizes props to support both legacy and new diagram configurations, allowing for flexible integration while maintaining a consistent internal state structure for rendering.Core responsibilities:- Render Mermaid diagrams based on provided source strings, with support for separate mobile and desktop configurations.- Apply visual themes (dark/light) to the rendered diagrams for consistent styling.- Ensure the diagram container is accessible, using appropriate ARIA roles and labels.- Include an optional description rendered beneath the diagram for additional context.- Provide a button to export the rendered diagram as a PNG image, using `html-to-image` for conversion.- Normalize incoming props to support both legacy and new diagram configurations, ensuring backward compatibility while enabling new features.

**Kind**: inner property of [<code>components/MermaidDiagram</code>](#module_components/MermaidDiagram)  
**Returns**: <code>JSX.Element</code> - Rendered Mermaid diagram panel.  
**Access**: public  
**Component**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  | Component props. |
| props.id | <code>string</code> |  | DOM id assigned to the panel container, used as a scroll anchor and for accessibility. |
| props.diagram | <code>string</code> |  | Mermaid diagram source string. Legacy property if `mobileDiagram` and/or `desktopDiagram` are not provided. |
| props.mobileDiagram | <code>Object</code> |  | Optional diagram configuration for mobile viewports. |
| props.desktopDiagram | <code>Object</code> |  | Optional diagram configuration for desktop viewports. |
| [props.title] | <code>string</code> |  | Optional title rendered in the panel header and used for accessibility. |
| [props.description] | <code>string</code> |  | Optional descriptive text rendered beneath the diagram. |
| [props.theme] | <code>&quot;dark&quot;</code> \| <code>&quot;light&quot;</code> | <code>&quot;dark&quot;</code> | Visual theme applied to Mermaid rendering. |
| [props.theme] | <code>string</code> |  | Visual theme for the diagram (e.g. "dark" or "light"). |
| [props.icon] | <code>string</code> |  |  |
| [props.className] | <code>string</code> |  | Additional CSS class names applied to the panel container. |

**Example**  
```js<MermaidDiagramid="example-diagram"title="Example Mermaid Diagram"description="This is an example of a Mermaid diagram rendered within the MermaidDiagram component."diagram="graph TD; A-->B; A-->C; B-->D; C-->D;"theme="dark"/>// In this example, the `MermaidDiagram` component renders a simple flowchart defined by the Mermaid syntax in the `diagram` prop. The component applies the "dark" theme to the rendered SVG and includes a title and description for context. The diagram is rendered within a styled panel that is accessible and includes functionality for exporting the diagram as a PNG image.```
<a name="module_components/MermaidDiagram..handleExport"></a>

### components/MermaidDiagram~handleExport() ⇒ <code>Promise.&lt;void&gt;</code>
Handle diagram export by converting the rendered SVG to a PNG image using `html-to-image`, while ensuring that the host element and SVG are present before attempting the export. The function includes error handling to catch and log any issues during the export process, providing feedback in case of failure. The exported file is named based on the provided title or defaults to "diagram.png" if no title is available, ensuring a user-friendly download experience.The export process involves:- Selecting the SVG element from the host container to ensure that the correct content is exported.- Using `html-to-image`'s `toPng` function to convert the SVG to a PNG data URL, with options for cache busting and background color to ensure a clean export.- Creating a temporary anchor element to trigger the download of the PNG file, setting the `href` to the generated data URL and the `download` attribute to specify the filename.- Handling any errors that occur during the export process by logging them to the console, allowing for debugging and user feedback in case of issues.

**Kind**: inner method of [<code>components/MermaidDiagram</code>](#module_components/MermaidDiagram)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise that resolves when the export process is complete, allowing for asynchronous handling of the export operation.  
<a name="module_components/ProjectCard"></a>

## components/ProjectCard
Reusable frosted-glass project display card used to presentportfolio projects with images, repository links, and live URLs.


* [components/ProjectCard](#module_components/ProjectCard)
    * [~ProjectCard](#module_components/ProjectCard..ProjectCard) ⇒ <code>JSX.Element</code>
    * [~ProjectImage](#module_components/ProjectCard..ProjectImage) : <code>Object</code>

<a name="module_components/ProjectCard..ProjectCard"></a>

### components/ProjectCard~ProjectCard ⇒ <code>JSX.Element</code>
A reusable card component for showcasing portfolio projects, featuring a frosted-glass design consistent with the UI theme. Each card can display a project title, description, a grid of images, and action buttons linking to the project's GitHub repository and live URL. The component is designed to be flexible and visually engaging, making it ideal for presenting projects in a portfolio context.Features:- Standardized layout via `InfoSection`- Optional responsive image gallery using `ClickableImg`- Optional GitHub repository link- Optional live project URL- Pure-CSS animation and layout stylingUsage notes:- Images are rendered only when provided- Action buttons are conditionally rendered based on link availability- Designed to integrate cleanly with section-based navigation

**Kind**: inner property of [<code>components/ProjectCard</code>](#module_components/ProjectCard)  
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
**Kind**: inner typedef of [<code>components/ProjectCard</code>](#module_components/ProjectCard)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | Image source URL. |
| alt | <code>string</code> | Alt text for accessibility. |
| [title] | <code>string</code> | Optional image title. |
| [caption] | <code>string</code> | Optional caption displayed with the image. |

<a name="module_pages/CodeStream"></a>

## pages/CodeStream
Professional work case study page for CodeStream Online Studio, featuring a data-driven layout with synchronized sticky navigation and scroll-spy behavior.

<a name="module_pages/CodeStream..CodeStream"></a>

### pages/CodeStream~CodeStream ⇒ <code>JSX.Element</code>
Professional work case study page for CodeStream Online Studio. Renders a data-driven set of sections and wires them into the sticky section navigation for long-form scanning.Features:- Data-driven layout defined by structured section and block metadata- Sticky top navigation for global page access- Sticky section navigation that auto-syncs with scroll position for easy intra-page navigation- Responsive design with mobile-friendly navigation patterns- Uses `SectionRenderer` to dynamically render content blocks based on type, allowing for flexible and maintainable page compositionAccessibility:- Semantic HTML structure with landmarks and headings- Keyboard navigable sticky navigation components

**Kind**: inner property of [<code>pages/CodeStream</code>](#module_pages/CodeStream)  
**Access**: public  
**Component**:   
<a name="module_tests/pages/Hackathon"></a>

## tests/pages/Hackathon
Page-level tests for the Hackathon page.Testing focus:- Page renders without crashing- Correct route association with StickyNav- Correct section configuration for SectionRenderer- Shared page guarantees enforced via `createPageTests`Testing strategy:- Delegates all assertions to the shared `createPageTests` helper- Treats the page as declarative configuration- Avoids duplicating boilerplate page assertionsArchitectural intent:The Hackathon page follows the standard page composition pattern:- PageHeader- One or more SectionRenderer instances- StickyNav + StickySectionNavThis test file exists solely to bind the Hackathon page’ssection configuration and route to the shared test contract.

<a name="module_components/Health"></a>

## components/Health
Lightweight diagnostic component that displays basicruntime and build environment information.

<a name="module_components/Health..Health"></a>

### components/Health~Health() ⇒ <code>JSX.Element</code>
Health---------------------------------------------------------------------------Displays basic system and environment health information for the application.Intended usage:- Developer diagnostics- Build verification- Quick runtime sanity checks during development or demosDisplayed information:- React version- Current Vite environment mode- Build tool identification- RSuite availabilityNotes:- This component is informational only- No side effects or external dependencies beyond environment variables

**Kind**: inner method of [<code>components/Health</code>](#module_components/Health)  
**Returns**: <code>JSX.Element</code> - Rendered system health panel.  
**Access**: public  
**Component**:   
<a name="module_tests/pages/Home"></a>

## tests/pages/Home
Page-level tests for the Home page.Testing focus:- Page renders without crashing- Correct route association- Correct section configuration- Shared page behavior via `createPageTests`Testing strategy:- Delegates all assertions to the shared `createPageTests` helper- Ensures consistency across all page tests- Avoids duplicating boilerplate page assertionsArchitectural intent:Page test files act as **thin configuration layers**.All behavioral guarantees are centralized in `createPageTests`,allowing pages to be tested declaratively rather than imperatively.

<a name="module_tests/pages/SideProjects"></a>

## tests/pages/SideProjects
Page-level tests for the SideProjects page.Testing focus:- Page renders without crashing- Correct route association with StickyNav- Correct section configuration for SectionRenderer- Shared page guarantees enforced via `createPageTests`Testing strategy:- Delegates all assertions to the shared `createPageTests` helper- Keeps page tests declarative and configuration-driven- Avoids duplicating boilerplate test logicArchitectural intent:The SideProjects page adheres to the standard page composition model:- PageHeader- SectionRenderer instances (driven by section data)- StickyNav + StickySectionNavThis test file exists solely to bind SideProjects-specificconfiguration to the shared page test contract.

<a name="module_tests/pages/SMU"></a>

## tests/pages/SMU
Page-level tests for the SMU page.Testing focus:- Page renders without crashing- Correct route association with StickyNav- Correct section configuration for SectionRenderer- Shared page guarantees enforced via `createPageTests`Testing strategy:- Delegates all assertions to the shared `createPageTests` helper- Keeps page tests declarative and configuration-driven- Avoids duplicating boilerplate assertions across pagesArchitectural intent:The SMU page follows the same standardized page architecture asthe rest of the site:- PageHeader- SectionRenderer instances driven by section data- StickyNav + StickySectionNav for navigationThis test file exists solely to bind SMU-specificconfiguration (sections + route) to the shared page test contract.

<a name="module_tests/pages/CodeStream"></a>

## tests/pages/CodeStream
Page-level tests for the CodeStream page.Testing focus:- Page renders without crashing- Correct route association with StickyNav- Correct section configuration for SectionRenderer- Shared page guarantees enforced via `createPageTests`Testing strategy:- Delegates all assertions to the shared `createPageTests` helper- Treats the page as declarative configuration- Avoids duplicating boilerplate assertionsArchitectural intent:The CodeStream page follows the standard page architecture:- PageHeader- SectionRenderer (one per section)- StickyNav + StickySectionNavThis test file exists solely to bind configuration(sections + route) to the shared test contract.

<a name="module_tests/pages/Contact"></a>

## tests/pages/Contact
Tests for the Contact page, focusing on form submission behavior and error handling.Testing strategy:- Mocks the global fetch function to simulate API responses for contact form submissions.- Tests successful form submission by verifying that the correct API endpoint is called with the expected payload.- Tests error handling by simulating a failed API response and verifying that the appropriate error message is displayed, as well as allowing for a retry of the submission.Design intent:The Contact page is designed to allow users to send messages through a contact form. The tests ensure that the form submission process works correctly, including handling both successful and failed submissions. By mocking the fetch function, we can isolate the component's behavior and verify that it interacts with the API as expected without relying on actual network requests.

**See**: Contact.jsx for the component implementation  
**Author**: Kyle Foster  
<a name="module_scripts/check-jsdoc2md-compat"></a>

## scripts/check-jsdoc2md-compat
Audits JSDoc blocks for jsdoc2md compatibility and baseline professional file-level docs.

<a name="module_format-mermaid"></a>

## format-mermaid
Deterministic formatter for Mermaid diagram source strings.This module operates on raw Mermaid source text and enforces:- Structural indentation- Whitespace normalization- Mermaid grammar safety (Mermaid v11 compatible)Characteristics:- Pure function (no side effects)- Idempotent (repeated runs produce the same output)- Project-agnostic (safe to reuse elsewhere)IMPORTANT:- This module does NOT read or write files- It does NOT validate diagram correctness- It only normalizes formatting

<a name="exp_module_format-mermaid--module.exports"></a>

### module.exports(source) ⇒ <code>string</code> ⏏
Formats a Mermaid diagram source string into a deterministic,readable, and Mermaid-safe structure.This function is intentionally:- Pure (no side effects)- Idempotent (safe to run multiple times)- Structural-only (never changes semantic meaning)It does NOT validate diagrams — linting is handled separately.

**Kind**: Exported function  
**Returns**: <code>string</code> - Canonically formatted Mermaid source.  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> | Raw Mermaid source text. |

<a name="ResumeSection"></a>

## ResumeSection ⇒ <code>JSX.Element</code>
A section within the resume document, used to group related content under a common heading.

**Kind**: global variable  
**Returns**: <code>JSX.Element</code> - The rendered section component.  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The properties object. |
| props.title | <code>string</code> | The title of the section. |
| props.children | <code>React.ReactNode</code> | The content of the section. |

<a name="ResumeDocument"></a>

## ResumeDocument ⇒ <code>JSX.Element</code>
Component responsible for rendering a structured resume document based on provided data.

**Kind**: global variable  
**Returns**: <code>JSX.Element</code> - The rendered resume document component.  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The properties object. |
| props.resume | <code>Object</code> | The resume data object. |

<a name="LazyDisplay"></a>

## LazyDisplay ⇒ <code>JSX.Element</code>
A simple component to display a loading message and an optional icon while a lazy-loaded component is being fetched.

**Kind**: global variable  
**Returns**: <code>JSX.Element</code> - Rendered loading placeholder.  

| Param | Type | Description |
| --- | --- | --- |
| loadingMessage | <code>string</code> | The message to display while loading. Defaults to "Loading...". |
| icon | <code>string</code> | An optional FontAwesome icon class to display above the loading message. |
| iconSpin | <code>boolean</code> | If true, the icon will have the "fa-spin" class applied for animation. |

<a name="diagram"></a>

## diagram ⇒ <code>string</code>
Diagram helper that injects a standard architecture layer palette into flowchart diagrams and formats with Mermaid init.This ensures consistent styling and layer definitions across all architecture diagrams without requiring manual palette inclusion, while leaving non-flowchart diagrams unaffected.

**Kind**: global constant  
**Returns**: <code>string</code> - Fully formatted Mermaid diagram string with palette injection for flowcharts.The function checks if the diagram body contains a flowchart definition. If it does, it verifies whether the architecture layer palette is already included to avoid duplication. If the palette is missing, it injects the palette immediately after the first flowchart header. Finally, it formats the entire diagram with the provided Mermaid init block for consistent styling and rendering.This helper abstracts away the need for manual palette management in architecture diagrams, ensuring that all such diagrams adhere to a unified visual language while allowing other diagram types to remain unaffected.  

| Param | Type | Description |
| --- | --- | --- |
| init | <code>string</code> | Mermaid init block string. |
| body | <code>string</code> | Mermaid diagram body string. |

<a name="CONTACT_API_URL"></a>

## CONTACT\_API\_URL : <code>string</code>
Contact service endpoint used by the public portfolio form.Exported for testability and to keep the request contract centralized.

**Kind**: global constant  
<a name="DIAGRAM_BLOCK_RE"></a>

## DIAGRAM\_BLOCK\_RE
Regex finds:diagram: `...`

**Kind**: global constant  
<a name="CORE_TYPES"></a>

## CORE\_TYPES
VALID_MERMAID_TYPES---------------------------------------------------------------------------Hybrid strict mode:- CORE_TYPES are always allowed- EXTENDED_TYPES are allowed but validated more strictly

**Kind**: global constant  
<a name="OUTPUT_DIR"></a>

## OUTPUT\_DIR
Output directory for rendered PNG assets.This directory is expected to be committed or publishedalongside generated documentation.

**Kind**: global constant  
<a name="VIEWPORT"></a>

## VIEWPORT
Fixed viewport ensures:- Consistent diagram scaling- Predictable text wrapping- Stable screenshot output across environments

**Kind**: global constant  
<a name="DIAGRAM_ENTRIES"></a>

## DIAGRAM\_ENTRIES : <code>Array.&lt;{id: string, route: string}&gt;</code>
Each entry maps a Mermaid diagram block ID to the page route where it renders.

**Kind**: global constant  
<a name="DIAGRAM_IDS"></a>

## DIAGRAM\_IDS
Flat list of just the IDs, for utilities that only need strings.

**Kind**: global constant  
<a name="getBreakpoint"></a>

## getBreakpoint() ⇒ <code>string</code>
Helper function that checks the current viewport width against defined breakpoints using media queries. It returns a string indicating the current breakpoint category: "mobile", "tablet", or "desktop". This function is used internally by the `useBreakpoint` hook to determine the initial breakpoint state and to update it when the viewport size changes.

**Kind**: global function  
**Returns**: <code>string</code> - The current breakpoint: "mobile", "tablet", or "desktop"Note: This function is designed to be called in a browser environment where window.matchMedia is available.In server-side rendering contexts, it will default to "desktop" to avoid errors.  
<a name="getOrientation"></a>

## getOrientation() ⇒ <code>string</code>
Helper function that checks the current viewport orientation using media queries.

**Kind**: global function  
**Returns**: <code>string</code> - The current orientation: "portrait" or "landscape"Note: This function is designed to be called in a browser environment where window.matchMedia is available.In server-side rendering contexts, it will default to "landscape" to avoid errors.This is a common assumption since many desktop environments are landscape-oriented.  
<a name="useBreakpoint"></a>

## useBreakpoint() ⇒ [<code>BreakpointState</code>](#BreakpointState)
Custom React hook that provides responsive breakpoint and orientation information based on window.matchMedia.It returns the current breakpoint and orientation, along with boolean flags for convenience.The hook listens for changes in viewport size and orientation, updating the state accordingly.It is designed to be used in any component that needs to adapt its layout or behavior based on the current screen size and orientation.

**Kind**: global function  
**Returns**: [<code>BreakpointState</code>](#BreakpointState) - An object containing the current breakpoint and orientation, along with boolean flags for each.The hook listens for changes in viewport size and orientation, updating the state accordingly.It is designed to be used in any component that needs to adapt its layout or behavior based on the current screen size and orientation.  
**@function**: useBreakpoint  
<a name="useResponsiveValue"></a>

## useResponsiveValue(values) ⇒ <code>\*</code>
Custom React hook that returns a value based on the current responsive breakpoint.It accepts an object with optional values for mobile, tablet, and desktop breakpoints.The hook uses the `useBreakpoint` hook to determine the current breakpoint and returnsthe corresponding value, falling back to smaller breakpoints if a value is not provided.

**Kind**: global function  
**Returns**: <code>\*</code> - Responsive value for the current breakpoint.  

| Param | Type |
| --- | --- |
| values | [<code>ResponsiveValues</code>](#ResponsiveValues) | 

<a name="buildArchitectureVariants"></a>

## buildArchitectureVariants(config) ⇒ <code>Object</code>
- Builds desktop and mobile Mermaid sources from a single architecture config.Mobile rules:- Default direction becomes TB unless explicitly set by config.mobile.direction- Optionally stack layer order unchanged (TB handles readability)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Base architecture config |

<a name="registerDiagram"></a>

## registerDiagram(id, entry)
Register a diagram configuration. The config is opaque to the registry, but will be used by the diagram factory to produce renderable Mermaid sources.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> |  |
| entry | <code>object</code> | { title, type, config, description?, tags? } |

<a name="getDiagramEntry"></a>

## getDiagramEntry(id) ⇒ <code>object</code> \| <code>undefined</code>
Get a registered diagram entry by id.

**Kind**: global function  
**Returns**: <code>object</code> \| <code>undefined</code> - The diagram entry, or undefined if not found.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The diagram id. |

<a name="listDiagramIds"></a>

## listDiagramIds() ⇒ <code>Array.&lt;string&gt;</code>
List registered diagram ids, sorted alphabetically.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - List of registered diagram ids, sorted alphabetically.  
<a name="buildDiagramSources"></a>

## buildDiagramSources(id) ⇒ <code>object</code>
Build Mermaid sources for a given diagram id. The sources are generated based on the diagram's type and config, and may include variants for different contexts (e.g., desktop vs mobile).

**Kind**: global function  
**Returns**: <code>object</code> - An object containing the Mermaid sources for the diagram.The exact structure of the returned sources object depends on the diagram type and config. For example, for "architecture" diagrams, it may return an object with "desktop" and "mobile" keys, each containing a Mermaid source string variant.- The diagram factory is responsible for interpreting the diagram config and producing the appropriate Mermaid sources. The registry simply stores the configs and provides access to them.- The `buildDiagramSources()` function abstracts away the details of how the sources are generated, allowing callsites to simply request the sources for a given diagram id without needing to know about the underlying config or generation logic.- The returned sources can then be passed to a Mermaid rendering component (e.g., `MermaidDiagram`) to display the diagram in the UI.Usage example:```jsimport MermaidDiagram from "components/MermaidDiagram";import { buildDiagramSources } from "components/features/CustomDiagram/core/diagramRegistry.js";const { desktop, mobile } = buildDiagramSources("greenhouse-architecture");<MermaidDiagram  id="diagram-greenhouse"  title="Greenhouse Controller Architecture"  desktopDiagram={{ diagram: desktop }}  mobileDiagram={{ diagram: mobile }}/>;
```  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The diagram id. |

<a name="buildAllDiagramSources"></a>

## buildAllDiagramSources() ⇒ <code>Array</code>
Build all sources (useful for linting/CI).

**Kind**: global function  
**Returns**: <code>Array</code> - An array of objects containing the diagram id, entry, and Mermaid sources.  
<a name="getResponsiveFlowchartInit"></a>

## getResponsiveFlowchartInit(options) ⇒ <code>string</code>
Generates a Mermaid init block based on responsive and accessibility context.This allows diagrams to adapt to user preferences and device constraints.Currently adjusts flowchart diagrams for mobile breakpoint, reduced motion, reduced transparency, and high contrast modes.

**Kind**: global function  
**Returns**: <code>string</code> - Mermaid init block string with appropriate adjustments based on context.This function is designed to be used in conjunction with the `diagram` helper to ensure that Mermaid diagrams are rendered with context-aware styling and behavior adjustments, enhancing accessibility and usability across different devices and user preferences.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Configuration options for diagram initialization. |
| options.breakpoint | <code>&quot;mobile&quot;</code> \| <code>&quot;tablet&quot;</code> \| <code>&quot;desktop&quot;</code> | Current responsive breakpoint. |
| options.reducedMotion | <code>boolean</code> | Whether the user prefers reduced motion. |
| options.reducedTransparency | <code>boolean</code> | Whether the user prefers reduced transparency. |
| options.highContrast | <code>boolean</code> | Whether the user prefers high contrast mode. |

<a name="resolveDiagram"></a>

## resolveDiagram(def) ⇒ [<code>DiagramDefinition</code>](#DiagramDefinition)
- Resolves diagram definitions into renderable diagrams.

**Kind**: global function  
**Returns**: [<code>DiagramDefinition</code>](#DiagramDefinition) - Resolved diagram definition with generated diagrams (if architecture config is present)Supports:- manual diagrams (existing system)- architecture DSL (auto generated)  

| Param | Type | Description |
| --- | --- | --- |
| def | [<code>DiagramDefinition</code>](#DiagramDefinition) | Diagram definition to resolve |

<a name="collectDocumentStyles"></a>

## collectDocumentStyles() ⇒ <code>string</code>
Collects all styles from the current document to ensure that the print preview has consistent styling. This function gathers both inline styles and linked stylesheets, concatenating their outer HTML into a single string that can be injected into the print preview document.

**Kind**: global function  
**Returns**: <code>string</code> - A concatenated string of all styles from the current document, used for ensuring consistent styling in the print preview.  
<a name="PreviewResumeModal"></a>

## PreviewResumeModal(props) ⇒ <code>JSX.Element</code>
Modal component for previewing the resume with print and download options.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The rendered modal component.  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The properties object. |
| props.open | <code>boolean</code> | Whether the modal is open. |
| props.onClose | <code>function</code> | Function to call when the modal is closed. |
| props.title | <code>string</code> | The title of the resume. |
| props.subtitle | <code>string</code> | The subtitle of the resume. |
| props.pdfHref | <code>string</code> | The URL of the PDF version of the resume. |
| props.downloadName | <code>string</code> | The name for the downloaded PDF file. |
| props.children | <code>React.ReactNode</code> | The content of the modal. |

<a name="ResumePreviewTrigger"></a>

## ResumePreviewTrigger(props) ⇒ <code>JSX.Element</code>
Component that triggers the resume preview modal.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - The rendered trigger component.  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The properties object. |
| props.buttonText | <code>string</code> | The text for the trigger button. |
| props.title | <code>string</code> | The title of the resume preview. |
| props.subtitle | <code>string</code> | The subtitle of the resume preview. |
| props.resume | <code>Object</code> | The resume data object. |
| props.pdfHref | <code>string</code> | The URL of the PDF version of the resume. |
| props.downloadName | <code>string</code> | The name for the downloaded PDF file. |
| props.buttonClassName | <code>string</code> | Additional class names for the trigger button. |

<a name="InlineIcon"></a>

## InlineIcon(props) ⇒ <code>JSX.Element</code>
InlineIcon---------------------------------------------------------------------------Renders a lightweight, inline icon placeholder.This component is intentionally decoupled from any specific icon library.Styling and actual icon rendering should be handled via CSS or a higher-levelicon system.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> |  |
| props.name | <code>string</code> | Icon identifier used to construct CSS class names. |

<a name="renderNode"></a>

## renderNode(node, key) ⇒ <code>JSX.Element</code> \| <code>string</code> \| <code>null</code>
renderNode---------------------------------------------------------------------------Recursively renders a `RichTextNode` into a React element.Design notes:- Uses a single switch statement for explicit, readable control flow- Recursion allows arbitrarily deep nesting (lists, paragraphs, blockquotes)- Inline nodes return strings or inline elements- Block nodes return semantic container elements

**Kind**: global function  
**Returns**: <code>JSX.Element</code> \| <code>string</code> \| <code>null</code> - Rendered node output.  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>RichTextNode</code> | Rich text node to render. |
| key | <code>number</code> \| <code>string</code> | React key used when rendering collections. |

<a name="findFieldByNames"></a>

## findFieldByNames(fields, names) ⇒ <code>Object</code> \| <code>undefined</code>
Finds a form field configuration using one or more candidate names.

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>undefined</code> - Matching field config or undefined.  

| Param | Type | Description |
| --- | --- | --- |
| fields | <code>Array.&lt;{name: (string\|undefined)}&gt;</code> | Schema field list. |
| names | <code>Array.&lt;string&gt;</code> | Candidate field names in priority order. |

<a name="buildContactFormContent"></a>

## buildContactFormContent(schema) ⇒ <code>Object</code>
Derives presentational content for the contact form from content data.This keeps visual copy in CMS-like data while preserving this page's currentAPI payload contract (`name`, `email`, and `message`).

**Kind**: global function  
**Returns**: <code>Object</code> - Render-safe copy for form UI.  

| Param | Type | Description |
| --- | --- | --- |
| schema | <code>Object</code> | Contact form schema content. |

<a name="normalizeContactPayload"></a>

## normalizeContactPayload(data) ⇒ <code>Object</code>
Safely normalizes user-entered contact form values before transmission.

**Kind**: global function  
**Returns**: <code>Object</code> - Trimmed payload.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Raw form state. |

<a name="sendMessage"></a>

## sendMessage(data) ⇒ <code>Promise.&lt;{message: (string\|undefined), error: (string\|undefined)}&gt;</code>
Sends a contact form payload to the mail microservice.The request contract intentionally uses JSON because the server expects`express.json()` parsing on the `/api/contact` route.

**Kind**: global function  
**Returns**: <code>Promise.&lt;{message: (string\|undefined), error: (string\|undefined)}&gt;</code> - Parsed API payload.  
**Throws**:

- <code>Error</code> When the request fails or the API returns a non-OK response.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Raw form values. |

<a name="Docs"></a>

## Docs() ⇒ <code>JSX.Element</code>
Docs Page---------------------------------------------------------------------------Full-page documentation experience for project architecture, navigation,scripts, tests, and shared type systems.

**Kind**: global function  
**Component**:   
<a name="Hackathon"></a>

## Hackathon() ⇒ <code>JSX.Element</code>
Hackathon Page---------------------------------------------------------------------------Long-form narrative + technical breakdown of the Daimler hackathon project.The page is rendered from `hackathonData` for consistency with other pages.

**Kind**: global function  
**Component**:   
<a name="Home"></a>

## Home() ⇒ <code>JSX.Element</code>
Home Page---------------------------------------------------------------------------A data-driven landing page that gives recruiters and hiring managers ahigh-level map of the portfolio and clear CTAs into deeper pages.Content is rendered from `assets/data/pageMetas.js` and `assets/data/homeSections.js` so it can be updatedwithout touching layout code.

**Kind**: global function  
**Component**:   
<a name="NotFound"></a>

## NotFound() ⇒ <code>JSX.Element</code>
NotFound Component------------------------------------------------------------A polished 404 error page using RSuite components and thefrosted-glass UI system.Features:- Centered layout with FlexboxGrid- Frosted glass panel styling- Clear error messaging and recovery path- Accessible, keyboard-friendly navigation

**Kind**: global function  
**Component**:   
<a name="SideProjects"></a>

## SideProjects() ⇒ <code>JSX.Element</code>
SideProjects Page---------------------------------------------------------------------------Data-driven portfolio page showcasing personal projects.Renders `sideProjectsData` into consistent frosted UI sections.

**Kind**: global function  
**Component**:   
<a name="Smu"></a>

## Smu() ⇒ <code>JSX.Element</code>
SMU Page---------------------------------------------------------------------------Academic project showcase page.Uses the same section/block rendering system as professional work andside projects to keep UI and content structure consistent.

**Kind**: global function  
**Component**:   
<a name="run"></a>

## run()
Main execution function for building diagram assets.

**Kind**: global function  
<a name="addReactKeys"></a>

## addReactKeys(file, api) ⇒ <code>string</code>
Main codemod function that traverses the AST to find JSX elementsreturned from array `.map()` calls and adds missing `key` props.The function uses `jscodeshift` to manipulate the AST and applies the following logic:1. Identify `.map()` calls and their callback functions.2. For each JSX element returned from the callback, check if it already has a `key` prop.3. If not, attempt to add a `key` prop using the following priority:   a. If the callback has an item parameter (e.g., `item`), use `item.id` as the key.   b. If the callback has an index parameter (e.g., `index`), use the index as a fallback key.4. Skip any JSX elements that already have a `key` prop defined.

**Kind**: global function  
**Returns**: <code>string</code> - The transformed source code with added `key` props.  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>\*</code> | The file object provided by `jscodeshift`, containing the source code to be transformed. |
| api | <code>\*</code> | The `jscodeshift` API object, used for AST manipulation. |

<a name="fixJsdocImportTypes"></a>

## fixJsdocImportTypes(file, api) ⇒ <code>string</code>
Codemod function that rewrites unsupported JSDoc `import()` type references into plain type identifiers.

**Kind**: global function  
**Returns**: <code>string</code> - The transformed source code with fixed JSDoc import types.  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>\*</code> | The file object provided by `jscodeshift`, containing the source code to be transformed. |
| api | <code>\*</code> | The `jscodeshift` API object, used for AST manipulation. |

<a name="fixRichText"></a>

## fixRichText(nodes) ⇒ <code>Array</code>
Cleans and normalizes rich text nodes by trimming whitespace, removing empty text nodes, and merging adjacent text nodes.

**Kind**: global function  
**Returns**: <code>Array</code> - A new array of cleaned and normalized rich text nodes.  

| Param | Type | Description |
| --- | --- | --- |
| nodes | <code>Array</code> | An array of rich text nodes to be processed. |

**Example**  
```jsconst input = [ { type: "text", text: "  Hello " }, { type: "text", text: "World  " }, { type: "text", text: "   " }, { type: "element", children: [   { type: "text", text: "  Nested " },   { type: "text", text: "Text  " } ]}];const output = fixRichText(input);console.log(output);// Output:// [//   { type: "text", text: "Hello World" },//   { type: "element", children: [//     { type: "text", text: "Nested Text" }//   ] }// ]```
<a name="fixUnusedMapIndex"></a>

## fixUnusedMapIndex(file, api) ⇒ <code>string</code>
Main codemod function that traverses the AST to find `.map()` calls and renames unused index parameters to `_index`.The function uses `jscodeshift` to manipulate the AST and applies the following logic:1. Identify `.map()` calls and their callback functions.2. Check if the callback has at least two parameters (item and index).3. Verify that the second parameter (index) is an Identifier.4. Traverse the callback body to check if the index parameter is referenced.5. If the index parameter is not used, rename it to `_index`.

**Kind**: global function  
**Returns**: <code>string</code> - Updated source code after codemod transformations.  

| Param | Type |
| --- | --- |
| file | <code>\*</code> | 
| api | <code>\*</code> | 

<a name="needsRgbCompanion"></a>

## needsRgbCompanion()
Returns true only when a token's value is a raw (non-var) color literal.Tokens that compose via var() don't need their own -rgb companion becausethe base palette token they reference already provides one.Values like box-shadows, borders, and gradients that *contain* a colorexpression are not "color tokens" — the value must start with a colorfunction or hex literal to qualify.

**Kind**: global function  
<a name="stripInit"></a>

## stripInit()
Removes the Mermaid init block for structural validation only.

**Kind**: global function  
<a name="extractSources"></a>

## extractSources()
Extracts all Mermaid source strings from a diagram block.

**Kind**: global function  
<a name="lintDiagram"></a>

## lintDiagram()
Performs structural validation on a single Mermaid diagram block.

**Kind**: global function  
<a name="lintDiagram..isCore"></a>

### lintDiagram~isCore
RULE: Diagram type validation (hybrid strict).

**Kind**: inner constant of [<code>lintDiagram</code>](#lintDiagram)  
<a name="run"></a>

## run()
ENTRYPOINT BEHAVIOR

**Kind**: global function  
<a name="normalizeMermaidSource"></a>

## normalizeMermaidSource(source) ⇒ <code>string</code>
Normalizes Mermaid diagram source for consistent linting.This function ensures:- Proper newline after init block- Blank line after diagram declaration- Consistent line endings- Trims leading whitespaceThis is a best-effort normalization to improve linting consistency.It does NOT attempt to fully parse or validate Mermaid syntax.It simply applies common formatting fixes to reduce false positives in linters.

**Kind**: global function  
**Returns**: <code>string</code> - The normalized Mermaid diagram source string.  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> | The raw Mermaid diagram source string. |

**Example**  
```jsconst source = `%%{init: {"theme": "dark"}}%%graph TDA --> B`;const normalized = normalizeMermaidSource(source);console.log(normalized);// Output:// %%{init: {"theme": "dark"}}%%// graph TD// A --> B```
<a name="normalizeDiagrams"></a>

## normalizeDiagrams(input) ⇒ <code>array</code>
Normalizes a diagram collection into a consistent array format.Supports both object maps and legacy arrays. Applies Mermaid source normalization.This function is designed to be flexible and forgiving, allowing for various input shapes while ensuring a predictable output structure for downstream processing.

**Kind**: global function  
**Returns**: <code>array</code> - An array of normalized diagram entries, each with a consistent structure.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>object</code> \| <code>array</code> | The raw diagram collection, either as an object map or an array. |

**Example**  
```js// Object map inputconst diagramsMap = {"diagram1": { diagram: "graph TD\nA --> B" },"diagram2": { diagram: "graph LR\nC --> D" }};const normalizedFromMap = normalizeDiagrams(diagramsMap);console.log(normalizedFromMap);// Output:// [//   { key: "diagram1", diagram: "graph TD\nA --> B" },//   { key: "diagram2", diagram: "graph LR\nC --> D" }// ]// Array input```
<a name="normalizeMermaidSource"></a>

## normalizeMermaidSource(source) ⇒ <code>string</code>
Normalizes a Mermaid diagram source string by removing init blocks,normalizing line endings, and trimming leading whitespace.

**Kind**: global function  
**Returns**: <code>string</code> - The normalized Mermaid diagram source string.  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> | The Mermaid diagram source string. |

**Example**  
```jsconst source = `%%{init: {"theme": "dark"}}%%graph TDA --> B`;const normalized = normalizeMermaidSource(source);console.log(normalized);// Output:// graph TD// A --> B```
<a name="render"></a>

## render()
Renders all Mermaid diagram blocks to PNG images.Execution flow:1. Ensure output directory exists2. Launch headless Chromium3. Load Mermaid in an isolated HTML shell4. Inject diagram source one at a time5. Screenshot rendered output6. Close browserThis function is intentionally sequential to:- Avoid race conditions in Mermaid rendering- Prevent memory pressure from concurrent pages

**Kind**: global function  
**Throws**:

- <code>Error</code> If Playwright fails to launch or rendering fails.

<a name="validateRichText"></a>

## validateRichText(nodes) ⇒ <code>Array</code>
Validates an array of rich text nodes against expected structure and content rules.Validation rules include:- Node types must be recognized and allowed- <li> elements must be properly nested inside <ul> or <ol>- <a> elements must include an href attribute- <p> elements should not exceed 600 characters of combined text content- Single <p> blocks are discouraged (but not disallowed)

**Kind**: global function  
**Returns**: <code>Array</code> - Array of validation issues.Each issue is an object with the following shape:{  ruleId: string, // Unique identifier for the validation rule  level: "error" | "warn", // Severity level of the issue  path: string, // Path to the node in the tree  message: string // Human-readable description of the issue}  

| Param | Type | Description |
| --- | --- | --- |
| nodes | <code>Array</code> | Array of rich text nodes to validate. |

<a name="flattenText"></a>

## flattenText(children) ⇒ <code>string</code>
Recursively concatenates text content from a node's children.This is used to calculate the total text length of a <p> block for validation.

**Kind**: global function  
**Returns**: <code>string</code> - Combined text content from all descendant <text> nodes.Note: This function ignores non-text nodes and does not include whitespace from element nodes.  

| Param | Type | Description |
| --- | --- | --- |
| children | <code>Array</code> | Array of child nodes to flatten. |

<a name="FormFieldOption"></a>

## FormFieldOption : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>string</code> |  | Human-readable option label. |
| value | <code>\*</code> |  | Stored value for the option. |
| [disabled] | <code>boolean</code> | <code>false</code> | Whether this option is disabled. |

<a name="InputGroupConfig"></a>

## InputGroupConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [prefix] | <code>string</code> | Optional leading addon text. |
| [suffix] | <code>string</code> | Optional trailing addon text. |

<a name="FormFieldConfig"></a>

## FormFieldConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Unique field name. Supports nested paths like `contact.email`. |
| type | <code>string</code> |  | Field type. Prefer values from FIELD_TYPES. |
| [label] | <code>string</code> |  | Visible label for the field. |
| [helpText] | <code>string</code> |  | Optional helper copy shown below the field. |
| [placeholder] | <code>string</code> |  | Placeholder text when supported. |
| [defaultValue] | <code>\*</code> |  | Initial field value. |
| [options] | [<code>Array.&lt;FormFieldOption&gt;</code>](#FormFieldOption) |  | Option data for select, checkboxGroup, and radioGroup. |
| [required] | <code>boolean</code> | <code>false</code> | Whether the field is required in the UI layer. |
| [disabled] | <code>boolean</code> | <code>false</code> | Whether the field is disabled. |
| [readOnly] | <code>boolean</code> | <code>false</code> | Whether the field is read-only. |
| [hidden] | <code>boolean</code> | <code>false</code> | Whether the field is hidden. |
| [block] | <code>boolean</code> | <code>true</code> | Whether picker-like controls should span full width. |
| [componentProps] | <code>Object</code> |  | Props forwarded to the underlying RSuite control. |
| [rule] | <code>Object</code> |  | Optional RSuite field-level validation rule. |
| [errorPlacement] | <code>string</code> | <code>&quot;\&quot;bottomStart\&quot;&quot;</code> | Error placement for Form.Control. |
| [shouldResetWithUnmount] | <code>boolean</code> | <code>false</code> | Clear value if field unmounts conditionally. |
| [inputGroup] | [<code>InputGroupConfig</code>](#InputGroupConfig) |  | Prefix/suffix config for inputGroupText fields. |
| [renderWhen] | <code>function</code> |  | Conditional render predicate. |

<a name="FormBlockSchema"></a>

## FormBlockSchema : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>string</code> |  | Stable schema id. |
| [title] | <code>string</code> |  | Optional panel title. |
| [submitLabel] | <code>string</code> | <code>&quot;\&quot;Submit\&quot;&quot;</code> | Submit button label. |
| [resetLabel] | <code>string</code> |  | Optional reset button label. |
| fields | [<code>Array.&lt;FormFieldConfig&gt;</code>](#FormFieldConfig) |  | Array of field configuration objects. |
| [initialValues] | <code>Object</code> |  | Optional initial form value override. |

<a name="BreakpointState"></a>

## BreakpointState : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| breakpoint | <code>string</code> | The current breakpoint ("mobile", "tablet", "desktop") |
| orientation | <code>string</code> | The current orientation ("portrait", "landscape") |
| isMobile | <code>boolean</code> | True if the current breakpoint is "mobile" |
| isTablet | <code>boolean</code> | True if the current breakpoint is "tablet" |
| isDesktop | <code>boolean</code> | True if the current breakpoint is "desktop" |
| isPortrait | <code>boolean</code> | True if the current orientation is "portrait" |
| isLandscape | <code>boolean</code> | True if the current orientation is "landscape" |

<a name="ResponsiveValues"></a>

## ResponsiveValues : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [mobile] | <code>\*</code> | Value returned when mobile breakpoint is active. |
| [tablet] | <code>\*</code> | Value returned when tablet breakpoint is active. |
| [desktop] | <code>\*</code> | Value returned when desktop breakpoint is active. |

<a name="architectureDiagram"></a>

## architectureDiagram ⇒ <code>string</code>
- Custom diagram builder for layered architecture diagrams with built-in validation and styling conventions. This function abstracts the complexity of Mermaid syntax while enforcing a consistent structure and visual language for architecture diagrams, making it easier to create clear and maintainable architectural visuals.Key features:- Layered structure with subgraphs for clear separation of concerns- Class assignment for consistent styling of components, datastores, and external systems- Edge validation to ensure all connections reference valid nodesEnforces:- Subgraph per layer- Class assignment per layer- Datastore formatting- Deterministic structure

**Kind**: global typedef  
**Returns**: <code>string</code> - Mermaid diagram string  
**Throws**:

- Will throw an error if the configuration is invalid (e.g., missing node ids, duplicate ids, edges referencing unknown nodes).
- Will throw an error if the configuration is invalid (e.g., missing node ids, duplicate ids, edges referencing unknown nodes).

**Satisfies**: <code>function(string, object): string</code>  

| Param | Type | Description |
| --- | --- | --- |
| init | <code>string</code> | Mermaid init block |
| config | <code>Object</code> | Architecture configuration |

**Example**  
```js
Given the following configuration:const config = {layers: [ {  key: "application", label: "Application Layer", className: "layerApplication", nodes: [   { id: "AppState", label: "Central State Store", type: "datastore" },],},{ key: "presentation",label: "Presentation Layer",className: "layerPresentation",nodes: [ { id: "ChartUI", label: "Chart Interface" }, { id: "MemeUI", label: "Meme Generator" },],},],edges: [ { from: "AppState", to: "ChartUI" }, { from: "MemeUI", to: "AppState" },],};Calling `architectureDiagram("", config)` will produce a Mermaid diagram string that represents the defined architecture, with "AppState" as a datastore in the Application Layer, "ChartUI" and "MemeUI" as components in the Presentation Layer, and edges connecting them according to the specified relationships. The diagram will include appropriate class definitions for styling and will be formatted for rendering in a Mermaid-compatible environment.The output will be a Mermaid diagram string representing the defined architecture, with appropriate subgraphs, classes, and edges, ready for rendering in a Mermaid-compatible environment.
```
<a name="DiagramDefinition"></a>

## DiagramDefinition : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique diagram identifier |
| type | <code>string</code> | Diagram block type (e.g. "diagram") Optional properties for architecture diagrams: |
| architecture | <code>object</code> | Architecture config for auto-generating diagrams |
| architecture.direction | <code>string</code> | Default diagram direction (e.g. "LR", "TB") |
| architecture.layers | <code>Array.&lt;object&gt;</code> | Diagram layers with nodes |
| architecture.edges | <code>Array.&lt;object&gt;</code> | Connections between nodes |
| architecture.mobile | <code>object</code> | Optional mobile-specific overrides |

