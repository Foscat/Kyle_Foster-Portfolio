/**
 * @file index.jsx
 * @description 404 fallback page with navigation recovery action and branded messaging.
 * @module pages/NotFound
 */

import Surface from "components/ui/Surface";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Btn } from "components/ui";
import { Footer, UnifiedNavigation } from "components/navigation";
import "./styles.css";

/**
 * NotFound Component
 * ------------------------------------------------------------
 * A polished 404 error page using native semantic elements and the
 * frosted-glass UI system.
 *
 * Features:
 * - Centered layout with layout-style-css utilities
 * - Frosted glass panel styling
 * - Clear error messaging and recovery path
 * - Accessible, keyboard-friendly navigation
 *
 * @component
 * @returns {JSX.Element}
 */
const NotFound = () => {
  return (
    <div className="notFound-page page-shell ly-wrapper ly-wrapper--wide ly-stack">
      <UnifiedNavigation activePage="" />
      <main>
        <div className="notFound-wrapper ly-center">
          <div className="notFound-column">
            <Surface className="notFound-glassBox glass-card fade-in text-center">
              {/* Error Code */}
              <div className="notFound-errorCode" aria-hidden="true">
                404
              </div>

              {/* Title */}
              <h1 className="notFound-title">Page Not Found</h1>

              {/* Description */}
              <p className="notFound-description">
                The page you're looking for does not exist or may have moved.
                <br />
                Use the button below to return home.
              </p>

              {/* Call to Action */}
              <Btn
                href="/"
                hrefLocal
                ariaLabel="Return to homepage"
                appearance="primary"
                size="lg"
                className="notFound-cta"
                text="Home"
                icon={faHome}
                tooltip="Return to homepage"
              />
            </Surface>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
