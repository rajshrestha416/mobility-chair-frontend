import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";

function AddVehicle({ closeAddVehicleModal }) {
  const addVehicle = () => {
    toast.success("Added Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const addFailed = () => {
    toast.error("Failed to Add", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
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
          <div className="d-flex justify-content-center">
            <Button
              className="btn btn-success"
              // onClick={setModalIsOpenToFalse}
              style={{ margin: "10px" }}
              onClick={addVehicle}
            >
              Add
            </Button>
            <Button
              className="btn btn-danger"
              onClick={closeAddVehicleModal}
              style={{ margin: "10px" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddVehicle;
