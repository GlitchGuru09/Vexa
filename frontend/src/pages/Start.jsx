import React from 'react'
import VexaLogo from '../images/vexalogo.png'
import HomeCar from '../images/homecar.jpg'
import { Link } from 'react-router-dom'

const Start = () => {
  const backgroundStyle = {
    backgroundImage: `url(${HomeCar})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div style={backgroundStyle} className="relative flex flex-col min-h-screen w-full">
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      {/* Logo at top left */}
      <img src={VexaLogo} alt="Vexa Logo" className="w-32 absolute top-6 left-6 z-20 drop-shadow-lg" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4">
        <div className="bg-white/80 rounded-xl shadow-xl p-8 max-w-lg w-full flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight font-sans text-center">Your Journey Starts Here</h2>
          <p className="text-lg text-gray-700 mb-8 text-center font-light">Book a ride, explore the city, and move smarter with Vexa.</p>
          <Link to='/login' className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-200 text-center">Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
