# Pages

## pages/index

Barrel export for top-level page modules used by route composition.

## src\\pages\\CodeStream\\index

src\pages\CodeStream\index module.

## pages/CodeStream

Professional work case study page for CodeStream Online Studio, featuring a data-driven layout with synchronized sticky navigation and scroll-spy behavior.

### CodeStream

Professional work case study page for CodeStream Online Studio. Renders a data-driven set of sections and wires them into the sticky section navigation for long-form scanning.
Features:
- Data-driven layout defined by structured section and block metadata
- Sticky top navigation for global page access
- Sticky section navigation that auto-syncs with scroll position for easy intra-page navigation
- Responsive design with mobile-friendly navigation patterns
- Uses `SectionRenderer` to dynamically render content blocks based on type, allowing for flexible and maintainable page composition
Accessibility:
- Semantic HTML structure with landmarks and headings
- Keyboard navigable sticky navigation components

**Returns**

- `JSX.Element`

## src\\pages\\Contact\\index

Contact page composed from section-driven content and a schema-driven form.

### module.exports()

Contact page.

Responsibilities:
- Render resume preview actions.
- Render the schema-driven contact form via SectionRenderer.
- Handle async form submission state.
- Surface success and error feedback to the user.

**Returns**

- `JSX.Element` - Rendered contact page.

### module.exports()

Contact page.

Responsibilities:
- Render resume preview actions.
- Render the schema-driven contact form via SectionRenderer.
- Handle async form submission state.
- Surface success and error feedback to the user.

**Returns**

- `JSX.Element` - Rendered contact page.

### CONTACT\_API\_URL

Contact endpoint resolved from environment for deploy-specific CORS alignment.
Accepts either a full `/api/contact` URL or a service base URL.

- Type: `string`

### CONTACT\_API\_URL

Contact endpoint resolved from environment for deploy-specific CORS alignment.
Accepts either a full `/api/contact` URL or a service base URL.

- Type: `string`

### buildBundledContactMessage()

Converts schema-driven form values into a single plain-text email body.

**Parameters**

- `values` (`Record<string, unknown>`) - Raw form values.
- `schema` (`ContactFormSchema`, optional) - Contact form schema.

**Returns**

- `string` - Single bundled message string containing all form fields.

### normalizeContactPayload()

Normalizes dynamic contact form values into the mail-service payload contract.

**Parameters**

- `values` (`Record<string, unknown>`) - Raw form values from FormBlock.
- `schema` (`ContactFormSchema`, optional) - Contact form schema.

**Returns**

- `Object` - Payload sent to the contact API.

### sendMessage()

Sends a contact form payload to the mail microservice.

The request contract intentionally uses JSON because the server expects
`express.json()` parsing on the `/api/contact` route.

**Parameters**

- `values` (`Record<string, unknown>`) - Raw form values.
- `schema` (`ContactFormSchema`, optional) - Contact form schema.

**Returns**

- `Promise<{message: (string|undefined), error: (string|undefined)}>` - Parsed API payload.

**Throws**

- `Error` - When the request fails or the API returns a non-OK response.

### buildBundledContactMessage()

Converts schema-driven form values into a single plain-text email body.

**Parameters**

- `values` (`Record<string, unknown>`) - Raw form values.
- `schema` (`ContactFormSchema`, optional) - Contact form schema.

**Returns**

- `string` - Single bundled message string containing all form fields.

### normalizeContactPayload()

Normalizes dynamic contact form values into the mail-service payload contract.

**Parameters**

- `values` (`Record<string, unknown>`) - Raw form values from FormBlock.
- `schema` (`ContactFormSchema`, optional) - Contact form schema.

**Returns**

- `Object` - Payload sent to the contact API.

### sendMessage()

Sends a contact form payload to the mail microservice.

The request contract intentionally uses JSON because the server expects
`express.json()` parsing on the `/api/contact` route.

**Parameters**

- `values` (`Record<string, unknown>`) - Raw form values.
- `schema` (`ContactFormSchema`, optional) - Contact form schema.

**Returns**

- `Promise<{message: (string|undefined), error: (string|undefined)}>` - Parsed API payload.

**Throws**

- `Error` - When the request fails or the API returns a non-OK response.

### CONTACT\_API\_URL\_FALLBACK

Contact service endpoint used by the public portfolio form.
Exported for testability and to keep the request contract centralized.

- Type: `string`

### CONTACT\_API\_URL\_FALLBACK

Contact service endpoint used by the public portfolio form.
Exported for testability and to keep the request contract centralized.

- Type: `string`

### resolveContactApiUrl()

Resolves a deploy-specific contact endpoint from an environment value.
Accepts either a full `/api/contact` URL or a service base URL.
Falls back to the default endpoint if the value is missing, invalid, or not HTTP(S).

**Parameters**

- `raw` (`unknown`) - Environment-provided endpoint or base URL.

**Returns**

- `string` - Absolute contact endpoint URL.

