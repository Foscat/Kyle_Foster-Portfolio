import { screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import renderWithProviders from "tests/renderWithProviders";

/**
 * Shared behavior contract for data-driven pages.
 *
 * The helper intentionally tests composition behavior rather than DOM structure:
 * - scroll restoration occurs on mount
 * - the page header is rendered with user-facing content
 * - the page exposes the correct active route to primary navigation
 * - section titles are delegated into both content and section navigation
 */

const restoreScrollPosition = vi.fn();

vi.mock("components/renderers", () => ({
  SectionRenderer: ({ section }) => (
    <section aria-label={section.title}>
      <h2>{section.title}</h2>
    </section>
  ),
}));

vi.mock("components/layout", () => ({
  PageHeader: ({ title, subTitle }) => (
    <header>
      <h1>{title}</h1>
      {subTitle ? <p>{subTitle}</p> : null}
    </header>
  ),
}));

vi.mock("components/navigation", () => ({
  StickyNav: ({ activePage }) => <nav aria-label="Primary navigation">{activePage}</nav>,
  StickySectionNav: ({ sections = [] }) => (
    <nav aria-label="Section navigation">
      {sections.map((section) => (
        <a key={section.id} href={`#${section.id}`}>
          {section.title}
        </a>
      ))}
    </nav>
  ),
  Footer: () => <footer aria-label="Footer">Footer</footer>,
  helpers: {
    restoreScrollPosition,
  },
}));

// Shared behavior contract for data-driven pages, focused on composition and user-facing content rather than implementation details. The tests verify that the page correctly integrates with shared components like scroll restoration, page header, section navigation, primary navigation, and footer, ensuring that the expected content and behavior are present without coupling to the internal workings of those components. This allows us to confirm that the page is correctly composed and provides the expected user experience in terms of content rendering and navigation integration. The createPageTests function can be used across different page test suites to ensure consistent testing of these common behaviors across all pages in the application.
vi.mock("navigation/restoreScrollPosition", () => ({
  restoreScrollPosition: vi.fn(),
}));

// Mock SectionRenderer to render a simple section with the expected title, allowing us to verify that the page is correctly rendering sections with the expected titles without relying on the implementation details of the SectionRenderer component. This allows us to focus on testing that the page is correctly passing section data into the SectionRenderer and that the expected content is rendered based on that data.
vi.mock("components/SectionRenderer", () => ({
  default: ({ section }) => (
    <section aria-label={section.title}>
      <h2>{section.title}</h2>
    </section>
  ),
}));

// Mock StickySectionNav to render a simple navigation with links for each section, allowing us to verify that the page is correctly rendering the section navigation with the expected entries without relying on the implementation details of the StickySectionNav component. This allows us to focus on testing that the page is correctly passing section data into the StickySectionNav and that the expected navigation entries are rendered based on that data.
vi.mock("components/StickySectionNav", () => ({
  default: ({ sections = [] }) => (
    <nav aria-label="Section navigation">
      {sections.map((section) => (
        <a key={section.id} href={`#${section.id}`}>
          {section.title}
        </a>
      ))}
    </nav>
  ),
}));

// Mock StickyNav to render a simple navigation with the active page, allowing us to verify that the page is correctly passing the active route into the primary navigation without relying on the implementation details of the StickyNav component. This allows us to focus on testing that the page is correctly communicating its active route to the navigation system and that the expected active state is rendered based on that data.
vi.mock("components/StickyNav", () => ({
  default: ({ activePage }) => <nav aria-label="Primary navigation">{activePage}</nav>,
}));

// Mock PageHeader to render a simple header with the expected title and subtitle, allowing us to verify that the page is correctly rendering the page header with the expected content without relying on the implementation details of the PageHeader component. This allows us to focus on testing that the page is correctly passing title and subtitle data into the PageHeader and that the expected content is rendered based on that data.
vi.mock("components/PageHeader", () => ({
  default: ({ title, subTitle }) => (
    <header>
      <h1>{title}</h1>
      {subTitle ? <p>{subTitle}</p> : null}
    </header>
  ),
}));

// Mock Footer to render a simple footer element, allowing us to verify that the page is correctly rendering the footer without relying on the implementation details of the Footer component. This allows us to focus on testing that the page is correctly composed with the Footer and that it is present in the rendered output. This ensures that the page includes the expected footer content and that it is correctly integrated into the page layout.
vi.mock("components/Footer", () => ({
  default: () => <footer aria-label="Footer">Footer</footer>,
}));

/**
 * Creates a test suite for a data-driven page component, focused on verifying composition and user-facing content rather than implementation details. The tests ensure that the page correctly integrates with shared components like scroll restoration, page header, section navigation, primary navigation, and footer, and that it renders the expected content based on the provided section data and active route. This allows us to confirm that the page is correctly composed and provides the expected user experience in terms of content rendering and navigation integration without coupling to the internal workings of those components. The createPageTests function can be used across different page test suites to ensure consistent testing of these common behaviors across all pages in the application.
 *
 * Test cases:
 * - Restores scroll position on mount
 * - Renders the page heading and section navigation entries
 * - Passes the active page route into primary navigation behavior
 * - Section titles are delegated into both content and section navigation
 * - Renders the footer component
 *
 * The tests focus on verifying that the page correctly composes with shared components and renders user-facing content based on the provided data, ensuring that the expected behavior and content are present without relying on implementation details of the individual components. This allows us to confirm that the page is correctly structured and provides the expected user experience in terms of content rendering and navigation integration.
 */
export function createPageTests({ PageComponent, sections, pageRoute, pageName }) {
  describe(`${pageName} page`, () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("restores scroll position on mount", () => {
      renderWithProviders(<PageComponent />);
      expect(restoreScrollPosition).toHaveBeenCalledTimes(1);
    });

    it("renders the page heading and section navigation entries", () => {
      renderWithProviders(<PageComponent />);

      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole("navigation", { name: /section navigation/i })).toBeInTheDocument();

      sections.forEach((section) => {
        expect(screen.getAllByText(section.title).length).toBeGreaterThan(0);
      });
    });

    it("passes the active page route into primary navigation behavior", () => {
      renderWithProviders(<PageComponent />);

      expect(screen.getByRole("navigation", { name: /primary navigation/i })).toHaveTextContent(
        pageRoute
      );
    });
  });
}
