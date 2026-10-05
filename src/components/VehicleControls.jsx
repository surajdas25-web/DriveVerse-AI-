import { useDrive } from "../state/DriveContext";
import {
  FiPlay,
  FiSquare,
  FiPlus,
  FiMinus,
  FiDroplet,
  FiRotateCcw,
} from "react-icons/fi";
export default function VehicleControls() {
  const { vehicle: v, dispatch } = useDrive();
  const controls = [
    ["start", "Start engine", FiPlay, v.engineOn || !v.fuel || !v.battery],
    ["stop", "Stop engine", FiSquare, !v.engineOn],
    ["accelerate", "Accelerate", FiPlus, !v.engineOn || v.speed >= 180],
    ["brake", "Brake", FiMinus, !v.speed],
    ["refuel", "Refuel", FiDroplet, v.engineOn || v.fuel === 100],
    ["reset", "Reset simulation", FiRotateCcw, false],
  ];
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Simulation controls</h2>
        <span className="muted">Manual input</span>
      </div>
      <p className="muted">
        Start the engine to accelerate. Stop the engine before refueling.
      </p>
      <div className="controls">
        {controls.map(([type, label, Icon, disabled]) => (
          <button
            key={type}
            className={`btn ${type === "start" ? "btn-primary" : "btn-secondary"}`}
            disabled={disabled}
            onClick={() => dispatch({ type })}
          >
            <Icon aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
