# RichText Authoring Guide

This guide defines **how to author rich, structured content** for the `RichTextBlock` component. It is intended for use in section data files and documentation-driven UI, not for free-form CMS editing.

The goals are to:

- Improve readability and scannability
- Encode semantic intent (not just formatting)
- Keep content consistent across pages
- Ensure long-term maintainability

---

## 1. Mental Model

Think of RichText as a **lightweight, typed document AST**, not HTML.

You are describing _structure and intent_, and the renderer decides presentation.

**Good RichText:**

- Uses structure to clarify ideas
- Breaks complex thoughts into readable units
- Uses emphasis sparingly and intentionally

**Bad RichText:**

- Long walls of text
- Decorative formatting without meaning
- Overuse of icons, bolding, or code

| Type         | Renders as                 |
| ------------ | -------------------------- |
| `ul`         | `<ul>`                     |
| `ol`         | `<ol>`                     |
| `li`         | `<li>` (only inside ul/ol) |
| `blockquote` | `<blockquote>`             |
| `pre`        | `<pre><code>`              |

---

## 2. Supported Node Types

| Type         | Notes                  |
| ------------ | ---------------------- |
| `text`       | Plain text             |
| `strong`     | Bold                   |
| `em`         | Italic                 |
| `a`          | Links                  |
| `inlineIcon` | Decorative inline icon |
| `code`       | Inline code only       |

```ts
type RichTextNode = {
  type:
    | 'p'
    | 'text'
    | 'strong'
    | 'em'
    | 'a'
    | 'code'
    | 'pre'
    | 'ul'
    | 'ol'
    | 'li'
    | 'blockquote'
    | 'inlineIcon'
  text?: string
  href?: string
  language?: string
  icon?: string
  children?: RichTextNode[]
}
```

---

## 3. Core Authoring Rules (Read First)

### Rule 1: Every RichText block should have **structure**

Avoid single-paragraph blocks when possible. Use multiple paragraphs, lists, or callouts.

### Rule 2: Formatting must communicate meaning

- `strong` = importance or turning point
- `em` = nuance, constraint, or clarification
- `blockquote` = reflection, framing, or emphasis

### Rule 3: Lists should replace dense prose

If a paragraph contains multiple clauses or ideas, consider a list.

### Rule 4: Icons are semantic anchors

Use `inlineIcon` to _signal_ a concept, not decorate text.

---

## 4. Node-by-Node Usage Guide

### `p` (Paragraph)

**Use for:** Primary narrative content

```js
{
  type: 'p',
  children: [
    { type: 'text', text: 'This paragraph explains the main idea.' }
  ]
}
```

Best practices:

- 1–3 sentences per paragraph
- Split paragraphs when ideas change

---

### `text`

**Use for:** Plain text nodes

Notes:

- `text` should never contain formatting
- Formatting is always expressed by parent nodes

---

### `strong`

**Use for:** Key concepts, conclusions, or role definitions

```js
{ type: 'strong', text: 'Core responsibility' }
```

Do:

- Highlight architectural decisions
- Emphasize role ownership

Avoid:

- Bolding entire sentences
- Repeating emphasis multiple times per paragraph

---

### `em`

**Use for:** Nuance, constraints, or intent

```js
{ type: 'em', text: 'trade-offs and constraints' }
```

Good for:

- Contextual qualifiers
- Soft emphasis without visual dominance

---

### `ul` / `ol` / `li`

**Use for:** Structured thinking, clarity, scannability

```js
{
  type: 'ul',
  children: [
    { type: 'li', children: [{ type: 'text', text: 'First idea' }] },
    { type: 'li', children: [{ type: 'text', text: 'Second idea' }] }
  ]
}
```

Guidelines:

- Lists should follow a paragraph that introduces them
- Prefer `ul` unless order matters

---

### `blockquote`

**Use for:** Reflection, framing, or perspective shifts

```js
{
  type: 'blockquote',
  children: [
    { type: 'text', text: 'This moment marked a shift in how I approached software.' }
  ]
}
```

Common patterns:

- Lessons learned
- Perspective statements
- Framing transitions

---

### `inlineIcon` Emoji Emphasis

**Use for:** Semantic callouts

```js
{ type: 'inlineIcon', icon: '💡' }
```

Best used:

- At the start of blockquotes
- To signal warnings, insights, or milestones

Avoid:

- Repeating icons within the same block
- Using icons mid-sentence without purpose

---

### `code` (Inline)

**Use for:** Small technical references

```js
{ type: 'code', text: 'fetch()' }
```

Good for:

- Function names
- API calls
- File names

---

### `pre` (Code Block)

**Use for:** Illustrative examples, not full implementations

```js
{
  type: 'pre',
  language: 'js',
  text: `loadData()
  .then(render)
  .catch(handleError)`
}
```

Rules:

- Keep blocks short
- Use pseudocode when possible
- Prefer explanation over completeness

---

## 5. Common Patterns

### Problem → List → Reflection

- Paragraph explaining the problem
- List breaking down constraints
- Blockquote reflecting on impact

### Solution → Emphasis → Example

- Paragraph describing solution
- `strong` highlighting ownership
- Small `pre` block grounding it technically

---

## 6. Anti-Patterns

Avoid:

- Walls of text
- Decorative formatting
- Lists without introduction
- Code blocks used as documentation dumps
- Icons used purely for visuals

---

## 7. Authoring Checklist

Before committing a RichText block, ask:

- Does this use structure intentionally?
- Would a list be clearer than prose?
- Is emphasis earned or decorative?
- Does this read well when skimmed?

---

## 8. Final Principle

> RichText is not about looking fancy.
> It is about **encoding meaning so the UI can do the right thing**.

When in doubt, choose clarity over cleverness.
