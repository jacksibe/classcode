
var express = require('express'), // declares express
config = require('./config/config');   //  declares config

var app = express();    // declares app


//Loads the express.js file to configure the server and passes the express app object to it

require('./config/express')(app, config);

console.log("Creating HTTP server on port: " + config.port); //writes log saying Creating HTTP server on port, uses the port defined on development(config.js)
require('http').createServer(app).listen(config.port, function () {
console.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
});


