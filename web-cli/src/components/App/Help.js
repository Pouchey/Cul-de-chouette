import React from 'react'

import './help.css'
import HelpPopup from './HelpPopup'

function Help() {
  

  const [isOpen, setIsOpen] = React.useState(false)
  
  return (
    <>
      {/* Toggler */}
      <button className='help' onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-regular fa-circle-question"></i>
      </button>
      {/* Pop up */}
      <HelpPopup isOpen={isOpen}/>

    </>
  )
}

export default Help