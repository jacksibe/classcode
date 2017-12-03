var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';

var config = {  
development: {    
            root: rootPath,    
            app: {      name: 'TODO'    },    
            port: 5000, 
            db: 'mongodb://127.0.0.1/todo-dev',
            secret: "cayennedlikedhistreats"
            
            
 },  
 production: {    
              root: rootPath,    
              app: {      name: 'TODO'    },    
              port: 80,
              secret: "cayennedlikedhistreats"
              },


test: {
              root: rootPath,
              app: {      name: 'TODO'    },
              port: 4000,
              secret: "cayennedlikedhistreats"
             },
            
  };

module.exports = config[env];
