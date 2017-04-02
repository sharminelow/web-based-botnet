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


var createLog = function(req) {
  var rawIp = req.ip
  var from = rawIp.slice(rawIp.lastIndexOf(':') + 1);

  var now = new Date();
  var time = now.toISOString();

  var data = {'ip': from, 'time': time};
  return data;
}

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    //res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(express.static('static'));
app.use(allowCrossDomain);

app.get('/', function (req, res) {
  //console.log(req);
  var data = createLog(req);
  data['via'] = 'jquery';
  io.emit('attack', data);
 
  res.sendFile(__dirname + '/index.html');
});


app.get('/cat', function (req, res) {
  var data = createLog(req);
  data['via'] = 'image';
  io.emit('attack', data);
  
  res.sendFile(__dirname + '/static/cat.jpg');
});

app.get('/datauri', function(req, res) {
  res.sendFile(__dirname + '/datauri.html');
});

app.get('/draggable', function(req, res) {
  res.sendFile(__dirname + '/draggable.html');
});
