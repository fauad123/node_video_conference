const express = require('express')
const listEndpoints = require('express-list-endpoints')
require('dotenv').config();
const bodyParser = require('body-parser')
const connectDatabase = require('./config/db')
const User = require('./models/user.model')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000"
  }
})

const clients = [];
const rooms = [];

io.on('connection', socket => {
  socket.emit('add-rooms', {
    rooms: rooms
  })

  socket.emit('add-users', {
  	users: clients
  })

  socket.broadcast.emit('add-users', {
  	users: clients.concat(socket.id)
  })

  socket.on('iceCandidate', (data) => {
    socket.broadcast.emit('iceCandidate', { candidate: data.candidate, userId: data.userId });
  });

  socket.on('make-offer', function (data) {
    // clients.forEach((clientId) => {
    //   if (clientId !== socket.id) {
    //     socket.to(clientId).emit('offer-made', {
    //       offer: data.offer,
    //       socket: socket.id
    //     });
    //   }
    // });

    socket.to(data.to).emit('offer-made', {
      offer: data.offer,
      userId: socket.id
    });
  });

  socket.on('make-answer', function (data) {
    socket.to(data.to).emit('answer-made', {
      socket: socket.id,
      answer: data.answer
    });
  });

  socket.on('join_room', (room) => {
  	if (!rooms[room]) {
      rooms.push(room)
      socket.emit('room_added', { rooms: rooms });
    }

    socket.join(room);
    // socket.emit('room_joined', { room: room });
    socket.to(room).emit('message', 'A new user has joined the room.');
  });

  socket.on('disconnect', function () {
    clients.splice(clients.indexOf(socket.id), 1);
    io.emit('remove-user', socket.id);
  });


  clients.push(socket.id)
})

connectDatabase().then(res => console.log('DB connected')).catch(error => console.log(error))

const apiRoutes = require('./routes')

app.use(bodyParser.json({ urlExtended:true }))

// const user1 = User.create({ email: 'fauadhaleem@gmail.com', password: 'Ronaldo1#' }).then(user => console.log('User created')).catch(err => console.log('Unable to create user ' + err ))

app.use('/api' , apiRoutes)

console.log(listEndpoints(app))

server.listen(process.env.SERVER_PORT || 5000 , () => {
  console.log('listening on port ' , process.env.SERVER_PORT || 5000)
})
