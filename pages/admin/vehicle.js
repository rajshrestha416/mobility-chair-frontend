import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";

import Modal from "react-modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row
} from "reactstrap";

import axios from "axios";
import AddVehicle from "./AddVehicle";

// layout for this page
import Admin from "../../layouts/Admin.js";
// core components
import UserHeader from "../../components/Headers/UserHeader";
import { Button } from "react-bootstrap";

function Vehicle() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [Vehicle, setVechile] = React.useState([]);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };
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

  useEffect(() => {
    // selectUser;
    axios('http://localhost:3001/api/vehicle/60d2a7370cb06b0b2416e66e')
      .then(response => {
        // console.log({ "vehicle": response.data.c});
        setVechile(response.data.vehicle);
      })
      .catch(err => {
        alert("Cannot retrieve vehicle");
      });
  }, []);

  var _rows = 
  // Vehicle.map(vehicle => 
    {
    // var vehicle_type = vehicle.vehicle_type;
    // var vehicle_number = vehicle.vehicle_number;

    // return {
      'vehicle_type': Vehicle.vehicle_type,
      'vehicle_number': Vehicle.vehicle_number,
    };
  // }
  // );

  const dataTable = {
    columns: [
      {
        label: "Vehicle Type",
        field: "vehicle_type",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Vehicle Number",
        field: "vehicle_number",
        width: 100,
      }
    ],
    rows: [_rows]
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}

      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="row">
                  <h3 className="mb-0 col-lg-6">
                    <strong>Vehicle Details</strong>
                  </h3>
                  <div className="col-lg-6 d-flex flex-row-reverse">
                    <button
                      className="btn btn-primary p-2"
                      type="button"
                      onClick={setModalIsOpenToTrue}
                    >
                      Add Vehicle
                    </button>
                  </div>
                </div>
              </CardHeader>
              <div style={{ padding: "20px" }}>
                <MDBDataTableV5
                  className="detailsTable"
                  hover
                  scrollX
                  entriesOptions={[5, 10, 15]}
                  entries={5}
                  pagesAmount={4}
                  data={dataTable}
                  searchTop
                  searchBottom={false}
                />
              </div>
            </Card>
            {/* Modal for add Vehicle */}
            <div className="addVehicle">
              <Modal
                isOpen={modalIsOpen}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{
                  overlay: {
                    justifyContent: "center",
                    display: "flex",
                  },
                  content: {
                    width: "50%",
                    minHeight: "25%",
                    margin: "auto",
                    backgroundColor: "white",
                    boxShadow: "5px 4px 20px 20px #0000000f",
                    padding: "20px",
                    position: "relative",
                  },
                }}
                className="addVehicle"
              >
                <AddVehicle />
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
                    onClick={setModalIsOpenToFalse}
                    style={{ margin: "10px" }}
                  >
                    Cancel
                  </Button>
                </div>
              </Modal>
            </div>
          </div>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

Vehicle.layout = Admin;

export default Vehicle;
