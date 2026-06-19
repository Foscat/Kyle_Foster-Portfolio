# Scripts

## scripts/diagrams/build-diagram-assets

scripts/diagrams/build-diagram-assets module.

### run()

Main execution function for building diagram assets.

## scripts/diagrams/format-mermaid

Deterministic formatter for Mermaid diagram source strings.

This module operates on raw Mermaid source text and enforces:
- Structural indentation
- Whitespace normalization
- Mermaid grammar safety (Mermaid v11 compatible)

Characteristics:
- Pure function (no side effects)
- Idempotent (repeated runs produce the same output)
- Project-agnostic (safe to reuse elsewhere)

IMPORTANT:
- This module does NOT read or write files
- It does NOT validate diagram correctness
- It only normalizes formatting

### module.exports()

Formats a Mermaid diagram source string into a deterministic,
readable, and Mermaid-safe structure.

This function is intentionally:
- Pure (no side effects)
- Idempotent (safe to run multiple times)
- Structural-only (never changes semantic meaning)

It does NOT validate diagrams — linting is handled separately.

**Parameters**

- `source` (`string`) - Raw Mermaid source text.

**Returns**

- `string` - Canonically formatted Mermaid source.

## DIAGRAM\_BLOCK\_RE

Regex finds: diagram: `...` /

## CORE\_TYPES

VALID_MERMAID_TYPES --------------------------------------------------------------------------- Hybrid strict mode: - CORE_TYPES are always allowed - EXTENDED_TYPES are allowed but validated more strictly /

## OUTPUT\_DIR

Output directory for rendered PNG assets. This directory is expected to be committed or published alongside generated documentation. /

## VIEWPORT

Fixed viewport ensures: - Consistent diagram scaling - Predictable text wrapping - Stable screenshot output across environments /

## addReactKeys()

Main codemod function that traverses the AST to find JSX elements
returned from array `.map()` calls and adds missing `key` props.
The function uses `jscodeshift` to manipulate the AST and applies the following logic:
1. Identify `.map()` calls and their callback functions.
2. For each JSX element returned from the callback, check if it already has a `key` prop.
3. If not, attempt to add a `key` prop using the following priority:
   a. If the callback has an item parameter (e.g., `item`), use `item.id` as the key.
   b. If the callback has an index parameter (e.g., `index`), use the index as a fallback key.
4. Skip any JSX elements that already have a `key` prop defined.

**Parameters**

- `file` (`any`) - The file object provided by `jscodeshift`, containing the source code to be transformed.
- `api` (`any`) - The `jscodeshift` API object, used for AST manipulation.

**Returns**

- `string` - The transformed source code with added `key` props.

## fixJsdocImportTypes()

Codemod function that rewrites unsupported JSDoc `import()` type references into plain type identifiers.

**Parameters**

- `file` (`any`) - The file object provided by `jscodeshift`, containing the source code to be transformed.
- `api` (`any`) - The `jscodeshift` API object, used for AST manipulation.

**Returns**

- `string` - The transformed source code with fixed JSDoc import types.

## fixUnusedMapIndex()

Main codemod function that traverses the AST to find `.map()` calls and renames unused index parameters to `_index`.
The function uses `jscodeshift` to manipulate the AST and applies the following logic:
1. Identify `.map()` calls and their callback functions.
2. Check if the callback has at least two parameters (item and index).
3. Verify that the second parameter (index) is an Identifier.
4. Traverse the callback body to check if the index parameter is referenced.
5. If the index parameter is not used, rename it to `_index`.

**Parameters**

- `file` (`any`)
- `api` (`any`)

**Returns**

- `string` - Updated source code after codemod transformations.

## stripInit()

Removes the Mermaid init block for structural validation only. /

## extractSources()

Extracts all Mermaid source strings from a diagram block. /

## lintDiagram()

Performs structural validation on a single Mermaid diagram block. /

## run()

ENTRYPOINT BEHAVIOR /

## normalizeMermaidSource()

Normalizes Mermaid diagram source for consistent linting.
This function ensures:
- Proper newline after init block
- Blank line after diagram declaration
- Consistent line endings
- Trims leading whitespace
This is a best-effort normalization to improve linting consistency.
It does NOT attempt to fully parse or validate Mermaid syntax.
It simply applies common formatting fixes to reduce false positives in linters.

**Parameters**

- `source` (`string`) - The raw Mermaid diagram source string.

**Returns**

- `string` - The normalized Mermaid diagram source string.

**Examples**

```js
```js
const source = `%%{init: {"theme": "dark"}}%%
graph TD
A --> B
`;
const normalized = normalizeMermaidSource(source);
console.log(normalized);
// Output:
// %%{init: {"theme": "dark"}}%%
// graph TD
// A --> B
```
```

## normalizeDiagrams()

Normalizes a diagram collection into a consistent array format.
Supports both object maps and legacy arrays. Applies Mermaid source normalization.
This function is designed to be flexible and forgiving, allowing for various input shapes while ensuring a predictable output structure for downstream processing.

**Parameters**

- `input` (`object | array`) - The raw diagram collection, either as an object map or an array.

**Returns**

- `array` - An array of normalized diagram entries, each with a consistent structure.

**Examples**

```js
```js
// Object map input
const diagramsMap = {
"diagram1": { diagram: "graph TD\nA --> B" },
"diagram2": { diagram: "graph LR\nC --> D" }
};
const normalizedFromMap = normalizeDiagrams(diagramsMap);
console.log(normalizedFromMap);
// Output:
// [
//   { key: "diagram1", diagram: "graph TD\nA --> B" },
//   { key: "diagram2", diagram: "graph LR\nC --> D" }
// ]

// Array input
```
```

## normalizeMermaidSource()

Normalizes a Mermaid diagram source string by removing init blocks,
normalizing line endings, and trimming leading whitespace.

**Parameters**

- `source` (`string`) - The Mermaid diagram source string.

**Returns**

- `string` - The normalized Mermaid diagram source string.

**Examples**

```js
```js
const source = `%%{init: {"theme": "dark"}}%%
graph TD
A --> B
`;
const normalized = normalizeMermaidSource(source);
console.log(normalized);
// Output:
// graph TD
// A --> B
```
```

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

**Throws**

- `Error` - If Playwright fails to launch or rendering fails.

## text

Step 1: Normalize line endings and indentation characters - Converts Windows CRLF to LF for consistency - Replaces tabs with two spaces (Mermaid is indentation-sensitive) /

## init

Step 2: Extract Mermaid init block (if present) Mermaid requires the init block (%%{init: ... }%%) to appear at the very top of the diagram. We temporarily remove it so the body can be formatted independently, then reattach it later. /

## body

Step 5: Reassemble the formatted body - Trim trailing whitespace - Preserve internal blank lines /

## bodyLines

Step 6: Ensure readability rule — insert a blank line after the diagram declaration Example: flowchart TD A --> B This improves readability and prevents Mermaid parsing edge cases. /

## isCore

RULE: Diagram type validation (hybrid strict). /
