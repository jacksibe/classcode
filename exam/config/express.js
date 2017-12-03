//loading all the required modules
var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');

module.exports = function (app, config) {

//connecting to mongoose database with the below code

mongoose.Promise = require('bluebird');
 mongoose.connect(config.db, {useMongoClient: true});
 var db = mongoose.connection;
 db.on('error', function () {
   throw new Error('unable to connect to database at ' + config.db);
 });
 
   mongoose.set('debug', true);
   mongoose.connection.once('open', function callback() {
     console.log("Mongoose connected to the database");
   });
  
    app.use(function (req, res, next) {
      console.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });
  
  // using body parser to parse data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
    }));
  // loading modules using glob
    var models = glob.sync(config.root + '/app/models/*.js');
   models.forEach(function (model) {
     require(model);
   });
  //loading controllers using glob
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
   controllers.forEach(function (controller) {
    require(controller)(app, config);
   });
  
  // runs the html static file under public folder
   app.use(express.static(config.root + '/public'));
  
   //error handler 404
    app.use(function (req, res) {
      res.type('text/plan');
      res.status(404);
      res.send('404 Not Found');
    });
  
    //error handler 500
    app.use(function (err, req, res, next) {
      res.type('text/plan');
      res.status(500);
      res.send('500 Server Error');  
    });
  
    console.log("Starting application");
  
  };

  