
var socket = io();

socket.on('connect', () => {
  console.log('connected to a server');

  // socket.emit('createmessage',{
  //   to:'battry',
  //   text:'hey T whats\'p '
  // });

});


socket.on('disconnect',() => {
  console.log('the server goes off line !!!');
});

socket.on('newmessage', function(newMessage) {
   console.log('received a new message from the server');
   console.log(newMessage);
   var li = $('<li></li>');
   li.text(`${newMessage.from}: ${newMessage.text}`);

   $('#message-list').append(li);
 });

 $('#form-message').on('submit',function(e){
   e.preventDefault();

   socket.emit('createmessage',{
     from:"user",
     text:$('[name=message]').val()
   },function () {

   });


 });
