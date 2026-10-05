import Card from "react-bootstrap/Card";

function DrivingScore() {
  return (
    <Card className="vehicle-card">
      <Card.Body>
        <h4> Driving Score</h4>

        <div
          className="data-number"
          style={{
            color: "var(--accent)",
          }}
        >
          94/100
        </div>

        <p>Excellent Driving Performance</p>

        <p> Smooth Acceleration</p>

        <p> Safe Braking</p>

        <p> Fuel Efficient</p>
      </Card.Body>
    </Card>
  );
}

export default DrivingScore;
