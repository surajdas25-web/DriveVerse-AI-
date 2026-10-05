import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useDrive } from "../state/DriveContext";
export default function TopNavbar({ open, onMenu }) {
  const { settings, saveSettings } = useDrive();
  const location = useLocation();
  const names = {
    "/": "Overview",
    "/digital-twin": "Digital twin",
    "/analytics": "Analytics",
    "/weather": "Road weather",
    "/maintenance": "Maintenance",
    "/settings": "Settings",
  };
  return (
    <header className="top-navbar">
      <div className="breadcrumb">
        <button
          className="icon-button menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="navigation"
          onClick={onMenu}
        >
          <FiMenu />
        </button>
        <span>Workspace</span>
        <span>/</span>
        <strong>{names[location.pathname] || "Page not found"}</strong>
      </div>
      <div className="navbar-actions">
        <span className="demo-pill">Demo mode</span>
        <button
          className="icon-button"
          onClick={() =>
            saveSettings({ ...settings, darkMode: !settings.darkMode })
          }
          aria-label={
            settings.darkMode ? "Switch to light theme" : "Switch to dark theme"
          }
        >
          {settings.darkMode ? <FiSun /> : <FiMoon />}
        </button>
        <span className="avatar" aria-label={settings.driver}>
          {settings.driver.slice(0, 2).toUpperCase()}
        </span>
      </div>
    </header>
  );
}
