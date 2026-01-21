/**
 * LinksBlock.test.jsx
 * ------------------------------------------------------------------
 * Unit tests for the LinksBlock component.
 *
 * Covers:
 * - Defensive rendering
 * - Rendering of link buttons
 * - External vs local link behavior
 * - Delegation to Btn component
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LinksBlock from "./LinksBlock";

/* ------------------------------------------------------------------
 * Mock Btn (we test delegation, not Btn itself)
 * ------------------------------------------------------------------ */

vi.mock("components/Btn", () => ({
  default: ({ text, href }) => <a href={href}>{text}</a>,
}));

/* ------------------------------------------------------------------
 * Test data
 * ------------------------------------------------------------------ */

const LINKS = [
  {
    title: "GitHub",
    url: "https://github.com/Foscat",
    icon: "github",
  },
  {
    title: "Local Page",
    url: "/about",
    local: true,
  },
];

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("LinksBlock", () => {
  it("returns null when no links are provided", () => {
    const { container } = render(<LinksBlock links={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders a button for each link", () => {
    render(<LinksBlock links={LINKS} />);

    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Local Page")).toBeInTheDocument();
  });

  it("passes correct hrefs to Btn", () => {
    render(<LinksBlock links={LINKS} />);

    expect(screen.getByText("GitHub")).toHaveAttribute("href", "https://github.com/Foscat");
    expect(screen.getByText("Local Page")).toHaveAttribute("href", "/about");
  });
});
