# UI Type System

This UI kit uses a **JSDoc-first type system** designed to provide:

- Strong editor IntelliSense
- Runtime-safe enums
- Accurate generated documentation
- A clean migration path to TypeScript

---

## Design Principles

### 1. Single Source of Truth

All shared UI contracts live in `src/types/ui.types.js`.

This includes:

- Enums
- Data shapes
- Callback signatures
- Default object factories

---

### 2. Runtime vs Documentation Types

| Type of construct | Exists at runtime | Used in docs |
| ------------------ | ------------------ | -------------- |
| Enums (`Size`) | ✅ | ✅ |
| Typedefs (`FeatureSection`) | ❌ | ✅ |
| Callbacks (`ClickHandler`) | ❌ | ✅ |
| Factories (`createFeatureSection`) | ✅ | ✅ |

---

### 3. Why Literal Unions Are Used

JSDoc does **not support** advanced TypeScript syntax such as:

- `keyof`
- Indexed access (`Type[keyof Type]`)
- Conditional types

Therefore:

- Shared typedefs use **literal unions**
- Component props may use `Enum[keyof Enum]` for editor ergonomics

This keeps documentation generation stable.

---

### 4. How Components Should Use Types

```js
import { Size, Variant } from "@/types/ui.types";

/**
 * @param {Size[keyof Size]} props.size
 * @param {Variant[keyof Variant]} props.variant
 */
