## Modules

<dl>
<dt><a href="#module_scripts\build-diagram-assets">scripts\build-diagram-assets</a></dt>
<dd><p>scripts\build-diagram-assets module.</p>
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

## Constants

<dl>
<dt><a href="#DIAGRAM_BLOCK_RE">DIAGRAM_BLOCK_RE</a></dt>
<dd><p>Regex finds: diagram: <code>...</code> /</p>
</dd>
<dt><a href="#CORE_TYPES">CORE_TYPES</a></dt>
<dd><p>VALID_MERMAID_TYPES --------------------------------------------------------------------------- Hybrid strict mode: - CORE_TYPES are always allowed - EXTENDED_TYPES are allowed but validated more strictly /</p>
</dd>
<dt><a href="#OUTPUT_DIR">OUTPUT_DIR</a></dt>
<dd><p>Output directory for rendered PNG assets. This directory is expected to be committed or published alongside generated documentation. /</p>
</dd>
<dt><a href="#VIEWPORT">VIEWPORT</a></dt>
<dd><p>Fixed viewport ensures: - Consistent diagram scaling - Predictable text wrapping - Stable screenshot output across environments /</p>
</dd>
</dl>

## Functions

<dl>
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
<dt><a href="#fixJsdocImportTypes">fixJsdocImportTypes(file, api)</a> ⇒ <code>string</code></dt>
<dd><p>Codemod function that rewrites unsupported JSDoc <code>import()</code> type references into plain type identifiers.</p>
</dd>
<dt><a href="#stripInit">stripInit()</a></dt>
<dd><p>Removes the Mermaid init block for structural validation only. /</p>
</dd>
<dt><a href="#extractSources">extractSources()</a></dt>
<dd><p>Extracts all Mermaid source strings from a diagram block. /</p>
</dd>
<dt><a href="#lintDiagram">lintDiagram()</a></dt>
<dd><p>Performs structural validation on a single Mermaid diagram block. /</p>
</dd>
<dt><a href="#run">run()</a></dt>
<dd><p>ENTRYPOINT BEHAVIOR /</p>
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
</dl>

<a name="module_scripts\build-diagram-assets"></a>

## scripts\build-diagram-assets
scripts\build-diagram-assets module.

<a name="module_scripts\build-diagram-assets..run"></a>

### scripts\build-diagram-assets~run()
Main execution function for building diagram assets.

**Kind**: inner method of [<code>scripts\build-diagram-assets</code>](#module_scripts\build-diagram-assets)  
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

<a name="DIAGRAM_BLOCK_RE"></a>

## DIAGRAM\_BLOCK\_RE
Regex finds: diagram: `...` /

**Kind**: global constant  
<a name="CORE_TYPES"></a>

## CORE\_TYPES
VALID_MERMAID_TYPES --------------------------------------------------------------------------- Hybrid strict mode: - CORE_TYPES are always allowed - EXTENDED_TYPES are allowed but validated more strictly /

**Kind**: global constant  
<a name="OUTPUT_DIR"></a>

## OUTPUT\_DIR
Output directory for rendered PNG assets. This directory is expected to be committed or published alongside generated documentation. /

**Kind**: global constant  
<a name="VIEWPORT"></a>

## VIEWPORT
Fixed viewport ensures: - Consistent diagram scaling - Predictable text wrapping - Stable screenshot output across environments /

**Kind**: global constant  
<a name="addReactKeys"></a>

## addReactKeys(file, api) ⇒ <code>string</code>
Main codemod function that traverses the AST to find JSX elementsreturned from array `.map()` calls and adds missing `key` props.The function uses `jscodeshift` to manipulate the AST and applies the following logic:1. Identify `.map()` calls and their callback functions.2. For each JSX element returned from the callback, check if it already has a `key` prop.3. If not, attempt to add a `key` prop using the following priority:   a. If the callback has an item parameter (e.g., `item`), use `item.id` as the key.   b. If the callback has an index parameter (e.g., `index`), use the index as a fallback key.4. Skip any JSX elements that already have a `key` prop defined.

**Kind**: global function  
**Returns**: <code>string</code> - The transformed source code with added `key` props.  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>\*</code> | The file object provided by `jscodeshift`, containing the source code to be transformed. |
| api | <code>\*</code> | The `jscodeshift` API object, used for AST manipulation. |

<a name="fixUnusedMapIndex"></a>

## fixUnusedMapIndex(file, api) ⇒ <code>string</code>
Main codemod function that traverses the AST to find `.map()` calls and renames unused index parameters to `_index`.The function uses `jscodeshift` to manipulate the AST and applies the following logic:1. Identify `.map()` calls and their callback functions.2. Check if the callback has at least two parameters (item and index).3. Verify that the second parameter (index) is an Identifier.4. Traverse the callback body to check if the index parameter is referenced.5. If the index parameter is not used, rename it to `_index`.

**Kind**: global function  
**Returns**: <code>string</code> - Updated source code after codemod transformations.  

| Param | Type |
| --- | --- |
| file | <code>\*</code> | 
| api | <code>\*</code> | 

<a name="fixJsdocImportTypes"></a>

## fixJsdocImportTypes(file, api) ⇒ <code>string</code>
Codemod function that rewrites unsupported JSDoc `import()` type references into plain type identifiers.

**Kind**: global function  
**Returns**: <code>string</code> - The transformed source code with fixed JSDoc import types.  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>\*</code> | The file object provided by `jscodeshift`, containing the source code to be transformed. |
| api | <code>\*</code> | The `jscodeshift` API object, used for AST manipulation. |

<a name="stripInit"></a>

## stripInit()
Removes the Mermaid init block for structural validation only. /

**Kind**: global function  
<a name="extractSources"></a>

## extractSources()
Extracts all Mermaid source strings from a diagram block. /

**Kind**: global function  
<a name="lintDiagram"></a>

## lintDiagram()
Performs structural validation on a single Mermaid diagram block. /

**Kind**: global function  
<a name="lintDiagram..isCore"></a>

### lintDiagram~isCore
RULE: Diagram type validation (hybrid strict). /

**Kind**: inner constant of [<code>lintDiagram</code>](#lintDiagram)  
<a name="run"></a>

## run()
ENTRYPOINT BEHAVIOR /

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

