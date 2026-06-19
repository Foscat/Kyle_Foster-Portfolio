# srcPagesContactIndexPage

- Source: `src/pages/Contact/index.jsx`

# srcPagesContactIndexPage

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
