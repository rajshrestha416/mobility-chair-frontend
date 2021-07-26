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
import AddVehicle from "./addVehicle";

// layout for this page
import Admin from "../../layouts/Admin.js";
// core components
import UserHeader from "../../components/Headers/UserHeader";

function Vehicle() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [Vehicle, setVechile] = React.useState([]);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    axios.get("https://mobility-wheelchair-backend.herokuapp.com/api/vehicle")
      .then(response => {
        setVechile(response.data.vehicles);
      })
      .catch(err => {
        alert("Cannot retrieve vehicle");
      });
  }, []);

  var _rows =
    Vehicle.map(vehicle => {
      // console.log("veeee", vehicle)
      var vehicle_type = vehicle.vehicle_type;
      var vehicle_number = vehicle.vehicle_number;
      var action = <div>
        <button>
          edit
        </button>
        <button>
          
        </button>
      </div>;
      console.log("veee", vehicle_type);
      return {
        'vehicle_type': vehicle_type,
        'vehicle_number': vehicle_number,
        'action': action
      };
    }
    );

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
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        width: 200
      }
    ],
    rows: _rows
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
                <AddVehicle closeAddVehicleModal={setModalIsOpenToFalse} />
              </Modal>
            </div>
          </div>
        </Row>
      </Container>
      <ToastContainer />s
    </>
  );
}

Vehicle.layout = Admin;

export default Vehicle;
