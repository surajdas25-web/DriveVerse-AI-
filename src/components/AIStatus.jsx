import Card from "react-bootstrap/Card";
export default function AIStatus({ vehicle: v }) {
  return (
    <Card className="vehicle-card">
      <Card.Body>
        <h4>Simulation status</h4>
        <p>
          Mode: <b>{v.engineOn ? "Engine running" : "Parked"}</b>
        </p>
        <p>
          Estimated range: <b>{Math.round(v.fuel * 5.7)} km</b>
        </p>
        <p>
          Attention level:{" "}
          <b>
            {v.engine > 100 || v.health < 50 || v.fuel < 20
              ? "Review required"
              : "Normal"}
          </b>
        </p>
        <small className="muted">
          Estimates from simulated values, not vehicle diagnostics.
        </small>
      </Card.Body>
    </Card>
  );
}
