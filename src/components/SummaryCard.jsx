import { useDrive } from "../state/DriveContext";
import Card from "react-bootstrap/Card";

function SummaryCard() {
  const { temperature, settings } = useDrive();
  return (
    <Card className="vehicle-card">
      <Card.Body>
        <h4> Sample trip summary</h4>

        <p> Distance : 182 km</p>

        <p> Fuel Used : 16 L</p>

        <p> Battery : 91%</p>

        <p>
          {" "}
          Engine Temp : {temperature(82)}°
          {settings.unit === "Celsius" ? "C" : "F"}
        </p>

        <p> Average Speed : 72 km/h</p>
      </Card.Body>
    </Card>
  );
}

export default SummaryCard;
