import { Link } from "react-router-dom";
import { FiArrowUpRight, FiShield, FiNavigation } from "react-icons/fi";
import { useDrive } from "../state/DriveContext";
import PageHeader from "../components/PageHeader";
import CarAnimation from "../components/CarAnimation";
import VehicleCard from "../components/VehicleCard";
import VehicleControls from "../components/VehicleControls";
import AIAssistant from "../components/AIAssistant";
export default function Dashboard() {
  const { vehicle: v, settings, temperature } = useDrive();
  return (
    <>
      <PageHeader
        title="A better view of every drive."
        description={`Welcome back, ${settings.driver.split(" ")[0]}. Your vehicle, all in one place.`}
        action={
          <Link className="btn btn-secondary" to="/digital-twin">
            Explore digital twin <FiArrowUpRight />
          </Link>
        }
      />
      <section className="vehicle-hero">
        <div className="hero-copy">
          <span className="eyebrow">YOUR GARAGE / DV–2045</span>
          <h2>{settings.vehicleName}</h2>
          <p>A smarter connection to the road.</p>
          <span className={`status-pill ${v.engineOn ? "active" : ""}`}>
            <i />
            {v.engineOn ? "Engine running" : "Parked · engine off"}
          </span>
          <div className="hero-meta">
            <span>
              Vehicle health<strong>{v.health}%</strong>
            </span>
            <span>
              Estimated range
              <strong>
                {Math.round(v.fuel * 5.7)} <small>km</small>
              </strong>
            </span>
          </div>
        </div>
        <div className="hero-art">
          <span className="art-orbit" />
          <CarAnimation running={v.engineOn} />
          <span className="art-caption">
            DIGITAL VEHICLE / SIMULATED TELEMETRY
          </span>
        </div>
      </section>
      <div className="section-heading overview-heading">
        <h2>At a glance</h2>
        <span className="muted">Updates with your simulation</span>
      </div>
      <div className="metric-grid">
        {[
          ["Speed", v.speed, "km/h"],
          ["Battery", v.battery, "%"],
          ["Fuel", v.fuel, "%"],
          [
            "Engine",
            temperature(v.engine),
            settings.unit === "Celsius" ? "°C" : "°F",
          ],
          ["Tire", v.tire, "PSI"],
          ["Health", v.health, "%"],
        ].map(([title, value, unit]) => (
          <VehicleCard key={title} {...{ title, value, unit }} />
        ))}
      </div>
      <VehicleControls />
      <div className="two-grid">
        <AIAssistant vehicle={v} />
        <section className="panel">
          <div className="section-heading">
            <h2>
              <FiNavigation /> Trip snapshot
            </h2>
            <span className="tag">Sample trip</span>
          </div>
          <div className="trip-stats">
            <div>
              <strong>
                18 <small>km</small>
              </strong>
              <span>Distance</span>
            </div>
            <div>
              <strong>
                32 <small>min</small>
              </strong>
              <span>Duration</span>
            </div>
            <div>
              <strong>
                34 <small>km/h</small>
              </strong>
              <span>Average speed</span>
            </div>
          </div>
          <p className="muted">
            <FiShield /> Explore weekly performance in{" "}
            <Link to="/analytics">Analytics</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
