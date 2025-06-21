import React, {useContext,useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';


const UserProtectWrapper = ({
    children
}) => {
    const userToken = localStorage.getItem('userToken');
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        if (!userToken) {
            navigate('/login');
        }
    }, [userToken, navigate]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    })
    .then((response) => {
        if (response.status === 200) {
            setUser(response.data.user);
            setIsLoading(false);
        }
    })
    .catch((error) => {
        console.error('Error fetching user profile:', error);
        localStorage.removeItem('userToken');
        navigate('/login');
    });

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper
