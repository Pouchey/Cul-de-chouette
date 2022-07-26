import React from 'react'
import Carousel from '../utils/Carousel';

import './helpPopup.css'

function HelpPopup({isOpen}) {


  React.useEffect(() => {
    if(isOpen)
      document.getElementById('main').style.filter = 'blur(5px)';
    else
      document.getElementById('main').style.filter = 'none'
      
  },[isOpen]);

  return (
    
    <div className={isOpen ? 'popup-container popup-active' : 'popup-container popup-hidden'}>
      <Carousel paused={isOpen ? true : false}/>
    </div>
  )
}

export default HelpPopup