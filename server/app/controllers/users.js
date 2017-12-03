
(function (){
'use strict';


var express = require('express'),
  router = express.Router(),
  logger = require('../../config/logger'),
  mongoose = require('mongoose'),
  users = mongoose.model('users');
  passportService = require('../../config/passport') 
  passport = require('passport')

  var requireLogin = passport.authenticate('local', { session: false });
  
  



module.exports = function (app, config) {
    app.use('/api', router);
    
   
    router.get('/users', function(req, res, next){
        logger.log('Get all users'  + req.params.id, 'verbose');
        var query = User.find()
        .sort(req.query.order)
        .exec()
        .then(result => {
         	if(result && result.length) {
			res.status(200).json(result);
		} else {
			res.status(404).json({message: "No users"});
		}
        })
        .catch(err => {
          return next(err);
        });
    })




     

    router.get('/user/:userId', function(req, res, next){
        logger.log('Get user'  + req.params.id, 'verbose');

        User.findById(req.params.userId)
                    .then(user => {
                        if(user){
                            res.status(200).json(user);
                        } else {
                            res.status(404).json({message: "No user found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            }); 
        

     

    router.post('/users', function(req, res, next){
        logger.log('Create User'  + req.params.id, 'verbose');
        var user = new User(req.body);
        user.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch( err => {
           return next(err);
        });
      })
  
        
  

    router.put('/user/:userID', function(req, res, next){
        logger.log('Update user'  + req.params.id, 'verbose');

        User.findOneAndUpdate({_id: req.params.userId}, 		req.body, {new:true, multi:false})
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(error => {
                    return next(error);
                });
        }); 


        router.put('/users/password/:userId', function(req, res, next){
            logger.log('Update user ' + req.params.userId, 'verbose');
        
            User.findById(req.params.userId)
                .exec()
                .then(function (user) {
                    if (req.body.password !== undefined) {
                        user.password = req.body.password;
                    }
        
                    user.save()
                        .then(function (user) {
                            res.status(200).json(user);
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                })
                .catch(function (err) {
                    return next(err);
                });
        });
        
        
    
    


    router.delete('/user/:userId', function(req, res, next){
        logger.log('Delete user'  + req.params.id, 'verbose');

        User.remove({ _id: req.params.userId })
                .then(user => {
                    res.status(200).json({msg: "User Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
   
    
    

    router.post('/login', function(req, res, next){
        console.log(req.body);
        var email = req.body.email;
        var password = req.body.password;

        var obj = {'email' : email, 'password' : passowrd};
        res.status(201).json(obj);
    });
});

router.route('/users/login').post(requireLogin, login);

};
})();

