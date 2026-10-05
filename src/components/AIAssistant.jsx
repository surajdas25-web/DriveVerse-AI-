import { FiCpu, FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDrive } from "../state/DriveContext";
export default function AIAssistant({ vehicle: v }) {
  const { settings } = useDrive();
  let message =
    "All systems look healthy. Your vehicle is ready for the next journey.";
  let warning = false;
  if (v.engine > 100) {
    message =
      "Engine temperature is high. Stop the simulation and let it cool.";
    warning = true;
  } else if (v.fuel < 20) {
    message = "Fuel is running low. Stop the engine and refuel.";
    warning = true;
  } else if (v.battery < 20) {
    message = "Battery is low. Reset the simulation to restore charge.";
    warning = true;
  } else if (v.health < 50) {
    message = "Vehicle health needs attention. Review your maintenance plan.";
    warning = true;
  } else if (v.speed > 120) {
    message = "Speed is above 120 km/h. Brake to reduce simulated speed.";
    warning = true;
  }
  return (
    <section className={`panel insight-panel ${warning ? "warning" : ""}`}>
      <div className="section-heading">
        <h2>
          <FiCpu /> Vehicle insights
        </h2>
        <span className="tag">Rule-based</span>
      </div>
      <p role={settings.notifications ? "status" : undefined}>{message}</p>
      <Link to="/maintenance">
        View maintenance <FiArrowUpRight />
      </Link>
    </section>
  );
}
