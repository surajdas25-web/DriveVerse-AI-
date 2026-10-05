import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="vehicle-card">
      <Card.Body>
        <h4> Live Vehicle Time</h4>

        <hr />

        <div
          className="data-number"
          style={{
            color: "var(--accent)",
            fontWeight: "bold",
          }}
        >
          {time.toLocaleTimeString()}
        </div>

        <h5 className="mt-3">{time.toLocaleDateString()}</h5>

        <p className="mt-2">
          {time.toLocaleDateString("en-US", { weekday: "long" })}
        </p>

        <p>{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
      </Card.Body>
    </Card>
  );
}

export default LiveClock;
