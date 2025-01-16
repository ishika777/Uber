import React, { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

import { SocketContext } from '../context/SocketContext'
import { useLocation } from 'react-router-dom'

const CaptainRiding = () => {

    const location = useLocation()
    const rideData = location.state?.ride

    const [ finishRidePanel, setFinishRidePanel ] = useState(false)
    const finishRidePanelRef = useRef(null)
    const [currLocation, setCurrLocation] = useState(null);
    const { socket } = useContext(SocketContext)
    
    useEffect(() => {
        const getLocation = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                  setCurrLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  })
            })
        }
        getLocation();
    }, [])



    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ finishRidePanel ])


    return (
        <div className='h-screen relative flex flex-col justify-end'>

            {/* <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="uber-logo.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div> */}
            
            <div className={`h-[80%] w-screen top-0 ${finishRidePanel ? "z-0" : "" }`}>
                <LiveTracking capState={currLocation} />
            </div>

            <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'>
                <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {
                    setFinishRidePanel(true)
                }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
                <h4 className='text-xl font-semibold'>4 KM away</h4>
                <button onClick={() => {
                    setFinishRidePanel(true)
                }} className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className='fixed w-full bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding