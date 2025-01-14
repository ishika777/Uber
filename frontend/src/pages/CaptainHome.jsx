import React, { useRef, useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import toast from 'react-hot-toast';

import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import LiveTracking from "../components/LiveTracking"

import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainHome = () => {

    const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ ride, setRide ] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    const [location, setLocation] = useState({ lat: null, lng: null });

    
    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        });
    }, [socket, captain._id]);
    
    
    useEffect(() => {
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()
        return () => clearInterval(locationInterval)

    }, [captain._id, socket])

    useEffect(() => {
        // Define an async function inside the effect
        const getLocationAndEmit = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                });
            }
        };
    
        // Call the async function immediately
        getLocationAndEmit();
    }, []);

    useEffect(() => {
        socket.on('new-ride', (data) => {
            setRide(data);
            setRidePopupPanel(true);
        });

        return () => {
            socket.off('new-ride'); // Clean up listener when component unmounts
        };
    }, [socket]);

    async function confirmRide() {

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
                rideId: ride._id,
                captainId: captain._id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || error.response.data.errors[0].msg)
        }

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)

    }

    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ ridePopupPanel ])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePopupPanel ])

    return (
        <div className='h-screen relative overflow-hidden'>
            <img className='w-16 absolute left-5 top-5' src="uber-logo.png" alt="" style={{ zIndex : ridePopupPanel || confirmRidePopupPanel ? 0 : 1000, pointerEvents: "none" }}/>
                
                <Link to='/captain-logout' style={{zIndex: ridePopupPanel || confirmRidePopupPanel ? 0 : 1000}} className='absolute top-3 right-3 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            <div className={`w-screen relative h-3/5 ${ridePopupPanel || confirmRidePopupPanel ? "z-0" : ""}`}>
                <LiveTracking />
            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 rounded-tl-3xl rounded-tr-3xl'>
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 rounded-tl-3xl rounded-tr-3xl'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    )
}

export default CaptainHome