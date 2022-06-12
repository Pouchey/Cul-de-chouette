import React from 'react'

import './helpPopup.css'

function HelpPopup({isOpen}) {


  React.useEffect(() => {
    if(isOpen)
      document.getElementById('main').style.filter = 'blur(5px)';
    else
      document.getElementById('main').style.filter = 'none'
      
  },[isOpen]);

  return (
    
    <div className={isOpen ? 'popup-container active' : 'popup-container hidden'}>
      <h1>Help popup</h1>
    </div>
  )
}

export default HelpPopup