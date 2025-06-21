import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})

    const { captain, setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();
  
    const submitHandler = async (e) => {
      e.preventDefault();
      const captainData = {
        email: email,
        password: password
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData, { withCredentials: true });
      if (response.status === 200) {
        const data = response.data;

        setCaptain(data.captain);
        localStorage.setItem('capToken', data.capToken);

        navigate('/captain-home');
      }
      
      setEmail('');
      setPassword('');
    }

  return (
    <div>
      <Header />
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <form action="" onSubmit={(e)=>{submitHandler(e)}} >
          <h3 className='text-lg font-medium mb-2'>What's Your Email?</h3>
          <input required 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placholder:text-base'
                 type="text" 
                 placeholder='email@example.com' 
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input required 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placholder:text-base'
                 type="password" 
                 placeholder='Password' 
          />
          <button
           className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placholder:text-base'
          >Login</button>
        </form>
        <p className='text-center'>Ready to lead the way? <Link to='/captain-signup' className='text-blue-600'>Become a Captain</Link></p>
        <p className='text-center mt-4'>Or <Link to='/google-signin' className='text-blue-600'>Sign in with Google</Link></p>
        </div> 
        <div>
          <Link
          to='/login' className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placholder:text-base'
          >Switch to User Login</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CaptainLogin
