# srcAssetsHooksUsescrollspyIndexHook

- Source: `src/assets/hooks/useScrollSpy/index.js`

# srcAssetsHooksUsescrollspyIndexHook

## assets/hooks/useScrollSpy

Hierarchical scroll-spy with URL history synchronization.

Responsibilities:
- Observes section + subsection elements using IntersectionObserver
- Tracks the currently active *leaf* node (deepest visible section)
- Derives the active parent chain from the leaf
- Syncs URL hash without page jumps
- Supports programmatic scrolling without feedback loops

Design principles:
- Scroll position is the single source of truth
- Navigation clicks cause scroll, not state writes
- Only the observer updates active state

This hook is safe to use with:
- Sticky desktop nav
- Mobile drawer nav
- Collapsible subsection dropdowns

### useScrollSpyWithHistory()

useScrollSpyWithHistory

**Parameters**

- `nodes` (`Array<SectionNode>`) - Flat list of observable nodes
- `byId` (`Map<string, SectionNode>`) - Lookup map for parent traversal
- `offset` (`number`) - Sticky header offset (px)

### buildSectionTree()

Utility function that transforms a nested section/block data structure into a flat list of observable nodes with parent references. This is used to set up the IntersectionObserver and to derive active chains for scroll-spy behavior.
The function takes an array of section objects, each potentially containing an array of block objects, and produces:
- A flat array of nodes, where each node represents either a section or a block and includes its ID, type, and parent ID.
- A lookup map that allows quick access to any node by its ID, which is essential for traversing the parent chain when determining active sections.

**Parameters**

- `sections` (`Array`)

**Returns**

- `Object` - SectionNode structure: {   id: string,        // Unique identifier (section ID or block ID)   type: 'section' | 'block', // Node type   parentId: string | null // Parent section ID (null for top-level sections) } Design notes: - The function is defensive and skips any sections or blocks that lack an ID. - The resulting flat structure simplifies the IntersectionObserver setup and active chain derivation. - The byId map allows for efficient parent lookups when building the active chain from the leaf node.

**Examples**

```js
```js
const { nodes, byId } = buildSectionTree([
 {
  id: "section1",
  blocks: [
     { id: "block1" },
     { id: "block2" }
  ]
 },
 {
   id: "section2",
   blocks: []
 }
]);
nodes = [
{ id: "section1", type: "section", parentId: null },
{ id: "block1", type: "block", parentId: "section1" },
{ id: "block2", type: "block", parentId: "section1" },
{ id: "section2", type: "section", parentId: null }
]
byId = Map {
"section1" => { id: "section1", type: "section", parentId: null },
"block1" => { id: "block1", type: "block", parentId: "section1" },
"block2" => { id: "block2", type: "block", parentId: "section1" },
"section2" => { id: "section2", type: "section", parentId: null }
}
```
```

### markProgrammaticScroll()

Marks a programmatic scroll window. Navigation clicks should call this BEFORE scrolling.
