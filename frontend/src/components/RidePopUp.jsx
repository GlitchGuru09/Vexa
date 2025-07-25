import React from 'react'
import Car from '../images/car.png';

const RidePopUp = (props) => {
    // console.log(props);
    return (
        <div>
            <h3 onClick={() => {props.SetRidePopUpPanel(false)}} className='absolute top-0 text-center p-1 w-[93%] text-2xl font-light text-gray-500'>
                <i className="ri-arrow-down-wide-line"></i>
            </h3>
            <h3 className='text-2xl font-semibold mb-3'>New Ride Available!</h3>
            <div className='flex items-center justify-between p-3 rounded-xl bg-yellow-300 mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://tse4.mm.bing.net/th/id/OIP.hzuak7Fjr-w-arzEYhXNgAHaJ4?pid=Api&P=0&h=180" alt="" />
                    <h2>{props.ride?.user.fullname.firstname+' '+props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-medium'>2.2 Km</h5>
            </div>
            <div className='flex justify-between items-center flex-col'> 
                <div className=' w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.pickup.split(',').slice(0, 2).join(',')}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p
                            ></div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.dropLocation.split(',').slice(0, 2).join(',')}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.dropLocation}</p
                            ></div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'><span className='inline'>₹</span>{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash or UPI</p
                            ></div>
                    </div>
                </div>
                <div className='flex items-center justify-between w-full mt-4'>
                    <button onClick={() => {props.SetRidePopUpPanel(false)}} 
                            className=' bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg'>Ignore
                    </button>
                    <button onClick={() => {
                        props.SetConfirmRidePopUpPanel(true)
                        props.confirmRide()
                        }}
                             className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Accept
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp
