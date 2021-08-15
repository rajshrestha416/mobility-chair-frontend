import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Select from "react-select";

import NoSSR from "react-no-ssr";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import Admin from "../../layouts/Admin.js";
import Header from "../../components/Headers/Header.js";
import axios from "axios";

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  // const [activity, setActivity] = useState([]);
  const [userId, setUserId] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [categories, setCategories] = useState([0]);
  const [data, setData] = useState([0]);

  // var userId;

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/all')
      .then(response => {
        setUsers(response.data.user);
      })
      .catch(err => {
        console.log("Cannot retrieve user");
      });
  }, []);

  const getData = async () => {
    // alert(userId);
    await axios.get('http://localhost:3001/api/activity/user/' + userId)
      .then(response => {
        setSelectedUser(response.data);

        // console.log("id", id);
        // console.log(data);
      })
      .catch(err => {
        alert("Cannot retrieve user");
      });
  };

  useEffect(() => {
    console.log("Selected user after set",selectedUser)
    if (selectedUser !==undefined) {
      console.log("Selected Users",selectedUser);
      if(selectedUser.activity !== undefined){
        console.log("Inside first")
        if(selectedUser.activity.data !== undefined && selectedUser.activity.category !==undefined){
          console.log("Inside ssecond")
          setData(selectedUser.activity.data);
          setCategories(selectedUser.activity.category);
        }
        
      }   
    }
  }, [selectedUser]);

  useEffect(()=>{
    console.log("select data", data)
    console.log("select options", categories)
    if(data!== undefined && categories !== undefined){
      console.log("select data", data)
      console.log("select options", categories)
      setSeries(seriesFun()) 
      setOption(optionFun())
    }
  }, [data, categories])
  const customerOption = users.map(user => {
    return { value: user, label: user.fullname };
  });

  const seriesFun = () => {
    return [
      {
        // name: "series-1",
        type: "line",
        // data: data,
        data: data === undefined ? [0] : data,
      },
      {
        name: "Total Distance",
        type: "column",
        data: data,
        data: data === undefined ? [0] : data,
      }
    ];
  };



  const optionFun = () => {
    return {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      stroke: {
        width: [4, 0, 0],
      },
      xaxis: {
        // type: 'dateTime',
        categories: (categories === undefined ? [0] : categories),
        // categories: [0],
      },
      markers: {
        size: 6,
        strokeWidth: 3,
        fillOpacity: 0,
        strokeOpacity: 0,
        hover: {
          size: 8,
        },
      },
      yaxis: {
        tickAmount: 5,
        min: 0,
        max: Math.max(...data) + 20,
      },
      legend: {
        show: false
      },
    };
  };

  const [series, setSeries] = useState(
    seriesFun
  );

  const [option, setOption] = useState(
    optionFun
  );

  const changeUserId = (e) => {
    setUserId(e.value._id);
  };

  useEffect(() => {
    console.log(userId)
    getData();
  }, [userId]);
  useEffect(() => {
    optionFun();
    seriesFun();
  }, [userId]);
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col-sm-6">
                    <NoSSR>
                      <Select
                        value={customerOption.find(obj => obj.value._id === userId)} // set selected value
                        // onChange={handleChange} // assign onChange function
                        options={customerOption} onChange={changeUserId} />
                    </NoSSR>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div id="mixedChart">
                  <Row>
                    <Chart
                      className="col-sm-12 scroll-x"
                      options={option}
                      series={series}

                      type="bar"
                      height={350}
                    />
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Dashboard.layout = Admin;

export default Dashboard;
