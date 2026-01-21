## Modules

<dl>
<dt><a href="#module_navigation/SectionRegistry">navigation/SectionRegistry</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#restoreScrollPosition">restoreScrollPosition</a> ⇒ <code>void</code></dt>
<dd><h2 id="restorescrollposition">restoreScrollPosition</h2>
<p>Restores the user’s scroll position when a page is loaded or reloaded.</p>
<p>Resolution order:</p>
<ol>
<li>URL hash (deep link / manual navigation)</li>
<li>Persisted section state from previous session</li>
</ol>
<p>Behavior:</p>
<ul>
<li>Reads the current location hash, if present</li>
<li>Falls back to the last saved section ID</li>
<li>Smoothly scrolls the resolved section into view</li>
</ul>
<p>Design notes:</p>
<ul>
<li>URL hash is treated as the source of truth to support deep linking</li>
<li>Uses <code>requestAnimationFrame</code> to ensure DOM layout is complete
before attempting to scroll</li>
<li>No-op if no valid section can be resolved</li>
</ul>
<p>Typical usage:</p>
<ul>
<li>Called once during page or application bootstrap</li>
<li>Works in conjunction with scroll-spy and section persistence hooks</li>
</ul>
</dd>
<dt><a href="#saveLastSection">saveLastSection</a></dt>
<dd><p>Save the active section for the current page.</p>
</dd>
<dt><a href="#loadLastSection">loadLastSection</a> ⇒ <code>string</code> | <code>null</code></dt>
<dd><p>Load the last active section for the current page.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getPageKey">getPageKey()</a> ⇒ <code>string</code></dt>
<dd><p>Generate a storage key for the current page.</p>
</dd>
</dl>

<a name="module_navigation/SectionRegistry"></a>

## navigation/SectionRegistry
**Access**: public  

