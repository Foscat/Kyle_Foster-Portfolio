import { Link } from "react-router-dom";
import { Container, FlexboxGrid, Message, Panel, useToaster } from "rsuite";
import "./styles.css";
import { faGithubSquare, faSquareLinkedin } from "@fortawesome/free-brands-svg-icons";
import Btn from "components/Btn";
import useClipboard from "assets/hooks/useClipboard";
import { Size, Variant } from "types/ui.types";
import { useEffect } from "react";
import ResumePreview from "components/ResumePreview";

/**
 *
 * Displays contact links and social media icons
 * using RSuite UI components and a custom
 * frosted-glass / blurred background aesthetic.
 *
 * @component
 * @returns {JSX.Element} The rendered footer
 */
const Footer = () => {
  const { copy, copied, error } = useClipboard();
  const toaster = useToaster();

  useEffect(() => {
    if (!copied) return;

    const id = toaster.push(null);

    return () => toaster.remove(id);
  }, [copied]);

  // 🔑 React to clipboard result changes
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

  function copyPhoneNumber(number) {
    copy(number);
  }

  return (
    <div className="footer-wrapper">
      <Container className="footer-container">
        <FlexboxGrid justify="space-around" align="middle">
          {/* Contact Info Section */}
          <FlexboxGrid.Item colspan={8}>
            <Panel header={<h4>Contact</h4>} bordered className="footer-panel">
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

          {/* Social Section */}
          <FlexboxGrid.Item colspan={8}>
            <Panel header={<h4>Social</h4>} bordered className="footer-panel">
              <div className="footer-socials">
                <Btn
                  text="GitHub"
                  icon={faGithubSquare}
                  variant={Variant.ACCENT}
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
                  variant={Variant.ACCENT}
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
