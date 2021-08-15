import React, {useState, useEffect } from "react";
import { MDBDataTableV5 } from 'mdbreact';
import moment from 'moment';

import { Modal } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Form
} from "reactstrap";
// layout for this page
import Admin from "../../layouts/Admin.js";

// import add user
import AddUser from "./addUser";

// core components
import UserHeader from "../../components/Headers/UserHeader";
import axios from "axios";
import UpdateUser from "./updateUser.js";

function User() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [users, retrieveUser] = useState([]);
  const [deleteModalIsOpen, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [userId, setSelectUser] = useState("");

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
  const setUpdateModalOpen = () => {
    setUpdateModal(true);
  };

  const toastForSuccess = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toastForFail = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const changeHandler = (e) => {
    setUserData({
      ...userdata,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/all')
      .then(response => {
        retrieveUser(response.data.user);
      })
      .catch(err => {
        toastForFail("Cannot retrieve user");
      });
  }, []);

  const deleteUser = () => {
    axios.delete("http://localhost:3001/api/auth/" + userId)
      .then(
        (response) => {
          toastForSuccess("Delete Successfull");
          setDeleteModalClose();
        }
      )
      .catch(() => {
        toastForFail("Delete Unsuccessfull");
      });
  };

  var _rows = users.map(user => {
    var name = user.fullname;
    var age = user.age;
    var address = user.address;
    var contact = user.contact;
    var emContact = user.emContact;
    var email = user.email;
    var date = moment(user.createdAt).format('DD/MM/YYYY');
    var createdAt = date;
    var action = <div className="justify-content-start text-start">
        <button className="action btn btn-primary fas fa-solid fa-book"
          onClick={() => {
            setSelectUser(user._id);
            setUpdateModalOpen();
          }} ></button>
        <button className="action btn btn-danger fa fa-solid fa-trash"
          onClick={
            () => {
              setSelectUser(user._id);
              setDeleteModalOpen();
            }}></button>
      </div>;

    return {
      'name': name,
      'age': age,
      'address': address,
      'contact': contact,
      "emcontact": emContact,
      "email": email,
      "date": createdAt,
      "action": action
    };
  });

  const dataTable = {
    columns: [
      {
        label: "Name",
        field: "name",
        width: 200,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Age",
        field: "age",
        width: 100,
      },
      {
        label: "Address",
        field: "address",
        width: 200,
      },
      {
        label: "Email",
        field: "email",
        width: 250,
      },
      {
        label: "Contact",
        field: "contact",
        sort: "disabled",
        width: 200,
      },
      {
        label: "EmContact",
        field: "emcontact",
        width: 200,
      },
      {
        label: "Issued date",
        field: "date",
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        width: 150,
      },
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
                    <strong>User Details</strong>
                  </h3>
                  <div className="col-lg-6 d-flex flex-row-reverse">
                    <button
                      className="btn btn-primary p-2"
                      type="button"
                      onClick={setModalIsOpenToTrue}
                    >
                      Add User
                    </button>
                  </div>
                </div>
              </CardHeader>

              {/* Add User Model */}

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
                />
              </div>
            </Card>
            {/* Modal for add User */}
            <div className="addUser">
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
                className="addUser"
              >
                <Modal.Header closeButton >
                  <div className="w-100">
                    <h1 className="text-center">Add User</h1>
                  </div>
                </Modal.Header>
                <AddUser closeAddUser={setModalIsOpenToFalse} />
              </Modal>
            </div>

            {/* Modal for Update User */}
            <div className="updateUser">
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
                <UpdateUser closeUpdateUserModal={setUpdateModalClose} id={userId} />
              </Modal>
            </div>

            {/* Delete User Modal */}
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
                <Modal.Body ><strong>Are you sure you want to delete this user?</strong></Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-danger" onClick={
                    () => {
                      deleteUser();
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

User.layout = Admin;

export default User;
