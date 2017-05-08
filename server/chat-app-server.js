 const path = require('path');
 const http = require('http');
 const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join( __dirname , '/../public');

var port = process.env.PORT || 3000 ;

 var chatApp = express();
 var server = http.createServer(chatApp);
 var io = socketIO(server);  //we are registering the socket io to our server so the a bridge can be opend between the client and server;
chatApp.use(express.static(publicPath));

// chatApp.get('/',(req,res) => {
//     res.send('index.html');
//
// });



server.listen( port, () => {
  console.log(`server is up and running on 3000`);
});
