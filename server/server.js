const path = require('path');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');
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

    //challenge
    //socket.emit from admin text welcome to chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    //socket.broadcast.emit from Admin text new user joind
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'))
    
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
        //broad cast will send message to all connected users and not showen to the user who send
        // socket.broadcast.emit('newMessage', {
        //     form: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => { 
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
}); 
app.use(express.static(publicPath));

server.listen(port,  (e) => {
    console.log(`Server is up on port ${port}`);
});