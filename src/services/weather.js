import axios from "axios";
export function condition(code) {
  if (code === 0) return "Clear";
  if (code <= 3) return "Cloudy";
  if (code <= 48) return "Fog";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain";
  if (code <= 86) return "Snow";
  return "Thunderstorm";
}
export async function getWeather(city, signal) {
  const { data: geo } = await axios.get(
    "https://geocoding-api.open-meteo.com/v1/search",
    {
      params: { name: city, count: 1, language: "en", format: "json" },
      signal,
      timeout: 12000,
    },
  );
  const place = geo.results?.[0];
  if (!place)
    throw new Error(
      "City not found. Try a nearby city or a more specific name.",
    );
  const { data } = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: place.latitude,
      longitude: place.longitude,
      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure",
      timezone: "auto",
    },
    signal,
    timeout: 12000,
  });
  const c = data.current;
  if (
    !c ||
    !Number.isFinite(c.temperature_2m) ||
    !Number.isFinite(c.weather_code)
  )
    throw new Error("Weather data is unavailable for this location.");
  return {
    name: place.name,
    region: [place.admin1, place.country].filter(Boolean).join(", "),
    weather: [{ main: condition(c.weather_code) }],
    main: {
      temp: c.temperature_2m,
      feels_like: c.apparent_temperature,
      humidity: c.relative_humidity_2m,
      pressure: c.surface_pressure,
    },
    wind: { speed: c.wind_speed_10m },
    time: c.time,
  };
}
