/**
 * Defines app route/logic for index page(s).
 */
var express = require('express');
var router  = express.Router();

/**
 * Handles GET request for home page.
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get('/', function(req, res) {
  res.render('index', { title     : 'Solved.',
                        logged_in : req.isAuthenticated(),
                        user      : req.user });
});

router.get('/about', function(req, res) {
  res.render('about', { title       : 'About Us',
                        description : 'A little bit of information about Solved.',
                        logged_in   : req.isAuthenticated(),
                        user        : req.user });
});

module.exports = router;
