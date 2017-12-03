
//load modules 
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
//define schema 
var documentSchema = new Schema({

    firstName: { type: String, required: true }, //using the name attribute for string
    age: { type: Number, min: 16, max: 60}, // using the age attribute for number

 
});


module.exports = 
 Mongoose.model('docs', documentSchema);