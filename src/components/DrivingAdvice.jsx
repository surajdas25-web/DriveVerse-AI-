import { FiNavigation } from "react-icons/fi";
const advice = {
  Rain: "Allow more stopping distance and reduce speed on wet roads.",
  Thunderstorm:
    "Consider postponing travel during severe storms. Check local alerts.",
  Fog: "Reduce speed, use appropriate lights, and increase following distance.",
  Snow: "Watch for reduced traction and follow local winter travel guidance.",
  Clear:
    "Stay attentive, keep a safe following distance, and check your route.",
  Cloudy: "Stay attentive and check for changing conditions along your route.",
};
export default function DrivingAdvice({ weather }) {
  return (
    <section className="panel insight-panel">
      <div className="section-heading">
        <h2>
          <FiNavigation /> Driving guidance
        </h2>
        <span className="tag">General advice</span>
      </div>
      <p>{advice[weather.weather[0].main] || advice.Clear}</p>
      <small>Weather alone cannot determine whether a journey is safe.</small>
    </section>
  );
}
