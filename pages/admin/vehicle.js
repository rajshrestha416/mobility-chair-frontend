import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";

// import Modal from "react-modal";
import { Modal } from "react-bootstrap";

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
import UpdateVehicle from "./UpdateVehicle";

// layout for this page
import Admin from "../../layouts/Admin.js";
// core components
import UserHeader from "../../components/Headers/UserHeader";

function Vehicle() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [Vehicle, setVechile] = useState([]);
  const [vehicleId, setSelectVehicle] = useState("");

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const setDeleteModalClose = () => {
    setDeleteModal(false);
  };
  const setDeleteModalOpen = () => {
    setDeleteModal(true);
  };

  const setUpdateModalClose = () => {
    setUpdateModal(false);
  };
  const setUpdateModalOpen = (id) => {
    setUpdateModal(true);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/api/vehicle")
      .then(response => {
        setVechile(response.data.vehicles);
      })
      .catch(err => {
        alert("Cannot retrieve vehicle");
      });
  }, [Vehicle]);

  const deleteVehicle = () => {
    alert("Delete");
    axios.delete("http://localhost:3001/api/vehicle/" + vehicleId)
      .then(
        () => {
          alert("Delete Successfull");
          setDeleteModalClose();
        }
      )
      .catch(() => {
        alert("Delete Unsuccessfull");
      });
  };

  var _rows =
    Vehicle.map(vehicle => {
      // console.log("veeee", vehicle)
      var vehicle_type = vehicle.vehicle_type;
      var vehicle_number = vehicle.vehicle_number;
      var action = <div className="justify-content-start text-start">
        <button className="action btn btn-primary fas fa-solid fa-book"
          onClick={() => {
            setSelectVehicle(vehicle._id);
            setUpdateModalOpen();
          }} ></button>
        <button className="action btn btn-danger fa fa-solid fa-trash"
          onClick={
            () => {
              setSelectVehicle(vehicle._id);
              setDeleteModalOpen();
            }}></button>
      </div>;
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
        width: 150
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
                show={modalIsOpen}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={setModalIsOpenToFalse}
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
              >
                <Modal.Header closeButton >
                  <div className="w-100">
                    <h1 className="text-center">Add Vehicle</h1>
                  </div>
                </Modal.Header>
                <AddVehicle closeAddVehicleModal={setModalIsOpenToFalse} />
              </Modal>
            </div>

            {/* Modal for Update Vehicle */}
            <div className="updateVehicle">
              <Modal
                show={updateModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={setUpdateModalClose}
                style={{
                  overlay: {
                    justifyContent: "center",
                    display: "flex",
                  }
                }}
              >
                <Modal.Header closeButton >
                  <div className="w-100">
                    <h1 className="text-center">Update Vehicle</h1>
                  </div>
                </Modal.Header>
                <UpdateVehicle closeUpdateVehicleModal={setUpdateModalClose} id={vehicleId} />
              </Modal>
            </div>

            {/* Delete Vehicle Modal */}
            <div className="deleteVehicle">
              <Modal
                show={deleteModalIsOpen}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={setDeleteModalClose}
                style={{
                  overlay: {
                    justifyContent: "center",
                    display: "flex",
                  }
                }}
              >
                <Modal.Header closeButton >
                  <div className="w-100">
                    <h1 className="text-center">Delete</h1>
                  </div>
                </Modal.Header>
                <Modal.Body ><strong>Are you sure you want to delete this vehicle?</strong></Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-danger" onClick={
                    () => {
                      deleteVehicle();
                    }} >
                    Delete
                  </button>
                  <button className="btn btn-secondary" onClick={setDeleteModalClose}>
                    Close
                  </button>
                </Modal.Footer>
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
