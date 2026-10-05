import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiCpu,
  FiBarChart2,
  FiCloud,
  FiTool,
  FiSettings,
  FiArrowUpRight,
} from "react-icons/fi";
const links = [
  ["/", "Overview", FiGrid],
  ["/digital-twin", "Digital twin", FiCpu],
  ["/analytics", "Analytics", FiBarChart2],
  ["/weather", "Road weather", FiCloud],
  ["/maintenance", "Maintenance", FiTool],
  ["/settings", "Settings", FiSettings],
];
export default function Sidebar({ open, onClose }) {
  return (
    <>
      <button
        className={`nav-scrim ${open ? "visible" : ""}`}
        aria-label="Close navigation"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />
      <aside id="navigation" className={`sidebar ${open ? "open" : ""}`}>
        <NavLink to="/" onClick={onClose} className="brand">
          <span className="brand-symbol">
            D<span>V</span>
          </span>
          DriveVerse<span className="brand-dot">®</span>
        </NavLink>
        <div className="nav-label">WORKSPACE</div>
        <nav aria-label="Main navigation">
          {links.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={onClose}>
              <Icon aria-hidden="true" />
              {label}
              <span className="nav-active-dot" />
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <FiCpu />
            <strong>Your virtual garage</strong>
            <p>Explore, simulate, and understand your vehicle.</p>
            <NavLink to="/digital-twin" onClick={onClose}>
              Open digital twin <FiArrowUpRight />
            </NavLink>
          </div>
          <span className="connection">
            <i /> Simulation workspace
          </span>
          <small>DRIVEVERSE / V1.0</small>
        </div>
      </aside>
    </>
  );
}
