import React from 'react'
import Car from '../images/car.png';
import Moto from '../images/moto.png';
import Auto from '../images/auto.png';

const VehiclePanel = (props) => {
  return (
    <div>
      <h3  onClick={()=> {props.setVehiclePanel(false)}} className='absolute top-0 text-center p-1 w-[93%] text-2xl font-light text-gray-500'>
                  <i className="ri-arrow-down-wide-line"></i>
                </h3>
              <h3 className='text-2xl font-semibold mb-3'>Select a ride</h3>
              <div onClick={() => {props.setConfirmRidePanel(true)}} className='w-full border-2 active:border-black rounded-xl mb-2 flex items-center justify-between p-3'>
                <img className='h-14' src={Car} alt="" />
                <div className='w-1/2'>
                  <h4 className='font-medium text-base'>VexaGo <span><i className="ri-user-fill"></i>4</span></h4>
                  <h5 className='font-medium text-sm'>2 min away</h5>
                  <p className='font-normal text-xs text-gray-700'>Affordable, Compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹192.20</h2>
              </div>
              <div onClick={() => {props.setConfirmRidePanel(true)}} className='w-full border-2 active:border-black rounded-xl mb-2 flex items-center justify-between p-3'>
                <img className='h-16' src={Moto} alt="" />
                <div className='w-1/2'>
                  <h4 className='font-medium text-base'>Vexa Moto<span><i className="ri-user-fill"></i>1</span></h4>
                  <h5 className='font-medium text-sm'>10 min away</h5>
                  <p className='font-normal text-xs text-gray-700'>Affordable, Motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹99.20</h2>
              </div>
              <div onClick={() => {props.setConfirmRidePanel(true)}} className='w-full border-2 active:border-black rounded-xl mb-2 flex items-center justify-between p-3'>
                <img className='h-16' src={Auto} alt="" />
                <div className='w-1/2'>
                  <h4 className='font-medium text-base'>Vexa Auto <span><i className="ri-user-fill"></i>3</span></h4>
                  <h5 className='font-medium text-sm'>5 min away</h5>
                  <p className='font-normal text-xs text-gray-700'>Affordable, Auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹148.00</h2>
              </div>
    </div>
  )
}

export default VehiclePanel
