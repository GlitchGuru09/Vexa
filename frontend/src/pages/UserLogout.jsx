import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            // No token, just redirect to login
            navigate('/login');
            return;
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{ withCredentials: true }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('userToken');
                navigate('/login');
            }
        }).catch((error) => {
            // If already logged out or token invalid, just redirect
            localStorage.removeItem('userToken');
            navigate('/login');
        });
    }, [token, navigate]);

    return (
        <div></div>
    );
}

export default UserLogout;
