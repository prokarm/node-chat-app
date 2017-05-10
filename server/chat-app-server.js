 const path = require('path');
 const http = require('http');
 const express = require('express');
const socketIO = require('socket.io');

const {generatemessage} = require('./utils/message')

const publicPath = path.join( __dirname , '/../public');
var port = process.env.PORT || 3000 ;
var chatApp = express();
var server = http.createServer(chatApp);

var io = socketIO(server);  //we are registering the socket io to our server so the a bridge can be opend between the client and server;

chatApp.use(express.static(publicPath));

io.on('connection',(asocket) => {
  console.log('new connection is open');
  asocket.emit('newmessage',generatemessage('Admin','conichua new user!!'));
  asocket.broadcast.emit('newmessage',generatemessage('Admin','new user joined'));

  asocket.on('createmessage',(newmail) => {

     console.log('new message got from client');
     console.log(newmail);

//on gettin a message from the client we send the same message to all the active users
     io.emit('newmessage',generatemessage(newmail.from , newmail.text)); // this io will emit message to all connected socket
  });

  asocket.on('disconnect',() => {
    console.log('client no longer active');
  });
 });
// chatApp.get('/',(req,res) => {
//     res.send('index.html');
//
// });



server.listen( port, () => {
  console.log(`server is up and running on 3000`);
});
