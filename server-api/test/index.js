const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on('connect', () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});


socket.emit('joinGame', { id: "123", name: "Rouchet",avatar: "perceval" });

socket.on('playersUpdate', (data) => {
  console.log(data); // { id: '123', name: 'Rouchet', avatar: 'perceval' }
});

socket.on('optionsUpdate', (data) => {
  console.log(data); 
});

socket.on('joinGame', (data) => {
  console.log(data); // { success: true, playerID: '123' }
});

