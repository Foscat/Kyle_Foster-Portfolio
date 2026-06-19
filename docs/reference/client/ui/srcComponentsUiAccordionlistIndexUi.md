# srcComponentsUiAccordionlistIndexUi

- Source: `src/components/ui/AccordionList/index.jsx`

# srcComponentsUiAccordionlistIndexUi

## src\\components\\ui\\AccordionList\\index

src\components\ui\AccordionList\index module.

## components/AccordionList

Fully accessible, keyboard-navigable accordion and section
navigation component with frosted-glass styling.

### AccordionList()

**Parameters**

- `props` (`Object`) - Component props.
- `props.id` (`string`, optional) - Optional DOM id applied to the outer panel and accordion.
- `props.title` (`string`, optional) - Optional title rendered in the panel header.
- `props.subtitle` (`string`, optional) - Optional subtitle rendered beneath the title.
- `props.icon` (`any`, optional) - Optional icon rendered next to the title.
- `props.items` (`Array<AccordionItem>`) - List of accordion/navigation items to render.
- `props.accordion` (`boolean`, optional, default: `true`) - Enables collapsible accordion behavior.   When false, acts as a navigational list only.
- `props.variant` (`"dark" | "light"`, optional, default: `"dark"`) - Visual theme variant applied to the wrapper.
- `props.className` (`string`, optional) - Additional CSS class names applied to the wrapper.
- `props.bordered` (`boolean`, optional, default: `false`) - Whether the outer panel displays RSuite borders.

**Returns**

- `JSX.Element` - A fully accessible accordion and section navigation component. --------------------------------------------------------------------------- EXAMPLE USAGE ----------------------------------------------------------------------- <AccordionList   title="Sections"   variant="dark"   items={[     {       id: "editor",       isScroller: true,       icon: faCode,       title: "3-Panel Editor",       text: "Details about the editor system..."     },     {       id: "organizations",       isScroller: true,       icon: faPeopleGroup,       title: "Organizations",       text: "How orgs and licenses work..."     }   ]} /> ----------------------------------------------------------------------- NOTES ----------------------------------------------------------------------- • Designed to integrate with Sticky Section Nav for a unified navigation system • Automatically syncs open item with page scroll position • Accessible to screen readers and keyboard-only users • Uses RSuite's <Accordion> but replaces all header behavior with custom ARIA logic

### focusHeader()

Helper: focus a header by index

### scrollTo()

Smooth scroll to section ID in the page

### togglePanel()

Toggle accordion panel open/closed

### moveFocus()

Move keyboard focus up/down

### moveAndOpen()

Move to adjacent accordion item and open exactly that item. This keeps arrow navigation deterministic and prevents skipping middle items during rapid key repeat. /

### handleKeyDown()

Keyboard handler for each header

### AccordionItem

AccordionItem
---------------------------------------------------------------------------
Describes a single entry rendered within the AccordionList.

- Type: `Object`

**Properties**

- `id` (`string`) - DOM id of the associated page section.
- `title` (`string`) - Display title for the item.
- `text` (`string | JSX.Element`, optional) - Optional accordion panel content.
- `url` (`string`, optional) - Optional URL used for navigation.
- `local` (`boolean`, optional, default: `false`) - Whether the URL is a local route.
- `icon` (`any`, optional) - Optional icon passed to FrostedIcon.
- `isScroller` (`boolean`, optional, default: `false`) - Enables scroll-to-section behavior when activated.
