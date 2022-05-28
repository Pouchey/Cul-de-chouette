// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------

module.exports = (io,socket) => {

  const {
    joinGame,
    leaveGame,
    editGame,
    startGame,
  } = require('./lobbyEvents')(io);


  socket.on('joinGame',joinGame);
  socket.on('disconnect',leaveGame);
  socket.on('editGame',editGame);
  socket.on('startGame',startGame);

}

