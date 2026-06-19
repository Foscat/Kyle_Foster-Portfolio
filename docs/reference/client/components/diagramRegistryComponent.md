# diagramRegistryComponent

- Source: `src/components/features/CustomDiagram/core/diagramRegistry.js`

# diagramRegistryComponent

## src\\components\\features\\CustomDiagram\\core\\diagramRegistry

src\components\features\CustomDiagram\core\diagramRegistry module.

### registerDiagram()

Register a diagram configuration. The config is opaque to the registry, but will be used by the diagram factory to produce renderable Mermaid sources.

**Parameters**

- `id` (`string`)
- `entry` (`object`) - { title, type, config, description?, tags? }

### getDiagramEntry()

Get a registered diagram entry by id.

**Parameters**

- `id` (`string`) - The diagram id.

**Returns**

- `object | undefined` - The diagram entry, or undefined if not found.

### listDiagramIds()

List registered diagram ids, sorted alphabetically.

**Returns**

- `Array<string>` - List of registered diagram ids, sorted alphabetically.

### buildDiagramSources()

Build Mermaid sources for a given diagram id. The sources are generated based on the diagram's type and config, and may include variants for different contexts (e.g., desktop vs mobile).

**Parameters**

- `id` (`string`) - The diagram id.

**Returns**

- `object` - An object containing the Mermaid sources for the diagram. The exact structure of the returned sources object depends on the diagram type and config. For example, for "architecture" diagrams, it may return an object with "desktop" and "mobile" keys, each containing a Mermaid source string variant. - The diagram factory is responsible for interpreting the diagram config and producing the appropriate Mermaid sources. The registry simply stores the configs and provides access to them. - The `buildDiagramSources()` function abstracts away the details of how the sources are generated, allowing callsites to simply request the sources for a given diagram id without needing to know about the underlying config or generation logic. - The returned sources can then be passed to a Mermaid rendering component (e.g., `MermaidDiagram`) to display the diagram in the UI. Usage example:

### buildAllDiagramSources()

Build all sources (useful for linting/CI).

**Returns**

- `Array` - An array of objects containing the diagram id, entry, and Mermaid sources.
