import React from 'react'
import VexaLogo from '../images/vexalogo.png'
import HomeCar from '../images/homecar.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
  const backgroundStyle = {
    backgroundImage: `url(${HomeCar})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div>
      <div className='pt-2 w-full flex justify-between flex-col bg-red-400 h-screen' style={backgroundStyle}>
        <img src={VexaLogo} alt="Vexa Logo" className="w-32 ml-2" />
        <div className='bg-white pb-7 py-4 px-4'>
          <h2 className='text-3xl font-bold'>Get Started with Vexa</h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4' >Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
