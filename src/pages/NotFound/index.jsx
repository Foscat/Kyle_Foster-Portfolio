import React from "react";
import { Panel, FlexboxGrid } from "rsuite";
import Btn from "components/Btn";
import "./styles.css";

/**
 * NotFound Component
 * ------------------------------------------------------------
 * A polished 404 error page using RSuite components and the
 * frosted-glass UI system.
 *
 * Features:
 * - Centered layout with FlexboxGrid
 * - Frosted glass panel styling
 * - Clear error messaging and recovery path
 * - Accessible, keyboard-friendly navigation
 *
 * @component
 * @returns {JSX.Element}
 */
const NotFound = () => {
  return (
    <FlexboxGrid
      justify="center"
      className="notFound-wrapper"
    >
      <FlexboxGrid.Item colspan={20}>
        <Panel
          bordered
          className="notFound-glassBox glass-card fade-in text-center"
        >
          {/* Error Code */}
          <div
            className="notFound-errorCode"
            aria-hidden="true"
          >
            404
          </div>

          {/* Title */}
          <h1 className="notFound-title">This Page Drifted Off</h1>

          {/* Description */}
          <p className="notFound-description">
            The page you're looking for doesn't exist or has been moved.
            <br />
            Let's get you back on track.
          </p>

          {/* Call to Action */}
          <Btn
            href="/"
            ariaLabel="Return to homepage"
            appearance="primary"
            size="lg"
            className="notFound-cta"
            text="Return Home"
          ></Btn>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default NotFound;
