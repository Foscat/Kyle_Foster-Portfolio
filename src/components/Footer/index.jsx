import { Link } from "react-router-dom";
import { Container, FlexboxGrid, Message, Panel, useToaster } from "rsuite";
import "./styles.css";
import { faGithubSquare, faSquareLinkedin } from "@fortawesome/free-brands-svg-icons";
import Btn from "components/Btn";
import useClipboard from "assets/hooks/useClipboard";
import { Variant } from "types/ui.types";
import { useEffect } from "react";
import ResumePreview from "components/ResumePreview";

/**
 * @file index.jsx
 * @description Application footer displaying contact information,
 * social links, and supporting utilities such as clipboard feedback.
 * @module components/Footer
 */

/**
 * Footer
 * ---------------------------------------------------------------------------
 * Application footer component that presents:
 * - Contact information with click-to-copy behavior
 * - Social profile links rendered as frosted buttons
 * - Resume preview access
 * - Copyright notice
 *
 * Behavior:
 * - Uses `useClipboard` to copy phone numbers
 * - Displays toast notifications via RSuite `useToaster`
 * - Shows success and error feedback when clipboard actions occur
 *
 * Accessibility:
 * - Interactive text is keyboard- and screen-reader accessible
 * - Buttons include aria-labels and tooltips
 *
 * Design notes:
 * - Uses RSuite layout primitives (Container, FlexboxGrid, Panel)
 * - Applies frosted-glass styling via CSS classes
 *
 * @public
 * @component
 * @returns {JSX.Element} Rendered application footer.
 */
const Footer = () => {
  /**
   * Clipboard helpers and state.
   * `copied` and `error` are used to trigger toast notifications.
   */
  const { copy, copied, error } = useClipboard();

  /**
   * RSuite toaster instance used for user feedback messages.
   */
  const toaster = useToaster();

  /**
   * Clears any queued toaster messages when clipboard state resets.
   */
  useEffect(() => {
    if (!copied) return;

    const id = toaster.push(null);

    return () => toaster.remove(id);
  }, [copied]);

  /**
   * Displays a success toast when clipboard copy succeeds.
   */
  useEffect(() => {
    if (copied) {
      toaster.push(
        <Message type="success" closable showIcon>
          Phone number copied to clipboard!
        </Message>,
        { placement: "topCenter" }
      );
    }
    console.log({ copied, toaster });
  }, [copied, toaster]);

  /**
   * Displays an error toast when clipboard copy fails.
   */
  useEffect(() => {
    if (error) {
      toaster.push(
        <Message type="error" closable showIcon>
          Error: Could not copy to clipboard.
        </Message>,
        { placement: "topCenter" }
      );
    }
  }, [error, toaster]);

  /**
   * Copies a phone number to the clipboard.
   *
   * @param {string} number - Phone number to copy.
   * @returns {void}
   */
  function copyPhoneNumber(number) {
    copy(number);
  }

  return (
    <div className="footer-wrapper">
      <Container className="footer-container">
        <FlexboxGrid justify="space-around" align="middle">
          {/* Contact Info Section */}
          <FlexboxGrid.Item colspan={8}>
            <Panel
              header={<span className="footer-header">Contact</span>}
              bordered
              className="footer-panel"
            >
              <div className="footer-text">
                <p className="clickable" onClick={() => copyPhoneNumber("(469) 410-5286")}>
                  <strong>Phone:</strong> (469) 410-5286
                </p>
                <p onClick={() => copyPhoneNumber("(972) 802-9397")} className="clickable">
                  <strong>Phone 2:</strong> (972) 802-9397
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:fosterkyle6456@gmail.com">fosterkyle6456@gmail.com</a>
                </p>
              </div>
            </Panel>
          </FlexboxGrid.Item>

          {/* Social Links Section */}
          <FlexboxGrid.Item colspan={8}>
            <Panel
              header={<span className="footer-header">Social</span>}
              bordered
              className="footer-panel"
            >
              <div className="footer-socials">
                <Btn
                  text="GitHub"
                  icon={faGithubSquare}
                  variant={Variant.PRIMARY}
                  href="https://github.com/Foscat"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="footer-icon"
                  ariaLabel="GitHub Profile"
                  tooltip="Visit my GitHub Profile"
                />

                <Btn
                  text="LinkedIn"
                  icon={faSquareLinkedin}
                  variant={Variant.PRIMARY}
                  href="https://linkedin.com/in/kylefoster-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-icon"
                  ariaLabel="LinkedIn Profile"
                  tooltip="Visit my LinkedIn Profile"
                />

                <ResumePreview />
              </div>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Kyle Foster. All rights reserved.
        </div>
      </Container>
    </div>
  );
};

export default Footer;
