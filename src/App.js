import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect, Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { DriveProvider, useDrive } from "./state/DriveContext";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import DigitalTwin from "./pages/DigitalTwin";
import Analytics from "./pages/Analytics";
import Weather from "./pages/Weather";
import Maintenance from "./pages/Maintenance";
import Settings from "./pages/Settings";
class ErrorBoundary extends Component {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <section className="panel">
        <h1>Something went wrong</h1>
        <p>Reload the workspace to try again.</p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Reload workspace
        </button>
      </section>
    ) : (
      this.props.children
    );
  }
}
function Shell() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { storageError } = useDrive();
  useEffect(() => {
    setOpen(false);
    document.title = `DriveVerse · ${location.pathname === "/" ? "Overview" : location.pathname.slice(1).replace("-", " ")}`;
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="main">
        <TopNavbar open={open} onMenu={() => setOpen((v) => !v)} />
        <main id="main-content" className="content">
          {storageError && (
            <p role="alert" className="notice">
              {storageError}
            </p>
          )}
          <ErrorBoundary key={location.pathname}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/digital-twin" element={<DigitalTwin />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/settings" element={<Settings />} />
              <Route
                path="*"
                element={
                  <section className="panel empty-state">
                    <span className="eyebrow">404 / OFF THE MAP</span>
                    <h1>Let's get you back on track.</h1>
                    <p>This page doesn't exist.</p>
                    <Link className="btn btn-primary" to="/">
                      Back to overview
                    </Link>
                  </section>
                }
              />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </div>
  );
}
export default function App() {
  return (
    <DriveProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </DriveProvider>
  );
}
