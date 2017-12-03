// default path and environment
var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';

//configuring web server with just development using port 5000
var config = {  
development: {    
            root: rootPath,    
            app: {name: 'exam'},    
            port: 5000,  
            db: 'mongodb://127.0.0.1/exam-dev' 
 },  

  };

 module.exports = config[env];

