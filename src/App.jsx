import { useEffect } from "react";



import "./App.css";
console.log("🚀 App component executing");

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
        
      </div>
    </BrowserRouter>
  );
}