### resolveContactApiUrl()

Resolves a deploy-specific contact endpoint from an environment value.
Accepts either a full `/api/contact` URL or a service base URL.
Falls back to the default endpoint if the value is missing, invalid, or not HTTP(S).

**Parameters**

- `raw` (`unknown`) - Environment-provided endpoint or base URL.

**Returns**

- `string` - Absolute contact endpoint URL.

### ContactFormOption

- Type: `Object`

**Properties**

- `label` (`string`, optional) - Human-readable option label.
- `value` (`any`, optional) - Raw option value from the form schema.

### ContactFormField

- Type: `Object`

**Properties**

- `name` (`string`, optional) - Field name used in submitted form values.
- `label` (`string`, optional) - User-facing label for the bundled email body.
- `options` (`Array<ContactFormOption>`, optional) - Optional select/radio choices for label resolution.

### ContactFormSchema

- Type: `Object`

**Properties**

- `fields` (`Array<ContactFormField>`, optional) - Schema fields used to normalize submitted values.

### ContactFormOption

- Type: `Object`

**Properties**

- `label` (`string`, optional) - Human-readable option label.
- `value` (`any`, optional) - Raw option value from the form schema.

### ContactFormField

- Type: `Object`

**Properties**

- `name` (`string`, optional) - Field name used in submitted form values.
- `label` (`string`, optional) - User-facing label for the bundled email body.
- `options` (`Array<ContactFormOption>`, optional) - Optional select/radio choices for label resolution.

### ContactFormSchema

- Type: `Object`

**Properties**

- `fields` (`Array<ContactFormField>`, optional) - Schema fields used to normalize submitted values.

## src\\pages\\Contact\\index

Contact page composed from section-driven content and a schema-driven form.

### module.exports()

Contact page.

Responsibilities:
- Render resume preview actions.
- Render the schema-driven contact form via SectionRenderer.
- Handle async form submission state.
- Surface success and error feedback to the user.

**Returns**

- `JSX.Element` - Rendered contact page.

### module.exports()

Contact page.

Responsibilities:
- Render resume preview actions.
- Render the schema-driven contact form via SectionRenderer.
- Handle async form submission state.
- Surface success and error feedback to the user.

**Returns**

- `JSX.Element` - Rendered contact page.

### CONTACT\_API\_URL

Contact endpoint resolved from environment for deploy-specific CORS alignment.
Accepts either a full `/api/contact` URL or a service base URL.

- Type: `string`

### CONTACT\_API\_URL

Contact endpoint resolved from environment for deploy-specific CORS alignment.
Accepts either a full `/api/contact` URL or a service base URL.

- Type: `string`

### buildBundledContactMessage()

Converts schema-driven form values into a single plain-text email body.

**Parameters**

- `values` (`Record<string, unknown>`) - Raw form values.
- `schema` (`ContactFormSchema`, optional) - Contact form schema.

**Returns**

- `string` - Single bundled message string containing all form fields.

### normalizeContactPayload()

Normalizes dynamic contact form values into the mail-service payload contract.

**Parameters**

- `values` (`Record<string, unknown>`) - Raw form values from FormBlock.
- `schema` (`ContactFormSchema`, optional) - Contact form schema.

**Returns**

- `Object` - Payload sent to the contact API.

### sendMessage()

Sends a contact form payload to the mail microservice.

The request contract intentionally uses JSON because the server expects
`express.json()` parsing on the `/api/contact` route.

**Parameters**

- `values` (`Record<string, unknown>`) - Raw form values.
- `schema` (`ContactFormSchema`, optional) - Contact form schema.

**Returns**

- `Promise<{message: (string|undefined), error: (string|undefined)}>` - Parsed API payload.

**Throws**

- `Error` - When the request fails or the API returns a non-OK response.

### buildBundledContactMessage()

Converts schema-driven form values into a single plain-text email body.

**Parameters**

- `values` (`Record<string, unknown>`) - Raw form values.
- `schema` (`ContactFormSchema`, optional) - Contact form schema.

**Returns**

- `string` - Single bundled message string containing all form fields.

### normalizeContactPayload()

Normalizes dynamic contact form values into the mail-service payload contract.

**Parameters**

- `values` (`Record<string, unknown>`) - Raw form values from FormBlock.
- `schema` (`ContactFormSchema`, optional) - Contact form schema.

**Returns**

- `Object` - Payload sent to the contact API.

### sendMessage()

Sends a contact form payload to the mail microservice.

The request contract intentionally uses JSON because the server expects
`express.json()` parsing on the `/api/contact` route.

**Parameters**

- `values` (`Record<string, unknown>`) - Raw form values.
- `schema` (`ContactFormSchema`, optional) - Contact form schema.

**Returns**

- `Promise<{message: (string|undefined), error: (string|undefined)}>` - Parsed API payload.

**Throws**

- `Error` - When the request fails or the API returns a non-OK response.

