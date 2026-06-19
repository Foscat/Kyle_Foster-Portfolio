# addReactKeysScript

- Source: `scripts/codemods/add-react-keys.js`

# addReactKeysScript

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
