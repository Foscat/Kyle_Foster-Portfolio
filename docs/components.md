# Feature Components

## src\\components\\features\\index

src\components\features\index module.

## components/features/AccessibilityMenu

Accessibility preferences modal for toggling motion, contrast,
text size, and keyboard guidance with persisted client-side settings.

### module.exports()

A menu component for managing accessibility preferences.

**Properties**

- `size` (`string`) - The size of the menu.
- `enableHotkey` (`boolean`) - Whether to enable the hotkey for opening the menu.
- `showTooltip` (`boolean`) - Whether to show tooltips for the menu items.

**Returns**

- `JSX.Element` - The rendered accessibility menu component.

## components/features/ColorMenu

Color preferences modal for theme mode, palette, and high
contrast controls.

### ColorSwitch

A custom switch component for toggling color preferences, with support for disabled state and ARIA labeling.

**Parameters**

- `props` (`Object`) - The props for the ColorSwitch component.
- `props.labelledBy` (`string`) - The ID of the element that labels the switch.
- `props.checked` (`boolean`) - Whether the switch is currently checked.
- `props.onChange` (`function`) - Callback function to handle switch state changes.
- `props.disabled` (`boolean`, optional, default: `false`) - Whether the switch is disabled.

**Returns**

- `JSX.Element` - The rendered ColorSwitch component.

### ColorPreferenceRow

A row component for displaying and managing color preferences, including high contrast mode.

**Parameters**

- `props` (`Object`) - The props for the ColorPreferenceRow component.
- `props.id` (`string`) - The ID for the row, used for ARIA labeling.
- `props.title` (`string`) - The title of the color preference.
- `props.description` (`string`) - A description of the color preference.
- `props.enabled` (`boolean`) - Whether the color preference is currently enabled.
- `props.systemValue` (`boolean`) - The system's current value for the color preference.
- `props.overrideValue` (`boolean | null`) - The user's override value for the color preference, or null if using system value.
- `props.onToggle` (`function`) - Callback function to handle toggling the color preference.
- `props.onUseSystem` (`function`) - Callback function to handle using the system value for the color preference.
- `props.disabled` (`boolean`, optional, default: `false`) - Whether the row is disabled.

**Returns**

- `JSX.Element` - The rendered ColorPreferenceRow component.

### ColorMenu

A component for managing color preferences, including high contrast mode.

**Parameters**

- `props` (`Object`) - The props for the ColorMenu component.
- `props.size` (`string`, optional, default: `Size.SM`) - The size of the color menu.
- `props.showTooltip` (`boolean`, optional, default: `true`) - Whether to show tooltips.

**Returns**

- `JSX.Element` - The rendered ColorMenu component.

## components/features/LayoutStyleToggle

Selector for switching layout-style-css spatial systems.

### LayoutStyleToggle()

Compact select control for layout-style-css spatial systems.

**Parameters**

- `props` (`Object`) - Component props.
- `props.size` (`Size`, optional, default: `Size.MD`) - Visual size of the select control.
- `props.showLabel` (`boolean`, optional, default: `true`) - Whether to render a visible label.
- `props.className` (`string`, optional) - Optional root className.
- `props.labelText` (`string`, optional, default: `"Layout Style"`) - Visible label text.
- `props.ariaLabel` (`string`, optional, default: `"Layout style selector"`) - Accessible select label.

**Returns**

- `JSX.Element` - Rendered layout style selector.

## components/PaletteToggle

In-app color palette selector for switching between supported
palette themes.

### PaletteToggle()

PaletteToggle
------------------------------------------------------------------
Compact select control for switching app-level color palettes.

**Parameters**

- `props` (`Object`) - Component props.
- `props.size` (`Size`, optional, default: `Size.MD`) - Visual size of the select control.
- `props.showLabel` (`boolean`, optional, default: `true`) - Whether to render a visible label.
- `props.className` (`string`, optional) - Optional root className.
- `props.labelText` (`string`, optional, default: `"Palette"`) - Visible label text.
- `props.ariaLabel` (`string`, optional, default: `"Color palette selector"`) - Accessible label for select.

**Returns**

- `JSX.Element`

