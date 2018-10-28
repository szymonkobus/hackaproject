/**
 * Defines app route/logic for index page(s).
 */
var express = require('express');
var router  = express.Router();

var Post = require('../models/post');
/**
 * Handles GET request for discussion home page.
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get(/.*/, function(req, res) {
  console.log("g url: " + req.url);
  var discussion_id = req.url.replace('/', '');
  if(discussion_id == ''){
    discussion_id = 0;
  }
  console.log("g discussion_id: " + discussion_id);
  var post = new Post();
  post.getPostsByDiscussionId(discussion_id, function(err, result) {
    if (err) {
      console.log("ERROR: Error occurred while retrieving posts.");
    } else {
      res.render('discussion', { title : 'Discussion Forums' , description : 'Connect with fellow users, share knowledge and start a discussion today.' , logged_in : req.isAuthenticated(), posts : result});
    }
  });
});

router.post(/.*/, function(req, res) {
  console.log("p url: " + req.url);
  var discussion_id = req.url.replace('/', '');
  if(discussion_id == ''){
    discussion_id = 0;
  }
  console.log("p discussion_id: " + discussion_id);
  var newPost = new Post();
  newPost.addNewPost(req.body.title, req.body.text, req.user.local.username, discussion_id, function(err, result) {
    if(err){
      console.log("ERROR: Couldn't save the post.")
    }
    res.redirect('/discussion/' + discussion_id);
  });
})

module.exports = router;
