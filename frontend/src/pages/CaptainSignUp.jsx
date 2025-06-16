import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import GoogleLogo from '../images/google-logo.png';
import CaptainImage from '../images/captain.png';

const CaptainSignUp = () => {
  const [captainFirstName, setCaptainFirstName] = useState('');
  const [captainLastName, setCaptainLastName] = useState('');
  const [captainEmail, setCaptainEmail] = useState('');
  const [captainPassword, setCaptainPassword] = useState('');
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    const captain = {
      username: {
        firstName: captainFirstName,
        lastName: captainLastName,
      },
      email: captainEmail,
      password: captainPassword,
    };
    setCaptainData(captain);
    console.log(captain);
    setCaptainFirstName('');
    setCaptainLastName('');
    setCaptainEmail('');
    setCaptainPassword('');
  };

  return (
    <div>
      <Header />
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <div className='flex justify-center mb-6'>
            <img src={CaptainImage} alt="Captain" className='w-24 h-24 mb-4' />
          </div>
          <form action="" onSubmit={submitHandler}>
          <h3 className='text-base font-medium mb-2'>What's Your Name?</h3>
          <div className='flex gap-4 mb-7'>
            <input required 
                 value={captainFirstName}
                 onChange={(e) => setCaptainFirstName(e.target.value)}
                 className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border w-full text-base placholder:text-sm'
                 type="text" 
                 placeholder='Firstname' 
          />
          <input required 
                 value={captainLastName}
                 onChange={(e) => setCaptainLastName(e.target.value)}
                 className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border w-full text-base placholder:text-sm'
                 type="text" 
                 placeholder='Lastname' 
          />
          </div>
          <h3 className='text-base font-medium mb-2'>What's Your Email?</h3>
          <input required 
                 value={captainEmail}
                 onChange={(e) => setCaptainEmail(e.target.value)}
                 className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-base placholder:text-sm'
                 type="text" 
                 placeholder='email@example.com' 
          />
          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input required 
                 value={captainPassword}
                 onChange={(e) => setCaptainPassword(e.target.value)}
                 className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-base placholder:text-sm'
                 type="password" 
                 placeholder='Password' 
          />
          <button
           className='bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2  w-full text-base placholder:text-sm'
          >Sign Up</button>
          <p className='text-center mb-2'>or</p>
        </form>
        <div className='mt-2'>
          <Link
            to='/google-signup-captain'
            className='flex items-center justify-center text-lg text-[#4285F4] font-semibold border border-[#4285F4] rounded px-4 py-2 w-full'
          >
            <img src={GoogleLogo} alt="Google Logo" className='w-6 h-6 mr-2' /> Sign up with Google
          </Link>
        </div>
        <p className='text-center mt-4'>Already have an Account? <Link to='/captain-login' className='text-blue-600'>Login</Link></p>
        </div> 
        <div>
          <p className='text-center text-sm text-gray-600'>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaptainSignUp;
