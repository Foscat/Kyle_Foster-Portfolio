# fixJsdocImportTypesScript

- Source: `scripts/codemods/fix-jsdoc-import-types.js`

# fixJsdocImportTypesScript

## fixJsdocImportTypes()

Codemod function that rewrites unsupported JSDoc `import()` type references into plain type identifiers.

**Parameters**

- `file` (`any`) - The file object provided by `jscodeshift`, containing the source code to be transformed.
- `api` (`any`) - The `jscodeshift` API object, used for AST manipulation.

**Returns**

- `string` - The transformed source code with fixed JSDoc import types.
