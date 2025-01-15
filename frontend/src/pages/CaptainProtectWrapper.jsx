import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { CaptainDataContext } from '../context/CaptainContext'
import toast from 'react-hot-toast'
import PageLoader from '../components/PageLoader'

const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
            return;
        }
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    
                if(response.status === 200) {
                    setCaptain(response.data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.response?.data.message || error.response?.data.errors[0].msg || error.message)
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
        }
        fetchData();
    }, [ token ])

    if (isLoading) {
        return (
            <div><PageLoader /></div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper