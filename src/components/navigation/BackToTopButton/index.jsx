/**
 * @file index.jsx
 * @description Floating back-to-top action that appears after the user scrolls away from the top.
 * @module components/navigation/BackToTopButton
 */

import { useEffect, useState } from "react";
import { Tooltip, Whisper } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useCoarsePointer } from "assets/hooks";
import "./styles.css";

const VISIBILITY_THRESHOLD_PX = 300;

function isReducedMotionEnabled() {
  if (typeof document !== "undefined") {
    const reducedMotionFlag = document.documentElement?.dataset?.a11yReducedMotion;
    if (reducedMotionFlag === "true") return true;
  }

  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * @returns {JSX.Element}
 */
export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const isCoarsePointer = useCoarsePointer();

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > VISIBILITY_THRESHOLD_PX);
    };

    let isTicking = false;

    const handleScroll = () => {
      if (isTicking) return;

      isTicking = true;
      window.requestAnimationFrame(() => {
        updateVisibility();
        isTicking = false;
      });
    };

    updateVisibility();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: isReducedMotionEnabled() ? "auto" : "smooth",
    });
  };

  return (
    <div className={`back-to-top ${isVisible ? "is-visible" : "is-hidden"}`}>
      <Whisper
        trigger={isCoarsePointer ? "none" : ["hover", "focus"]}
        placement="left"
        enterable={false}
        speaker={<Tooltip className="back-to-top-tooltip">Back to top</Tooltip>}
      >
        <button
          type="button"
          className="back-to-top__button interactive-surface"
          aria-label="Back to top"
          onClick={handleScrollToTop}
          tabIndex={isVisible ? 0 : -1}
        >
          <FontAwesomeIcon icon={faArrowUp} aria-hidden="true" />
        </button>
      </Whisper>
    </div>
  );
}
