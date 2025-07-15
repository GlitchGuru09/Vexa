import React from 'react'
import Car from '../images/car.png';


const LookingForDriver = (props) => {
  return (
     <div>
                <h3 onClick={() => {props.setVehicleFoundPanel(false) }} className='absolute top-0 text-center p-1 w-[93%] text-2xl font-light text-gray-500'>
                    <i className="ri-arrow-down-wide-line"></i>
                </h3>
                <h3 className='text-2xl font-semibold mb-3'>Looking For a Driver</h3>
                <div className='flex justify-between items-center flex-col'>
                    <img className='h-26' src={Car} alt="" />
                    <div className=' w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>{props.pickup.split(',').slice(0, 2).join(',')}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p
                                ></div>
                        </div>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>{props.destination.split(',').slice(0, 2).join(',')}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p
                                ></div>
                        </div>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="ri-money-rupee-circle-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'><span className='inline'>₹</span>{props.fare[props.vehicleType]}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash or UPI</p
                                ></div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default LookingForDriver
