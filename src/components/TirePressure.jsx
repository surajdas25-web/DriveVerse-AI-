import Card from "react-bootstrap/Card";

function TirePressure() {
  return (
    <Card className="vehicle-card">
      <Card.Body>
        <h4> Tire Pressure</h4>

        <hr />

        <p>Front Left : 34 PSI</p>

        <p>Front Right : 35 PSI</p>

        <p>Rear Left : 33 PSI</p>

        <p>Rear Right : 34 PSI</p>
      </Card.Body>
    </Card>
  );
}

export default TirePressure;
