import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

const LiveTracking = React.memo(() => {

    const { socket } = useContext(SocketContext)
    const [currentPosition, setCurrentPosition] = useState({
        lat: null,
        lng: null
    });

  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: latitude,
        lng: longitude
      });
    });
    
  }, []);

  const MapCenter = () => {
    const map = useMap();

    useEffect(() => {
      if (currentPosition) {
        map.setView(currentPosition, 13); // Adjust zoom level if needed
      }
    }, [map, currentPosition]);

    return null;
  };


  return (
    <MapContainer
      center={currentPosition || [28.6490624, 77.2636672]}
      zoom={13}
      style={{ height : "100%", width: "100%" }}
      zoomControl={false}
      dragging={true}
    >
      <ZoomControl  position="bottomright" />
      <MapCenter />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {currentPosition && (
        <Marker position={currentPosition || [28.6490624, 77.2636672]} 
        interactive={true}
        >
          <Popup>You are here!</Popup>
        </Marker>
      )}

      {/* Render captain's position marker */}
      {/* {captainPosition && (
          <Marker position={captainPosition}>
            {console.log("c", captainPosition)}
          <Popup>Captain's location</Popup>
        </Marker>
      )} */}

      {/* Render user's position marker */}
      {/* {userPosition && (
        <Marker position={userPosition}>
             {console.log("u", userPosition)}
          <Popup>User's location</Popup>
        </Marker>
      )} */}
    </MapContainer>
  );
});

export default LiveTracking;