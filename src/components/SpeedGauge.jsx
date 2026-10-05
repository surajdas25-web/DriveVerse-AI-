import Card from "react-bootstrap/Card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function SpeedGauge({ speed }) {
  return (
    <Card className="vehicle-card">
      <Card.Body>
        <h4> Speedometer</h4>

        <div style={{ width: 180, margin: "auto" }}>
          <CircularProgressbar
            styles={buildStyles({
              pathColor: "var(--accent)",
              trailColor: "var(--line)",
              textColor: "var(--text)",
              textSize: "15px",
            })}
            value={speed}
            maxValue={180}
            text={`${speed} km/h`}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default SpeedGauge;
