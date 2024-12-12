import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { SocketContext } from '../context/SocketContext';

const LiveTracking = React.memo(() => {


    const { socket } = useContext(SocketContext)
  const [currentPosition, setCurrentPosition] = useState({
    lat: 28.6490624,
    lng: 77.2636672
  });

  const [captainPosition, setCaptainPosition] = useState(null); // Position of the captain
  const [userPosition, setUserPosition] = useState(null); // Position of the user


  const navigate = useNavigate();

  // Track the current position of the user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: latitude,
        lng: longitude
      });
    });

    

    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: latitude,
        lng: longitude
      });
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);


  return (
    <MapContainer
      center={currentPosition}
      zoom={13}
      style={{
        // height: h === "captain" ? "60vh" : h === "cap-riding" ? "80vh" : h === "user-riding" ? "50vh" : "70vh",
        height : "100%",
        width: "100%"
      }}
      zoomControl={false}
    >
      <ZoomControl position="topright" />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render current user position marker */}
      {currentPosition && (
        <Marker position={currentPosition}>
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



// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup,ZoomControl } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const center = {
//     lat: 28.6490624,
//     lng: 77.2636672
// };

// const LiveTracking = ({h}) => {
//     const [ currentPosition, setCurrentPosition ] = useState(center);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setCurrentPosition({
//             lat: latitude,
//             lng: longitude
//         });
//     });

//     const watchId = navigator.geolocation.watchPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setCurrentPosition({
//             lat: latitude,
//             lng: longitude
//         });
//     });

//     return () => navigator.geolocation.clearWatch(watchId);

//   }, []);

//   useEffect(() => {
//     const updatePosition = () => {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const { latitude, longitude } = position.coords;

//             console.log('Position updated:', latitude, longitude);
//             setCurrentPosition({
//                 lat: latitude,
//                 lng: longitude
//             });
//         });
//     };

//     updatePosition(); // Initial position update

//     setInterval(updatePosition, 1000); // Update every 10 seconds

// }, []);


//   return (
//     <MapContainer 
//       center={currentPosition} 
//       zoom={13} 
//     //   className='w-screen'
//       style={{ height: h === "captain" ? "60vh" : h === "cap-riding" ? "80vh" : h === "user-riding" ? "50vh" : "70vh", width: "100%"}}
//       zoomControl={false}
//     >
//         <ZoomControl position="topright" />
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {currentPosition && (
        
//         <Marker position={currentPosition}>
//           <Popup>You are here!</Popup>
//         </Marker>
//       )}
//     </MapContainer>
//   );
// };

// export default LiveTracking;
