/**
 * @file src/assets/data/content/sanderson-technology-enterprises/index.js
 * @description Public-safe case study content for Sanderson Technology Enterprises work.
 * @module assets/data/content/sanderson-technology-enterprises
 */

import {
  faArrowsToCircle,
  faBookBookmark,
  faBrush,
  faBuildingUser,
  faCodeBranch,
  faDesktop,
  faLayerGroup,
  faLock,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { BlockType, PageRoute } from "types/ui.types.js";
import sandersonLogo from "assets/images/sideProjects/chris_sanderson_enterprises_logo.jpg";

const PUBLIC_STE_URL = "https://sandersontechnologyenterprises.com/";

const sandersonTechnologyEnterprisesSections = [
  {
    id: "ste-overview",
    title: "STE Overview",
    subtitle: "Public-safe summary of work for Sanderson Technology Enterprises",
    icon: faBuildingUser,
    isScroller: true,
    blocks: [
      {
        id: "ste-overview-text",
        title: "Sanderson Technology Enterprises",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "My work for Sanderson Technology Enterprises centers on " },
              { type: "strong", text: "custom web platform development" },
              {
                type: "text",
                text: " for public business websites, admin surfaces, and private/proprietary product foundations.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "This public case study presents a professional engagement: the public website, reusable technical foundations, and UI systems that made delivery faster without exposing private Golden Goose implementation details.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Public boundary: show the architecture story, not the private product internals.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ste-website",
    title: "Company Website",
    subtitle: "Public web presence for Sanderson Technology Enterprises",
    icon: faDesktop,
    isScroller: true,
    blocks: [
      {
        id: "ste-website-logo",
        title: "Public Brand Surface",
        type: BlockType.IMAGE_GALLERY,
        items: [
          {
            id: "ste-logo-preview",
            src: sandersonLogo,
            alt: "Sanderson Technology Enterprises logo",
            title: "Sanderson Technology Enterprises",
            caption:
              "Public brand preview used to represent the company website and public-facing STE work.",
            ariaLabel: "Sanderson Technology Enterprises logo preview",
          },
        ],
      },
      {
        id: "ste-website-text",
        title: "Public Site Delivery",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "I built the public Sanderson Technology Enterprises website as an SEO-aware business surface for custom web platforms, branded websites, admin dashboards, and workflow tooling.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "The site presents services, contact paths, trust-building copy, and brand direction without requiring a heavy application runtime.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "This portfolio also served as boilerplate lineage for the public presentation approach, giving the STE engagement a proven content-and-section pattern to build from.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ste-golden-goose",
    title: "Golden Goose Foundation",
    subtitle: "Private/proprietary platform work described without internal exposure",
    icon: faLock,
    isScroller: true,
    blocks: [
      {
        id: "ste-golden-goose-text",
        title: "Template-Led Platform Start",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Golden Goose is private/proprietary STE platform work, so the portfolio keeps the details at the architecture and delivery level. The important public point is how the foundation was created.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "My MERN-App-Template+Auth was used to create the Golden Goose template for STE, giving the work a known starting point for authentication, routing, API structure, deployment shape, and documentation habits.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "The reusable template kept early product work focused on business behavior instead of repeatedly rebuilding application plumbing.",
              },
            ],
          },
        ],
      },
      {
        id: "ste-golden-goose-guardrails",
        title: "Public-Safe Guardrails",
        type: BlockType.CARD_GRID,
        items: [
          {
            id: "ste-guardrail-public",
            title: "Public Story Only",
            subtitle: "Business value without internals",
            icon: faShieldHalved,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The page can discuss foundations, reusable patterns, and delivery approach while leaving private workflows and product logic out of view.",
                  },
                ],
              },
            ],
          },
          {
            id: "ste-guardrail-template",
            title: "Template Reuse",
            subtitle: "Proven MERN base",
            icon: faCodeBranch,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The MERN template provided a stable product shell that could be adapted to STE needs without exposing the resulting private application.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ste-ui-bundle",
    title: "Three-Package UI Bundle",
    subtitle: "Reusable styling systems built to keep STE delivery moving",
    icon: faLayerGroup,
    isScroller: true,
    blocks: [
      {
        id: "ste-ui-bundle-text",
        title: "Responsive Work Without Rebuilding Every Surface",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "I created three style libraries to support my work for STE and prevent delivery from getting bogged down by the repeated work of making every page and product surface fully responsive from scratch.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "layout-style-css:" },
                  {
                    type: "text",
                    text: " handles wrappers, sections, stacks, grids, sidebars, responsive rhythm, and layout personalities.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "ui-style-kit-css:" },
                  {
                    type: "text",
                    text: " handles theme paint, palette roles, surface color, and visual system expression.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "interactive-surface-css:" },
                  {
                    type: "text",
                    text: " handles buttons, links, cards, focus-visible treatment, active states, and repeatable interaction styling.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "The libraries do the heavy lifting so product work can stay focused on business flows and content models.",
              },
            ],
          },
        ],
      },
      {
        id: "ste-style-config",
        title: "Website Base Style Config",
        type: BlockType.CARD_GRID,
        items: [
          {
            id: "ste-style-mode",
            title: "Mode",
            subtitle: 'mode = "auto" || "dark"',
            icon: faBrush,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The intended public-facing setup supports automatic mode behavior while keeping dark mode as the primary polished presentation.",
                  },
                ],
              },
            ],
          },
          {
            id: "ste-style-ui",
            title: "UI Style",
            subtitle: 'ui-style = "Cyberpunk"',
            icon: faArrowsToCircle,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Cyberpunk carries the visual paint direction through ui-style-kit-css while layout remains independently controlled.",
                  },
                ],
              },
            ],
          },
          {
            id: "ste-style-layout",
            title: "Layout Style",
            subtitle: 'layout-style = "Retrofuturism"',
            icon: faLayerGroup,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Retrofuturism defines the spatial personality without forcing one-off page CSS into each client surface.",
                  },
                ],
              },
            ],
          },
          {
            id: "ste-style-palette",
            title: "Palette",
            subtitle: 'palette = "Midnight-Gold"',
            icon: faBookBookmark,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Midnight-Gold gives the STE site a high-contrast, premium palette direction suitable for business-facing presentation.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ste-links",
    title: "Public Links",
    subtitle: "Only public destinations are linked from this case study",
    icon: faCodeBranch,
    isScroller: true,
    blocks: [
      {
        id: "ste-public-links",
        title: "Related Public Surfaces",
        type: BlockType.LINKS,
        items: [
          {
            id: "ste-link-website",
            title: "Visit STE Website",
            url: PUBLIC_STE_URL,
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faDesktop,
            ariaLabel: "Visit STE Website",
          },
          {
            id: "ste-link-layout-style-css",
            title: "View Layout Style CSS",
            url: `${PageRoute.SIDE_PROJECTS}#layout-style-css`,
            local: true,
            icon: faLayerGroup,
            ariaLabel: "View Layout Style CSS",
          },
          {
            id: "ste-link-ui-style-kit-css",
            title: "View UI Style Kit CSS",
            url: `${PageRoute.SIDE_PROJECTS}#ui-style-kit-css`,
            local: true,
            icon: faBrush,
            ariaLabel: "View UI Style Kit CSS",
          },
          {
            id: "ste-link-interactive-surface-css",
            title: "View Interactive Surface CSS",
            url: `${PageRoute.SIDE_PROJECTS}#interactive-surface-css`,
            local: true,
            icon: faArrowsToCircle,
            ariaLabel: "View Interactive Surface CSS",
          },
          {
            id: "ste-link-mern-template",
            title: "View MERN Template",
            url: `${PageRoute.SIDE_PROJECTS}#mern-template`,
            local: true,
            icon: faCodeBranch,
            ariaLabel: "View MERN Template",
          },
        ],
      },
    ],
  },
];

export default sandersonTechnologyEnterprisesSections;