## components/ResumePreview/PreviewResume

Modal-based resume preview and download component.

### PreviewResume

A modal component that allows users to preview the resume and generate a PDF download from the rendered document. It provides actions for downloading, printing, and closing the modal.

Core responsibilities:
- Renders the live resume document in a print-focused preview
- Provides a generated PDF download action
- Keeps the preview and PDF export aligned with the shared resume data source

Technical notes:
- Uses RSuite's ButtonToolbar for action buttons
- The component is styled to fit within the overall design system and maintain readability of the PDF content

Accessibility:
- RSuite Modal provides focus trapping and ESC-to-close behavior
- Buttons include descriptive aria-labels and tooltips

**Returns**

- `JSX.Element` - Rendered resume preview modal and trigger button.

## components/ResumePreview

Main export for the resume preview feature.

## components/features/ResumePreview/resumePdfExport

Browser-side resume PDF generation helpers.

### getPdfOrientation()

Determines PDF orientation from element dimensions.

**Parameters**

- `width` (`number`) - Element width in pixels.
- `height` (`number`) - Element height in pixels.

**Returns**

- `"portrait" | "landscape"`

### buildPageSlices()

Builds a pagination plan for rendering a single source canvas across one or
more PDF pages without distortion.

**Parameters**

- `options` (`Object`) - Pagination options.
- `options.imageWidthPx` (`number`) - Source image width in pixels.
- `options.imageHeightPx` (`number`) - Source image height in pixels.
- `options.pageWidthPt` (`number`) - PDF page width in points.
- `options.pageHeightPt` (`number`) - PDF page height in points.
- `options.marginPt` (`number`, optional, default: `24`) - Per-page margin in points.
- `options.rowComplexityScores` (`ArrayLike<number>`, optional) - Optional per-row visual complexity values.

**Returns**

- `Object`

### trimTransparentCanvasMargins()

Removes fully transparent outer margins from a rendered canvas.
This prevents cloned layout offsets from creating blank PDF gutters.

**Parameters**

- `sourceCanvas` (`HTMLCanvasElement`) - Canvas to normalize.

**Returns**

- `HTMLCanvasElement` - Original or cropped canvas.

### fillTransparentCanvasPixels()

Flattens transparent pixels to an explicit solid background color.

**Parameters**

- `sourceCanvas` (`HTMLCanvasElement`) - Canvas to flatten.
- `backgroundColor` (`string`) - Solid fill color.

**Returns**

- `HTMLCanvasElement` - Original or flattened canvas.

### downloadResumePdf()

Generates and downloads a PDF that mirrors the provided resume element's
current browser styling (including active theme/palette variables).

**Parameters**

- `element` (`HTMLElement`) - Root resume element to export.
- `options` (`Object`, optional) - Export options.
- `options.fileName` (`string`, optional, default: `"resume.pdf"`) - Downloaded file name.
- `options.marginPt` (`number`, optional, default: `24`) - PDF page margin in points.
- `options.pixelRatio` (`number`, optional, default: `2`) - Capture quality scale.

**Returns**

- `Promise<string>` - Resolved downloaded file name.

## src\\components\\features\\ResumePreview\\ResumePreviewTrigger

src\components\features\ResumePreview\ResumePreviewTrigger module.

### ResumePreviewTrigger()

Component that triggers the resume preview modal.

**Parameters**

- `props` (`Object`) - The properties object.
- `props.buttonText` (`string`) - The text for the trigger button.
- `props.title` (`string`) - The title of the resume preview.
- `props.subtitle` (`string`) - The subtitle of the resume preview.
- `props.resume` (`Object`) - The resume data object.
- `props.downloadName` (`string`) - The name for the downloaded PDF file.
- `props.buttonClassName` (`string`) - Additional class names for the trigger button.
- `props.icon` (`any`, optional) - Optional icon shown inside the trigger button.
- `props.tooltip` (`string`, optional) - Optional tooltip text for the trigger button.
- `props.ariaLabel` (`string`, optional) - Accessible label for the trigger button.
- `props.variant` (`string`, optional) - Optional visual variant passed through to Btn.
- `props.size` (`string`, optional) - Optional size variant passed through to Btn.
- `props.noBG` (`boolean`, optional) - Optional no-background treatment for icon-only triggers.

