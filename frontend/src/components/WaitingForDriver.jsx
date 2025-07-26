import React from 'react'
import Car from '../images/car.png';


const WaitingForDriver = (props) => {
    return (
        <div>
            <h3 onClick={() => {props.setWaitingForDriverPanel(false) }} className='absolute top-0 text-center p-1 w-[93%] text-2xl font-light text-gray-500'>
                <i className="ri-arrow-down-wide-line"></i>
            </h3>
            <div className='flex justify-between items-center flex-col border-b-2'>
                <h1 className='text-lg font-medium m-2'>
                    <span>OTP: </span>{props.ride?.otp}
                </h1>
            </div>
            <div className='flex items-center justify-between'>
                <img className='h-12' src={Car} alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-sm '>{props.ride?.captain.fullname.firstname+' '+props.ride?.captain.fullname.lastname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
                    <p className='font-sm text-gray-600 '><span>Vehicle Color: </span>{props.ride?.captain.vehicle.color}</p>
                </div>
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
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash or UPI</p
                            ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver
