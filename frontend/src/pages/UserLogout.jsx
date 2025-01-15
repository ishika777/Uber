import React, { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "remixicon/fonts/remixicon.css";

const UserLogout = () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/logout`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (error) {
                console.error(error); // Log error to console
                toast.error(
                    error.response?.data?.message ||
                    error.response?.data?.errors?.[0]?.msg ||
                    error.message
                );
            }
        };

        logoutUser(); // Call the logout function
    }, []); // Add dependencies to the effect

    return <div>UserLogout</div>; // Render JSX
};

export default UserLogout;
