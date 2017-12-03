
    
    // load required modules
    var express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      Newdoc = mongoose.model('docs');
      
    
    
    
    module.exports = function (app, config) {

        
        app.use('/api', router);
        
       //below code is to get api
        router.get('/documents', function (req, res, next){
            
        console.log('Get all documents', 'verbose');
            
        var query = Newdoc.find().then(result => {
            
        if(result && result.length) {
            
        res.status(200).json(result);
            
        } else {
            
        res.status(404).json({message: "No documents"});
            
        }
            
        })
            
        .catch(err => {
            
        return next(err);
            
        });
            
        });
    
    
      
    //below code is to post api
        router.post('/documents', function(req, res, next){
            console.log('Create document'  , 'verbose');
            var newdoc = new Newdoc(req.body);
            newdoc.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch( err => {
               return next(err);
            });
          });
      
      
  
    };
    
