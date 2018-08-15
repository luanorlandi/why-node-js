const express = require('express');

const port = 3000;
const app = express();
app.listen(port, console.log('Server up on port', port));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});
