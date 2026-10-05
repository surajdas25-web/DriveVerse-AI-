import { useDrive } from "../state/DriveContext";
import { useChartOptions } from "./chartTheme";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import Card from "react-bootstrap/Card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function FuelChart() {
  const { settings } = useDrive();
  const accent = settings.darkMode ? "#b6ee6a" : "#467d1b";
  const options = useChartOptions();
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

    datasets: [
      {
        label: "Fuel Used (L)",
        data: [9, 12, 10, 8, 15, 11],
        backgroundColor: accent,
      },
    ],
  };

  return (
    <Card className="vehicle-card">
      <Card.Body>
        <h4> Fuel Consumption</h4>

        <div className="chart-area">
          <Bar
            data={data}
            options={options}
            role="img"
            aria-label="Sample fuel used Monday to Saturday: 9, 12, 10, 8, 15, 11 liters."
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default FuelChart;
