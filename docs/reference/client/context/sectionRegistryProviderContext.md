# sectionRegistryProviderContext

- Source: `src/assets/context/SectionRegistryProvider.jsx`

# sectionRegistryProviderContext

## src\\assets\\context\\SectionRegistryProvider

src\assets\context\SectionRegistryProvider module.

## assets/context/SectionRegistryProvider

Provides a centralized registry for page sections so navigation
systems (e.g., sticky navigation, scroll-spy) can dynamically discover and
track registered sections.

### SectionRegistryContext

Internal React context for the section registry.
The context value is intentionally nullable to enforce provider usage.

- Type: `React.Context<(SectionRegistryContextValue|null)>`

### SectionRegistryProvider()

React context provider component that manages a registry of page sections. This provider maintains an internal Map of registered sections, allowing components to register and unregister sections dynamically as they mount and unmount. The provider exposes a context value with functions to register/unregister sections and retrieve the current list of registered sections. By wrapping the app (or relevant parts of it) with this provider, we enable features like dynamic navigation generation and scroll-spy behavior based on the registered sections.

**Parameters**

- `props` (`Object`) - Provider props.

**Returns**

- `JSX.Element` - Context provider wrapping child components.

### registerSection()

Registers a section with the registry. This function is intended to be called by section components (e.g., SectionRenderer) when they mount to add themselves to the registry. It takes a unique section ID and associated metadata, and stores it in the internal Map. If an attempt is made to register a section without an ID or with a duplicate ID, it will emit a warning in development mode to help catch potential issues with section management.

**Parameters**

- `id` (`string`) - Unique identifier for the section being registered.
- `meta` (`SectionMeta`) - Metadata describing the section (e.g., title, element).

**Returns**

- `void` - This function does not return any value.

### unregisterSection()

Removes a section from the registry by its ID. This function is intended to be called when a section component unmounts to ensure that the registry stays up-to-date with the currently rendered sections on the page. It performs a simple deletion from the internal Map of sections based on the provided ID. If the ID does not exist in the registry, it will simply do nothing, allowing for safe calls even if there are issues with section lifecycle management.

**Parameters**

- `id` (`string`) - The unique identifier of the section to be removed from the registry.

**Returns**

- `void` - This function does not return any value.

### getSections()

Retrieves all registered sections in insertion order. This function converts the internal Map of sections to an array of section metadata objects. In development mode, it emits a warning if no sections are registered, which can help catch incorrect usage of the SectionRenderer component that is responsible for registering sections. By providing a getSections function, we allow consuming components (like navigation systems) to access the current list of registered sections and render navigation links or perform scroll-spy behavior accordingly.

**Returns**

- `Array<SectionMeta>` - Array of registered section metadata.

**Throws**

- Value - Will not throw errors, but will emit a warning in development mode if no sections are registered. This is to help developers catch potential issues with section registration.

### useSectionRegistry()

Hook for accessing the Section Registry context.

**Returns**

- `SectionRegistryContextValue` - Section registry API.

**Throws**

- `Error` - If used outside of a SectionRegistryProvider.

**Examples**

```js
```js
const { registerSection } = useSectionRegistry();

useEffect(() => {
  registerSection("about", { id: "about", title: "About Me" });
}, []);
```
```

### RegisterSection

- Type: `function`

**Parameters**

- `id` (`string`) - Unique section identifier.
- `meta` (`SectionMeta`) - Section metadata.

**Returns**

- `void`

### UnregisterSection

- Type: `function`

**Parameters**

- `id` (`string`) - Section identifier to remove.

**Returns**

- `void`

### GetSections

- Type: `function`

**Returns**

- `Array<SectionMeta>` - Ordered list of registered sections.

### SectionMeta

Metadata describing a registered page section.

- Type: `Object`

**Properties**

- `id` (`string`) - Unique identifier for the section.
- `title` (`string`, optional) - Human-readable section title.
- `element` (`HTMLElement`, optional) - DOM element associated with the section.
- `order` (`number`, optional) - Optional ordering hint for navigation.

### SectionRegistryContextValue

Public API exposed by the Section Registry context.

- Type: `Object`

**Properties**

- `registerSection` (`RegisterSection`) - Registers a section.
- `unregisterSection` (`UnregisterSection`) - Unregisters a section.
- `getSections` (`GetSections`) - Returns all registered sections.
