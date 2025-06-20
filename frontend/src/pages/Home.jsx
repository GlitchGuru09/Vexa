import React, { useState, useRef } from 'react'
import VexaLogo from '../images/vexalogo.png'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%'
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%'
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0
      });
    }
  }, [panelOpen]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Add your submit logic here
  }

  return (
    <div className='h-screen relative'>
      <img className="w-32 absolute ml-2" src={VexaLogo} alt="" />
      <div className='w-screen h-screen'>
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className=' flex flex-col h-screen justify-end absolute top-0 w-full'>
        <div className='h-[30%] p-5 bg-white relative'>
          <h3 ref={panelCloseRef} onClick={()=> {setPanelOpen(false)}} className='absolute opacity-0 top-4 right-6 text-2xl font-light text-gray-500'>
            <i className="ri-arrow-down-wide-line"></i>
          </h3>
          <h4 className='text-2xl pb-3 font-semibold'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="Line absolute h-14 w-1 top-[43%] left-10 bg-gray-900 rounded-full"></div>
            <input 
              required
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className='bg-[#eeeeee] mb-7 rounded-lg px-8 py-2 border w-full text-lg placholder:text-base' 
              type="text" 
              placeholder='Add a pick-up location' 
            />
            <input 
              required
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}    
              className='bg-[#eeeeee] mb-7 rounded-lg px-8 py-2 border w-full text-lg placholder:text-base'
              type="text" 
              placeholder='Enter your destination'
            />
          </form>
        </div>
        <div ref={panelRef} className='h-0 bg-red-500 '>
          {/* Animated panel content here */}
        </div>
      </div>
    </div>
  )
}

export default Home
