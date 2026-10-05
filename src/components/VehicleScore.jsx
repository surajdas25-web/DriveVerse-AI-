import Card from "react-bootstrap/Card";

function VehicleScore({ vehicle }) {
  const score = Math.round(
    (vehicle.health + vehicle.battery + vehicle.fuel) / 3,
  );

  return (
    <Card className="vehicle-card">
      <Card.Body>
        <h4>Vehicle Score</h4>

        <div className="data-number">{score}/100</div>

        <h5>
          {score > 90 ? "Excellent" : score > 70 ? "Good" : "Needs Attention"}
        </h5>
      </Card.Body>
    </Card>
  );
}

export default VehicleScore;
