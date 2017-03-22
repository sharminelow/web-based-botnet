var socket = io();
 
socket.on('attack', function(data){
  console.log(data);
});
