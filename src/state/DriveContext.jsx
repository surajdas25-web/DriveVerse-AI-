import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initialVehicle, vehicleReducer, loadSettings } from "./model";
const Context = createContext(null);
export function DriveProvider({ children }) {
  const [vehicle, dispatch] = useReducer(vehicleReducer, initialVehicle);
  const [settings, setSettings] = useState(loadSettings);
  const [storageError, setStorageError] = useState("");
  useEffect(() => {
    document.body.classList.toggle("dark-theme", settings.darkMode);
    document.body.classList.toggle("light-theme", !settings.darkMode);
  }, [settings.darkMode]);
  const saveSettings = (next) => {
    setSettings(next);
    try {
      localStorage.setItem("driveverse.settings", JSON.stringify(next));
      setStorageError("");
      return true;
    } catch {
      setStorageError(
        "Browser storage is unavailable. Changes apply for this session only.",
      );
      return false;
    }
  };
  const temperature = (value) =>
    settings.unit === "Fahrenheit"
      ? Math.round((value * 9) / 5 + 32)
      : Math.round(value);
  return (
    <Context.Provider
      value={{
        vehicle,
        dispatch,
        settings,
        saveSettings,
        temperature,
        storageError,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useDrive = () => useContext(Context);
