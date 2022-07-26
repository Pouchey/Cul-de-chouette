import React from 'react'
import avatarlist from './avatarlist'


import './avatarSelector.css'



function AvatarSelector({setAvatar}) {
  
  const [avatarCurrent, setAvatarCurrent] = React.useState('')
  const [avatarList, setAvatarList] = React.useState(avatarlist)
  const [avatarIndex, setAvatarIndex] = React.useState(0)

  React.useEffect(() => {
    setAvatarCurrent(avatarList[avatarIndex])
  }, [avatarList, avatarIndex])

  const nextAvatar = () => {
    setAvatarIndex((avatarIndex + 1) % avatarList.length)
  }

  const prevAvatar = () => {
    setAvatarIndex((avatarIndex - 1 + avatarList.length) % avatarList.length)
  }

  return (
    <div className="avatar-selector">
      <img src={avatarCurrent.image} alt={avatarCurrent.name} />

      <div className="avatar-selector-btn-container">
      <button className="avatar-selector-btn" onClick={prevAvatar}>
        <i className="fas fa-chevron-left" />
      </button>

      <button className="avatar-selector-btn" onClick={nextAvatar}>
        <i className="fas fa-chevron-right" />
      </button>
      
      </div>
    </div>
  )
}

export default AvatarSelector