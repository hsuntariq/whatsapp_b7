const express = require('express');
const handler = require('./middlewares/handler');
const connect = require('./config/connectDB');
const app = express();
require('dotenv').config();
require('colors')
const cors = require('cors')
app.use(cors());

// for making your servers
const http = require('http');
// for making socket server
const { Server } = require('socket.io');

// create your server

const server = http.createServer(app);

// create socket server

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ['POST', 'GET']
    }
})

// the moment user enter the app, it should connect to the socket server

io.on("connection", (socket) => {
    console.log(`user connected on host id:${socket.id.blue}`);
    // join room
    socket.on("join_room", (data) => {
        socket.join(data.roomID);
        console.log(`room joined:${data.roomID?.cyan}`)
        const roomSize = io.sockets.adapter.rooms.get(data.roomID)?.size || 0;
        console.log(`Users in room ${data.roomID}: ${roomSize}`);
    });

    // handle typing

    socket.on('typing', (data) => {
        socket.to(data.roomID).emit('show_typing', data)
    })
    socket.on('leave', (data) => {
        socket.to(data.roomID).emit('left', data)
    })


    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.roomID).emit('received_message', data)

        // Emit "received_message" event to all users in the room
    });

});












app.use(express.json());
app.use(express.urlencoded({ extended: false }))
connect()

app.use('/api/user/', require('./routes/userRoutes'))
app.use('/api/chats/', require('./routes/chatRoutes'))
app.use(handler)

server.listen(process.env.PORT, () => console.log(`server is running on port:${process.env.PORT.blue}`))