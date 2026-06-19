# normalizeDiagramsScript

- Source: `scripts/diagrams/normalize-diagrams.js`

# normalizeDiagramsScript

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
