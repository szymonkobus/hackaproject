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
  res.render('index', { title : 'Solved.' });
});

module.exports = router;
