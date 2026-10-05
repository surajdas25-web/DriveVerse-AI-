import { useState } from "react";
import { useDrive } from "../state/DriveContext";
import PageHeader from "../components/PageHeader";
export default function Settings() {
  const { settings, saveSettings } = useDrive();
  const [draft, setDraft] = useState(settings);
  const [message, setMessage] = useState("");
  const change = (key, value) => {
    setDraft((v) => ({ ...v, [key]: value }));
    setMessage("");
  };
  function save(e) {
    e.preventDefault();
    const next = {
      ...draft,
      driver: draft.driver.trim(),
      vehicleName: draft.vehicleName.trim(),
    };
    if (!next.driver || !next.vehicleName) {
      setMessage("Enter a driver name and vehicle name.");
      return;
    }
    const persisted = saveSettings(next);
    setDraft(next);
    setMessage(
      persisted
        ? "Preferences saved successfully."
        : "Preferences applied for this session only.",
    );
  }
  return (
    <>
      <PageHeader
        title="Make it your workspace."
        description="Personalize your vehicle, appearance, and weather preferences."
      />
      <form className="panel settings-panel" onSubmit={save}>
        <div className="section-heading">
          <h2>Driver & vehicle</h2>
          <span className="tag">Your profile</span>
        </div>
        <div className="two-grid">
          <label>
            Driver name
            <input
              className="form-control"
              value={draft.driver}
              onChange={(e) => change("driver", e.target.value)}
              required
              maxLength={50}
            />
          </label>
          <label>
            Vehicle name
            <input
              className="form-control"
              value={draft.vehicleName}
              onChange={(e) => change("vehicleName", e.target.value)}
              required
              maxLength={60}
            />
          </label>
        </div>
        <hr />
        <h2>Workspace preferences</h2>
        {[
          [
            "darkMode",
            "Dark appearance",
            "Use the darker palette throughout the workspace.",
          ],
          [
            "notifications",
            "Announce vehicle insights",
            "Announce changing simulation advice to assistive technology.",
          ],
          [
            "autoRefresh",
            "Refresh weather automatically",
            "Refresh the selected city's weather every 10 minutes.",
          ],
        ].map(([key, label, description]) => (
          <label className="preference-row" key={key}>
            <span>
              <strong>{label}</strong>
              <small>{description}</small>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={draft[key]}
              onChange={(e) => change(key, e.target.checked)}
            />
          </label>
        ))}
        <label className="unit-select">
          Temperature unit
          <select
            className="form-select"
            value={draft.unit}
            onChange={(e) => change("unit", e.target.value)}
          >
            <option>Celsius</option>
            <option>Fahrenheit</option>
          </select>
        </label>
        <div className="save-row">
          <button className="btn btn-primary" type="submit">
            Save preferences
          </button>
          <span role="status">{message}</span>
        </div>
      </form>
    </>
  );
}
