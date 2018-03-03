const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 4001

const app = express()

const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', socket => {  
  socket.on('item added', (item) => {
    io.sockets.emit('item added', item);
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))