var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.use(express.static('static'));

app.get('/', function (req, res) {
  let from = req.ip;
  let data = {'ip': from }
  io.emit('attack', data);
 
  console.log(data);
  res.sendFile(__dirname + '/index.html');
})
