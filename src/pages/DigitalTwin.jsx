import { useDrive } from "../state/DriveContext";
import PageHeader from "../components/PageHeader";
import CarAnimation from "../components/CarAnimation";
import VehicleControls from "../components/VehicleControls";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import SpeedGauge from "../components/SpeedGauge";
import FuelGauge from "../components/FuelGauge";
import BatteryGauge from "../components/BatteryGauge";
import VehicleHealth from "../components/VehicleHealth";
import VehicleScore from "../components/VehicleScore";
import AIAssistant from "../components/AIAssistant";
import LiveClock from "../components/LiveClock";
import TirePressure from "../components/TirePressure";
import AIStatus from "../components/AIStatus";

function DigitalTwin() {
  const { vehicle, settings } = useDrive();

  return (
    <div>
      <PageHeader
        title="Your vehicle. In sync."
        description="Explore the same simulation as your overview, with a closer look at every system."
      />
      <Row>
        <Col md={12}>
          <Card className="vehicle-card">
            <Card.Body className="text-center">
              <CarAnimation running={vehicle.engineOn} />

              <h2>Vehicle Digital Twin</h2>

              <p>Manual vehicle simulation · no hardware connected</p>

              <hr />

              <Row className="mt-3">
                <Col md={3}>
                  <h5>Vehicle</h5>
                  <p>{settings.vehicleName}</p>
                </Col>

                <Col md={3}>
                  <h5>Vehicle ID</h5>
                  <p>DV-2045</p>
                </Col>

                <Col md={3}>
                  <h5>Software</h5>
                  <p>Demo v1.0</p>
                </Col>

                <Col md={3}>
                  <h5>Status</h5>

                  <span
                    style={{
                      color: "var(--accent)",
                      fontWeight: "bold",
                    }}
                  >
                    {vehicle.engineOn ? "Running" : "Parked"}
                  </span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-4">
        <VehicleControls />
      </div>
      {/* Gauges */}

      <Row className="mt-4 g-4">
        <Col md={4}>
          <SpeedGauge speed={vehicle.speed} />
        </Col>

        <Col md={4}>
          <FuelGauge fuel={vehicle.fuel} />
        </Col>

        <Col md={4}>
          <BatteryGauge battery={vehicle.battery} />
        </Col>
      </Row>

      {/* Health & Score */}

      <Row className="mt-4 g-4">
        <Col md={6}>
          <VehicleHealth health={vehicle.health} />
        </Col>

        <Col md={6}>
          <VehicleScore vehicle={vehicle} />
        </Col>
      </Row>

      {/* Tire Pressure & AI */}

      <Row className="mt-4 g-4">
        <Col md={6}>
          <TirePressure />
        </Col>

        <Col md={6}>
          <AIAssistant vehicle={vehicle} />
        </Col>
      </Row>

      {/* AI Status & Clock */}

      <Row className="mt-4 g-4">
        <Col md={6}>
          <AIStatus vehicle={vehicle} />
        </Col>

        <Col md={6}>
          <LiveClock />
        </Col>
      </Row>
    </div>
  );
}

export default DigitalTwin;
