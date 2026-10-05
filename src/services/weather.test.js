import axios from "axios";
import { getWeather, condition } from "./weather";
jest.mock("axios");
test("maps weather codes for all supported condition types", () => {
  expect([0, 3, 45, 61, 71, 95].map(condition)).toEqual([
    "Clear",
    "Cloudy",
    "Fog",
    "Rain",
    "Snow",
    "Thunderstorm",
  ]);
});
test("handles missing cities", async () => {
  axios.get.mockResolvedValueOnce({ data: {} });
  await expect(getWeather("unknown")).rejects.toThrow("City not found");
});
test("normalizes a successful provider response", async () => {
  axios.get
    .mockResolvedValueOnce({
      data: {
        results: [
          { name: "Mumbai", country: "India", latitude: 19, longitude: 72 },
        ],
      },
    })
    .mockResolvedValueOnce({
      data: {
        current: {
          temperature_2m: 28,
          weather_code: 3,
          relative_humidity_2m: 70,
          wind_speed_10m: 10,
          time: "2026-10-04T12:00",
        },
      },
    });
  expect(await getWeather("Mumbai")).toMatchObject({
    name: "Mumbai",
    main: { temp: 28 },
    weather: [{ main: "Cloudy" }],
    wind: { speed: 10 },
  });
});