**Returns**

- `JSX.Element` - The rendered trigger component.

## components/ThemeToggle

Compact theme selection control for switching between
light and dark application themes.

### ThemeToggle()

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

**Parameters**

- `props` (`Object`) - Component props.
- `props.size` (`Size`, optional, default: `Size.SM`) - Size applied to the toggle buttons.

**Returns**

- `JSX.Element` - Rendered theme toggle control.

## components/UiStyleToggle

In-app selector for switching ui-style-kit-css visual systems.

### UiStyleToggle()

UiStyleToggle
------------------------------------------------------------------
Compact select control for switching ui-style-kit-css visual systems.

**Parameters**

- `props` (`Object`) - Component props.
- `props.size` (`Size`, optional, default: `Size.MD`) - Visual size of the select control.
- `props.showLabel` (`boolean`, optional, default: `true`) - Whether to render a visible label.
- `props.className` (`string`, optional) - Optional root className.
- `props.labelText` (`string`, optional, default: `"UI Style"`) - Visible label text.
- `props.ariaLabel` (`string`, optional, default: `"UI style selector"`) - Accessible label for select.

**Returns**

- `JSX.Element`

## src\\components\\features\\CustomDiagram\\core\\architectureFactory

src\components\features\CustomDiagram\core\architectureFactory module.

### buildArchitectureVariants()

- Builds desktop and mobile Mermaid sources from a single architecture config.

Mobile rules:
- Default direction becomes TB unless explicitly set by config.mobile.direction
- Optionally stack layer order unchanged (TB handles readability)

**Parameters**

- `config` (`object`) - Base architecture config

**Returns**

- `Object`

## src\\components\\features\\CustomDiagram\\core\\customDiagram

src\components\features\CustomDiagram\core\customDiagram module.

### diagram

Diagram helper that injects a standard architecture layer palette into flowchart diagrams and formats with Mermaid init.
This ensures consistent styling and layer definitions across all architecture diagrams without requiring manual palette inclusion, while leaving non-flowchart diagrams unaffected.

**Parameters**

- `init` (`string`) - Mermaid init block string.
- `body` (`string`) - Mermaid diagram body string.

**Returns**

- `string` - Fully formatted Mermaid diagram string with palette injection for flowcharts. The function checks if the diagram body contains a flowchart definition. If it does, it verifies whether the architecture layer palette is already included to avoid duplication. If the palette is missing, it injects the palette immediately after the first flowchart header. Finally, it formats the entire diagram with the provided Mermaid init block for consistent styling and rendering. This helper abstracts away the need for manual palette management in architecture diagrams, ensuring that all such diagrams adhere to a unified visual language while allowing other diagram types to remain unaffected.

### architectureDiagram

- Custom diagram builder for layered architecture diagrams with built-in validation and styling conventions. This function abstracts the complexity of Mermaid syntax while enforcing a consistent structure and visual language for architecture diagrams, making it easier to create clear and maintainable architectural visuals.

Key features:
- Layered structure with subgraphs for clear separation of concerns
- Class assignment for consistent styling of components, datastores, and external systems
- Edge validation to ensure all connections reference valid nodes

Enforces:
- Subgraph per layer
- Class assignment per layer
- Datastore formatting
- Deterministic structure

**Parameters**

- `init` (`string`) - Mermaid init block
- `config` (`Object`) - Architecture configuration

**Returns**

- `string` - Mermaid diagram string

**Throws**

- Value - Will throw an error if the configuration is invalid (e.g., missing node ids, duplicate ids, edges referencing unknown nodes).
- Value - Will throw an error if the configuration is invalid (e.g., missing node ids, duplicate ids, edges referencing unknown nodes).

**Examples**

