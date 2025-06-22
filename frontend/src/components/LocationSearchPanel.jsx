import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = (props) => {
 
    const location = [
        "24B, Near Kapoor's cafe, Bhopal",
        "23B, Near manotra's cafe, Bhopal",
        "25B, Near Sharma's cafe, Bhopal"
    ]
  return (
    <div>
        {
            location.map(function (item,index){
            return <div key={index} onClick={() => {
                props.setVehiclePanel(true)
                props.setPanelOpen(false)

            }} className='flex border-2 border-gray-100 active:border-black p-3 rounded-xl items-center justify-start gap-4 my-2'>
                        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{item}</h4>
                    </div>
            })
        }
    </div>
  )
}

export default LocationSearchPanel
