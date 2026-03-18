/**
 *  @file reportWebVitals.js
 *  @fileoverview Performance monitoring setup for the portfolio application, utilizing the web-vitals library to capture key performance metrics such as CLS, FID, LCP, and TTFB. This file defines a function that can be passed to the React app's performance reporting mechanism, allowing developers to log or send these metrics to an analytics endpoint for further analysis and optimization.
 *  @module reportWebVitals
 */

/**
 *  @name reportWebVitals
 *  @description Function to report web vitals metrics. This function can be passed to the React app's performance reporting mechanism (e.g., in index.js) to capture and log key performance metrics such as CLS, FID, LCP, and TTFB. The function checks if the provided argument is a function and, if so, dynamically imports the web-vitals library to retrieve and report the metrics.
 *  @param {function} onPerfEntry - A callback function that will be called with the performance metrics. This function should handle the logging or sending of the metrics to an analytics endpoint.
 *
 * @example
 * ```js
 * // In index.js or main.jsx
 * import reportWebVitals from './reportWebVitals';
 * reportWebVitals(console.log); // Logs the metrics to the console
 * ```
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