```js
Given the following configuration:

const config = {
layers: [
 {
  key: "application",
 label: "Application Layer",
 className: "layerApplication",
 nodes: [
   { id: "AppState", label: "Central State Store", type: "datastore" },
],
},
{
 key: "presentation",
label: "Presentation Layer",
className: "layerPresentation",
nodes: [
 { id: "ChartUI", label: "Chart Interface" },
 { id: "MemeUI", label: "Meme Generator" },
],
},
],
edges: [
 { from: "AppState", to: "ChartUI" },
 { from: "MemeUI", to: "AppState" },
],
};

Calling `architectureDiagram("", config)` will produce a Mermaid diagram string that represents the defined architecture, with "AppState" as a datastore in the Application Layer, "ChartUI" and "MemeUI" as components in the Presentation Layer, and edges connecting them according to the specified relationships. The diagram will include appropriate class definitions for styling and will be formatted for rendering in a Mermaid-compatible environment.

The output will be a Mermaid diagram string representing the defined architecture, with appropriate subgraphs, classes, and edges, ready for rendering in a Mermaid-compatible environment.
```

## src\\components\\features\\CustomDiagram\\core\\diagramRegistry

src\components\features\CustomDiagram\core\diagramRegistry module.

### registerDiagram()

Register a diagram configuration. The config is opaque to the registry, but will be used by the diagram factory to produce renderable Mermaid sources.

**Parameters**

- `id` (`string`)
- `entry` (`object`) - { title, type, config, description?, tags? }

### getDiagramEntry()

Get a registered diagram entry by id.

**Parameters**

- `id` (`string`) - The diagram id.

**Returns**

- `object | undefined` - The diagram entry, or undefined if not found.

### listDiagramIds()

List registered diagram ids, sorted alphabetically.

**Returns**

- `Array<string>` - List of registered diagram ids, sorted alphabetically.

### buildDiagramSources()

Build Mermaid sources for a given diagram id. The sources are generated based on the diagram's type and config, and may include variants for different contexts (e.g., desktop vs mobile).

**Parameters**

- `id` (`string`) - The diagram id.

**Returns**

- `object` - An object containing the Mermaid sources for the diagram. The exact structure of the returned sources object depends on the diagram type and config. For example, for "architecture" diagrams, it may return an object with "desktop" and "mobile" keys, each containing a Mermaid source string variant. - The diagram factory is responsible for interpreting the diagram config and producing the appropriate Mermaid sources. The registry simply stores the configs and provides access to them. - The `buildDiagramSources()` function abstracts away the details of how the sources are generated, allowing callsites to simply request the sources for a given diagram id without needing to know about the underlying config or generation logic. - The returned sources can then be passed to a Mermaid rendering component (e.g., `MermaidDiagram`) to display the diagram in the UI. Usage example:

### buildAllDiagramSources()

Build all sources (useful for linting/CI).

**Returns**

- `Array` - An array of objects containing the diagram id, entry, and Mermaid sources.

## src\\components\\features\\CustomDiagram\\core\\index

src\components\features\CustomDiagram\core\index module.

## src\\components\\features\\CustomDiagram\\core\\mermaidInit

src\components\features\CustomDiagram\core\mermaidInit module.

### getResponsiveFlowchartInit()

Generates a Mermaid init block based on responsive and accessibility context.
This allows diagrams to adapt to user preferences and device constraints.
Currently adjusts flowchart diagrams for mobile breakpoint, reduced motion, reduced transparency, and high contrast modes.

**Parameters**

- `options` (`Object`) - Configuration options for diagram initialization.
- `options.breakpoint` (`"mobile" | "tablet" | "desktop"`) - Current responsive breakpoint.
- `options.reducedMotion` (`boolean`) - Whether the user prefers reduced motion.
- `options.reducedTransparency` (`boolean`) - Whether the user prefers reduced transparency.
- `options.highContrast` (`boolean`) - Whether the user prefers high contrast mode.

**Returns**

- `string` - Mermaid init block string with appropriate adjustments based on context. This function is designed to be used in conjunction with the `diagram` helper to ensure that Mermaid diagrams are rendered with context-aware styling and behavior adjustments, enhancing accessibility and usability across different devices and user preferences.

## src\\components\\features\\CustomDiagram\\core\\resolveDiagrams

src\components\features\CustomDiagram\core\resolveDiagrams module.

### resolveDiagram()

- Resolves diagram definitions into renderable diagrams.

**Parameters**

- `def` (`DiagramDefinition`) - Diagram definition to resolve

