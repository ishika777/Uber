import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const CaptainLogout = async () => {
    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()

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
        console.log(error)
        toast.error(error.response.data.message || error.response.data.errors[0].msg)
    }


    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout