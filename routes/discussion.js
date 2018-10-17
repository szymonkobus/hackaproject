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
  Posts.getPostByDiscussionId(discussion_id, function(err, result) {
    if (err) {
      console.log("ERROR: Error occurred while retrieving posts.");
    } else {
      res.render('discussion', { title : 'Discussion' , logged_in : req.isAuthenticated(), posts : result});
    }
  });
});

module.exports = router;
