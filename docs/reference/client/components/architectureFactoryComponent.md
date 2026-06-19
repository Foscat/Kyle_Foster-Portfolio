# architectureFactoryComponent

- Source: `src/components/features/CustomDiagram/core/architectureFactory.js`

# architectureFactoryComponent

## src\\components\\features\\CustomDiagram\\core\\architectureFactory

src\components\features\CustomDiagram\core\architectureFactory module.

### buildArchitectureVariants()

- Builds desktop and mobile Mermaid sources from a single architecture config.

Mobile rules:
- Default direction becomes TB unless explicitly set by config.mobile.direction
- Optionally stack layer order unchanged (TB handles readability)

**Parameters**

- `config` (`object`) - Base architecture config

**Returns**

- `Object`
