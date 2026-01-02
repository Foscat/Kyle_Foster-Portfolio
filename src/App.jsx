import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Head from "components/Head";
import Health from "components/Health";

import Home from "pages/Home";
import CodeStream from "pages/CodeStream";
import SideProjects from "pages/SideProjects";
import Hackathon from "pages/Hackathon";
import SMU from "pages/SMU";
import Contact from "pages/Contact";
import NotFound from "pages/NotFound";

import "./App.css";

/**
 * App.jsx
 * ---------------------------------------------------------------------------
 * Top-level router
 *
 * Notes:
 * - React Router v6+ requires <Routes> and <Route element={...} />.
 * - <Head /> is rendered inside the router so it can read the current location.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function App() {
  useEffect(() => {
    console.log("🚀 App mounted successfully");
  });
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Head />

        <main
          className="app-main"
          role="main"
        >
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/codestream"
              element={<CodeStream />}
            />
            <Route
              path="/side-projects"
              element={<SideProjects />}
            />
            <Route
              path="/hackathon"
              element={<Hackathon />}
            />
            <Route
              path="/smu"
              element={<SMU />}
            />
            <Route
              path="/contact"
              element={<Contact />}
            />
            <Route
              path="/health"
              element={<Health />}
            />

            {/* Catch-all */}
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
