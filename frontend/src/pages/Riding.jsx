import React from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Car from '../images/car.png';
import 'remixicon/fonts/remixicon.css'
import { useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';



const Riding = () => {

    const location = useLocation();
    const {ride} = location.state || {}
    const {socket} = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on('ride-ended', () => {
        navigate('/home')
    })


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
                        <h2 className='text-lg font-medium '>{ride?.captain.fullname.firstname+" "+ride?.captain.fullname.lastname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                    </div>
                </div>
                <div className='flex justify-between items-center flex-col'>
                    <div className=' w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>{ride?.dropLocation}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{ride?.dropLocation}</p
                                ></div>
                        </div>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="ri-money-rupee-circle-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>{ride?.fare}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash or UPI</p
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
