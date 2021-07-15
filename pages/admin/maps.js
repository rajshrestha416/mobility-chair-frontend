import React from "react";
import UserHeader from "../../components/Headers/UserHeader";
import dynamic from "next/dynamic";

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";

const ShowMap = dynamic(() => import("../admin/showMap"), {
  loading: () => <p>Loading Map</p>,
  ssr: false,
});

function Maps() {
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0"></Card>
            <ShowMap />
          </div>
        </Row>
      </Container>
    </>
  );
}

Maps.layout = Admin;

export default Maps;
