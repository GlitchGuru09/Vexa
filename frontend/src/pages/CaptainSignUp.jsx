import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import GoogleLogo from '../images/google-logo.png';
import CaptainImage from '../images/captain.png';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainSignUp = () => {
  const [step, setStep] = useState(1);
  const [captainFirstName, setCaptainFirstName] = useState('');
  const [captainLastName, setCaptainLastName] = useState('');
  const [captainEmail, setCaptainEmail] = useState('');
  const [captainPassword, setCaptainPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: captainFirstName,
        lastname: captainLastName,
      },
      email: captainEmail,
      password: captainPassword,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType: vehicleType
      }
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);
    if(response.status === 201) {
      const data = response.data;

      setCaptain(data.captain);

      localStorage.setItem('capToken', data.capToken);
      navigate('/captain-home');
      } 


    setCaptainFirstName('');
    setCaptainLastName('');
    setCaptainEmail('');
    setCaptainPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  };

  return (
    <div>
      <Header />
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <div className='flex justify-center mb-6'>
            <img src={CaptainImage} alt="Captain" className='w-24 h-24 mb-4' />
          </div>
          <form onSubmit={step === 1 ? handleNext : submitHandler}>
            {step === 1 && (
              <div>
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
                <div className='flex justify-end'>
                  <button
                    className='bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-base placholder:text-sm'
                    type='submit'
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3 className='text-base font-medium mb-2'>Vehicle Information</h3>
                <input required
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-base placholder:text-sm'
                  type="text"
                  placeholder='Vehicle Color'
                />
                <input required
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-base placholder:text-sm'
                  type="text"
                  placeholder='Vehicle Plate'
                />
                <input required
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-base placholder:text-sm'
                  type="number"
                  min={1}
                  placeholder='Vehicle Capacity'
                />
                <select required
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-base placholder:text-sm'>
                  <option value="" disabled>Select Type</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="auto">Auto</option>
                </select>
                <div>
                  <button
                    className='bg-[#eee] text-[#111] font-semibold mb-2 rounded px-4 py-2 w-full text-base border'
                    onClick={handleBack}
                    type='button'
                  >
                    <span>&larr;</span> Back
                  </button>
                  <button
                    className='bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-base placholder:text-sm'
                    type='submit'
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
            <p className='text-center mb-2 mt-4'>or</p>
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
