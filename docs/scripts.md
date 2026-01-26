## Constants

<dl>
<dt><a href="#DIAGRAM_BLOCK_RE">DIAGRAM_BLOCK_RE</a></dt>
<dd><p>Regex finds:
diagram: <code>...</code></p>
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
</dl>

## Functions

<dl>
<dt><a href="#formatMermaid">formatMermaid(source)</a> ⇒ <code>string</code></dt>
<dd><p>Formats a Mermaid diagram source string into a deterministic,
readable, and Mermaid-safe structure.</p>
<p>This function is intentionally:</p>
<ul>
<li>Pure (no side effects)</li>
<li>Idempotent (safe to run multiple times)</li>
<li>Structural-only (never changes semantic meaning)</li>
</ul>
<p>It does NOT validate diagrams — linting is handled separately.</p>
</dd>
<dt><a href="#stripInit">stripInit(source)</a> ⇒ <code>string</code></dt>
<dd><p>Removes the Mermaid init block for structural validation only.</p>
<p>This function MUST NOT be used to mutate diagram sources.
The init block is stripped solely to simplify downstream checks
such as diagram declaration validation.</p>
</dd>
<dt><a href="#extractSource">extractSource(diagram)</a> ⇒ <code>string</code></dt>
<dd><p>Extracts and validates the Mermaid source string from a diagram block.</p>
</dd>
<dt><a href="#lintDiagram">lintDiagram(diagram)</a></dt>
<dd><p>Performs structural validation on a single Mermaid diagram block.</p>
<p>Enforced invariants:</p>
<ol>
<li>Block type must be BlockType.DIAGRAM</li>
<li>Mermaid init block must appear first</li>
<li>Tabs are forbidden (Mermaid grammar sensitivity)</li>
<li>Diagram declaration must be valid</li>
<li>Recommended readability rules are warned (not failed)</li>
</ol>
</dd>
<dt><a href="#run">run()</a></dt>
<dd><p>ENTRYPOINT BEHAVIOR</p>
<p>This script is designed to FAIL FAST.</p>
<p>Any lint violation:</p>
<ul>
<li>Throws immediately</li>
<li>Exits with a non-zero code</li>
<li>Prevents rendering, asset generation, and docs builds</li>
</ul>
<h2 id="this-is-intentional-and-critical-for-ci-safety">This is intentional and critical for CI safety.</h2>
<p>Entry point for diagram linting.</p>
<p>Normalizes diagrams, validates presence, and runs
lint checks against every diagram block.</p>
</dd>
<dt><a href="#normalizeDiagrams">normalizeDiagrams(input)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Normalizes a diagram collection into an array.</p>
<p>Accepted input formats:</p>
<ol>
<li><p>Object map:
{
  diagramId: { ...diagramData }
}</p>
</li>
<li><p>Array (legacy):
[
  { ...diagramData }
]</p>
</li>
</ol>
<p>Normalization rules:</p>
<ul>
<li>Null/undefined input yields an empty array</li>
<li>Array input is filtered to remove falsy entries</li>
<li>Object input is converted into an array with injected <code>key</code></li>
<li>Unsupported input types return an empty array</li>
</ul>
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

<a name="DIAGRAM_BLOCK_RE"></a>

## DIAGRAM\_BLOCK\_RE

Regex finds:
diagram: `...`

**Kind**: global constant  
<a name="OUTPUT_DIR"></a>

## OUTPUT\_DIR

Output directory for rendered PNG assets.

This directory is expected to be committed or published
alongside generated documentation.

**Kind**: global constant  
<a name="VIEWPORT"></a>

## VIEWPORT

Fixed viewport ensures:

- Consistent diagram scaling
- Predictable text wrapping
- Stable screenshot output across environments

**Kind**: global constant  
<a name="formatMermaid"></a>

## formatMermaid(source) ⇒ <code>string</code>

Formats a Mermaid diagram source string into a deterministic,
readable, and Mermaid-safe structure.

This function is intentionally:

- Pure (no side effects)
- Idempotent (safe to run multiple times)
- Structural-only (never changes semantic meaning)

It does NOT validate diagrams — linting is handled separately.

**Kind**: global function  
**Returns**: <code>string</code> - Canonically formatted Mermaid source.  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> | Raw Mermaid source text. |

