/**
 * Defines app route/logic for technology pages.
 */
var express = require('express');
var router  = express.Router();

var Technology = require('../models/technology.js');
var wikipedia  = require('wikipedia-js');

router.get('/', function(req, res) {
  res.send("hello world");
});

/**
 * Handles GET request for technology home page.
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get(/.*/, function(req, res) {
  var tech_queried = req.url.replace('/', "");
  var technology = new Technology();
  technology.getTechByName(tech_queried, function(err, result) {
    if (err) {
      console.log('ERROR: An error occurred retrieving user info from database.');
    } else {
      console.log("RESULT: " + result);
      if (result == null) {
        console.log('No matching technology profile with that username found.');
        res.redirect('/');
      } else {
        var options = {query: tech_queried, format: 'html', summaryOnly: true, formatversion: 1};
        wikipedia.searchArticle(options, function(err, htmlWiki) {
          if (err) {
            console.log("ERROR: Error occurred while querying wikipedia.");
          } else {
            console.log(htmlWiki);

            res.render('technology', { title       : 'Technology',
                                       description : 'Learn more about different technologies and use your knowledge to innovate.',
                                       logged_in   : req.isAuthenticated(),
                                       user        : req.user,
                                       tech_data   : result,
                                       wiki_query  : htmlWiki });
          }
        });
      }
    }
  });
});

module.exports = router;
