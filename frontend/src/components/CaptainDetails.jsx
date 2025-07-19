import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  console.log("captain data:", captain);

  // ✅ Check if captain or fullname is missing
  if (!captain || !captain.fullname) {
    return <div className="text-gray-500">Loading captain details...</div>;
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-3'>
            <img className='h-10 w-10 rounded-full object-cover' src="https://tse2.mm.bing.net/th/id/OIP.x6_OuR6j8XixmWyCqfyEKgHaHa?pid=Api&P=0&h=180" alt="" />
            <h4 className='text-lg font-medium'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className='text-lx font-semibold'>Rs. 269.50</h4>
            <p className=' text-sm font-medium text-gray-600'>Earned</p>
          </div>
        </div>
        <div className='flex p-3 mt-6 bg-gray-50 rounded-full justify-center gap-4 items-start'>
          <div className='text-center'><i className="text-2xl  mb-2 font-thin ri-timer-2-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p></div>
          <div className='text-center'><i className=" text-2xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p></div>
          <div className='text-center'><i className=" text-2xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className='text-lg font-medium' >10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p></div>
      </div>
    </div>
  )
}

export default CaptainDetails
