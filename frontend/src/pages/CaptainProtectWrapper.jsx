import React, {useContext,useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext.jsx';
import axios from 'axios';


const CaptainProtectWrapper = ({
    children
}) => {
    const capToken = localStorage.getItem('capToken');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        if (!capToken) {
            navigate('/captain-login');
        }
    }, [capToken, navigate]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            'Authorization': `Bearer ${capToken}`
        }
    })
    .then((response) => {
        if (response.status === 200) {
            setCaptain(response.data.captain);
            setIsLoading(false);
        }
    })
    .catch((error) => {
        console.error('Error fetching captain profile:', error);
        localStorage.removeItem('capToken');
        navigate('/captain-login');
    });
    
    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectWrapper
