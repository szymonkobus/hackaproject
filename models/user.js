var mongo = require('mongodb');
var mongoose = require('mongoose');

var db = mongoose.connection;

var us = new mongoose.Schema({
    name: String,
    pass: String
})

var User = mongoose.model('user', us);

mongoose.connect("mongodb+srv://admin:admin123@cluster0-tyvbl.gcp.mongodb.net/test",{ useNewUrlParser: true}, function(err, client) {
   if(err) { console.log('Error occurred while connecting to MongoDB Atlas...\n',err); }
   console.log('Connected...');
});

//adduser("Eva","kk2");

//querring
User.find({}).exec(function(err, docs){
  if(err) throw err;
  console.log(docs);
});

function adduser(_name, _password){
  var temp_user = new User({name: _name, pass: _password});
  temp_user.save(function(err){
    if(err) console.log("error: user not saved")
  });
}
