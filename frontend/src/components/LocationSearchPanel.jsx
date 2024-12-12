import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.address?.label || suggestion.title)
        } else if (activeField === 'destination') {
            setDestination(suggestion.address?.label || suggestion.title)
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }

    return (
        <div>
            {
                suggestions.map((elem, idx) => (
                    <div key={idx}
                     onClick={() => handleSuggestionClick(elem)} 
                     className='flex gap-4 border-2 p-3 border-white active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium flex-1'>{elem.address?.label || elem.title}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSearchPanel