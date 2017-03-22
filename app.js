var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function () {
  console.log('Listening on port 3000!')
});

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(express.static('static'));
app.use(allowCrossDomain);

app.get('/', function (req, res) {
  var rawIp = req.ip
  var from = rawIp.slice(rawIp.lastIndexOf(':') + 1);

  var now = new Date();
  var time = now.toISOString();

  var data = {'ip': from, 'time': time }

  io.emit('attack', data);
 
  console.log(data);
  res.sendFile(__dirname + '/index.html');
});

