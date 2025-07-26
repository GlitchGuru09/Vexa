import React from 'react'
import Car from '../images/car.png';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const FinishRide = (props) => {

    const navigate = useNavigate()

    async function endRide(){
        const token = localStorage.getItem('capToken');
        
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
              {
                rideId: props.ride._id
              },
              {
                headers: 
              { Authorization: `Bearer ${token}` }
              }
          );
        
          if (response.status === 200) {
            navigate('/captain-riding', {state: {ride: props.ride}})
          }
    }
    
  return (
    <div>
            <h3 onClick={() => {props.setFinishRidePanel(false)}} className='absolute top-0 text-center p-1 w-[93%] text-2xl font-light text-gray-500'>
                <i className="ri-arrow-down-wide-line"></i>
            </h3>
            <h3 className='text-2xl font-semibold mb-3'>Finish this Ride</h3>
            <div className='flex items-center justify-between p-3 rounded-xl bg-yellow-300 mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://tse4.mm.bing.net/th/id/OIP.hzuak7Fjr-w-arzEYhXNgAHaJ4?pid=Api&P=0&h=180" alt="" />
                    <h2>{props.ride?.user.fullname.firstname+" "+props.ride?.user.fullname.lastname}</h2>
                </div>
            </div>
            <div className='flex justify-between items-center flex-col'> 
                <div className=' w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.pickup}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p
                            ></div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.dropLocation}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.dropLocation}</p
                            ></div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹ {props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash or UPI</p
                            ></div>
                    </div>
                </div>
              <div className='mt-10 w-full' >
                  <button onClick={endRide} className='w-full mt-5 flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride
                  </button>
                  <p className='flex justify-center mt-6 text-xs '>Click on Finish Ride if you completed the payment.</p>
              </div>
            </div>
        </div>
  )
}

export default FinishRide
