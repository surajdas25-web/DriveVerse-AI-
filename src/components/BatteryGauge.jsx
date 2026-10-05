import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

function BatteryGauge({ battery }) {
  return (
    <Card className="vehicle-card">
      <Card.Body>
        <h4> Battery</h4>

        <ProgressBar
          now={battery}
          label={`${battery}%`}
          variant={battery > 30 ? "info" : "warning"}
        />
      </Card.Body>
    </Card>
  );
}

export default BatteryGauge;
