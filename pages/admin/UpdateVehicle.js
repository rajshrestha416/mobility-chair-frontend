import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    FormGroup,
    Input,
    Row,
    Col,
} from "reactstrap";
import axios from "axios";
// import {useLocation} from "react-router-dom"

function UpdateVehicle({ closeUpdateVehicleModal, id }) {

    const [vehicleData, setVehicleData] = useState({
        "vehicle_type": "",
        "vehicle_number": ""
    });

    useEffect(() => {
        axios.get("http://localhost:3001/api/vehicle/" + id)
            .then(response => {
                if (response.data.success) {
                    vehicleData.vehicle_type = response.data.vehicle.vehicle_type;
                    vehicleData.vehicle_number = response.data.vehicle.vehicle_number;
                }
                // else {
                //   addFailed();
                // }
            })
            .catch(err => {
                addFailed();
            });
    }, []);

    const updateVehicle = () => {
        // const data = {
        //     vehicle_number : vehicleData.vehicle_number,
        //     vehicle_type : vehicleData.vehicle_type,
        // }
        console.log(vehicleData)
        axios.put("http://localhost:3001/api/vehicle/"+id, vehicleData)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    closeUpdateVehicleModal();
                    addSuccess();
                }
                else {
                    addFailed();
                }
            })
            .catch(err => {
                addFailed();
                console.log(err)
            });
    };

    const addSuccess = () => {
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

    const changeHandler = (e) => {
        setVehicleData({
            ...vehicleData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <div>
                <div>
                    <div className="pl-lg-4" style={{ marginTop: "20px" }}>
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-vehicleType"
                                    >
                                        Vehicle Type
                                    </label>
                                    <select className="form-control col-sm-9" id="#" name="vehicle_type" onChange={changeHandler} value={vehicleData.vehicle_type}>
                                        <option selected>Select from this select menu</option>
                                        <option value="Two Wheeler">Two Wheeler</option>
                                        <option value="Four Wheeler">Four Wheeler</option>
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
                                        type="text"
                                        name="vehicle_number"
                                        value={vehicleData.vehicle_number}
                                        onChange={changeHandler}
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
                            onClick={updateVehicle}
                        >
                            Update
                        </Button>
                        <Button
                            className="btn btn-danger"
                            onClick={closeUpdateVehicleModal}
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
export default UpdateVehicle;
