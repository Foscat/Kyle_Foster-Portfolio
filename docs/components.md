## Modules

<dl>
<dt><a href="#src\components\features\AccessibilityMenu\AccessibilityMenu.module_test">src\components\features\AccessibilityMenu\AccessibilityMenu.test</a></dt>
<dd><p>src\components\features\AccessibilityMenu\AccessibilityMenu.test module.</p>
</dd>
<dt><a href="#module_components/features/AccessibilityMenu">components/features/AccessibilityMenu</a></dt>
<dd><p>Accessibility preferences modal for toggling motion, contrast,
text size, and keyboard guidance with persisted client-side settings.</p>
</dd>
<dt><a href="#module_components/PaletteToggle">components/PaletteToggle</a></dt>
<dd><p>In-app color palette selector for switching between supported
palette themes.</p>
</dd>
<dt><a href="#src\components\features\PaletteToggle\PaletteToggle.module_test">src\components\features\PaletteToggle\PaletteToggle.test</a></dt>
<dd><p>src\components\features\PaletteToggle\PaletteToggle.test module.</p>
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
<dt><a href="#module_src\components\features\ResumePreview\ResumePreviewTrigger">src\components\features\ResumePreview\ResumePreviewTrigger</a></dt>
<dd><p>src\components\features\ResumePreview\ResumePreviewTrigger module.</p>
</dd>
<dt><a href="#module_components/ThemeToggle">components/ThemeToggle</a></dt>
<dd><p>Compact theme selection control for switching between
light and dark application themes.</p>
</dd>
<dt><a href="#src\components\features\ThemeToggle\ThemeToggle.module_test">src\components\features\ThemeToggle\ThemeToggle.test</a></dt>
<dd><p>src\components\features\ThemeToggle\ThemeToggle.test module.</p>
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
<dt><a href="#module_src\components\layout\InfoSection\index">src\components\layout\InfoSection\index</a></dt>
<dd><p>src\components\layout\InfoSection\index module.</p>
</dd>
<dt><a href="#module_components/layout/InfoSection">components/layout/InfoSection</a></dt>
<dd><p>Reusable frosted-glass section wrapper used to standardize
layout, spacing, and visual hierarchy across the portfolio.</p>
</dd>
<dt><a href="#src\components\layout\InfoSection\InfoSection.module_test">src\components\layout\InfoSection\InfoSection.test</a></dt>
<dd><p>src\components\layout\InfoSection\InfoSection.test module.</p>
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
<dt><a href="#module_src\components\layout\PageHeader\index">src\components\layout\PageHeader\index</a></dt>
<dd><p>src\components\layout\PageHeader\index module.</p>
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
<dt><a href="#src\components\navigation\StickySectionNav\StickySectionNav.module_test">src\components\navigation\StickySectionNav\StickySectionNav.test</a></dt>
<dd><p>src\components\navigation\StickySectionNav\StickySectionNav.test module.</p>
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
<dt><a href="#module_src\components\renderers\blocks\CardGridBlock\index">src\components\renderers\blocks\CardGridBlock\index</a></dt>
<dd><p>src\components\renderers\blocks\CardGridBlock\index module.</p>
</dd>
<dt><a href="#module_components/renderers/blocks/CardGridBlock">components/renderers/blocks/CardGridBlock</a></dt>
<dd><p>A block component for displaying a grid of InsightCards. It takes a block object containing the title, number of columns, and an array of items to be displayed as cards. Each item should have properties such as title, icon, subtitle, variant (accent color), and content.</p>
</dd>
<dt><a href="#module_src\components\renderers\blocks\FormBlock\fieldRegestry">src\components\renderers\blocks\FormBlock\fieldRegestry</a></dt>
<dd><p>src\components\renderers\blocks\FormBlock\fieldRegestry module.</p>
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
<dt><a href="#module_src\components\renderers\blocks\HeroBlock\index">src\components\renderers\blocks\HeroBlock\index</a></dt>
<dd><p>src\components\renderers\blocks\HeroBlock\index module.</p>
</dd>
<dt><a href="#module_components/PageHeader">components/PageHeader</a></dt>
<dd><p>Standardized page-level header component used to introduce
pages and major sections with consistent hierarchy and styling.</p>
</dd>
<dt><a href="#src\components\renderers\blocks\ImageGalleryBlock\ImageGalleryBlock.module_test">src\components\renderers\blocks\ImageGalleryBlock\ImageGalleryBlock.test</a></dt>
<dd><p>src\components\renderers\blocks\ImageGalleryBlock\ImageGalleryBlock.test module.</p>
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
<dt><a href="#module_src\components\renderers\blocks\ImageGalleryBlock\index">src\components\renderers\blocks\ImageGalleryBlock\index</a></dt>
<dd><p>src\components\renderers\blocks\ImageGalleryBlock\index module.</p>
</dd>
<dt><a href="#module_src/components/renderers/blocks/ImageGalleryBlock">src/components/renderers/blocks/ImageGalleryBlock</a></dt>
<dd><p>Renders a responsive image gallery inside a collapsible,
frosted-style panel.</p>
</dd>
<dt><a href="#module_src\components\renderers\blocks\LinksBlock\index">src\components\renderers\blocks\LinksBlock\index</a></dt>
<dd><p>src\components\renderers\blocks\LinksBlock\index module.</p>
</dd>
<dt><a href="#module_components/renderers/blocks/LinksBlock">components/renderers/blocks/LinksBlock</a></dt>
<dd><p>Renders a list of link buttons inside a collapsible frosted panel.This component is designed to be used as a block renderer within the section
content system. It takes a list of link definitions and renders them as styled buttons
with appropriate attributes for external links, downloads, and accessibility.</p>
</dd>
<dt><a href="#src\components\renderers\blocks\LinksBlock\LinksBlock.module_test">src\components\renderers\blocks\LinksBlock\LinksBlock.test</a></dt>
<dd><p>src\components\renderers\blocks\LinksBlock\LinksBlock.test module.</p>
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
<dt><a href="#src\components\renderers\blocks\MarkdownDocs.module_Block\index">src\components\renderers\blocks\MarkdownDocs.Block\index</a></dt>
<dd><p>src\components\renderers\blocks\MarkdownDocs.Block\index module.</p>
</dd>
<dt><a href="#module_src\components\renderers\blocks\RichTextBlock\index">src\components\renderers\blocks\RichTextBlock\index</a></dt>
<dd><p>src\components\renderers\blocks\RichTextBlock\index module.</p>
</dd>
<dt><a href="#module_components/blocks/RichTextBlock">components/blocks/RichTextBlock</a></dt>
<dd><p>Renders a collapsible frosted panel containing one or more
paragraphs of rich text content.</p>
</dd>
<dt><a href="#src\components\renderers\blocks\RichTextBlock\RichTextBlock.module_test">src\components\renderers\blocks\RichTextBlock\RichTextBlock.test</a></dt>
<dd><p>src\components\renderers\blocks\RichTextBlock\RichTextBlock.test module.</p>
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
<dt><a href="#module_src\components\renderers\index">src\components\renderers\index</a></dt>
<dd><p>src\components\renderers\index module.</p>
</dd>
<dt><a href="#module_src\components\renderers\MarkdownRenderer\index">src\components\renderers\MarkdownRenderer\index</a></dt>
<dd><p>src\components\renderers\MarkdownRenderer\index module.</p>
</dd>
<dt><a href="#module_src\components\renderers\RichText\index">src\components\renderers\RichText\index</a></dt>
<dd><p>src\components\renderers\RichText\index module.</p>
</dd>
<dt><a href="#module_components/RichText">components/RichText</a></dt>
<dd><p>Renders rich text content which may include plain strings, arrays,</p>
</dd>
<dt><a href="#module_src\components\renderers\RichText\renderNode">src\components\renderers\RichText\renderNode</a></dt>
<dd><p>src\components\renderers\RichText\renderNode module.</p>
</dd>
<dt><a href="#module_components/renderers/RichText/renderNode">components/renderers/RichText/renderNode</a></dt>
<dd><p>Tests for the renderNode function, ensuring it correctly renders various node types such as text, links, lists, code blocks, and inline icons, and handles unknown or null nodes gracefully without throwing errors.</p>
</dd>
<dt><a href="#module_src\components\renderers\SectionRenderer\index">src\components\renderers\SectionRenderer\index</a></dt>
<dd><p>src\components\renderers\SectionRenderer\index module.</p>
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
<dt><a href="#module_src\components\ui\AccordionList\index">src\components\ui\AccordionList\index</a></dt>
<dd><p>src\components\ui\AccordionList\index module.</p>
</dd>
<dt><a href="#module_components/AccordionList">components/AccordionList</a></dt>
<dd><p>Fully accessible, keyboard-navigable accordion and section
navigation component with frosted-glass styling.</p>
</dd>
<dt><a href="#src\components\ui\Btn\Btn.module_test">src\components\ui\Btn\Btn.test</a></dt>
<dd><p>src\components\ui\Btn\Btn.test module.</p>
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
<dt><a href="#src\components\ui\FrostedIcon\FrostedIcon.module_test">src\components\ui\FrostedIcon\FrostedIcon.test</a></dt>
<dd><p>src\components\ui\FrostedIcon\FrostedIcon.test module.</p>
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
<dt><a href="#module_src\components\ui\InsightCard\index">src\components\ui\InsightCard\index</a></dt>
<dd><p>src\components\ui\InsightCard\index module.</p>
</dd>
<dt><a href="#module_components/ui/InsightCard">components/ui/InsightCard</a></dt>
<dd><p>InsightCard and CardGrid components for displaying key insights in a visually engaging card format.</p>
</dd>
<dt><a href="#module_src\components\ui\MermaidDiagram\index">src\components\ui\MermaidDiagram\index</a></dt>
<dd><p>src\components\ui\MermaidDiagram\index module.</p>
</dd>
<dt><a href="#module_components/MermaidDiagram">components/MermaidDiagram</a></dt>
<dd><p>Fully featured Mermaid diagram renderer with dark/light theme support, responsive SVG layout, accessible container, optional description, and PNG export capability. The component normalizes props to support both legacy and new diagram configurations, allowing for flexible integration while maintaining a consistent internal state structure for rendering.</p>
</dd>
<dt><a href="#src\components\ui\MermaidDiagram\paletteTransform.module_test">src\components\ui\MermaidDiagram\paletteTransform.test</a></dt>
<dd><p>src\components\ui\MermaidDiagram\paletteTransform.test module.</p>
</dd>
<dt><a href="#module_src\components\ui\ProjectCard\index">src\components\ui\ProjectCard\index</a></dt>
<dd><p>src\components\ui\ProjectCard\index module.</p>
</dd>
<dt><a href="#module_components/ProjectCard">components/ProjectCard</a></dt>
<dd><p>Reusable frosted-glass project display card used to present
portfolio projects with images, repository links, and live URLs.</p>
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
</dl>

