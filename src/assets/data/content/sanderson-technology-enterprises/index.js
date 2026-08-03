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
} from "@fortawesome/free-solid-svg-icons";
import { BlockType, PageRoute } from "types/ui.types.js";
import sandersonLogo from "assets/images/sideProjects/chris_sanderson_enterprises_logo.jpg";
import contentCreatorPlatformPromo from "assets/videos/ste/content-creator-platform-promo.mp4";
import scrapYardSystemPromo from "assets/videos/ste/salvage-yard-system-promo.mp4";
import diagrams from "./diagrams.js";

const PUBLIC_STE_URL = "https://sandersontechnologyenterprises.com/";
const SCRAP_YARD_SYSTEM_URL = `${PUBLIC_STE_URL}scrap-yard-system.html`;
const CONTENT_CREATOR_PLATFORM_URL = `${PUBLIC_STE_URL}content-creator-platform.html`;
const INTERFACE_SYSTEMS_LAB_URL = "https://foscat.github.io/interface-systems-lab/";
const INTERFACE_SYSTEMS_LAB_REPO = "https://github.com/Foscat/interface-systems-lab";

const sandersonTechnologyEnterprisesSections = [
  {
    id: "ste-overview",
    title: "STE Overview",
    navLabel: "Overview",
    subtitle: "Public-safe summary of Sanderson Technology Enterprises work",
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
                text: " for public business websites, reusable product foundations, admin surfaces, and interface systems.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "This public case study presents a professional engagement: the company website, reusable white-label architecture, the Content Creator Platform, the Scrap Yard System, and the shared interface system that ties the work together.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Public boundary: show the architecture story and product direction without exposing confidential implementation details.",
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
    navLabel: "Company Site",
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
                    text: "The content model keeps the public story focused on capability, credibility, and a clear path for prospective clients to start a conversation.",
                  },
                ],
              },
            ],
          },
        ],
      },
      diagrams.publicSiteJourney,
    ],
  },
  {
    id: "ste-content-creator-platform",
    title: "Content Creator Platform",
    navLabel: "Content Creator",
    subtitle: "White-label publishing, membership, and operations foundation",
    icon: faCodeBranch,
    isScroller: true,
    blocks: [
      {
        id: "ste-content-creator-platform-text",
        title: "A Branded Home for Creator-Led Businesses",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The Content Creator Platform is actively developed STE product work for creators, educators, communities, and subscription brands that want a polished home for publishing, memberships, and audience relationships.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "My MERN-App-Template+Auth provides the starting structure for authentication, protected routes, API organization, deployment shape, and documentation habits. The product builds on that reusable foundation with branded discovery, protected media, membership access, creator operations, and first-party insights.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "The public story is practical white-label architecture: a configurable product foundation that can support distinct creator brands without rebuilding the core platform for every launch.",
              },
            ],
          },
        ],
      },
      diagrams.contentCreatorPlatformFlow,
      {
        id: "ste-content-creator-platform-video",
        title: "Content Creator Platform Demonstration",
        type: BlockType.VIDEO,
        src: contentCreatorPlatformPromo,
        mimeType: "video/mp4",
        caption:
          "See how the platform brings branded discovery, membership access, protected content, and creator operations into one product experience.",
        ariaLabel: "Content Creator Platform product demonstration",
      },
      {
        id: "ste-content-creator-platform-link",
        title: "Content Creator Platform Product Page",
        type: BlockType.LINKS,
        items: [
          {
            id: "ste-link-content-creator-platform",
            title: "View Content Creator Platform",
            url: CONTENT_CREATOR_PLATFORM_URL,
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faDesktop,
            ariaLabel: "View the public Content Creator Platform product page",
          },
        ],
      },
    ],
  },
  {
    id: "ste-scrap-yard-system",
    title: "Scrap Yard System",
    navLabel: "Scrap Yard",
    subtitle: "Early-stage inventory management and storefront product for scrapyards",
    icon: faLayerGroup,
    isScroller: true,
    blocks: [
      {
        id: "ste-scrap-yard-system-text",
        title: "Inventory Operations Joined to Commerce",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "I am building the Scrap Yard System as an internal inventory management system with a client-facing e-commerce platform. It is actively developed and remains in the early-stage product phase.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The planned product joins clean inventory management with a user-friendly, hassle-free storefront so scrapyard staff can manage parts and vehicles internally while customers can browse and buy through a clearer public commerce path.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "I also plan to make a template out of this platform, allowing STE to target scrapyards as a niche clientele that could benefit from a web-based solution connecting operations and commerce in one system.",
              },
            ],
          },
        ],
      },
      diagrams.scrapyardCommerceLoop,
      {
        id: "ste-scrap-yard-system-video",
        title: "Scrap Yard System Demonstration",
        type: BlockType.VIDEO,
        src: scrapYardSystemPromo,
        mimeType: "video/mp4",
        caption:
          "See the industry-focused foundation for searchable inventory, customer ordering, worker queues, and connected yard operations.",
        ariaLabel: "Scrap Yard System product demonstration",
      },
      {
        id: "ste-scrap-yard-system-focus",
        title: "Template Direction",
        type: BlockType.CARD_GRID,
        items: [
          {
            id: "ste-scrapyard-inventory",
            title: "Inventory Clarity",
            subtitle: "Cleaner internal operations",
            icon: faBookBookmark,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The internal side is intended to make stock status, listings, and operational updates easier to manage through a web-based workflow.",
                  },
                ],
              },
            ],
          },
          {
            id: "ste-scrapyard-commerce",
            title: "Customer Commerce",
            subtitle: "Friction-light storefront",
            icon: faDesktop,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The customer side is intended to expose available inventory through a user-friendly storefront instead of forcing buyers through ad hoc calls or disconnected listings.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ste-scrap-yard-system-link",
        title: "Scrap Yard System Product Page",
        type: BlockType.LINKS,
        items: [
          {
            id: "ste-link-scrap-yard-system",
            title: "View Scrap Yard System",
            url: SCRAP_YARD_SYSTEM_URL,
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faDesktop,
            ariaLabel: "View the public Scrap Yard System product page",
          },
        ],
      },
    ],
  },
  {
    id: "ste-interface-system",
    title: "Interface System",
    navLabel: "Interface System",
    subtitle: "Shared layout, paint, icon, and interaction layers for STE surfaces",
    icon: faArrowsToCircle,
    isScroller: true,
    blocks: [
      {
        id: "ste-interface-system-text",
        title: "Reusable Interface Layers",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "STE product surfaces use four independent libraries as a coordinated interface system. layout-style-css handles structure, ui-style-kit-css handles visual identity and theme paint, ui-style-kit-icons handles semantic iconography, and interactive-surface-css handles interaction states.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Interface Systems Lab is the public integration showcase for the four libraries working together through one shared semantic contract. Each library keeps a clear responsibility while the lab demonstrates the combined system.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "The interface system keeps product work focused on business flows while reusable libraries handle responsive structure, theme expression, icon language, and interaction behavior.",
              },
            ],
          },
        ],
      },
      diagrams.interfaceSystemFlow,
      {
        id: "ste-interface-system-layers",
        title: "Layer Responsibilities",
        type: BlockType.CARD_GRID,
        items: [
          {
            id: "ste-interface-layer-layout",
            title: "Layout Style CSS",
            subtitle: "Responsive structure",
            iconName: "grid",
            url: "https://foscat.github.io/Layout-Style-CSS/",
            target: "_blank",
            rel: "noopener noreferrer",
            ctaText: "Open Library",
            ariaLabel: "Open the Layout Style CSS documentation",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Owns wrappers, sections, grids, stacks, sidebars, and responsive rhythm across product surfaces.",
                  },
                ],
              },
            ],
          },
          {
            id: "ste-interface-layer-paint",
            title: "UI Style Kit CSS",
            subtitle: "Theme and visual paint",
            iconName: "palette",
            url: "https://foscat.github.io/ui-style-kit-css/",
            target: "_blank",
            rel: "noopener noreferrer",
            ctaText: "Open Library",
            ariaLabel: "Open the UI Style Kit CSS documentation",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Owns palette roles, theme modes, surface color, and visual system expression.",
                  },
                ],
              },
            ],
          },
          {
            id: "ste-interface-layer-icons",
            title: "UI Style Kit Icons",
            subtitle: "Semantic iconography",
            iconName: "module",
            url: "https://foscat.github.io/ui-style-kit-css-icons/",
            target: "_blank",
            rel: "noopener noreferrer",
            ctaText: "Open Library",
            ariaLabel: "Open the UI Style Kit Icons demonstration",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "ui-style-kit-icons owns semantic icons, theme-aware artwork, selectable packs, and the shared icon component contract.",
                  },
                ],
              },
            ],
          },
          {
            id: "ste-interface-layer-behavior",
            title: "Interactive Surface CSS",
            subtitle: "Interaction states",
            iconName: "cursor",
            url: "https://foscat.github.io/Interactive-Surface-CSS/",
            target: "_blank",
            rel: "noopener noreferrer",
            ctaText: "Open Library",
            ariaLabel: "Open the Interactive Surface CSS documentation",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Owns buttons, links, cards, focus-visible treatment, active states, and repeatable interaction styling.",
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
    navLabel: "Links",
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
            id: "ste-link-interface-systems-lab",
            title: "View Interface Systems Lab",
            url: INTERFACE_SYSTEMS_LAB_URL,
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faLayerGroup,
            ariaLabel: "View Interface Systems Lab",
          },
          {
            id: "ste-link-interface-systems-lab-source",
            title: "View Interface Systems Lab Source",
            url: INTERFACE_SYSTEMS_LAB_REPO,
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faCodeBranch,
            ariaLabel: "View Interface Systems Lab Source",
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
