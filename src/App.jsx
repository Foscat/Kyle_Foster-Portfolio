import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Head } from "components/navigation";
import Home from "pages/Home";
import "./App.css";
// Custom CSS library for click animations
import "./click-animate/interactive-surface.css";

const CodeStream = lazy(() => import("pages/CodeStream"));
const SideProjects = lazy(() => import("pages/SideProjects"));
const Hackathon = lazy(() => import("pages/Hackathon"));
const Smu = lazy(() => import("pages/SMU"));
const Contact = lazy(() => import("pages/Contact"));
const Docs = lazy(() => import("pages/Docs"));
const Health = lazy(() => import("pages/Health"));
const NotFound = lazy(() => import("pages/NotFound"));

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
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="app-shell">
        <Head />
        <Suspense fallback={<div aria-live="polite">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/codestream" element={<CodeStream />} />
            <Route path="/side-projects" element={<SideProjects />} />
            <Route path="/hackathon" element={<Hackathon />} />
            <Route path="/smu" element={<Smu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/health" element={<Health />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
