/**
 * Defines app route/logic for technology pages.
 */
var express = require('express');
var router  = express.Router();

var Technology = require('../models/technology.js');
var wikipedia = require('wikipedia-js');
var Post       = require('../models/post');

/**
 * Handles GET request for technology home page.
 *
 * @param {Object} req
 * @param {Object} res
 */
 router.get('/', function(req, res) {
   var technology = new Technology();
   technology.getTechnologies(function(err, result) {
     if (err) {
       console.log('ERROR: An error occurred retrieving technology info from database.');
     } else {
       console.log(result);
       res.render('technologyhome', { title : 'Technology',
                                      description : 'Learn more about different technologies and use your knowledge to innovate.',
                                      logged_in   : req.isAuthenticated(),
                                      user        : req.user,
                                      technologies: result,
       });
     }
   })
 })

/**
 * Handles GET request for specific technology page.
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get(/.*/, function(req, res) {
  var tech_queried = req.url.replace('/', '').replace(/%20/g, ' ');
  var technology = new Technology();
  technology.getTechByName(tech_queried, function(err, result) {
    if (err) {
      console.log('ERROR: An error occurred retrieving technology info from database.');
    } else {
      console.log("RESULT: " + result);
      if (result == null) {
        console.log('No matching technology profile with that username found.');
        res.redirect('/');
      } else {
        var options = {query: tech_queried.replace(/ /g, '_'), format: 'html', summaryOnly: true, formatversion: 1};
        wikipedia.searchArticle(options, function(err, htmlWiki) {
          if (err) {
            console.log("ERROR: Error occurred while querying wikipedia.");
          } else {
            console.log(htmlWiki);

            res.render('technology', { title       : 'Technology',
                                       description : 'Learn more about different technologies and use your knowledge to innovate.',
                                       logged_in   : req.isAuthenticated(),
                                       user        : req.user,
                                       tech_data   : result[0],
                                       wiki_query  : htmlWiki });
          }
        });
      }
    }
  });
});

/**
 * Handles POST request for specific technology page, saving post to database.
 *
 * @param {Object} req
 * @param {Object} res
 */
router.post(/.*/, function(req, res) {
  var tech_queried = req.url.replace('/', '').replace(/%20/g, ' ');
  var discussion_id = 17;
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
