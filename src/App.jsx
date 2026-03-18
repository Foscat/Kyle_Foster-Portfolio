import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Head } from "components/navigation";
import { Home, CodeStream, SideProjects, Hackathon, Smu, Contact, NotFound, Health } from "pages";
import "./App.css";
// Custom CSS library for click animations
import "./click-animate/click-animate.css";

console.log("🚀 App component executing");

/**
 * @public
 * @component
 * @name App
 * @description The root component of the portfolio application. Sets up global routing using React Router and defines the main layout structure. This component is responsible for rendering the appropriate page component based on the current URL path, as well as including the global `Head` component for consistent navigation and metadata across all pages.
 *
 * Features:
 * - Uses `BrowserRouter` for client-side routing with support for future React Router v7 features.
 * - Defines routes for all main pages: Home, CodeStream, Side Projects, Hackathon, SMU, Contact, and a catch-all NotFound page.
 * - Includes a global `Head` component that renders the site header and navigation links on all pages.
 * - Applies global CSS styles from `App.css` and a custom click animation library for enhanced interactivity.
 *
 * @returns {JSX.Element} The rendered application component with routing and global layout.
 * @example
 * ```jsx
 * <App />
 * ```
 */
export default function App() {
  useEffect(() => {
    console.log("🚀 App mounted successfully");
  });
  return (
    <BrowserRouter
      future={{
        v7_preventAbandonedRoutes: true,
        v7_preventUnnecessaryRerenders: true,
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="app-shell">
        <Head />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/codestream" element={<CodeStream />} />
          <Route path="/side-projects" element={<SideProjects />} />
          <Route path="/hackathon" element={<Hackathon />} />
          <Route path="/smu" element={<Smu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/health" element={<Health />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
