import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { UserDataContext } from '../context/UserContext'
import toast from 'react-hot-toast'
import PageLoader from '../components/PageLoader'

const UserProtectWrapper = ({
    children
}) => {
    
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setUser } = useContext(UserDataContext)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
        const fetchData = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setUser(response.data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message || error.response.data.errors[0].msg)
                localStorage.removeItem('token')
                navigate('/login')
            }
        }
        fetchData()
    }, [ token ])

    if (isLoading) {
        return (
            <div ><PageLoader /></div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper