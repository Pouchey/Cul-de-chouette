import React from 'react'
import avatarlist from './avatarlist'


import './avatarSelector.css'

function AvatarSelector({setAvatar}) {


  const [current, setCurrent] = React.useState(0)
  const length = avatarlist.length;

  React.useEffect(() => {
    const random = Math.floor(Math.random() * length)
    setCurrent(random)
  }, [length])

  React.useEffect(() => {
    setAvatar(avatarlist[current].name)
  },[current, setAvatar])


  const getAvatar = (index) =>{

    let avatar = avatarlist[index];

    return(
      avatar && avatar.image && avatar.name && 
      <img
        src={avatar.image}
        alt={avatar.name}
        className="avatar"
      />
    )

  }

  const getNext = () =>{
    let next = current + 1;
    if(next >= length){
      next = 0;
    }
    return next;
  }
  const getPrevious = () =>{
    let previous = current - 1;
    if(previous < 0){
      previous = length - 1;
    }
    return previous;
  }

  const setNext = () =>{
    setCurrent(getNext());
  }
  const setPrevious = () =>{
    setCurrent(getPrevious());
  }
  



  return (
    <section className='avatar-selector'>
      <button className='prevSlide' onClick={() => setPrevious()}>
        {getAvatar(getPrevious()) }
      </button>
      <span className='currentSlide'>
        {getAvatar(current)}
      </span>
      <button className='nextSlide' onClick={() => setNext()}>
        {getAvatar(getNext())}
      </button>
    </section>
  )
}

export default AvatarSelector