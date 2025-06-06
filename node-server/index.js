//node server with socket.io
const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*', // You can restrict this in production
  }
});

const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
       console.log("New user",name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect', message =>{
      socket.broadcast.emit('leave',users[socket.id]);
      delete users[socket.id];
    })
})

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});                                             