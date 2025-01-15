import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import "remixicon/fonts/remixicon.css";

export const CaptainLogout = () => {

    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()

    useEffect(() => {
        const logoutCaptain = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    localStorage.removeItem('captain-token')
                    navigate('/captain-login')
                }
            } catch (error) {
                console.error(error); // Log error to console
                toast.error(
                    error.response?.data?.message ||
                    error.response?.data?.errors?.[0]?.msg ||
                    error.message);
            }
        };

        logoutCaptain(); // Call the logout function
    }, []); // Add dependencies to the effect


    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout