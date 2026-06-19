# customDiagramComponent

- Source: `src/components/features/CustomDiagram/core/customDiagram.js`

# customDiagramComponent

## src\\components\\features\\CustomDiagram\\core\\customDiagram

src\components\features\CustomDiagram\core\customDiagram module.

### diagram

Diagram helper that injects a standard architecture layer palette into flowchart diagrams and formats with Mermaid init.
This ensures consistent styling and layer definitions across all architecture diagrams without requiring manual palette inclusion, while leaving non-flowchart diagrams unaffected.

**Parameters**

- `init` (`string`) - Mermaid init block string.
- `body` (`string`) - Mermaid diagram body string.

**Returns**

- `string` - Fully formatted Mermaid diagram string with palette injection for flowcharts. The function checks if the diagram body contains a flowchart definition. If it does, it verifies whether the architecture layer palette is already included to avoid duplication. If the palette is missing, it injects the palette immediately after the first flowchart header. Finally, it formats the entire diagram with the provided Mermaid init block for consistent styling and rendering. This helper abstracts away the need for manual palette management in architecture diagrams, ensuring that all such diagrams adhere to a unified visual language while allowing other diagram types to remain unaffected.

### architectureDiagram

- Custom diagram builder for layered architecture diagrams with built-in validation and styling conventions. This function abstracts the complexity of Mermaid syntax while enforcing a consistent structure and visual language for architecture diagrams, making it easier to create clear and maintainable architectural visuals.

Key features:
- Layered structure with subgraphs for clear separation of concerns
- Class assignment for consistent styling of components, datastores, and external systems
- Edge validation to ensure all connections reference valid nodes

Enforces:
- Subgraph per layer
- Class assignment per layer
- Datastore formatting
- Deterministic structure

**Parameters**

- `init` (`string`) - Mermaid init block
- `config` (`Object`) - Architecture configuration

**Returns**

- `string` - Mermaid diagram string

**Throws**

- Value - Will throw an error if the configuration is invalid (e.g., missing node ids, duplicate ids, edges referencing unknown nodes).
- Value - Will throw an error if the configuration is invalid (e.g., missing node ids, duplicate ids, edges referencing unknown nodes).

**Examples**

```js
Given the following configuration:

const config = {
layers: [
 {
  key: "application",
 label: "Application Layer",
 className: "layerApplication",
 nodes: [
   { id: "AppState", label: "Central State Store", type: "datastore" },
],
},
{
 key: "presentation",
label: "Presentation Layer",
className: "layerPresentation",
nodes: [
 { id: "ChartUI", label: "Chart Interface" },
 { id: "MemeUI", label: "Meme Generator" },
],
},
],
edges: [
 { from: "AppState", to: "ChartUI" },
 { from: "MemeUI", to: "AppState" },
],
};

Calling `architectureDiagram("", config)` will produce a Mermaid diagram string that represents the defined architecture, with "AppState" as a datastore in the Application Layer, "ChartUI" and "MemeUI" as components in the Presentation Layer, and edges connecting them according to the specified relationships. The diagram will include appropriate class definitions for styling and will be formatted for rendering in a Mermaid-compatible environment.

The output will be a Mermaid diagram string representing the defined architecture, with appropriate subgraphs, classes, and edges, ready for rendering in a Mermaid-compatible environment.
```
