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
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a  = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);    
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('send location');
       socket.emit('createLocationMessage', {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
       });
    }, function () {
        locationButton.removeAttr('disabled').text('send location');        
        alert('Unable to fetch location')
    })
})