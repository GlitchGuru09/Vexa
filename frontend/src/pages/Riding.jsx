import React from 'react'
import {Link} from 'react-router-dom'
import Car from '../images/car.png';
import 'remixicon/fonts/remixicon.css'



const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed block right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full '>
                <i className=" text-lg font-medium ri-home-9-line"></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-12' src={Car} alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium '>shrey</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>GA06 2714</h4>
                        <p className='font-sm text-gray-600 '>Maruti Suzuki alto</p>
                    </div>
                </div>
                <div className='flex justify-between items-center flex-col'>
                    <div className=' w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>562,/11-4</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cortalim, Goa</p
                                ></div>
                        </div>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="ri-money-rupee-circle-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹192.20</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p
                                ></div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 text-white bg-green-600 font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding
