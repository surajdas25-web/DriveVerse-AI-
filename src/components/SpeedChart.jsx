import { useDrive } from "../state/DriveContext";
import { useChartOptions } from "./chartTheme";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import Card from "react-bootstrap/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function SpeedChart() {
  const { settings } = useDrive();
  const accent = settings.darkMode ? "#b6ee6a" : "#467d1b";
  const options = useChartOptions();
  const data = {
    labels: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"],

    datasets: [
      {
        label: "Speed (km/h)",
        data: [35, 52, 70, 95, 78, 60, 82],
        borderColor: accent,
        backgroundColor: accent,
        tension: 0.4,
      },
    ],
  };

  return (
    <Card className="vehicle-card">
      <Card.Body>
        <h4> Speed Trend</h4>

        <div className="chart-area">
          <Line
            data={data}
            options={options}
            role="img"
            aria-label="Sample hourly speeds: 35, 52, 70, 95, 78, 60, 82 kilometers per hour."
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default SpeedChart;
