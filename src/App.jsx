/**
 * @file App.jsx
 * @description Root application shell that configures route-level composition,
 * lazy page loading, and global head metadata.
 * @module src/App
 */

import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { useTheme } from "assets/context/ThemeContext.jsx";
import VisitorEvidenceLogger from "components/features/VisitorEvidenceLogger";
import { Head } from "components/navigation";
import BackToTopButton from "components/navigation/BackToTopButton";
import RouteScrollManager from "components/navigation/RouteScrollManager";
import { useThemeFavicon } from "hooks/useThemeFavicon";

const Home = lazy(() => import("pages/Home"));
const CodeStream = lazy(() => import("pages/CodeStream"));
const SandersonTechnologyEnterprises = lazy(() => import("pages/SandersonTechnologyEnterprises"));
const InterfaceSystem = lazy(() => import("pages/InterfaceSystem"));
const SideProjects = lazy(() => import("pages/SideProjects"));
const Hackathon = lazy(() => import("pages/Hackathon"));
const Smu = lazy(() => import("pages/SMU"));
const Contact = lazy(() => import("pages/Contact"));
const Docs = lazy(() => import("pages/Docs"));
const Privacy = lazy(() => import("pages/Privacy"));
const Health = lazy(() => import("pages/Health"));
const NotFound = lazy(() => import("pages/NotFound"));

/*
 * @public
 * @component
 * @name App
 * @description The root component of the portfolio application. It composes the
 * shared application shell, route-level code splitting, metadata, and scroll
 * restoration for the portfolio's case-study routes.
 *
 * Features:
 * - Uses React Router v8's `BrowserRouter` for client-side declarative routing.
 * - Defines the home, STE, Interface System, work archive, contact, and support routes.
 * - Includes a global `Head` component for route-aware document metadata.
 * - Keeps unknown URLs inside the branded, noindex fallback experience.
 *
 * @returns {JSX.Element} The rendered application component with routing and global layout.
 * @example
 * ```jsx
 * <App />
 * ```
 */
export default function App() {
  const { theme, palette } = useTheme();

  useThemeFavicon(theme, palette);

  return (
    <BrowserRouter>
      <RouteScrollManager />
      <VisitorEvidenceLogger />
      <div className="app-shell ly-page">
        <a className="skip-link interactive-surface" href="#main-content">
          Skip to main content
        </a>
        <Head />
        <div id="main-content" className="route-content" tabIndex={-1}>
          <Suspense fallback={<div aria-live="polite">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/codestream" element={<CodeStream />} />
              <Route
                path="/sanderson-technology-enterprises"
                element={<SandersonTechnologyEnterprises />}
              />
              <Route path="/interface-system" element={<InterfaceSystem />} />
              <Route path="/side-projects" element={<SideProjects />} />
              <Route path="/hackathon" element={<Hackathon />} />
              <Route path="/smu" element={<Smu />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/health" element={<Health />} />

              {/* Unknown URLs render the noindex fallback route. */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <BackToTopButton />
      </div>
    </BrowserRouter>
  );
}
