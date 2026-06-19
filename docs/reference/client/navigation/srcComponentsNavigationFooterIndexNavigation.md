# srcComponentsNavigationFooterIndexNavigation

- Source: `src/components/navigation/Footer/index.jsx`

# srcComponentsNavigationFooterIndexNavigation

## components/Footer

Compact application footer providing quiet page closure,
secondary social actions, and copyright information.

### currentYear

Current year used for copyright display. Computed at render time to avoid manual updates. /

### Footer()

Footer
---------------------------------------------------------------------------
Minimal, mobile-first application footer.

Responsibilities:
- Provide visual closure at the end of each page
- Offer secondary social/profile actions
- Display copyright information

Design philosophy:
- Footer should be unobtrusive and visually calm
- Avoid heavy glassmorphism and large vertical padding
- Never compete with page content or navigation

Layout behavior:
- Mobile: stacked, centered, minimal height
- Desktop: inline, horizontally distributed

Accessibility:
- All interactive controls use the custom `Btn` component
- Icon-only buttons include `aria-label` attributes
- No hover-only affordances required for usability

**Returns**

- `JSX.Element` - Rendered application footer.
