# resolveDiagramsComponent

- Source: `src/components/features/CustomDiagram/core/resolveDiagrams.js`

# resolveDiagramsComponent

## src\\components\\features\\CustomDiagram\\core\\resolveDiagrams

src\components\features\CustomDiagram\core\resolveDiagrams module.

### resolveDiagram()

- Resolves diagram definitions into renderable diagrams.

**Parameters**

- `def` (`DiagramDefinition`) - Diagram definition to resolve

**Returns**

- `DiagramDefinition` - Resolved diagram definition with generated diagrams (if architecture config is present) Supports: - manual diagrams (existing system) - architecture DSL (auto generated)

### DiagramDefinition

- Type: `object`

**Properties**

- `id` (`string`) - Unique diagram identifier
- `type` (`string`) - Diagram block type (e.g. "diagram") Optional properties for architecture diagrams:
- `architecture` (`object`) - Architecture config for auto-generating diagrams
- `architecture.direction` (`string`) - Default diagram direction (e.g. "LR", "TB")
- `architecture.layers` (`Array<object>`) - Diagram layers with nodes
- `architecture.edges` (`Array<object>`) - Connections between nodes
- `architecture.mobile` (`object`) - Optional mobile-specific overrides
