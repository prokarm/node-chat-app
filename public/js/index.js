
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
  $('[name=message]').val('');
   });
 });

 var $geolocation = $('#send_location');
   $geolocation.on('click',function () {
   if(!navigator.geolocation){
     return alert ('your app does not support geolocation');
   }
   navigator.geolocation.getCurrentPosition(function(position){

     socket.emit('createlocationmessage',{
       latitude : position.coords.latitude,
       longitude: position.coords.longitude
     });
   },function(){
     alert('not a valid address or the address not found!!');
   });
 });

 //lisetning to the location of the map
 socket.on('newlocationmessage',(geolocation) =>  {
   var $li =$('<li></li>');
   $li.text(`${geolocation.from} `);
   var  $a = $('<a target ="_blank">Here is my location </a>');
   $a.attr('href',geolocation.url);
   $li.append($a);
   $('#message-list').append($li);
 });
