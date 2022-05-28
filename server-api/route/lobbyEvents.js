// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
const {
  initGame,
  getParty,
  addPlayer,
  reconnectPlayer,
  removePlayer,
  findPartyBySocket,
  findPlayerBySocket,
  getPlayers,
  setOptions,
  getLaunched,
  launch,

} = require('../game/lobby-logic');

module.exports = (io) => {

  // player object should contain id, name and avatar
  const joinGame = function (player,partyID)  {
    const socket = this;
    // Check if a party with the given ID exists
    let party;
    try{
      party = getParty(partyID);
    }
    catch(e){
      //nothing to do
    }

    if(party){
      if(getLaunched(partyID)){
        // If the party is already launched, we add the player to the party
        try{
          // If the party is already launched, 
          // try to reconnect the player
          const playerID = reconnectPlayer(partyID,player);
          // Join socket room
          socket.join(partyID);
          // Send back the player ID
          socket.emit('joinGame',{
            success: true,
            playerID: playerID,
          });
          // Send back the players infos
          io.sockets.in(partyID).emit('playersUpdate',getPlayers(partyID));
        }
        catch(e){
          socket.emit('joinGame',{
            success: false,
          });
        }
        return;
      }
      // If the party is not launched, we add the player to the party
      try{
        // Add the player to the party
        const playerID = addPlayer(partyID,socket.id,player);
        // Join socket room
        socket.join(partyID);
        // Send the playerID to the client
        socket.emit('joinGame',{
          success: true,
          playerID: playerID,
        });
          // Send back the players infos
          io.sockets.in(partyID).emit('playersUpdate',getPlayers(partyID));
      }
      catch(err){
        socket.emit('joinGame','Cant join the game',{
          success: false,
        });
      }
    }
    // If the party doesn't exist 
    // We create a new party
    else{
      try{
        const {partyID,playerID} = initGame(socket.id,player);
        // Join socket room
        socket.join(partyID);
        socket.emit('joinGame',{
          success: true,
          partyID: partyID,
          playerID: playerID,
        });        
        // Send back the players infos
        io.sockets.in(partyID).emit('playersUpdate',getPlayers(partyID));
        // Send back party options
        io.sockets.in(partyID).emit('optionsUpdate',getParty(partyID).getOptions());
      }
      catch(err){
        socket.emit('joinGame','Cant created game',{
          success: false,
        });
        console.log(err)
      }
    }
  }

  const leaveGame = function() {
    const socket = this;
    const partyID = findPartyBySocket(socket.id);
    const playerID = findPlayerBySocket(partyID,socket.id);

    if(partyID){
      // Remove the player from the party
      removePlayer(partyID,playerID);
      // Send back the players infos
      io.sockets.in(partyID).emit('playersUpdate',getPlayers(partyID));
      
    }
    console.log('Player disconnected');
  }

  const editGame = function (partyID,options) {
    const socket = this;

    try{
      setOptions(partyID,options);
      socket.emit('editGame',{
        success: true,
      });
      // Send back party options
      io.sockets.in(partyID).emit('optionsUpdate',getParty(partyID).getOptions());
    }
    catch(err){
      socket.emit('editGame',{
        success: false,
      });
    }
  }

  const startGame = function (partyID) {
    
    const socket = this;
    try{
      launch(partyID);
      io.sockets.in(partyID).emit('startGame',{
        success: true,
      });
    }
    catch(err){
      console.log("Error while starting game");
    }
  }

  return {
    joinGame,
    leaveGame,
    editGame,
    startGame,
  }

}

