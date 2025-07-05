import React, { useState } from 'react'
import Car from '../images/car.png';
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your OTP validation or API call here
  };

  return (
    <div className='h-screen'>
      <h3 onClick={() => {props.SetConfirmRidePopUpPanel(false)}} className='absolute top-0 text-center p-1 w-[93%] text-2xl font-light text-gray-500'>
        <i className="ri-arrow-down-wide-line"></i>
      </h3>
      <h3 className='text-2xl font-semibold mb-3'>Confirm this ride to start</h3>
      <div className='flex items-center justify-between p-3 rounded-xl bg-yellow-300 mt-4'>
        <div className='flex items-center gap-3 '>
          <img className='h-10 w-10 rounded-full object-cover' src="https://tse4.mm.bing.net/th/id/OIP.hzuak7Fjr-w-arzEYhXNgAHaJ4?pid=Api&P=0&h=180" alt="" />
          <h2>Shrey Vernekar</h2>
        </div>
        <h5 className='text-lg font-medium'>2.2 Km</h5>
      </div>
      <div className='flex justify-between items-center flex-col'> 
        <div className=' w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562,/11-4</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cortalim, Goa</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562,/11-4</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cortalim, Goa</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>₹192.20</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
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
            <Link to='/captain-riding' className='w-full mt-5 flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm
            </Link>
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