import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData, { withCredentials: true });
    if (response.status === 200) {
      const data = response.data;

      setUser(data.user);
      localStorage.setItem('userToken', data.userToken);
      navigate('/home');
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
        <p className='text-center'>Ready to join the ride? <Link to='/signup' className='text-blue-600'>Create Your Account</Link></p>
        <p className='text-center mt-4'>Or <Link to='/google-signin' className='text-blue-600'>Sign in with Google</Link></p>
        </div> 
        <div>
          <Link
          to='/captain-login' className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placholder:text-base'
          >Sign in as Captain</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserLogin
