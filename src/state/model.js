export const initialVehicle = {
  speed: 0,
  battery: 92,
  fuel: 74,
  engine: 30,
  tire: 34,
  health: 96,
  engineOn: false,
};
export const defaults = {
  driver: "Suraj Das",
  vehicleName: "Toyota Camry 2025",
  darkMode: true,
  notifications: true,
  autoRefresh: true,
  unit: "Celsius",
};
export function vehicleReducer(v, action) {
  switch (action.type) {
    case "start":
      return v.fuel > 0 && v.battery > 0
        ? { ...v, engineOn: true, engine: 55 }
        : v;
    case "stop":
      return { ...v, engineOn: false, speed: 0, engine: 30 };
    case "accelerate": {
      if (!v.engineOn || v.fuel <= 0 || v.battery <= 0 || v.speed >= 180)
        return v;
      const fuel = Math.max(v.fuel - 2, 0),
        battery = Math.max(v.battery - 1, 0);
      return {
        ...v,
        fuel,
        battery,
        speed: fuel && battery ? Math.min(v.speed + 10, 180) : 0,
        engineOn: !!(fuel && battery),
        engine: Math.min(v.engine + 5, 120),
        health: Math.max(v.health - 1, 0),
      };
    }
    case "brake":
      return { ...v, speed: Math.max(v.speed - 10, 0) };
    case "refuel":
      return v.engineOn ? v : { ...v, fuel: 100 };
    case "reset":
      return { ...initialVehicle };
    default:
      return v;
  }
}
export function readSaved(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === "object" && !Array.isArray(value)
      ? value
      : fallback;
  } catch {
    return fallback;
  }
}

export function loadSettings() {
  const saved = readSaved("driveverse.settings", defaults);
  return Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => {
      const value = saved[key];
      if (key === "unit")
        return [
          key,
          ["Celsius", "Fahrenheit"].includes(value) ? value : fallback,
        ];
      if (typeof fallback === "string")
        return [
          key,
          typeof value === "string" && value.trim()
            ? value.trim().slice(0, key === "driver" ? 50 : 60)
            : fallback,
        ];
      return [key, typeof value === "boolean" ? value : fallback];
    }),
  );
}
