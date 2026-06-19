# sectionPersistenceNavigation

- Source: `src/components/navigation/helpers/sectionPersistence.js`

# sectionPersistenceNavigation

## navigation/sectionPersistence

Utilities for persisting and restoring the user's last active
section on a per-page basis using sessionStorage.

### saveLastSection

Persists the currently active section ID for the current page.

Intended to be called by scroll-spy or navigation logic whenever the
active section changes.

No-op if a falsy section ID is provided.

**Parameters**

- `sectionId` (`string`) - ID of the active section to persist.

**Returns**

- `void`

### loadLastSection

Loads the last persisted section ID for the current page.

Returns `null` if no section has been saved for the current route.

**Returns**

- `string | null` - Previously saved section ID, if available.

### getPageKey()

Generates a storage key scoped to the current page pathname.

This ensures section state is isolated per route and does not leak
across different pages within the application.

**Returns**

- `string` - Namespaced sessionStorage key.
