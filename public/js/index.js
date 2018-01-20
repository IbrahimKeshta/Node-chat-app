var socket = io(); //initiating the request 
socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: 'bla@gmail.com',
    //     text: 'Hey from js file'
    // });
    // socket.emit('newMessage', {
    //     from:'Farid@example.com',
    //     text: 'Saying Hello From server',
    //     createdAt: Date()
    // });
    // socket.emit('createMessage', {
    //  from: 'Ibrahim',
    //  text: 'yupp'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// socket.on('newEmail', function (email) { //custom event arrgument as sent function data
//     console.log('new email',email);
// });
socket.on('newMessage', function(message) {
    console.log('newMessage', message);
})