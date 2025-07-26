import React, { useRef, useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import VexaLogo from '../images/vexalogo.png'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import Car from '../images/car.png';
import 'remixicon/fonts/remixicon.css'
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContext';

const CaptainHome = () => {

  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpPanelRef = useRef(null)

  const [ridePopUpPanel, SetRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, SetConfirmRidePopUpPanel] = useState(false)
  const [ride, setRide] = useState(null);

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!captain || !socket) return; // ✅ Add socket null check

    socket.emit("join", { userType: 'captain', userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

          // console.log("captain id:", captain._id, "location:", position.coords.latitude, position.coords.longitude);

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
          // console.log("Location updated for captain:", captain._id, "to", position.coords.latitude, position.coords.longitude);
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 5000);
    updateLocation();

    //   return () => clearInterval(locationInterval);
  });

  socket.on('new-ride', (data) => {
    // console.log(data);
    setRide(data);
    SetRidePopUpPanel(true);
  })

  async function confirmRide() {
  const token = localStorage.getItem('capToken');
  if (!token) {
    console.error('No token found. Please log in.');
    return;
  }
  // console.log(ride._id+' '+captain._id)
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{rideId: ride._id,captainId: captain._id},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // console.log(response)

    SetRidePopUpPanel(false);
    SetConfirmRidePopUpPanel(true);
  } catch (error) {
    if (error.response) {
      console.error('Backend responded with error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
}

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0%)'
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0%)'
      });
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [confirmRidePopUpPanel]);

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src={VexaLogo} alt="" />
        <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full '>
          <i className=" text-lg font-medium ri-logout-box-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" alt="" />

      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-5 py-6 pt-12'>
        <RidePopUp
          ride={ride}
          SetRidePopUpPanel={SetRidePopUpPanel}
          SetConfirmRidePopUpPanel={SetConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-5 py-6 pt-12'>
        <ConfirmRidePopUp 
        ride={ride}
        SetConfirmRidePopUpPanel={SetConfirmRidePopUpPanel} 
        SetRidePopUpPanel={SetRidePopUpPanel} />
      </div>
    </div>
  )
}

export default CaptainHome
