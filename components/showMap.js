import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

function ShowMap() {
  const position = [27.7172, 85.324];
  return (
    <>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker className="userMarker" position={position}>
          <Popup>
            A pretty CSS3 popup. <br />
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default ShowMap;
