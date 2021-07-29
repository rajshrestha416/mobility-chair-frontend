import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, CircleMarker } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import axios from "axios";
import Avatar from "react-avatar";
import { Card } from "react-bootstrap";
import moment from "moment";

function ShowMap() {
  const [trackers, setTrackers] = useState([]);
  const [center, setCenterPosition] = useState([27.7052401, 85.3272271, 17]);
  const [searchTracker, setSearchTracker] = useState([]);
  const [map, setMap] = useState();
  const [activeTracker, setActiveTracker] = useState();

  useEffect(() => {
    axios.get("http://localhost:3001/api/tracker")
      .then(response => {
        setTrackers(response.data.trackers);
      })
      .catch(err => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    if (map !== undefined)
      map.setView(center);
  }, [center]);

  // const position = ();

  const searchUser = (text) => {
    let matchedTracker = [];
    trackers.map(tracker => {
      const regex = new RegExp(text, "gi");
      // console.log(tracker.user.fullname.match(regex))
      if (tracker.user.fullname.match(regex) !== null && text !== "") {
        return (
          matchedTracker.push(tracker)
        );
      }
    });
    setSearchTracker(matchedTracker);
    console.log(searchTracker);
  };

  const setCenter = (data) => {
    setCenterPosition(data.location.coordinates);
    setActiveTracker(data);
    console.log(map);
  };

  return (
    <>
      <div className="col-md-4 mapSearch">
        <div className="input-group">
          <input type="search" className="form-control" placeholder="Search User" onChange={(e) => searchUser(e.target.value)} />
        </div>
        <div className="searchContents">
          {
            searchTracker.length > 0 ?
              <Card>
                {searchTracker.map(data => {
                  return <button>
                    <p className="search-content" onClick={() => setCenter(data)}>
                      <strong>{data.user.fullname}</strong> <br />
                      {data.user.vehicle.vehicle_number}
                    </p>
                  </button>;
                })}
              </Card>
              :
              ""
          }
        </div>
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
                    setActiveTracker(tracker);
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
