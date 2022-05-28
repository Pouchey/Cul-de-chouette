import React from 'react'

import '../style/views/Home.css'

import AvatarSelector from './AvatarSelector'

function Home() {


  const [username, setUsername] = React.useState('')

  const joinGame = (e) =>{
    e.preventDefault()
    // alert(`Welcome to the game ${username}!`)
  } 


  return (
    <div className='home-container'>
      <img
          src="/images/logo.png" // Route of the image file
          alt="Logo"
          className="logo"
      />
      <AvatarSelector/>
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