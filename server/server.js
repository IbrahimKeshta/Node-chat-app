const path = require('path');
const http = require('http');

// express 
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();

//http server is created by express and do same thing but to make socketIO to work
var server = http.createServer(app);

//configure the server and socketIO
var io = socketIO(server);

//register event listener
io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('disconnect', () => {
        console.log('‘User was disconnected');
    });
});
app.use(express.static(publicPath));

server.listen(port, (e) => {
    console.log(`Server is up on port ${port}`);
});