const path = require('path');
const http = require('http');

// express 
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 8080;
var app = express();

//http server is created by express and do same thing but to make socketIO to work
var server = http.createServer(app);

//configure the server and socketIO
var io = socketIO(server);

//register event listener
io.on('connection', (socket) => {
    console.log('new user connected');

    // socket.emit('newEmail', { // emit creating events
    //     from: 'keshta95@hotmail.com',
    //     text: 'Hey what is going on',
    //     creatAt: 123
    // }); 
    // socket.emit('newMessage', {
    //     from:'magdy@gmail.com',
    //     text:'Hello from server',
    //     createdAt: Date()
    // });

    // socket.on('createEmail', (newEmail) => { //listener for event
    //     console.log('createEmail', newEmail);
    // });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
         from: message.from,
         text: message.text,
         createdAt: new Date().getTime()
        });
    });
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
}); 
app.use(express.static(publicPath));

server.listen(port,'127.0.0.1', (e) => {
    console.log(`Server is up on port ${port}`);
});