# formatMermaidScript

- Source: `scripts/diagrams/format-mermaid.js`

# formatMermaidScript

## scripts/diagrams/format-mermaid

Deterministic formatter for Mermaid diagram source strings.

This module operates on raw Mermaid source text and enforces:
- Structural indentation
- Whitespace normalization
- Mermaid grammar safety (Mermaid v11 compatible)

Characteristics:
- Pure function (no side effects)
- Idempotent (repeated runs produce the same output)
- Project-agnostic (safe to reuse elsewhere)

IMPORTANT:
- This module does NOT read or write files
- It does NOT validate diagram correctness
- It only normalizes formatting

### module.exports()

Formats a Mermaid diagram source string into a deterministic,
readable, and Mermaid-safe structure.

This function is intentionally:
- Pure (no side effects)
- Idempotent (safe to run multiple times)
- Structural-only (never changes semantic meaning)

It does NOT validate diagrams — linting is handled separately.

**Parameters**

- `source` (`string`) - Raw Mermaid source text.

**Returns**

- `string` - Canonically formatted Mermaid source.

## text

Step 1: Normalize line endings and indentation characters - Converts Windows CRLF to LF for consistency - Replaces tabs with two spaces (Mermaid is indentation-sensitive) /

## init

Step 2: Extract Mermaid init block (if present) Mermaid requires the init block (%%{init: ... }%%) to appear at the very top of the diagram. We temporarily remove it so the body can be formatted independently, then reattach it later. /

## body

Step 5: Reassemble the formatted body - Trim trailing whitespace - Preserve internal blank lines /

## bodyLines

Step 6: Ensure readability rule — insert a blank line after the diagram declaration Example: flowchart TD A --> B This improves readability and prevents Mermaid parsing edge cases. /
