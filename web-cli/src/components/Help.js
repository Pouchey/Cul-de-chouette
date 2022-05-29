import React from 'react'

import './help.css'

function Help({handleHelp}) {
  
  return (
    <button className='help' onClick={handleHelp}>
      <i className="fa-regular fa-circle-question"></i>
    </button>
  )
}

export default Help