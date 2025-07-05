import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import VexaLogo from '../images/vexalogo.png'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Car from '../images/car.png';
import 'remixicon/fonts/remixicon.css'
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {
    const finishRidePanelRef = useRef(null)

    const [finishRidePanel, setFinishRidePanel] = useState(false)

    useGSAP(() => {
        if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(0%)'
        });
        } else {
        gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)'
        });
        }
    }, [finishRidePanel]);

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src={VexaLogo} alt="" />
        <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full '>
          <i className=" text-lg font-medium ri-logout-box-line"></i>
        </Link>
      </div>
      <div className='h-4/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" alt="" />

      </div>
      <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400'
            onClick={() => {
                setFinishRidePanel(true)
            }}>
      <h3 className='absolute top-0 text-center p-1 w-[93%] text-2xl font-light text-gray-500'>
                <i className="ri-arrow-up-wide-line"></i>
        </h3>
        <h4 className='text-xl font-semibold'>4 mins away</h4>
        <button  className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-5 py-6 pt-12'>
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding
