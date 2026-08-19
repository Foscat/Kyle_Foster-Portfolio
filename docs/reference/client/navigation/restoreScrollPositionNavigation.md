# restoreScrollPositionNavigation

- Source: `src/components/navigation/helpers/restoreScrollPosition.js`

# restoreScrollPositionNavigation

## src\\components\\navigation\\helpers\\restoreScrollPosition

src\components\navigation\helpers\restoreScrollPosition module.

## navigation/restoreScrollPosition

Restores the user's scroll position when a page is loaded
or reloaded by resolving a target section and scrolling it into view.

### restoreScrollPosition()

Restores the user's scroll position when a page is loaded or reloaded.

Resolution rule:
- Restore only an explicit URL hash (deep link or manual navigation).

Behavior:
- Reads the current location hash, if present
- Smoothly scrolls the resolved section into view

Design notes:
- The URL hash is treated as the source of truth to support deep linking
- `requestAnimationFrame` is used to ensure DOM layout is complete
  before attempting to scroll
- Function exits early if no valid section can be resolved

Typical usage:
- Invoked once during page or application bootstrap
- Works in conjunction with scroll-spy and section persistence utilities

**Returns**

- `void`
