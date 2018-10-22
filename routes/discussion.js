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
  var discussion_id = 1;
  var post = new Post();
  post.getPostByDiscussionId(discussion_id, function(err, result) {
    if (err) {
      console.log("ERROR: Error occurred while retrieving posts.");
    } else {
      res.render('discussion', { title : 'Discussion Forums' , description : 'Connect with fellow users, share knowledge and start a discussion today.' , logged_in : req.isAuthenticated(), posts : result});
    }
  });
});

router.post(/.*/, function(req, res) {
  var newPost = new Post();
  newPost.addNewPost(req.body.title, req.body.text, req.user.local.username, function(err, result) {
    res.redirect('/discussion');
  });
})

module.exports = router;
