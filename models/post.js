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

// ========
// METHODS
// ========

/**
 * Retrieves posts from database using discussion ID
 *
 * @param {Number}   id
 * @param {Function} callback
 */
postSchema.methods.getPostsByDiscussionId = function(discussion_id, callback) {
  // Temporarily modified for testing purposes
  if (discussion_id == null) {
    Post.find({}, callback);
  }
  else{ Post.find({ 'discussion_id' : discussion_id }, callback); }
};

/**
 * Creates post with fields specified and stores it into database.
 *
 * @param {String}   title
 * @param {String}   content
 * @param {String}   author
 * @param {Number}   discussion_id
 * @param {Function} callback
 */
postSchema.methods.addNewPost = function(title, content, author, discussion_id, callback) {
  // Pass callback as next function after post added. // S: dont get it
  this.discussion_id = discussion_id;
  this.author = author;
  this.upvotes = 0;
  this.downvotes = 0;
  this.title = title;
  this.text = content;

  this.save((err) => {
    if (err){
      console.log("ERROR: Couldn't save the post.");
    }
    callback(null, null);
  })
}

module.exports = mongoose.model('Post', postSchema);
