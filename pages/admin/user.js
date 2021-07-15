import React, { useEffect } from "react";
import { MDBDataTableV5 } from 'mdbreact';
import moment from 'moment'

import Modal from "react-modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
} from "reactstrap";
// layout for this page
import Admin from "../../layouts/Admin.js";

// import add user
import AddUser from "./addUser";

import { Button } from "react-bootstrap";
// core components
import UserHeader from "../../components/Headers/UserHeader";
import axios from "axios";

function User() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [users, retrieveUser] = React.useState([]);
  const [datatable, setDatatable] = React.useState({})

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const addUser = () => {
    toast.success("User Added Successfully", {
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

  // const selectUser = async() => {
  //   await 
  // }


  useEffect(() => {
    // selectUser;
    axios('http://localhost:3001/api/auth/all')
      .then(response => {
        console.log({ "user": response.data.user });
        retrieveUser(response.data.user);
      })
      .catch(err => {
        alert("Cannot retrieve user");
      });
  },[]);

  var _rows = users.map(user => {
    var name = user.fullname;
    var age = user.age;
    var address = user.address;
    var contact = user.contact;
    var emContact = user.emContact;
    var email = user.email;
    var date = moment(user.createdAt).format('DD/MM/YYYY')
    var createdAt = date;

    return {
      'name': name,
      'age': age,
      'address': address,
      'contact': contact,
      "emcontact": emContact,
      "email": email,
      "date": createdAt
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
        // sort: "asc",
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
                  autoWidth ={false}
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
                <AddUser />
                <div className="d-flex justify-content-center">
                  <Button
                    className="btn btn-success"
                    // onClick={setModalIsOpenToFalse}
                    style={{ margin: "10px" }}
                    onClick={addUser}
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

User.layout = Admin;

export default User;
