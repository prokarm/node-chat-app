 const path = require('path');
 const http = require('http');
 const express = require('express');
const socketIO = require('socket.io');

const {generatemessage,generatelocationmessage} = require('./utils/message');
const {isRealString} = require('./utils/validationString');
const {Users} = require('./utils/alluser.js');

const publicPath = path.join( __dirname , '/../public');
var port = process.env.PORT || 3000 ;
var chatApp = express();
var server = http.createServer(chatApp);

var io = socketIO(server);  //we are registering the socket io to our server so the a bridge can be opend between the client and server;
var users = new Users(); //creating the new instance of the users

chatApp.use(express.static(publicPath));

io.on('connection',(asocket) => {
  console.log('new connection is open');



       /// when the user JOIN the room

  asocket.on('join',(params ,errcallback) =>{
     if( !isRealString(params.name) || !isRealString(params.room) ){
          errcallback('either room or name is not provided by you !!');
     }

     asocket.join(params.room);  //creating a seperate room or area in the connection
     users.removeUser(asocket.id);
     users.addUser(asocket.id,params.name,params.room);
     io.emit('userlist',users.peopleList(params.room));
    //  console.log('before',users);
     asocket.emit('newmessage',generatemessage('AdminKarm','Welcome to chat app'));

     asocket.broadcast.to(params.room).emit('newmessage',generatemessage('AdminKarm',`${params.name} has joined the room`));
     errcallback();
  });

  asocket.on('createlocationmessage',(location) =>{
    var user = users.fetchUser(asocket.id);

    if (user) {
      console.log(user);
  asocket.broadcast.to(user.room).emit('newlocationmessage',generatelocationmessage(user.name,location.latitude,location.longitude));
    }

  });

// sending the message from the server
  asocket.on('createmessage',(newmail,callback) => {

     console.log('new message got from client');
     console.log(newmail);

     var user = users.fetchUser(asocket.id);
 if(user){
//on gettin a message from the client we send the same message to all the active users
     io.to(user.room).emit('newmessage',generatemessage(user.name , newmail.text)); // this io will emit message to all connected socket
}
   callback();
  });

  asocket.on('disconnect',() => {
    console.log('current client no longer active');
    var user = users.removeUser(asocket.id);
    // console.log(user);
    if(user){
      // console.log('user room',user.room);
        io.to(user.room).emit('userlist',users.peopleList(user.room));
        io.to(user.room).emit('newmessage',generatemessage('AdminKarm',`${user.name} has left the room`));
    }

  });

 });
// chatApp.get('/',(req,res) => {
//     res.send('index.html');
//
// });



server.listen( port, () => {
  console.log(`server is up and running on 3000`);
});
