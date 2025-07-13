import React, { useState, useRef } from 'react'
import VexaLogo from '../images/vexalogo.png'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/locationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide'; 
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios'; 

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundPanelRef =useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFoundPanel, setVehicleFoundPanel] =useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const handlePickupChange = async (e) => {
  setPickup(e.target.value);
  setActiveField('pickup');
  const token = localStorage.getItem('userToken');
  if (!token) {
    console.error('No token found. Please log in.');
    return;
  }
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
      params: { input: e.target.value },
      headers: {
        Authorization : `Bearer ${token}`,
      }
    });
    setPickupSuggestions(response.data);
  } catch (error) {
    console.error('Error fetching pickup suggestions:', error);
  }
}

const handleDestinationChange = async (e) => {
  setDestination(e.target.value);
  setActiveField('destination');
  const token = localStorage.getItem('userToken');
  if (!token) {
    console.error('No token found. Please log in.');
    return;
  }
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
      params: { input: e.target.value },
      headers: {
        Authorization : `Bearer ${token}`,
      }
    });
    setDestinationSuggestions(response.data);
  } catch (error) {
    console.error('Error fetching destination suggestions:', error);
  }
};

  const submitHandler = (e) => {
    e.preventDefault();
    // Add your submit logic here
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0

      });
      gsap.to(panelCloseRef.current, {
        opacity: 0
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0%)'
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0%)'
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFoundPanel) {
      gsap.to(vehicleFoundPanelRef.current, {
        transform: 'translateY(0%)'
      });
    } else {
      gsap.to(vehicleFoundPanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [vehicleFoundPanel]);

  useGSAP(() => {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0%)'
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [waitingForDriverPanel]);


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className="w-32 absolute ml-2" src={VexaLogo} alt="" />
      <div className='w-screen h-screen'>
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className=' flex flex-col h-screen justify-end absolute top-0 w-full'>
        <div className='h-[30%] p-5 bg-white relative'>
          <h3 ref={panelCloseRef} onClick={()=> {setPanelOpen(false)}} className='absolute top-0 text-center p-1 w-[93%] text-2xl font-light text-gray-500'>
            <i className="ri-arrow-down-wide-line"></i>
          </h3>
          <h4 className='text-2xl pb-3 font-semibold'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="Line absolute h-14 w-1 top-[43%] left-10 bg-gray-900 rounded-full"></div>
            <input 
              required
              onClick={() => { setPanelOpen(true); setActiveField('pickup'); }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eeeeee] mb-7 rounded-lg px-8 py-2 border w-full text-lg placeholder:text-base' 
              type="text" 
              placeholder='Add a pick-up location' 
            />
            <input 
              required
              onClick={() => { setPanelOpen(true); setActiveField('destination'); }}
              value={destination}
              onChange={handleDestinationChange}      
              className='bg-[#eeeeee] mb-7 rounded-lg px-8 py-2 border w-full text-lg placeholder:text-base'
              type="text" 
              placeholder='Enter your destination'
            />
          </form>
        </div>
        <div ref={panelRef} className='h-0 bg-white '>
          <LocationSearchPanel 
            setPanelOpen={setPanelOpen} 
            setVehiclePanel={setVehiclePanel}
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-5 py-6 pt-12'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-5 py-6 pt-12'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFoundPanel={setVehicleFoundPanel} />
      </div>
      <div ref={vehicleFoundPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-5 py-6 pt-12'>
        <LookingForDriver setVehicleFoundPanel={setVehicleFoundPanel} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0  bg-white px-5 py-6 pt-12'>
        <WaitingForDriver setWaitingForDriverPanel = {setWaitingForDriverPanel} />
      </div>
    </div>
  )
}

export default Home