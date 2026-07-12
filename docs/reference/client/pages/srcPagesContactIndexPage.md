# srcPagesContactIndexPage

- Source: `src/pages/Contact/index.jsx`

# srcPagesContactIndexPage

## src\\pages\\Contact\\index

Contact page composed from section-driven content, resume actions, and a schema-driven form.

### module.exports()

Contact page.

Responsibilities:
- Render resume preview actions.
- Render the schema-driven contact form via SectionRenderer.
- Handle async form submission state.
- Surface success and error feedback to the user.

**Returns**

- `JSX.Element` - Rendered contact page.

### resolveContactApiUrl()

Resolve the contact API endpoint from Vite configuration.

The deployed portfolio is static, so production needs a full cross-origin
Render endpoint while tests and local preview can keep using `/api/contact`.

**Parameters**

- `configuredUrl` (`string`, optional) - Optional base URL or full contact endpoint.

**Returns**

- `string` - Normalized contact API URL.

### buildContactRequestPayload()

Build the payload expected by the deployed email microservice.

**Parameters**

- `formValue` (`Object`) - Form values emitted by the schema-driven form.

**Returns**

- `Object` - Contact API payload.
