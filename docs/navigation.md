## Modules

<dl>
<dt><a href="#module_navigation/SectionRegistryProvider">navigation/SectionRegistryProvider</a></dt>
<dd><p>Provides a centralized registry for page sections so navigation
systems (e.g., sticky navigation, scroll-spy) can dynamically discover and
track registered sections.</p>
</dd>
<dt><a href="#module_navigation/restoreScrollPosition">navigation/restoreScrollPosition</a></dt>
<dd><p>Restores the user&#39;s scroll position when a page is loaded
or reloaded by resolving a target section and scrolling it into view.</p>
</dd>
<dt><a href="#module_navigation/sectionPersistence">navigation/sectionPersistence</a></dt>
<dd><p>Utilities for persisting and restoring the user&#39;s last active
section on a per-page basis using sessionStorage.</p>
</dd>
</dl>

<a name="module_navigation/SectionRegistryProvider"></a>

## navigation/SectionRegistryProvider

Provides a centralized registry for page sections so navigation
systems (e.g., sticky navigation, scroll-spy) can dynamically discover and
track registered sections.

* [navigation/SectionRegistryProvider](#module_navigation/SectionRegistryProvider)
  * _static_
    * [.useSectionRegistry](#module_navigation/SectionRegistryProvider.useSectionRegistry) ⇒ <code>SectionRegistryContextValue</code>
  * _inner_
    * [~SectionRegistryContext](#module_navigation/SectionRegistryProvider..SectionRegistryContext) : <code>React.Context.&lt;(SectionRegistryContextValue\|null)&gt;</code>
    * [~SectionRegistryProvider(props)](#module_navigation/SectionRegistryProvider..SectionRegistryProvider) ⇒ <code>JSX.Element</code>
      * [~sectionsRef](#module_navigation/SectionRegistryProvider..SectionRegistryProvider..sectionsRef) : <code>React.MutableRefObject.&lt;Map.&lt;string, SectionMeta&gt;&gt;</code>
      * [~registerSection(id, meta)](#module_navigation/SectionRegistryProvider..SectionRegistryProvider..registerSection) ⇒ <code>void</code>
      * [~unregisterSection(id)](#module_navigation/SectionRegistryProvider..SectionRegistryProvider..unregisterSection) ⇒ <code>void</code>
      * [~getSections()](#module_navigation/SectionRegistryProvider..SectionRegistryProvider..getSections) ⇒ <code>Array.&lt;SectionMeta&gt;</code>
    * [~RegisterSection](#module_navigation/SectionRegistryProvider..RegisterSection) ⇒ <code>void</code>
    * [~UnregisterSection](#module_navigation/SectionRegistryProvider..UnregisterSection) ⇒ <code>void</code>
    * [~GetSections](#module_navigation/SectionRegistryProvider..GetSections) ⇒ <code>Array.&lt;SectionMeta&gt;</code>
    * [~SectionMeta](#module_navigation/SectionRegistryProvider..SectionMeta) : <code>Object</code>
    * [~SectionRegistryContextValue](#module_navigation/SectionRegistryProvider..SectionRegistryContextValue) : <code>Object</code>

<a name="module_navigation/SectionRegistryProvider.useSectionRegistry"></a>

### navigation/SectionRegistryProvider.useSectionRegistry ⇒ <code>SectionRegistryContextValue</code>

useSectionRegistry
---------------------------------------------------------------------------

Hook for accessing the Section Registry context.

This hook must be used within a SectionRegistryProvider.

**Kind**: static constant of [<code>navigation/SectionRegistryProvider</code>](#module_navigation/SectionRegistryProvider)  
**Returns**: <code>SectionRegistryContextValue</code> - Section registry API.  
**Throws**:

* <code>Error</code> If used outside of a SectionRegistryProvider.

**Access**: public  
**Example**  

```js
const { registerSection } = useSectionRegistry();

useEffect(() => {
  registerSection("about", { id: "about", title: "About Me" });
}, []);
```

<a name="module_navigation/SectionRegistryProvider..SectionRegistryContext"></a>

### navigation/SectionRegistryProvider~SectionRegistryContext : <code>React.Context.&lt;(SectionRegistryContextValue\|null)&gt;</code>

Internal React context for the section registry.
The context value is intentionally nullable to enforce provider usage.

**Kind**: inner constant of [<code>navigation/SectionRegistryProvider</code>](#module_navigation/SectionRegistryProvider)  
<a name="module_navigation/SectionRegistryProvider..SectionRegistryProvider"></a>

### navigation/SectionRegistryProvider~SectionRegistryProvider(props) ⇒ <code>JSX.Element</code>

SectionRegistryProvider
---------------------------------------------------------------------------

Provides a centralized registry for page sections so that navigation
components (e.g., sticky navigation, scroll-spy) can discover sections
automatically at runtime.

Design notes:
* Uses a Map stored in a ref to avoid unnecessary re-renders
* Enforces unique section IDs per page
* Emits development-only warnings for incorrect usage

**Kind**: inner method of [<code>navigation/SectionRegistryProvider</code>](#module_navigation/SectionRegistryProvider)  
**Returns**: <code>JSX.Element</code> - Context provider wrapping child components.  
**Access**: public  
**Component**:

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Provider props. |

* [~SectionRegistryProvider(props)](#module_navigation/SectionRegistryProvider..SectionRegistryProvider) ⇒ <code>JSX.Element</code>
  * [~sectionsRef](#module_navigation/SectionRegistryProvider..SectionRegistryProvider..sectionsRef) : <code>React.MutableRefObject.&lt;Map.&lt;string, SectionMeta&gt;&gt;</code>
  * [~registerSection(id, meta)](#module_navigation/SectionRegistryProvider..SectionRegistryProvider..registerSection) ⇒ <code>void</code>
  * [~unregisterSection(id)](#module_navigation/SectionRegistryProvider..SectionRegistryProvider..unregisterSection) ⇒ <code>void</code>
  * [~getSections()](#module_navigation/SectionRegistryProvider..SectionRegistryProvider..getSections) ⇒ <code>Array.&lt;SectionMeta&gt;</code>

<a name="module_navigation/SectionRegistryProvider..SectionRegistryProvider..sectionsRef"></a>

#### SectionRegistryProvider~sectionsRef : <code>React.MutableRefObject.&lt;Map.&lt;string, SectionMeta&gt;&gt;</code>

Internal registry of section metadata keyed by section ID.
Stored in a ref to ensure stable identity across renders.

**Kind**: inner constant of [<code>SectionRegistryProvider</code>](#module_navigation/SectionRegistryProvider..SectionRegistryProvider)  
<a name="module_navigation/SectionRegistryProvider..SectionRegistryProvider..registerSection"></a>

#### SectionRegistryProvider~registerSection(id, meta) ⇒ <code>void</code>

Registers a section with the registry.

Guardrails:
* No-op if no ID is provided
* Prevents duplicate IDs
* Emits warnings in development mode only

**Kind**: inner method of [<code>SectionRegistryProvider</code>](#module_navigation/SectionRegistryProvider..SectionRegistryProvider)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique section identifier. |
| meta | <code>SectionMeta</code> | Metadata describing the section. |

<a name="module_navigation/SectionRegistryProvider..SectionRegistryProvider..unregisterSection"></a>

#### SectionRegistryProvider~unregisterSection(id) ⇒ <code>void</code>

Unregisters a section from the registry.
Intended to be called during component unmount.

**Kind**: inner method of [<code>SectionRegistryProvider</code>](#module_navigation/SectionRegistryProvider..SectionRegistryProvider)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of the section to remove. |

<a name="module_navigation/SectionRegistryProvider..SectionRegistryProvider..getSections"></a>

#### SectionRegistryProvider~getSections() ⇒ <code>Array.&lt;SectionMeta&gt;</code>

Returns all registered sections in insertion order.

Emits a development-only warning if no sections are registered,
which typically indicates incorrect usage of SectionRenderer.

**Kind**: inner method of [<code>SectionRegistryProvider</code>](#module_navigation/SectionRegistryProvider..SectionRegistryProvider)  
**Returns**: <code>Array.&lt;SectionMeta&gt;</code> - Array of registered section metadata.  
<a name="module_navigation/SectionRegistryProvider..RegisterSection"></a>

### navigation/SectionRegistryProvider~RegisterSection ⇒ <code>void</code>

**Kind**: inner typedef of [<code>navigation/SectionRegistryProvider</code>](#module_navigation/SectionRegistryProvider)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique section identifier. |
| meta | <code>SectionMeta</code> | Section metadata. |

<a name="module_navigation/SectionRegistryProvider..UnregisterSection"></a>

### navigation/SectionRegistryProvider~UnregisterSection ⇒ <code>void</code>

**Kind**: inner typedef of [<code>navigation/SectionRegistryProvider</code>](#module_navigation/SectionRegistryProvider)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Section identifier to remove. |

<a name="module_navigation/SectionRegistryProvider..GetSections"></a>

### navigation/SectionRegistryProvider~GetSections ⇒ <code>Array.&lt;SectionMeta&gt;</code>

**Kind**: inner typedef of [<code>navigation/SectionRegistryProvider</code>](#module_navigation/SectionRegistryProvider)  
**Returns**: <code>Array.&lt;SectionMeta&gt;</code> - Ordered list of registered sections.  
<a name="module_navigation/SectionRegistryProvider..SectionMeta"></a>

### navigation/SectionRegistryProvider~SectionMeta : <code>Object</code>

Metadata describing a registered page section.

**Kind**: inner typedef of [<code>navigation/SectionRegistryProvider</code>](#module_navigation/SectionRegistryProvider)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique identifier for the section. |
| [title] | <code>string</code> | Human-readable section title. |
| [element] | <code>HTMLElement</code> | DOM element associated with the section. |
| [order] | <code>number</code> | Optional ordering hint for navigation. |

<a name="module_navigation/SectionRegistryProvider..SectionRegistryContextValue"></a>

### navigation/SectionRegistryProvider~SectionRegistryContextValue : <code>Object</code>

Public API exposed by the Section Registry context.

**Kind**: inner typedef of [<code>navigation/SectionRegistryProvider</code>](#module_navigation/SectionRegistryProvider)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| registerSection | <code>RegisterSection</code> | Registers a section. |
| unregisterSection | <code>UnregisterSection</code> | Unregisters a section. |
| getSections | <code>GetSections</code> | Returns all registered sections. |

<a name="module_navigation/restoreScrollPosition"></a>

## navigation/restoreScrollPosition

Restores the user's scroll position when a page is loaded
or reloaded by resolving a target section and scrolling it into view.

<a name="module_navigation/restoreScrollPosition.restoreScrollPosition"></a>

### navigation/restoreScrollPosition.restoreScrollPosition ⇒ <code>void</code>

Restores the user's scroll position when a page is loaded or reloaded.

Resolution order:

1. URL hash (deep link or manual navigation)
2. Persisted section state from a previous session

Behavior:
* Reads the current location hash, if present
* Falls back to the last saved section ID
* Smoothly scrolls the resolved section into view

Design notes:
* The URL hash is treated as the source of truth to support deep linking
* `requestAnimationFrame` is used to ensure DOM layout is complete
  before attempting to scroll
* Function exits early if no valid section can be resolved

Typical usage:
* Invoked once during page or application bootstrap
* Works in conjunction with scroll-spy and section persistence utilities

**Kind**: static constant of [<code>navigation/restoreScrollPosition</code>](#module_navigation/restoreScrollPosition)  
**Access**: public  
<a name="module_navigation/sectionPersistence"></a>

## navigation/sectionPersistence

Utilities for persisting and restoring the user's last active
section on a per-page basis using sessionStorage.

* [navigation/sectionPersistence](#module_navigation/sectionPersistence)
  * _static_
    * [.saveLastSection](#module_navigation/sectionPersistence.saveLastSection) ⇒ <code>void</code>
    * [.loadLastSection](#module_navigation/sectionPersistence.loadLastSection) ⇒ <code>string</code> \| <code>null</code>
  * _inner_
    * [~getPageKey()](#module_navigation/sectionPersistence..getPageKey) ⇒ <code>string</code>

<a name="module_navigation/sectionPersistence.saveLastSection"></a>

### navigation/sectionPersistence.saveLastSection ⇒ <code>void</code>

Persists the currently active section ID for the current page.

Intended to be called by scroll-spy or navigation logic whenever the
active section changes.

No-op if a falsy section ID is provided.

**Kind**: static constant of [<code>navigation/sectionPersistence</code>](#module_navigation/sectionPersistence)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| sectionId | <code>string</code> | ID of the active section to persist. |

<a name="module_navigation/sectionPersistence.loadLastSection"></a>

### navigation/sectionPersistence.loadLastSection ⇒ <code>string</code> \| <code>null</code>

Loads the last persisted section ID for the current page.

Returns `null` if no section has been saved for the current route.

**Kind**: static constant of [<code>navigation/sectionPersistence</code>](#module_navigation/sectionPersistence)  
**Returns**: <code>string</code> \| <code>null</code> - Previously saved section ID, if available.  
**Access**: public  
<a name="module_navigation/sectionPersistence..getPageKey"></a>

### navigation/sectionPersistence~getPageKey() ⇒ <code>string</code>

Generates a storage key scoped to the current page pathname.

This ensures section state is isolated per route and does not leak
across different pages within the application.

**Kind**: inner method of [<code>navigation/sectionPersistence</code>](#module_navigation/sectionPersistence)  
**Returns**: <code>string</code> - Namespaced sessionStorage key.  
