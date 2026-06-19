# indexNavigation

- Source: `src/components/navigation/index.jsx`

# indexNavigation

## components/navigation

Centralized export module for all navigation-related components and helpers. This file serves as a single point of import for all navigation elements across the codebase, promoting modularity and ease of maintenance.

Note: When adding new navigation components or helpers, simply import them here and include them in the export statement.

### withLazySuspense()

Higher-order component that wraps a lazy-loaded component with React's Suspense for code-splitting and performance optimization.
HOC to wrap a lazy-loaded component with Suspense.
This allows us to keep the benefits of code-splitting while maintaining a clean and consistent import pattern across our navigation components.

**Parameters**

- `loader` (`function`) - Function that dynamically imports the component.
- `displayName` (`string`) - Display name for the wrapped component.

**Returns**

- `React.ComponentType` - - Wrapped component with Suspense.

**Examples**

```js
```js
const LazyComponent = withLazySuspense(() => import("./MyComponent"), "MyComponent");
```
```
