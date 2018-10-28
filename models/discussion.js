  /**
   * Handles database interaction for discussions.
   */

  var mongoose   = require('mongoose');

  var discussionSchema = mongoose.Schema({
      name:      { type: String, unique : true},
      technolgy: { type: String },
      author:    { type: String },
      date :     { type : Date, default : Date.now },
      posts_id:  { type : [ Number ]}
  });

  var Discussion = mongoose.model('discussion', discussionSchema);

  var dbSetings = require('../config/database');

  mongoose.connect(dbSetings.url ,{ useNewUrlParser: true}, (err, client) => {
    if(err) console.log('Error: Can\'t connect to database: ',err);
  })

  /*
  postSchema.methods.getDiscussionByID = (id, callback) => {
    // Temporarily modified for testing purposes
    Discussion.find({}, callback);
    //Discussion.find({ 'discussion_id' : id}, callback);
  };
  */

  module.exports = mongoose.model('Discussion', discussionSchema);
