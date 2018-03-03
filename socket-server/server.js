const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// our localhost port
const port = 4001;

const app = express();

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {  
  socket.on('item added', (item) => {
    io.sockets.emit('item added', item);
  })

  socket.on('item removed', (itemId) => {
    io.sockets.emit('item removed', itemId);
    console.log('user removed');
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))