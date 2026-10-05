import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

function FuelGauge({ fuel }) {
  return (
    <Card className="vehicle-card">
      <Card.Body>
        <h4> Fuel Level</h4>

        <ProgressBar
          now={fuel}
          label={`${fuel}%`}
          variant={fuel > 30 ? "success" : "danger"}
        />
      </Card.Body>
    </Card>
  );
}

export default FuelGauge;