**Returns**

- `DiagramDefinition` - Resolved diagram definition with generated diagrams (if architecture config is present) Supports: - manual diagrams (existing system) - architecture DSL (auto generated)

### DiagramDefinition

- Type: `object`

**Properties**

- `id` (`string`) - Unique diagram identifier
- `type` (`string`) - Diagram block type (e.g. "diagram") Optional properties for architecture diagrams:
- `architecture` (`object`) - Architecture config for auto-generating diagrams
- `architecture.direction` (`string`) - Default diagram direction (e.g. "LR", "TB")
- `architecture.layers` (`Array<object>`) - Diagram layers with nodes
- `architecture.edges` (`Array<object>`) - Connections between nodes
- `architecture.mobile` (`object`) - Optional mobile-specific overrides

## src\\components\\features\\CustomDiagram\\examples\\greenhouse.arch

src\components\features\CustomDiagram\examples\greenhouse.arch module.

## src\\components\\features\\CustomDiagram\\examples\\panelEditor

src\components\features\CustomDiagram\examples\panelEditor module.

## src\\components\\features\\CustomDiagram\\registry\\registerAllDiagrams

src\components\features\CustomDiagram\registry\registerAllDiagrams module.

## ResumeSection

Groups related resume content under a shared heading.

**Parameters**

- `props` (`Object`) - Component props.
- `props.title` (`string`) - Section title.
- `props.children` (`React.ReactNode`) - Section content.

**Returns**

- `JSX.Element`

## ResumeDocument

Renders resume content as semantic, printable markup.

**Parameters**

- `props` (`Object`) - Component props.
- `props.resume` (`Object`) - Resume data object.

**Returns**

- `JSX.Element`

## collectDocumentStyles()

Collects all styles from the current document to ensure that the print preview has consistent styling. This function gathers both inline styles and linked stylesheets, concatenating their outer HTML into a single string that can be injected into the print preview document.

**Returns**

- `string` - A concatenated string of all styles from the current document, used for ensuring consistent styling in the print preview.

## PreviewResumeModal()

Modal component for previewing the resume with print and download options.

**Parameters**

- `props` (`Object`) - The properties object.
- `props.open` (`boolean`) - Whether the modal is open.
- `props.onClose` (`function`) - Function to call when the modal is closed.
- `props.title` (`string`) - The title of the resume.
- `props.subtitle` (`string`) - The subtitle of the resume.
- `props.downloadName` (`string`) - The name for the downloaded PDF file.
- `props.children` (`React.ReactNode`) - The content of the modal.

**Returns**

- `JSX.Element` - The rendered modal component.

## A11ySwitch()

A custom switch component for toggling accessibility preferences, built with an underlying checkbox input for accessibility.

**Properties**

- `labelledBy` (`string`) - The id of the element that labels this switch, used for aria-labelledby.
- `checked` (`boolean`) - Whether the switch is currently on (checked) or off (unchecked).
- `onChange` (`function`) - Callback function that is called with the new checked state when the switch is toggled.
- `disabled` (`boolean`) - Whether the switch is disabled and non-interactive.

**Returns**

- `JSX.Element` - The rendered switch component.

## PreferenceRow()

A single row in the accessibility menu for toggling a specific preference.

**Properties**

- `id` (`string`) - Unique identifier for the preference, used for accessibility labeling.
- `title` (`string`) - The display name of the preference.
- `description` (`string`) - A brief explanation of what the preference does.
- `enabled` (`boolean`) - Whether the preference is currently enabled (based on draft state).
- `systemValue` (`boolean | null`) - The current value of the preference according to system settings (if supported).
- `overrideValue` (`boolean | null`) - The manually selected override value, or null when using the system preference.
- `onToggle` (`function`) - Called when the preference switch is toggled.
- `onUseSystem` (`function`, optional) - Called when the user chooses to revert to the system preference.
- `supportsSystem` (`boolean`, optional, default: `true`) - Whether this preference can follow a system-level setting.
- `disabled` (`boolean`, optional, default: `false`) - Whether the row controls are disabled.

**Returns**

- `JSX.Element` - The rendered preference row component.
