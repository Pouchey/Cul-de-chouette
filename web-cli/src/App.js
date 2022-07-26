import React from 'react';
import  {Routes,Route, Outlet} from 'react-router-dom'

import Home from './views/Home'
import Lobby from './views/Lobby'


import Help from './components/App/Help'
import Background from './components/App/Background';

import './style/global/scroll-bar.css'
import './style/global/buttons.css'
import './style/global/animations.css'


export const playerContext = React.createContext();

function App() {

  const [player, setPlayer] = React.useState({
    playerID:'',
    partyID:''
  });


  const Main = () => {
    return (
      <playerContext.Provider value={{player, setPlayer}}>
      <Help/>
      <main id='main'>
        <Outlet/>
      </main>
      <Background/>
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
