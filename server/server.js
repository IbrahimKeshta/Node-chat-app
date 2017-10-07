const path = require('path');

const publicPath = path.join(__dirname, '../public');

// express 
const express = require('express');

var app = express();
var port = process.env.PORT || 3000;
    app.use(express.static(publicPath));

app.listen(port, (e) => {
    console.log(`Server is up on port ${port}`);
});