import React from 'react';
import  {Routes,Route, Outlet} from 'react-router-dom'

import Home from './views/Home'
import Lobby from './views/Lobby'


import Help from './components/Help'
import HelpPopup from './components/HelpPopup'
import Background from './components/Background';

import './style/global/scroll-bar.css'
import './style/global/buttons.css'
import './style/global/animations.css'


export const playerContext = React.createContext();

function App() {

  const [player, setPlayer] = React.useState({
    playerID:'',
    partyID:''
  });

  const [toggleHelp, setToggleHelp] = React.useState(false);

  const handleHelp = () =>{
    setToggleHelp(!toggleHelp);
  }

  const Main = () => {
    return (
      <playerContext.Provider value={{player, setPlayer}}>

      <main style={toggleHelp ? {filter: 'blur(10px)',overflow:'hidden'} : {filter:'none'}}>
      <Help handleHelp={handleHelp}/>
        <Outlet/>
        <Background/>
      </main>
      {toggleHelp && <HelpPopup/>}
      </playerContext.Provider>
    )
  }



  return (
    <div >
        <Routes>
        <Route exact path="/" element={<Main/>}>
          <Route index element={<Home/>}/>
          <Route path="lobby/:id" element={<Lobby />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
