/**
 * Defines app route/logic for index page(s).
 */
var express = require('express');
var router  = express.Router();

var Posts = require('../models/post');
/**
 * Handles GET request for discussion home page.
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get(/.*/, function(req, res) {
  var discussion_id = 1;
  var post = new Posts();
  post.getPostByDiscussionId(discussion_id, function(err, result) {
    if (err) {
      console.log("ERROR: Error occurred while retrieving posts.");
    } else {
      res.render('discussion', { title : 'Discussion Forums' , description : 'Connect with fellow users, share knowledge and start a discussion today.' , logged_in : req.isAuthenticated(), posts : result});
    }
  });
});

/**
 * Handles GET request for discussion home page.
 *
 * @param {Object} req
 * @param {Object} res
 */

router.post('/discussion', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
