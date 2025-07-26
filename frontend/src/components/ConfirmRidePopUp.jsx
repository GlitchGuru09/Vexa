import React, { useState } from 'react'
import Car from '../images/car.png';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('capToken');

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params:
      {
        rideId: props.ride._id,
        otp: otp
      },
      headers: 
      { Authorization: `Bearer ${token}` }
  });

  // console.log(response)

  if (response.status === 200) {
    props.SetConfirmRidePopUpPanel(false)
    props.SetRidePopUpPanel(false)
    navigate('/captain-riding', {state: {ride: props.ride}})
  }

};

return (
  <div className='h-screen'>
    <h3 onClick={() => { props.SetConfirmRidePopUpPanel(false) }} className='absolute top-0 text-center p-1 w-[93%] text-2xl font-light text-gray-500'>
      <i className="ri-arrow-down-wide-line"></i>
    </h3>
    <h3 className='text-2xl font-semibold mb-3'>Confirm this ride to start</h3>
    <div className='flex items-center justify-between p-3 rounded-xl bg-yellow-300 mt-4'>
      <div className='flex items-center gap-3 '>
        <img className='h-10 w-10 rounded-full object-cover' src="https://tse4.mm.bing.net/th/id/OIP.hzuak7Fjr-w-arzEYhXNgAHaJ4?pid=Api&P=0&h=180" alt="" />
        <h2>{props.ride?.user.fullname.firstname + ' ' + props.ride?.user.fullname.lastname}</h2>
      </div>
    </div>
    <div className='flex justify-between items-center flex-col'>
      <div className=' w-full mt-5'>
        <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className="text-lg ri-map-pin-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>{props.ride?.pickup.split(',').slice(0, 2).join(',')}</h3>
            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className="text-lg ri-map-pin-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>{props.ride?.dropLocation.split(',').slice(0, 2).join(',')}</h3>
            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.dropLocation}</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className="ri-money-rupee-circle-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
            <p className='text-sm -mt-1 text-gray-600'>Cash or UPI</p>
          </div>
        </div>
      </div>
      <div className='mt-6 w-full' >
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            placeholder='Enter OTP'
            className='bg-[#eeeeee] rounded-lg px-6 py-2 border w-full font-mono text-lg placeholder:text-base'
          />
          <button className='w-full mt-5 flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm
          </button>
          <button
            type="button"
            onClick={() => {
              props.SetConfirmRidePopUpPanel(false)
              props.SetRidePopUpPanel(false)
            }}
            className='w-full mt-1 bg-red-600 text-white font-semibold p-3 rounded-lg'
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
)
}

export default ConfirmRidePopUp