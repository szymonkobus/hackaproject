/**
 * Handles database interaction for discussion posts.
 */
var mongoose   = require('mongoose');

var postSchema = mongoose.Schema({
  discussion_id : { type : Number },
  author        : { type : String },
  date          : { type : Date, default : Date.now },
  upvotes       : { type : Number },
  downvotes     : { type : Number },
  title         : { type : String },
  text          : { type : String }
});

var Post = mongoose.model('post', postSchema);

var dbSetings = require('../config/database');

mongoose.connect(dbSetings.url ,{ useNewUrlParser: true}, (err, client) => {
  if(err) console.log('Error: Can\'t connect to database: ',err);
})

/**
 * Retrieves user from database using user ID to identify them before
 * performing callback function on result.
 *
 * @param {Number}   id
 * @param {Function} callback
 */
// ========
// METHODS
// ========

postSchema.methods.getPostByDiscussionId = function(id, callback) {
  // Temporarily modified for testing purposes
  Post.find({}, callback);
  //Post.find({ 'discussion_id' : id}, callback);
};

postSchema.methods.addNewPost = function(title, content, author, callback) {
  // Pass callback as next function after post added.
  callback(null, null);
}

module.exports = mongoose.model('Post', postSchema);
