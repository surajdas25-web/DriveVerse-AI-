import { useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiCheck,
  FiEdit2,
  FiTrash2,
  FiTool,
} from "react-icons/fi";
import PageHeader from "../components/PageHeader";
const blank = { title: "", date: "", status: "Planned", notes: "" };
function readRecords() {
  try {
    const data = JSON.parse(localStorage.getItem("driveverse.maintenance"));
    return Array.isArray(data)
      ? data.filter(
          (r) =>
            r &&
            typeof r.id === "string" &&
            typeof r.title === "string" &&
            typeof r.date === "string" &&
            ["Planned", "Completed"].includes(r.status),
        )
      : [];
  } catch {
    return [];
  }
}
export default function Maintenance() {
  const [records, setRecords] = useState(readRecords);
  const [draft, setDraft] = useState(null);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState(null);
  function persist(next) {
    setRecords(next);
    try {
      localStorage.setItem("driveverse.maintenance", JSON.stringify(next));
      return true;
    } catch {
      setMessage(
        "Browser storage unavailable. Records remain for this session only.",
      );
      return false;
    }
  }
  function save(e) {
    e.preventDefault();
    if (!draft.title.trim() || !draft.date) {
      setMessage("Enter a service name and date.");
      return;
    }
    const record = {
      ...draft,
      title: draft.title.trim(),
      notes: draft.notes.trim(),
      id: editing || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };
    const saved = persist(
      editing
        ? records.map((r) => (r.id === editing ? record : r))
        : [...records, record],
    );
    setDraft(null);
    setEditing(null);
    if (saved) setMessage("Service record saved.");
  }
  const visible = records
    .filter(
      (r) =>
        (filter === "All" || r.status === filter) &&
        `${r.title} ${r.notes}`.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <PageHeader
        eyebrow="VEHICLE CARE"
        title="Keep the road ahead clear."
        description="Plan your next service and keep a simple history of vehicle care."
        action={
          <button
            className="btn btn-primary"
            onClick={() => {
              setDraft({ ...blank });
              setEditing(null);
              setMessage("");
            }}
          >
            <FiPlus /> Add service
          </button>
        }
      />
      <div className="maintenance-summary">
        <section className="metric-card">
          <span className="muted">Planned services</span>
          <strong className="metric-value">
            {records.filter((r) => r.status === "Planned").length}
          </strong>
        </section>
        <section className="metric-card">
          <span className="muted">Completed services</span>
          <strong className="metric-value">
            {records.filter((r) => r.status === "Completed").length}
          </strong>
        </section>
      </div>
      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}
      {draft && (
        <form className="panel" onSubmit={save}>
          <h2>{editing ? "Edit service" : "New service"}</h2>
          <div className="two-grid">
            <label>
              Service name
              <input
                autoFocus
                className="form-control"
                required
                maxLength={80}
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </label>
            <label>
              Service date
              <input
                className="form-control"
                type="date"
                required
                value={draft.date}
                onChange={(e) => setDraft({ ...draft, date: e.target.value })}
              />
            </label>
            <label>
              Status
              <select
                className="form-select"
                value={draft.status}
                onChange={(e) => setDraft({ ...draft, status: e.target.value })}
              >
                <option>Planned</option>
                <option>Completed</option>
              </select>
            </label>
            <label>
              Notes
              <textarea
                className="form-control"
                maxLength={500}
                value={draft.notes}
                onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
              />
            </label>
          </div>
          <div className="controls">
            <button className="btn btn-primary">Save service</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setDraft(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <section className="panel">
        <div className="service-toolbar">
          <div className="search-input">
            <FiSearch />
            <input
              aria-label="Search services"
              className="form-control"
              placeholder="Search services"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select
            aria-label="Filter service status"
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Planned</option>
            <option>Completed</option>
          </select>
        </div>
        {visible.length ? (
          visible.map((r) => (
            <article className="service-record" key={r.id}>
              <span className="service-icon">
                <FiTool />
              </span>
              <div className="record-copy">
                <h3>{r.title}</h3>
                <p>
                  {new Date(`${r.date}T12:00:00`).toLocaleDateString(
                    undefined,
                    { day: "numeric", month: "short", year: "numeric" },
                  )}{" "}
                  <span className="tag">{r.status}</span>
                </p>
                {r.notes && <small>{r.notes}</small>}
              </div>
              <div className="record-actions">
                {r.status === "Planned" && (
                  <button
                    className="icon-button"
                    aria-label={`Complete ${r.title}`}
                    title="Mark completed"
                    onClick={() =>
                      persist(
                        records.map((x) =>
                          x.id === r.id ? { ...x, status: "Completed" } : x,
                        ),
                      )
                    }
                  >
                    <FiCheck />
                  </button>
                )}
                <button
                  className="icon-button"
                  aria-label={`Edit ${r.title}`}
                  onClick={() => {
                    setDraft({ ...r });
                    setEditing(r.id);
                  }}
                >
                  <FiEdit2 />
                </button>
                <button
                  className="icon-button"
                  aria-label={`Delete ${r.title}`}
                  onClick={() => setDeleting(r.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
              {deleting === r.id && (
                <div className="delete-confirm">
                  <span>Delete this service record?</span>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      persist(records.filter((x) => x.id !== r.id));
                      setDeleting(null);
                    }}
                  >
                    Confirm delete
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setDeleting(null)}
                  >
                    Keep record
                  </button>
                </div>
              )}
            </article>
          ))
        ) : (
          <div className="empty-state">
            <FiTool size={36} />
            <h2>
              {records.length
                ? "No matching services"
                : "A fresh start for vehicle care."}
            </h2>
            <p>
              {records.length
                ? "Try another search or status filter."
                : "Add your first service to build your maintenance history."}
            </p>
          </div>
        )}
      </section>
      <p className="source-note">
        Records are saved in this browser. They are not synced to an account or
        service center.
      </p>
    </>
  );
}
