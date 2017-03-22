var socket = io();
 
socket.on('attack', function(data){
  //var log = JSON.stringify(data);
  var log = "From: " + data.ip + " via <u>" + data.via +  "</u> at time " + data.time;
  $("#container").append(log + '<br />');
  console.log(data);
});
