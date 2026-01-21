## Modules

<dl>
<dt><a href="#module_types/navigation">types/navigation</a></dt>
<dd></dd>
<dt><a href="#module_types/ui">types/ui</a></dt>
<dd></dd>
</dl>

<a name="module_types/navigation"></a>

## types/navigation
**Access**: public  

* [types/navigation](#module_types/navigation)
    * [~SectionMeta](#module_types/navigation..SectionMeta) : <code>object</code>
    * [~SectionRegistry](#module_types/navigation..SectionRegistry) : <code>Object</code>

<a name="module_types/navigation..SectionMeta"></a>

### types/navigation~SectionMeta : <code>object</code>
Metadata describing a registered page section.

**Kind**: inner typedef of [<code>types/navigation</code>](#module_types/navigation)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique section identifier (must match DOM id). |
| title | <code>string</code> | Human-readable title for navigation. |

<a name="module_types/navigation..SectionRegistry"></a>

### types/navigation~SectionRegistry : <code>Object</code>
SectionRegistry API
------------------------------------------------------------
Interface describing the section registry used for scroll-spy
navigation and section coordination.

**Kind**: inner typedef of [<code>types/navigation</code>](#module_types/navigation)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| registerSection | <code>function</code> | Registers a section with its metadata. |
| unregisterSection | <code>function</code> | Unregisters a section by ID. |
| getSections | <code>function</code> | Returns all registered section metadata in order. |

<a name="module_types/ui"></a>

## types/ui

* [types/ui](#module_types/ui)
    * _static_
        * [.Size](#module_types/ui.Size) : <code>enum</code>
        * [.Variant](#module_types/ui.Variant) : <code>enum</code>
        * [.Theme](#module_types/ui.Theme) : <code>enum</code>
        * [.BlockType](#module_types/ui.BlockType) : <code>enum</code>
        * [.PageRoute](#module_types/ui.PageRoute) : <code>enum</code>
        * [.createFeatureImage](#module_types/ui.createFeatureImage) ⇒ <code>FeatureImage</code>
        * [.createRichTextBlock](#module_types/ui.createRichTextBlock) ⇒ <code>RichTextBlock</code>
        * [.createDiagramBlock](#module_types/ui.createDiagramBlock) ⇒ <code>DiagramBlock</code>
        * [.createBulletListBlock](#module_types/ui.createBulletListBlock) ⇒ <code>BulletListBlock</code>
        * [.createLinkListBlock](#module_types/ui.createLinkListBlock) ⇒ <code>LinkListBlock</code>
        * [.createFeatureSection](#module_types/ui.createFeatureSection) ⇒ <code>FeatureSection</code>
        * [.isValidEnumValue](#module_types/ui.isValidEnumValue) ⇒ <code>boolean</code>
    * _inner_
        * [~createBulletItem(item, position)](#module_types/ui..createBulletItem) ⇒ <code>DiagramBlock</code>
        * [~ClickHandler](#module_types/ui..ClickHandler) ⇒ <code>void</code> \| <code>Promise.&lt;void&gt;</code>
        * [~ChangeHandler](#module_types/ui..ChangeHandler) ⇒ <code>void</code>
        * [~FeatureImage](#module_types/ui..FeatureImage) : <code>object</code>
        * [~LinkItem](#module_types/ui..LinkItem) : <code>object</code>
        * [~BulletItem](#module_types/ui..BulletItem) : <code>object</code>
        * [~DiagramBlock](#module_types/ui..DiagramBlock) : <code>object</code>
        * [~RichTextBlock](#module_types/ui..RichTextBlock) : <code>object</code>
        * [~ImageGalleryBlock](#module_types/ui..ImageGalleryBlock) : <code>object</code>
        * [~BulletListBlock](#module_types/ui..BulletListBlock) : <code>object</code>
        * [~LinkListBlock](#module_types/ui..LinkListBlock) : <code>object</code>
        * [~FeatureBlock](#module_types/ui..FeatureBlock) : <code>RichTextBlock</code> \| <code>ImageGalleryBlock</code> \| <code>DiagramBlock</code> \| <code>BulletListBlock</code> \| <code>LinkListBlock</code>
        * [~FeatureSection](#module_types/ui..FeatureSection) : <code>object</code>

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
<a name="module_types/ui.BlockType"></a>

### types/ui.BlockType : <code>enum</code>
Feature block discriminator types

**Kind**: static enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui.PageRoute"></a>

### types/ui.PageRoute : <code>enum</code>
Route types

**Kind**: static enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui.createFeatureImage"></a>

### types/ui.createFeatureImage ⇒ <code>FeatureImage</code>
Create a default FeatureImage using base

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type |
| --- | --- |
| block | <code>object</code> | 

<a name="module_types/ui.createRichTextBlock"></a>

### types/ui.createRichTextBlock ⇒ <code>RichTextBlock</code>
Create a default RichTextBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type |
| --- | --- |
| block | <code>Partial.&lt;RichTextBlock&gt;</code> | 

<a name="module_types/ui.createDiagramBlock"></a>

### types/ui.createDiagramBlock ⇒ <code>DiagramBlock</code>
Create a default DiagramBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type |
| --- | --- |
| block | <code>Partial.&lt;BulletListBlock&gt;</code> | 

<a name="module_types/ui.createBulletListBlock"></a>

### types/ui.createBulletListBlock ⇒ <code>BulletListBlock</code>
**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type |
| --- | --- |
| block | <code>Partial.&lt;BulletListBlock&gt;</code> | 

<a name="module_types/ui.createLinkListBlock"></a>

### types/ui.createLinkListBlock ⇒ <code>LinkListBlock</code>
Create a default LinkListBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type |
| --- | --- |
| block | <code>Partial.&lt;LinkListBlock&gt;</code> | 

<a name="module_types/ui.createFeatureSection"></a>

### types/ui.createFeatureSection ⇒ <code>FeatureSection</code>
Create a default FeatureSection

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui.isValidEnumValue"></a>

### types/ui.isValidEnumValue ⇒ <code>boolean</code>
Validate enum membership at runtime

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  
**Returns**: <code>boolean</code> - True if valid enum value.  

| Param | Type | Description |
| --- | --- | --- |
| enumObj | <code>object</code> | Enum object. |
| value | <code>\*</code> | Value to test. |

<a name="module_types/ui..createBulletItem"></a>

### types/ui~createBulletItem(item, position) ⇒ <code>DiagramBlock</code>
Create a default BulletListItem

**Kind**: inner method of [<code>types/ui</code>](#module_types/ui)  

| Param | Type |
| --- | --- |
| item | <code>Partial.&lt;BulletListBlock&gt;</code> | 
| position | <code>number</code> | 

<a name="module_types/ui..ClickHandler"></a>

### types/ui~ClickHandler ⇒ <code>void</code> \| <code>Promise.&lt;void&gt;</code>
Generic click handler

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  

| Param | Type |
| --- | --- |
| event | <code>MouseEvent</code> | 

<a name="module_types/ui..ChangeHandler"></a>

### types/ui~ChangeHandler ⇒ <code>void</code>
Generic change handler

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 

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

<a name="module_types/ui..DiagramBlock"></a>

### types/ui~DiagramBlock : <code>object</code>
Diagram block

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>&quot;diagram&quot;</code> |  | Block discriminator. |
| title | <code>string</code> |  | Diagram title. |
| diagram | <code>string</code> |  | Mermaid.js definition. |
| [theme] | <code>&quot;light&quot;</code> \| <code>&quot;dark&quot;</code> \| <code>&quot;auto&quot;</code> | <code>&quot;auto&quot;</code> | Theme preference. |
| [description] | <code>string</code> |  | Optional explanation. |
| [collapsible] | <code>boolean</code> | <code>true</code> | Allow collapse. |

<a name="module_types/ui..RichTextBlock"></a>

### types/ui~RichTextBlock : <code>object</code>
Rich text block

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>&quot;richText&quot;</code> | Block discriminator. |
| [title] | <code>string</code> | Optional heading. |
| paragraphs | <code>Array.&lt;string&gt;</code> | Paragraph content. |

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

<a name="module_types/ui..FeatureBlock"></a>

### types/ui~FeatureBlock : <code>RichTextBlock</code> \| <code>ImageGalleryBlock</code> \| <code>DiagramBlock</code> \| <code>BulletListBlock</code> \| <code>LinkListBlock</code>
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
| slug | <code>string</code> |  | URL-safe slug. |
| title | <code>string</code> |  | Section title. |
| [subtitle] | <code>string</code> |  | Optional subtitle. |
| [icon] | <code>string</code> |  | Icon key. |
| [isScroller] | <code>boolean</code> | <code>false</code> | Used by sticky nav. |
| blocks | <code>Array.&lt;FeatureBlock&gt;</code> |  | Content blocks. |

