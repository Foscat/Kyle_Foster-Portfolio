# normalizeMermaidScript

- Source: `scripts/diagrams/normalizeMermaid.js`

# normalizeMermaidScript

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
