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
    console.log(`User Connected:${socket.id.blue}`)


    socket.on('send_message', (data) => {
        // console.log(data)
        socket.broadcast.emit('received_message', data)
    })


})












app.use(express.json());
app.use(express.urlencoded({ extended: false }))
connect()

app.use('/api/user/', require('./routes/userRoutes'))
app.use('/api/chats/', require('./routes/chatRoutes'))
app.use(handler)

server.listen(process.env.PORT, () => console.log(`server is running on port:${process.env.PORT.blue}`))