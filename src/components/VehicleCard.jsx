import {
  FiActivity,
  FiBatteryCharging,
  FiDroplet,
  FiThermometer,
  FiCircle,
  FiShield,
} from "react-icons/fi";
const icons = {
  Speed: FiActivity,
  Battery: FiBatteryCharging,
  Fuel: FiDroplet,
  Engine: FiThermometer,
  Tire: FiCircle,
  Health: FiShield,
};
export default function VehicleCard({ title, value, unit }) {
  const Icon = icons[title] || FiActivity;
  return (
    <section className="metric-card">
      <div className="metric-top">
        <span>{title}</span>
        <Icon aria-hidden="true" />
      </div>
      <div className="metric-value">
        {value}
        <span>{unit}</span>
      </div>
      <div className="metric-track">
        <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </section>
  );
}
