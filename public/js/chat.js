
var socket = io();

function autoscroll (){
  //selector
  var messages =$('#message-list');
  var newmessage =messages.children('li:last-child');///we are selecting the last child of the message list

  //heights
  var scrollTop = messages.prop('scrollTop');
  var clientHeight = messages.prop('clientHeight');
  var scrollHeight = messages.prop('scrollHeight');
  var  newmessageheight = newmessage.innerHeight();
  var lastmessageheight = newmessage.prev().innerHeight();

  if (scrollTop + clientHeight + newmessageheight+lastmessageheight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
    console.log(scrollHeight);
  }
};

socket.on('connect', () => {
  console.log('connected to a server');

  var params = $.deparam(window.location.search);

  socket.emit('join',params,function(err){

    if (err) {
      alert(err);
      window.location.href = '/';
    }else {
      console.log('No errors');
    }
  });

  // socket.emit('createmessage',{
  //   to:'battry',
  //   text:'hey T whats\'p '
  // });

});


socket.on('disconnect', () => {
  console.log('the server goes off line !!!');
});

socket.on('newmessage', function(newMessage) {
  console.log('received a new message from the server');
  console.log(newMessage);

  var createdattime = moment(newMessage.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    from: newMessage.from,
    text: newMessage.text,
    createdAt: createdattime
  });
  $('#message-list').append(html);
  autoscroll();
  //  var li = $('<li></li>');
  //  li.text(`${newMessage.from}: ${newMessage.text} ${createdattime}`);
  //
  //  $('#message-list').append(li);
});
//send message
var $inputtext = $('[name=message]');
$('#form-message').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createmessage', {
    from: "user",
    text: $inputtext.val()
  }, function() {
    $inputtext.val('');
  });
  $inputtext.focus();
});

//send location`
var $userlocation = $('[name=sendlocation]');
var $geolocation = $('#send_location');

$geolocation.on('click', function() {

  if (!navigator.geolocation) {
    return alert('your app does not support geolocation');
  }
  $userlocation.attr('disabled', 'disabled').val('sending location....');
  navigator.geolocation.getCurrentPosition(function(position) {

    $userlocation.removeAttr('disabled').text('send location');
    $inputtext.focus();
    socket.emit('createlocationmessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    $userlocation.removeAttr('disabled').text('send location');
    alert('not a valid address or the address not found!!');
  });
});

//lisetning to the location of the map
socket.on('newlocationmessage', (geolocation) => {

    format_time = moment(geolocation.createdAt).format('h:mm a');
    var template_location = $('#location-template').html();
    var html = Mustache.render(template_location,{
      from:geolocation.from,
      url:geolocation.url,
      createdAt:fromat_time
    });
  $('#message-list').append(html);
  autoscroll();


    // ptimitive method  generating method on the screen

  // var $li = $('<li></li>');
  // $li.text(`${geolocation.from} `);
  // var $a = $('<a target ="_blank">Here is my location </a>');
  // $a.attr('href', geolocation.url);
  // $li.append($a);
  // $('#message-list').append($li);
});
