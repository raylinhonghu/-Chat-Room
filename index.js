var express = require('express');
var socket = require('socket.io');

// App set up
var app = express();
var server = app.listen(4000,function(){
  console.log("Listening to request port 4000");
});

// Static files
app.use(express.static('public'));

// back end socket
// Socket setup to work on this server
var io = socket(server);

// socket refer to one particular socket
// client to make a connection with server
io.on('connection', function(socket){
  console.log("socket connection made",socket.id);

  // listen for that message from the client
  socket.on('chat',function(data){
    // every socket
    io.sockets.emit('chat',data);
  })

  socket.on('typing',function(data){
    // broadcast
    socket.broadcast.emit('typing',data);
  })
})
