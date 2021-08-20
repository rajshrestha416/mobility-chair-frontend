import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, CircleMarker } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import axios from "axios";
import Avatar from "react-avatar";
import { Card } from "react-bootstrap";
import moment from "moment";
import Select from 'react-select';
import NoSSR from "react-no-ssr";

function ShowMap() {
  const [trackers, setTrackers] = useState([]);
  const [center, setCenterPosition] = useState([27.7052401, 85.3272271, 17]);
  const [searchTracker, setSearchTracker] = useState([]);
  const [map, setMap] = useState();
  const [activeTracker, setActiveTracker] = useState();

  const [selectedDate, setSelectedDate] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [userOption, setUserOption] = useState();
  const [dateOption, setDateOption] = useState();
  const [userHistory, setUserHistory] = useState();
  const [allUser, setAllUser] = useState();

  useEffect(() => {
    console.log("Selected User", selectedUser);
    axios.get("http://localhost:3001/api/tracker/" + selectedUser)
      .then(response => {
        console.log("AllHistory", response.data.trackers);
        setUserHistory(response.data.trackers);
      })
      .catch(err => {
        console.log("error", err);
      });
  }, [selectedUser]);

  useEffect(() => {
    console.log("Selected Date", selectedDate);
    if (selectedDate !== undefined) {
      let url = (selectedUser !== "" && selectedDate !== "" ? `/${selectedUser}/"${selectedDate}"` : "/");
      console.log(`http://localhost:3001/api/tracker${url}`);
      axios.get(`http://localhost:3001/api/tracker${url}`)
        .then(response => {
          console.log("Day check", response.data.trackers);
          setTrackers(response.data.trackers);
        })
        .catch(err => {
          console.log("error", err);
        });
    }
  }, [selectedDate]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/tracker")
      .then(response => {
        console.log("All Data", response.data.trackers);
        setTrackers(response.data.trackers);
      })
      .catch(err => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/api/tracker")
      .then(response => {
        console.log("All Data", response.data.trackers);
        setAllUser(response.data.trackers);
      })
      .catch(err => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    if (map !== undefined)
      map.setView(center);
  }, [center]);

  // const searchUser = (text) => {
  //   let matchedTracker = [];
  //   trackers.map(tracker => {
  //     const regex = new RegExp(text, "gi");
  //     if (tracker.user.fullname.match(regex) !== null && text !== "") {
  //       return (
  //         matchedTracker.push(tracker)
  //       );
  //     }
  //   });
  //   setSearchTracker(matchedTracker);
  // };

  // const setCenter = (data) => {
  //   setCenterPosition(data.location.coordinates);
  //   setActiveTracker(data);
  //   console.log(map);
  // };

  useEffect(() => {
    if (allUser !== undefined) {
      setUserOption(allUser.map(User => {
        return {
          value: User.user._id, label: User.user.fullname
        };
      }));
    }
  }, [allUser]);

  useEffect(() => {
    if (userHistory !== undefined) {
      console.log(userHistory);
      if (selectedUser !== "") {
        setCenterPosition(userHistory[0].location.coordinates);
        setActiveTracker(userHistory[0]);
      }
      setDateOption(userHistory.map(history => {
        return { value: history._id, label: history._id };
      }));
    }
  }, [userHistory]);

  const selectUser = (e) => {
    if (e != null) {
      setSelectedUser(e.value);
    } else {
      // setSelectedDate("")
      setSelectedUser("");
      setActiveTracker("");
    }
  };

  const selectDate = (e) => {
    if (e != null) {
      setSelectedDate(e.value);
      setActiveTracker("");
    } else {
      setSelectedDate("");
      setActiveTracker(userHistory[0]);
    }
  };

  return (
    <>
      <div className="w-100 mapSearch d-flex justify-content-between">
        {/* <div className="input-group">
          <input type="search" className="searchBox form-control" placeholder="Search User" onChange={(e) => searchUser(e.target.value)} />
        </div>
        <div className=" searchContents">
          {
            searchTracker.length > 0 ?
              <Card>
                {searchTracker.map(data => {
                  return <p className="search-content" onClick={() => setCenter(data)} >
                      <strong>Name: {data.user.fullname}</strong> <br />
                      Vehilce Number: {data.user.vehicle.vehicle_number}
                    </p>
                })}
              </Card>
              :
              ""
          }
        </div> */}
        <NoSSR>
          <Select className="map-search"
            // value
            closeMenuOnSelect
            isClearable
            options={userOption} onChange={selectUser}
          />

        </NoSSR>

        <Select className="disable map-search"
          isClearable
          options={dateOption} onChange={selectDate}
        />
      </div>

      <MapContainer
        whenCreated={(map) => setMap(map)}
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          trackers.map(tracker => {
            return <Marker className="userMarker" position={tracker.location.coordinates}
              eventHandlers={
                {
                  click: () => {
                    setCenterPosition(tracker.location.coordinates);
                    if (selectedUser !== "") {
                      setActiveTracker(tracker);
                    }

                  }
                }
              }
            >
              {/* <Popup>
                <Avatar size="40" round={true} name={tracker.user.fullname}></Avatar>{" "}
                Name: {tracker.user.fullname} <br />
                Vehicle Type: {tracker.user.vehicle.vehicle_type} <br />
                Vehicle Number: {tracker.user.vehicle.vehicle_number} <br />
                Contact: {tracker.user.contact}
              </Popup> */}
            </Marker>;
          })
        }
        {
          center && activeTracker &&
          <CircleMarker
            center={center}
            radius={5}
          >
            <Tooltip
              direction="top" offset={[0, -50]} opacity={1} permanent
            >
              <Avatar size="40" round={true} name={activeTracker.user.fullname}></Avatar>{" "}
              Name: {activeTracker.user.fullname} <br />
              Vehicle Type: {activeTracker.user.vehicle.vehicle_type} <br />
              Vehicle Number: {activeTracker.user.vehicle.vehicle_number} <br />
              Contact: {activeTracker.user.contact} <br />
              Seen: {moment(activeTracker.createdAt).fromNow()}
            </Tooltip>
          </CircleMarker>
        }
      </MapContainer>
    </>
  );
}

export default ShowMap;
