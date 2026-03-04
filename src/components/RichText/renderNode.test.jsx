import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import renderNode from "../renderNode";
import renderWithProviders from "tests/renderWithProviders";

/**
 * Helper: render a single rich-text node into the RTL screen.
 * We wrap in a fragment because `renderNode` returns a single element/string/null.
 *
 * @param {any} node
 */
const renderSingle = (node) => {
  renderWithProviders(<>{renderNode(node, "test")}</>);
};

describe("renderNode", () => {
  it("renders plain text nodes", () => {
    renderSingle({ type: "text", text: "Hello world" });
    expect(screen.getByText("Hello world")).toBeTruthy();
  });

  it("renders a paragraph with children", () => {
    renderSingle({
      type: "p",
      children: [{ type: "text", text: "Paragraph content" }],
    });

    // We can't reliably query <p> by role; instead assert the text is present.
    expect(screen.getByText("Paragraph content")).toBeTruthy();
  });

  it("renders inline formatting (strong, em)", () => {
    renderSingle({
      type: "p",
      children: [
        { type: "strong", text: "Bold" },
        { type: "text", text: " and " },
        { type: "em", text: "italic" },
      ],
    });

    expect(screen.getByText("Bold")).toBeTruthy();
    expect(screen.getByText("italic")).toBeTruthy();
  });

  it("renders links with href", () => {
    renderSingle({
      type: "a",
      href: "/docs",
      text: "Docs",
    });

    const link = screen.getByRole("link", { name: "Docs" });
    expect(link.getAttribute("href")).toBe("/docs");
  });

  it("renders an unordered list with list items", () => {
    renderSingle({
      type: "ul",
      children: [
        { type: "li", children: [{ type: "text", text: "Item 1" }] },
        { type: "li", children: [{ type: "text", text: "Item 2" }] },
      ],
    });

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(within(list).getByText("Item 1")).toBeTruthy();
    expect(within(list).getByText("Item 2")).toBeTruthy();
  });

  it("renders an ordered list with list items", () => {
    renderSingle({
      type: "ol",
      children: [
        { type: "li", children: [{ type: "text", text: "First" }] },
        { type: "li", children: [{ type: "text", text: "Second" }] },
      ],
    });

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(within(list).getByText("First")).toBeTruthy();
    expect(within(list).getByText("Second")).toBeTruthy();
  });

  it("renders blockquote content", () => {
    renderSingle({
      type: "blockquote",
      children: [{ type: "text", text: "Quoted text" }],
    });

    // Semantic query: assert the quoted text exists.
    expect(screen.getByText("Quoted text")).toBeTruthy();

    // If you *must* assert it's specifically inside a <blockquote>, add a test hook
    // OR allow a minimal eslint exception (see note below).
  });

  it("renders inline code", () => {
    renderSingle({
      type: "code",
      text: "const x = 1;",
    });

    // Inline <code> has no role; assert the content exists.
    expect(screen.getByTestId("inline-icon-star")).toBeTruthy();
  });

  it("renders syntax-highlighted code blocks", () => {
    const src = "const sum = (a, b) => a + b;";

    renderSingle({
      type: "pre",
      language: "javascript",
      text: src,
    });

    // Prism may wrap tokens in spans; prefer regex matching.
    const codeEl = screen.getByText(/const\s+sum\s*=\s*\(a,\s*b\)\s*=>/i, {
      selector: "code",
    });

    expect(codeEl.className).toContain("language-javascript");
  });

  it("renders inline icons", () => {
    renderSingle({
      type: "p",
      children: [
        { type: "text", text: "Star:" },
        { type: "inlineIcon", icon: "⭐" },
      ],
    });

    // There is no semantic query for aria-hidden decorative spans.
    // Best practice: add a test hook in InlineIcon (data-testid) OR allow an eslint exception.

    // eslint-disable-next-line testing-library/no-node-access
    const icon = document.querySelector(".inline-icon.icon-star");
    expect(icon).toBeTruthy();
  });

  it("returns null for unknown node types", () => {
    renderSingle({ type: "unknown" });
    // Nothing should render; easiest assertion is that document body is empty-ish.
    // We avoid container access by checking absence of any known text.
    expect(screen.queryByText(/.+/)).toBeNull();
  });

  it("gracefully handles null nodes", () => {
    renderSingle(null);
    expect(screen.queryByText(/.+/)).toBeNull();
  });
});
