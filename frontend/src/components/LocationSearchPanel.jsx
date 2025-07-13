import React from 'react'
import 'remixicon/fonts/remixicon.css'

// Accept all needed props from parent
const LocationSearchPanel = ({
  suggestions = [],
  setPickup,
  setDestination,
  setPanelOpen,
  setVehiclePanel,
  activeField,
}) => {
  // Define the handler correctly
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
    } else if (activeField === 'destination') {
      setDestination(suggestion);
    }
    // setPanelOpen(false);
    // setVehiclePanel(true);
  };

  return (
    <div>
      {suggestions.map((item, index) => (
  <div
    key={item.place_id || index}
    onClick={() => handleSuggestionClick(item.description)}
    className='flex border-2 border-gray-100 active:border-black p-3 rounded-xl items-center justify-start gap-4 my-2 cursor-pointer'
  >
    <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
      <i className="ri-map-pin-fill"></i>
    </h2>
    <h4 className='font-medium'>{item.description}</h4>
  </div>
))}
    </div>
  );
};

export default LocationSearchPanel