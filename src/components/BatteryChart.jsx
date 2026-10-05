import { useDrive } from "../state/DriveContext";
import { useChartOptions } from "./chartTheme";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import Card from "react-bootstrap/Card";

ChartJS.register(ArcElement, Tooltip, Legend);

function BatteryChart() {
  const { settings } = useDrive();
  const accent = settings.darkMode ? "#b6ee6a" : "#467d1b";
  const options = useChartOptions({ scales: {}, cutout: "72%" });
  const data = {
    labels: ["Used", "Remaining"],

    datasets: [
      {
        data: [9, 91],
        backgroundColor: ["#F44336", accent],
      },
    ],
  };

  return (
    <Card className="vehicle-card">
      <Card.Body>
        <h4> Battery Status</h4>

        <div className="chart-area">
          <Doughnut
            data={data}
            options={options}
            role="img"
            aria-label="Sample battery charge: 91 percent remaining, 9 percent used."
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default BatteryChart;
