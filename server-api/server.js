// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const { initGame } = require('./game/lobby-logic');



// --------------------------------------------------------------
//  Create the server
// --------------------------------------------------------------

const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// --------------------------------------------------------------
//  Configure the server
// --------------------------------------------------------------
app.use(express.json());

const socketHandler = require('./route/socketHandler');

// Setting up sockets
const onConnection = (socket) => {
  socketHandler(io,socket);
}
io.on('connection', onConnection);

// --------------------------------------------------------------
//  Listen on the port
// --------------------------------------------------------------
httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
