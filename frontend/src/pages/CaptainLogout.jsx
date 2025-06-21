import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const capToken = localStorage.getItem('capToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!capToken) {
      navigate('/captain-login');
      return;
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`,{ withCredentials: true }, {
      headers: {
        Authorization: `Bearer ${capToken}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('capToken');
        navigate('/captain-login');
      }
    })
    .catch(() => {
      localStorage.removeItem('capToken');
      navigate('/captain-login');
    });
  }, [capToken, navigate]);

  return <div></div>;
};

export default CaptainLogout;