- [formatMermaid(source)](#formatMermaid) ⇒ <code>string</code>
  - [~text](#formatMermaid..text)
  - [~init](#formatMermaid..init)
  - [~text](#formatMermaid..text)
  - [~body](#formatMermaid..body)
  - [~lines](#formatMermaid..lines)
  - [~bodyLines](#formatMermaid..bodyLines)

<a name="formatMermaid..text"></a>

### formatMermaid~text

Step 1: Normalize line endings and indentation characters

- Converts Windows CRLF to LF for consistency
- Replaces tabs with two spaces (Mermaid is indentation-sensitive)

**Kind**: inner property of [<code>formatMermaid</code>](#formatMermaid)  
<a name="formatMermaid..init"></a>

### formatMermaid~init

Step 2: Extract Mermaid init block (if present)

Mermaid requires the init block (%%{init: ... }%%)
to appear at the very top of the diagram.

We temporarily remove it so the body can be formatted
independently, then reattach it later.

**Kind**: inner property of [<code>formatMermaid</code>](#formatMermaid)  
<a name="formatMermaid..text"></a>

### formatMermaid~text

Step 3: Remove leading whitespace after the init block

This prevents accidental indentation from creeping
into the formatted output.

**Kind**: inner property of [<code>formatMermaid</code>](#formatMermaid)  
<a name="formatMermaid..body"></a>

### formatMermaid~body

Step 5: Reassemble the formatted body

- Trim trailing whitespace
- Preserve internal blank lines

**Kind**: inner property of [<code>formatMermaid</code>](#formatMermaid)  
<a name="formatMermaid..lines"></a>

### formatMermaid~lines

Step 4: Line-by-line structural formatting

We re-indent based on Mermaid block structure rather
than trusting existing whitespace.

**Kind**: inner constant of [<code>formatMermaid</code>](#formatMermaid)  
<a name="formatMermaid..bodyLines"></a>

### formatMermaid~bodyLines

Step 6: Ensure readability rule —
insert a blank line after the diagram declaration

Example:
  flowchart TD

  A --> B

This improves readability and prevents Mermaid
parsing edge cases.

**Kind**: inner constant of [<code>formatMermaid</code>](#formatMermaid)  
<a name="stripInit"></a>

## stripInit(source) ⇒ <code>string</code>

Removes the Mermaid init block for structural validation only.

This function MUST NOT be used to mutate diagram sources.
The init block is stripped solely to simplify downstream checks
such as diagram declaration validation.

**Kind**: global function  
**Returns**: <code>string</code> - Diagram source without the init block.  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> | Raw Mermaid diagram source. |

<a name="extractSource"></a>

## extractSource(diagram) ⇒ <code>string</code>

Extracts and validates the Mermaid source string from a diagram block.

**Kind**: global function  
**Returns**: <code>string</code> - Mermaid source.  
**Throws**:

- <code>Error</code> If the diagram source is missing or invalid.

| Param | Type | Description |
| --- | --- | --- |
| diagram | <code>Object</code> | Normalized diagram block. |

<a name="lintDiagram"></a>

## lintDiagram(diagram)

Performs structural validation on a single Mermaid diagram block.

Enforced invariants:

1. Block type must be BlockType.DIAGRAM
2. Mermaid init block must appear first
3. Tabs are forbidden (Mermaid grammar sensitivity)
4. Diagram declaration must be valid
5. Recommended readability rules are warned (not failed)

**Kind**: global function  
**Throws**:

- <code>Error</code> If any required invariant is violated.

| Param | Type | Description |
| --- | --- | --- |
| diagram | <code>Object</code> | Normalized diagram block. |

- [lintDiagram(diagram)](#lintDiagram)
  - [~source](#lintDiagram..source)
  - [~lines](#lintDiagram..lines)

<a name="lintDiagram..source"></a>

### lintDiagram~source

RULE: Diagram source must exist and be non-empty.

Empty diagram blocks indicate:

- Corrupt data
- Incomplete migrations
- Authoring mistakes

We fail early here to avoid downstream scripts
attempting to format or render invalid input.

**Kind**: inner constant of [<code>lintDiagram</code>](#lintDiagram)  
<a name="lintDiagram..lines"></a>

### lintDiagram~lines

READABILITY RULE (Warning Only)

These checks do NOT fail linting.
They exist to:

- Encourage consistent visual structure
- Improve maintainability of diagrams
- Reduce review friction

Warnings should never block CI unless explicitly promoted
to hard rules.

**Kind**: inner constant of [<code>lintDiagram</code>](#lintDiagram)  
<a name="run"></a>

## run()

ENTRYPOINT BEHAVIOR

This script is designed to FAIL FAST.

Any lint violation:

- Throws immediately
- Exits with a non-zero code
- Prevents rendering, asset generation, and docs builds

This is intentional and critical for CI safety
------------------------------------------------------------

Entry point for diagram linting.

Normalizes diagrams, validates presence, and runs
lint checks against every diagram block.

**Kind**: global function  
**Throws**:

- <code>Error</code> If no diagrams are found or linting fails.

<a name="normalizeDiagrams"></a>

## normalizeDiagrams(input) ⇒ <code>Array.&lt;Object&gt;</code>

Normalizes a diagram collection into an array.

Accepted input formats:

1. Object map:
   {
     diagramId: { ...diagramData }
   }

2. Array (legacy):
   [
     { ...diagramData }
   ]

Normalization rules:

- Null/undefined input yields an empty array
- Array input is filtered to remove falsy entries
- Object input is converted into an array with injected `key`
- Unsupported input types return an empty array

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - Normalized diagram array suitable for downstream processing.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Object.&lt;string, Object&gt;</code> \| <code>Array.&lt;Object&gt;</code> \| <code>undefined</code> \| <code>null</code> | Raw diagram collection. |

<a name="render"></a>

## render()

Renders all Mermaid diagram blocks to PNG images.

Execution flow:

1. Ensure output directory exists
2. Launch headless Chromium
3. Load Mermaid in an isolated HTML shell
4. Inject diagram source one at a time
5. Screenshot rendered output
6. Close browser

This function is intentionally sequential to:

- Avoid race conditions in Mermaid rendering
- Prevent memory pressure from concurrent pages

**Kind**: global function  
**Throws**:

- <code>Error</code> If Playwright fails to launch or rendering fails.