## Functions

<dl>
<dt><a href="#collectDocumentStyles">collectDocumentStyles()</a> ⇒ <code>string</code></dt>
<dd><p>Collects all styles from the current document to ensure that the print preview has consistent styling. This function gathers both inline styles and linked stylesheets, concatenating their outer HTML into a single string that can be injected into the print preview document.</p>
</dd>
<dt><a href="#PreviewResumeModal">PreviewResumeModal(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Modal component for previewing the resume with print and download options.</p>
</dd>
</dl>

<a name="src\components\features\AccessibilityMenu\AccessibilityMenu.module_test"></a>

## src\components\features\AccessibilityMenu\AccessibilityMenu.test
src\components\features\AccessibilityMenu\AccessibilityMenu.test module.

<a name="module_components/features/AccessibilityMenu"></a>

## components/features/AccessibilityMenu
Accessibility preferences modal for toggling motion, contrast,text size, and keyboard guidance with persisted client-side settings.

<a name="module_components/PaletteToggle"></a>

## components/PaletteToggle
In-app color palette selector for switching between supportedpalette themes.

<a name="module_components/PaletteToggle..PaletteToggle"></a>

### components/PaletteToggle~PaletteToggle(props) ⇒ <code>JSX.Element</code>
PaletteToggle------------------------------------------------------------------Compact select control for switching app-level color palettes.

**Kind**: inner method of [<code>components/PaletteToggle</code>](#module_components/PaletteToggle)  
**Access**: public  
**Component**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>Object</code> |  | Component props. |
| [props.size] | <code>Size</code> | <code>Size.MD</code> | Visual size of the select control. |
| [props.showLabel] | <code>boolean</code> | <code>true</code> | Whether to render a visible label. |
| [props.className] | <code>string</code> |  | Optional root className. |
| [props.labelText] | <code>string</code> | <code>&quot;\&quot;Palette\&quot;&quot;</code> | Visible label text. |
| [props.ariaLabel] | <code>string</code> | <code>&quot;\&quot;Color palette selector\&quot;&quot;</code> | Accessible label for select. |

<a name="src\components\features\PaletteToggle\PaletteToggle.module_test"></a>

## src\components\features\PaletteToggle\PaletteToggle.test
src\components\features\PaletteToggle\PaletteToggle.test module.

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

<a name="module_src\components\features\ResumePreview\ResumePreviewTrigger"></a>

## src\components\features\ResumePreview\ResumePreviewTrigger
src\components\features\ResumePreview\ResumePreviewTrigger module.

<a name="module_src\components\features\ResumePreview\ResumePreviewTrigger..ResumePreviewTrigger"></a>

### src\components\features\ResumePreview\ResumePreviewTrigger~ResumePreviewTrigger(props) ⇒ <code>JSX.Element</code>
Component that triggers the resume preview modal.

**Kind**: inner method of [<code>src\components\features\ResumePreview\ResumePreviewTrigger</code>](#module_src\components\features\ResumePreview\ResumePreviewTrigger)  
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

<a name="src\components\features\ThemeToggle\ThemeToggle.module_test"></a>

## src\components\features\ThemeToggle\ThemeToggle.test
src\components\features\ThemeToggle\ThemeToggle.test module.

<a name="module_tests/components/ThemeToggle"></a>

## tests/components/ThemeToggle
Unit tests for the ThemeToggle component.Testing focus:- Rendering of both light and dark theme toggle buttons- Theme state transitions when toggles are activated- Presence of accessible button labelsTesting philosophy:- Verifies observable behavior only- Avoids asserting internal DOM structure or RSuite implementation details- Treats theme state as a global side effect via `data-theme`

<a name="module_src\components\layout\InfoSection\index"></a>

## src\components\layout\InfoSection\index
src\components\layout\InfoSection\index module.

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

<a name="src\components\layout\InfoSection\InfoSection.module_test"></a>

## src\components\layout\InfoSection\InfoSection.test
src\components\layout\InfoSection\InfoSection.test module.

<a name="module_tests/components/InfoSection"></a>

## tests/components/InfoSection
Unit tests for the InfoSection layout component.Testing focus:- Correct semantic wrapper element (`section`)- Proper application of root classes and IDs- Conditional rendering of title, subtitle, and icon- Transparent rendering of child contentTesting strategy:- Mocks RSuite Panel to reduce surface area and DOM complexity- Mocks FrostedIcon to avoid FontAwesome rendering concerns- Focuses on layout and composition, not styling details

<a name="module_src\components\layout\PageHeader\index"></a>

## src\components\layout\PageHeader\index
src\components\layout\PageHeader\index module.

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
Current year used for copyright display. Computed at render time to avoid manual updates. /

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
<a name="src\components\navigation\StickySectionNav\StickySectionNav.module_test"></a>

## src\components\navigation\StickySectionNav\StickySectionNav.test
src\components\navigation\StickySectionNav\StickySectionNav.test module.

<a name="module_tests/components/StickySectionNav"></a>

## tests/components/StickySectionNav
Unit tests for the StickySectionNav component.Test coverage:- Rendering of section navigation links- Active section highlighting via `aria-current="location"`- History hash updates on navigation- Programmatic scroll coordination with scroll-spy logicTesting strategy:- Mocks `useScrollSpyWithHistory` to control active section state- Mocks `window.scrollTo` to prevent actual scrolling- Uses real DOM nodes to simulate anchor targetsArchitectural intent:StickySectionNav is an **intra-page navigation controller**.Tests focus on:- Accessibility semantics- Navigation side effects (history + scroll)- Integration boundaries with the scroll-spy hook


* [tests/components/StickySectionNav](#module_tests/components/StickySectionNav)
    * [~s1](#module_tests/components/StickySectionNav..s1)
    * [~markProgrammaticScroll](#module_tests/components/StickySectionNav..markProgrammaticScroll)

<a name="module_tests/components/StickySectionNav..s1"></a>

### tests/components/StickySectionNav~s1
Ensure target section elements exist in the DOM so scroll and offset calculations can resolve correctly. /

**Kind**: inner property of [<code>tests/components/StickySectionNav</code>](#module_tests/components/StickySectionNav)  
<a name="module_tests/components/StickySectionNav..markProgrammaticScroll"></a>

### tests/components/StickySectionNav~markProgrammaticScroll
Mock scroll-spy hook to control active section state and observe programmatic scroll suppression behavior. /

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
<a name="module_src\components\renderers\blocks\CardGridBlock\index"></a>

## src\components\renderers\blocks\CardGridBlock\index
src\components\renderers\blocks\CardGridBlock\index module.

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
<a name="module_src\components\renderers\blocks\FormBlock\fieldRegestry"></a>

## src\components\renderers\blocks\FormBlock\fieldRegestry
src\components\renderers\blocks\FormBlock\fieldRegestry module.

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
<a name="module_src\components\renderers\blocks\HeroBlock\index"></a>

## src\components\renderers\blocks\HeroBlock\index
src\components\renderers\blocks\HeroBlock\index module.

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

<a name="src\components\renderers\blocks\ImageGalleryBlock\ImageGalleryBlock.module_test"></a>

## src\components\renderers\blocks\ImageGalleryBlock\ImageGalleryBlock.test
src\components\renderers\blocks\ImageGalleryBlock\ImageGalleryBlock.test module.

<a name="module_tests/components/blocks/ImageGalleryBlock"></a>

## tests/components/blocks/ImageGalleryBlock
Unit tests for the ImageGalleryBlock component.Testing focus:- Defensive rendering behavior when image data is missing or invalid- Basic thumbnail rendering with correct accessibility attributesDesign intent:This block is intentionally simple and defensive. Tests verify that:- The component fails silently when no images are provided- Valid image data renders accessible `<img>` elements

<a name="module_src\components\renderers\blocks\ImageGalleryBlock\index"></a>

## src\components\renderers\blocks\ImageGalleryBlock\index
src\components\renderers\blocks\ImageGalleryBlock\index module.

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
<a name="module_src\components\renderers\blocks\LinksBlock\index"></a>

## src\components\renderers\blocks\LinksBlock\index
src\components\renderers\blocks\LinksBlock\index module.

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
<a name="src\components\renderers\blocks\LinksBlock\LinksBlock.module_test"></a>

## src\components\renderers\blocks\LinksBlock\LinksBlock.test
src\components\renderers\blocks\LinksBlock\LinksBlock.test module.

<a name="module_tests/components/blocks/LinksBlock"></a>

## tests/components/blocks/LinksBlock
Unit tests for the LinksBlock component.Testing focus:- Defensive rendering behavior when link data is missing- Correct rendering of anchor elements with expected attributesDesign intent:LinksBlock is intentionally minimal and data-driven.These tests ensure it:- Fails silently when provided with invalid input- Renders accessible anchor elements when valid data is supplied

<a name="src\components\renderers\blocks\MarkdownDocs.module_Block\index"></a>

## src\components\renderers\blocks\MarkdownDocs.Block\index
src\components\renderers\blocks\MarkdownDocs.Block\index module.

<a name="module_src\components\renderers\blocks\RichTextBlock\index"></a>

## src\components\renderers\blocks\RichTextBlock\index
src\components\renderers\blocks\RichTextBlock\index module.

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

<a name="src\components\renderers\blocks\RichTextBlock\RichTextBlock.module_test"></a>

## src\components\renderers\blocks\RichTextBlock\RichTextBlock.test
src\components\renderers\blocks\RichTextBlock\RichTextBlock.test module.

<a name="module_tests/components/blocks/RichTextBlock"></a>

## tests/components/blocks/RichTextBlock
Unit tests for the RichTextBlock component.Testing focus:- Defensive rendering behavior when content is missing or invalid- Correct rendering of markdown content into semantic HTMLDesign intent:RichTextBlock is expected to be tolerant of missing data while stillcorrectly rendering valid markdown input.

<a name="module_src\components\renderers\index"></a>

## src\components\renderers\index
src\components\renderers\index module.

<a name="module_src\components\renderers\index..LazyDisplay"></a>

### src\components\renderers\index~LazyDisplay ⇒ <code>JSX.Element</code>
A simple component to display a loading message and an optional icon while a lazy-loaded component is being fetched.

**Kind**: inner property of [<code>src\components\renderers\index</code>](#module_src\components\renderers\index)  
**Returns**: <code>JSX.Element</code> - Rendered loading placeholder.  

| Param | Type | Description |
| --- | --- | --- |
| loadingMessage | <code>string</code> | The message to display while loading. Defaults to "Loading...". |
| icon | <code>string</code> | An optional FontAwesome icon class to display above the loading message. |
| iconSpin | <code>boolean</code> | If true, the icon will have the "fa-spin" class applied for animation. |

<a name="module_src\components\renderers\MarkdownRenderer\index"></a>

## src\components\renderers\MarkdownRenderer\index
src\components\renderers\MarkdownRenderer\index module.

<a name="module_src\components\renderers\RichText\index"></a>

## src\components\renderers\RichText\index
src\components\renderers\RichText\index module.

<a name="module_components/RichText"></a>

## components/RichText
Renders rich text content which may include plain strings, arrays,

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
<a name="module_src\components\renderers\RichText\renderNode"></a>

## src\components\renderers\RichText\renderNode
src\components\renderers\RichText\renderNode module.


* [src\components\renderers\RichText\renderNode](#module_src\components\renderers\RichText\renderNode)
    * [~InlineIcon(props)](#module_src\components\renderers\RichText\renderNode..InlineIcon) ⇒ <code>JSX.Element</code>
    * [~renderNode(node, key)](#module_src\components\renderers\RichText\renderNode..renderNode) ⇒ <code>JSX.Element</code> \| <code>string</code> \| <code>null</code>

<a name="module_src\components\renderers\RichText\renderNode..InlineIcon"></a>

### src\components\renderers\RichText\renderNode~InlineIcon(props) ⇒ <code>JSX.Element</code>
InlineIcon---------------------------------------------------------------------------Renders a lightweight, inline icon placeholder.This component is intentionally decoupled from any specific icon library.Styling and actual icon rendering should be handled via CSS or a higher-levelicon system.

**Kind**: inner method of [<code>src\components\renderers\RichText\renderNode</code>](#module_src\components\renderers\RichText\renderNode)  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> |  |
| props.name | <code>string</code> | Icon identifier used to construct CSS class names. |

<a name="module_src\components\renderers\RichText\renderNode..renderNode"></a>

### src\components\renderers\RichText\renderNode~renderNode(node, key) ⇒ <code>JSX.Element</code> \| <code>string</code> \| <code>null</code>
renderNode---------------------------------------------------------------------------Recursively renders a `RichTextNode` into a React element.Design notes:- Uses a single switch statement for explicit, readable control flow- Recursion allows arbitrarily deep nesting (lists, paragraphs, blockquotes)- Inline nodes return strings or inline elements- Block nodes return semantic container elements

**Kind**: inner method of [<code>src\components\renderers\RichText\renderNode</code>](#module_src\components\renderers\RichText\renderNode)  
**Returns**: <code>JSX.Element</code> \| <code>string</code> \| <code>null</code> - Rendered node output.  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>RichTextNode</code> | Rich text node to render. |
| key | <code>number</code> \| <code>string</code> | React key used when rendering collections. |

<a name="module_components/renderers/RichText/renderNode"></a>

## components/renderers/RichText/renderNode
Tests for the renderNode function, ensuring it correctly renders various node types such as text, links, lists, code blocks, and inline icons, and handles unknown or null nodes gracefully without throwing errors.

<a name="module_src\components\renderers\SectionRenderer\index"></a>

## src\components\renderers\SectionRenderer\index
src\components\renderers\SectionRenderer\index module.

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
Registers the section for scroll tracking on mount and unregisters it on unmount. Enables: - Sticky section navigation - Active section highlighting - Programmatic scrolling /

**Kind**: inner constant of [<code>SectionRenderer</code>](#module_components/SectionRenderer..SectionRenderer)  
<a name="module_tests/components/SectionRenderer"></a>

## tests/components/SectionRenderer
Unit tests for the SectionRenderer component.Test coverage:- Section registry registration on mount- Section registry cleanup on unmount- Delegation to InfoSection for layout- Block-type dispatching to the correct child renderer- Defensive fallback rendering for unknown block typesTesting strategy:- Mocks all child renderers to isolate dispatch logic- Mocks SectionRegistry to observe registration side effects- Avoids testing block rendering internals (covered elsewhere)Architectural intent:SectionRenderer is treated as a **render orchestrator**, not acontent renderer. Tests focus on delegation, ordering, anddefensive behavior rather than DOM structure.

<a name="module_tests/components/AccordionList"></a>

## tests/components/AccordionList
Unit tests for the AccordionList component.Test coverage:- Basic rendering of panel and item titles- Accordion expand / collapse behavior- Keyboard interaction (Enter / Space)- Scroll-to-section behavior for `isScroller` items- Accessibility roles and screen-reader live region updatesTesting strategy:- Uses `renderWithProviders` to ensure context parity with the app- Uses `@testing-library/user-event` for realistic interaction simulation- Avoids testing implementation details; focuses on observable behavior

<a name="module_src\components\ui\AccordionList\index"></a>

## src\components\ui\AccordionList\index
src\components\ui\AccordionList\index module.

<a name="module_components/AccordionList"></a>

## components/AccordionList
Fully accessible, keyboard-navigable accordion and sectionnavigation component with frosted-glass styling.


* [components/AccordionList](#module_components/AccordionList)
    * [~AccordionList(props)](#module_components/AccordionList..AccordionList) ⇒ <code>JSX.Element</code>
        * [~focusHeader()](#module_components/AccordionList..AccordionList..focusHeader)
        * [~scrollTo()](#module_components/AccordionList..AccordionList..scrollTo)
        * [~togglePanel()](#module_components/AccordionList..AccordionList..togglePanel)
        * [~moveFocus()](#module_components/AccordionList..AccordionList..moveFocus)
        * [~moveAndOpen()](#module_components/AccordionList..AccordionList..moveAndOpen)
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
    * [~moveAndOpen()](#module_components/AccordionList..AccordionList..moveAndOpen)
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
<a name="module_components/AccordionList..AccordionList..moveAndOpen"></a>

#### AccordionList~moveAndOpen()
Move to adjacent accordion item and open exactly that item. This keeps arrow navigation deterministic and prevents skipping middle items during rapid key repeat. /

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

<a name="src\components\ui\Btn\Btn.module_test"></a>

## src\components\ui\Btn\Btn.test
src\components\ui\Btn\Btn.test module.

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
Resolve an accessible aria-label for the button. Falls back to tooltip text or a humanized icon name. /

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
A responsive image thumbnail that expands into a modal viewer when clicked. The modal maintains the image's aspect ratio and includes optional title and caption support. Designed with accessibility in mind, it requires alt text and applies appropriate aria-labels.Key behaviors:- Renders a responsive image thumbnail using RSuite's Image component- Clicking the thumbnail opens a modal viewer with a larger version of the image- The modal can be closed with the close button or pressing the ESC key- The expanded image supports zoom controls and drag-to-pan interaction- On mobile, title/caption details are hidden while zoomed to maximize viewing space- Both thumbnail and modal images are lazy-loaded for performance- The modal and image wrapper feature frosted glass styling consistent with the UI design system- On mobile portrait, wide images show a rotate/zoom guidance hintAccessibility:- Requires alt text for screen readers- Applies aria-label to both thumbnail and modal image

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
<a name="src\components\ui\FrostedIcon\FrostedIcon.module_test"></a>

## src\components\ui\FrostedIcon\FrostedIcon.test
src\components\ui\FrostedIcon\FrostedIcon.test module.

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

<a name="module_src\components\ui\InsightCard\index"></a>

## src\components\ui\InsightCard\index
src\components\ui\InsightCard\index module.

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
<a name="module_src\components\ui\MermaidDiagram\index"></a>

## src\components\ui\MermaidDiagram\index
src\components\ui\MermaidDiagram\index module.

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
<a name="src\components\ui\MermaidDiagram\paletteTransform.module_test"></a>

## src\components\ui\MermaidDiagram\paletteTransform.test
src\components\ui\MermaidDiagram\paletteTransform.test module.

<a name="module_src\components\ui\ProjectCard\index"></a>

## src\components\ui\ProjectCard\index
src\components\ui\ProjectCard\index module.

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

