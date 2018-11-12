/**
 * Defines app route/logic for index page(s).
 */
var express = require('express');
var router  = express.Router();

var Discussion = require('../models/discussion');
var Post       = require('../models/post');

/**
 * Handles GET request for discussion home page.
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get('/', function(req, res) {
  var discussion = new Discussion();
  discussion.getAllDiscussions(function(err, result) {
    if (err) {
      console.log("ERROR: Error occurred while retrieving discussions.");
    } else {
      console.log(result);
      res.render('discussionhome', { title       : 'Discussion Forums',
                                     description : 'Connect with fellow users, share knowledge and start a discussion today.',
                                     logged_in   : req.isAuthenticated(),
                                     user        : req.user,
                                     discussions : result});
    }
  });
});

/**
 * Handles GET request for discussion page, retrieving posts with the discussion id in the URL.
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
      res.render('discussion', { title        : 'Discussion Forums',
                                 description  : 'Connect with fellow users, share knowledge and start a discussion today.',
                                 logged_in    : req.isAuthenticated(),
                                 user         : req.user,
                                 discussionid : discussion_id,
                                 posts        : result});
    }
  });
});

/**
 * Handles POST request for discussion page, storing new post in database.
 *
 * @param {Object} req
 * @param {Object} res
 */
router.post(/\/.*/, function(req, res) {
  console.log("p url: " + req.url);
  var discussion_id = req.url.replace('/', '');
  if(discussion_id == ''){
    discussion_id = 0;
  }
  var newPost = new Post();
  newPost.addNewPost(req.body.title, req.body.text, req.user.local.username, discussion_id, function(err, result) {
    if(err){
      console.log("ERROR: Couldn't save the post.")
    }
    res.redirect('/discussion/' + discussion_id);
  });
})

module.exports = router;
