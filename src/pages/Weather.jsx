import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiSearch, FiCloud, FiSun, FiDroplet, FiWind } from "react-icons/fi";
import { useDrive } from "../state/DriveContext";
import { getWeather } from "../services/weather";
import PageHeader from "../components/PageHeader";
import WeatherDetails from "../components/WeatherDetails";
import DrivingAdvice from "../components/DrivingAdvice";
export default function Weather() {
  const { settings, temperature } = useDrive();
  const [city, setCity] = useState("Mumbai");
  const [selected, setSelected] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sample, setSample] = useState(false);
  const controller = useRef(null);
  const load = useCallback(async (name) => {
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    setLoading(true);
    setError("");
    setSample(false);
    setWeather(null);
    try {
      const data = await getWeather(name, request.signal);
      if (!request.signal.aborted) setWeather(data);
    } catch (e) {
      if (!axios.isCancel(e) && !request.signal.aborted)
        setError(
          e.response?.status === 429
            ? "Weather service is busy. Please try again shortly."
            : e.message.startsWith("City not found")
              ? e.message
              : "Couldn't load weather. Check your connection and try again.",
        );
    } finally {
      if (!request.signal.aborted) setLoading(false);
    }
  }, []);
  useEffect(() => {
    load(selected);
    const timer = settings.autoRefresh
      ? setInterval(() => load(selected), 600000)
      : null;
    return () => {
      controller.current?.abort();
      if (timer) clearInterval(timer);
    };
  }, [selected, settings.autoRefresh, load]);
  function search(e) {
    e.preventDefault();
    const name = city.trim();
    if (!name) {
      setError("Enter a city name.");
      return;
    }
    if (name === selected) load(name);
    else setSelected(name);
  }
  function showSample() {
    controller.current?.abort();
    setLoading(false);
    setError("");
    setSample(true);
    setWeather({
      name: "Mumbai",
      region: "Maharashtra, India",
      weather: [{ main: "Cloudy" }],
      main: { temp: 28, feels_like: 31, humidity: 72, pressure: 1012 },
      wind: { speed: 14 },
      time: "Sample data",
    });
  }
  return (
    <>
      <PageHeader
        eyebrow="ROAD CONDITIONS"
        title="Know before you go."
        description="Search current modeled weather conditions and review general driving guidance."
      />
      <form className="weather-search panel" onSubmit={search}>
        <label htmlFor="city">City or town</label>
        <div className="search-row">
          <div className="search-input">
            <FiSearch />
            <input
              id="city"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              maxLength={100}
              placeholder="Search a city, e.g. Mumbai"
            />
          </div>
          <button className="btn btn-primary" disabled={loading}>
            {" "}
            {loading ? "Searching…" : "Search weather"}
          </button>
        </div>
      </form>
      {loading && (
        <section className="panel empty-state" role="status">
          <div className="loader" />
          <h2>Checking the forecast…</h2>
          <p>Getting current conditions for {selected}.</p>
        </section>
      )}
      {error && (
        <section className="panel empty-state" role="alert">
          <FiCloud size={36} />
          <h2>Weather unavailable</h2>
          <p>{error}</p>
          <div className="controls">
            <button className="btn btn-primary" onClick={() => load(selected)}>
              Try again
            </button>
            <button className="btn btn-secondary" onClick={showSample}>
              Explore sample weather
            </button>
          </div>
        </section>
      )}
      {weather && !loading && (
        <>
          <section className="weather-hero panel">
            <div>
              <span className="eyebrow">
                {sample
                  ? "SAMPLE WEATHER · NOT LIVE"
                  : "CURRENT MODELED CONDITIONS"}
              </span>
              <h2>{weather.name}</h2>
              <p>{weather.region}</p>
              <div className="weather-temp">
                {temperature(weather.main.temp)}
                <span>°{settings.unit === "Celsius" ? "C" : "F"}</span>
              </div>
              <span className="muted">
                {weather.weather[0].main} ·{" "}
                {sample
                  ? "Illustrative conditions"
                  : `Local update: ${weather.time.replace("T", " ")}`}
              </span>
            </div>
            <div className="weather-symbol">
              {weather.weather[0].main === "Clear" ? <FiSun /> : <FiCloud />}
              <span>
                <FiDroplet /> {weather.main.humidity}% humidity
              </span>
              <span>
                <FiWind /> {weather.wind.speed} km/h wind
              </span>
            </div>
          </section>
          <div className="two-grid">
            <WeatherDetails weather={weather} />
            <DrivingAdvice weather={weather} />
          </div>
        </>
      )}
      <p className="source-note">
        Weather by{" "}
        <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
          Open-Meteo
        </a>
        . Guidance is general and does not account for local road conditions.
      </p>
    </>
  );
}