### CONTACT\_API\_URL\_FALLBACK

Contact service endpoint used by the public portfolio form.
Exported for testability and to keep the request contract centralized.

- Type: `string`

### CONTACT\_API\_URL\_FALLBACK

Contact service endpoint used by the public portfolio form.
Exported for testability and to keep the request contract centralized.

- Type: `string`

### resolveContactApiUrl()

Resolves a deploy-specific contact endpoint from an environment value.
Accepts either a full `/api/contact` URL or a service base URL.
Falls back to the default endpoint if the value is missing, invalid, or not HTTP(S).

**Parameters**

- `raw` (`unknown`) - Environment-provided endpoint or base URL.

**Returns**

- `string` - Absolute contact endpoint URL.

### resolveContactApiUrl()

Resolves a deploy-specific contact endpoint from an environment value.
Accepts either a full `/api/contact` URL or a service base URL.
Falls back to the default endpoint if the value is missing, invalid, or not HTTP(S).

**Parameters**

- `raw` (`unknown`) - Environment-provided endpoint or base URL.

**Returns**

- `string` - Absolute contact endpoint URL.

### ContactFormOption

- Type: `Object`

**Properties**

- `label` (`string`, optional) - Human-readable option label.
- `value` (`any`, optional) - Raw option value from the form schema.

### ContactFormField

- Type: `Object`

**Properties**

- `name` (`string`, optional) - Field name used in submitted form values.
- `label` (`string`, optional) - User-facing label for the bundled email body.
- `options` (`Array<ContactFormOption>`, optional) - Optional select/radio choices for label resolution.

### ContactFormSchema

- Type: `Object`

**Properties**

- `fields` (`Array<ContactFormField>`, optional) - Schema fields used to normalize submitted values.

### ContactFormOption

- Type: `Object`

**Properties**

- `label` (`string`, optional) - Human-readable option label.
- `value` (`any`, optional) - Raw option value from the form schema.

### ContactFormField

- Type: `Object`

**Properties**

- `name` (`string`, optional) - Field name used in submitted form values.
- `label` (`string`, optional) - User-facing label for the bundled email body.
- `options` (`Array<ContactFormOption>`, optional) - Optional select/radio choices for label resolution.

### ContactFormSchema

- Type: `Object`

**Properties**

- `fields` (`Array<ContactFormField>`, optional) - Schema fields used to normalize submitted values.

## pages/Hackathon

Hackathon case-study page built from structured section data and sticky navigation.

### Hackathon()

Hackathon Page
---------------------------------------------------------------------------
Long-form narrative + technical breakdown of the Daimler hackathon project.
The page is rendered from `hackathonData` for consistency with other pages.

**Returns**

- `JSX.Element`

## src\\pages\\Health\\index

src\pages\Health\index module.

## components/Health

Lightweight diagnostic component that displays basic
runtime and build environment information.

### Health()

Health
---------------------------------------------------------------------------
Displays basic system and environment health information for the application.

Intended usage:
- Developer diagnostics
- Build verification
- Quick runtime sanity checks during development or demos

Displayed information:
- React version
- Current Vite environment mode
- Build tool identification
- RSuite availability

Notes:
- This component is informational only
- No side effects or external dependencies beyond environment variables

**Returns**

- `JSX.Element` - Rendered system health panel.

## pages/Home

Home page composition that renders intro metadata, global navigation,
section-driven content, and footer utilities.

### Home()

Home Page
---------------------------------------------------------------------------
A data-driven landing page that gives recruiters and hiring managers a
high-level map of the portfolio and clear CTAs into deeper pages.

Content is rendered from lightweight page metadata plus `assets/data/content/home` sections
without touching layout code.

**Returns**

- `JSX.Element`

## pages/NotFound

404 fallback page with navigation recovery action and branded messaging.

### NotFound()

NotFound Component
------------------------------------------------------------
A polished 404 error page using RSuite components and the
frosted-glass UI system.

Features:
- Centered layout with FlexboxGrid
- Frosted glass panel styling
- Clear error messaging and recovery path
- Accessible, keyboard-friendly navigation

**Returns**

- `JSX.Element`

## pages/SideProjects

Side-projects page that renders portfolio sections from structured content metadata.

### SideProjects()

SideProjects Page
---------------------------------------------------------------------------
Data-driven portfolio page showcasing personal projects.
Renders `sideProjectsData` into consistent frosted UI sections.

**Returns**

- `JSX.Element`

## pages/SMU

Academic-project showcase page rendered from SMU content metadata.

### Smu()

SMU Page
---------------------------------------------------------------------------
Academic project showcase page.
Uses the same section/block rendering system as professional work and
side projects to keep UI and content structure consistent.

**Returns**

- `JSX.Element`

## Docs()

Docs Page
---------------------------------------------------------------------------
Full-page documentation experience for project architecture, navigation,
scripts, tests, and shared type systems.

**Returns**

- `JSX.Element`
