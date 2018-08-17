const express = require('express');
const socket = require('socket.io');

const port = 3000;
const app = express();
const server = app.listen(port, console.log('Server up on port', port));

app.get('/', function (request, response) {
  response.sendFile(`${__dirname}/index.html`);
});

const io = socket(server);

const getRandomColor = function() {
  const hue = Math.floor(Math.random()*360).toString();
  const saturation = Math.floor(Math.random()*100).toString();

  return 'hsl(' + hue + ', ' + saturation + '% , 30%)';
}

io.on('connection', function(socket) {
  const userColor = getRandomColor();

  console.log('user joined');

  io.emit('chat message',
    {
      color: userColor,
      message: 'user joined',
    }
  );

  socket.on('disconnect', function() {
    console.log('user left');
    io.emit('chat message',
      {
        color: userColor,
        message: 'user left',
      }
    );
  });

  socket.on('chat message', function(message) {
    console.log('chat message: ', message);

    io.emit('chat message',
      {
        color: userColor,
        message: message,
      }
    );
  });
});
