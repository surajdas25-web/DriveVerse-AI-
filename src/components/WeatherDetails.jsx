import { useDrive } from "../state/DriveContext";
export default function WeatherDetails({ weather: w }) {
  const { temperature, settings } = useDrive();
  return (
    <section className="panel">
      <h2>Conditions at a glance</h2>
      <dl className="detail-list">
        <div>
          <dt>Feels like</dt>
          <dd>
            {temperature(w.main.feels_like)}°
            {settings.unit === "Celsius" ? "C" : "F"}
          </dd>
        </div>
        <div>
          <dt>Humidity</dt>
          <dd>{w.main.humidity}%</dd>
        </div>
        <div>
          <dt>Wind speed</dt>
          <dd>{w.wind.speed} km/h</dd>
        </div>
        <div>
          <dt>Surface pressure</dt>
          <dd>{w.main.pressure} hPa</dd>
        </div>
      </dl>
    </section>
  );
}
