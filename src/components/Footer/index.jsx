import Btn from "components/Btn";
import "./styles.css";
import { faSquareGithub, faSquareLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Size, Variant } from "types/ui.types";
import { faEnvelopeOpenText, faMailBulk } from "@fortawesome/free-solid-svg-icons";

/**
 * @file index.jsx
 * @description Compact application footer providing quiet page closure,
 * secondary social actions, and copyright information.
 * @module components/Footer
 */

/**
 * Footer
 * ---------------------------------------------------------------------------
 * Minimal, mobile-first application footer.
 *
 * Responsibilities:
 * - Provide visual closure at the end of each page
 * - Offer secondary social/profile actions
 * - Display copyright information
 *
 * Design philosophy:
 * - Footer should be unobtrusive and visually calm
 * - Avoid heavy glassmorphism and large vertical padding
 * - Never compete with page content or navigation
 *
 * Layout behavior:
 * - Mobile: stacked, centered, minimal height
 * - Desktop: inline, horizontally distributed
 *
 * Accessibility:
 * - All interactive controls use the custom `Btn` component
 * - Icon-only buttons include `aria-label` attributes
 * - No hover-only affordances required for usability
 *
 * @public
 * @component
 * @returns {JSX.Element} Rendered application footer.
 */
const Footer = () => {
  /**
   * Current year used for copyright display.
   * Computed at render time to avoid manual updates.
   */
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer_inner">
        {/* ----------------------------------------------------
            Left: Copyright
           ---------------------------------------------------- */}
        <div className="site-footer_left">
          <span className="site-footer_copyright">© {currentYear} Kyle Foster</span>
        </div>

        {/* ----------------------------------------------------
            Right: Social / Utility Actions
           ---------------------------------------------------- */}
        <div className="site-footer_right">
          <Btn
            icon={faSquareGithub}
            variant={Variant.SUBTLE}
            size={Size.MD}
            noBG
            href="https://github.com/Foscat"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub profile"
            tooltip="👨🏻‍💻 GitHub"
          />

          <Btn
            icon={faSquareLinkedin}
            variant={Variant.SUBTLE}
            size={Size.MD}
            noBG
            href="https://linkedin.com/in/kylefoster-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile"
            tooltip="🏢 LinkedIn"
          />

          <Btn
            icon={faEnvelopeOpenText}
            variant={Variant.SUBTLE}
            size={Size.MD}
            noBG
            href="mailto:fosterkyle6456@gmail.com"
            aria-label="Send email"
            tooltip="📬 Email Me"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
