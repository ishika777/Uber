import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import { Link, useNavigate } from "react-router-dom";

import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import LiveTracking from "../components/LiveTracking";


import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import toast from "react-hot-toast";
import Loader from "../components/Loader";


const Home = () => {

    const [loading, setLoading] = useState(false);


    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);

    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);

    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);

    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [fare, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState(null);
    const [ride, setRide] = useState(null);

    // const [currentPosition, setCurrentPosition] = useState({
    //     lat: null,
    //     lng: null,
    // });

    const navigate = useNavigate();

    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserDataContext);

    //   useEffect(async() => {
    // const getLoc = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             const { latitude, longitude } = position.coords;
    //             setCurrentPosition({ lat: latitude, lng: longitude });
    //         }
    //     )};
    //     console.log(currentPosition);
    // }
    // getLoc()
    //   }, []);

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id });
    }, [user]);

    socket.on("ride-confirmed", (ride) => {
        setVehicleFound(false);
        setWaitingForDriver(true);
        setRide(ride);

        socket.on("ride-started", (ride) => {
            setWaitingForDriver(false);
            navigate("/riding", {
                state: {
                    ride,
                },
            }); // Updated navigate to include ride data
        });
    });

    const handlePickupChange = async (e) => {
        setPickup(e.target.value);
        if (e.target.value.length >= 3) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                    {
                        params: { input: e.target.value },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setPickupSuggestions(response.data);
            } catch(error) {
                console.log(error)
                toast.error(error.response?.data.message || error.response?.data.errors[0].msg || error.message)
            }
        }
    };

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value);
        if (e.target.value.length >= 3) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                    {
                        params: { input: e.target.value },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setDestinationSuggestions(response.data);
            } catch(error) {
                console.log(error)
                toast.error(error.response?.data.message || error.response?.data.errors[0].msg || error.message)
            }
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
    };

    useGSAP(
        function () {
            if (panelOpen) {
                gsap.to(panelRef.current, {
                    height: "70%",
                    paddingLeft: 29,
                    paddingRight: 29,
                    paddingTop: 42,
                });
                gsap.to(panelCloseRef.current, {
                    opacity: 1,
                });
            } else {
                gsap.to(panelRef.current, {
                    height: "0%",
                    padding: 0,
                });
                gsap.to(panelCloseRef.current, {
                    opacity: 0,
                });
            }
        },
        [panelOpen]
    );

    useGSAP(
        function () {
            if (vehiclePanel) {
                gsap.to(vehiclePanelRef.current, {
                    transform: "translateY(0)",
                });
            } else {
                gsap.to(vehiclePanelRef.current, {
                    transform: "translateY(100vh)",
                });
            }
        },
        [vehiclePanel]
    );

    useGSAP(
        function () {
            if (confirmRidePanel) {
                gsap.to(confirmRidePanelRef.current, {
                    transform: "translateY(0)",
                });
            } else {
                gsap.to(confirmRidePanelRef.current, {
                    transform: "translateY(100vh)",
                });
            }
        },
        [confirmRidePanel]
    );

    useGSAP(
        function () {
            if (vehicleFound) {
                gsap.to(vehicleFoundRef.current, {
                    transform: "translateY(0)",
                });
            } else {
                gsap.to(vehicleFoundRef.current, {
                    transform: "translateY(100vh)",
                });
            }
        },
        [vehicleFound]
    );

    useGSAP(
        function () {
            if (waitingForDriver) {
                gsap.to(waitingForDriverRef.current, {
                    transform: "translateY(0)",
                });
            } else {
                gsap.to(waitingForDriverRef.current, {
                    transform: "translateY(100vh)",
                });
            }
        },
        [waitingForDriver]
    );

    async function findTrip() {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
                {
                    params: { pickup, destination },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setFare(response.data);
            setVehiclePanel(true);
            setPanelOpen(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
            toast.error(error.response?.data.message || error.response?.data.errors[0].msg || error.message)
        }finally{
            setLoading(false);
        }

    }

    async function createRide() {
        try {
            setLoading(true);
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/create`,
                {
                    pickup,
                    destination,
                    vehicleType,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
        } catch (error) {
            setLoading(false);
            console.log(error)
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="h-screen relative overflow-hidden">
            <img
                className="w-16 absolute left-5 top-5"
                src="uber-logo.png"
                alt=""
                style={{ zIndex: panelOpen ? 0 : 1000, pointerEvents: "none" }}
            />


            <div className={`h-[70%] w-screen bg--white  relative ${panelOpen ||
                vehiclePanel ||
                confirmRidePanel ||
                vehicleFound ||
                waitingForDriver
                ? "z-0"
                : ""
            }`}>
                <LiveTracking />
            </div>


            <Link to='/users/logout' style={{ zIndex: panelOpen ? 0 : 1000 }} className='absolute top-3 right-3 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-logout-box-r-line"></i>
            </Link>


            <div className={`flex flex-col justify-end h-screen absolute top-0 w-full ${panelOpen ? "z-50" : ""}`}>
                <div className={`h-[30%] p-6 bg-white relative`}>
                    <h5
                        ref={panelCloseRef}
                        onClick={() => {
                            setPanelOpen(false);
                        }}
                        className="absolute opacity-0 right-6 top-6 text-2xl"
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>

                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form className="relative py-4" onSubmit={(e) => {
                        submitHandler(e);
                    }}>
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-900 rounded-full"></div>
                        <input onClick={() => {
                                setPanelOpen(true);
                                setActiveField("pickup");
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                            type="text"
                            placeholder="Add a pick-up location"
                        />
                        <input onClick={() => {
                                setPanelOpen(true);
                                setActiveField("destination");
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
                            type="text"
                            placeholder="Enter your destination"
                        />
                    </form>

                    {loading ? (
            <button onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
        >
            <Loader /> Please Wait...
        </button>
          ) : (
            <button onClick={findTrip}
                        className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
                    >
                        Find Trip
                    </button>
          )}

                    
                </div>

                <div ref={panelRef} className="bg-white h-0 overflow-auto mb-1">
                    <LocationSearchPanel
                        suggestions={
                            activeField === "pickup"
                                ? pickupSuggestions
                                : destinationSuggestions
                        }
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>

            <div
                ref={vehiclePanelRef}
                className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 rounded-tl-3xl rounded-tr-3xl"
            >
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>

            <div
                ref={confirmRidePanelRef}
                className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 rounded-tl-3xl rounded-tr-3xl"
            >
                <ConfirmRide
                    createRide={createRide}
                    loading={loading}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>
            <div
                ref={vehicleFoundRef}
                className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 rounded-tl-3xl rounded-tr-3xl"
            >
                <LookingForDriver
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>
            <div
                ref={waitingForDriverRef}
                className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 rounded-tl-3xl rounded-tr-3xl"
            >
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver}
                />
            </div>
        </div>
    );
};

export default Home;
