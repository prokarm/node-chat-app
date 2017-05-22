 const path = require('path');
 const http = require('http');
 const express = require('express');
const socketIO = require('socket.io');

const {generatemessage,generatelocationmessage} = require('./utils/message');
const {isRealString} = require('./utils/validationString');

const publicPath = path.join( __dirname , '/../public');
var port = process.env.PORT || 3000 ;
var chatApp = express();
var server = http.createServer(chatApp);

var io = socketIO(server);  //we are registering the socket io to our server so the a bridge can be opend between the client and server;

chatApp.use(express.static(publicPath));

io.on('connection',(asocket) => {
  console.log('new connection is open');



       /// when the user JOIN the room

  asocket.on('join',(params ,errcallback) =>{
     if( !isRealString(params.name) || !isRealString(params.room) ){
          errcallback('sholud take only string only!!');
     }

     asocket.join(params.room);  //creating a seperate room or area in the connection

     asocket.emit('newmessage',generatemessage('Karm','Welcome to chat app'));

     asocket.broadcast.to(params.room).emit('newmessage',generatemessage('Karm',`${params.name} has joined the room`));
     errcallback();
  });

  asocket.on('createlocationmessage',(location) =>{
  asocket.broadcast.emit('newlocationmessage',generatelocationmessage('User',location.latitude,location.longitude));
  });

  asocket.on('createmessage',(newmail,callback) => {

     console.log('new message got from client');
     console.log(newmail);

//on gettin a message from the client we send the same message to all the active users
     io.emit('newmessage',generatemessage(newmail.from , newmail.text)); // this io will emit message to all connected socket
   callback();
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
