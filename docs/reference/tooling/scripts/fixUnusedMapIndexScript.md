# fixUnusedMapIndexScript

- Source: `scripts/codemods/fix-unused-map-index.js`

# fixUnusedMapIndexScript

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
