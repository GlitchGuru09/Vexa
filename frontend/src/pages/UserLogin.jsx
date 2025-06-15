import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserLogin = () => {
  return (
    <div>
      <Header />
      <div className='p-7 '>
        <div>
          <form action="">
          <h3 className='text-lg font-medium mb-2'>What's Your Email?</h3>
          <input required 
                 className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placholder:text-base'
                 type="text" 
                 placeholder='email@example.com' 
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input required 
                 className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placholder:text-base'
                 type="password" 
                 placeholder='Password' 
          />
          <button
           className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placholder:text-base'
          >Login</button>
        </form>
        </div>
        <div>
          <button
          className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placholder:text-base'
          >Sign in as Captain</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserLogin
