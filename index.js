const express = require('express');
const socket = require('socket.io');

const port = 3000;
const app = express();
const server = app.listen(port, console.log('Server up on port', port));

app.get('/', function (request, response) {
  response.sendFile(`${__dirname}/index.html`);
});

const io = socket(server);

io.on('connection', function(socket) {
  console.log('user joined');
  io.emit('chat message', 'user joined');

  socket.on('disconnect', function() {
    console.log('user left');
    io.emit('chat message', 'user left');
  });

  socket.on('chat message', function(msg) {
    console.log('chat message: ', msg);
    io.emit('chat message', msg);
  });
});
