import React from 'react'
import '../style/views/Home.css'
import AvatarSelector from './Home/AvatarSelector'
import { useNavigate } from 'react-router-dom'

import { playerContext } from '../App'
import socket from '../socket-connection'

function Home() {

  const { setPlayer } = React.useContext(playerContext)

  const [username, setUsername] = React.useState('')
  const [avatar,setAvatar] = React.useState('')

  const navigate = useNavigate();

  const joinGame = (e) =>{
    e.preventDefault()
    
    const p = {
      username,
      avatar
    }

    socket.emit('joinGame',{p},(error) =>{
      if(error){
        alert(error)
      }
    })

  } 

  React.useEffect(() => {
    socket.on('joinGame',(data) =>{
      setPlayer({playerID:data.playerID,partyID:data.partyID})
      navigate('/lobby/' + data.partyID)
    })
  },[navigate,setPlayer])



  return (
    <div className='home-container'>
      <img
          src="/images/logo.png" // Route of the image file
          alt="Logo"
          className="logo"
      />
      <AvatarSelector setAvatar={setAvatar}/>
      <form onSubmit={joinGame}>
        <label htmlFor="username">Choisi ton pseudo:</label>
        <input 
          type="text" 
          id="username"
          aria-describedby="username" 
          placeholder="Pseudo"
          autoComplete="username"
          required
          value={username}
          onChange={(e)=>setUsername(e.currentTarget.value)}
        />
        <button type="submit">Join</button>
      </form>
    </div>
  )
}

export default Home