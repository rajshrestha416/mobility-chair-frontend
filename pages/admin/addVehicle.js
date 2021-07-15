import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

function AddVehicle() {
  return (
    <>
      <div>
        <div>
          <div>
            <h1 className="text-center">Add Vehicle</h1>
          </div>
          <div className="pl-lg-4" style={{ marginTop: "20px" }}>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Vehicle Type
                  </label>
                  <select className="form-control col-sm-9" id="#">
                    <option selected>Select from this select menu</option>
                    <option value="1">Two Wheeler</option>
                    <option value="2">Four Wheeler</option>
                  </select>
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-email">
                    Vehicle Number
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-email"
                    placeholder="123456789"
                    type="number"
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddVehicle;
