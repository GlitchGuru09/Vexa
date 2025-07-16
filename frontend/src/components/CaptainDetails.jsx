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
          <img
            className='h-10 w-10 rounded-full object-cover'
            src="https://tse2.mm.bing.net/th/id/OIP.x6_OuR6j8XixmWyCqfyEKgHaHa?pid=Api&P=0&h=180"
            alt="Captain"
          />
          <h4 className='text-lg font-medium'>{captain.fullname.firstname}</h4>
        </div>
        <div>
          <h4 className='text-lx font-semibold'>Rs. 269.50</h4>
          <p className='text-sm font-medium text-gray-600'>Earned</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
