/**
 * @file isMobile.js
 * @description Custom browser debug and  function to determine if the current device is in mobile view.
 * This hook checks both window width and user agent to provide a robust mobile detection.
 * @returns {boolean} True if the device is in mobile view (based on window width or user agent), false otherwise.
 */

const mobileWidth = 900; // Mobile breakpoint in pixels (added to catch certain landscape tablets)
const mobileHeight = 600; // Height threshold for mobile devices (added to catch certain landscape tablets)

/**
 *
 * @returns {boolean} True if the device is in mobile view, false otherwise.
 * @description Determines if the current device is in mobile view by checking window dimensions and user agent.
 * This function provides a more comprehensive mobile detection by considering both screen size and user agent data.
 */
export default function userOnMobile() {
  let onMobile = false;
  if (typeof window !== "undefined") {
    if (navigator.userAgentData) {
      // Use userAgentData if available for more accurate detection
      onMobile = navigator.userAgentData.mobile;
    } else if (navigator.userAgent) {
      // Fallback to user agent string parsing for older browsers
      onMobile = /Mobi|Android/i.test(navigator.userAgent);
    } else {
      // If we can't access user agent data, fall back to screen size checks
      const { innerWidth, innerHeight } = window;
      onMobile = innerWidth <= mobileWidth || innerHeight <= mobileHeight;
    }
  }
  // Additional check for window dimensions to catch landscape tablets and small laptops
  else if (typeof navigator !== "undefined") {
    onMobile = /Mobi|Android/i.test(navigator.userAgent);
  }
  // Debugging output to verify the detection logic and environment
  else {
    // If we can't access window or navigator, log the environment for debugging
    const debugInfo = {
      msg: "Unable to access window or navigator objects for mobile detection. Defaulting to false.",
      windowInfo: {
        type: typeof window,
        obj: { ...window },
      },
      screenInfo: {
        type: typeof screen,
        obj: { ...screen },
      },
      navigatorInfo: {
        type: typeof navigator,
        obj: { ...navigator },
      },
      documentInfo: {
        type: typeof document,
        obj: { ...document },
      },
      urlInfo: {
        type: typeof URL,
        obj: { ...URL },
      },
    };
    if (Object.keys(console).includes("debug")) {
      console.debug({ ...debugInfo });
    } else {
      console.warn({ ...debugInfo });
    }
  }
  return onMobile;
}