* [navigation/SectionRegistry](#module_navigation/SectionRegistry)
    * _static_
        * [.useSectionRegistry](#module_navigation/SectionRegistry.useSectionRegistry) ⇒ <code>SectionRegistryContextValue</code>
    * _inner_
        * [~SectionRegistryContext](#module_navigation/SectionRegistry..SectionRegistryContext) : <code>React.Context.&lt;(SectionRegistryContextValue\|null)&gt;</code>
        * [~SectionRegistryProvider(props)](#module_navigation/SectionRegistry..SectionRegistryProvider) ⇒ <code>JSX.Element</code>
            * [~sectionsRef](#module_navigation/SectionRegistry..SectionRegistryProvider..sectionsRef) : <code>React.MutableRefObject.&lt;Map.&lt;string, SectionMeta&gt;&gt;</code>
            * [~registerSection(id, meta)](#module_navigation/SectionRegistry..SectionRegistryProvider..registerSection)
            * [~unregisterSection(id)](#module_navigation/SectionRegistry..SectionRegistryProvider..unregisterSection)
            * [~getSections()](#module_navigation/SectionRegistry..SectionRegistryProvider..getSections) ⇒ <code>Array.&lt;SectionMeta&gt;</code>
        * [~SectionRegistryContextValue](#module_navigation/SectionRegistry..SectionRegistryContextValue) : <code>SectionMeta</code>

<a name="module_navigation/SectionRegistry.useSectionRegistry"></a>

### navigation/SectionRegistry.useSectionRegistry ⇒ <code>SectionRegistryContextValue</code>
useSectionRegistry
---------------------------------------------------------------------------
Hook to access the Section Registry context.

**Kind**: static constant of [<code>navigation/SectionRegistry</code>](#module_navigation/SectionRegistry)  
**Throws**:

- <code>Error</code> If used outside of SectionRegistryProvider.

----------------------------------------------------------------------------

**Access**: public  
**Example**  
```js
const { registerSection } = useSectionRegistry();

useEffect(() => {
  registerSection("about", { id: "about", title: "About Me" });
}, []);
<a name="module_navigation/SectionRegistry..SectionRegistryContext"></a>

### navigation/SectionRegistry~SectionRegistryContext : <code>React.Context.&lt;(SectionRegistryContextValue\|null)&gt;</code>
Internal React context for section registry.

**Kind**: inner constant of [<code>navigation/SectionRegistry</code>](#module_navigation/SectionRegistry)  
<a name="module_navigation/SectionRegistry..SectionRegistryProvider"></a>

### navigation/SectionRegistry~SectionRegistryProvider(props) ⇒ <code>JSX.Element</code>
SectionRegistryProvider
---------------------------------------------------------------------------
Provides a centralized registry for page sections so that navigation
components (e.g., sticky nav, scroll-spy) can discover sections automatically.

Features:
- Runtime duplicate ID protection
- Dev-only warnings for incorrect usage
- Stable registry backed by useRef (no rerenders)

**Kind**: inner method of [<code>navigation/SectionRegistry</code>](#module_navigation/SectionRegistry)  
**Access**: public  
**Component**:   

| Param | Type |
| --- | --- |
| props | <code>Object</code> | 


* [~SectionRegistryProvider(props)](#module_navigation/SectionRegistry..SectionRegistryProvider) ⇒ <code>JSX.Element</code>
    * [~sectionsRef](#module_navigation/SectionRegistry..SectionRegistryProvider..sectionsRef) : <code>React.MutableRefObject.&lt;Map.&lt;string, SectionMeta&gt;&gt;</code>
    * [~registerSection(id, meta)](#module_navigation/SectionRegistry..SectionRegistryProvider..registerSection)
    * [~unregisterSection(id)](#module_navigation/SectionRegistry..SectionRegistryProvider..unregisterSection)
    * [~getSections()](#module_navigation/SectionRegistry..SectionRegistryProvider..getSections) ⇒ <code>Array.&lt;SectionMeta&gt;</code>

<a name="module_navigation/SectionRegistry..SectionRegistryProvider..sectionsRef"></a>

#### SectionRegistryProvider~sectionsRef : <code>React.MutableRefObject.&lt;Map.&lt;string, SectionMeta&gt;&gt;</code>
**Kind**: inner constant of [<code>SectionRegistryProvider</code>](#module_navigation/SectionRegistry..SectionRegistryProvider)  
<a name="module_navigation/SectionRegistry..SectionRegistryProvider..registerSection"></a>

#### SectionRegistryProvider~registerSection(id, meta)
Register a section with the registry.

**Kind**: inner method of [<code>SectionRegistryProvider</code>](#module_navigation/SectionRegistry..SectionRegistryProvider)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 
| meta | <code>SectionMeta</code> | 

<a name="module_navigation/SectionRegistry..SectionRegistryProvider..unregisterSection"></a>

#### SectionRegistryProvider~unregisterSection(id)
Unregister a section from the registry.

**Kind**: inner method of [<code>SectionRegistryProvider</code>](#module_navigation/SectionRegistry..SectionRegistryProvider)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="module_navigation/SectionRegistry..SectionRegistryProvider..getSections"></a>

#### SectionRegistryProvider~getSections() ⇒ <code>Array.&lt;SectionMeta&gt;</code>
Get all registered sections in insertion order.

**Kind**: inner method of [<code>SectionRegistryProvider</code>](#module_navigation/SectionRegistry..SectionRegistryProvider)  
<a name="module_navigation/SectionRegistry..SectionRegistryContextValue"></a>

### navigation/SectionRegistry~SectionRegistryContextValue : <code>SectionMeta</code>
**Kind**: inner typedef of [<code>navigation/SectionRegistry</code>](#module_navigation/SectionRegistry)  
<a name="restoreScrollPosition"></a>

## restoreScrollPosition ⇒ <code>void</code>
restoreScrollPosition
---------------------------------------------------------------------------
Restores the user’s scroll position when a page is loaded or reloaded.

Resolution order:
1. URL hash (deep link / manual navigation)
2. Persisted section state from previous session

Behavior:
- Reads the current location hash, if present
- Falls back to the last saved section ID
- Smoothly scrolls the resolved section into view

Design notes:
- URL hash is treated as the source of truth to support deep linking
- Uses `requestAnimationFrame` to ensure DOM layout is complete
  before attempting to scroll
- No-op if no valid section can be resolved

Typical usage:
- Called once during page or application bootstrap
- Works in conjunction with scroll-spy and section persistence hooks

**Kind**: global constant  
<a name="saveLastSection"></a>

## saveLastSection
Save the active section for the current page.

**Kind**: global constant  

| Param | Type |
| --- | --- |
| sectionId | <code>string</code> | 

<a name="loadLastSection"></a>

## loadLastSection ⇒ <code>string</code> \| <code>null</code>
Load the last active section for the current page.

**Kind**: global constant  
<a name="getPageKey"></a>

## getPageKey() ⇒ <code>string</code>
Generate a storage key for the current page.

**Kind**: global function  
