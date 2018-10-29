/**
 * Defines app route/logic for technology pages.
 */
var express = require('express');
var router  = express.Router();

var Technology = require('../models/technology.js');
/**
 * Handles GET request for technology home page.
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get(/.*/, function(req, res) {
  var technology = new Technology();
  technology.getTechByName("", function(err, result) {
    if (err) {
      console.log('ERROR: An error occurred retrieving user info from database.');
    } else {
      console.log("RESULT: " + result);
      if (result == null) {
        console.log('No matching technology profile with that username found.');
        res.redirect('/');
      } else {
        res.render('technology', { title       : 'Technology',
                                   description : 'Learn more about different technologies and use your knowledge to innovate.',
                                   logged_in   : req.isAuthenticated(),
                                   user        : req.user,
                                   tech_data   : result });
      }
    }
  });
});

module.exports = router;
