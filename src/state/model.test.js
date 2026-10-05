import {
  initialVehicle,
  vehicleReducer,
  readSaved,
  loadSettings,
} from "./model";
test("simulation transitions, bounds, and safe refueling", () => {
  let v = { ...initialVehicle };
  expect(vehicleReducer(v, { type: "accelerate" })).toEqual(v);
  v = vehicleReducer(v, { type: "start" });
  v = vehicleReducer(v, { type: "accelerate" });
  expect(v).toMatchObject({ speed: 10, fuel: 72, battery: 91, engineOn: true });
  expect(vehicleReducer(v, { type: "refuel" }).fuel).toBe(72);
  for (let i = 0; i < 30; i++) v = vehicleReducer(v, { type: "accelerate" });
  expect(v.speed).toBe(180);
  expect(v.engine).toBeLessThanOrEqual(120);
  v = vehicleReducer(v, { type: "stop" });
  expect(v.speed).toBe(0);
  expect(vehicleReducer(v, { type: "refuel" }).fuel).toBe(100);
  expect(vehicleReducer(v, { type: "reset" })).toEqual(initialVehicle);
});
test("exhausted fuel stops engine and prevents restart", () => {
  let v = { ...initialVehicle, engineOn: true, speed: 50, fuel: 1 };
  v = vehicleReducer(v, { type: "accelerate" });
  expect(v).toMatchObject({ fuel: 0, speed: 0, engineOn: false });
  expect(vehicleReducer(v, { type: "start" })).toEqual(v);
});
test("malformed browser storage is handled", () => {
  localStorage.setItem("bad", "{");
  expect(readSaved("bad", { ok: true })).toEqual({ ok: true });
  localStorage.setItem("bad", "[]");
  expect(readSaved("bad", { ok: true })).toEqual({ ok: true });
});

test("validates saved preference types", () => {
  localStorage.setItem(
    "driveverse.settings",
    JSON.stringify({
      driver: 42,
      darkMode: "false",
      unit: "Kelvin",
      vehicleName: "",
    }),
  );
  expect(loadSettings()).toMatchObject({
    driver: "Suraj Das",
    darkMode: true,
    unit: "Celsius",
    vehicleName: "Toyota Camry 2025",
  });
});
