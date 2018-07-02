// loading express for server connection
var app = require('express')();
var http = require('http').Server(app);
// loading socket.io into variable io
var io = require('socket.io')(http);
// rooting to index.html file the response
app.get('/', function(req, res) {
   res.sendfile('index.html');
});

users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
      console.log(data);
      // checks wheather the user is already exits or if exits it will display the message
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
      	// if it is a new user the sets the user name
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});
// establishing port
http.listen(5000, function() {
   console.log('listening on localhost:5000');
});