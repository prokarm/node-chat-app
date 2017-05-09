
var socket = io();

socket.on('connect', () => {
  console.log('connected to a server');

  socket.emit('createmessage',{
    to:'battry',
    text:'hey T whats\'p'
  });
});

socket.on('disconnect',() =>{
  console.log('the server goes off line !!!');
});

socket.on('newMessage', function(newMessage) {
   console.log('received a new message from the server/n');
  console.log(newMessage);
 });
