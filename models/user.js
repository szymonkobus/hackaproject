var mongo = require('mongodb');
var mongoose = require('mongoose');

var db = mongoose.connection;

console.log("User model created");

mongoose.connect("mongodb+srv://admin:admin123@cluster0-tyvbl.gcp.mongodb.net/test",{ useNewUrlParser: true}, function(err, client) {
   // perform actions on the collection object
   if(err) {
     console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }

   console.log('Connected...');
   const collection = db.collection("inventory");

   // perform actions on the collection object
   db.collection("inventory").insertMany([
   // MongoDB adds the _id field with an ObjectId if _id is not present
   { item: "test", qty: 25, status: "A",
       size: { h: 14, w: 21, uom: "cm" }, tags: [ "blank", "red" ] },
   { item: "test2", qty: 50, status: "A",
       size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank" ] },
   { item: "test3", qty: 100, status: "D",
       size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank", "plain" ] }
  ])
  .then(function(result) {
  // process result
  })

   client.close();
});
