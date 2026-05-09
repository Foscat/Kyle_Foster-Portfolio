# RSuite Component Patterns

## Common Scaffolds

- CRUD table page: toolbar + filter form + table + pagination + row actions modal.
- Form page: `Form` + `Schema.Model` validation + submit/cancel actions + inline help text.
- Feedback flow: `Loader` during fetch, `Message`/`Notification` for success and failure.

## Accessibility Checklist

- Every interactive control has visible label text.
- Modal and drawer flows restore focus to trigger element.
- Error messaging is specific and paired with field-level indicators.
- Color is not the only indicator of status.
