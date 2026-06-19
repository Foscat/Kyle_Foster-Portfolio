# navigationTypesType

- Source: `src/types/navigation.types.js`

# navigationTypesType

## types/navigation

Shared navigation-related type definitions used across the
section registry, scroll persistence, and navigation components.

### PageRoute

Route types

- Type: `string`

### NavigationSection

Represents a single navigable section registered with the application.

- Type: `Object`

**Properties**

- `id` (`string`) - Unique identifier for the section (used as anchor/hash).
- `label` (`string`) - Human-readable label displayed in navigation UI.
- `order` (`number`) - Sort order determining vertical and nav placement.
- `element` (`HTMLElement | null`) - DOM element associated with the section.
- `hidden` (`boolean`, optional) - Whether the section should be excluded from nav.

### SectionRegistry

Map of section IDs to their registered section metadata.

- Type: `Object<string, NavigationSection>`

### ScrollPositionState

Describes the scroll position state persisted between navigations.

- Type: `Object`

**Properties**

- `x` (`number`) - Horizontal scroll offset.
- `y` (`number`) - Vertical scroll offset.
- `pathname` (`string`) - Pathname associated with the saved position.

### RegisterSection

Function signature used to register a section with the registry.

- Type: `function`

**Parameters**

- `section` (`NavigationSection`) - Section metadata to register.

**Returns**

- `void`

### UnregisterSection

Function signature used to unregister a section from the registry.

- Type: `function`

**Parameters**

- `sectionId` (`string`) - ID of the section to remove.

**Returns**

- `void`
