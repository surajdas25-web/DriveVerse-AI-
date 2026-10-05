import Card from "react-bootstrap/Card";

function AnalyticsCard({ title, value, unit }) {
  return (
    <Card className="vehicle-card text-center h-100">
      <Card.Body>
        <h5>{title}</h5>

        <div
          className="data-number"
          style={{
            color: "var(--accent)",
            fontWeight: "bold",
            marginTop: "15px",
          }}
        >
          {value}
        </div>

        <h5>{unit}</h5>
      </Card.Body>
    </Card>
  );
}

export default AnalyticsCard;
