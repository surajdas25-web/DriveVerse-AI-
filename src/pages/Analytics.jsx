import PageHeader from "../components/PageHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AnalyticsCard from "../components/AnalyticsCard";
import SpeedChart from "../components/SpeedChart";
import FuelChart from "../components/FuelChart";
import BatteryChart from "../components/BatteryChart";
import DrivingScore from "../components/DrivingScore";
import SummaryCard from "../components/SummaryCard";

function Analytics() {
  return (
    <div>
      <PageHeader
        eyebrow="PERFORMANCE / SAMPLE DATA"
        title="Every journey tells a story."
        description="An illustrative week of driving. These sample charts are separate from the manual simulation."
      />
      <Row className="g-4">
        <Col md={4}>
          <AnalyticsCard title="Today's Distance" value="182" unit="km" />
        </Col>

        <Col md={4}>
          <AnalyticsCard title="Fuel Used" value="16" unit="L" />
        </Col>

        <Col md={4}>
          <AnalyticsCard title="Average Speed" value="72" unit="km/h" />
        </Col>
      </Row>

      <Row className="mt-4 g-4">
        <Col md={12}>
          <SpeedChart />
        </Col>
      </Row>

      <Row className="mt-4 g-4">
        <Col md={6}>
          <FuelChart />
        </Col>

        <Col md={6}>
          <BatteryChart />
        </Col>
      </Row>

      <Row className="mt-4 g-4">
        <Col md={6}>
          <DrivingScore />
        </Col>

        <Col md={6}>
          <SummaryCard />
        </Col>
      </Row>
    </div>
  );
}

export default Analytics;
