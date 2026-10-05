import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

function VehicleHealth({ health }) {
  let variant = "success";
  let status = "Excellent";

  if (health < 80) {
    variant = "warning";
    status = "Good";
  }

  if (health < 50) {
    variant = "danger";
    status = "Needs Service";
  }

  return (
    <Card className="vehicle-card">
      <Card.Body>
        <h4>Vehicle Health</h4>

        <h2>{health}%</h2>

        <ProgressBar now={health} variant={variant} />

        <h5 className="mt-3">{status}</h5>
      </Card.Body>
    </Card>
  );
}

export default VehicleHealth;
