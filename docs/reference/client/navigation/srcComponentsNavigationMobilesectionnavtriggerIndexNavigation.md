# srcComponentsNavigationMobilesectionnavtriggerIndexNavigation

- Source: `src/components/navigation/MobileSectionNavTrigger/index.jsx`

# srcComponentsNavigationMobilesectionnavtriggerIndexNavigation

## components/MobileSectionNavTrigger

Mobile drawer-based section navigation with collapsible subsections.

Design:
- Section title click → navigate to section
- Caret/menu open → expand subsection list
- Subsection click → navigate to block
- Active state is derived from scroll-spy (passed from parent)

This component does NOT manage scroll state.
It only reflects and forwards user intent.
The parent component (e.g. SectionRenderer) is responsible for:
- Tracking scroll position
- Determining active section/block IDs
- Managing expanded state of sections
- Handling actual navigation (e.g. scrollIntoView)

### MobileSectionNavTrigger

Mobile drawer-based section navigation with collapsible subsections.

**Parameters**

- `props` (`object`)
- `props.title` (`string`) - Title displayed in the drawer header.
- `props.sections` (`Array`) - List of sections. Each section may contain a `navItems`   array (takes priority) or a `blocks` array for subsection navigation.
- `props.activeLeafId` (`string`) - ID of the currently active block (for highlighting).
- `props.activeChain` (`Array`) - List of active section IDs in the current scroll path.
- `props.isExpanded` (`function`) - Function to determine if a section's subsections are expanded.
- `props.onToggleSection` (`function`) - Callback to toggle a section's expanded state.
- `props.navigate` (`function`) - Callback to handle navigation when a section or block is clicked.

**Returns**

- `JSX.Element`

**Examples**

```js
```js
<MobileSectionNavTrigger
 title="Page Navigation"
sections={[
     { id: "intro", title: "Introduction", blocks: [] },
     { id: "features", title: "Features", blocks: [
         { id: "feat1", title: "Feature 1" },
         { id: "feat2", title: "Feature 2" },
       ]
     },
     { id: "contact", title: "Contact", blocks: [] },
  ]}
activeLeafId="feat1"
activeChain={["features", "feat1"]}
isExpanded={(id) => id === "features"}
onToggleSection={(id) => console.log("Toggle section", id)}
navigate={(e, id) => console.log("Navigate to", id)}
/>
```
```
