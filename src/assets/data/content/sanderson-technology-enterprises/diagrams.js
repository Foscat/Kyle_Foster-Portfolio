/**
 * @file diagrams.js
 * @description Mermaid diagram registry for the Sanderson Technology Enterprises case study.
 * @module assets/data/content/sanderson-technology-enterprises/diagrams
 */

import {
  diagram,
  diagramConfig,
} from "../../../../components/features/CustomDiagram/core/index.js";

const diagrams = {
  publicSiteJourney: {
    id: "diagram-ste-public-site-journey",
    type: "diagram",
    title: "Public Site Client Journey",
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

  Prospect([Prospective Client])

  subgraph Discovery[Discovery]
    Entry[Search or Referral Entry]
    Need[Business Need]
    Fit{Service Fit Clear?}
    Services[Review Service Capabilities]
  end

  subgraph Trust[Trust + Evidence]
    Proof[Portfolio + Trust Content]
    Relevant{Evidence Relevant?}
    Resource[Explore Related Work]
  end

  subgraph Contact[Contact + Follow-Up]
    ContactPath[Direct Contact Path]
    Valid{Contact Details Complete?}
    Correct[Correct Contact Details]
    Call[Discovery Call]
    Qualified{Mutual Fit?}
    FollowUp[Scoped Follow-Up]
    Alternate[Relevant Resource or Referral]
  end

  Prospect ==> Entry ==> Need ==> Fit
  Fit ==>|No| Services -. refine need .-> Need
  Fit ==>|Yes| Proof ==> Relevant
  Relevant ==>|No| Resource -. compare .-> Services
  Relevant ==>|Yes| ContactPath ==> Valid
  Valid ==>|No| Correct -. resubmit .-> ContactPath
  Valid ==>|Yes| Call ==> Qualified
  Qualified ==>|Yes| FollowUp
  Qualified ==>|No| Alternate`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

  Prospect([Prospective Client])
  Entry[Search or Referral]
  Need[Business Need]
  Fit{Service Fit Clear?}
  Services[Service Capabilities]
  Proof[Portfolio + Trust Content]
  Relevant{Evidence Relevant?}
  Resource[Related Work]
  ContactPath[Direct Contact Path]
  Valid{Details Complete?}
  Correct[Correct Details]
  Call[Discovery Call]
  Qualified{Mutual Fit?}
  FollowUp[Scoped Follow-Up]
  Alternate[Resource or Referral]

  Prospect ==> Entry ==> Need ==> Fit
  Fit ==>|No| Services -. refine need .-> Need
  Fit ==>|Yes| Proof ==> Relevant
  Relevant ==>|No| Resource -. compare .-> Services
  Relevant ==>|Yes| ContactPath ==> Valid
  Valid ==>|No| Correct -. resubmit .-> ContactPath
  Valid ==>|Yes| Call ==> Qualified
  Qualified ==>|Yes| FollowUp
  Qualified ==>|No| Alternate`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "The public site helps a prospect clarify service fit before asking for contact details. Capability and portfolio evidence support that decision, incomplete inquiries can be corrected, and the discovery call ends with either a scoped follow-up or a more relevant resource rather than an artificial conversion funnel.",
          },
        ],
      },
    ],
  },

  contentCreatorPlatformFlow: {
    id: "diagram-ste-content-creator-platform-flow",
    type: "diagram",
    title: "Content Creator Platform Flow",
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

  Creator([Creator])
  Audience([Audience Member])

  subgraph Configure[Reusable Product Foundation]
    Mern[MERN Foundation]
    Brand[Creator Brand Configuration]
    Library[Content Library]
    Publish{Ready to Publish?}
    Revise[Revise Brand or Content]
  end

  subgraph Experience[Branded Audience Experience]
    Discover[Public Discovery]
    Access{Membership Access?}
    Join[Join or Sign In]
    Protected[Protected Content Delivery]
  end

  subgraph Learning[First-Party Learning]
    Engagement[Engagement Signals]
    Insights[First-Party Insights]
    Review[Creator Review]
  end

  Creator ==> Mern ==> Brand ==> Library ==> Publish
  Publish ==>|No| Revise -. update .-> Brand
  Publish ==>|Yes| Discover
  Audience ==> Discover ==> Access
  Access ==>|No| Join -. granted access .-> Access
  Access ==>|Yes| Protected ==> Engagement ==> Insights ==> Review
  Review -. refine offering .-> Library`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

  Creator([Creator])
  Audience([Audience Member])
  Mern[MERN Foundation]
  Brand[Brand Configuration]
  Library[Content Library]
  Publish{Ready to Publish?}
  Revise[Revise Content]
  Discover[Public Discovery]
  Access{Membership Access?}
  Join[Join or Sign In]
  Protected[Protected Content]
  Engagement[Engagement Signals]
  Insights[First-Party Insights]
  Review[Creator Review]

  Creator ==> Mern ==> Brand ==> Library ==> Publish
  Publish ==>|No| Revise -. update .-> Brand
  Publish ==>|Yes| Discover
  Audience ==> Discover ==> Access
  Access ==>|No| Join -. granted access .-> Access
  Access ==>|Yes| Protected ==> Engagement ==> Insights ==> Review
  Review -. refine offering .-> Library`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "The reusable MERN foundation becomes a creator-specific product through brand and content configuration. Publication gates the audience experience, membership controls protected delivery, and first-party engagement returns to the creator as evidence for refining the content offering.",
          },
        ],
      },
    ],
  },

  scrapyardCommerceLoop: {
    id: "diagram-ste-scrapyard-commerce-loop",
    type: "diagram",
    title: "Scrapyard Inventory and Commerce Loop",
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

  Staff([Inventory Staff])
  Customer([Customer])

  subgraph Intake[Inventory Intake]
    Receive[Receive Part]
    Inspect[Inspect + Identify]
    Record[Create Inventory Record]
    Ready{Ready to Sell?}
    Review[Hold for Review]
  end

  subgraph Commerce[Catalog + Storefront]
    Catalog[(Internal Catalog)]
    Publish[Publish Storefront Listing]
    Browse[Search + View Part]
    Order[Submit Customer Order]
    Available{Stock Available?}
  end

  subgraph Fulfillment[Fulfillment + Reconciliation]
    Reserve[Reserve Inventory]
    Fulfill[Pick + Fulfill]
    Update[Update Stock Status]
    Notify[Notify Customer]
  end

  Staff ==> Receive ==> Inspect ==> Record ==> Ready
  Ready ==>|Yes| Catalog ==> Publish ==> Browse
  Ready ==>|No| Review -. corrected data .-> Record
  Customer ==> Browse ==> Order ==> Available
  Available ==>|Yes| Reserve ==> Fulfill ==> Update ==> Catalog
  Available ==>|No| Notify -. reconcile listing .-> Catalog
  Fulfill ==> Notify`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

  Staff([Inventory Staff])
  Customer([Customer])
  Receive[Receive Part]
  Inspect[Inspect + Identify]
  Record[Create Inventory Record]
  Ready{Ready to Sell?}
  Review[Hold for Review]
  Catalog[(Internal Catalog)]
  Publish[Storefront Listing]
  Browse[Search + View Part]
  Order[Submit Order]
  Available{Stock Available?}
  Reserve[Reserve Inventory]
  Fulfill[Pick + Fulfill]
  Update[Update Stock Status]
  Notify[Notify Customer]

  Staff ==> Receive ==> Inspect ==> Record ==> Ready
  Ready ==>|Yes| Catalog ==> Publish ==> Browse
  Ready ==>|No| Review -. corrected data .-> Record
  Customer ==> Browse ==> Order ==> Available
  Available ==>|Yes| Reserve ==> Fulfill ==> Update ==> Catalog
  Available ==>|No| Notify -. reconcile listing .-> Catalog
  Fulfill ==> Notify`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "The internal catalog remains the source of truth between inventory staff and customers. Intake quality controls publication, orders reserve and fulfill available stock, and unavailable or corrected records reconcile the storefront with current inventory before the next transaction.",
          },
        ],
      },
    ],
  },

  interfaceSystemFlow: {
    id: "diagram-ste-interface-system-flow",
    type: "diagram",
    title: "STE Interface System Flow",
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

  ProductNeed[Product Interface Need]
  Semantic[Shared Semantic Markup]

  subgraph Packages[Package Ownership]
    Structure[layout-style-css]
    Paint[ui-style-kit-css]
    Icons[ui-style-kit-icons]
    Behavior[interactive-surface-css]
  end

  subgraph Adoption[Consumer Integration]
    Configure[Theme + Layout Configuration]
    Product[STE Product Surface]
    Verify{Responsive + Accessible?}
    Correct[Correct Contract Usage]
  end

  subgraph Proof[Proof + Release]
    Lab[Interface Systems Lab]
    Release[Versioned Package Release]
    Feedback[Consumer Feedback]
  end

  ProductNeed ==> Semantic
  Semantic ==> Structure
  Semantic ==> Paint
  Semantic ==> Icons
  Semantic ==> Behavior
  Structure ==> Configure
  Paint ==> Configure
  Icons ==> Configure
  Behavior ==> Configure
  Configure ==> Product ==> Verify
  Verify ==>|No| Correct -. adjust integration .-> Semantic
  Verify ==>|Yes| Lab ==> Release ==> Feedback
  Feedback -. refine contracts .-> Semantic`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

  Need[Product Interface Need]
  Semantic[Shared Semantic Markup]
  Structure[layout-style-css]
  Paint[ui-style-kit-css]
  Icons[ui-style-kit-icons]
  Behavior[interactive-surface-css]
  Configure[Theme + Layout Config]
  Product[STE Product Surface]
  Verify{Responsive + Accessible?}
  Correct[Correct Contract Usage]
  Lab[Interface Systems Lab]
  Release[Versioned Release]
  Feedback[Consumer Feedback]

  Need ==> Semantic
  Semantic ==> Structure
  Semantic ==> Paint
  Semantic ==> Icons
  Semantic ==> Behavior
  Structure ==> Configure
  Paint ==> Configure
  Icons ==> Configure
  Behavior ==> Configure
  Configure ==> Product ==> Verify
  Verify ==>|No| Correct -. adjust integration .-> Semantic
  Verify ==>|Yes| Lab ==> Release ==> Feedback
  Feedback -. refine contracts .-> Semantic`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "STE products share semantic markup while each package keeps a clear responsibility for structure, paint, icons, or behavior. Consumer configuration composes those contracts into a product surface, responsive and accessibility checks gate release, and Interface Systems Lab plus consumer feedback provide evidence for refining the next package version.",
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams);
