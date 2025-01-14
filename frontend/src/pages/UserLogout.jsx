import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const UserLogout = async () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    // useEffect(async() => {
    //     try {
    //         const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         if (response.status === 200) {
    //             localStorage.removeItem('token')
    //             navigate('/login')
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         toast.error(error.response.data.message || error.response.data.errors[0].msg)
    //     }
    // }, [])


    return (
        <div>UserLogout</div>
    )
}

export default UserLogout