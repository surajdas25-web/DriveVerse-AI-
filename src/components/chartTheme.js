import { useDrive } from "../state/DriveContext";
export function useChartOptions(extra = {}) {
  const { settings } = useDrive();
  const color = settings.darkMode ? "#a6b5bd" : "#526571";
  return {
    responsive: true,
    animation: false,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color, usePointStyle: true, padding: 20 } },
    },
    scales: {
      x: { ticks: { color }, grid: { display: false } },
      y: {
        ticks: { color },
        grid: { color: settings.darkMode ? "#26363e" : "#e6edef" },
      },
    },
    ...extra,
  };
}
